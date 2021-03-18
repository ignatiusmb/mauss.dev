import { isExists } from 'mauss/guards';
import { parseDir } from '$lib/utils/parser';

type Excerpt = { author: string; lines: string[] };
type Quote = { author: string; quote: string; from: string };

export async function get() {
	const excerpts = parseDir<Excerpt>('content/quotes', ({ content, filename }) => ({
		author: filename.split('.')[0].replace('-', ' '),
		lines: content.split(/\r?\n/).filter(isExists),
	}));

	const quotes = excerpts.reduce((acc: Quote[], { author, lines }) => {
		for (const line of lines) {
			const [quote, from] = line.split('#!/');
			acc.push({ author, quote, from });
		}
		return acc;
	}, []);

	return {
		status: 200,
		headers: { 'Content-Type': 'application/json' },
		body: quotes,
	};
}
