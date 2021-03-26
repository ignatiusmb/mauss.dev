const pkg = require('./package.json');

/** @type {import('@sveltejs/kit').Config} */
module.exports = {
	preprocess: require('svelte-preprocess')(),
	kit: {
		adapter: require('@sveltejs/adapter-static')(),
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
					'svelement/icons/feather',
					...Object.keys(pkg.dependencies || {}),
				],
			},
		},
	},
};
