const sveltePreprocess = require('svelte-preprocess');

// This file is only for language server and svelte-check
module.exports = {
	preprocess: sveltePreprocess({ sourceMap: true }),
};
