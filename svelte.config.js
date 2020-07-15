import sveltePreprocess from 'svelte-preprocess';

const dev = process.env.NODE_ENV === 'development';
export const preprocess = sveltePreprocess({
	postcss: { plugins: [require('autoprefixer')()] },
	typescript: { transpileOnly: dev },
});
