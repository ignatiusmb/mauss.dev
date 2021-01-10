import type { Request, Response } from 'express';
import type { Post } from '$utils/types';
import { parseDir } from '$utils/parser';

export async function get(req: Request, res: Response): Promise<void> {
	const { slug } = req.params;
	const post = parseDir<Post>('content/posts', ({ frontMatter, content, filename }) => {
		const [published, filename_slug] = filename.split('.');
		if (filename_slug !== slug) return undefined;
		const date = { published, updated: frontMatter.date && frontMatter.date.updated };
		const toc = Array.from(content.matchAll(/^## (.*)/gm), (v) => v[1]);
		return { slug, ...frontMatter, category: frontMatter.tags[0], date, toc, content };
	})[0];

	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify(post));
}
