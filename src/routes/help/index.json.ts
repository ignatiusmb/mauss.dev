import type { RequestHandler } from '@sveltejs/kit';
import { parseFile } from 'marqua';

export const get: RequestHandler = async () => {
	const body = parseFile<{ title: string }>('content/help.md', ({ frontMatter, content }) => ({
		...frontMatter,
		content,
	}));

	return { body };
};
