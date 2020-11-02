import Aqua from '@ignatiusmb/aqua';
function highlight(str, language) {
	const strList = str.split('\n');
	const dataset = { language };
	if (strList[0][0] === '~') {
		const [title, lineNumber] = strList[0].split('#');
		dataset['title'] = title.slice(1);
		if (lineNumber) dataset['lineStart'] = parseInt(lineNumber);
	}
	const content = strList.slice(dataset['title'] ? 1 : 0).join('\n');
	return Aqua.code.highlight(content, dataset);
}
const marker = require('markdown-it')({ html: true, typographer: true, highlight });
const separators = /[\s\][!"#$%&'()*+,./:;<=>?@\\^_{|}~-]/g;

/** Markdown-it Plugins */
marker.use(require('markdown-it-mark'));

/** Renderer Override Rules */
marker.renderer.rules.heading_open = (tokens, idx) => {
	const [token, text] = [tokens[idx], tokens[idx + 1].content];
	if (parseInt(token.tag.slice(-1)) > 3) return `<${token.tag}>`;
	let tagId = text.split(/ \| /)[0].toLowerCase(); // Take only part before vBar "|"
	tagId = tagId.replace(separators, '-').split('-').filter(Boolean).join('-');
	return `<${token.tag} id="${tagId}">`;
};
marker.renderer.rules.image = (tokens, idx, options, env, slf) => {
	const token = tokens[idx];
	token.attrs[token.attrIndex('alt')][1] = slf.renderInlineAsText(token.children, options, env);
	if (token.attrIndex('title') === -1) return slf.renderToken(tokens, idx, options);

	const caption = token.attrs.pop()[1]; // Pop here so it's not rendered in else block below
	const altIdx = token.attrIndex('alt');
	const alt = token.attrs[altIdx][1];

	const media = {
		type: alt.match(/^!(\w+[-\w]+)($|#)/),
		attrs: (alt.match(/#(\w+)/g) || []).map((a) => a.slice(1)),
	};

	const link = token.attrs[token.attrIndex('src')][1];
	if (media.type) {
		const stripped = media.type[1].toLowerCase();
		const [type, ...args] = stripped.split('-');
		if (['yt', 'youtube'].includes(type)) {
			const prefix = args && args[0] === 's' ? 'videoseries?list=' : '';
			media.data = `<iframe src="https://www.youtube-nocookie.com/embed/${prefix}${link}" frameborder="0" allowfullscreen></iframe>`;
		} else if (['video'].includes(type)) {
			media.data = `<video controls><source src="${link}" type="video/mp4"></video>`;
		}
	} else {
		tokens[idx].attrs[altIdx][1] = alt.replace(/#(\w+)/g, '');
		media.data = slf.renderToken(tokens, idx, options);
	}

	const classMap = {
		d: 'disclosure',
		f: 'flexible',
		fb: 'full-bleed',
		hb: 'half-bleed',
	};
	const mAttrs = new Set(media.attrs.map((a) => classMap[a] || a));
	const classes = {
		div: ['captioned', ['flexible'].filter((c) => mAttrs.has(c))].flat(),
		top: ['half-bleed', 'full-bleed'].filter((c) => mAttrs.has(c)),
	};

	media.data = `<div class="${classes.div.join(' ')}">${media.data}</div>`;
	const rendered = marker.renderInline(caption);
	if (mAttrs.has('disclosure')) {
		const body = `<summary>${rendered}</summary>${media.data}`;
		return `<details class="${classes.top.join(' ')}">${body}</details>`;
	} else {
		const body = `${media.data}<figcaption>${rendered}</figcaption>`;
		return `<figure class="${classes.top.join(' ')}">${body}</figure>`;
	}
};

export default marker;
