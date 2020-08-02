import { Response, Request } from 'express';
import { readdirSync } from 'fs';
import { parseDir } from '../../utils/parser';
import RSS from '../../utils/rss';

const channel = {
	domain: 'mauss.dev',
	title: 'Mauss Reviews',
	slug: 'reviews',
	description: 'Personalized reviews from Ignatius',
};

export function get(_: Request, res: Response) {
	const reviews = readdirSync('content/reviews').flatMap((folder) => {
		return parseDir(`content/reviews/${folder}`, (data: Review, _: string, filename: string) => {
			const [slug] = filename.split('.');
			const { title, date_published } = data;
			return { slug: `reviews/${folder}/${slug}`, title: title.en, date: date_published };
		});
	});

	res.writeHead(200, { 'Content-Type': 'application/xml' });
	res.end(RSS(channel).generate(reviews));
}
