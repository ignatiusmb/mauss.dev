import type { Response, Request } from 'express';
import type { Curated, Post, Review } from '$utils/types';
import type { RSSItem } from '$utils/rss';
import { readdirSync } from 'fs';
import { parseDir } from '$utils/parser';
import { sortCompare } from '$utils/helper';
import RSS from '$utils/rss';

const channel = {
	domain: 'mauss.dev',
	title: 'Ignatius Bagussuputra • DevMauss',
	slug: '',
	description: 'Developed by DevMauss',
};

function flatScan<T extends Curated | Review>(path: string): RSSItem[] {
	const dirs = readdirSync(`content/${path}`).filter((folder) => !/draft/.test(folder));
	return dirs.flatMap((folder) =>
		parseDir<T, RSSItem>(
			`content/${path}/${folder}`,
			({ frontMatter: { title, date }, filename }) => ({
				title: typeof title === 'string' ? title : title.en,
				slug: `${path}/${folder}/${filename.split('.')[0]}`,
				description: `
					${typeof title === 'string' ? title : title.en}
					${path === 'curated' ? 'curated' : 'reviewed'} by DevMauss
				`,
				date: (date.updated || date.published) as string,
			})
		)
	);
}

export async function get(_: Request, res: Response): Promise<void> {
	const items = [
		...flatScan<Curated>('curated'),
		...flatScan<Review>('reviews'),
		...parseDir<Post, RSSItem>(
			'content/posts',
			({ frontMatter: { title, description: info, date: dt }, filename }) => {
				const [published, slug] = filename.split('.');
				const description = info || 'A post by DevMauss';
				const date = ((dt && dt.updated) as string) || published;
				return { title, slug: `posts/${slug}`, description, date };
			}
		),
	];

	res.writeHead(200, { 'Content-Type': 'application/xml' });
	res.end(RSS(channel, items.sort(sortCompare)));
}
