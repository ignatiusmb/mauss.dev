<script context="module">
  export async function preload() {
    return { post: await this.fetch('about.json').then(r => r.json()) };
  }
</script>

<script>
  export let post;
  import MetaHead from '../components/MetaHead.svelte';
  import PostArticle from '../pages/PostArticle.svelte';
</script>

<MetaHead {post} canonical="about" title="About" description="Get to know Ignatius Bagussuputra from his About page." />

<PostArticle {post} segment="content" filename="about.md">
  <section>
    {@html post.content}
  </section>
</PostArticle>
