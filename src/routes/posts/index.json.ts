import type { Request, Response } from 'express';
import type { Post } from '$utils/types';
import { existsSync } from 'fs';
import { join } from 'path';
import { parseDir } from '$utils/parser';
import { fillSiblings } from '$utils/article';

export async function get(_: Request, res: Response): Promise<void> {
	const posts = parseDir<Post>('content/posts', ({ frontMatter, filename }) => {
		const [published, slug] = filename.split('.');
		const [category] = frontMatter.tags;

		if (!frontMatter.image) {
			const imagePath = `assets/uploads/${category.toLowerCase()}/thumbnail/${slug}`;
			const rootFolder = `${process.cwd()}/static`;
			for (const ext of ['png', 'jpg']) {
				const image = join(rootFolder, `${imagePath}.${ext}`);
				if (existsSync(image)) frontMatter.image = { en: `${imagePath}.${ext}` };
			}
		}

		const updated = frontMatter.date && frontMatter.date.updated;
		return { slug, ...frontMatter, category, date: { published, updated } };
	});

	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify(fillSiblings(posts, 'posts/')));
}
