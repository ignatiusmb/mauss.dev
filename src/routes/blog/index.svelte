<script context="module">
  const section = ['posts'];
  export async function preload(page, session) {
    const data = {};
    for (const name of section) {
      const res = await this.fetch(`blog/${name}.json`);
      data[name] = await res.json();
    }
    return data;
  }
</script>

<script>
  import Card from '../../components/PostCard.svelte';

  export let posts;
</script>

<style>
  h1 {
    text-align: center;
  }
  article {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 1em;
  }
  main {
    padding: 1em;
  }
  h3 {
    margin-bottom: 1em;
  }
</style>

<svelte:head>
  <title>Ignatius' Blog &bull; Posts</title>
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
