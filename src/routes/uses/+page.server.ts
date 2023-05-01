import { compile } from 'marqua/fs';

export const load: import('./$types').PageServerLoad = async () => {
	return {
		article: compile('content/sites/dev.mauss/uses.md'),
		meta: {
			canonical: 'uses',
			title: 'Uses',
			description: 'Collections detailing the setup, applications, workstations, and other stuffs.',
		},
	};
};
