import type { RequestHandler } from '@sveltejs/kit';
import type { Curated, Post, Review } from '$lib/utils/types';
import type { RSSItem } from '$lib/utils/rss';
import { readdirSync } from 'fs';
import { traverse } from 'marqua';
import { sortCompare } from '$lib/utils/helper';
import RSS from '$lib/utils/rss';

function flatScan<T extends Curated | Review>(path: string): RSSItem[] {
	const dirs = readdirSync(`content/src/${path}`).filter((folder) => !/draft/.test(folder));
	return dirs.flatMap((folder) =>
		traverse<T, RSSItem>(
			`content/src/${path}/${folder}`,
			({ frontMatter: { title, date }, breadcrumb }) => ({
				title: typeof title === 'string' ? title : title.en,
				slug: `${path}/${folder}/${breadcrumb[breadcrumb.length - 1].split('.')[0]}`,
				description: `${typeof title === 'string' ? title : title.en} ${path === 'curated' ? 'curated' : 'reviewed'} by DevMauss`, // prettier-ignore
				date: (date.updated || date.published) as string,
			})
		)
	);
}
const items = [
	...flatScan<Curated>('curated'),
	...flatScan<Review>('reviews'),
	...traverse<Post, RSSItem>(
		'content/src/posts',
		({ frontMatter: { title, description: info, date: dt }, breadcrumb }) => {
			const [published, slug] = breadcrumb[breadcrumb.length - 1].split('.');
			const description = info || 'A post by DevMauss';
			const date = ((dt && dt.updated) as string) || published;
			return { title, slug: `posts/${slug}`, description, date };
		}
	),
];

const channel = {
	domain: 'mauss.dev',
	title: 'Ignatius Bagussuputra • DevMauss',
	description: 'Developed by DevMauss',
};

export const get: RequestHandler = async () => ({
	headers: { 'Content-Type': 'application/xml' },
	body: RSS(channel, items.sort(sortCompare)),
});
