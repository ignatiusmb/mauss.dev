import sharp from 'sharp';

export function optimize(image: Buffer) {
	const original = sharp(image);
	return original.webp();
}
