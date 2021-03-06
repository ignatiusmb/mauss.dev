import type { RequestHandler } from '@sveltejs/kit';
import type { Curated, Post, Review } from '$lib/utils/types';
import RSS, { RSSItem } from '$lib/utils/rss';
import { forge, traverse } from 'marqua';
import { compare } from 'mauss';

const items = traverse(
	{
		entry: 'content/src',
		recurse: true,
		sort: (x, y) => compare.date(x.date, y.date) || compare.string(x.title, y.title),
	},
	({ frontMatter, breadcrumb }) => {
		if (breadcrumb[breadcrumb.length - 1].includes('draft')) return;

		if (breadcrumb.includes('curated')) {
			const { title, date } = frontMatter as Curated;
			const [folder, filename] = breadcrumb.slice(-2);
			return {
				title,
				slug: `curated/${folder}/${filename.split('.')[0]}`,
				description: `${title} curated by DevMauss`,
				date: (date.updated || date.published) as string,
			};
		} else if (breadcrumb.includes('reviews')) {
			const { title, date } = frontMatter as Review;
			const [folder, filename] = breadcrumb.slice(-2);
			return {
				title: typeof title === 'string' ? title : title.en,
				slug: `reviews/${folder}/${filename.split('.')[0]}`,
				description: `${typeof title === 'string' ? title : title.en} reviewed by DevMauss`,
				date: (date.updated || date.published) as string,
			};
		} else if (breadcrumb.includes('posts')) {
			const { title, description: info, date: dt } = frontMatter as Post;
			const [published, slug] = breadcrumb[breadcrumb.length - 1].split('.');
			const description = info || 'A post by DevMauss';
			const date = ((dt && dt.updated) as string) || published;
			return { title, slug: `posts/${slug}`, description, date };
		} else return undefined;
	},
	forge.types<Curated | Post | Review, RSSItem>()
);

const channel = {
	domain: 'mauss.dev',
	title: 'Ignatius Bagussuputra • DevMauss',
	description: 'Developed by DevMauss',
};

export const get: RequestHandler = async () => ({
	headers: { 'Content-Type': 'application/xml' },
	body: RSS(channel, items),
});
