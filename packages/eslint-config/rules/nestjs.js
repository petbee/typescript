const { hasPackage } = require('../lib/utils')
const nestjsLint = require('@darraghor/eslint-plugin-nestjs-typed')
const { tsParserOptions } = require('./shared-config.js')

const hasNestJs = hasPackage('@nestjs/core')

const nestjsRules = {
  '@typescript-eslint/interface-name-prefix': 'off',
  '@typescript-eslint/explicit-function-return-type': 'off',
  '@typescript-eslint/explicit-module-boundary-types': 'off',
  '@typescript-eslint/no-explicit-any': 'off',
  '@typescript-eslint/no-extraneous-class': [
    'error',
    {
      allowWithDecorator: true,
      allowStaticOnly: true,
      allowEmpty: true,
      allowConstructorOnly: false,
    },
  ],
  'no-redeclare': 'off',
}

// If NestJS is present, take its flatRecommended array and
// graft in parserOptions from shared config:
const nestFlat = hasNestJs
  ? [
      ...nestjsLint.default.configs.flatRecommended.map((cfg) => ({
        ...cfg,
        languageOptions: {
          parser: require('@typescript-eslint/parser'),
          parserOptions: {
            ...tsParserOptions,
            // merge with any NestJS-specific parserOptions
            ...cfg.languageOptions?.parserOptions,
          },
          ...cfg.languageOptions,
        },
      })),
      {
        rules: nestjsRules,
      },
    ]
  : []

module.exports.flat = nestFlat
