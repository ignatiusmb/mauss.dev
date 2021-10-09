// Mauss Library File Playground

/**
 * qpm - Query string Pathname Maker
 * @param bound object with key-value pair to be updated in the URL
 * @returns final pathname with query string
 */
export function qpm(bound: Record<string, string>): string {
	if (typeof window === 'undefined') return '';
	const kvs = Object.entries(bound).reduce((a, [k, v]) => {
		v = v.trim();
		if (!v) return a;
		if (!a) a = '?';
		if (a !== '?') a += '&';
		return `${a}${k}=${encodeURIComponent(v)}`;
	}, '');
	const path = location.pathname;
	return kvs ? path + kvs : path;
}

/**
 * regexp - implementation of global RegExp constructor with escaped pattern
 * @param exp pattern in the form of string literal
 * @param flags unique set of characters from `d|g|i|m|s|u|y`
 * @returns dynamically constructed RegExp object
 */
export function regexp(pattern: string, flags?: string): RegExp {
	return new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), flags);
}
