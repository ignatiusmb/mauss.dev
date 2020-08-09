export function capitalize(text, lower) {
	return (lower ? text.toLowerCase() : text).replace(/(?:^|\s)\S/g, function (a) {
		return a.toUpperCase();
	});
}

export function compareDate(x, y) {
	const yDate = new Date(y);
	const xDate = new Date(x);
	return yDate.getTime() - xDate.getTime();
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
	if (x.date && y.date && x.date.updated !== y.date.updated) {
		return compareDate(x.date.updated, y.date.updated);
	} else if (x.date && y.date && x.date.published !== y.date.published) {
		return compareDate(x.date.published, y.date.published);
	} else if (x.year && y.year && x.year !== y.year) {
		return y.year - x.year;
	}

	if (typeof x.author === 'string' && typeof y.author === 'string') {
		return x.author.localeCompare(y.author);
	}

	if (typeof x.title === 'string' && typeof y.title === 'string') {
		return x.title.localeCompare(y.title);
	} else if (typeof x.title === 'string') {
		return x.title.localeCompare(y.title.en);
	} else if (typeof y.title === 'string') {
		return x.title.en.localeCompare(y.title);
	} else return x.title.en.localeCompare(y.title.en);
}

export function splitAt(index, text) {
	return [text.slice(0, index), text.slice(index + 1)];
}
