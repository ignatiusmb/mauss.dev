import { compile } from 'marqua/fs';

export async function load() {
	return {
		article: compile('content/sites/dev.mauss/help.md'),
		meta: {
			canonical: 'help',
			title: 'Help',
			description: 'Help page for all the content in this website.',
		},
	};
}
