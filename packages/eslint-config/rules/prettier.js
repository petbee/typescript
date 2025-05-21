// https://github.com/prettier/eslint-plugin-prettier
module.exports = {
  extends: ['plugin:prettier/recommended'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
}

// Flat config for ESLint v9 (no extends, plugins as object)
module.exports.flat = {
  plugins: {
    prettier: require('eslint-plugin-prettier'),
  },
  rules: module.exports.rules,
}
