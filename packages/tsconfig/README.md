# `@petbee/tsconfig`

This is default `tsconfig.json` that should be used by all Petbee projects.

## Install

```bash
yarn add -D @petbee/tsconfig
```

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

A configuration file is provided that included styles setup and a more conservative build target.

```json
{
  "extends": "@petbee/tsconfig/react/dom.json",
  "compilerOptions": {
    "baseUrl": ".",
    "rootDir": "."
  }
}
```

### NestJS Project

To start, create a `tsconfig.json` in the root of your project.

A typical setup where the application sit in `[project root]/app` folder is as follow:

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
