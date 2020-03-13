<script context="module">
  export async function preload(page, session) {
    const res = await this.fetch(`posts.json`);
    const posts = await res.json();
    return { posts };
  }
</script>

<script>
  export let posts;
  import Card from '../../components/PostCard.svelte';
</script>

<svelte:head>
  <title>Posts | IMB</title>
  <link rel="shortcut icon" type="image/png" href="images/favicon/blog.png" />
</svelte:head>

<h1>Recent posts</h1>

<article>
  {#each posts as post, idx}
    <Card src={post.image} alt={post.title} date={post.date} href="posts/{post.slug}" time={600 + 100 * idx}>
      <main slot="main">
        <h3>{post.title}</h3>
        {#if post.desc}
          <small>{post.desc}</small>
        {/if}
      </main>
    </Card>
  {/each}
</article>

<style>
  h1 {
    margin: 1.5em 0 1em;
    text-align: center;
  }
  article {
    display: grid;
    gap: 1em;
    grid-template-columns: repeat(auto-fit, minmax(18em, 26em));
    justify-content: center;
    width: 100%;
    max-width: 82em;
    padding: 0 1em;
    margin: 1em auto;
  }
  article :global(img:not([src])) {
    display: none;
  }
  main {
    padding: 1em;
  }
  h3 {
    margin-bottom: 1em;
  }
</style>
