// Should pass type-checking
const a: number = 123
// Should fail type-checking
// @ts-expect-error - Intentional mismatch to validate strict type checks.
const b: string = 456
