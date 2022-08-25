import { compile } from 'marqua';

export const load: import('./$types').PageServerLoad = async () => compile('content/src/help.md');
