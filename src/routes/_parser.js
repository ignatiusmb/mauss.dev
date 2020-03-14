const fs = require('fs');
const path = require('path');
const markIt = require('markdown-it')({ html: true }).use(require('markdown-it-katex'));

function parseFile(filename, content, parseCallback, SEPARATOR = '<!-- content -->') {
  const fmExpression = /---\n([\s\S]+?)\n---/;
  const separated = fmExpression.exec(content);
  const frontMatter = separated[1].split('\n').reduce((acc, cur, i) => {
    const colon = cur.indexOf(':');
    const key = cur.slice(0, colon);
    const val = cur.slice(colon + 1).trim();

    if (key === 'tags') acc[key] = val.split(',').map(v => v.trim());
    else acc[key] = val;
    return acc;
  }, {});

  const cleaned = filename.split('/').slice(-1)[0];
  const metadata = parseCallback(cleaned.split('.'), frontMatter);
  return { metadata, body: markIt.render(content.slice(separated[0].length + 1)) };
}

/**
 * Markdown files parser in a directory
 *
 * @param {string} dirname - Directory Name
 * @param {Function} fileParse - Function to parse filename
 * @param {string} SEPARATOR - optional separator, defaults to '<!-- content -->'
 */
function parseDir(dirname, fileParse, SEPARATOR = '<!-- content -->') {
  const DIR = path.join(process.cwd(), dirname);
  const FILTERED = fs.readdirSync(DIR).filter(filename => /\.md$/.test(filename));

  return FILTERED.map(filename => {
    const mdFile = fs.readFileSync(path.join(DIR, filename), 'utf8');
    return parseFile(mdFile, fileParse);
  }).sort((x, y) => y.metadata.dt.getTime() - x.metadata.dt.getTime());
}

export { parseFile, parseDir };
