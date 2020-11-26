import type { Request, Response } from 'express';
import { readdirSync } from 'fs';
import { parseDir } from '$utils/parser';

export async function get(_: Request, res: Response): Promise<void> {
	const DIR = 'content/curated';
	const categories = readdirSync(DIR).filter((folder) => folder !== 'draft');
	const articles = categories.flatMap((folder) =>
		parseDir(`${DIR}/${folder}`, ({ frontMatter, filename }) => ({
			slug: `${folder}/${filename.split('.')[0]}`,
			category: folder,
			...frontMatter,
		}))
	);

	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify(articles));
}
