module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es2021: true
	},
	extends: [
		"standard"
	],
	parserOptions: {
		ecmaVersion: "latest"
	},
	rules: {
		camelcase: "off",
		semi: ["error", "never"],
		indent: ["error", "tab"],
		"no-tabs": 0,
		"space-before-function-paren": [
			"error",
			{ anonymous: "always", named: "never" }
		],
		"multiline-ternary": ["off"],
		quotes: [
			"error",
			"double",
			{
				allowTemplateLiterals: true,
				avoidEscape: true
			}
		]
	}
}
