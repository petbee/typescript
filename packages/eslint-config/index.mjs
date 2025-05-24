import jsLint from '@eslint/js'
import tsLint from 'typescript-eslint'

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
const hasNestJs = hasPackage('@nestjs/core')

const baseRecommended = [...tsLint.configs.recommended]
const recommendedTypeChecked = [
  ...tsLint.configs.recommendedTypeChecked,
  ...tsLint.configs.strictTypeChecked,
  ...tsLint.configs.stylisticTypeChecked,
]

const ignoreConfig = {
  ignores: ['coverage', 'dist', '**/dist/', 'node_modules', '**/node_modules'],
}

export default tsLint.config(
  ignoreConfig,
  ...(hasTypescript ? [] : [jsLint.configs.recommended]),
  ...getFlat(typescriptConfig),
  ...(hasTypescript ? (hasNestJs ? recommendedTypeChecked : baseRecommended) : []),
  ...getFlat(prettierConfig),
  ...getFlat(errorsConfig),
  ...getFlat(nodeConfig),
  ...getFlat(styleConfig),
  ...getFlat(variablesConfig),
  ...getFlat(bestPracticesConfig),
  ...getFlat(importsConfig),
  ...getFlat(testsConfig),
  ...getFlat(nestjsConfig)
)
