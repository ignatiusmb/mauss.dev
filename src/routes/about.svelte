<script context="module">
  export async function preload(page, session) {
    return { post: await this.fetch('about.json').then(r => r.json()) };
  }
</script>

<script>
  export let post;
  import MetaHead from '../components/MetaHead.svelte';
  import PostHeader from '../components/PostHeader.svelte';
  import PostArticle from '../pages/PostArticle.svelte';
</script>

<MetaHead canonical="about" {post} title="About" />

<PostHeader {post} segment="content" filename="about.md" />
<PostArticle segment="content" filename="about.md">
  <section>
    {@html post.content}
  </section>
</PostArticle>
