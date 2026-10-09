const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const forge = require('node-forge');
const braces = require('braces');
const qs = require('query-string');

// CJS Router callers must retain query behavior after the ESM decoder upgrade.
assert.equal(qs.parse('lang=si&name=%E0%B6%9A%20%2B').name, 'ක +');
assert.equal(qs.parse('lang=ta').lang, 'ta');
assert.equal(qs.stringify({lang: 'ta', term: 'space apps'}), 'lang=ta&term=space%20apps');
assert.equal(qs.parse('value=%E0%A4%A').value, '%E0%A4%A');
const start = performance.now();
qs.parse('bad=' + '%FF'.repeat(5000));
assert.ok(performance.now() - start < 2000, 'Malformed decoding must remain bounded');

assert.deepEqual(braces.expand('file-{a,b}-{1..2}'), ['file-a-1','file-a-2','file-b-1','file-b-2']);
assert.equal(braces.compile('x/{a,b}'), 'x/(a|b)');
assert.equal(braces.stringify(braces.parse('x/{a,b}')), 'x/{a,b}');
for (const method of ['parse','compile','expand','stringify']) {
  assert.throws(() => braces[method]('{'.repeat(3000) + 'x' + '}'.repeat(3000)), /nesting exceeds/);
}
assert.throws(() => braces.parse('('.repeat(3000) + 'x' + ')'.repeat(3000)), /nesting exceeds/);
let ast = {type:'text',value:'x'};
for (let i=0;i<1000;i++) ast={type:'root',nodes:[ast]};
for (const method of ['compile','expand','stringify']) assert.throws(() => braces[method](ast), /nesting exceeds/);

// A real RSA operation supplies a valid padded signature with an invalid nested
// DigestAlgorithm. This reproduces the omitted element-count check without
// relying on an attacker fixture, service or private project credential.
const {privateKey, publicKey} = crypto.generateKeyPairSync('rsa', {modulusLength:2048,publicExponent:3});
const verifier = forge.pki.publicKeyFromPem(publicKey.export({type:'spki',format:'pem'}));
const message = Buffer.from('space-apps dependency regression');
const digest = crypto.createHash('sha256').update(message).digest();
const valid = crypto.sign('RSA-SHA256',message,privateKey);
assert.equal(verifier.verify(digest.toString('binary'),valid.toString('binary')),true);
assert.equal(verifier.verify(crypto.createHash('sha256').update('changed').digest('binary'),valid.toString('binary')),false);
const a=forge.asn1;
const algorithm=[a.create(a.Class.UNIVERSAL,a.Type.OID,false,a.oidToDer(forge.pki.oids.sha256).getBytes()),a.create(a.Class.UNIVERSAL,a.Type.NULL,false,'')];
function signInfo(extra) {
  const info=a.create(a.Class.UNIVERSAL,a.Type.SEQUENCE,true,[a.create(a.Class.UNIVERSAL,a.Type.SEQUENCE,true,[...algorithm,...extra]),a.create(a.Class.UNIVERSAL,a.Type.OCTETSTRING,false,digest.toString('binary'))]);
  const der=Buffer.from(a.toDer(info).getBytes(),'binary');
  const block=Buffer.concat([Buffer.from([0,1]),Buffer.alloc(256-der.length-3,0xff),Buffer.from([0]),der]);
  return crypto.privateEncrypt({key:privateKey,padding:crypto.constants.RSA_NO_PADDING},block).toString('binary');
}
assert.equal(verifier.verify(digest.toString('binary'),signInfo([])),true);
assert.throws(()=>verifier.verify(digest.toString('binary'),signInfo([a.create(a.Class.UNIVERSAL,a.Type.OCTETSTRING,false,'garbage')])),/DigestInfo/);
console.log('PASS: query compatibility, malformed URI cost, bounded brace/AST depth, valid RSA and rejected nested garbage');
