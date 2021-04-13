import type { RequestHandler } from '@sveltejs/kit';
import { isExists } from 'mauss/guards';
import { traverse } from 'marqua';

export const get: RequestHandler = async () => {
	const excerpts = traverse<{ author: string; lines: string[] }>(
		'content/src/quotes',
		({ content, filename }) => ({
			author: filename.split('.')[0].replace('-', ' '),
			lines: content.split(/\r?\n/).filter(isExists),
		})
	);

	const body = excerpts.reduce((acc, { author, lines }) => {
		for (const line of lines) {
			const [quote, from] = line.split('#!/');
			acc.push({ author, quote, from });
		}
		return acc;
	}, [] as Array<{ author: string; quote: string; from: string }>);

	return { body };
};
