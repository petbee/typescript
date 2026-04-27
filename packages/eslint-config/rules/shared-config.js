// Shared configuration to avoid circular dependencies
const { hasPackage } = require('../lib/utils')

const hasTypescript = hasPackage('typescript')

const testFilePatterns = ['**/*.spec.ts', '**/*.spec.tsx', '**/*.test.ts', '**/*.test.tsx']
const serializerFilePatterns = ['**/serializers/*.ts']

const commonMagicNumberIgnores = [-1, 0, 1, 2, 10, 24, 60, 100, 1000]

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
  'no-magic-numbers': [
    'warn',
    {
      ignore: commonMagicNumberIgnores,
      ignoreArrayIndexes: true,
      ignoreEnums: true,
      ignoreReadonlyClassProperties: true,
      ignoreTypeIndexes: true,
    },
  ],
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

const tsTestOverrideRules = {
  'no-magic-numbers': 'off',
  'max-classes-per-file': 'off',
}

const tsSerializerOverrideRules = {
  'max-classes-per-file': 'off',
}

module.exports = {
  hasTypescript,
  testFilePatterns,
  serializerFilePatterns,
  tsParserOptions,
  tsCommonRules,
  tsTestOverrideRules,
  tsSerializerOverrideRules,
}
