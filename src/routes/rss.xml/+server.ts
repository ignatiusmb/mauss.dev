import { traverse } from 'marqua/fs';
import { compare } from 'mauss';
import { RSS } from './core';

const channel = {
	domain: 'mauss.dev',
	title: 'Ignatius Bagussuputra • Alchemauss',
	description: 'Developed by Alchemauss',
};

const items = traverse(
	{ entry: 'content/sites/dev.mauss', depth: -1 },
	({ breadcrumb, buffer, parse }) => {
		if (breadcrumb[0].includes('draft')) return;
		if (!breadcrumb[0].endsWith('.md')) return;
		const { metadata } = parse(buffer.toString('utf-8'));
		const { title, date, description: info } = metadata;
		if (breadcrumb.includes('curated')) {
			const [file, folder] = breadcrumb;
			const slug = `curated/${folder}/${file.replace('.md', '')}`;
			const description = `${title} curated by Alchemauss`;
			return { slug, title, description, date };
		} else if (breadcrumb.includes('reviews')) {
			if (metadata.verdict === 'pending') return;
			const [file, category] = breadcrumb;
			return {
				slug: `reviews/${category}/${file.replace('.md', '')}`,
				title: typeof title === 'string' ? title : title.en,
				description: `${typeof title === 'string' ? title : title.en} reviewed by Alchemauss`,
				date: (date.updated || date.published) as string,
			};
		} else if (breadcrumb.includes('posts')) {
			const [, folder] = breadcrumb;
			const slug = `posts/${folder.replace('.md', '')}`;
			const description = info || 'A post by Alchemauss';
			return { slug, title, description, date };
		}
		return;
	},
	(items) => items.sort((x, y) => compare.date(x.date, y.date) || compare.string(x.title, y.title)),
);

export const prerender = true;
export async function GET() {
	const headers = { 'Content-Type': 'application/xml' };
	return new Response(RSS(channel, items), { headers });
}
