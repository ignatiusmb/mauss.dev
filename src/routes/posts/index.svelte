<script context="module">
  export async function preload() {
    const data = await this.fetch('posts.json').then(r => r.json());
    const tags = data.flatMap(p => p.tags);
    const unique = {
      categories: data.reduce((a, c) => (a.includes(c.tags[0]) ? a : [...a, c.tags[0]]), []).sort(),
      tags: tags.reduce((a, c) => (a.includes(c) ? a : c ? [...a, c] : a), []).sort()
    };
    return { data, unique };
  }
</script>

<script>
  export let data, unique;
  import MetaHead from '../../components/MetaHead.svelte';
  import Searchbar from '../../components/Searchbar.svelte';
  import FilterGrid from '../../components/FilterGrid.svelte';
  import Pagination from '../../components/Pagination.svelte';
  import PostCard from '../../components/PostCard.svelte';

  const duration = 100;
  import { posts as postPage } from '../../stores/page';
  import { scale } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  import { sieve } from '../../utils/search';
  import { compareDate, sortCompare } from '../../utils/helper';
  let query, show, filtered, sieved;
  let filters = { categories: [], tags: [], sort: 'published' };

  $: {
    filtered = data;
    for (const key in filters) {
      if (!filters[key].length) continue;
      if (key === 'tags') {
        filtered = filtered.filter(p => p.tags.filter(g => filters.tags.includes(g)).length);
      } else if (key === 'categories') {
        filtered = filtered.filter(p => filters.categories.includes(p.tags[0]));
      } else {
        if (filters[key] === 'published') {
          filtered = filtered.sort(sortCompare);
        } else if (filters[key] === 'updated') {
          filtered = filtered.sort((x, y) => {
            return compareDate(x.updated, y.updated) || sortCompare(x, y);
          });
        }
      }
    }
  }
  $: sieved = query ? sieve(query, filtered) : filtered;
  $: total = sieved.length;
  $: $postPage = $postPage * 6 > total ? 0 : $postPage;
</script>

<MetaHead canonical="posts" title="Posts" description="Get the latest most recent posts here." />

<header>
  <h1>Recent Posts</h1>
  <Searchbar bind:query on:filter={() => (show = !show)} />
  <FilterGrid {show} {unique} bind:filters>
    <section>
      <h3>Sort by</h3>
      <label>
        <input type="radio" bind:group={filters.sort} value="published" />
        <span>Date published</span>
      </label>
      <label>
        <input type="radio" bind:group={filters.sort} value="updated" />
        <span>Last updated</span>
      </label>
    </section>
  </FilterGrid>
  <Pagination store={postPage} {total} />
</header>

<main>
  {#each sieved.slice($postPage * 6, $postPage * 6 + 6) as post (post.slug)}
    <section animate:flip={{ duration }} transition:scale|local={{ duration }}>
      <PostCard {post}>
        <div>
          <h3>{post.title}</h3>
          {#if post.description}
            <small>{post.description}</small>
          {/if}
        </div>
      </PostCard>
    </section>
  {/each}
</main>

<style>
  header,
  main {
    width: 100%;
    max-width: 82em;
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
  main section {
    display: grid;
    grid-template-rows: 1fr 3em;
    width: 100%;
    border-radius: 0.25em;
    box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12);
    background-color: var(--bg-color-secondary);
  }

  main {
    display: grid;
    gap: 1em;
    grid-template-columns: repeat(auto-fill, minmax(18em, 26em));
    justify-content: center;
    margin: 0 auto;
  }
  main :global(img:not([src])) {
    display: none;
  }
  main div {
    padding: 1em;
  }
  main h3 {
    margin-bottom: 1em;
  }
</style>
