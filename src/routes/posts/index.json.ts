import { Request, Response } from 'express';
import { existsSync } from 'fs';
import { join } from 'path';
import { parseDir } from '../_parser';

export function get(req: Request, res: Response) {
  const DIR = 'content/posts';
  const posts = parseDir(DIR, (cleanedFilename: string, frontMatter: object) => {
    const [date, name] = cleanedFilename.split('.');
    frontMatter['slug'] = name;
    frontMatter['date'] = new Date(date);
    const weekday = frontMatter['date'].toLocaleDateString('default', { weekday: 'long' });
    const day = frontMatter['date'].getDate();
    const month = frontMatter['date'].toLocaleDateString('default', { month: 'long' });
    const year = frontMatter['date'].getFullYear();
    frontMatter['pretty-date'] = `${weekday}, ${day} ${month} ${year}`;

    const rootFolder = `${process.cwd()}/static`;
    const category: string = frontMatter['tags'][0];
    const imagePath = `uploads/${category.toLowerCase()}/thumbnail/${frontMatter['slug']}`;
    if (existsSync(join(rootFolder, `${imagePath}.png`))) {
      frontMatter['image'] = `${imagePath}.png`;
    } else if (existsSync(join(rootFolder, `${imagePath}.jpg`))) {
      frontMatter['image'] = `${imagePath}.jpg`;
    }
    return frontMatter;
  }).filter((post) => delete post.content);

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(posts));
}
