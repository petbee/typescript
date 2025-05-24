// This is the legacy config for ESLint < 9.0
module.exports = {
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
    // ensure tsconfigRootDir is the project root for v8:
    tsconfigRootDir: process.cwd(),
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
    './rules/tests.js',
    './rules/typescript.js',
    './rules/nestjs.js',
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
