const chars = {
	'"': 'quot',
	"'": '#39',
	'&': 'amp',
	'<': 'lt',
	'>': 'gt',
};

const formatPubDate = (date: string) => {
	const formatted = new Date(date);
	return formatted.toUTCString();
};
const clean = (html: string) => {
	if (!html) return '';
	return html.replace(/["'&<>]/g, (c) => `&${chars[c]};`);
};

export default function RSS(channel: RSSChannel) {
	const createItem = (item: RSSItem) => `
		<item>
			<title>${clean(item.title)}</title>
			<link>https://${channel.domain}/${clean(item.slug)}</link>
			<description>${clean(item.description)}</description>
			<pubDate>${formatPubDate(item.date)}</pubDate>
		</item>`;

	const xml = (items: RSSItem[]) =>
		`<?xml version="1.0" encoding="UTF-8" ?>
		<rss version="2.0">
		<channel>
			<title>${clean(channel.title)}</title>
			<link>https://${channel.domain}/${clean(channel.slug)}</link>
			<description>${clean(channel.description)}</description>
			<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
			<language>${channel.language || 'en'}</language>
			<image>
				<url>https://${channel.domain}/${channel.image || 'favicon.ico'}</url>
				<title>${channel.title}</title>
				<link>https://${channel.domain}/${clean(channel.slug)}</link>
			</image>
			${items.map(createItem).join('')}
		</channel>
		</rss>`.replace(/>[^\S]+/gm, '>');

	return { generate: (items: RSSItem[]) => xml(items).trim() };
}
