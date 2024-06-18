import { cpSync } from 'fs';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { DATA } from './src/lib/content';

export default defineConfig(({ command }) => {
	cpSync('content/assets', 'static/assets', { recursive: true });

	if (command === 'build') {
		// @ts-expect-error - generate static assets
		for (const key in DATA) void DATA[key];
	}

	const ssr = command === 'serve' && {
		external: ['markdown-it', 'shiki'],
	};

	return {
		build: {
			cssTarget: 'chrome111',
		},

		plugins: [sveltekit()],

		server: {
			fs: { allow: ['..'] },
			port: 3000,
		},

		ssr: ssr || undefined,
	};
});
