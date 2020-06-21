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
	const dateFormat = new Date(date);
	const weekday = dateFormat.toLocaleDateString('default', { weekday: 'long' });
	const day = dateFormat.getDate();
	const month = dateFormat.toLocaleDateString('default', { month: 'long' });
	const year = dateFormat.getFullYear();
	return `${weekday}, ${day} ${month} ${year}`;
}

export function isAbbreviated(text) {
	if (text.length < 4) return true;
	return isNaN(parseInt(text[3], 10)) ? false : true;
}

export function lastWords(index, text) {
	return text.split(' ').slice(-index).join(' ');
}

export function sortCompare(x, y) {
	if (x.date !== y.date) {
		return compareDate(x.date, y.date);
	} else if (x.updated !== y.updated) {
		return compareDate(x.updated, y.updated);
	} else if (x.year && y.year && x.year !== y.year) {
		return y.year - x.year;
	}
	return x.title.localeCompare(y.title);
}

export function splitAt(index, text) {
	return [text.slice(0, index), text.slice(index + 1)];
}
