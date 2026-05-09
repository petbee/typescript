# Migration Guide: Upgrading to @petbee/typescript v4.0.0

This guide helps you migrate from v3.x to v4.0.0 of the Petbee TypeScript tooling packages.

## Overview

Version 4.0.0 aligns the shared tooling with latest major ecosystem updates while preserving practical compatibility:

- `@petbee/eslint-config@4.0.0`
- `@petbee/prettier-config@4.0.0`
- `@petbee/tsconfig@4.0.0`
- ESLint 9.39 as the recommended baseline, with ESLint 10 available where plugin compatibility is confirmed
- TypeScript 6 toolchain updates (while keeping TypeScript 4/5/6 compatibility)

## What Changed

### 1) ESLint compatibility and dependencies

- Added explicit `@eslint/js` dependency so ESLint 10 flat config resolution works when the surrounding plugin stack supports it.
- `@petbee/eslint-config` now supports peer range:
  - `eslint: ^9.39.1 || ^10.0.0`
- Next.js plugin support is bundled in the config package:
  - `@next/eslint-plugin-next` is included and registered.
- React-based apps should still validate `eslint-plugin-react` compatibility before moving from ESLint 9.39 to 10.

### 2) Toolchain refresh

Repository and package tooling was updated to current majors/minors, including:

- `eslint` 10.x
- `typescript` 6.x
- `prettier` 3.8.x
- Latest compatible plugin stack for ESLint package presets.

### 3) Type-check example fixture

The repository fixture at `test/tsconfig-examples/typecheck.ts` now uses `@ts-expect-error` for intentional type mismatch assertions, so the validation command can pass while still testing strict behavior.

## Step-by-Step Migration (v3 -> v4)

### Step 1: Update package versions

```bash
yarn add -D @petbee/eslint-config@^4.0.0
yarn add -D @petbee/prettier-config@^4.0.0
yarn add -D @petbee/tsconfig@^4.0.0
```

### Step 2: Update peer tooling in your project

Recommended baseline:

```bash
yarn add -D eslint@^9.39.1 typescript@^6.0.0 prettier@^3.8.0
```

Optional ESLint 10 path for repositories that have verified their plugin stack:

```bash
yarn add -D eslint@^10.0.0 typescript@^6.0.0 prettier@^3.8.0
```

If your project depends on `eslint-plugin-react` directly or indirectly, prefer staying on ESLint 9.39 until upstream stable ESLint 10 support is released.

### Step 3: Keep or migrate your ESLint config style

Flat config (`eslint.config.js`) remains the recommended approach:

```js
import petbeeConfig from '@petbee/eslint-config'

export default [...petbeeConfig]
```

Legacy `.eslintrc` remains available for compatibility:

```json
{
  "extends": ["@petbee/eslint-config"]
}
```

### Step 4: Validate

Run the same checks used in this monorepo:

```bash
yarn test:lint
yarn test:prettier
yarn test:tsconfig
yarn --cwd packages/eslint-config eslint-check
```

## Common Notes

### ESLint 10 peer warnings and runtime issues from third-party plugins

Some external ESLint plugins still declare peer ranges ending at ESLint 9, and some React-oriented stacks may fail at runtime under ESLint 10. Treat ESLint 10 as opt-in until your app-level plugin chain is validated. In practice, any project that still relies on `eslint-plugin-react` should remain on ESLint 9.39 for now.

### TypeScript 6 peer warnings

Some tooling packages still declare peer support up to TypeScript 5.x. Prefer testing your project end-to-end and pinning plugin versions if needed.

## Quick Checklist

- [ ] Updated all `@petbee/*` config packages to `^4.0.0`
- [ ] Updated project tooling (`eslint`, `typescript`, `prettier`)
- [ ] Confirmed whether the repo should stay on ESLint 9.39 or opt into ESLint 10
- [ ] Lint and typecheck commands pass in CI
- [ ] Team docs and templates reference v4 versions

## Need Previous Migration?

For v2 -> v3 migrations (including stricter TypeScript option rollout guidance), see:

- [Migration Guide v3](/docs/Migration%20Guide%20v3.md)
