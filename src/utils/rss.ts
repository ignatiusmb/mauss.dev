const chars: Record<string, string> = { '"': 'quot', "'": '#39', '&': 'amp', '<': 'lt', '>': 'gt' };
const formatPubDate = (date: string) => new Date(date).toUTCString();
const clean = (html: string) => (!html ? '' : html.replace(/["'&<>]/g, (c) => `&${chars[c]};`));

export default function RSS(channel: RSSChannel, items: RSSItem[]): string {
	const createItem = (item: RSSItem) => `
		<item>
			<title>${clean(item.title)}</title>
			<link>https://${channel.domain}/${clean(item.slug)}</link>
			<description>${clean(item.description)}</description>
			<pubDate>${formatPubDate(item.date)}</pubDate>
		</item>`;

	const xml = `
	<?xml version="1.0" encoding="UTF-8" ?>
	<rss version="2.0">
	<channel>
		<title>${clean(channel.title)}</title>
		<link>https://${channel.domain}/${clean(channel.slug)}</link>
		<description>${clean(channel.description)}</description>
		<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
		<language>${channel.language || 'en'}</language>
		<image>
			<url>https://${channel.domain}/${channel.image || 'assets/favicon.ico'}</url>
			<title>${channel.title}</title>
			<link>https://${channel.domain}/${clean(channel.slug)}</link>
		</image>
		${items.map(createItem).join('')}
	</channel>
	</rss>`;

	return xml.replace(/>[^\S]+/gm, '>').trim();
}

interface RSSChannel {
	domain: string;
	image?: string;
	title: string;
	slug: string;
	description: string;
	language?: string;
}

export interface RSSItem {
	title: string;
	slug: string;
	description: string;
	date: string;
}
