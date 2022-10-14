import adapter from '@sveltejs/adapter-vercel';
import preprocess from 'svelte-preprocess';
import autoprefixer from 'autoprefixer';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess({
		postcss: { plugins: [autoprefixer()] },
	}),
	kit: {
		adapter: adapter(),
	},
};

export default config;
