<script context="module">
  export async function preload(page, session) {
    const res = await this.fetch(`posts.json`);
    const posts = await res.json();
    return { posts };
  }
</script>

<script>
  import Card from '../../components/PostCard.svelte';

  export let posts;
</script>

<svelte:head>
  <title>Blog | IMB</title>
  <link rel="shortcut icon" type="image/png" href="images/favicon/blog.png" />
</svelte:head>

<h1>Recent posts</h1>

<article>
  {#each posts as post}
    <Card src={post.image} alt={post.title} date={post.date} href="posts/{post.slug}">
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
    text-align: center;
  }
  article {
    display: grid;
    grid-gap: 1em;
    grid-template-columns: repeat(auto-fit, minmax(25em, 1fr));
    justify-items: center;
    max-width: 90em;
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
