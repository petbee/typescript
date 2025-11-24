import jsLint from '@eslint/js'

// Utils
import { getFlat, hasPackage } from './lib/utils.js'

// Importing all the rules from the rules directory
import bestPracticesConfig from './rules/best-practices.js'
import errorsConfig from './rules/errors.js'
import importsConfig from './rules/imports.js'
import nestjsConfig from './rules/nestjs.js'
import nodeConfig from './rules/node.js'
import prettierConfig from './rules/prettier.js'
import styleConfig from './rules/style.js'
import testsConfig from './rules/tests.js'
import typescriptConfig from './rules/typescript.js'
import variablesConfig from './rules/variables.js'

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

export { eslintFlatConfig, nestjsEslintFlatConfig }

export default eslintFlatConfig
