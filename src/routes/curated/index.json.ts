import type { Request, Response } from 'express';
import { readdirSync } from 'fs';
import { parseDir } from '../../utils/parser';

export function get(_: Request, res: Response) {
	const DIR = 'content/curated';
	const articles = readdirSync(DIR).flatMap((folder) => {
		if (folder === 'draft') return;
		function hydrate(data: any, _: string, filename: string) {
			const [slug] = filename.split('.');
			return { slug: `${folder}/${slug}`, category: folder, ...data };
		}

		return parseDir(`${DIR}/${folder}`, hydrate);
	});

	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify(articles.filter(Boolean)));
}
