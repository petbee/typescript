import petbeeConfig from '@petbee/eslint-config'

export default [
  ...petbeeConfig,
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
