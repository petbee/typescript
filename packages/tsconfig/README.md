# `@petbee/tsconfig`

This is the default `tsconfig.json` that should be used by all Petbee projects.

## Features (v3.0.0)

- ✅ **TypeScript 5.9+** - Modern TypeScript support
- ✅ **ES2022+ Target** - Modern JavaScript features
- ✅ **Modern Module Resolution** - `bundler` for web apps, `NodeNext` for Node.js
- ✅ **Strict Type Safety** - Including `noUncheckedIndexedAccess` for safer array access
- ✅ **Verbatim Module Syntax** - Better ESM compatibility
- ✅ **React 17+ JSX** - New JSX transform (`react-jsx`)

## Install

```bash
yarn add -D @petbee/tsconfig typescript
```

## Module Resolution Guide


This package provides entry-point configs for each framework, making it easy to extend the right config for your project:

- **`base.json`** – Safe, strict defaults for all projects (modern web, library, etc.)
- **`react.json`** – For React projects (extends `react/dom.json`)
- **`node.json`** – For Node.js ESM projects (extends `node/base.json`)
- **`nestjs.json`** – For NestJS projects (extends `nestjs/base.json`)
- **`nextjs.json`** – For Next.js projects (extends `nextjs/base.json`)
- **`node/commonjs.json`** – For legacy Node.js CommonJS projects

You can also extend the more granular configs in each framework folder if you need a specific variant (e.g., `react/library.json`, `node/library.json`).

## Usage

### React Project


#### React Project

To start, create a `tsconfig.json` in the root of your project:

```json
{
  "extends": "@petbee/tsconfig/react.json",
  "compilerOptions": {
    "baseUrl": ".",
    "rootDir": "."
  },
  "include": ["./src/**/*"]
}
```

#### React Library Project

Similarly for a react library project. Create a `tsconfig.json` in the root of your project with a setup below assuming the library code sit in `[project root]/src` folder.

```json
{
  "extends": "@petbee/tsconfig/react/library.json",
  "compilerOptions": {
    "baseUrl": "./src",
    "rootDir": "."
  },
  "include": ["./src/**/*"]
}
```

#### Project that run in the browser

A configuration file is provided that includes styles setup and modern React JSX transform.

**Note:** This config uses `"jsx": "react-jsx"` (the new JSX transform from React 17+), which means you don't need to import React in every file that uses JSX.

```json
{
  "extends": "@petbee/tsconfig/react/dom.json",
  "compilerOptions": {
    "baseUrl": ".",
    "rootDir": "."
  }
}
```

The React DOM config includes type definitions for:

- Image imports (`.svg`, `.png`, `.jpg`, etc.)
- Style imports (`.css`, `.scss`, `.module.css`, etc.)

### NestJS Project

To start, create a `tsconfig.json` in the root of your project.

**Note:** The NestJS config uses CommonJS module system (`"module": "commonjs"`) and Node.js module resolution, which is optimal for NestJS applications.

A typical setup where the application sit in `[project root]/src` folder is as follow:

```json
{
  "extends": "@petbee/tsconfig/nestjs.json",
  "compilerOptions": {
    "rootDir": "./src"
  },
  "exclude": ["node_modules", "dist", "tests/**/*", "**/*.spec.ts"]
}
```

### NodeJS Project

**Note:** The Node.js config uses modern ESM module resolution (`"moduleResolution": "NodeNext"`). This is optimal for Node.js 18+ with native ESM support. If you're using CommonJS, consider using the NestJS config instead.


#### Node.js Project (ESM)

To start, create a `tsconfig.json` in the root of your project:

```json
{
  "extends": "@petbee/tsconfig/node.json",
  "compilerOptions": {
    "baseUrl": "./",
    "outDir": "./dist"
  }
}
```

**For ESM projects**, ensure your `package.json` has:

```json
{
  "type": "module"
}
```


#### Node.js Project (CommonJS)

For legacy Node.js projects using CommonJS, extend the CommonJS config:

```json
{
  "extends": "@petbee/tsconfig/node/commonjs.json",
  "compilerOptions": {
    "baseUrl": "./",
    "outDir": "./dist"
  }
}
```


### Custom/Advanced Usage

If you need more control, you can extend any of the granular configs in the framework folders (e.g., `react/library.json`, `node/library.json`, etc.) or the base config directly:

```json
{
  "extends": "@petbee/tsconfig/base.json",
  "compilerOptions": {
    "baseUrl": ".",
    "rootDir": "."
  }
}
```

### TypeScript Configuration Notes

#### Plugins

- If you override the `plugins` array in your project’s tsconfig.json, **always include** the Next.js plugin for Next.js projects:
  ```json
  "plugins": [
    { "name": "next" }
  ]
  ```
- Omitting the Next.js plugin may cause type-checking and IDE features to break.

#### Include/Exclude

- If you set your own `include` or `exclude` arrays, they will completely replace those from the base config.
- Use the recommended patterns from the base config unless you have a specific need.

## Common Got Ya

#### Type Checking does not honour `skipLibCheck: true` setting

There are times when the type failure occur inside of a library your project is consuming, and having `skipLibCheck: true` does not resolved it. In this scenario, add an `exclude` option to your `tsconfig.json`.

eg.

```json
{
  "extends": "@petbee/tsconfig/base.json",
  "compilerOptions": {
    "baseUrl": ".",
    "rootDir": ".",
    "exclude": ["./node_modules/**/*"]
  }
}
```
