<script context="module">
  export async function preload() {
    return { post: await this.fetch('uses.json').then(r => r.json()) };
  }
</script>

<script>
  export let post;
  import MetaHead from '../components/MetaHead.svelte';
  import PostArticle from '../pages/PostArticle.svelte';
</script>

<MetaHead
  {post}
  canonical="uses"
  title="Uses"
  description="Ignatius Bagussuputra's collections, detailing his setup, applications, workstations, and other stuffs." />

<PostArticle {post} segment="content" filename="uses.md">
  <section>
    {@html post.content}
  </section>
</PostArticle>
