# Getting Started

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Manual Setup](#manual-setup)
  - [1 - Installing and configuring the essential packages](#1-installing-and-configuring-the-essential-packages)
    - [1.1 - For `Typescript` projects](#11-for-typescript-projects)
  - [2 - Creating tasks](#2-creating-tasks)
  - [3 - Automating](#3-automating)
- [CI Automation](#ci-automation)

<!-- /code_chunk_output -->

## Manual Setup

Petbee `Javascript`/`Typescript` style guide consists of some separate packages:

- [`@petbee/prettier-config`](/packages/prettier-config) - Petbee's unified `prettier` configuration. Responsible for automatically formatting all javascript code.
- [`@petbee/eslint-config`](/packages/eslint-config-petbee) - Petbee's base `eslint` configuration. Responsible for static analyzing every `Javascript` code and guaranteeing a baseline of code quality and good practices.
- [`@petbee/tsconfig`](/packages/tsconfig) - Petbee's unified `tsconfig.json` preset for every `Typescript` project.

Every project which uses `Javascript` or `Typescript` must have at least `eslint-config` and `@petbee/prettier-config` installed. Please check their _README_ for any specific package questions.

### 1 - Installing and configuring the essential packages

First of all we need to install the _basis of everything_:

```bash
$ yarn add -D eslint prettier @petbee/eslint-config @petbee/prettier-config
```

Then create their configuration files at the root of your project:

`.eslintrc`:

```jsonc
{ "extends": "petbee" }
```

`.prettierrc`:

```jsonc
"@petbee/prettier-config"
```

> _Note: yes, it's a string literal in a JSON file._

#### 1.1 - For `Typescript` projects

```bash
$ yarn add -D typescript @petbee/tsconfig
```

Then create a `tsconfig.json` at the root of your project which extends the config:

```jsonc
{
  "extends": "@petbee/tsconfig"
}
```

### 2 - Creating tasks

After installing the essential tools, it's time for creating shortcut tasks for us to be able to lint and format our projects. Add the following scripts to your project's **root** `package.json`:

```jsonc
{
  //...,
  "scripts": {
    //...,
    "lint": "eslint --ext js,jsx,ts,tsx .",
    "format": "prettier --write \"**/*.{ts,js,json}\""
  },
  ...
}
```

Now you have two (and a half) commands:

- `yarn lint` - Will lint all your files according to Petbee standards.
  - `yarn lint --fix` - Will lint all your project files and fix auto-fixable errors along the way :tada:.
- `yarn format` - Will format all your files according to Petbee standards.

### 3 - Automating

Ok, our tools are installed, configured, we have a quick and easy-to-use commands to adequate our project to Petbee's standard, what more can be done? **Automation!**

A developer shouldn't have to think about linting and formatting, usually their IDE is configured to automatically do both things while someone is coding. However, not every IDE is equal nor rightly configured, so we need a way to automate these process to guarantee Petbee's standards.

Install `husky` and `lint-staged` in the root of your project:

```bash
$ yarn add -D husky lint-staged
```

- `husky` is used to easily configure [git hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)
- `lint-staged` is used together with `husky` to lint and format _ONLY_ files that are being commited. No need to run on the whole project.

Then, add these configuration objects to your project's **root** `package.json`:

```jsonc
{
  //...,
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{ts,js,tsx,jsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.json": [
      "prettier --write"
    ]
  },
  ...
}
```

Now, everytime someone is `git commit`ing, `lint-staged` will guarantee that every staged file is following Petbee's standards.

> _Note: if for some reason you need to commit files that doesn't follow the standards, you can pass the [`--no-verify`](https://git-scm.com/docs/git-commit#Documentation/git-commit.txt---no-verify) flag to the `git commit` command. We trust you know what you're doing._
