import { compile } from 'marqua/fs';

export const load: import('./$types').PageServerLoad = () => {
	return compile('content/sites/dev.mauss/help.md');
};
