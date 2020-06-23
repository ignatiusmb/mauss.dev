import { parseDir } from '../../utils/parser';

export function get(req, res) {
	const DIR = 'content/about';
	const articles = parseDir(DIR, (data, content, filename) => {
		const [slug] = filename.split('.');
		return { slug, ...data, content };
	}).reduce((acc, cur) => {
		const { slug } = cur;
		delete cur['slug'];
		acc[slug] = cur;
		return acc;
	}, {});

	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify(articles));
}
