<script context="module">
  export async function preload() {
    return { post: await this.fetch('help.json').then(r => r.json()) };
  }
</script>

<script>
  export let post;
  import MetaHead from '../components/MetaHead.svelte';
  import Disclaimer from '../components/Disclaimer.svelte';
  import PostArticle from '../pages/PostArticle.svelte';
</script>

<MetaHead {post} canonical="help" title="Help" description="Help page with explanation for each page in the website." />

<PostArticle {post} segment="content" filename="help.md">
  <Disclaimer link={true} />

  <section>
    {@html post.content}
  </section>
</PostArticle>
