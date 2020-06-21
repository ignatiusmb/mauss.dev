import { existsSync } from 'fs';
import { join } from 'path';
import { parseDir } from '../../utils/parser';

export function get(req, res) {
	const DIR = 'content/posts';
	const posts = parseDir(DIR, (data, content, filename) => {
		const [date, slug] = filename.split('.');
		data['slug'] = slug;
		data['date'] = date;

		const rootFolder = `${process.cwd()}/static`;
		const [category] = data['tags'];
		data['content'] = content;
		if (data['image']) return data;

		const imagePath = `uploads/${category.toLowerCase()}/thumbnail/${data['slug']}`;
		if (existsSync(join(rootFolder, `${imagePath}.png`))) {
			data['image'] = `${imagePath}.png`;
		} else if (existsSync(join(rootFolder, `${imagePath}.jpg`))) {
			data['image'] = `${imagePath}.jpg`;
		}
		return data;
	}).filter((post) => delete post.content);

	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify(posts));
}
