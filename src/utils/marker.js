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
marker.use(require('markdown-it-mark'));

export default marker;
