const { hasPackage } = require('../lib/utils')

const hasTypescript = hasPackage('typescript')
const hasNestJs = hasPackage('@nestjs/core')

const tsConfigOptions = [
  {
    files: ['**/*.{ts,tsx}'],
    extends: ['plugin:@typescript-eslint/eslint-recommended', 'plugin:@typescript-eslint/recommended'],
    plugins: ['@typescript-eslint'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      project: [
        // look in the root
        'tsconfig{.eslint.json,.json}',
        // look in dirs like node/react
        '*/tsconfig{.eslint.json,.json}',
        // look in dirs like packages/package/*
        '*/*/tsconfig{.eslint.json,.json}',
      ],
      projectService: true,
      tsconfigRootDir: process.cwd(),
      projectFolderIgnoreList: [/node_modules/i],
      // We need this configuration to avoid performance issues in monorepos
      // https://github.com/typescript-eslint/typescript-eslint/issues/1192#issuecomment-862414778
      allowAutomaticSingleRunInference: true,
    },
    rules: {
      //! extensions of native eslint rules
      //! when modifying a rule here, make sure to modify the native one and vice-versa

      // Disallow declaration of variables already declared in the outer scope
      // https://eslint.org/docs/rules/no-shadow
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': [
        'error',
        {
          allow: ['done', 'next', 'resolve', 'reject', 'cb'],
        },
      ],

      // Prevent unused declared variables
      // https://typescript-eslint.io/rules/no-unused-vars/
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          ignoreRestSiblings: true,
          argsIgnorePattern: '^_+',
          varsIgnorePattern: '^_',
        },
      ],

      // Disallows the use of eval()-like methods
      // https://typescript-eslint.io/rules/no-magic-numbers/
      'no-magic-numbers': 'off',
      '@typescript-eslint/no-magic-numbers': [
        'off',
        {
          ignore: [0, 1, 2, 3],
          ignoreArrayIndexes: true,
          enforceConst: true,
          detectObjects: false,
          ignoreNumericLiteralTypes: true,
          ignoreEnums: true,
        },
      ],

      // Enforce parameters with default values to be last
      // https://typescript-eslint.io/rules/default-param-last/
      'default-param-last': 'off',
      '@typescript-eslint/default-param-last': 'error',

      // Disallow useless constructors
      // https://typescript-eslint.io/rules/no-useless-constructor/
      'no-useless-constructor': 'off',
      '@typescript-eslint/no-useless-constructor': 'error',

      // Disallow empty functions, except for standalone funcs/arrows
      // https://eslint.org/docs/rules/no-empty-function
      'no-empty-function': 'off',
      '@typescript-eslint/no-empty-function': [
        'error',
        {
          allow: ['arrowFunctions', 'functions', 'methods'],
        },
      ],

      // Require a consistent naming convention
      // https://typescript-eslint.io/rules/naming-convention/
      camelcase: 'off',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'default',
          format: ['camelCase'],
          leadingUnderscore: 'allow',
          trailingUnderscore: 'allow',
        },
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
          leadingUnderscore: 'allow',
          trailingUnderscore: 'allow',
        },
        {
          selector: 'function',
          format: ['camelCase', 'PascalCase'],
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
        {
          selector: 'memberLike',
          format: null,
        },
        {
          // have to leave this for now as this rule
          // doesn't separate regular parameters from
          // destructured parameters
          selector: 'parameter',
          format: null,
        },
      ],

      // Disallow use of variables before they are defined
      // https://typescript-eslint.io/rules/no-use-before-define/
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': [
        'error',
        {
          functions: false,
          classes: false,
          variables: true,
          enums: false,
          typedefs: false,
        },
      ],
      // ! ts only rules
      // Enforce explicit accessibility modifiers on class properties and methods
      // https://typescript-eslint.io/rules/explicit-member-accessibility/
      '@typescript-eslint/explicit-member-accessibility': hasNestJs
        ? 'off'
        : [
            'error',
            {
              accessibility: 'explicit',
              overrides: {
                accessors: 'explicit',
                constructors: 'no-public',
                methods: 'explicit',
                parameterProperties: 'explicit',
              },
            },
          ],

      // Don't allow "any" at all
      // https://typescript-eslint.io/rules/no-explicit-any
      '@typescript-eslint/no-explicit-any': hasNestJs ? 'warn' : 'error',

      // Enforce explicit function return type
      // https://typescript-eslint.io/rules/explicit-function-return-type/
      '@typescript-eslint/explicit-function-return-type': 'off',

      // Enforce a consistent way of typing arrays
      // https://typescript-eslint.io/rules/array-type/v
      '@typescript-eslint/array-type': [
        'warn',
        {
          default: 'array-simple',
          readonly: 'array-simple',
        },
      ],

      // Enforce a consitent way to type objects
      // https://typescript-eslint.io/rules/consistent-type-definitions/
      '@typescript-eslint/consistent-type-definitions': 'off',

      // Disallow non null assertions (!), comes from the recommended config
      // https://typescript-eslint.io/rules/no-non-null-assertion/
      '@typescript-eslint/no-non-null-assertion': 'warn',

      // Enforce that when adding two variables, operands must both be of type number or of type string
      // https://typescript-eslint.io/rules/restrict-plus-operands/
      '@typescript-eslint/restrict-plus-operands': ['error'],

      // Enforce optional chaining over chaining AND (&&) operators
      // https://typescript-eslint.io/rules/prefer-optional-chain/
      '@typescript-eslint/prefer-optional-chain': 'warn',

      // Enforce optional chaining over chaining AND (&&) operators
      // https://typescript-eslint.io/rules/no-non-null-asserted-optional-chain/
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',

      // Enforce nullish coalescing over short-circuiting
      // https://typescript-eslint.io/rules/prefer-nullish-coalescing/
      '@typescript-eslint/prefer-nullish-coalescing': [
        'warn',
        {
          ignoreConditionalTests: true,
          ignoreMixedLogicalExpressions: true,
        },
      ],

      // Prefer usage of as const over literal type
      // https://typescript-eslint.io/rules/prefer-as-const/
      '@typescript-eslint/prefer-as-const': 'error',

      // Prevent unnecessary type arguments
      // https://typescript-eslint.io/rules/no-unnecessary-type-arguments/
      '@typescript-eslint/no-unnecessary-type-arguments': 'warn',

      // Warns when a namespace qualifier is unnecessary
      // https://typescript-eslint.io/rules/no-unnecessary-qualifier/
      '@typescript-eslint/no-unnecessary-qualifier': 'warn',

      // Disallow throwing literals as exceptions
      // https://typescript-eslint.io/rules/no-throw-literal/
      'no-throw-literal': 'warn',

      // Disallows invocation of require() in favor of import statements
      // https://typescript-eslint.io/rules/no-require-imports/
      '@typescript-eslint/no-require-imports': 'warn',

      // Disallows the use of eval()-like methods
      // https://typescript-eslint.io/rules/no-implied-eval/
      '@typescript-eslint/no-implied-eval': 'error',

      // Requires Array#sort calls to always provide a compareFunction
      // https://typescript-eslint.io/rules/require-array-sort-compare/
      '@typescript-eslint/require-array-sort-compare': 'error',

      // Enforce explicit enum item values
      // https://typescript-eslint.io/rules/prefer-enum-initializers/
      '@typescript-eslint/prefer-enum-initializers': 'warn',

      // Explicitly defines what a module scoped method returns
      // https://typescript-eslint.io/rules/explicit-module-boundary-types/
      '@typescript-eslint/explicit-module-boundary-types': 'off',

      // Disallow // @ts comments
      // https://typescript-eslint.io/rules/ban-ts-comment/
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-expect-error': 'allow-with-description',
          'ts-ignore': true,
          'ts-nocheck': true,
          'ts-check': false,
          minimumDescriptionLength: 3,
        },
      ],

      // Disallows unnecessary constraints on generic types
      // https://typescript-eslint.io/rules/no-unnecessary-type-constraint/
      '@typescript-eslint/no-unnecessary-type-constraint': 'warn',

      // Enforces consistent usage of type imports
      // https://typescript-eslint.io/rules/consistent-type-imports/
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        {
          prefer: 'type-imports',
          disallowTypeAnnotations: false,
        },
      ],
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
