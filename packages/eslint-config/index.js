module.exports = {
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'eslint:recommended',
    './rules/prettier.js',
    './rules/errors.js',
    './rules/node.js',
    './rules/style.js',
    './rules/variables.js',
    './rules/best-practices.js',
    './rules/imports.js',
    './rules/typescript.js',
    './rules/tests.js',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
    es6: true,
  },
  globals: {
    __DEV__: true,
  },
}
