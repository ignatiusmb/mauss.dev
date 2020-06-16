<script context="module">
  export async function preload({ params }) {
    return { post: await this.fetch(`curated/${params.slug}.json`).then(r => r.json()) };
  }
</script>

<script>
  export let post;
  import MetaHead from '../../components/MetaHead.svelte';
  import PostArticle from '../../pages/PostArticle.svelte';
  const segment = 'content/curated';
  $: canonical = `curated/${post.slug}`;
  $: filename = `${post.slug}.md`;
</script>

<MetaHead {post} {canonical} title={post.title} description={post.description} />

<PostArticle {post} {segment} {filename} showEdit={true}>
  <section>
    {@html post.content}
  </section>
</PostArticle>
