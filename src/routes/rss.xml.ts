import type { Response, Request } from 'express';
import { readdirSync } from 'fs';
import { parseDir } from '../utils/parser';
import { sortCompare } from '../utils/helper';
import RSS from '../utils/rss';

const channel = {
	domain: 'mauss.dev',
	title: 'Ignatius Bagussuputra • DevMauss',
	slug: '',
	description: 'Developed by DevMauss',
};

export function get(_: Request, res: Response) {
	const curated = readdirSync('content/curated').flatMap((folder) => {
		if (folder === 'draft') return;
		return parseDir(`content/curated/${folder}`, (data: any, _: string, filename: string) => {
			const { title, date } = data;
			return {
				title,
				slug: `curated/${folder}/${filename.split('.')[0]}`,
				description: `${title} curated by DevMauss`,
				date: date.updated || date.published,
			};
		});
	});

	const posts = parseDir('content/posts', (data: any, _: string, filename: string) => {
		const [published, slug] = filename.split('.');
		const { title, description, date } = data;
		return {
			title,
			slug: `posts/${slug}`,
			description,
			date: (date && date.updated) || published,
		};
	});

	const reviews = readdirSync('content/reviews').flatMap((folder) => {
		if (folder === 'draft.md') return;
		return parseDir(`content/reviews/${folder}`, (data: any, _: string, filename: string) => {
			const { title, date } = data;
			return {
				title: title.en,
				slug: `reviews/${folder}/${filename.split('.')[0]}`,
				description: `Review for ${title.en} ${folder}`,
				date: date.updated || date.published,
			};
		});
	});

	const items = [...curated, ...posts, ...reviews];
	res.writeHead(200, { 'Content-Type': 'application/xml' });
	res.end(RSS(channel, items.filter(Boolean).sort(sortCompare)));
}
