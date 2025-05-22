import petbeeConfig from '@petbee/eslint-config'

export default [
  ...petbeeConfig,
  {
    files: ['packages/eslint-config/**/*.js', 'packages/prettier-config/**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      ecmaVersion: 2022,
      globals: {
        require: 'readonly',
        module: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        exports: 'readonly',
        process: 'readonly',
      },
    },
  },
  {
    ignores: [
      'packages/eslint-config/rules/*.js',
      'packages/eslint-config/lib/*.js',
      'packages/eslint-config/index.js',
      'packages/prettier-config/prettier.config.js',
      '**/*/*.d.ts',
    ],
  },
]
