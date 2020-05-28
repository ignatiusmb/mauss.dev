<script context="module">
  export async function preload(page, session) {
    return { post: await this.fetch('uses.json').then(r => r.json()) };
  }
</script>

<script>
  export let post;
  import PostHeader from '../components/PostHeader.svelte';
  import PostArticle from '../pages/PostArticle.svelte';
</script>

<svelte:head>
  <title>Uses &bull; IMB</title>
</svelte:head>

<PostHeader {post} segment="content" filename="uses.md" />
<PostArticle segment="content" filename="uses.md">
  <section>
    {@html post.content}
  </section>
</PostArticle>
