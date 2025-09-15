import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		runes: true,
	},

	kit: {
		adapter: adapter(),

		alias: {
			$apex: '../apex/src',
			$static: '../apex/static',
		},

		output: {
			bundleStrategy: 'inline',
		},

		router: {
			type: 'hash',
		},

		typescript: {
			config: (settings) => ({ extends: 'mauss/tsconfig.json', ...settings }),
		},
	},
};

export default config;
