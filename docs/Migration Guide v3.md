# Migration Guide: Upgrading to @petbee/typescript v3.0.0

This guide will help you migrate your projects from v2.x to v3.0.0 of the Petbee TypeScript configuration packages.

## 🤖 AI Assistant Prompt (Copy & Paste This!)

Use this prompt when asking AI assistants (ChatGPT, Claude, GitHub Copilot, etc.) to help migrate your project:

```
I need to migrate my TypeScript project to use @petbee/typescript v3.0.0 config packages. Please help me:

1. Update package.json dependencies:
   - @petbee/eslint-config to ^3.0.0
   - @petbee/prettier-config to ^3.0.0
   - @petbee/tsconfig to ^3.0.0
   - typescript to ^5.9.3
   - eslint to ^9.39.1
   - prettier to ^3.6.2

2. Fix type errors from new strict compiler options:
   - noUncheckedIndexedAccess: true (array access now returns T | undefined)
   - verbatimModuleSyntax: true (requires explicit "import type" for types)

3. [CHOOSE ONE BASED ON YOUR PROJECT TYPE]:
   - For React projects: Remove unnecessary "import React from 'react'" statements (we now use react-jsx transform)
   - For Node.js ESM projects: Ensure package.json has "type": "module"
   - For NestJS projects: No config changes needed, just update dependencies

4. Common fixes needed:
   - Array access: Use optional chaining (arr[0]?.method()) or nullish coalescing (arr.at(0) ?? default)
   - Type imports: Change "import { Type } from 'x'" to "import type { Type } from 'x'" when Type is only used as a type
   - Type exports: Change "export { Type }" to "export type { Type }" for type-only exports

Please analyze my codebase and show me what needs to be changed.
```

**For React-specific projects, add:**

```
This is a React project. Please also:
- Remove all unnecessary React imports from component files
- Ensure JSX works with the new react-jsx transform
- Check for any image/style import type conflicts
```

**For Node.js-specific projects, add:**

```
This is a Node.js project using [ESM/CommonJS]. Please:
- [If ESM] Verify package.json has "type": "module" and imports use .js extensions
- [If CommonJS] Consider if I should override moduleResolution to "node" in tsconfig
```

**For NestJS projects, add:**

```
This is a NestJS project. The config maintains CommonJS compatibility, so no module resolution changes needed.
```

## Overview of Changes

Version 3.0.0 introduces significant updates to bring your projects up to modern TypeScript and tooling standards:

- **TypeScript 5.9+** - Latest TypeScript features
- **ESLint 9.39+** - Modern flat config support
- **Modern Module Resolution** - Optimized for different project types
- **React 17+ JSX Transform** - No need to import React in component files
- **Stricter Type Safety** - Better array access checks and ESM compatibility

## Breaking Changes

### 1. TypeScript Compiler Target & Library

**Old (v2.x):**

- Target: `ES2020`
- Lib: `ES2020`
- Module Resolution: `node`

**New (v3.x):**

- Target: `ES2022`
- Lib: `ES2023`
- Module Resolution: `bundler` (base), `NodeNext` (node), or `node` (nestjs)

### 2. React JSX Transform

**Old:** `"jsx": "react"` (requires `import React from 'react'`)
**New:** `"jsx": "react-jsx"` (automatic JSX runtime)

### 3. New Strict Type Checking

- `noUncheckedIndexedAccess: true` - Array access requires null checks
- `verbatimModuleSyntax: true` - Stricter import/export syntax
- `allowUnusedLabels: false` - Disallow unused labels
- `allowUnreachableCode: false` - Disallow unreachable code

### 4. ESLint Plugin Updates

- `eslint-plugin-cypress`: v4 → v5
- `eslint-plugin-jest`: v28 → v29
- `@typescript-eslint/*`: v8.32 → v8.47

## Step-by-Step Migration

### Step 1: Update Dependencies

Update your `package.json`:

```bash
# Update the config packages
yarn add -D @petbee/eslint-config@^3.0.0
yarn add -D @petbee/prettier-config@^3.0.0
yarn add -D @petbee/tsconfig@^3.0.0

# Update peer dependencies
yarn add -D typescript@^5.9.3
yarn add -D eslint@^9.39.1
yarn add -D prettier@^3.6.2
```

Or use the bootstrap script:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/petbee/typescript/main/scripts/bootstrap-typescript.sh)"
```

### Step 2: Update TypeScript Configuration

#### For React Projects

**Before (v2.x):**

```json
{
  "extends": "@petbee/tsconfig/react/dom.json",
  "compilerOptions": {
    "baseUrl": ".",
    "rootDir": "."
  }
}
```

**After (v3.x) - No changes needed, but benefits from:**

- Modern `react-jsx` transform (remove React imports from component files)
- Better type definitions for image/style imports
- ES2022+ features

**Action Required:**

1. Remove unnecessary `import React from 'react'` statements from component files
2. If you have custom image/style module declarations, they may conflict - remove them

#### For NestJS Projects

**Before (v2.x):**

```json
{
  "extends": "@petbee/tsconfig/nestjs.json",
  "compilerOptions": {
    "rootDir": "./src"
  }
}
```

**After (v3.x) - No changes needed**

NestJS config maintains CommonJS compatibility while gaining ES2022+ features.

#### For Node.js Projects

**Before (v2.x):**

```json
{
  "extends": "@petbee/tsconfig/node/base.json",
  "compilerOptions": {
    "baseUrl": "./",
    "outDir": "./dist"
  }
}
```

**After (v3.x) - Add package.json type field:**

The new config uses `moduleResolution: "NodeNext"` which requires:

```json
// package.json
{
  "type": "module"
}
```

**If you need CommonJS:**

```json
// tsconfig.json - override to use node resolution
{
  "extends": "@petbee/tsconfig/node/base.json",
  "compilerOptions": {
    "moduleResolution": "node",
    "module": "CommonJS"
  }
}
```

Or use the NestJS config which is CommonJS-based.

#### For Bundled Web Apps (Vite, Webpack, etc.)

**Before (v2.x):**

```json
{
  "extends": "@petbee/tsconfig/base.json"
}
```

**After (v3.x) - No changes needed**

Now optimized with `moduleResolution: "bundler"` for modern bundlers.

### Step 3: Fix Type Errors from Stricter Checking

#### Handle Array Access (`noUncheckedIndexedAccess`)

**Before (v2.x):**

```typescript
const items = [1, 2, 3]
const first = items[0] // Type: number
console.log(first.toFixed(2)) // OK
```

**After (v3.x):**

```typescript
const items = [1, 2, 3]
const first = items[0] // Type: number | undefined
console.log(first.toFixed(2)) // ❌ Error: Object is possibly 'undefined'

// Fix 1: Use optional chaining
console.log(first?.toFixed(2))

// Fix 2: Use assertion if you're certain
console.log(first!.toFixed(2))

// Fix 3: Add null check
if (first !== undefined) {
  console.log(first.toFixed(2))
}

// Fix 4: Use .at() with nullish coalescing
const first = items.at(0) ?? 0
```

#### Handle Verbatim Module Syntax

**Before (v2.x):**

```typescript
// These were sometimes allowed
import type { User } from './types'
export { User } // ❌ v3 error if User is only a type
```

**After (v3.x):**

```typescript
// Use type-only exports
import type { User } from './types'
export type { User } // ✅ Correct

// Or import as value if needed
import { User } from './types'
export { User } // ✅ Correct if User is a value
```

### Step 4: Update ESLint Configuration

#### For ESLint v9 (Flat Config)

**Before (v2.x):**

```javascript
import petbeeConfig from '@petbee/eslint-config'

export default [
  ...petbeeConfig,
  // Your overrides
]
```

**After (v3.x) - No changes needed**

ESLint 9 is fully supported.

#### For ESLint v8 (Legacy)

**Before (v2.x):**

```json
{
  "extends": ["@petbee/eslint-config"]
}
```

**After (v3.x) - Consider upgrading to ESLint 9**

v2.x legacy config still works, but consider migrating to ESLint 9 flat config.

### Step 5: Update React Components (Remove React Imports)

**Before (v2.x):**

```typescript
import React from 'react'

export const Button = () => {
  return <button>Click me</button>
}
```

**After (v3.x):**

```typescript
// No React import needed!
export const Button = () => {
  return <button>Click me</button>
}
```

You can safely remove `import React from 'react'` from all component files.

### Step 6: Test Your Build

After making changes:

```bash
# Clean previous builds
rm -rf dist/ build/ .tsbuildinfo

# Type check
npx tsc --noEmit

# Build
npm run build

# Run tests
npm test

# Lint
npm run lint
```

## Common Issues & Solutions

### Issue 1: "Cannot find module" with ESM

**Problem:** After upgrading Node.js config, imports fail.

**Solution:** Ensure `package.json` has `"type": "module"` and use file extensions:

```typescript
// Add .js extension (even for .ts files)
import { helper } from './utils.js'
```

Or switch back to CommonJS with module resolution override.

### Issue 2: Many "possibly undefined" errors

**Problem:** `noUncheckedIndexedAccess` causes many array access errors.

**Solution:**

1. Use `.at()` method: `array.at(0)`
2. Add proper null checks
3. Use optional chaining: `array[0]?.method()`
4. If too disruptive, temporarily disable in your tsconfig:

```json
{
  "extends": "@petbee/tsconfig/base.json",
  "compilerOptions": {
    "noUncheckedIndexedAccess": false
  }
}
```

Then gradually fix issues and re-enable.

### Issue 3: "Type is not assignable" with imports/exports

**Problem:** `verbatimModuleSyntax` requires explicit type imports/exports.

**Solution:** Use `import type` and `export type`:

```typescript
import type { MyType } from './types'
export type { MyType }
```

### Issue 4: Lerna publish fails

**Problem:** Lerna 9 has different behavior.

**Solution:** Review [Lerna 9 migration guide](https://lerna.js.org/docs/legacy-package-management). Key changes:

- More strict workspace validation
- Different default publish behavior

### Issue 5: ESLint errors with Cypress/Jest

**Problem:** New rules from updated plugins.

**Solution:** Review and update test files:

```javascript
// Update Cypress plugin usage
// Update Jest plugin usage
// Check plugin changelogs for breaking changes
```

## Gradual Migration Strategy

If full migration is too disruptive, consider this gradual approach:

### Phase 1: Update Dependencies Only

```bash
yarn add -D typescript@^5.9.3 eslint@^9.39.1 prettier@^3.6.2
```

Keep old config versions temporarily.

### Phase 2: Update One Config Package at a Time

```bash
# Start with prettier (least breaking)
yarn add -D @petbee/prettier-config@^3.0.0

# Then ESLint
yarn add -D @petbee/eslint-config@^3.0.0

# Finally TypeScript config
yarn add -D @petbee/tsconfig@^3.0.0
```

### Phase 3: Gradually Enable Strict Options

Start with config overrides that disable strict options:

```json
{
  "extends": "@petbee/tsconfig/base.json",
  "compilerOptions": {
    "noUncheckedIndexedAccess": false,
    "verbatimModuleSyntax": false
  }
}
```

Then enable them one by one, fixing issues.

## Verification Checklist

- [ ] All dependencies updated
- [ ] TypeScript config updated
- [ ] Build passes without errors
- [ ] Tests pass
- [ ] ESLint passes
- [ ] Prettier formatting applied
- [ ] React imports removed (if applicable)
- [ ] Array access has proper null checks
- [ ] Type imports use `import type`
- [ ] Production build tested
- [ ] CI/CD pipeline passes

## Need Help?

If you encounter issues during migration:

1. Check the [GitHub Issues](https://github.com/petbee/typescript/issues)
2. Review the [Documentation](https://github.com/petbee/typescript)
3. Create a new issue with:
   - Your current config
   - Error messages
   - Steps to reproduce

## Benefits After Migration

After completing the migration, you'll benefit from:

✅ **Better Type Safety** - Catch more bugs at compile time
✅ **Modern JavaScript** - Use ES2022+ features
✅ **Faster Builds** - Optimized module resolution
✅ **Cleaner Code** - No unnecessary React imports
✅ **Better DX** - Latest tooling features
✅ **Future-Proof** - Ready for upcoming TypeScript features

---

**Last Updated:** November 2025
**Version:** 3.0.0
