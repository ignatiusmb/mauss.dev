import adapter from '@sveltejs/adapter-vercel';
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
			$content: './src/routes/content',
			// syv: '../ignatiusmb.syv/src/lib',
		},

		prerender: {
			handleMissingId: 'warn',
		},

		typescript: {
			config: (settings) => ({ extends: 'mauss/tsconfig.json', ...settings }),
		},
	},
};

export default config;
