import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import autoprefixer from 'autoprefixer';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess({
		postcss: { plugins: [autoprefixer()] },
	}),
	kit: {
		adapter: adapter(),
		prerender: {
			default: true,
		},
	},
};

export default config;
