// In addition to this config, we also install the "organize-imports" plugin, which makes Prettier
// organize `import`s using the TypeScript language service API (like "Organize Imports" in VS Code).
// (This is also where the peer dependency on TypeScript comes from.)

// Reference: https://prettier.io/docs/en/options.html
module.exports = {
  $schema: 'http://json.schemastore.org/prettierrc',

  // Specify the line length that the printer will wrap on.
  printWidth: 120,

  // Specify the number of spaces per indentation-level.
  tabWidth: 2,

  // Indent lines with tabs instead of spaces.
  useTabs: false,

  // Print semicolons at the ends of statements.
  semi: false,

  // Use single quotes instead of double quotes.
  singleQuote: true,

  // Use single quotes instead of double quotes in JSX.
  jsxSingleQuote: false,

  // Change when properties in objects are quoted.
  quoteProps: 'as-needed',

  // Print trailing commas wherever possible when multi-line. (A single-line array, for example, never gets trailing commas.)
  trailingComma: 'es5',

  // Print spaces between brackets in object literals.
  bracketSpacing: true,

  // Put the > of a multi-line JSX element at the end of the last line instead of being alone on the next line
  bracketSameLine: false,

  // Include parentheses around a sole arrow function parameter.
  arrowParens: 'always',
}
