/* eslint-disable @typescript-eslint/no-explicit-any */
import { isExists } from 'mauss/guards';
import { compareDate, sortCompare } from './helper';

const exists = (source: string | any, query: string | any): boolean =>
	typeof source !== 'string' ? source === query : new RegExp(query, 'i').test(source);
const compare = (source: string[] | string, queries: string[]): number =>
	Array.isArray(source)
		? source.filter((s) => compare(s, queries)).length
		: queries.filter((q) => exists(source, q)).length;
const check = (source: string[] | string, queries: string[]): boolean =>
	compare(source, queries) === queries.length;

const cleanSplit = (data: string): string[] => data.split(' ').filter(isExists);
type GenericData = { title: string | { en: string; [key: string]: string } };
export const sift = <T extends GenericData>(query: string, data: T[]): T[] =>
	data.filter(({ title }) =>
		typeof title === 'string'
			? check(title, cleanSplit(query))
			: Object.values(title).some((val) => check(val, cleanSplit(query)))
	);

const sortBy: Record<string, (x: any, y: any) => number> = {
	rating(x, y) {
		const xr = Number.isNaN(+x.rating) ? +!!x.rating : x.rating;
		const yr = Number.isNaN(+y.rating) ? +!!y.rating : y.rating;
		return xr === yr ? sortCompare(x, y) : yr - xr;
	},
	seen: (x, y) => compareDate(x.last_seen, y.last_seen) || sortCompare(x, y),
	released: (x, y) => compareDate(x.released, y.released) || sortCompare(x, y),
	published: (x, y) => compareDate(x.date.published, y.date.published) || sortCompare(x, y),
};

export const sort = <T extends Record<string, any>>(type: string, data: T[]): T[] =>
	type in sortBy ? data.sort(sortBy[type]) : data.sort(sortCompare);

export function sieve<T extends Record<string, any>>(dict: T, data: T[]): T[] {
	const identical = ['tags', 'genres'];
	const intersect = ['categories', 'verdict'];

	const entries = Object.entries(dict).filter(([k]) => k !== 'sort_by');
	const cleaned = entries.filter(([k, v]) => !intersect.includes(k) && v.length);
	const category = entries.find(([k, v]) => k === 'categories' && v.length) || [];
	const verdict = entries.find(([k, v]) => k === 'verdict' && v.length) || [];
	const checked = entries.filter(([, v]) => v.length).length;
	const dFilter = (post: T) =>
		(verdict.length ? compare(post.verdict, verdict[1]) : true) &&
		(category.length ? compare(post.category, category[1]) : true) &&
		(cleaned.length
			? cleaned.some(([k, v]) => identical.includes(k) && compare(post[k], v))
			: true);
	return sort(dict['sort_by'] || 'updated', checked ? data.filter(dFilter) : data);
}
