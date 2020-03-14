import glob from 'glob';
import { fs } from 'mz';
import path from 'path';

import { parseFile } from '../_parser';

export async function get(req, res) {
  const posts = await new Promise((resolve, reject) =>
    glob('static/content/posts/*.md', (err, files) => {
      if (err) return reject(err);
      return resolve(files);
    })
  );

  const frontMatters = await Promise.all(
    posts.map(async post => {
      const content = (await fs.readFile(post)).toString();
      return parseFile(post, content, (fileData, metadata) => {
        const dt = new Date(fileData[0]);
        const weekday = dt.toLocaleDateString('default', { weekday: 'long' });
        const month = dt.toLocaleDateString('default', { month: 'long' });
        metadata['dt'] = dt;
        metadata['pretty-date'] = `${weekday}, ${dt.getDate()} ${month} ${dt.getFullYear()}`;
        metadata['slug'] = fileData[1];

        return metadata;
      });
    })
  );
  frontMatters.sort((x, y) => y.metadata.dt.getTime() - x.metadata.dt.getTime());

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(frontMatters));
}
