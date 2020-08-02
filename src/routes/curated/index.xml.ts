import { Response, Request } from 'express';
import { parseDir } from '../../utils/parser';
import RSS from '../../utils/rss';

const channel = {
	domain: 'mauss.dev',
	title: 'Curated by Mauss',
	slug: 'curated',
	description: 'Curated stuff by Ignatius',
};

export function get(_: Request, res: Response) {
	const articles = parseDir('content/curated', (data: any, _: string, filename: string) => {
		const [slug] = filename.split('.');
		const { title, date_updated } = data;
		return { title, slug: `curated/${slug}`, date: date_updated };
	});

	res.writeHead(200, { 'Content-Type': 'application/xml' });
	res.end(RSS(channel).generate(articles));
}
