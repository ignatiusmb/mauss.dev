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

		alias: {
			$content: './src/routes/content',
			// syv: developing('../ignatiusmb[syv]/src/lib'),
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
