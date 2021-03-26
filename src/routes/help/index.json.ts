import type { RequestHandler } from '@sveltejs/kit';
import { parseFile } from 'marqua';

export const get: RequestHandler = async () => {
	const article = parseFile<{ title: string }>('content/help.md', ({ frontMatter, content }) => ({
		...frontMatter,
		content,
	}));

	return {
		headers: { 'Content-Type': 'application/json' },
		body: article,
	};
};
