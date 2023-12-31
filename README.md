# Typescript Standards

Main repository for Petbee Typescript standards. Issues should be used to start discussions about standards and patterns. PRs are welcome after being rightfully discussed.

## Content

##### `docs/`

- [Getting Started](/docs/Getting%20Started.md) - Getting starting guide to configure and automate our tooling process

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

This project uses `lerna` with `yarn` workspaces, so it's highly recommended to read at least the [Lerna documentation](https://github.com/lerna/lerna).

#### Bootstrap the repository

Running `yarn` will automatically install all the dependencies for all packages and link them together when needed.

```bash
yarn
```

#### Executing commands

To run a `package.json` script on all packages, you can use:

```bash
lerna run {scriptName}
# will run the scriptName script on all package directories
```

If you want to only run on some packages, pass a `--scope=package-name` to the command above. For more instructions, see the [`lerna run` documentation](https://github.com/lerna/lerna/tree/master/commands/run#readme).

```bash
lerna run --scope="eslint-*" test
# run the test script on all packages that match the pattern above
```

The same can be done for regular shell programs with the `lerna exec` command:

```bash
lerna exec "pwd"
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
lerna exec "chan fixed 'Fix that nasty potato bug'"
# note the quotes
```

Every package has a `version` script that will automatically update their changelog with the new version and entries whenever `lerna publish` or `lerna version` is used.

Relevant commands:

- [`lerna version`](https://github.com/lerna/lerna/blob/master/commands/version/README.md) - Only update versions without publishing the packages.
- [`lerna publish`](https://github.com/lerna/lerna/blob/master/commands/publish/README.md) - Update the version and publish the packages.
