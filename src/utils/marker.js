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

	const caption = token.attrs.pop()[1];
	const altIdx = token.attrIndex('alt');
	const alt = token.attrs[altIdx][1];

	let data;
	if (/^!YouTube/i.test(alt)) {
		const link = token.attrs[token.attrIndex('src')][1];
		data = `<iframe src="https://www.youtube-nocookie.com/embed/${link}" frameborder="0" allowfullscreen></iframe>`;
	} else if (/^!Video/i.test(alt)) {
		const link = token.attrs[token.attrIndex('src')][1];
		data = `<video controls><source src="${link}" type="video/mp4"></video>`;
	} else {
		tokens[idx].attrs[altIdx][1] = alt.replace(/#disclosure|#flexible/g, '');
		data = slf.renderToken(tokens, idx, options);
	}

	data = `<div class="captioned${/#flexible/i.test(alt) ? ' flexible' : ''}">${data}</div>`;
	const rendered = marker.renderInline(caption);

	return /#disclosure/i.test(alt)
		? `<details><summary>${rendered}</summary>${data}</details>`
		: `<figure>${data}<figcaption>${rendered}</figcaption></figure>`;
};

export default marker;
