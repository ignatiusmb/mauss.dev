import { Request, Response } from 'express';
import { parseFile, aquaMark } from '../../../utils/parser';
import { countAverageRating } from '../../../utils/article';

const parseSpoilers = (content: string, seasonIndex: number) => {
	const separator = '<!-- SPOILERS -->';
	const [review, spoilers] = content.split(separator);
	const [title, ...reviewArray] = review.trim().split('\n');
	const validTitle = title.startsWith('# ');
	return {
		title: validTitle ? title.slice(2) : `Season ${seasonIndex}`,
		content: validTitle ? aquaMark(reviewArray.join('\n')) : aquaMark(review),
		spoilers: spoilers ? aquaMark(spoilers) : null,
	};
};

export function get(req: Request, res: Response) {
	const { category, slug } = req.params;
	const filepath = `content/reviews/${category}/${slug}.md`;
	const post = parseFile(filepath, (data: Review, content: string) => {
		data.slug = `${category}/${slug}`;
		data.category = category;
		data.rating = countAverageRating(data.rating);

		const final = '<!-- CLOSING -->';
		if (content.includes(final)) {
			const [article, closing] = content.split(final);
			content = article;
			data['closing'] = aquaMark(closing);
		}

		const seasons = '<!-- SEASON DIVIDER -->';
		if (content.includes(seasons)) {
			data['seasons'] = [];
			let currentSeason = 0;
			for (const season of content.split(seasons)) {
				if (!currentSeason++) data['content'] = season;
				else data['seasons'].push(parseSpoilers(season, currentSeason));
			}
		} else {
			const { content: review, spoilers } = parseSpoilers(content, 1);
			if (spoilers) data['spoilers'] = spoilers;
			data['content'] = review;
		}
		return data;
	});

	res.writeHead(200, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify(post));
}
