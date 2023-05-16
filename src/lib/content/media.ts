import { mkdirSync, writeFileSync } from 'fs';
import sharp from 'sharp';

export function optimize(image: Buffer) {
	const original = sharp(image);
	return {
		to(path: string) {
			const dir = path.slice(0, path.lastIndexOf('/'));
			mkdirSync(dir, { recursive: true });
			return original.webp().toFile(path);
		},
	};
}

export function write(buffer: Buffer) {
	return {
		to(path: string) {
			const dir = path.slice(0, path.lastIndexOf('/'));
			mkdirSync(dir, { recursive: true });
			writeFileSync(path, buffer);
		},
	};
}
