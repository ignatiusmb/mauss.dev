import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { DATA } from './src/lib/content';

export default defineConfig(async ({ command }) => {
	if (command === 'build' /* @ts-expect-error - generate static assets */) {
		await Promise.all(Object.keys(DATA).map((route) => void DATA[route]()));
	}

	return {
		build: {
			cssTarget: 'chrome111',
		},

		plugins: [sveltekit()],

		server: {
			fs: { allow: ['..'] },
			port: 3000,
		},
	};
});
