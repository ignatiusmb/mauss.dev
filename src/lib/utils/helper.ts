export function compareDate(x: string, y: string): number {
	return new Date(y).getTime() - new Date(x).getTime();
}

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

export function cssVars(props: Record<string, string>): string {
	const vars = Object.entries(props).filter(([key]) => /^--/.test(key));
	return vars.reduce((css, [key, val]) => `${css}${key}:${val};`, '');
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function sortCompare<T extends Record<string, any>>(x: T, y: T): number {
	if (x.date && y.date) {
		const { updated: xu, published: xp } = x.date;
		const { updated: yu, published: yp } = y.date;
		if (xu !== yu) return compareDate(xu, yu);
		if (xp !== yp) return compareDate(xp, yp);
		if (typeof x.date === 'string' && typeof y.date === 'string')
			if (x.date !== y.date) return compareDate(x.date, y.date);
	}

	if (x.released && y.released && x.released !== y.released)
		return compareDate(x.released, y.released);

	if (x.author && y.author) return x.author.localeCompare(y.author);

	const xt = typeof x.title === 'string' && x.title;
	const yt = typeof y.title === 'string' && y.title;
	if (xt && yt) return x.title.localeCompare(y.title);
	else if (xt) return x.title.localeCompare(y.title.en);
	else if (yt) return x.title.en.localeCompare(y.title);
	else return x.title.en.localeCompare(y.title.en);
}

export function splitAt(index: number, text: string): [string, string] {
	return [text.slice(0, index), text.slice(index + 1)];
}