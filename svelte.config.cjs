const sveltePreprocess = require('svelte-preprocess');
const adapter = require('@sveltejs/adapter-static');
const pkg = require('./package.json');

/** @type {import('@sveltejs/kit').Config} */
module.exports = {
	preprocess: sveltePreprocess(),
	kit: {
		adapter: adapter(),
		target: '#svelte',
		vite: () => ({
			optimizeDeps: {
				exclude: ['mauss', 'svelement', 'svelement/icons'],
			},
			ssr: {
				noExternal: [
					'@ignatiusmb/aqua',
					'svelement',
					'svelement/icons',
					...Object.keys(pkg.dependencies || {}),
				],
			},
		}),
	},
};
