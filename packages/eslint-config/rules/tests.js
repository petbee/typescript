// Jest:
// https://github.com/jest-community/eslint-plugin-jest/blob/master/docs/rules
// Cypress: https://github.com/cypress-io/eslint-plugin-cypress/blob/master/docs/rules

module.exports = {
  overrides: [
    // ! CYPRESS
    {
      files: ['**/cypress/**/*.{ts,tsx,js,jsx}'],
      extends: ['plugin:cypress/recommended'],
      rules: {
        // Enforce assertions before taking a screenshot
        // https://github.com/cypress-io/eslint-plugin-cypress/blob/master/docs/rules/assertion-before-screenshot.md
        'cypress/assertion-before-screenshot': 'warn',
      },
    },
    // ! JEST
    {
      // Run through every test file found
      files: ['*.{test,spec}.{ts,tsx,js,jsx}'],
      // Unless it's inside a cypress directory
      excludedFiles: ['**/cypress/**'],
      extends: ['plugin:jest/recommended', 'plugin:jest/style'],
      rules: {
        // Enforce consistent a test method name
        // https://github.com/jest-community/eslint-plugin-jest/blob/master/docs/rules/consistent-test-it.md
        'jest/consistent-test-it': [
          'warn',
          {
            fn: 'test',
            withinDescribe: 'it',
          },
        ],

        // Disallow alias methods
        // https://github.com/jest-community/eslint-plugin-jest/blob/master/docs/rules/no-alias-methods.md
        'jest/no-alias-methods': 'error',

        // Disallow duplicate setup/teardown hooks
        // https://github.com/jest-community/eslint-plugin-jest/blob/master/docs/rules/no-duplicate-hooks.md
        'jest/no-duplicate-hooks': 'error',

        // Suggest to have all hooks at top-level before tests
        // https://github.com/jest-community/eslint-plugin-jest/blob/master/docs/rules/prefer-hooks-on-top.md
        'jest/prefer-hooks-on-top': 'error',

        // Suggest jest.spyOn() instead of jest.fn()
        // https://github.com/jest-community/eslint-plugin-jest/blob/master/docs/rules/prefer-spy-on.md
        'jest/prefer-spy-on': 'warn',

        // Suggest using test.todo()
        // https://github.com/jest-community/eslint-plugin-jest/blob/master/docs/rules/prefer-todo.md
        'jest/prefer-todo': 'warn',

        // Disallow return statements from tests
        // https://github.com/jest-community/eslint-plugin-jest/blob/master/docs/rules/no-test-return-statement.md
        'jest/no-test-return-statement': 'warn',

        // Disallow deprecated jest functions
        // https://github.com/jest-community/eslint-plugin-jest/blob/master/docs/rules/no-deprecated-functions.md
        'jest/no-deprecated-functions': 'error',
      },
    },
  ],
}

// Flat config for ESLint v9 (no extends, plugins as object)
module.exports.flat = [
  {
    files: module.exports.overrides[0].files,
    plugins: {
      cypress: require('eslint-plugin-cypress'),
    },
    rules: module.exports.overrides[0].rules,
  },
  {
    files: module.exports.overrides[1].files,
    excludedFiles: module.exports.overrides[1].excludedFiles,
    plugins: {
      jest: require('eslint-plugin-jest'),
    },
    rules: module.exports.overrides[1].rules,
  },
]
