<script context="module">
  export async function preload(page, session) {
    const { slug } = page.params;
    const list = await this.fetch('posts.json').then(r => r.json());
    const post = await this.fetch(`posts/${slug}.json`).then(r => r.json());

    for (let i = 0; i < list.length; i++) {
      if (list[i].slug !== post.slug) continue;
      post['siblings'] = {};
      post.siblings.base = 'posts';
      const [prev, next] = [list[i - 1], list[i + 1]];
      post.siblings.prev = prev ? { slug: prev.slug, title: prev.title } : null;
      post.siblings.next = next ? { slug: next.slug, title: next.title } : null;
      break;
    }
    return { post };
  }
</script>

<script>
  export let post;
  import MetaHead from '../../components/MetaHead.svelte';
  import PostHeader from '../../components/PostHeader.svelte';
  import PostArticle from '../../pages/PostArticle.svelte';
  const segment = 'content/posts';
  $: filename = `${post.date}.${post.slug}.md`;
</script>

<MetaHead {post} canonical="posts/{post.slug}" title={post.title} description={post.description} />

<PostArticle {post} {segment} {filename} siblings={post.siblings} showEdit={true}>
  <section>
    {@html post.content}
  </section>
</PostArticle>
