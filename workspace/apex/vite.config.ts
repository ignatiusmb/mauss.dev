import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { ROUTES } from './src/routes/content/builder';

const uploads = {
	name: 'mauss:/uploads',
	apply: 'build' as const,
	async buildStart() {
		const uploads = await ROUTES['/uploads']();
		for (const [umbrella, files] of uploads) {
			console.log(`Transferred ${files.length} files to /${umbrella}`);
			for (const asset of files) console.log(`  - ${asset}`);
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
