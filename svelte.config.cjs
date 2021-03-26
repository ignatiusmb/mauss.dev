const sveltePreprocess = require('svelte-preprocess');
const adapter = require('@sveltejs/adapter-static');
const pkg = require('./package.json');

/** @type {import('@sveltejs/kit').Config} */
module.exports = {
	preprocess: sveltePreprocess(),
	kit: {
		adapter: adapter(),
		target: '#svelte',
		vite: {
			ssr: {
				noExternal: [
					'@ignatiusmb/aqua',
					'mauss/guards',
					'mauss/utils',
					'marqua',
					'svelement',
					'svelement/icons',
					...Object.keys(pkg.dependencies || {}),
				],
			},
		},
	},
};
