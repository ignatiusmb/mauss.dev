import parse from '../_parser.js';

export default parse('content/notes/', (fileData, metadata) => {
  metadata.topic = fileData[0];
  metadata.slug = fileData[1];

  return metadata;
});
