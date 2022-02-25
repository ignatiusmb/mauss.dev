import { compare, comparator } from 'mauss';

export function sortCompare<T extends Record<string, any>>(x: T, y: T): number {
	if (x.date && y.date) {
		if (typeof x.date === 'string' && typeof y.date === 'string')
			if (x.date !== y.date) return compare.date(x.date, y.date);
		const { updated: xu = '', published: xp = '' } = x.date;
		const { updated: yu = '', published: yp = '' } = y.date;
		if (xu && yu && xu !== yu) return compare.date(xu, yu);
		if (xp && yp && xp !== yp) return compare.date(xp, yp);
	}

	if (x.released && y.released && x.released !== y.released)
		return compare.date(x.released, y.released);

	if (x.author && y.author) return compare.string(x.author, y.author);

	return comparator(x, y);
}
