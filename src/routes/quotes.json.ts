import type { RequestHandler } from '@sveltejs/kit';
import type { Quote } from '$lib/types';
import { exists } from 'mauss/guards';
import { traverse } from 'marqua';

export const get: RequestHandler = async ({ locals: { entry } }) => {
	const body: Array<Quote> = [];
	traverse({ entry, minimal: true }, ({ content, breadcrumb: [filename] }) => {
		const author = filename.slice(0, -3).replace(/-/g, ' ');
		for (const line of content.split(/\r?\n/).filter(exists)) {
			const [quote, from] = line.split('#!/');
			body.push({ author, quote, from });
		}
		return undefined;
	});
	return { body };
};
