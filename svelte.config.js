import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import autoprefixer from 'autoprefixer';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess({
		postcss: { plugins: [autoprefixer()] },
	}),
	kit: {
		adapter: adapter(),
		trailingSlash: 'always',
		vite: {
			optimizeDeps: {
				exclude: ['marqua'],
				include: ['markdown-it'],
			},
			ssr: {
				noExternal: ['mauss', 'marqua'],
			},
		},
	},
};

export default config;
