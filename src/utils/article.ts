export function countAverageRating(ratings: string[]) {
	if (!ratings) return 0;
	const total = ratings.reduce((acc, cur) => acc + parseInt(cur), 0);
	return Math.round((total / ratings.length + Number.EPSILON) * 100) / 100;
}

export function contentParser(data: { [key: string]: string }, content: string) {
	function create(props: { type?: string; link?: string; caption?: string }) {
		let data;
		if (props.type === 'youtube') {
			data = `<div class="youtube"><iframe src="https://www.youtube-nocookie.com/embed/${props.link}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
		}
		return `<figure>${data}<figcaption>${props.caption}</figcaption></figure>`;
	}
	const trimSides = (str: string, chars: number) => {
		return str.slice(chars, str.length - chars);
	};
	const isLiteral = (str: string) => {
		return str.charAt(0) === '{' && str.charAt(str.length - 1) === '}';
	};

	return content.replace(/\$#.+#!/g, (exp) => {
		const captured = trimSides(exp, 2);
		if (isLiteral(captured)) {
			const trimmed = trimSides(captured, 1);
			if (!captured.includes(':')) return data[trimmed];

			const keys = trimmed.split(':');
			let replacement = data[keys[0]];
			for (let i = 1; i < keys.length; i++) {
				replacement = data[keys[i]];
			}
			return replacement;
		} else {
			const items = captured.split('::');
			const props = items.reduce((acc, cur) => {
				const [key, val] = cur.split('=:=');
				return { ...acc, [key]: val };
			}, {});
			return create(props);
		}
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
