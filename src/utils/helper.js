export function capitalize(text, lower) {
	text = lower ? text.toLowerCase() : text;
	return text.replace(/(?:^|\s)\S/g, (a) => a.toUpperCase());
}

export function compareDate(x, y) {
	return new Date(y) - new Date(x);
}

export function convertCase(style, text, sep = ' ') {
	const exp = /[ |-|.|_]/g;
	switch (style) {
		case 'camel':
			break;
		case 'pascal':
			text = text.replace(/\w+/g, capitalize);
			return text.replace(exp, sep);
		case 'snake':
			break;
		case 'kebab':
			break;

		default:
			return text;
	}
}

export function createPrettyDate(date) {
	if (!date) return null;
	const dateFormat = new Date(date);
	const weekday = dateFormat.toLocaleDateString('default', { weekday: 'long' });
	const day = dateFormat.getDate();
	const month = dateFormat.toLocaleDateString('default', { month: 'long' });
	const year = dateFormat.getFullYear();
	return { weekday, day, month, year, complete: `${day} ${month} ${year}` };
}

export function debounce(fn, time = 300) {
	let timeout;
	return (...args) => {
		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(() => fn(...args), time);
	};
}

export function isAbbreviated(text) {
	if (text.length < 4) return true;
	return isNaN(parseInt(text[3], 10)) ? false : true;
}

export function lastWords(index, text) {
	return text.split(' ').slice(-index).join(' ');
}

export function randomInt(max, min) {
	min = Math.ceil(min ? min : 0);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

export function randomKey(dict) {
	const keys = Object.keys(dict);
	return dict[keys[(keys.length * Math.random()) << 0]];
}

export function sortCompare(x, y) {
	if (x.date && y.date) {
		const { updated: xu, published: xp } = x.date;
		const { updated: yu, published: yp } = y.date;
		if (xu !== yu) return compareDate(xu, yu);
		if (xp !== yp) return compareDate(xp, yp);
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

export function splitAt(index, text) {
	return [text.slice(0, index), text.slice(index + 1)];
}
