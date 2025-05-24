const { hasPackage, getFlat } = require('../lib/utils')
const nestjsLint = require('@darraghor/eslint-plugin-nestjs-typed')
const tsConfig = require('./typescript.js') // <-- our patched TS config

const hasNestJs = hasPackage('@nestjs/core')

// Grab TS-ESLint flat override
const tsFlat = getFlat(tsConfig)

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
// graft in parserOptions from tsFlat[0]:
const nestFlat = hasNestJs
  ? [
      ...nestjsLint.default.configs.flatRecommended.map((cfg) => ({
        ...cfg,
        languageOptions: {
          ...tsFlat[0].languageOptions,
          ...cfg.languageOptions,
          // merge parserOptions so `project` stays intact
          parserOptions: {
            ...tsFlat[0].languageOptions.parserOptions,
            ...cfg.languageOptions?.parserOptions,
          },
        },
      })),
      {
        rules: nestjsRules,
      },
    ]
  : []

module.exports.flat = nestFlat
