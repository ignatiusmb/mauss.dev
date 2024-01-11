import { mkdirSync, writeFileSync } from 'fs';
import sharp from 'sharp';

const ROOT = `${process.cwd()}/static/uploads`;

export function assemble(buffer: Buffer, output: `/${string}`) {
	const dir = ROOT + output.slice(0, output.lastIndexOf('/'));

	switch (true) {
		case /\.(mp4)$/.test(output): {
			mkdirSync(dir, { recursive: true });
			writeFileSync(ROOT + output, buffer);
			return '/uploads' + output;
		}
		case /\.(jpe?g)$/.test(output): {
			mkdirSync(dir, { recursive: true });
			const path = output.replace(/\.[^/.]+$/, '.jpeg');

			const image = sharp(buffer);
			image.metadata().then(({ orientation = 0, width, height }) => {
				const original = orientation >= 5 ? height : width;
				image.resize(Math.min(original || 1080, 1080));
				image.jpeg({ mozjpeg: true }).toFile(ROOT + path);
			});

			return '/uploads' + path;
		}
		case /\.(png|svg)$/.test(output): {
			mkdirSync(dir, { recursive: true });
			const path = output.replace(/\.[^/.]+$/, '.png');

			const image = sharp(buffer);
			image.metadata().then(({ orientation = 0, width, height }) => {
				const original = orientation >= 5 ? height : width;
				image.resize(Math.min(original || 1080, 1080));
				image.png({ quality: 85 }).toFile(ROOT + path);
			});

			return '/uploads' + path;
		}

		default:
			return;
	}
}
