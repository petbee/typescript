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

// Helper function to ensure configs are in the correct format for spreading
const ensureArray = (config) => {
  if (!config) return []
  if (Array.isArray(config)) return config
  
  // Convert legacy config format to flat config format
  if (config.rules || config.extends || config.plugins) {
    const flatConfig = { ...config }
    
    // Convert env to languageOptions.globals
    if (flatConfig.env) {
      flatConfig.languageOptions = flatConfig.languageOptions || {}
      flatConfig.languageOptions.globals = flatConfig.languageOptions.globals || {}
      
      // Map common environments to globals
      if (flatConfig.env.node) Object.assign(flatConfig.languageOptions.globals, globals.node)
      if (flatConfig.env.jest) Object.assign(flatConfig.languageOptions.globals, globals.jest)
      if (flatConfig.env.es6) Object.assign(flatConfig.languageOptions.globals, globals.es2015)
      
      // Remove the env property
      delete flatConfig.env
    }
    
    return [flatConfig]
  }

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
      globals: {
        ...globals.node,
        ...globals.jest,
        ...globals.es2015,
        __DEV__: true,
      }
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    settings: {},
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
