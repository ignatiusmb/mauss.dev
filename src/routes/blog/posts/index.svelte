<script context="module">
  export async function preload(page, session) {
    const res = await this.fetch(`blog/posts.json`);
    const posts = await res.json();
    return { posts };
  }
</script>

<script>
  import Card from '../../../components/PostCard.svelte';

  export let posts;
</script>

<svelte:head>
  <title>Posts &bull; Blog | IMB</title>
  <link rel="shortcut icon" type="image/png" href="images/favicon/blog.png" />
</svelte:head>

<h1>Recent posts</h1>

<article>
  {#each posts as post}
    <Card src={post.image} href="blog/posts/{post.slug}">
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
    margin: 1em;
  }
  main {
    padding: 1em;
  }
  h3 {
    margin-bottom: 1em;
  }
</style>
