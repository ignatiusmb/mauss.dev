<script context="module">
  export async function preload(page, session) {
    let data = await this.fetch('reviews.json').then(r => r.json());
    return { data };
  }
</script>

<script>
  export let data;
  import MetaHead from '../../components/MetaHead.svelte';
  import ReviewCard from '../../components/ReviewCard.svelte';

  import { scale } from 'svelte/transition';
  import { flip } from 'svelte/animate';
</script>

<MetaHead
  canonical="reviews"
  title="Reviews"
  description="Personalized reviews for all kinds of anime, shows, movies, etc." />

<header>
  <h1>Mauss Reviews</h1>
</header>

<main>
  {#each data as post (post.slug)}
    <section animate:flip transition:scale|local>
      <ReviewCard {post} />
    </section>
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
    display: grid;
    gap: 1em;
    grid-template-columns: repeat(auto-fit, 12em);
    justify-content: center;
    margin: 0 auto;
  }
  main :global(img:not([src])) {
    display: none;
  }
</style>
