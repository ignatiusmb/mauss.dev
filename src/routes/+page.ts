import { compare } from 'mauss';

export const load: import('./$types').PageLoad = async ({ fetch }) => {
	const quotes = await fetch('/quotes.json').then((r) => r.json());
	const { data: curated } = await fetch('/curated/__data.json').then((r) => r.json());
	const posts: any[] = await fetch('/posts.json').then((r) => r.json());
	const reviews: any[] = await fetch('/reviews.json').then((r) => r.json());

	return {
		curated: curated
			.sort((x: any, y: any) => compare.date(x.date.updated, y.date.updated))
			.slice(0, 4),
		posts: posts.slice(0, 4),
		reviews: reviews.filter((x) => x.rating && x.verdict !== -2).slice(0, 4),
		quotes: quotes.slice(0, quotes.length / 2),
	};
};
