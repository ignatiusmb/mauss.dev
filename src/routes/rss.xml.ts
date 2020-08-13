import type { Response, Request } from 'express';
import { readdirSync } from 'fs';
import { parseDir } from '../utils/parser';
import { compareDate } from '../utils/helper';
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
				date: date.published || date.updated,
			};
		});
	});

	const posts = parseDir('content/posts', (data: any, _: string, filename: string) => {
		const [date, slug] = filename.split('.');
		const { title, description } = data;
		return {
			title,
			slug: `posts/${slug}`,
			description,
			date,
		};
	});

	const reviews = readdirSync('content/reviews').flatMap((folder) => {
		return parseDir(`content/reviews/${folder}`, (data: any, _: string, filename: string) => {
			const { title, date } = data;
			return {
				title: title.en,
				slug: `reviews/${folder}/${filename.split('.')[0]}`,
				description: `Review for ${title.en} ${folder}`,
				date: date.published,
			};
		});
	});

	const items = [...curated, ...posts, ...reviews];
	res.writeHead(200, { 'Content-Type': 'application/xml' });
	res.end(RSS(channel, items.filter(Boolean).sort(compareDate)));
}
