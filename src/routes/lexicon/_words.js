import parse from '../_parser.js';

export default parse('content/lexicon/', (fileData, metadata) => {
  metadata.slug = fileData[0];

  return metadata;
});
