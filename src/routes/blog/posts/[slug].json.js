import posts from './_posts'

const lookup = new Map()
posts.forEach(post => lookup.set(post.metadata.slug, JSON.stringify(post)))

export async function get(req, res, next) {
  const { slug } = req.params
  const post = await lookup.get(slug)
  if (post) {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(post)
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: `Not found` }))
  }
}
