<script context="module">
  export async function preload(page, session) {
    const { tag } = page.params;
    let list = await this.fetch('posts.json').then(r => r.json());
    list = [...list, await this.fetch('uses.json').then(r => r.json())];
    const data = list.filter(post => post.tags.includes(tag));
    return { data, tag };
  }
</script>

<script>
  export let data, tag;
  import TagCard from '../../components/TagCard.svelte';

  import { capitalize, isAbbreviated } from '../../utils/helper';
  tag = isAbbreviated(tag) ? tag.toUpperCase() : capitalize(tag);
</script>

<svelte:head>
  <title>Tagged with {tag} &bull; IMB</title>
  <link rel="shortcut icon" type="image/png" href="images/favicon/blog.png" />
</svelte:head>

<header>
  <h1>{tag}</h1>
</header>

<article>
  {#each data as post, idx}
    <TagCard
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
    </TagCard>
  {/each}

</article>

<style>
  header {
    width: 75em;
    max-width: 92%;
    padding: calc(1.4vw + 0.5em) 0px;
    border: 2px solid var(--bg-inverse);
    border-radius: 0.15em;
    box-shadow: 5px 6px 0px var(--bg-inverse);
    margin: 1.5em auto;
  }
  header h1 {
    text-align: center;
  }

  article {
    display: grid;
    gap: 1em;
    grid-template-columns: 1fr;
    justify-content: center;
    width: 100%;
    max-width: 64em;
    padding: 0 1em;
    margin: 1em auto;
  }
</style>
