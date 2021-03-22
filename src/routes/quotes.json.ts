import { isExists } from 'mauss/guards';
import { parseDir } from 'marqua';

export function get() {
	const excerpts = parseDir<{ author: string; lines: string[] }>(
		'content/quotes',
		({ content, filename }) => ({
			author: filename.split('.')[0].replace('-', ' '),
			lines: content.split(/\r?\n/).filter(isExists),
		})
	);

	const quotes = excerpts.reduce((acc, { author, lines }) => {
		for (const line of lines) {
			const [quote, from] = line.split('#!/');
			acc.push({ author, quote, from });
		}
		return acc;
	}, [] as Array<{ author: string; quote: string; from: string }>);

	return {
		status: 200,
		headers: { 'Content-Type': 'application/json' },
		body: quotes,
	};
}
