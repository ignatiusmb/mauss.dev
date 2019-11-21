const fs = require('fs');
const path = require('path');
const markIt = require('markdown-it')({ html: true });
markIt.use(require('markdown-it-katex'));

const DIR = path.join(process.cwd(), 'content/posts/');
const SEPARATOR = '<!-- content -->';
const FILTERED = fs.readdirSync(DIR).filter(filename => /\.md$/.test(filename));

const data = FILTERED.map(filename => {
  const mdFile = fs.readFileSync(path.join(DIR, filename), 'utf8');
  const separated = /---\n([\s\S]+?)\n---/.exec(mdFile);
  const [metadata, body] = [{}, {}];
  for (const line of separated[1].split('\n')) {
    const colonIndex = line.indexOf(':');
    metadata[line.slice(0, colonIndex)] = line.slice(colonIndex + 1).trim();
  }
  const raw = mdFile.slice(separated[0].length + 1);
  const excerpt = raw.indexOf(SEPARATOR);
  if (excerpt !== -1) {
    const [description, content] = raw.split(SEPARATOR);
    body.description = markIt.render(description);
    body.content = markIt.render(content);
  } else body.content = markIt.render(raw);

  const [category, slug, ext] = filename.split('.');
  metadata.category = category;
  metadata.slug = slug;

  const metaDate = new Date(metadata.date);
  const weekday = metaDate.toLocaleDateString('default', { weekday: 'long' });
  const month = metaDate.toLocaleDateString('default', { month: 'long' });
  metadata['pretty-date'] = `${weekday}, ${metaDate.getDate()} ${month} ${metaDate.getFullYear()}`;

  return { metadata, body };
}).sort((x, y) => x.metadata.date < y.metadata.date);

export default data;
