import { parseDir } from '../_parser';

export function get(req, res) {
  const DIR = 'content/posts';
  const posts = parseDir(DIR, (cleanedFilename, frontMatter) => {
    const [date, name] = cleanedFilename.split('.');
    frontMatter['slug'] = name;
    frontMatter['date'] = new Date(date);
    const weekday = frontMatter['date'].toLocaleDateString('default', { weekday: 'long' });
    const day = frontMatter['date'].getDate();
    const month = frontMatter['date'].toLocaleDateString('default', { month: 'long' });
    const year = frontMatter['date'].getFullYear();
    frontMatter['pretty-date'] = `${weekday}, ${day} ${month} ${year}`;
    return frontMatter;
  }).filter(post => delete post.content);

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(posts));
}
