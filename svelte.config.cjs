const pkg = require('./package.json');

/** @type {import('@sveltejs/kit').Config} */
module.exports = {
	preprocess: require('svelte-preprocess')({
		defaults: { script: 'javascript' },
	}),
	kit: {
		adapter: require('@sveltejs/adapter-static')(),
		vite: {
			optimizeDeps: {
				exclude: ['marqua'],
				include: ['markdown-it'],
			},
			ssr: {
				noExternal: [
					'@ignatiusmb/aqua',
					'@ignatiusmb/aqua/lib/aqua.cbs',
					...Object.keys(pkg.dependencies || {}),
				],
			},
		},
	},
};
