import { readFileSync, readdirSync } from 'fs';
import { parseFile } from '../../utils/parser';

export function get(req, res) {
  const { slug } = req.params;
  const DIR = 'content/posts';
  const posts = readdirSync(DIR);
  const [filename] = posts.filter((post) => post.includes(slug));
  const content = readFileSync(`${DIR}/${filename}`).toString();

  const post = parseFile(filename, content, (cleanedFilename: string, frontMatter: object) => {
    const [date, name] = cleanedFilename.split('.');
    frontMatter['slug'] = name;
    frontMatter['date'] = date;
    const dateFormat = new Date(date);
    const weekday = dateFormat.toLocaleDateString('default', { weekday: 'long' });
    const day = dateFormat.getDate();
    const month = dateFormat.toLocaleDateString('default', { month: 'long' });
    const year = dateFormat.getFullYear();
    frontMatter['pretty-date'] = `${weekday}, ${day} ${month} ${year}`;
    return frontMatter;
  });

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(post));
}
