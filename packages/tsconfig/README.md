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

This package provides different configs optimized for different project types:

- **`base.json`** - For bundled web apps (Vite, Webpack) - Uses `"moduleResolution": "bundler"`
- **`node/base.json`** - For Node.js ESM projects - Uses `"moduleResolution": "NodeNext"`
- **`nestjs.json`** - For NestJS projects - Uses `"moduleResolution": "node"` (CommonJS)
- **`react/*`** - For React projects - Uses modern JSX transform

## Usage

### React Project

#### React Application Project

To start, create a `tsconfig.json` in the root of your project.

A typical setup where the application sit in `[project root]/app` folder is as follow:

```json
{
  "extends": "@petbee/tsconfig/react/application.json",
  "compilerOptions": {
    "baseUrl": ".",
    "rootDir": ".",
    "paths": { "*": ["*", "app/*"] }
  },
  "include": ["./app/**/*", "./client/**/*", "./server/**/*", "./tests/**/*"]
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

#### Node Application Project

To start, create a `tsconfig.json` in the root of your project.

A typical setup where the application sit in `[project root]/src` folder is as follow:

```json
{
  "extends": "@petbee/tsconfig/node/base.json",
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

#### Node Library Project

Similarly for a node library project. Create a `tsconfig.json` in the root of your project with a setup below assuming the library code sit in `[project root]/src` folder.

```json
{
  "extends": "@petbee/tsconfig/node/library.json",
  "compilerOptions": {
    "baseUrl": "./src",
    "rootDir": "."
  },
  "include": ["./src/**/*"]
}
```

### All Other Project

A base configuration file is also provided if the above does not fit your need.

**Note:** The base config uses `"moduleResolution": "bundler"`, which is optimal for projects using modern bundlers (Vite, Webpack 5+, esbuild, etc.). If you need different module resolution:

- For Node.js ESM: use `node/base.json`
- For CommonJS: use `nestjs.json` or override with `"moduleResolution": "node"`

```json
{
  "extends": "@petbee/tsconfig/base.json",
  "compilerOptions": {
    "baseUrl": ".",
    "rootDir": "."
  }
}
```

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
