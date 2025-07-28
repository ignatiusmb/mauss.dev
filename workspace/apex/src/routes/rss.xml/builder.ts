function escape(literals: TemplateStringsArray, ...inputs: Array<string | string[]>) {
	const target = /["'&<>]/g;
	const chars: Record<string, string> = {
		'"': 'quot',
		"'": '#39',
		'&': 'amp',
		'<': 'lt',
		'>': 'gt',
	};

	let out = literals[0];
	for (let i = 0; i < inputs.length; i++) {
		const value = inputs[i];
		if (typeof value !== 'string') out += value.join('');
		else out += value.replace(target, (c) => `&${chars[c]};`);
		out += literals[i + 1];
	}
	return out.trim();
}

export const channel = {
	title: 'Alkamauss — A Digital Atelier',
	description:
		'seeing life through a shifting lens in a quiet corner of the web. where everyday moments, distant journeys, and personal echoes turn into stories worth holding.',
};

export function RSS(
	items: Array<{
		title: string;
		slug: string;
		description: string;
		date: string;
	}>,
): string {
	const xml = escape`
	<?xml version="1.0" encoding="UTF-8"?>
	<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<atom:link href="https://mauss.dev/rss.xml" rel="self" type="application/rss+xml" />
		<title>Alkamauss — A Digital Atelier</title>
		<link>https://mauss.dev</link>
		<description>${channel.description}</description>
		<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
		<language>en</language>
		<image>
			<url>https://mauss.dev/assets/rss-image.png</url>
			<title>Alkamauss — A Digital Atelier</title>
			<link>https://mauss.dev</link>
		</image>
		${items.map(
			(item) => escape`
			<item>
				<title>${item.title}</title>
				<link>https://mauss.dev/${item.slug}</link>
				<guid isPermaLink="true">https://mauss.dev/${item.slug}</guid>
				<description>${item.description}</description>
				<pubDate>${new Date(item.date).toUTCString()}</pubDate>
			</item>`,
		)}
	</channel>
	</rss>`;

	return xml.replace(/>[^\S]+/gm, '>');
}
