import { defineConfig } from "@hey-api/openapi-ts"

export default defineConfig({
	logs: { level: "debug" },
	input: "http://13.210.250.61:3000/api-docs-json/",
	output: {
		path: "./src/api-generated",
		lint: "eslint",
		clean: false,
		format: "prettier",
	},
	plugins: [
		"@hey-api/sdk",
		"@hey-api/client-axios",
		"@tanstack/react-query",
		{
			name: "@hey-api/typescript",
			enums: "typescript",
			exportInlineEnums: true,
		},
	],
})
