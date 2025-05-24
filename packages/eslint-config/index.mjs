import jsLint from '@eslint/js'

// Utils
import { hasPackage, getFlat } from './lib/utils.js'

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

const hasTypescript = hasPackage('typescript')

const ignoreConfig = {
  ignores: ['coverage', 'dist', '**/dist/', 'node_modules', '**/node_modules'],
}

const eslintFlatConfig = [
  ignoreConfig,
  ...(hasTypescript ? [] : [jsLint.configs.recommended]),
  ...getFlat(typescriptConfig),
  ...getFlat(prettierConfig),
  ...getFlat(errorsConfig),
  ...getFlat(nodeConfig),
  ...getFlat(styleConfig),
  ...getFlat(variablesConfig),
  ...getFlat(bestPracticesConfig),
  ...getFlat(importsConfig),
  ...getFlat(testsConfig),
]

const nestjsEslintFlatConfig = nestjsConfig.flat

export { nestjsEslintFlatConfig, eslintFlatConfig }

export default eslintFlatConfig
