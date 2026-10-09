const fs = require('node:fs');
const assert = require('node:assert/strict');
const {initializeTestEnvironment, assertSucceeds, assertFails} = require('@firebase/rules-unit-testing');
const {doc, setDoc, getDoc, getDocs, collection, updateDoc, deleteDoc, serverTimestamp, Timestamp} = require('firebase/firestore');
const projectId = 'demo-space-apps-release';
// Fail closed: this script must never target a hosted project or remote emulator.
assert.equal(process.env.FIRESTORE_EMULATOR_HOST, '127.0.0.1:8090', 'Run through npm run test:rules');
let count=0;
async function run() {
  const env=await initializeTestEnvironment({projectId,firestore:{host:'127.0.0.1',port:8090,rules:fs.readFileSync('firestore.rules','utf8')}});
  const db=env.unauthenticatedContext().firestore();
  const fixtures={
    registrations:{track:'team',teamName:'Demo team',memberCount:2,leadName:'Test person',leadEmail:'test@example.com',leadPhone:null,institution:null,challengePref:'Climate & Earth Observation',agreedToLocalNotice:true},
    volunteers:{role:'volunteer',fullName:'Test person',email:'test@example.com',phone:null,affiliation:null,skills:['Event Logistics & Operations'],availability:['nov14']},
    ambassadors:{fullName:'Test person',email:'test@example.com',phone:null,institution:'Test school',province:'Central Province (Kandy, Matale, Nuwara Eliya)',academicYear:null,motivation:'Local emulator fixture',agreedToLocalNotice:true},
    messages:{name:'Test person',email:'test@example.com',message:'Local emulator fixture',subject:'General Inquiry'}
  };
  const payload=data=>({...data,createdAt:serverTimestamp(),source:'web',appVersion:'1.0.0',status:'new'});
  async function rejected(kind,changes,remove) {
    const data={...payload(fixtures[kind]),...changes};if(remove)delete data[remove];
    await assertFails(setDoc(doc(db,kind,`reject-${++count}`),data));
  }
  try {
    await env.clearFirestore();
    for(const [kind,data] of Object.entries(fixtures)) {
      const ref=doc(db,kind,'valid');await assertSucceeds(setDoc(ref,payload(data)));count++;
      await assertFails(getDoc(ref));count++;
      await assertFails(getDocs(collection(db,kind)));count++;
      await assertFails(updateDoc(ref,{status:'approved'}));count++;
      await assertFails(deleteDoc(ref));count++;
      await assertFails(setDoc(ref,payload(data)));count++;
      for(const changes of [{extra:'unapproved'},{status:'approved'},{source:'external'},{appVersion:'99'},{createdAt:Timestamp.fromMillis(0)}]) await rejected(kind,changes);
      await rejected(kind,{},'createdAt');
      const email=kind==='registrations'?'leadEmail':'email';
      await rejected(kind,{[email]:'not-email'});
      await rejected(kind,{[email]:'a\tb@example.com'});
      await rejected(kind,{[email]:'a'.repeat(201)+'@example.com'});
    }
    for(const memberCount of [1,7,2.5,'2'])await rejected('registrations',{memberCount});
    await rejected('registrations',{agreedToLocalNotice:false});
    await rejected('registrations',{track:'solo',memberCount:2,teamName:null});
    await rejected('registrations',{track:'solo',memberCount:1,teamName:'Team'});
    await rejected('registrations',{challengePref:'invented'});
    await assertSucceeds(setDoc(doc(db,'registrations','solo'),payload({...fixtures.registrations,track:'solo',memberCount:1,teamName:null})));count++;
    await assertSucceeds(setDoc(doc(db,'volunteers','mentor'),payload({...fixtures.volunteers,role:'mentor',skills:['Data Science & Python'],availability:['nov14','nov15']})));count++;
    for(const changes of [{skills:[]},{skills:['invented']},{skills:['Event Logistics & Operations','Event Logistics & Operations']},{role:'mentor'},{availability:[]},{availability:['oct3']},{availability:['nov14','nov14']}])await rejected('volunteers',changes);
    for(const changes of [{agreedToLocalNotice:false},{province:'invented'},{motivation:'x'.repeat(1001)},{institution:''},{academicYear:'x'.repeat(81)}])await rejected('ambassadors',changes);
    for(const changes of [{message:'x'.repeat(2001)},{message:''},{subject:'invented'}])await rejected('messages',changes);
    await assertFails(setDoc(doc(db,'unrecognized','fixture'),payload(fixtures.messages)));count++;
    console.log(`PASS: ${count} Firestore emulator assertions; valid schemas, create-only access, denied reads and malicious fields`);
  } finally {await env.clearFirestore();await env.cleanup();}
}
run().catch(error=>{console.error(error);process.exitCode=1;});
