import { existsSync } from 'fs';
import { join } from 'path';
import { parseDir } from '../../utils/parser';
import { createPrettyDate } from '../../utils/helper';

export function get(req, res) {
	const DIR = 'content/posts';
	const posts = parseDir(DIR, (cleanedFilename: string, frontMatter: object) => {
		const [date, slug] = cleanedFilename.split('.');
		frontMatter['slug'] = slug;
		frontMatter['date'] = date;

		const rootFolder = `${process.cwd()}/static`;
		const [category] = frontMatter['tags'];
		const imagePath = `uploads/${category.toLowerCase()}/thumbnail/${frontMatter['slug']}`;
		if (existsSync(join(rootFolder, `${imagePath}.png`))) {
			frontMatter['image'] = `${imagePath}.png`;
		} else if (existsSync(join(rootFolder, `${imagePath}.jpg`))) {
			frontMatter['image'] = `${imagePath}.jpg`;
		}
		return frontMatter;
	}).filter((post) => delete post.content);

	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify(posts));
}
