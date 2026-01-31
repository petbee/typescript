const { hasPackage } = require('../lib/utils')
const hasTypescript = hasPackage('typescript')
const hasNestJs = hasPackage('@nestjs/core')
const hasReact = hasPackage('react')
const hasNext = hasPackage('next') || hasPackage('nextjs')

// Load framework-specific rules
const reactRules = hasReact ? require('./react.js').rules : {}
const nextjsRules = hasNext ? require('./nextjs.js').rules : {}
const nestjsRules = hasNestJs ? require('./nestjs.js').rules : {}

const tsConfigOptions = [
  {
    files: ['**/*.{ts,tsx}'],
    extends: ['plugin:@typescript-eslint/eslint-recommended', 'plugin:@typescript-eslint/recommended'],
    plugins: ['@typescript-eslint'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      projectService: true,
      tsconfigRootDir: process.cwd(),
      projectFolderIgnoreList: [/node_modules/i],
      // We need this configuration to avoid performance issues in monorepos
      // https://github.com/typescript-eslint/typescript-eslint/issues/1192#issuecomment-862414778
      allowAutomaticSingleRunInference: true,
    },
    rules: {
      // General improvements
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
            ...tsConfigOptions[0].parserOptions,
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
