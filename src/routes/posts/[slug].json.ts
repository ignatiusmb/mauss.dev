import { parseDir } from '../../utils/parser';

export function get(req, res) {
	const { slug } = req.params;
	const [post] = parseDir('content/posts', (data, content, filename: string) => {
		const [date_published, filename_slug] = filename.split('.');
		if (filename_slug !== slug) return;
		return { slug, ...data, category: data.tags[0], date_published, content };
	});

	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify(post));
}
