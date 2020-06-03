import { readFileSync } from 'fs';
import { parseFile } from '../utils/parser';

export function get(req, res) {
	const filepath = 'content/uses.md';
	const content = readFileSync(filepath, 'utf-8');
	const article = parseFile(filepath, content, (cleanedFilename, frontMatter) => frontMatter);

	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify(article));
}
