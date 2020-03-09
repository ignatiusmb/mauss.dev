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

<svelte:head>
  <title>Blog | IMB</title>
  <link rel="shortcut icon" type="image/png" href="images/favicon/blog.png" />
</svelte:head>

<h1>Recent posts</h1>

<article>
  {#each posts as post}
    <Card src={post.image} date={post.date} href="blog/posts/{post.slug}">
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
    margin: 1em;
  }
  main {
    padding: 1em;
  }
  h3 {
    margin-bottom: 1em;
  }
</style>
