const pkg = require('./package.json');

/** @type {import('@sveltejs/kit').Config} */
module.exports = {
	preprocess: require('svelte-preprocess')({
		defaults: { script: 'javascript' },
		postcss: { plugins: [require('autoprefixer')()] },
	}),
	kit: {
		adapter: require('@sveltejs/adapter-static')(),
		vite: {
			optimizeDeps: {
				exclude: ['marqua'],
				include: ['markdown-it'],
			},
			ssr: {
				noExternal: Object.keys(pkg.dependencies || {}),
			},
		},
	},
};
