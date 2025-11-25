# Typescript Standards

Main repository for Petbee Typescript standards. Issues should be used to start discussions about standards and patterns. PRs are welcome after being rightfully discussed.

## Latest Updates (v3.0.0)

- ✅ **TypeScript 5.9.3** - Latest stable TypeScript version
- ✅ **ESLint 9.39** - Modern flat config support
- ✅ **Lerna 9** - Updated to latest version
- ✅ **Modern TS Configs** - Using ES2022 targets, modern module resolution (`bundler`, `NodeNext`)
- ✅ **React 17+ JSX** - New JSX transform (`react-jsx`)
- ✅ **Strict Type Safety** - Added `noUncheckedIndexedAccess`, `verbatimModuleSyntax`

> **🚀 Upgrading from v2.x?** See the [Migration Guide v3](/docs/Migration%20Guide%20v3.md) - includes AI prompts and detailed instructions.

## Content

##### `docs/`

- [Getting Started](/docs/Getting%20Started.md) - Getting starting guide to configure and automate our tooling process
- [Migration Guide v3](/docs/Migration%20Guide%20v3.md) - Complete guide for upgrading from v2.x to v3.0.0 (includes AI prompts)

##### `packages/`

- [eslint-config](/packages/eslint-config) - base eslint rule preset
- [prettier-config](/packages/prettier-config) - prettier preset of all projects
- [tsconfig](/packages/tsconfig) - base tsconfig for all typescript projects

## Add these packages to a new project

### Bootstrap on a new node and typescript project

> If you're not using Bash, change `/bin/bash` to your shell's executable path.

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/petbee/typescript/main/scripts/bootstrap-typescript.sh)"
```

> **Warning**: This will **override** the following configuration files: `.prettierrc`, `.eslintrc` and `tsconfig.json`.

## Contributing

Nothing is written in stone, so if there's some kind of rule or pattern that you wish to discuss or implement, we encourage an open discussion via this [repository issues](/issues). The project use labels to keep everything organized and easy-to-find:

- `discussion` - discussion thread;
- `style` - related to code style, something that there's no wrong or right;
- `practices/patterns` - related to good coding practices that should be standardized and documented;
- `documentation` - a generic documentation issue;
- `todo` - common TODO item, with no explicit SLA.

Feel free to use more than one label in an issue, but try keeping them semantic to help developers.

### Working with the packages

This project uses **Lerna 9** with `yarn` workspaces. For more information, see the [Lerna documentation](https://lerna.js.org/).

**Note:** Lerna 9 has better performance and improved workspace handling. All commands are executed via `npx lerna` or `yarn lerna`.

#### Bootstrap the repository

Running `yarn` will automatically install all the dependencies for all packages and link them together when needed.

```bash
yarn
```

#### Executing commands

To run a `package.json` script on all packages, you can use:

```bash
npx lerna run {scriptName}
# or
yarn lerna run {scriptName}
# will run the scriptName script on all package directories
```

If you want to only run on some packages, pass a `--scope=package-name` to the command above. For more instructions, see the [`lerna run` documentation](https://lerna.js.org/docs/features/run-tasks).

```bash
npx lerna run test --scope="eslint-*"
# run the test script on all packages that match the pattern above
```

The same can be done for regular shell programs with the `lerna exec` command:

```bash
npx lerna exec "pwd"
# will print the pwd of all package directories
```

_Note: The quotes are not needed if your command doesn't have a string with spaces._

#### Releasing new versions

For every release, there should be at least one new changelog entry for every modified package. This repository follows the [keep a changelog](https://keepachangelog.com/en/1.0.0/) format. The [`chan`](https://github.com/geut/chan) CLI can be used to help adding changelog entries:

```bash
chan fixed "Fix that nasty potato bug"
```

It's also possible to run the command on multiple packages with the `lerna exec` command:

```bash
npx lerna exec "chan fixed 'Fix that nasty potato bug'"
# note the quotes
```

Every package has a `version` script that will automatically update their changelog with the new version and entries whenever `lerna publish` or `lerna version` is used.

Relevant commands:

- [`lerna version`](https://lerna.js.org/docs/features/version-and-publish) - Only update versions without publishing the packages.
- [`lerna publish`](https://lerna.js.org/docs/features/version-and-publish) - Update the version and publish the packages.

You can also use the convenience scripts in `package.json`:

```bash
yarn release        # Bump patch version and publish
yarn release:major  # Bump major version and publish
```
