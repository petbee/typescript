const { hasPackage } = require('../lib/utils')
const { hasTypescript, tsParserOptions, tsCommonRules } = require('./shared-config.js')

const hasNestJs = hasPackage('@nestjs/core')
const hasReact = hasPackage('react')
const hasNext = hasPackage('next') || hasPackage('nextjs')

// Load framework-specific rules
const reactRules = hasReact ? require('./react.js').rules : {}
const nextjsRules = hasNext ? require('./nextjs.js').rules : {}
// Note: Don't require nestjs.js here to avoid circular dependency.
// NestJS handles its own flat config completely.
const nestjsRules = {}

const tsConfigOptions = [
  {
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
  },
  {
    files: ['**/*.d.ts', '**/*.d.tsx', '**/*.test.ts', '**/*.test.tsx'],
    rules: {
      'import/order': 'off',
      'import/no-duplicates': 'off',
      'import/export': 'off',
    },
  },
]

// Flat config for ESLint v9 (no extends, plugins as object)
const flatConfig = hasTypescript
  ? [
      {
        files: tsConfigOptions[0].files,
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
        rules: tsConfigOptions[0].rules,
      },
      {
        files: tsConfigOptions[1].files,
        rules: tsConfigOptions[1].rules,
      },
    ]
  : []

const config = hasTypescript ? { overrides: tsConfigOptions } : {}

module.exports = config
module.exports.flat = flatConfig
