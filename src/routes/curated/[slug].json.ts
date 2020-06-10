import { readFileSync, readdirSync } from 'fs';
import { parseFile } from '../../utils/parser';

export function get(req, res) {
	const { slug } = req.params;
	const DIR = 'content/curated';
	const posts = readdirSync(DIR);
	const [filename] = posts.filter((post) => post.includes(slug));
	const content = readFileSync(`${DIR}/${filename}`, 'utf-8');

	const post = parseFile(filename, content, (cleanedFilename, frontMatter) => {
		return { slug: cleanedFilename.split('.')[0], ...frontMatter };
	});

	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify(post));
}
