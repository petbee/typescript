module.exports = {
  plugins: ['@next/eslint-plugin-next'],
  extends: ['plugin:@next/next/recommended'],
  rules: {
    // Allow non-camelCase naming in Next.js projects (e.g., route segments, pages, metadata)
    '@typescript-eslint/naming-convention': 'off',
    // Next.js specific rules can be added here
    // For example, enforce no HTML <img> element usage
    '@next/next/no-img-element': 'error',
    // Enforce usage of next/link for navigation
    '@next/next/no-html-link-for-pages': 'warn',
  },
}
