export function capitalize(text, lower) {
	return (lower ? text.toLowerCase() : text).replace(/(?:^|\s)\S/g, function (a) {
		return a.toUpperCase();
	});
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

export function splitAt(index, text) {
	return [text.slice(0, index), text.slice(index + 1)];
}
