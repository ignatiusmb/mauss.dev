module.exports = {
	root: true,
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
	},
	plugins: ['svelte3', '@typescript-eslint'],
	settings: {
		'svelte3/typescript': () => require('typescript'),
	},
	env: { browser: true, es2017: true, node: true },
	ignorePatterns: ['*.cjs'],
	overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
	rules: {
		'@typescript-eslint/no-explicit-any': 'off',
	},
};
