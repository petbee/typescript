# `@petbee/tsconfig`

This is default `tsconfig.json` that should be used by all Petbee projects.

## Install

```bash
yarn add -D @petbee/tsconfig
```

## Usage

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

### All Other Project

A base configuration file is also provided if the above does not fit your need.

```json
{
  "extends": "@petbee/tsconfig",
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
  "extends": "@petbee/tsconfig",
  "compilerOptions": {
    "baseUrl": ".",
    "rootDir": ".",
    "exclude": ["./node_modules/**/*"]
  }
}
```
