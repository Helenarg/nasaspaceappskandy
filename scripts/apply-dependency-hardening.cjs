// Temporary, version- and hash-pinned mitigations. See docs/DEPENDENCIES.md.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const modules = path.join(root, 'node_modules');
const patches = require('../patches/dependency-hardening.json');
const sha = text => crypto.createHash('sha256').update(text).digest('hex');
const prepared = patches.map(patch => {
  const base = path.join(modules, patch.package);
  const target = path.resolve(base, patch.file);
  if (!target.startsWith(base + path.sep)) throw new Error('Invalid patch path');
  const installed = JSON.parse(fs.readFileSync(path.join(base, 'package.json'), 'utf8'));
  if (installed.version !== patch.version) throw new Error(`Review hardening for ${patch.package}@${installed.version}; expected ${patch.version}`);
  const original = fs.readFileSync(target, 'utf8').replace(/\r\n/g, '\n');
  if (sha(original) === patch.afterSha256) return {target, text: original, changed: false};
  if (sha(original) !== patch.beforeSha256) throw new Error(`Unrecognized dependency source: ${patch.package}/${patch.file}`);
  let text = original;
  for (const {from, to} of patch.edits) text = text.replaceAll(from, to);
  if (sha(text) !== patch.afterSha256) throw new Error(`Patch verification failed: ${target}`);
  return {target, text, changed: true};
});
// Validate every target before writing any file. Unknown future releases fail closed.
for (const {target, text, changed} of prepared) if (changed) fs.writeFileSync(target, text);
console.log(`Verified ${prepared.length} dependency hardening patches (${prepared.filter(p => p.changed).length} applied).`);
