import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';

function developing(condition) {
	return (process.env.NODE_ENV === 'development' && condition) || undefined;
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [vitePreprocess()],

	kit: {
		adapter: adapter(),

		alias: developing({
			syv: '../ignatiusmb[syv]/src/lib',
		}),

		prerender: {
			handleMissingId: 'warn',
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
