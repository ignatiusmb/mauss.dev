import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import autoprefixer from 'autoprefixer';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pkg = require('./package.json');

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess({
		defaults: { script: 'javascript' },
		postcss: { plugins: [autoprefixer()] },
	}),
	kit: {
		adapter: adapter(),
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

export default config;
