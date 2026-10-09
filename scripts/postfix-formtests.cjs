// Isolated submission tests: no Firebase initialization or network requests.
const fs = require('node:fs');
const ts = require('typescript');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const source = ts.transpileModule(fs.readFileSync('src/lib/submissions.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText;
let resolveWrite, rejectWrite;
const writes = [];
const firestore = {
  collection: (_, kind) => kind,
  doc: kind => ({ id: `stable-${kind}-${writes.length}`, kind }),
  serverTimestamp: () => 'server-time',
  setDoc: (ref, data) => {
    writes.push({ ref, data });
    return new Promise((resolve, reject) => { resolveWrite = resolve; rejectWrite = reject; });
  },
};
const context = {
  exports: {}, setTimeout, clearTimeout, Promise,
  require: id => {
    if (id === 'firebase/firestore/lite') return firestore;
    if (id === 'react-native') return { Platform: { OS: 'web' } };
    if (id === './firebase') return { db: {} };
    throw new Error(`Unexpected dependency: ${id}`);
  },
};
vm.runInNewContext(source, context);
(async () => {
  const attempt = context.exports.createSubmission('messages', { name: 'Original', message: 'Test' });
  const first = attempt.send();
  assert.equal(attempt.send(), first, 'Concurrent sends share a promise');
  assert.equal(writes.length, 1);
  assert.equal((await context.exports.waitForReceipt(first, 5)).ok, false, 'Timeout reports uncertainty');
  assert.equal(attempt.send(), first, 'Timeout must not cancel or duplicate pending write');
  assert.equal(writes.length, 1);
  resolveWrite();
  assert.equal((await first).ok, true);
  assert.equal((await attempt.send()).ok, true, 'Successful receipt is cached');
  assert.equal(writes.length, 1);
  const rejected = context.exports.createSubmission('messages', { name: 'Original' });
  const pending = rejected.send();
  rejectWrite({ code: 'permission-denied' });
  const failure = await pending;
  assert.equal(failure.ok, false);
  assert.match(failure.message, /cannot read saved records/, 'Do not promise a receipt lookup');
  const retry = rejected.send();
  assert.equal(writes[2].ref.id, writes[1].ref.id, 'Rejected retry keeps identity');
  assert.equal(writes[2].data.name, 'Original', 'Retry keeps captured payload');
  resolveWrite();
  await retry;
  const offline = context.exports.createSubmission('messages', {});
  const offlinePending = offline.send();
  rejectWrite({ code: 'unavailable' });
  assert.match((await offlinePending).message, /No connection/);
  console.log('PASS: submission concurrency, timeout, stable identity, snapshot, success cache and truthful errors');
})().catch(error => { console.error(error); process.exitCode = 1; });
