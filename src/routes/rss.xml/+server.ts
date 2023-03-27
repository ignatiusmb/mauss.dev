import { traverse } from 'marqua/fs';
import { compare } from 'mauss';
import RSS from '$lib/utils/rss';

const items = traverse(
	{ entry: 'content/sites/dev.mauss', depth: -1 },
	({ frontMatter, breadcrumb }) => {
		if (breadcrumb[0].includes('draft')) return;

		if (breadcrumb.includes('curated')) {
			const { title, date } = frontMatter;
			const [filename, folder] = breadcrumb;
			return {
				title,
				slug: `curated/${folder}/${filename.split('.')[0]}`,
				description: `${title} curated by Alchemauss`,
				date: (date.updated || date.published) as string,
			};
		} else if (breadcrumb.includes('reviews')) {
			const { title, date } = frontMatter;
			const [filename, folder] = breadcrumb;
			return {
				title: typeof title === 'string' ? title : title.en,
				slug: `reviews/${folder}/${filename.split('.')[0]}`,
				description: `${typeof title === 'string' ? title : title.en} reviewed by Alchemauss`,
				date: (date.updated || date.published) as string,
			};
		} else if (breadcrumb.includes('posts')) {
			const { title, description: info, date: dt } = frontMatter;
			const [published, slug] = breadcrumb[0].split('.');
			const description = info || 'A post by Alchemauss';
			const date = ((dt && dt.updated) as string) || published;
			return { title, slug: `posts/${slug}`, description, date };
		} else return undefined;
	},
	(items) => items.sort((x, y) => compare.date(x.date, y.date) || compare.string(x.title, y.title))
);

const channel = {
	domain: 'mauss.dev',
	title: 'Ignatius Bagussuputra • Alchemauss',
	description: 'Developed by Alchemauss',
};

export const GET: import('./$types').RequestHandler = async () => {
	const headers = { 'Content-Type': 'application/xml' };
	return new Response(RSS(channel, items), { headers });
};
