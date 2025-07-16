import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig(() => {
	return {
		build: {
			assetsInlineLimit: Infinity,
			cssTarget: 'chrome111',
		},

		plugins: [sveltekit()],
	};
});
