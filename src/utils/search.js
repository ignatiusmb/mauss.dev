import { compareDate, sortCompare } from './helper';

const exists = (source, query) =>
	typeof source === 'string' ? source.toLowerCase().includes(query.toLowerCase()) : false;
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
		if (key === 'tags') {
			filtered = data.filter((p) => compare(p.tags, dict.tags));
		} else if (key === 'genres') {
			filtered = data.filter((p) => compare(p.genres, dict.genres));
		} else if (key === 'categories') {
			filtered = data.filter((p) => compare(p.category, dict.categories));
		} else if (key === 'verdict') {
			filtered = data.filter((p) => compare(p.verdict, dict.verdict));
			if (dict.verdict.includes('-2')) filtered = [...filtered, ...data.filter((p) => !p.verdict)];
		}
	}
	return sort(dict['sort'] || 'updated', filtered);
}

const sortByRatings = (x, y) => {
	if (x.rating === null || x.rating === undefined) return 1;
	if (y.rating === null || y.rating === undefined) return 0;
	if (isNaN(x.rating - y.rating)) return sortCompare(x, y);
	return x.rating < y.rating;
};

export function sort(type, data) {
	if (type === 'updated') return data.sort(sortCompare);
	if (type === 'rating') return data.sort(sortByRatings);
	if (type === 'year') return data.sort((x, y) => y.year - x.year || sortCompare(x, y));
	if (type === 'published')
		return data.sort((x, y) => {
			return compareDate(x.date_published, y.date_published) || sortCompare(x, y);
		});
}
