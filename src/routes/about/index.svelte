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
    {#each sections as section}
      <Link href="about/{section}" inherit={false} invert={false}>
        <h2>{capitalize(section)}</h2>
      </Link>
    {/each}
  </section>

  <section>
    {@html post.content}
  </section>
</PostArticle>

<style>
  section:first-of-type {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-flow: row;
    border: 0.1em solid var(--fg-color);
    border-radius: 0.15em;
  }
  section:first-of-type :global(a) {
    padding: 0 0.5em;
    border: 0.1em solid var(--fg-color);
  }
  section:first-of-type h2 {
    margin-top: 0;
    text-align: center;
  }
</style>
