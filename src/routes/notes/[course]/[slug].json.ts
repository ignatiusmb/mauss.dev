import type { Request, Response } from 'express';
import { parseDir } from '../../../utils/parser';

export function get(req: Request, res: Response) {
	const { course, slug } = req.params;

	function hydrate(data: any, content: string, filename: string) {
		if (filename.split('.')[1] !== slug) return null;
		return { slug: `${course}/${slug}`, ...data, content };
	}

	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify(parseDir(`content/notes/${course}`, hydrate)[0]));
}
