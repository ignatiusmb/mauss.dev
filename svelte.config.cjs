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
					'@ignatiusmb/aqua/lib/aqua.cbs',
					'mauss/api',
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
