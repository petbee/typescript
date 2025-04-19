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

// Helper function to ensure configs are in the correct format for spreading
const ensureArray = (config) => {
  if (!config) return []
  if (Array.isArray(config)) return config
  // If it's an object with rules, convert to a config object
  if (config.rules || config.extends || config.plugins) return [config]

  return []
}

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
  ...ensureArray(prettierConfig),
  ...ensureArray(errorsConfig),
  ...ensureArray(nodeConfig),
  ...ensureArray(styleConfig),
  ...ensureArray(variablesConfig),
  ...ensureArray(bestPracticesConfig),
  ...ensureArray(importsConfig),
  ...ensureArray(typescriptConfig),
  ...ensureArray(testsConfig),
]
