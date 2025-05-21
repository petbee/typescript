# `@petbee/eslint-config`

This package provides Petbee's ESLint configuration as an extensible shared config, supporting both ESLint v9.x (flat config) and older versions (.eslintrc).

## Installation

Give that you already have ESLint installed, run:

```bash
yarn add -D @petbee/eslint-config typescript prettier
```

## Usage

### For ESLint v8.x and older (legacy config)

```jsonc
// .eslintrc
{
  "extends": ["@petbee/eslint-config"]
}
```

### For ESLint v9.x (flat config)

```js
// eslint.config.js
import petbeeConfig from '@petbee/eslint-config'

export default [
  ...petbeeConfig,
  // Your custom configurations...
]
```

### For projects using both ESLint versions

If you need to support both ESLint versions in the same project, you can:

```javascript
// eslint.config.js
import petbeeConfig from '@petbee/eslint-config'

export default [
  ...petbeeConfig,
  // Your custom configurations...
]
```

And maintain a .eslintrc file:

```jsonc
// .eslintrc
{
  "extends": ["@petbee/eslint-config"]
}
```

As any other eslint preset, it's possible to override some rules and configurations. We encourage trying to keep the closest possible to the preset rules, but every project is different and sometimes overriding is needed, use it carefully.

### For typescript

The preset will automatically load Typescript rules when dealing with `.ts` or `.tsx` files. However, there are some rules that require type-checking. This means that a `tsconfig.json`, which includes all files supposed to be linted, must be present. If your existing configuration does not include all of the files you would like to lint, you can create a separate `tsconfig.eslint.json`, at the root of your project, as follows:

```jsonc
// tsconfig.eslint.json
{
  "extends": "./tsconfig.json",
  "include": ["**/*.ts", "**/*.tsx", "**/*.js"],
  "exclude": []
}
```

And you should be good to go.

### For Javascript

Sometimes you want to use modern, not yet officially supported, syntax in your Javascript files, such as dynamic `import()`. This can be achieved by using the [`babel-eslint` parser](https://github.com/babel/babel-eslint). For size reasons, we don't include it in this preset but it's extremely simple to configure it:

```bash
yarn add -D babel-eslint
```

```jsonc
// .eslintrc
{
  "extends": "@petbee/eslint-config",
  "parser": "babel-eslint",
  "parserOptions": {
    "sourceType": "module"
  }
}
```

If a project uses both Typescript and Javascript, you can configure the parser inside an `override` block:

```jsonc
// .eslintrc
{
  "extends": "@petbee/eslint-config",
  "overrides": [
    {
      "files": ["*.js", "*.jsx"],
      "parser": "babel-eslint",
      "parserOptions": {
        "sourceType": "module"
      }
    }
  ]
}
```

Please check the [`babel-eslint` documentation](https://github.com/babel/babel-eslint#additional-parser-configuration) for further options.

## References

- [`@typescript-eslint` documentation](https://typescript-eslint.io/docs/)
- [`eslint-plugin-import` documentation](https://github.com/benmosher/eslint-plugin-import)
- [`eslint-plugin-prettier` documentation](https://github.com/prettier/eslint-plugin-prettier)
