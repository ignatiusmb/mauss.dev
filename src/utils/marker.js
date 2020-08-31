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
	return `<${token.tag} id="${tagId}"><a href="${tagId}"><i></i></a>`;
};
marker.renderer.rules.image = (tokens, idx, options, env, slf) => {
	const token = tokens[idx];
	token.attrs[token.attrIndex('alt')][1] = slf.renderInlineAsText(token.children, options, env);
	if (token.attrIndex('title') === -1) return slf.renderToken(tokens, idx, options);
	const caption = token.attrs.pop()[1];
	return `<figure>
		<div class="captioned">${slf.renderToken(tokens, idx, options)}</div>
		<figcaption>${marker.renderInline(caption)}</figcaption>
	</figure>`;
};

export default marker;
