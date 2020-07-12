import { existsSync } from 'fs';
import { join } from 'path';
import { parseDir } from '../../utils/parser';
import { fillSiblings } from '../../utils/article';

export function get(req, res) {
	const DIR = 'content/posts';
	const posts = parseDir(DIR, (data, content, filename) => {
		const [date_published, slug] = filename.split('.');
		const [category] = data.tags;

		if (!data.image) {
			let imagePath = `uploads/${category.toLowerCase()}/thumbnail/${slug}`;
			const rootFolder = `${process.cwd()}/static`;
			for (const ext of ['png', 'jpg']) {
				const image = join(rootFolder, `${imagePath}.${ext}`);
				if (existsSync(image)) data.image = { en: `${imagePath}.${ext}` };
			}
		}

		return { slug, ...data, date_published, content };
	}).filter((post) => delete post.content);

	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify(fillSiblings(posts, 'posts/')));
}
