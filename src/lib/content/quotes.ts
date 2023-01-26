import type { Quote } from '$lib/types';
import { traverse } from 'marqua/fs';
import { exists } from 'mauss/guards';

export function all() {
	const quotes = traverse(
		{ entry: 'content/sites/dev.mauss/quotes' },
		({ breadcrumb: [filename], content }) => {
			const body: Array<Quote> = [];
			const author = filename.slice(0, -3).replace(/-/g, ' ');
			for (const line of content.split(/\r?\n/).filter(exists)) {
				const [quote, from] = line.split('#!/');
				body.push({ author, quote, from });
			}
			return body;
		},
		(items) => items.flat()
	);
	return { quotes };
}
