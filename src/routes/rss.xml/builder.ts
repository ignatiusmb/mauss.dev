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
	domain: 'mauss.dev',
	title: 'Ignatius Bagussuputra | Alchemauss',
	description:
		'The world through my kaleidoscope, capturing the beauty of life in a myriad of colors. Discovering the beauty of ordinary moments through everyday life, travel, and personal reflections.',
};

export function RSS(
	channel: {
		domain: string;
		image?: string;
		title: string;
		slug?: string;
		description: string;
		language?: string;
	},
	items: Array<{
		title: string;
		slug: string;
		description: string;
		date: string;
	}>,
): string {
	const xml = escape`
	<?xml version="1.0" encoding="UTF-8"?>
	<rss version="2.0">
	<channel>
		<title>${channel.title}</title>
		<link>https://${channel.domain}/${channel.slug || ''}</link>
		<description>${channel.description}</description>
		<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
		<language>${channel.language || 'en'}</language>
		<image>
			<url>https://${channel.domain}/${channel.image || 'favicon.ico'}</url>
			<title>${channel.title}</title>
			<link>https://${channel.domain}/${channel.slug || ''}</link>
		</image>
		${items.map(
			(item) => escape`
			<item>
				<title>${item.title}</title>
				<link>https://${channel.domain}/${item.slug}/</link>
				<description>${item.description}</description>
				<pubDate>${new Date(item.date).toUTCString()}</pubDate>
			</item>`,
		)}
	</channel>
	</rss>`;

	return xml.replace(/>[^\S]+/gm, '>');
}
