/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
import type { Options } from 'markdown-it';
import Aqua from '@ignatiusmb/aqua';

function highlight(str: string, language: string): string {
	const strList = str.split('\n');
	const dataset: Record<string, string | number> = { language };
	if (strList[0][0] === '~') {
		const [title, lineNumber] = strList[0].split('#');
		dataset['title'] = title.slice(1);
		if (lineNumber) dataset['lineStart'] = +lineNumber;
	}
	const content = strList.slice(dataset['title'] ? 1 : 0).join('\n');
	return Aqua.code.highlight(content, dataset);
}
const marker = require('markdown-it')({ html: true, typographer: true, highlight });
const separators = /[\s\][!"#$%&'()*+,./:;<=>?@\\^_{|}~-]/g;

/** Markdown-it Plugins */
marker.use(require('markdown-it-mark'));
marker.use(require('markdown-it-texmath'), {
	engine: require('katex'),
	delimiters: 'dollars',
	katexOptions: {
		throwOnError: true,
		macros: { '\\RR': '\\mathbb{R}' },
	},
});

/** Renderer Override Rules */
marker.renderer.rules.heading_open = (tokens: any, idx: number) => {
	const [token, text] = [tokens[idx], tokens[idx + 1].content];
	if (+token.tag.slice(-1) > 3) return `<${token.tag}>`;
	const tagId: string = text.split(/ \| /)[0].toLowerCase(); // Take only part before vBar "|"
	return `<${token.tag} id="${tagId.replace(separators, '-').replace(/(-)(?=-*\1)/g, '')}">`;
};
marker.renderer.rules.image = (tokens: any, idx: number, options: Options, env: any, slf: any) => {
	tokens[idx].attrPush(['loading', 'lazy']); // add browser level lazy loading
	const token = tokens[idx];
	const altIdx: number = token.attrIndex('alt');
	const titleIdx: number = token.attrIndex('title');
	token.attrs[altIdx][1] = slf.renderInlineAsText(token.children, options, env);
	if (titleIdx === -1) return slf.renderToken(tokens, idx, options);

	// Pop here so it's not rendered in else block below
	const caption: string = token.attrs.splice(titleIdx, 1)[0][1];
	const alt: string = token.attrs[altIdx][1];

	const media: { type: string; attrs: string[]; data?: string } = {
		type: (alt.match(/^!(\w+[-\w]+)($|#)/) || ['', ''])[1],
		attrs: (alt.match(/#(\w+)/g) || []).map((a) => a.slice(1)),
	};

	const link: string = token.attrs[token.attrIndex('src')][1];
	if (media.type) {
		const stripped = media.type.toLowerCase();
		const [type, ...args] = stripped.split('-');
		if (['yt', 'youtube'].includes(type)) {
			const [, yid, params = ''] = link.match(/([-\w]+)\??(.+)?$/) || [];
			const prefix = args.length && args.includes('s') ? 'videoseries?list=' : '';
			media.data = prefix
				? `<iframe src="https://www.youtube-nocookie.com/embed/${prefix}${link}" frameborder="0" allowfullscreen title="${caption}"></iframe>`
				: `<iframe src="https://www.youtube-nocookie.com/embed/${yid}" srcdoc="<style>*{padding:0;margin:0;overflow:hidden;transition:300ms}html,body{height:100%}a,span{display:flex;align-items:center;justify-content:center}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{width:1.8em;height:1.8em;font-size:3rem;color:white;text-shadow:0 0 0.5em black;background:rgba(0,0,0,0.8);border-radius:50%}a:hover span{background:rgb(255,0,0)}</style><a href=https://www.youtube-nocookie.com/embed/${yid}?autoplay=1&${params}><img src=https://img.youtube.com/vi/${yid}/hqdefault.jpg alt='${caption}'><span>&#x25BA;</span></a>" frameborder="0" allowfullscreen title="${caption}"></iframe>`;
		} else if (['video'].includes(type)) {
			media.data = `<video controls><source src="${link}" type="video/mp4"></video>`;
		}
	} else {
		tokens[idx].attrs[altIdx][1] = alt.replace(/#\w+/g, '');
		media.data = slf.renderToken(tokens, idx, options);
	}

	const classMap: Record<string, string> = {
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
	const rendered: string = marker.renderInline(caption);
	if (mAttrs.has('disclosure')) {
		const body = `<summary>${rendered}</summary>${media.data}`;
		return `<details class="${classes.top.join(' ')}">${body}</details>`;
	} else {
		const body = `${media.data}<figcaption>${rendered}</figcaption>`;
		return `<figure class="${classes.top.join(' ')}">${body}</figure>`;
	}
};

export default marker;
