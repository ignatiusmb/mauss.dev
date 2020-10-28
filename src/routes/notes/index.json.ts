import type { Request, Response } from 'express';
import { readdirSync } from 'fs';
import { capitalize } from '../../utils/helper';

export function get(_: Request, res: Response) {
	const courses = readdirSync('content/notes').map((c) => {
		const words = c.split('-').map((w) => (w.length < 3 ? w.toUpperCase() : capitalize(w)));
		return { title: words.join(' '), slug: c };
	});
	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify(courses));
}
