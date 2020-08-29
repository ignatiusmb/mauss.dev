const tag = '(?:[^"\'>]|"[^"]*"|\'[^\']*\')*';
const TXC = new RegExp(
	`<(?:!--(?:(?:-*[^->])*--+|-?)|script\\b${tag}>[\\s\\S]*?</script\\s*|style\\b${tag}>[\\s\\S]*?</style\\s*|/?[a-z]${tag})>`,
	'gi'
);

function sanitize(text: string) {
	let old;
	do {
		old = text;
		text = text.replace(TXC, '');
	} while (text !== old);
	return text.replace(/</g, '&lt;');
}

export function countAverageRating(ratings: string[]) {
	if (!ratings) return 0;
	const total = ratings.reduce((acc, cur) => acc + parseInt(cur), 0);
	return Math.round((total / ratings.length + Number.EPSILON) * 100) / 100;
}

export function contentParser(data: any, content: string) {
	function create(props: { [key: string]: string }) {
		let { type, link, caption } = props;
		link = /^<.+>$/.test(link) ? link.slice(1, -1) : link;

		let data;
		if (type.startsWith('youtube')) {
			data = `<iframe src="https://www.youtube-nocookie.com/embed/${link}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
		} else if (type.startsWith('reddit')) {
			const url = (video: boolean, gif = false) => {
				const type = video ? '1080' : 'audio';
				const ext = gif ? '' : '.mp4';
				return `https://v.redd.it/${link}/DASH_${type}${ext}`;
			};
			const source = {
				video: url(true, type.includes(':gif')),
				audio: type.includes(':audio') ? url(false) : null,
			};

			data = `<video controls><source src="${source.video}" type="video/mp4"></video>`;
			if (source.audio) data += `<video><source src="${source.audio}" type="video/mp4"></video>`;
		} else if (type.startsWith('image')) {
			data = `<img src="${link}" alt="${sanitize(caption)}">`;
		} else if (type.startsWith('video')) {
			data = `<video controls${type.includes('gif') ? ' autoplay' : ''}>`;
			data += `<source src="${link}" type="video/mp4"></video>`;
		}
		return type.includes(':disclosure')
			? `<details><summary>${caption}</summary><div class="captioned">${data}</div></details>`
			: `<figure><div class="captioned">${data}</div><figcaption>${caption}</figcaption></figure>`;
	}
	const trimSides = (str: string, chars: number) => {
		return str.slice(chars, str.length - chars);
	};
	const isLiteral = (str: string) => {
		return str.charAt(0) === '{' && str.charAt(str.length - 1) === '}';
	};

	const traverseData = (meta: any, str: any): string => {
		const checkNum = (str: any) => (isNaN(str) ? str : parseInt(str));
		if (!str.includes(':')) return meta[checkNum(str)];
		const [key, ...rest] = str.split(':');
		return traverseData(meta[checkNum(key)], rest.join(':'));
	};

	return content.replace(/\$#.+#!/g, (exp) => {
		const captured = trimSides(exp, 2);
		if (isLiteral(captured)) {
			const trimmed = trimSides(captured, 1);
			return traverseData(data, trimmed);
		}
		const items = captured.split('::');
		const props = items.reduce((acc, cur) => {
			const [key, val] = cur.split('=:=');
			return { ...acc, [key]: val };
		}, {});
		return create(props);
	});
}

export function fillSiblings(articles: any[], base: string, breakpoint?: Function) {
	for (let i = 0; i < articles.length; i++) {
		if (!articles[i]['siblings']) articles[i]['siblings'] = {};
		const [prev, next] = [articles[i - 1], articles[i + 1]];
		if (prev) articles[i]['siblings']['prev'] = { slug: base + prev.slug, title: prev.title };
		if (breakpoint && breakpoint(next)) return articles;
		if (next) articles[i]['siblings']['next'] = { slug: base + next.slug, title: next.title };
	}
	return articles;
}
