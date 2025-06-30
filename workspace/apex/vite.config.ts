import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { ROUTES } from './src/routes/content/builder';

const uploads = {
	name: 'mauss:/uploads',
	apply: 'build' as const,
	async buildStart() {
		const uploads = await ROUTES['/uploads']();
		for (const route in uploads) {
			console.log(`Transferred ${uploads[route].length} files to /${route}`);
			for (const file of uploads[route]) console.log(`  - ${file}`);
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
