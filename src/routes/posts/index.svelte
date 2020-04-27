<script context="module">
  export async function preload(page, session) {
    return { posts: await this.fetch(`posts.json`).then(r => r.json()) };
  }
</script>

<script>
  export let posts;
  import PostCard from '../../components/PostCard.svelte';
</script>

<svelte:head>
  <title>Posts | IMB</title>
  <link rel="shortcut icon" type="image/png" href="images/favicon/blog.png" />
</svelte:head>

<h1>Recent posts</h1>

<main>
  {#each posts as post, idx}
    <PostCard
      src={post.image}
      alt={post.title}
      date={post['pretty-date']}
      read={post['read-time']}
      href="posts/{post.slug}"
      time={600 + 100 * idx}>
      <div>
        <h3>{post.title}</h3>
        {#if post.description}
          <small>{post.description}</small>
        {/if}
      </div>
    </PostCard>
  {/each}
</main>

<style>
  h1 {
    margin: 1.5em 0 1em;
    text-align: center;
  }
  main {
    display: grid;
    gap: 1em;
    grid-template-columns: repeat(auto-fit, minmax(18em, 26em));
    justify-content: center;
    width: 100%;
    max-width: 82em;
    padding: 0 1em;
    margin: 1em auto;
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
