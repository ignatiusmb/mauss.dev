import aliasFactory from '@rollup/plugin-alias';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';

import svelte from 'rollup-plugin-svelte';
import autoPreprocess from 'svelte-preprocess';
import { terser } from 'rollup-plugin-terser';

import config from 'sapper/config/rollup.js';
import pkg from './package.json';

const mode = process.env.NODE_ENV;
const dev = mode === 'development';
const legacy = !!process.env.SAPPER_LEGACY_BUILD;

const onwarn = (warning, onwarn) =>
	(warning.code === 'MISSING_EXPORT' && /'preload'/.test(warning.message)) ||
	(warning.code === 'CIRCULAR_DEPENDENCY' && /[/\\]@sapper[/\\]/.test(warning.message)) ||
	onwarn(warning);

const rootPath = require('path').resolve(__dirname, 'src');
const alias = aliasFactory({
	entries: [
		{ find: '@app', replacement: `${rootPath}/` },
		{ find: '@components', replacement: `${rootPath}/components` },
		{ find: '@pages', replacement: `${rootPath}/pages` },
		{ find: '@styles', replacement: `${rootPath}/styles` },
		{ find: '@svelte', replacement: `${rootPath}/svelte` },
		{ find: '@utils', replacement: `${rootPath}/utils` },
	],
});
const preprocess = [
	autoPreprocess({
		postcss: { plugins: [require('autoprefixer')()] },
		sourceMap: dev,
	}),
];

export default {
	client: {
		input: config.client.input(),
		output: config.client.output(),
		preserveEntrySignatures: false,
		onwarn,
		plugins: [
			replace({
				'process.browser': true,
				'process.env.NODE_ENV': JSON.stringify(mode),
			}),
			alias,
			svelte({
				preprocess,
				dev,
				hydratable: true,
				emitCss: true,
			}),
			resolve({
				browser: true,
				dedupe: ['svelte'],
			}),
			commonjs(),
			typescript({ noEmitOnError: false }),
			json(),

			legacy &&
				babel({
					extensions: ['.js', '.mjs', '.html', '.svelte'],
					babelHelpers: 'runtime',
					exclude: ['node_modules/@babel/**'],
					presets: [['@babel/preset-env', { targets: '> 0.25%, not dead' }]],
					plugins: ['@babel/plugin-syntax-dynamic-import', ['@babel/plugin-transform-runtime', { useESModules: true }]],
				}),

			!dev && terser({ module: true }),
		],
	},

	server: {
		input: config.server.input(),
		output: config.server.output(),
		preserveEntrySignatures: 'strict',
		external: Object.keys(pkg.dependencies).concat(require('module').builtinModules),
		onwarn,
		plugins: [
			replace({
				'process.browser': false,
				'process.env.NODE_ENV': JSON.stringify(mode),
			}),
			alias,
			svelte({
				preprocess,
				dev,
				hydratable: true,
				generate: 'ssr',
			}),
			resolve({ dedupe: ['svelte'] }),
			commonjs(),
			typescript({ noEmitOnError: false }),
			json(),
		],
	},

	serviceworker: {
		input: config.serviceworker.input(),
		output: config.serviceworker.output(),
		preserveEntrySignatures: false,
		onwarn,
		plugins: [
			resolve(),
			replace({
				'process.browser': true,
				'process.env.NODE_ENV': JSON.stringify(mode),
			}),
			commonjs(),
			!dev && terser(),
		],
	},
};
