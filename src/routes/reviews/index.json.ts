import { readdirSync } from 'fs';
import { parseDir } from '../../utils/parser';
import { fillSiblings } from '../../utils/article';

export function get(req, res) {
	const DIR = 'content/reviews';
	const reviews = readdirSync(DIR).flatMap((folder) => {
		return parseDir(`${DIR}/${folder}`, (data, content, filename) => {
			const [slug] = filename.split('.');
			return { slug: `${folder}/${slug}`, category: folder, ...data, content };
		}).map((post) => {
			delete post.content;
			delete post.last_seen;
			delete post.read_time;
			return post;
		});
	});

	const check = (review) => !review.rating || !review.verdict;
	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify(fillSiblings(reviews, 'reviews/', check)));
}
