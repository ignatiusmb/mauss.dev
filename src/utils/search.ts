/* eslint-disable @typescript-eslint/no-explicit-any */
import { compareDate, sortCompare } from './helper';

const exists = (source: string | any, query: string | any): boolean =>
	typeof source !== 'string'
		? source === query
		: source.toLowerCase().includes(query.toLowerCase());
const compare = (source: string[] | string, queries: string[]): number =>
	Array.isArray(source)
		? source.filter((s) => compare(s, queries)).length
		: queries.filter((q) => exists(source, q)).length;
const check = (source: string[] | string, queries: string[]): boolean =>
	compare(source, queries) === queries.length;

const cleanSplit = (data: string): string[] => data.split(' ').filter(Boolean);
type GenericData = { title: string | { en: string; [key: string]: string } };
export const sift = <T extends GenericData>(query: string, data: T[]): T[] =>
	data.filter(({ title }) =>
		typeof title === 'string'
			? check(title, cleanSplit(query))
			: !!Object.keys(title).some((key) => check(title[key], cleanSplit(query)))
	);

export const sieve = <T extends Record<string, any>>(dict: T, data: T[]): T[] => {
	for (const key in dict) {
		if (!dict[key].length || key === 'sort_by') continue;
		if (['tags', 'genres', 'verdict'].includes(key)) {
			data = data.filter((p) => compare(p[key], dict[key]));
		} else if (key === 'categories') {
			data = data.filter((p) => compare(p.category, dict[key]));
		}
	}
	return sort(dict['sort_by'] || 'updated', data);
};

const sortBy: Record<string, (x: any, y: any) => number> = {
	rating(x: any, y: any) {
		if (x.rating === null || x.rating === undefined) return 1;
		if (y.rating === null || y.rating === undefined) return 0;
		return x.rating === y.rating ? sortCompare(x, y) : y.rating - x.rating;
	},
	seen: (x: any, y: any) => compareDate(x.last_seen, y.last_seen) || sortCompare(x, y),
	released: (x: any, y: any) => compareDate(x.released, y.released) || sortCompare(x, y),
	published: (x: any, y: any) =>
		compareDate(x.date.published, y.date.published) || sortCompare(x, y),
};

export const sort = <T extends Record<string, any>>(type: string, data: T[]): T[] =>
	type in sortBy ? data.sort(sortBy[type]) : data.sort(sortCompare);
