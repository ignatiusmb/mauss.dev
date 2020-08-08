import type { Response, Request } from 'express';
import { readdirSync } from 'fs';
import { parseDir } from '../utils/parser';
import { compareDate } from '../utils/helper';
import RSS from '../utils/rss';

const channel = {
	domain: 'mauss.dev',
	title: 'Ignatius Bagussuputra • Mauss',
	slug: '',
	description: 'Developed by Mauss',
};

export function get(_: Request, res: Response) {
	const curated = parseDir('content/curated', (data: any, _: string, filename: string) => {
		const [slug] = filename.split('.');
		const { title, date } = data;
		return {
			title,
			slug: `curated/${slug}`,
			description: `${title} curated by Mauss`,
			date: date.updated,
		};
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
			const [slug] = filename.split('.');
			const { title, date } = data;
			return {
				title: title.en,
				slug: `reviews/${folder}/${slug}`,
				description: `Review for ${title.en} ${folder}`,
				date: date.published,
			};
		});
	});

	res.writeHead(200, { 'Content-Type': 'application/xml' });
	res.end(RSS(channel, [...curated, ...posts, ...reviews].sort(compareDate)));
}
