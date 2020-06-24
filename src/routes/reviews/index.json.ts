import { readdirSync } from 'fs';
import { parseDir } from '../../utils/parser';

export function get(req, res) {
	const DIR = 'content/reviews';
	const reviews = readdirSync(DIR).flatMap((folder) => {
		return parseDir(`${DIR}/${folder}`, (data, content, filename) => {
			const [slug] = filename.split('.');
			return { slug: `${folder}/${slug}`, category: folder, ...data, content };
		}).map((post) => {
			delete post['content'];
			delete post['link'];
			delete post['finished'];
			delete post['read-time'];
			delete post['pretty-date'];
			delete post['pretty-updated'];
			return post;
		});
	});

	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify(reviews));
}
