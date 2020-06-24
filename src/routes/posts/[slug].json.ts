import { readdirSync } from 'fs';
import { parseFile } from '../../utils/parser';

export function get(req, res) {
	const { slug } = req.params;
	const DIR = 'content/posts';
	const [filepath] = readdirSync(DIR).filter((post) => post.includes(slug));

	const post = parseFile(`${DIR}/${filepath}`, (data, content, filename) => {
		const [date, slug] = filename.split('.');
		return { slug, ...data, date, content };
	});

	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify(post));
}
