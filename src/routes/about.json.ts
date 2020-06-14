import { readFileSync } from 'fs';
import { parseFile } from '../utils/parser';

export function get(req, res) {
	const filepath = 'content/about.md';
	const rawContent = readFileSync(filepath, 'utf-8');
	const article = parseFile(filepath, rawContent, (data, content) => {
		return { ...data, content };
	});

	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify(article));
}
