import { compile } from 'marqua';

export const load: import('./$types').PageServerLoad = () => {
	return compile('content/sites/dev.mauss/help.md') as { content: string };
};
