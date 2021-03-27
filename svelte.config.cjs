const pkg = require('./package.json');

/** @type {import('@sveltejs/kit').Config} */
module.exports = {
	preprocess: require('svelte-preprocess')(),
	kit: {
		adapter: require('@sveltejs/adapter-static')(),
		target: '#svelte',
		vite: {
			optimizeDeps: {
				exclude: ['marqua'],
				include: ['markdown-it'],
			},
			ssr: {
				noExternal: [
					'@ignatiusmb/aqua',
					'@ignatiusmb/aqua/lib/aqua.cbs',
					'marqua',
					...Object.keys(pkg.dependencies || {}),
				],
			},
		},
	},
};
