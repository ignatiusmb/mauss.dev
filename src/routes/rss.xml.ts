import type { RequestHandler } from '@sveltejs/kit';
import type { Curated, Post, Review } from '$lib/utils/types';
import type { RSSItem } from '$lib/utils/rss';
import { readdirSync } from 'fs';
import { traverse } from 'marqua';
import { sortCompare } from '$lib/utils/helper';
import RSS from '$lib/utils/rss';

const channel = {
	domain: 'mauss.dev',
	title: 'Ignatius Bagussuputra • DevMauss',
	slug: '',
	description: 'Developed by DevMauss',
};

function flatScan<T extends Curated | Review>(path: string): RSSItem[] {
	const dirs = readdirSync(`content/${path}`).filter((folder) => !/draft/.test(folder));
	return dirs.flatMap((folder) =>
		traverse<T, RSSItem>(
			`content/${path}/${folder}`,
			({ frontMatter: { title, date }, filename }) => ({
				title: typeof title === 'string' ? title : title.en,
				slug: `${path}/${folder}/${filename.split('.')[0]}`,
				description: `${typeof title === 'string' ? title : title.en} ${
					path === 'curated' ? 'curated' : 'reviewed'
				} by DevMauss`,
				date: (date.updated || date.published) as string,
			})
		)
	);
}
const items = [
	...flatScan<Curated>('curated'),
	...flatScan<Review>('reviews'),
	...traverse<Post, RSSItem>(
		'content/posts',
		({ frontMatter: { title, description: info, date: dt }, filename }) => {
			const [published, slug] = filename.split('.');
			const description = info || 'A post by DevMauss';
			const date = ((dt && dt.updated) as string) || published;
			return { title, slug: `posts/${slug}`, description, date };
		}
	),
];

export const get: RequestHandler = async () => ({
	headers: { 'Content-Type': 'application/xml' },
	body: RSS(channel, items.sort(sortCompare)),
});
