import { capitalize } from 'mauss/utils';
const separators = /[\s\][!"#$%&'()*+,./:;<=>?@\\^_{|}~-]/g;

export function compareDate(x: string, y: string): number {
	return new Date(y).getTime() - new Date(x).getTime();
}

export function convertCase(
	style: 'camel' | 'pascal' | 'snake' | 'kebab',
	text: string,
	sep = ' '
): string {
	const exp = /[ |-|.|_]/g;
	switch (style) {
		case 'camel':
			return text;
		case 'pascal':
			text = text.replace(/\w+/g, capitalize);
			return text.replace(exp, sep);
		case 'snake':
			return text;
		case 'kebab':
			return text;

		default:
			return text;
	}
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

export function generateId(title: string): string {
	const trimmed = title.split(/ \| /)[0].toLowerCase(); // Take only part before vBar "|"
	const tagId = trimmed.replace(separators, '-').replace(/(-)(?=-*\1)/g, '');
	return tagId.slice(0, tagId.length - (tagId.slice(-1) === '-' ? 1 : 0));
}

export function isAbbreviated(text: string): boolean {
	return text.length < 4 || !Number.isNaN(+text[3]);
}

export function lastWords(index: number, text: string): string {
	return text.split(' ').slice(-index).join(' ');
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
