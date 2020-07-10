<script context="module">
  export async function preload() {
    return { data: await this.fetch('curated.json').then((r) => r.json()) };
  }
</script>

<script>
  export let data;
  import MetaHead from '../../pages/MetaHead.svelte';
  import ButtonLink from '../../svelte/ButtonLink.svelte';

  import { scale } from 'svelte/transition';
  import { flip } from 'svelte/animate';
</script>

<MetaHead
  canonical="curated"
  title="Curated"
  description="Curated content for all kinds of programming, lifestyle, and many more." />

<header>
  <h1>Curated by Ignatius</h1>
</header>

<main>
  {#each data as post (post.slug)}
    <section animate:flip transition:scale|local>
      <small>{post.title}</small>
      <ButtonLink href="curated/{post.slug}">read</ButtonLink>
    </section>
  {/each}
</main>

<style>
  header,
  main {
    width: 100%;
    max-width: 48em;
    display: grid;
    gap: 1em;
    padding: 0 1em;
    margin: 0 auto;
  }
  h1 {
    width: 100%;
    margin: 1.5em 0 1em;
    text-align: center;
  }
  section {
    width: 100%;
    min-height: 3em;
    display: grid;
    gap: 0.5em;
    align-items: center;
    grid-template-columns: 1fr auto;
    padding: 0.5em;
    border-radius: 0.25em;
    box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12);
    background-color: var(--bg-color-secondary);
  }
  small {
    padding-left: 0.5em;
  }
</style>
