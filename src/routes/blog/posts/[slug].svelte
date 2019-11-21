<script context="module">
  export async function preload(page, session) {
    const { slug } = page.params;

    const res = await this.fetch(`blog/posts/${slug}.json`);
    const post = await res.json();

    if (res.status === 200) return { post };
    else this.error(res.status, post.message);
  }
</script>

<script>
  import { capitalize } from '../../_helper';

  import { onMount } from 'svelte';

  export let post;

  onMount(async () => {
    const Aqua = await import('@ignatiusmb/aqua');
    Aqua.code.init();
    Aqua.form.init();
    Aqua.modal.init();
    Aqua.code.highlight();
  });
</script>

<style>
  header,
  article {
    width: 100%;
    max-width: 48em;
    padding: 0 1em;
    margin: 0 auto;
  }

  aside {
    display: flex;
    align-items: center;
    padding: 1em;
    border-radius: 0.5em;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    margin: 0 1em 6em;
    background-color: var(--bg-color);

    font-family: 'Roboto', sans-serif;
  }
  aside .author-detail {
    letter-spacing: 0.003125em;
  }
  aside .author-image img {
    max-width: 5em;
    border-radius: 50%;
    margin-right: 1em;
  }

  article {
    margin-top: 3em;
    font-family: 'Crimson Pro', Georgia, 'Times New Roman', Times, serif;
    font-size: 1.3rem;
  }
  article > section:not(:first-child) {
    margin-top: 2em;
  }
  article :global(img) {
    border-radius: 0.2em;
  }
  article :global(h2) {
    margin-top: 1em;
  }
  article :global(h3) {
    margin: 0.5em 0;
    font-family: 'Nunito Sans', sans-serif;
    font-weight: bolder;
    font-size: 1.5rem;
  }
  article :global(ol, ul) {
    padding: 0;
    margin: 0;
  }
  article :global(li) {
    margin-left: 1em;
  }
  article :global(.info-box) {
    font-size: 1rem;
  }

  @media only screen and (min-width: 600px) {
    header,
    article {
      font-size: 1.25rem;
    }
  }
</style>

<svelte:head>
  <title>Max's Blog &bull; {capitalize(post.metadata.category)} &rarr; {post.metadata.title}</title>
  {#if post.metadata.description}
    <meta name="description" content={post.metadata.description} />
  {/if}
  <link rel="stylesheet" href="css/blog.css" />
</svelte:head>

<header>
  <main>
    <h1>{post.metadata.title}</h1>
    <small>
      <span>{post.metadata['pretty-date']}</span>
      <span>{capitalize(post.metadata.category)}</span>
    </small>
  </main>
  <aside>
    <div class="author-image">
      <img src="images/avatar.jpg" alt="" />
    </div>
    <div class="author-detail">Ignatius Bagussuputra</div>
  </aside>
</header>

<article>
  {#if post.body.description}
    <section>
      {@html post.body.description}
    </section>
    <section>
      {@html post.body.content}
    </section>
  {:else}
    {@html post.body.content}
  {/if}
</article>
