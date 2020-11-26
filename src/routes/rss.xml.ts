import type { Response, Request } from 'express';
import { readdirSync } from 'fs';
import { parseDir } from '$utils/parser';
import { compareDate } from '$utils/helper';
import RSS from '$utils/rss';

const channel = {
	domain: 'mauss.dev',
	title: 'Ignatius Bagussuputra • DevMauss',
	slug: '',
	description: 'Developed by DevMauss',
};

export async function get(_: Request, res: Response): Promise<void> {
	const curated = readdirSync('content/curated').flatMap((folder) => {
		if (folder === 'draft') return;
		return parseDir(`content/curated/${folder}`, ({ frontMatter, filename }) => {
			const { title, date } = frontMatter;
			return {
				title,
				slug: `curated/${folder}/${filename.split('.')[0]}`,
				description: `${title} curated by DevMauss`,
				date: date.published || date.updated,
			};
		});
	});

	const posts = parseDir('content/posts', ({ frontMatter, filename }) => {
		const [date, slug] = filename.split('.');
		const { title, description } = frontMatter;
		return {
			title,
			slug: `posts/${slug}`,
			description,
			date,
		};
	});

	const reviews = readdirSync('content/reviews').flatMap((folder) => {
		return parseDir(`content/reviews/${folder}`, ({ frontMatter, filename }) => {
			const { title, date } = frontMatter;
			return {
				title: title.en,
				slug: `reviews/${folder}/${filename.split('.')[0]}`,
				description: `Review for ${title.en} ${folder}`,
				date: date.published,
			};
		});
	});

	const items = [...curated, ...posts, ...reviews];
	res.writeHead(200, { 'Content-Type': 'application/xml' });
	res.end(RSS(channel, items.filter(Boolean).sort(compareDate)));
}
