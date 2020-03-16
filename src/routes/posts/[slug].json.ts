import { readFileSync, readdirSync } from 'fs';

import { parseFile } from '../_parser';

export function get(req, res) {
  const { slug } = req.params;
  const DIR = 'static/content/posts';
  const posts = readdirSync(DIR);
  const filename = posts.filter(post => post.includes(slug))[0];
  const content = readFileSync(`${DIR}/${filename}`).toString();

  const post = parseFile(filename, content, (cleanedFilename, frontMatter) => {
    const [date, name] = cleanedFilename.split('.');
    frontMatter['slug'] = name;
    frontMatter['date'] = new Date(date);
    const weekday = frontMatter['date'].toLocaleDateString('default', { weekday: 'long' });
    const day = frontMatter['date'].getDate();
    const month = frontMatter['date'].toLocaleDateString('default', { month: 'long' });
    const year = frontMatter['date'].getFullYear();
    frontMatter['pretty-date'] = `${weekday}, ${day} ${month} ${year}`;
    return frontMatter;
  });

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(post));
}
