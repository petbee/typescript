# `@petbee/prettier-config`

This package provides Petbee's `.prettierrc` shared config.

## Installation

Give that you already have `prettier` installed, run:

```bash
yarn add -D @petbee/prettier-config
```

## Usage

After installing the module, add it to your `.prettierrc` configuration file:

```jsonc
"@petbee/prettier-config"
```

Or add it to your `package.json`:

```json
{
  ...
  "prettier": "@petbee/prettier-config"
  ...
}
```

Differently from `eslint`, `prettier` shared presets are not extensible, so if you want to override some property, which is not encouraged, you'll need to use the `.prettierrc.js` file.

For more information about configuring `prettier`, please check the [Prettier configuration documentation](https://prettier.io/docs/en/configuration.html).

## References

- [`prettier` options documentation](https://prettier.io/docs/en/options.html)
