import type { Request, Response } from 'express';
import type { Curated } from '$utils/types';
import { readdirSync } from 'fs';
import { parseDir } from 'marqua';

export async function get(_: Request, res: Response): Promise<void> {
	const DIR = 'content/curated';
	const categories = readdirSync(DIR).filter((folder) => folder !== 'draft');
	const articles = categories.flatMap((folder) =>
		parseDir<Curated>(`${DIR}/${folder}`, ({ frontMatter, filename }) => ({
			slug: `${folder}/${filename.split('.')[0]}`,
			...frontMatter,
			category: folder,
		}))
	);

	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify(articles));
}
