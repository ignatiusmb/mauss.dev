import { compile } from 'marqua/fs';

export const load: import('./$types').PageServerLoad = () => {
	return {
		article: compile('content/sites/dev.mauss/help.md'),
		meta: {
			canonical: 'help',
			title: 'Help',
			description: 'Help page for all the content in this website.',
		},
	};
};
