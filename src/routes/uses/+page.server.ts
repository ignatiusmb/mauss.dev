import { compile } from 'marqua/fs';

export const load: import('./$types').PageServerLoad = async () => {
	return compile('content/sites/dev.mauss/uses.md');
};
