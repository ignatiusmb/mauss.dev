import type { Request, Response } from 'express';
import { parseDir } from '../../../utils/parser';

export function get(req: Request, res: Response) {
	const { course } = req.params;

	function hydrate(data: any, content: string, filename: string) {
		const [index, topic] = filename.split('.');
		const slug = +index ? `${course}/${topic}` : course;
		return {
			order: +index,
			slug,
			...data,
			content: !+index ? content : undefined,
		};
	}

	const notes = parseDir(`content/notes/${course}`, hydrate);
	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify(notes.sort((x, y) => x.order - y.order)));
}
