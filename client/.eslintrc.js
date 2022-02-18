module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	extends: ["plugin:react/recommended", "standard"],
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 12,
		sourceType: "module"
	},
	plugins: ["react"],
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
