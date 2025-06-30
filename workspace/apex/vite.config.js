import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { ROUTES } from './src/routes/content/builder';

export default defineConfig(async ({ command }) => {
	if (command === 'build') {
		const uploads = await ROUTES['/uploads']();
		for (const route in uploads) {
			console.log(`Uploaded ${uploads[route].length} files for ${route}`);
		}
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
