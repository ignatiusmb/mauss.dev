import parse from '../_parser.js';

export default parse('content/posts/', (fileData, metadata) => {
  const dt = new Date(fileData[0]);
  const weekday = dt.toLocaleDateString('default', { weekday: 'long' });
  const month = dt.toLocaleDateString('default', { month: 'long' });
  metadata['pretty-date'] = `${weekday}, ${dt.getDate()} ${month} ${dt.getFullYear()}`;
  metadata.slug = fileData[1];

  return metadata;
});
