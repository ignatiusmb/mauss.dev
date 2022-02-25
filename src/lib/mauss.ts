// Mauss Library File Playground

export function entries<T>(o: T) {
	return Object.entries(o) as import('mauss/typings').Entries<T>;
}
