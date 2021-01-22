const sveltePreprocess = require('svelte-preprocess');

// This file is only for language server and svelte-check
module.exports = {
	preprocess: sveltePreprocess({
		defaults: { script: 'typescript' },
		sourceMap: true,
	}),
};
