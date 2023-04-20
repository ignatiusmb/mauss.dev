import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig(({ command }) => {
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
