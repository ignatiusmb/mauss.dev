import { cpSync } from 'fs';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import * as md from './src/lib/content';

export default defineConfig(({ command }) => {
	cpSync('content/assets', 'static/assets', { recursive: true });

	if (command === 'build') {
		for (const key in md) {
			void md[key].all();
		}
	}

	return {
		plugins: [sveltekit()],

		server: {
			fs: { allow: ['..'] },
			port: 3000,
		},

		ssr: command === 'serve' && {
			external: ['markdown-it', 'shiki'],
		},
	};
});
