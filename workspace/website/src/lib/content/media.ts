import { mkdirSync, writeFileSync } from 'fs';
import sharp from 'sharp';

const ROOT = `${process.cwd()}/static/uploads`;

export function assemble(buffer: Buffer, output: `/${string}`) {
	const dir = ROOT + output.slice(0, output.lastIndexOf('/'));

	if (/\.(mp4)$/.test(output)) {
		mkdirSync(dir, { recursive: true });
		writeFileSync(ROOT + output, buffer);
		return '/uploads' + output;
	}

	if (!/\.(jpe?g|png|svg)$/.test(output)) return;

	mkdirSync(dir, { recursive: true });
	const webp = sharp(buffer).webp();
	const path = output.replace(/\.[^/.]+$/, '.webp');
	return webp.toFile(ROOT + path), '/uploads' + path;
}
