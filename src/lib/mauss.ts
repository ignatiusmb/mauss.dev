// Mauss Library File Playground

export function entries<T extends object>(o: T) {
	return Object.entries(o) as import('mauss/typings').Entries<T>;
}
