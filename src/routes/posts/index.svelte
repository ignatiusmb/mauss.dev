<script context="module">
  export async function preload(page, session) {
    const data = await this.fetch(`posts.json`).then(r => r.json());
    return { data, total: data.length };
  }
</script>

<script>
  export let data, total;
  import Pagination from '../../components/Pagination.svelte';
  import PostCard from '../../components/PostCard.svelte';

  import { posts as postPage } from '../../stores/page';
  import { scale } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  $: posts = data.slice($postPage * 6, $postPage * 6 + 6);
</script>

<svelte:head>
  <title>Posts &bull; IMB</title>
</svelte:head>

<header>
  <h1>Recent posts</h1>
  <Pagination store={postPage} {total} />
</header>

<main>
  {#each posts as post (post.slug)}
    <section animate:flip transition:scale|local>
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
    grid-template-columns: repeat(auto-fit, minmax(18em, 26em));
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
