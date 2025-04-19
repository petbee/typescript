declare module '@petbee/eslint-config' {
  import type { FlatConfig } from 'eslint'

  // For ESLint v9.x (flat config)
  const flatConfig: FlatConfig.Config[]
  export default flatConfig

  // For older ESLint versions (.eslintrc)
  export const legacyConfig: Record<string, unknown>
}
