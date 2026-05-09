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
const shouldApplyNextRules = hasNext

// Load framework-specific rules
const nextjsRules = shouldApplyNextRules ? require('./nextjs.js').rules : {}
// Note: Don't require nestjs.js here to avoid circular dependency.
// NestJS handles its own flat config completely.
// React rules are now handled separately in index.mjs
const nestjsRules = {}
const reactRules = {}
const basePlugins = ['@typescript-eslint', ...(shouldApplyNextRules ? ['@next/next'] : [])]

const tsBaseConfig = {
  files: ['**/*.{ts,tsx}'],
  extends: ['plugin:@typescript-eslint/eslint-recommended', 'plugin:@typescript-eslint/recommended'],
  plugins: basePlugins,
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

const flatBasePlugins = {
  '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
  ...(shouldApplyNextRules ? { '@next/next': require('@next/eslint-plugin-next') } : {}),
}

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
          ...flatBasePlugins,
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
