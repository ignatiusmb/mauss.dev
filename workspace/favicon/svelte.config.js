import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		runes: true,
	},

	preprocess: [vitePreprocess()],

	kit: {
		adapter: adapter(),

		alias: {
			$apex: '../apex/src',
		},

		output: {
			bundleStrategy: 'inline',
		},

		router: {
			type: 'hash',
		},

		typescript: {
			config: (settings) => ({ extends: 'mauss/tsconfig.json', ...settings }),
		},
	},
};

export default config;
