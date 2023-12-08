import { mkdirSync, writeFileSync } from 'fs';
import sharp from 'sharp';

const ROOT = `${process.cwd()}/static/uploads`;

export function assemble(buffer: Buffer, output: `/${string}`) {
	if (/\.(mp4)$/.test(output)) {
		void write(buffer).to(ROOT + output);
		return '/uploads' + output;
	}

	if (!/\.(jpe?g|png|svg)$/.test(output)) return;

	const path = output.replace(/\.[^/.]+$/, '.webp');
	void optimize(buffer).to(ROOT + path);
	return '/uploads' + path;
}

function optimize(image: Buffer) {
	const original = sharp(image);
	return {
		to(path: string) {
			const dir = path.slice(0, path.lastIndexOf('/'));
			mkdirSync(dir, { recursive: true });
			return original.webp().toFile(path);
		},
	};
}

function write(buffer: Buffer) {
	return {
		to(path: string) {
			const dir = path.slice(0, path.lastIndexOf('/'));
			mkdirSync(dir, { recursive: true });
			writeFileSync(path, buffer);
		},
	};
}
