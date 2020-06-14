import { readFileSync, readdirSync } from 'fs';
import { parseFile } from '../../utils/parser';

export function get(req, res) {
	const { slug } = req.params;
	const DIR = 'content/curated';
	const posts = readdirSync(DIR);
	const [filepath] = posts.filter((post) => post.includes(slug));
	const rawContent = readFileSync(`${DIR}/${filepath}`, 'utf-8');

	const post = parseFile(filepath, rawContent, (data, content, filename) => {
		return { slug: filename.split('.')[0], ...data, content };
	});

	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify(post));
}
