import { compareDate, sortCompare } from './helper';

const exists = (source, query) =>
	typeof source !== 'string'
		? source === query
		: source.toLowerCase().includes(query.toLowerCase());
const compare = (source, queries) =>
	Array.isArray(source)
		? source.filter((s) => compare(s, queries)).length
		: queries.filter((q) => exists(source, q)).length;
const check = (source, queries) => compare(source, queries) === queries.length;

export function sieve(query, data) {
	const queries = query.split(' ').filter((q) => q);
	return data.filter((post) => {
		const { title } = post;
		if (typeof title !== 'string') {
			for (const key in title) if (check(title[key], queries)) return post;
		} else if (check(title, queries)) return post;
	});
}

export function filter(dict, data) {
	let filtered = data;
	for (const key in dict) {
		if (!dict[key].length || key === 'sort') continue;
		if (['tags', 'genres', 'verdict'].includes(key)) {
			filtered = data.filter((p) => compare(p[key], dict[key]));
		} else if (key === 'categories') {
			filtered = data.filter((p) => compare(p.category, dict[key]));
		}
	}
	return sort(dict['sort'] || 'updated', filtered);
}

const sortBy = {
	rating(x, y) {
		if (x.rating === null || x.rating === undefined) return 1;
		if (y.rating === null || y.rating === undefined) return 0;
		return x.rating === y.rating ? sortCompare(x, y) : y.rating - x.rating;
	},
	seen: (x, y) => compareDate(x.last_seen, y.last_seen) || sortCompare(x, y),
	released: (x, y) => compareDate(x.released, y.released) || sortCompare(x, y),
	published: (x, y) => compareDate(x.date.published, y.date.published) || sortCompare(x, y),
};

export function sort(type, data) {
	return type in sortBy ? data.sort(sortBy[type]) : data.sort(sortCompare);
}
