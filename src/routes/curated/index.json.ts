import { parseDir } from '../../utils/parser';

export function get(req, res) {
	const DIR = 'content/curated';
	const articles = parseDir(DIR, (cleanedFilename: string, frontMatter: object) => {
		return { slug: cleanedFilename.split('.')[0], ...frontMatter };
	}).filter((post) => delete post.content);

	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify(articles));
}
