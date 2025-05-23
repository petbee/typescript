import jsLint from '@eslint/js'
import tsLint from 'typescript-eslint'

// Importing all the rules from the rules directory
import prettierConfig from './rules/prettier.js'
import errorsConfig from './rules/errors.js'
import nodeConfig from './rules/node.js'
import styleConfig from './rules/style.js'
import variablesConfig from './rules/variables.js'
import bestPracticesConfig from './rules/best-practices.js'
import importsConfig from './rules/imports.js'
import typescriptConfig from './rules/typescript.js'
import testsConfig from './rules/tests.js'
import nestjsConfig from './rules/nestjs.js'

const ignoreConfig = {
  ignores: ['coverage', 'dist', '**/dist/', 'node_modules', '**/node_modules'],
}

// Helper to get the flat config if available, otherwise fallback
const getFlat = (config) => {
  return config && config.flat ? (Array.isArray(config.flat) ? config.flat : [config.flat]) : []
}

export default [
  ignoreConfig,
  jsLint.configs.recommended,
  ...tsLint.configs.recommended,
  ...getFlat(prettierConfig),
  ...getFlat(errorsConfig),
  ...getFlat(nodeConfig),
  ...getFlat(styleConfig),
  ...getFlat(variablesConfig),
  ...getFlat(bestPracticesConfig),
  ...getFlat(importsConfig),
  ...getFlat(typescriptConfig),
  ...getFlat(testsConfig),
  ...getFlat(nestjsConfig),
]
