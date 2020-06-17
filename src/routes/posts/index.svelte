<script context="module">
  export async function preload() {
    return { data: await this.fetch('posts.json').then(r => r.json()) };
  }
</script>

<script>
  export let data;
  import MetaHead from '../../components/MetaHead.svelte';
  import Searchbar from '../../components/Searchbar.svelte';
  import Pagination from '../../components/Pagination.svelte';
  import PostCard from '../../components/PostCard.svelte';

  const duration = 100;
  import { posts as postPage } from '../../stores/page';
  import { scale } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  import { sieve } from '../../utils/search';
  let query;
  $: filtered = query ? sieve(query, data) : data;
  $: total = filtered.length;
  $: $postPage = $postPage * 6 > total ? 0 : $postPage;
  $: posts = filtered.slice($postPage * 6, $postPage * 6 + 6);
</script>

<MetaHead canonical="posts" title="Posts" description="Get the latest most recent posts here." />

<header>
  <h1>Recent Posts</h1>
  <Searchbar bind:query />
  <Pagination store={postPage} {total} />
</header>

<main>
  {#each posts as post (post.slug)}
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
  section {
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
  h3 {
    margin-bottom: 1em;
  }
</style>
