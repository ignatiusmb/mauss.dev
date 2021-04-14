import type { RequestHandler } from '@sveltejs/kit';
import { isExists } from 'mauss/guards';
import { traverse } from 'marqua';

export const get: RequestHandler = async ({ context: { entry } }) => {
	const body: Array<{ author: string; quote: string; from: string }> = [];
	traverse(entry, ({ content, filename }) => {
		const author = filename.slice(0, -3).replace(/-/g, ' ');
		for (const line of content.split(/\r?\n/).filter(isExists)) {
			const [quote, from] = line.split('#!/');
			body.push({ author, quote, from });
		}
		return undefined;
	});
	return { body };
};
