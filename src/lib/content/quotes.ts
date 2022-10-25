import type { Quote } from '$lib/types';
import { traverse } from 'marqua';
import { exists } from 'mauss/guards';

export function all() {
	const body: Array<Quote> = [];
	traverse(
		{ entry: 'content/sites/dev.mauss/quotes', minimal: true },
		({ content, breadcrumb: [filename] }) => {
			const author = filename.slice(0, -3).replace(/-/g, ' ');
			for (const line of content.split(/\r?\n/).filter(exists)) {
				const [quote, from] = line.split('#!/');
				body.push({ author, quote, from });
			}
			return undefined;
		}
	);
	return body;
}
