import { compile } from 'marqua';

export const load: import('./$types').PageServerLoad = async () => {
	return compile('content/sites/dev.mauss/uses.md') as { content: string };
};
