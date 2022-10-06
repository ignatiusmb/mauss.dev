import { compile } from 'marqua';

export const load: import('./$types').PageServerLoad = () => {
	return compile('content/src/help.md') as { content: string };
};
