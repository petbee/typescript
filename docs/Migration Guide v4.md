# Migration Guide: Upgrading to @petbee/typescript v4.0.0

This guide helps you migrate from v3.x to v4.0.0 of the Petbee TypeScript tooling packages.

## Overview

Version 4.0.0 aligns the shared tooling with latest major ecosystem updates while preserving practical compatibility:

- `@petbee/eslint-config@4.0.0`
- `@petbee/prettier-config@4.0.0`
- `@petbee/tsconfig@4.0.0`
- ESLint 10 support (while keeping ESLint 9 compatibility in peer range)
- TypeScript 6 toolchain updates (while keeping TypeScript 4/5/6 compatibility)

## What Changed

### 1) ESLint compatibility and dependencies

- Added explicit `@eslint/js` dependency to support ESLint 10 flat config resolution.
- `@petbee/eslint-config` now supports peer range:
  - `eslint: ^9.39.1 || ^10.0.0`
- Next.js plugin support is bundled in the config package:
  - `@next/eslint-plugin-next` is included and registered.

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

```bash
yarn add -D eslint@^10.0.0 typescript@^6.0.0 prettier@^3.8.0
```

If you are not ready for ESLint 10 yet, you can stay on ESLint 9.39+ temporarily because `@petbee/eslint-config@4` still supports it.

### Step 3: Keep or migrate your ESLint config style

Flat config (`eslint.config.js`) remains the recommended approach:

```js
import petbeeConfig from '@petbee/eslint-config'

export default [
  ...petbeeConfig,
]
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

### ESLint 10 peer warnings from third-party plugins

Some external ESLint plugins may still declare peer ranges ending at ESLint 9, even if they work in practice with ESLint 10. This is expected during ecosystem transition.

### TypeScript 6 peer warnings

Some tooling packages still declare peer support up to TypeScript 5.x. Prefer testing your project end-to-end and pinning plugin versions if needed.

## Quick Checklist

- [ ] Updated all `@petbee/*` config packages to `^4.0.0`
- [ ] Updated project tooling (`eslint`, `typescript`, `prettier`)
- [ ] Lint and typecheck commands pass in CI
- [ ] Team docs and templates reference v4 versions

## Need Previous Migration?

For v2 -> v3 migrations (including stricter TypeScript option rollout guidance), see:

- [Migration Guide v3](/docs/Migration%20Guide%20v3.md)
