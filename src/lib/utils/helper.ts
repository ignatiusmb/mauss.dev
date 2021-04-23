import { compare } from 'mauss';

type PrettyDate = { weekday: string; day: number; month: string; year: number; complete: string };
export function createPrettyDate(date: undefined): undefined;
export function createPrettyDate(date: string | Date): PrettyDate;
export function createPrettyDate(date: string | undefined): PrettyDate | undefined;
export function createPrettyDate(date: string | Date | undefined): PrettyDate | undefined {
	if (!date) return undefined;
	const dateFormat = new Date(date);
	const weekday = dateFormat.toLocaleDateString('default', { weekday: 'long' });
	const day = dateFormat.getDate();
	const month = dateFormat.toLocaleDateString('default', { month: 'long' });
	const year = dateFormat.getFullYear();
	return { weekday, day, month, year, complete: `${day} ${month} ${year}` };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function sortCompare<T extends Record<string, any>>(x: T, y: T): number {
	if (x.date && y.date) {
		const { updated: xu, published: xp } = x.date;
		const { updated: yu, published: yp } = y.date;
		if (xu !== yu) return compare.date(xu, yu);
		if (xp !== yp) return compare.date(xp, yp);
		if (typeof x.date === 'string' && typeof y.date === 'string')
			if (x.date !== y.date) return compare.date(x.date, y.date);
	}

	if (x.released && y.released && x.released !== y.released)
		return compare.date(x.released, y.released);

	if (x.author && y.author) return compare.string(x.author, y.author);

	const xt = typeof x.title === 'string' && x.title;
	const yt = typeof y.title === 'string' && y.title;
	if (xt && yt) return compare.string(x.title, y.title);
	else if (xt) return compare.string(x.title, y.title.en);
	else if (yt) return compare.string(x.title.en, y.title);
	else return compare.string(x.title.en, y.title.en);
}
