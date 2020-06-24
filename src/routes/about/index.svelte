<script context="module">
  export async function preload() {
    const articles = await this.fetch('about.json').then(r => r.json());
    return { post: articles['index'], sections: Object.keys(articles).filter(e => e !== 'index') };
  }
</script>

<script>
  export let post, sections;
  import Link from '../../components/independent/Link.svelte';
  import MetaHead from '../../components/MetaHead.svelte';
  import PostArticle from '../../pages/PostArticle.svelte';
  import { capitalize } from '../../utils/helper';
</script>

<MetaHead {post} canonical="about" title="About" description="Get to know Ignatius Bagussuputra from his About page." />

<PostArticle {post} segment="content" filename="about/index.md">
  <section>
    {@html post.content}
  </section>

  <section>
    {#each sections as section}
      <Link href="about/{section}">
        <h2>About - {capitalize(section)}</h2>
      </Link>
    {/each}
  </section>
</PostArticle>

<style>
  section:last-child h2 {
    text-align: center;
  }
</style>
