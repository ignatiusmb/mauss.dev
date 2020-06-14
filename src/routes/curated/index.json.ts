import { parseDir } from '../../utils/parser';

export function get(req, res) {
	const DIR = 'content/curated';
	const articles = parseDir(DIR, (data, content, filename) => {
		return { slug: filename.split('.')[0], ...data, content };
	}).filter((post) => delete post.content);

	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify(articles));
}
