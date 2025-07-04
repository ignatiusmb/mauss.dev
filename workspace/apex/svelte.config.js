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
			// aubade: '../../../ignatiusmb.aubade/workspace/aubade/src',
			// syv: '../../../ignatiusmb.syv/src/lib',
		},

		typescript: {
			config: (settings) => ({ extends: 'mauss/tsconfig.json', ...settings }),
		},

		version: {
			pollInterval: 1000 * 60 * 15, // 15 minutes
		},
	},
};

export default config;
