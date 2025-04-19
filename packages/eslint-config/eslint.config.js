import js from '@eslint/js'
import parser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'

import prettierConfig from './rules/prettier.js'
import errorsConfig from './rules/errors.js'
import nodeConfig from './rules/node.js'
import styleConfig from './rules/style.js'
import variablesConfig from './rules/variables.js'
import bestPracticesConfig from './rules/best-practices.js'
import importsConfig from './rules/imports.js'
import typescriptConfig from './rules/typescript.js'
import testsConfig from './rules/tests.js'

export default [
  js.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser,
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    settings: {},
    env: {
      node: true,
      jest: true,
      es6: true,
    },
    globals: {
      __DEV__: true,
    },
  },
  ...prettierConfig,
  ...errorsConfig,
  ...nodeConfig,
  ...styleConfig,
  ...variablesConfig,
  ...bestPracticesConfig,
  ...importsConfig,
  ...typescriptConfig,
  ...testsConfig,
]
