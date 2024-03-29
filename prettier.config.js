module.exports = {
  /**
   * Default values
   */
  // singleQuote: false,
  // jsxSingleQuote: false,
  // semi: true,
  // tabWidth: 2,
  // useTabs: false,
  // printWidth: 80,
  // trailingComma: "all",
  // quoteProps: "as-needed",
  // bracketSpacing: true,
  // bracketSameLine: false,
  // jsxBracketSameLine: false,
  // allowParens: "always",
  // rangeStart: 0,
  // rangeEnd: Infinity,
  // endOfLine: "lf",
  // requirePragma: false,
  // insertPragma: false,

  /**
   * Custom values
   */
  printWidth: 120,
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
  importOrder: [
    "^@jest/(.*)$",
    "",
    "^(react/(.*)$)|^(react$)",
    "^(next/(.*)$)|^(next$)",
    "",
    "<THIRD_PARTY_MODULES>",
    "^types$",
    "^@types$",
    "^@local/(.*)$",
    "^@/config/(.*)$",
    "^@/lib/(.*)$",
    "^@/components/(.*)$",
    "^@/styles/(.*)$",
    "^[./]",
  ],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderTypeScriptVersion: "5.0.0",
};
