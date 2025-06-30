import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { ROUTES } from './src/routes/content/builder';

const uploads = {
	name: 'generate-uploads',
	apply: 'build' as const,
	async buildStart() {
		const uploads = await ROUTES['/uploads']();
		for (const route in uploads) {
			console.log(`Uploaded ${uploads[route].length} files for ${route}`);
		}
	},
};

export default defineConfig(() => {
	return {
		build: {
			cssTarget: 'chrome111',
		},

		plugins: [uploads, sveltekit()],

		server: {
			fs: { allow: ['..'] },
			port: 3000,
		},
	};
});
