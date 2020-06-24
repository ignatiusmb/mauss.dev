import { parseFile } from '../utils/parser';

export function get(req, res) {
	const article = parseFile('content/uses.md', (data, content) => {
		return { ...data, content };
	});

	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify(article));
}
