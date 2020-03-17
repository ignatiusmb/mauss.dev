const { readdirSync, readFileSync } = require('fs');
const path = require('path');
const markIt = require('markdown-it')({ html: true }).use(require('markdown-it-katex'));

function parseFile(filename, content, parseCallback) {
  const fmExpression = /---\r?\n([\s\S]+?)\r?\n---/;
  const separated = fmExpression.exec(content);
  const frontMatter = separated[1].split(/\r?\n/).reduce((acc, cur) => {
    const [key, val] = cur.split(':');
    if (key === 'tags') {
      acc[key] = val.split(',').map(v => v.trim());
    } else acc[key] = val.trim();
    return acc;
  }, {});

  const cleanedFilename = filename.split('/').slice(-1)[0];
  const result = parseCallback(cleanedFilename, frontMatter);

  const article = content.slice(separated[0].length + 1);
  result['read-time'] = Math.round(article.split(' ').length / 275);
  result['read-time'] = result['read-time'] ? result['read-time'] : 1;
  result['content'] = markIt.render(article);
  return result;
}

/**
 * Markdown files parser in a directory
 *
 * @param {string} dirname - Directory Name
 * @param {Function} fileParse - Function to parse filename
 */
function parseDir(dirname, fileParse) {
  const DIR = path.join(process.cwd(), dirname);
  const FILTERED = readdirSync(DIR).filter(name => name.endsWith('.md'));

  return FILTERED.map(filename => {
    const mdFile = readFileSync(path.join(DIR, filename), 'utf8');
    return parseFile(filename, mdFile, fileParse);
  }).sort((x, y) => y.date.getTime() - x.date.getTime());
}

export { parseFile, parseDir };
