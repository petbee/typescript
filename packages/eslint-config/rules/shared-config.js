// Shared configuration to avoid circular dependencies
const { hasPackage } = require('../lib/utils')

const hasTypescript = hasPackage('typescript')

// Common TypeScript parser configuration
const tsParserOptions = {
  ecmaVersion: 2022,
  sourceType: 'module',
  projectService: true,
  tsconfigRootDir: process.cwd(),
  projectFolderIgnoreList: [/node_modules/i],
  allowAutomaticSingleRunInference: true,
}

// Common TypeScript rules
const tsCommonRules = {
  'no-useless-catch': 'warn',
  'no-magic-numbers': ['warn', { ignore: [0, 1], ignoreArrayIndexes: true }],
  'max-classes-per-file': ['warn', 1],
  'prefer-arrow-callback': ['warn', { allowNamedFunctions: false, allowUnboundThis: true }],
  'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
  'import/no-relative-parent-imports': 'warn',
  'no-restricted-imports': [
    'error',
    {
      patterns: ['../../*'],
    },
  ],
}

module.exports = {
  hasTypescript,
  tsParserOptions,
  tsCommonRules,
}
