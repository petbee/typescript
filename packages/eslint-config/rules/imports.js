// https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules
module.exports = {
  extends: ['plugin:import/typescript'],
  plugins: ['import'],
  rules: {
    // Disallow non-import statements appearing before import statements
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/first.md
    'import/first': 'error',

    // Disallow duplicate imports
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-duplicates.md
    'import/no-duplicates': 'error',

    // Ensure native, external and internal imports are separated, above relative imports and that unassigned imports are ignored
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/order.md
    'import/order': [
      'error',
      {
        'newlines-between': 'always-and-inside-groups',
        groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index'], 'type'],
      },
    ],

    // Require a newline after the last import/require in a group
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/newline-after-import.md
    'import/newline-after-import': 'error',

    // Forbid import of modules using absolute paths
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-absolute-path.md
    'import/no-absolute-path': 'error',

    // Forbid mutable exports
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-mutable-exports.md
    'import/no-mutable-exports': 'error',

    // Disallow invalid exports, e.g. multiple defaults
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/export.md
    'import/export': 'error',

    // Ensures that there are no useless path segments
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-useless-path-segments.md
    'import/no-useless-path-segments': ['error', { commonjs: true }],

    // Forbid a module from importing itself
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-self-import.md
    'import/no-self-import': 'error',
  },
}

// Flat config for ESLint v9/v10. We alias `eslint-plugin-import-x` (the
// actively maintained, ESLint 10 compatible fork) under the `import` plugin
// name so existing `import/...` rule names keep working as drop-in.
// Note: like the legacy `plugin:import/typescript` extends, TypeScript path
// resolution depends on a resolver being installed (e.g. eslint-import-resolver-typescript)
// in the consumer project; rules like `import/no-self-import` and the
// `internal` group of `import/order` will fall back to default resolution otherwise.
module.exports.flat = {
  plugins: {
    import: require('eslint-plugin-import-x'),
  },
  rules: module.exports.rules,
}
