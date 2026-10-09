# Dependency maintenance

Use the committed npm lockfile and Node 24 LTS (verified with 24.18.1 / npm 11.16.0). `npm ci` runs a required, local postinstall verification. Do not use `--ignore-scripts`: it skips the reviewed mitigations. New Expo dependencies must go through `npx expo install`.

## Updates and compatibility

Overrides select @grpc/grpc-js 1.14.6, uuid 11.1.1 and decode-uri-component 0.5.0 to replace vulnerable transitive versions. UUID still exposes the CommonJS v4 API used by xcode. The URI decoder now exports an ESM default, so the query-string 7.1.3 CommonJS adapter accepts that default. Node 22.13.1 or newer supported by Expo is required; Node 24 LTS is recommended. Upgrading query-string to a default-only API would break Expo Router's existing named imports.

Reviewed npm install scripts are approved by exact version only: @firebase/util 1.15.3, protobufjs 7.6.6 and unrs-resolver 1.12.2. There is no blanket approval. Review scripts again when these versions change.

## Temporary source mitigations

`patches/dependency-hardening.json` contains exact package versions, before/after SHA-256 digests, source edits and upstream links. `scripts/apply-dependency-hardening.cjs` validates every file before applying any changes. Re-running it is safe. Unknown versions or source changes stop the installation and require review rather than silently patching incompatible code.

- node-forge 1.4.0: backports the strict nested RSA DigestInfo structure check from [upstream PR 1152](https://github.com/digitalbazaar/forge/pull/1152) into its Node entrypoint (`lib/rsa.js`). This does not modify standalone minified browser distribution bundles. Tests exercise a real valid RSA signature, a wrong digest, and a malformed nested structure signed with a generated test key.
- braces 3.0.3: caps nesting at 64 in parsing, compilation, expansion and stringification. Excessive input and direct ASTs fail with a controlled SyntaxError instead of recursive stack exhaustion. Ordinary glob behavior remains tested. The [advisory](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) has no published patched version at the time of this review. Extremely deep legitimate globs are deliberately rejected.
- query-string 7.1.3: adapts the patched ESM URI decoder to its existing CommonJS caller. Tests cover multilingual query strings, malformed encodings and parse/stringify compatibility.

These are temporary mitigations, not claims that upstream packages have published fixes. Replace them with upstream releases when available, remove the corresponding manifest entries, and rerun regression tests, Expo Doctor and exports.

## Warnings still visible

The recorded audit fell from 32 findings (22 high, 10 moderate) to 18 high findings, all propagated from braces and node-forge. npm evaluates published package versions, not local source mitigations, so these findings intentionally remain visible. Never disable auditing or use `npm audit fix --force`: its proposed downgrades are incompatible with the current Expo SDK.

ESLint 9.39.5 is deprecated/EOL according to [ESLint's support schedule](https://eslint.org/version-support/). The current Expo lint configuration depends on eslint-plugin-react and eslint-plugin-import versions whose peer ranges exclude ESLint 10. Retain the compatible major until those upstream plugins support it; forcing the upgrade would create peer conflicts. This remains a maintenance limitation.

Firebase CLI 15.33.0 is run from npm's separate temporary CLI installation. Its deprecated json-ptr, node-domexception, glob and uuid warnings are upstream CLI dependencies, not application dependencies. Do not edit that cache or suppress these warnings. The local application lockfile and overrides do not control the CLI's dependency graph.

## Recheck commands

```sh
npm ci
npm approve-scripts --allow-scripts-pending
npm run test:dependencies
npm run test:forms
npm run test:rules
npm run lint
npm run typecheck
npx expo-doctor
npm run build:web
```

Rules tests require Java 21 and the Firestore emulator. They refuse any host other than 127.0.0.1:8090 and use only demo-space-apps-release. They never target the hosted Firebase project. Keep the audit output with release evidence and review both outstanding upstream advisories before enabling live collection.
