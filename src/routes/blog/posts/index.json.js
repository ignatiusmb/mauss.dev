import posts from './_posts';

const contents = JSON.stringify(
  posts.map(post => {
    return {
      slug: post.metadata.slug,
      date: post.metadata['pretty-date'],
      title: post.metadata.title,
      desc: post.metadata.description,
      image: post.metadata.image
    };
  })
);

export function get(req, res) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(contents);
}
