<script context="module">
  export async function preload() {
    const data = await this.fetch('reviews.json').then(r => r.json());
    const genres = data.flatMap(p => p.genres);
    const unique = {
      categories: data.reduce((a, c) => (a.includes(c.category) ? a : [...a, c.category]), []),
      genres: genres.reduce((a, c) => (a.includes(c) ? a : c ? [...a, c] : a), []).sort(),
      verdict: data.reduce((a, c) => (a.includes(c.verdict) ? a : [...a, c.verdict]), [])
    };
    return { data, unique };
  }
</script>

<script>
  export let data, unique;
  import MetaHead from '../../components/MetaHead.svelte';
  import Searchbar from '../../components/Searchbar.svelte';
  import ReviewCard from '../../components/ReviewCard.svelte';

  const duration = 100;
  const filters = {
    categories: [],
    genres: [],
    verdict: []
  };
  import { flip } from 'svelte/animate';
  import { capitalize } from '../../utils/helper';
  import { sieve } from '../../utils/search';
  let query, show, filtered, sieved;

  $: {
    filtered = data;
    for (const key in filters) {
      if (!filters[key].length) continue;
      if (key === 'genres') {
        filtered = filtered.filter(p => p.genres.filter(g => filters.genres.includes(g)).length);
      } else if (key === 'categories') {
        filtered = filtered.filter(p => filters.categories.includes(p.category));
      } else {
        filtered = filtered.filter(p => filters.verdict.includes(p.verdict));
      }
    }
  }
  $: sieved = query ? sieve(query, filtered) : filtered;
</script>

<MetaHead
  canonical="reviews"
  title="Reviews"
  description="Personalized reviews for all kinds of anime, books, movies, shows, etc." />

<header>
  <h1>Mauss Reviews</h1>
  <Searchbar bind:query on:filter={() => (show = !show)} />
  {#if show}
    <div>
      <section>
        <h3>Categories</h3>
        {#each unique.categories as category}
          <label>
            <input type="checkbox" bind:group={filters.categories} value={category} />
            <span>{capitalize(category)}</span>
          </label>
        {/each}
      </section>

      <section>
        <h3>Genres</h3>
        {#each unique.genres as genre}
          <label>
            <input type="checkbox" bind:group={filters.genres} value={genre} />
            <span>{capitalize(genre)}</span>
          </label>
        {/each}
      </section>

      <section>
        <h3>Verdict</h3>
        {#each unique.verdict as rec}
          <label>
            {#if rec === '2'}
              <input type="checkbox" bind:group={filters.verdict} value="2" />
              <span>Must-watch!</span>
            {:else if rec === '1'}
              <input type="checkbox" bind:group={filters.verdict} value="1" />
              <span>Recommended</span>
            {:else if rec === '0'}
              <input type="checkbox" bind:group={filters.verdict} value="0" />
              <span>Contextual</span>
            {:else if rec === '-1'}
              <input type="checkbox" bind:group={filters.verdict} value="-1" />
              <span>Not recommended</span>
            {:else}
              <input type="checkbox" bind:group={filters.verdict} value="" />
              <span>Pending</span>
            {/if}
          </label>
        {/each}
      </section>
    </div>
  {/if}
</header>

<main>
  {#each sieved as post (post.slug)}
    <section animate:flip={{ duration }}>
      <ReviewCard {post} />
    </section>
  {:else}
    <h2>There are no matching {query ? 'titles' : 'filters'}</h2>
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
  header div {
    width: 100%;
    display: grid;
    gap: 1em;
    grid-template-columns: repeat(auto-fill, minmax(12em, 1fr));
  }
  header input {
    display: none;
  }
  header section {
    overflow-y: auto;
    max-height: 20em;
    display: flex;
    flex-direction: column;
  }
  header section h3 {
    position: sticky;
    top: 0;
    padding: 0.5em 0.25em;
    border-bottom: 1px solid var(--fg-color);
    margin-bottom: 0.5em;
    background-color: var(--bg-color);
  }
  header section label {
    cursor: pointer;
    padding: 0.5em 0.25em;
  }
  header section label span {
    color: var(--fg-secondary-color);
  }
  header section input:checked + span {
    color: var(--fg-color);
  }
  header section input:checked + span::after {
    content: '✔';
    margin-left: 0.5em;
  }

  main {
    position: relative;
    display: grid;
    gap: 1em;
    grid-template-columns: repeat(auto-fill, 12em);
    justify-content: center;
    margin: 0 auto;
  }
  main section {
    display: grid;
    grid-template-rows: 1fr auto;
    width: 100%;
    border-radius: 0.25em;
    box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12);
    background-color: var(--bg-color-secondary);
  }
  main h2 {
    position: absolute;
    width: 100%;
    text-align: center;
    word-break: break-word;
  }
  main :global(img:not([src])) {
    display: none;
  }
</style>
