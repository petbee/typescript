const { hasPackage } = require('../lib/utils')

const hasNextJs = hasPackage('next')

const nextjsRules = {
  // Allow non-camelCase naming in Next.js projects (e.g., route segments, pages, metadata)
  '@typescript-eslint/naming-convention': 'off',
  // Next.js specific rules can be added here
  // For example, enforce no HTML <img> element usage
  '@next/next/no-img-element': 'error',
  // Enforce usage of next/link for navigation
  '@next/next/no-html-link-for-pages': 'warn',
}

// Legacy config for ESLint < 9 - only created if Next.js is available
let legacyConfig = {}

if (hasNextJs) {
  legacyConfig = {
    plugins: ['@next/eslint-plugin-next'],
    extends: ['plugin:@next/next/recommended'],
    rules: nextjsRules,
  }
}

module.exports = legacyConfig

// Flat config for ESLint v9+ - only created if Next.js is available
let flatConfig = []

if (hasNextJs) {
  const nextjsPlugin = require('@next/eslint-plugin-next')

  flatConfig = [
    {
      files: ['**/*.{jsx,tsx}'],
      plugins: {
        '@next/next': nextjsPlugin,
      },
      rules: {
        ...nextjsPlugin.configs.recommended.rules,
        ...nextjsRules,
      },
    },
  ]
}

module.exports.flat = flatConfig
