import { checkNum } from 'svelement/utils';
export function countAverageRating(ratings: string[]) {
	if (!ratings || ratings.some((r: any) => isNaN(r))) return 0;
	const total = ratings.reduce((acc, cur) => acc + parseInt(cur), 0);
	return Math.round((total / ratings.length + Number.EPSILON) * 100) / 100;
}

export function contentParser(data: any, content: string) {
	const traverseData = (meta: any, str: any): string => {
		for (const key of str.split(':')) meta = meta[checkNum(key)];
		return meta;
	};

	return content.replace(/#{.+}!/g, (exp) => {
		const captured = exp.slice(2, exp.length - 2);
		return captured ? traverseData(data, captured) : exp;
	});
}

export function fillSiblings(articles: any[], base: string, breakpoint?: Function) {
	for (let i = 0; i < articles.length; i++) {
		if (!articles[i]['siblings']) articles[i]['siblings'] = {};
		const [prev, next] = [articles[i - 1], articles[i + 1]];
		if (prev) articles[i]['siblings']['prev'] = { slug: base + prev.slug, title: prev.title };
		if (breakpoint && breakpoint(next)) return articles;
		if (next) articles[i]['siblings']['next'] = { slug: base + next.slug, title: next.title };
	}
	return articles;
}
