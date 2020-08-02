import { Response, Request } from 'express';
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
		const { title, date_updated } = data;
		return { title, slug: `curated/${slug}`, date: date_updated };
	});

	const posts = parseDir('content/posts', (data: Post, _: string, filename: string) => {
		const [date, slug] = filename.split('.');
		const { title, description } = data;
		return { title, slug: `posts/${slug}`, description, date };
	});

	const reviews = readdirSync('content/reviews').flatMap((folder) => {
		return parseDir(`content/reviews/${folder}`, (data: Review, _: string, filename: string) => {
			const [slug] = filename.split('.');
			const { title, date_published } = data;
			return { slug: `reviews/${folder}/${slug}`, title: title.en, date: date_published };
		});
	});

	res.writeHead(200, { 'Content-Type': 'application/xml' });
	res.end(RSS(channel).generate([...curated, ...posts, ...reviews].sort(compareDate)));
}
