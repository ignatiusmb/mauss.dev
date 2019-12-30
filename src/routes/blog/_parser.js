const fs = require('fs');
const path = require('path');
const markIt = require('markdown-it')({ html: true });
markIt.use(require('markdown-it-katex'));

/**
 * Markdown files parser in a directory
 *
 * @param {string} dirname - Directory Name
 * @param {Function} fileParse - Function to parse filename
 * @param {string} SEPARATOR - optional separator, defaults to '<!-- content -->'
 */
function parse(dirname, fileParse, SEPARATOR = '<!-- content -->') {
  const DIR = path.join(process.cwd(), dirname);
  const FILTERED = fs.readdirSync(DIR).filter(filename => /\.md$/.test(filename));

  return FILTERED.map(filename => {
    const mdFile = fs.readFileSync(path.join(DIR, filename), 'utf8');
    const separated = /---\n([\s\S]+?)\n---/.exec(mdFile);
    let metadata = separated[1].split('\n').reduce((acc, cur, i) => {
      const colon = cur.indexOf(':');
      const key = cur.slice(0, colon);
      const val = cur.slice(colon + 1).trim();

      if (key === 'tags') acc[key] = val.split(',').map(v => v.trim());
      else acc[key] = val;
      return acc;
    }, {});
    const body = {};
    if (mdFile.includes(SEPARATOR)) {
      const [desc, content] = mdFile.slice(separated[0].length + 1).split(SEPARATOR);
      body.description = markIt.render(desc);
      body.content = markIt.render(content);
    } else body.content = markIt.render(mdFile.slice(separated[0].length + 1));

    metadata = fileParse(filename.split('.'), metadata);
    return { metadata, body };
  }).sort((x, y) => x.metadata.date < y.metadata.date);
}

export default parse;
