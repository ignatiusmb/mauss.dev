import { Response, Request } from 'express';
import { parseDir } from '../../utils/parser';
import RSS from '../../utils/rss';

const channel = {
	domain: 'mauss.dev',
	title: 'Posts by Mauss',
	slug: 'posts',
	description: 'What is on Ignatius mind (or life) recently',
};

export function get(_: Request, res: Response) {
	const posts = parseDir('content/posts', (data: Post, _: string, filename: string) => {
		const [date, slug] = filename.split('.');
		const { title, description } = data;
		return { title, slug: `posts/${slug}`, description, date };
	});

	res.writeHead(200, { 'Content-Type': 'application/xml' });
	res.end(RSS(channel).generate(posts));
}
