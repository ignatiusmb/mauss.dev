import type { Child } from '$utils/types';
import { checkNum } from 'mauss/utils';

export function countAverageRating(ratings: string[] | number): number {
	if (typeof ratings === 'number') return ratings;
	if (!ratings.length || ratings.some(Number.isNaN)) return 0;
	const total = ratings.reduce((acc, cur) => acc + parseInt(cur), 0);
	return Math.round((total / ratings.length + Number.EPSILON) * 100) / 100;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function contentParser<T extends Record<string, any>>(data: T, content: string): string {
	const traverseData = (meta: T | string, properties: string): string => {
		for (const key of properties.split(':'))
			if (typeof meta !== 'string') meta = meta[checkNum(key)];
		return meta as string;
	};

	return content.replace(/#{.+}!/g, (exp) => {
		const captured = exp.slice(2, exp.length - 2);
		return (captured && traverseData(data, captured)) || exp;
	});
}

export function fillSiblings<T extends Child>(
	articles: T[],
	base: string,
	breakpoint?: (next: T) => boolean
): T[] {
	for (let i = 0; i < articles.length; i++) {
		if (!articles[i]['siblings']) articles[i]['siblings'] = {};
		const [prev, next] = [articles[i - 1], articles[i + 1]];
		if (prev) articles[i]['siblings']['prev'] = { slug: base + prev.slug, title: prev.title };
		if (breakpoint && breakpoint(next)) return articles;
		if (next) articles[i]['siblings']['next'] = { slug: base + next.slug, title: next.title };
	}
	return articles;
}
