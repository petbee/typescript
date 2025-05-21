import js from '@eslint/js'
import parser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import globals from 'globals'

import prettierConfig from './rules/prettier.js'
import errorsConfig from './rules/errors.js'
import nodeConfig from './rules/node.js'
import styleConfig from './rules/style.js'
import variablesConfig from './rules/variables.js'
import bestPracticesConfig from './rules/best-practices.js'
import importsConfig from './rules/imports.js'
import typescriptConfig from './rules/typescript.js'
import testsConfig from './rules/tests.js'

const ignoreConfig = {
  ignores: ['node_modules/', 'coverage/', 'dist/'],
}

// Helper to get the flat config if available, otherwise fallback
const getFlat = (config) => {
  return config && config.flat ? (Array.isArray(config.flat) ? config.flat : [config.flat]) : []
}

export default [
  ignoreConfig,
  js.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser,
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
      },
      globals: {
        ...globals.node,
        ...globals.jest,
        ...globals.es2015,
        __DEV__: true,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    settings: {},
  },
  ...getFlat(prettierConfig),
  ...getFlat(errorsConfig),
  ...getFlat(nodeConfig),
  ...getFlat(styleConfig),
  ...getFlat(variablesConfig),
  ...getFlat(bestPracticesConfig),
  ...getFlat(importsConfig),
  ...getFlat(typescriptConfig),
  ...getFlat(testsConfig),
]
