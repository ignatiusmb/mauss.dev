import type { Request, Response } from 'express';
import { existsSync } from 'fs';
import { join } from 'path';
import { parseDir } from '../../utils/parser';
import { fillSiblings } from '../../utils/article';

export function get(_: Request, res: Response) {
	function hydrate(data: RawPost, _: string, filename: string): FinalPost {
		const [published, slug] = filename.split('.');
		const [category] = data.tags;

		if (!data.image) {
			let imagePath = `uploads/${category.toLowerCase()}/thumbnail/${slug}`;
			const rootFolder = `${process.cwd()}/static`;
			for (const ext of ['png', 'jpg']) {
				const image = join(rootFolder, `${imagePath}.${ext}`);
				if (existsSync(image)) data.image = { en: `${imagePath}.${ext}` };
			}
		}

		const date = { published, updated: data.date && data.date.updated };
		return { slug, ...data, category: data.tags[0], date };
	}

	const posts = parseDir('content/posts', hydrate);
	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify(fillSiblings(posts, 'posts/')));
}
