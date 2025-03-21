module.exports = {
	semi: false,
	useTabs: true,
	tabWidth: 2,
	printWidth: 120,
	singleQuote: false,
	arrowParens: "always",
	trailingComma: "all",
	bracketSpacing: true,
	jsxBracketSameLine: false,
	// Organizing imports
	plugins: [require.resolve("@trivago/prettier-plugin-sort-imports")],
	importOrder: ["^react", "^@?\\w", "^[a-zA-Z]", "^@/(.*)$", "^[./]"],
	importOrderSeparation: true,
	importOrderSortSpecifiers: true,
	importOrderCaseInsensitive: true,
}
