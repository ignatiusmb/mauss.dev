<script context="module">
  export async function preload({ params }) {
    const list = await this.fetch('posts.json').then((r) => r.json());
    const res = await this.fetch(`posts/${params.slug}.json`);
    if (res.status !== 200) return this.error(404, 'Post not found');

    const post = await res.json();
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
  import MetaHead from '../../pages/MetaHead.svelte';
  import Article from '../../pages/Article.svelte';
  import TagBadge from '../../components/TagBadge.svelte';
  $: canonical = `posts/${post.slug}`;
  $: filename = `${post.date}.${post.slug}.md`;
</script>

<MetaHead {post} {canonical} title={post.title} description={post.description} />

<Article {post} path="content/posts/{filename}" siblings={post.siblings} showEdit>
  <small slot="header">
    {#each post.tags as tag}
      <TagBadge {tag} />
    {/each}
  </small>

  <section>
    {@html post.content}
  </section>
</Article>

<style>
  small {
    display: flex;
    flex-wrap: wrap;
  }
  small > :global(:not(:last-child)) {
    margin-right: 0.5em;
  }
  small > :global(span) {
    margin-bottom: 0.5em;
  }
</style>
