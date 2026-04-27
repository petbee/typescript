const { hasPackage } = require('../lib/utils')
const {
  hasTypescript,
  serializerFilePatterns,
  testFilePatterns,
  tsParserOptions,
  tsCommonRules,
  tsSerializerOverrideRules,
  tsTestOverrideRules,
} = require('./shared-config.js')

const hasNestJs = hasPackage('@nestjs/core')
const hasNext = hasPackage('next') || hasPackage('nextjs')

// Load framework-specific rules
const nextjsRules = hasNext ? require('./nextjs.js').rules : {}
// Note: Don't require nestjs.js here to avoid circular dependency.
// NestJS handles its own flat config completely.
// React rules are now handled separately in index.mjs
const nestjsRules = {}
const reactRules = {}

const tsBaseConfig = {
  files: ['**/*.{ts,tsx}'],
  extends: ['plugin:@typescript-eslint/eslint-recommended', 'plugin:@typescript-eslint/recommended'],
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: tsParserOptions,
  rules: {
    ...tsCommonRules,
    ...reactRules,
    ...nextjsRules,
    ...nestjsRules,
  },
}

const tsTestOverrideConfig = {
  files: testFilePatterns,
  rules: tsTestOverrideRules,
}

const tsSerializerOverrideConfig = {
  files: serializerFilePatterns,
  rules: tsSerializerOverrideRules,
}

const tsImportRelaxedConfig = {
  files: ['**/*.d.ts', '**/*.d.tsx', '**/*.test.ts', '**/*.test.tsx'],
  rules: {
    'import/order': 'off',
    'import/no-duplicates': 'off',
    'import/export': 'off',
  },
}

const tsConfigOptions = [tsBaseConfig, tsTestOverrideConfig, tsSerializerOverrideConfig, tsImportRelaxedConfig]

// Flat config for ESLint v9 (no extends, plugins as object)
const flatConfig = hasTypescript
  ? [
      {
        files: tsBaseConfig.files,
        languageOptions: {
          parser: require('@typescript-eslint/parser'),
          parserOptions: {
            ...tsParserOptions,
            tsconfigRootDir: process.cwd(),
          },
        },
        plugins: {
          '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
        },
        rules: tsBaseConfig.rules,
      },
      {
        files: tsTestOverrideConfig.files,
        rules: tsTestOverrideConfig.rules,
      },
      {
        files: tsSerializerOverrideConfig.files,
        rules: tsSerializerOverrideConfig.rules,
      },
      {
        files: tsImportRelaxedConfig.files,
        rules: tsImportRelaxedConfig.rules,
      },
    ]
  : []

const config = hasTypescript ? { overrides: tsConfigOptions } : {}

module.exports = config
module.exports.flat = flatConfig
