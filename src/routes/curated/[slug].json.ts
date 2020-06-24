import { parseFile } from '../../utils/parser';

export function get(req, res) {
	const { slug } = req.params;
	const post = parseFile(`content/curated/${slug}.md`, (data, content, filename) => {
		return { slug: filename.split('.')[0], ...data, content };
	});

	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify(post));
}
