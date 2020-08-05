const sveltePreprocess = require('svelte-preprocess');
const { mdsvex } = require('mdsvex');

const dev = process.env.NODE_ENV === 'development';
const preprocess = [
	sveltePreprocess({
		postcss: { plugins: [require('autoprefixer')()] },
		sourceMap: dev,
	}),
	mdsvex(),
];

module.exports = { preprocess };
