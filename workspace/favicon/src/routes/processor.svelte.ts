import { scope } from 'mauss';

async function ico(raw: string, size: number): Promise<Blob> {
	const blob = await png(raw, size, size);
	const offset = 6 + 16 * 1; // header + one entry

	const buffer = new Uint8Array(await blob.arrayBuffer());
	const header = new Uint8Array([0x00, 0x00, 0x01, 0x00, 0x01, 0x00]);
	const entry = new Uint8Array([
		size,
		size,
		0x00,
		0x00,
		0x01,
		0x00,
		0x20,
		0x00,
		// image size
		(size >> (8 * 0)) & 0xff,
		(size >> (8 * 1)) & 0xff,
		(size >> (8 * 2)) & 0xff,
		(size >> (8 * 3)) & 0xff,
		// offset
		(offset >> (8 * 0)) & 0xff,
		(offset >> (8 * 1)) & 0xff,
		(offset >> (8 * 2)) & 0xff,
		(offset >> (8 * 3)) & 0xff,
	]);

	const bytes = new Uint8Array(header.length + entry.length + buffer.length);
	bytes.set(header, 0);
	bytes.set(entry, header.length);
	bytes.set(buffer, header.length + entry.length);
	return new Blob([bytes], { type: 'image/x-icon' });
}

async function png(raw: string, image: number, size: number): Promise<Blob> {
	const svg = new Blob([raw], { type: 'image/svg+xml' });
	const url = URL.createObjectURL(svg);

	const canvas = document.createElement('canvas');
	canvas.width = canvas.height = size;
	const ctx = canvas.getContext('2d')!;
	ctx.clearRect(0, 0, size, size);
	const offset = (size - image) / 2;

	return await new Promise((resolve) => {
		const img = new Image();
		img.onload = () => {
			ctx.drawImage(img, offset, offset, image, image);
			URL.revokeObjectURL(url);
			canvas.toBlob((blob) => resolve(blob!), `image/png`);
		};
		img.onerror = () => resolve(new Blob());
		img.src = url;
	});
}

export const sizes = $state([
	{ selected: true, name: 'favicon.ico', image: 32, canvas: 32, convert: ico },
	{ selected: true, name: 'apple-touch-icon.png', image: 140, canvas: 180, convert: png },
	{ selected: true, name: 'favicon-x192.png', image: 192, canvas: 192, convert: png },
	{ selected: true, name: 'favicon-x512.png', image: 512, canvas: 512, convert: png },
	{ selected: true, name: 'maskable.png', image: 409, canvas: 512, convert: png },
]);

export async function zip(files: Array<{ name: string; blob: Blob }>): Promise<Blob> {
	const headers: Uint8Array[] = [];
	const directories: Uint8Array[] = [];
	let offset = 0;

	for (const { name, buffer } of await Promise.all(
		files.map(async ({ name, blob }) => ({
			name,
			buffer: new Uint8Array(await blob.arrayBuffer()),
		})),
	)) {
		const encoded = new TextEncoder().encode(name);
		const { time, date } = scope(() => {
			const now = new Date();
			const time = (now.getHours() << 11) | (now.getMinutes() << 5) | (now.getSeconds() / 2);
			const date = ((now.getFullYear() - 1980) << 9) | ((now.getMonth() + 1) << 5) | now.getDate();
			return { time: time & 0xffff, date: date & 0xffff };
		});
		const crc32 = scope(() => {
			let crc = 0xffffffff;
			for (let i = 0; i < buffer.length; i++) {
				crc = CRC[(crc ^ buffer[i]) & 0xff] ^ (crc >>> 8);
			}
			return (crc ^ 0xffffffff) >>> 0;
		});

		const local = scope(() => {
			// local file header (30 bytes + filename)
			const bytes = new Uint8Array(30 + encoded.length);

			// https://en.wikipedia.org/wiki/ZIP_(file_format)#Local_file_header
			writeHeader(new DataView(bytes.buffer), [
				['32', 0, 0x04034b50], // local file header signature
				['16', 4, 20], // version needed to extract
				['16', 6, 0x800], // general purpose bit flag
				['16', 8, 0], // compression method (0 = store)
				['16', 10, time], // last mod file time
				['16', 12, date], // last mod file date
				['32', 14, crc32], // crc-32
				['32', 18, buffer.length], // compressed size
				['32', 22, buffer.length], // uncompressed size
				['16', 26, encoded.length], // file name length
				['16', 28, 0], // extra field length
			]);
			bytes.set(encoded, 30);
			return bytes;
		});

		const central = scope(() => {
			// central directory header (46 bytes + filename)
			const bytes = new Uint8Array(46 + encoded.length);

			// https://en.wikipedia.org/wiki/ZIP_(file_format)#Central_directory_file_header_(CDFH)
			writeHeader(new DataView(bytes.buffer), [
				['32', 0, 0x02014b50], // central directory file header signature
				['16', 4, 0x14], // version made by
				['16', 6, 0x14], // version needed to extract
				['16', 8, 0x800], // general purpose bit flag
				['16', 10, 0], // compression method (0 = store)
				['16', 12, time], // last mod file time
				['16', 14, date], // last mod file date
				['32', 16, crc32], // crc-32
				['32', 20, buffer.length], // compressed size
				['32', 24, buffer.length], // uncompressed size
				['16', 28, encoded.length], // file name length
				['16', 30, 0], // extra field length
				['16', 32, 0], // file comment length
				['16', 34, 0], // disk number start
				['16', 36, 0], // internal file attributes
				['32', 38, 0], // external file attributes
				['32', 42, offset], // relative offset of local header
			]);
			bytes.set(encoded, 46);
			return bytes;
		});

		headers.push(local, buffer);
		directories.push(central);
		offset += local.length + buffer.length;
	}

	const data = concatU8(directories);
	const end = scope(() => {
		// end of central directory record (22 bytes)
		const bytes = new Uint8Array(22);

		// https://en.wikipedia.org/wiki/ZIP_(file_format)#End_of_central_directory_record_(EOCD)
		writeHeader(new DataView(bytes.buffer), [
			['32', 0, 0x06054b50], // end of central directory signature
			['16', 4, 0], // number of this disk
			['16', 6, 0], // number of the disk with the start of the central directory
			['16', 8, files.length], // total number of entries in the central directory on this disk
			['16', 10, files.length], // total number of entries in the central directory
			['32', 12, data.length], // size of the central directory
			['32', 16, offset], // offset of start of central directory with respect to the starting disk number
			['16', 20, 0], // .ZIP file comment length
		]);
		return bytes;
	});

	const zipped = concatU8([...headers, data, end]);
	return new Blob([zipped], { type: 'application/zip' });
}

function writeHeader(view: DataView, map: Array<['16' | '32', offset: number, value: number]>) {
	for (const [type, offset, value] of map) {
		type Method = `setUint${typeof type}`;
		const method: Method = `setUint${type}`;
		view[method](offset, value, true);
	}
}

function concatU8(collection: Uint8Array[]): Uint8Array {
	let total = 0;
	for (const arr of collection) {
		total += arr.length;
	}
	const result = new Uint8Array(total);
	let offset = 0;
	for (const arr of collection) {
		result.set(arr, offset);
		offset += arr.length;
	}
	return result;
}

const CRC = scope(() => {
	const table = new Uint32Array(256);
	for (let i = 0; i < 256; i += 1) {
		let c = i;
		for (let j = 0; j < 8; j++) {
			c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
		}
		table[i] = c >>> 0;
	}
	return table;
});
