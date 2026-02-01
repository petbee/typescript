const { hasPackage } = require('../lib/utils')

const hasReact = hasPackage('react')

const reactRules = {
  // Allow non-camelCase naming in React projects (e.g., components, hooks, CSS modules)
  '@typescript-eslint/naming-convention': 'off',
  // Enforce consistent usage of function component definition
  // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/function-component-definition.md
  'react/function-component-definition': [
    'error',
    {
      namedComponents: 'arrow-function',
      unnamedComponents: 'arrow-function',
    },
  ],
  // Prevent missing React when using JSX (React 17+ JSX transform)
  'react/react-in-jsx-scope': 'off',
  // Enforce rules of hooks
  'react-hooks/rules-of-hooks': 'error',
  // Verify the list of the dependencies for Hooks like useEffect and similar
  'react-hooks/exhaustive-deps': 'warn',
}

// Legacy config for ESLint < 9
module.exports = {
  plugins: ['react'],
  extends: ['plugin:react/recommended', 'plugin:react-hooks/recommended'],
  rules: reactRules,
}

// Flat config for ESLint v9+ - only created if React is available
let flatConfig = []

if (hasReact) {
  // If React is available, require React plugins. If they're missing, this will fail (expected behavior)
  const reactPlugin = require('eslint-plugin-react')
  const reactHooksPlugin = require('eslint-plugin-react-hooks')

  flatConfig = [
    {
      files: ['**/*.{jsx,tsx}'],
      plugins: {
        react: reactPlugin,
        'react-hooks': reactHooksPlugin,
      },
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      rules: {
        ...reactPlugin.configs.recommended.rules,
        ...reactHooksPlugin.configs.recommended.rules,
        ...reactRules,
      },
    },
  ]
}

module.exports.flat = flatConfig
