import { readFileSync, readdirSync } from 'fs';
import { parseFile } from '../../utils/parser';
import { createPrettyDate } from '../../utils/helper';

export function get(req, res) {
  const { slug } = req.params;
  const DIR = 'content/posts';
  const posts = readdirSync(DIR);
  const [filename] = posts.filter((post) => post.includes(slug));
  const content = readFileSync(`${DIR}/${filename}`).toString();

  const post = parseFile(filename, content, (cleanedFilename: string, frontMatter: object) => {
    const [date, name] = cleanedFilename.split('.');
    return { slug: name, ...frontMatter, date, 'pretty-date': createPrettyDate(date) };
  });

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(post));
}
