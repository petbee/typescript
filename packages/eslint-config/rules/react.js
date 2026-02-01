module.exports = {
  plugins: ['react'],
  extends: ['plugin:react/recommended', 'plugin:react-hooks/recommended'],
  rules: {
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
  },
}
