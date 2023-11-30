import { cpSync } from 'fs';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { DATA } from './src/lib/content';

export default defineConfig(({ command }) => {
	cpSync('content/assets', 'static/assets', { recursive: true });

	if (command === 'build') {
		for (const key in DATA) {
			// @ts-expect-error
			void DATA[key].all();
		}
	}

	const ssr = command === 'serve' && {
		external: ['markdown-it', 'shiki'],
	};

	return {
		plugins: [sveltekit()],

		server: {
			fs: { allow: ['..'] },
			port: 3000,
		},

		ssr: ssr || undefined,
	};
});
