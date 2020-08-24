import type { Request, Response } from 'express';
import { parseDir } from '../../utils/parser';

export function get(req: Request, res: Response) {
	const { slug } = req.params;
	function hydrate(data: RawPost, content: string, filename: string): FinalPost | null {
		const [published, filename_slug] = filename.split('.');
		if (filename_slug !== slug) return null;
		const date = { published, updated: data.date && data.date.updated };
		const toc = Array.from(content.matchAll(/^## (.*)/gm), (v) => v[1]);
		return { slug, ...data, category: data.tags[0], date, toc, content };
	}

	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify(parseDir('content/posts', hydrate)[0]));
}
