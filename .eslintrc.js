module.exports = {
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
	},
	env: {
		es6: true,
		browser: true,
		node: true,
	},
	plugins: ['svelte3'],
	ignorePatterns: ['public/build'],
	overrides: [
		{
			files: ['**/*.svelte'],
			processor: 'svelte3/svelte3',
		},
	],
	extends: ['eslint:recommended'],
};
