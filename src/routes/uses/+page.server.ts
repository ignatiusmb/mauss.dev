import { compile } from 'marqua';

export const load: import('./$types').PageServerLoad = async () => {
	return compile('content/src/uses.md') as { content: string };
};
