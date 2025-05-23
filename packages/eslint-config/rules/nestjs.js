const { hasPackage } = require('../lib/utils')
const nestjsLint = require('@darraghor/eslint-plugin-nestjs-typed')

const hasNestJs = hasPackage('@nestjs/core')

module.exports = hasNestJs
  ? {
      plugins: [nestjsLint.classicPlugin],
    }
  : {}

// Flat config for ESLint v9 (no extends, plugins as object)
module.exports.flat = hasNestJs ? nestjsLint.default.configs.flatRecommended : []
