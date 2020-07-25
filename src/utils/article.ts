export function countAverageRating(ratings: Array<string>) {
	if (!ratings) return null;
	const total = ratings.reduce((acc, cur) => acc + parseInt(cur), 0);
	return Math.round((total / ratings.length + Number.EPSILON) * 100) / 100;
}

export function fillSiblings(articles: Array<Article>, base: string, breakpoint?: Function) {
	for (let i = 0; i < articles.length; i++) {
		if (!articles[i]['siblings']) articles[i]['siblings'] = {};
		const [prev, next] = [articles[i - 1], articles[i + 1]];
		if (prev) articles[i]['siblings']['prev'] = { slug: base + prev.slug, title: prev.title };
		if (breakpoint && breakpoint(next)) return articles;
		if (next) articles[i]['siblings']['next'] = { slug: base + next.slug, title: next.title };
	}
	return articles;
}
