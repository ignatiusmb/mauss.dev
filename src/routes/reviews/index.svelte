<script context="module">
  export async function preload() {
    return { data: await this.fetch('reviews.json').then(r => r.json()) };
  }
</script>

<script>
  export let data;
  import MetaHead from '../../components/MetaHead.svelte';
  import Searchbar from '../../components/Searchbar.svelte';
  import ReviewCard from '../../components/ReviewCard.svelte';

  const duration = 100;
  import { scale } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  import { sieve } from '../../utils/search';

  let query;
  $: filtered = query ? sieve(query, data) : data;
</script>

<MetaHead
  canonical="reviews"
  title="Reviews"
  description="Personalized reviews for all kinds of anime, books, movies, shows, etc." />

<header>
  <h1>Mauss Reviews</h1>
  <Searchbar bind:query />
</header>

<main>
  {#each filtered as post (post.slug)}
    <section animate:flip={{ duration }}>
      <ReviewCard {post} />
    </section>
  {:else}
    <h2>There are no title reviews matching {query}</h2>
  {/each}
</main>

<style>
  header,
  main {
    width: 100%;
    max-width: 79em;
    padding: 0 1em;
  }
  header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1em auto;
  }
  h1 {
    width: 100%;
    margin: 1.5em 0 1em;
    text-align: center;
  }
  section {
    display: grid;
    grid-template-rows: 1fr auto;
    width: 100%;
    border-radius: 0.25em;
    box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12);
    background-color: var(--bg-color-secondary);
  }

  main {
    position: relative;
    display: grid;
    gap: 1em;
    grid-template-columns: repeat(auto-fill, 12em);
    justify-content: center;
    margin: 0 auto;
  }
  main h2 {
    position: absolute;
    width: 100%;
    text-align: center;
  }
  main :global(img:not([src])) {
    display: none;
  }
</style>
