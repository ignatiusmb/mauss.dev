import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [vitePreprocess()],

	kit: {
		adapter: adapter(),

		alias: process.env.NODE_ENV === 'development' && {
			syv: '../ignatiusmb[syv]/src/lib',
		},

		typescript: {
			config: (settings) => ({ extends: 'mauss/tsconfig.json', ...settings }),
		},
	},

	vitePlugin: {
		experimental: {
			inspector: {
				holdMode: true,
			},
		},
	},
};

export default config;
