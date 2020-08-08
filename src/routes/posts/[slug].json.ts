import type { Request, Response } from 'express';
import { parseDir } from '../../utils/parser';

export function get(req: Request, res: Response) {
	const { slug } = req.params;
	function hydrate(data: RawPost, content: string, filename: string): FinalPost | null {
		const [published, filename_slug] = filename.split('.');
		if (filename_slug !== slug) return null;
		const date = { published, updated: data.date && data.date.updated };
		return { slug, ...data, category: data.tags[0], date, content };
	}

	const [post] = parseDir('content/posts', hydrate);
	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify(post));
}
