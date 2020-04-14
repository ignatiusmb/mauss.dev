<script context="module">
  export async function preload(page, session) {
    const { tag } = page.params;

    const res = await this.fetch('posts.json');
    const list = await res.json();
    const data = list.filter(post => post.tags.includes(tag));

    if (res.status === 200) return { data, tag };
    else this.error(res.status, list.message);
  }
</script>

<script>
  export let data, tag;
  import Card from '../../components/PostCard.svelte';

  import { capitalize } from '../../helper.js';
</script>

<svelte:head>
  <title>{capitalize(tag)} | IMB</title>
  <link rel="shortcut icon" type="image/png" href="images/favicon/blog.png" />
</svelte:head>

<header>
  <h1>{capitalize(tag)}</h1>
</header>

<article>
  {#each data as post, idx}
    <Card
      src={post.image}
      alt={post.title}
      date={post['pretty-date']}
      read={post['read-time']}
      href="posts/{post.slug}"
      time={600 + 100 * idx}>
      <main slot="main">
        <h3>{post.title}</h3>
        {#if post.description}
          <small>{post.description}</small>
        {/if}
      </main>
    </Card>
  {/each}

</article>

<style>
  header {
    width: 75em;
    max-width: 92%;
    padding: calc(1.4vw + 0.5em) 0px;
    border: 2px solid #000000;
    border-radius: 0.15em;
    box-shadow: 5px 6px 0px #000000;
    margin: 1.5em auto;
  }
  header h1 {
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
</style>
