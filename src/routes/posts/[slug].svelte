<script context="module">
  export async function preload(page, session) {
    const { slug } = page.params;

    const res = await this.fetch(`posts/${slug}.json`);
    const post = await res.json();

    if (res.status === 200) return { post };
    else this.error(res.status, post.message);
  }
</script>

<script>
  export let post;

  import { onMount } from 'svelte';

  onMount(async () => {
    const Aqua = await import('@ignatiusmb/aqua');
    Aqua.code.init();
    Aqua.form.init();
    Aqua.modal.init();
    Aqua.code.highlight();
  });
</script>

<svelte:head>
  <title>{post.title} &bull; Posts | IMB</title>
  {#if post.description}
    <meta name="description" content={post.description} />
  {/if}
  <link rel="shortcut icon" type="image/png" href="images/favicon/blog.png" />
  <link rel="stylesheet" href="css/blog.css" />
</svelte:head>

<header>
  <main>
    <h1>{post['title']}</h1>
    <small>
      <div>
        <span>{post['pretty-date']}</span>
        <span>&bull;</span>
        <span>{post['read-time']} min read</span>
      </div>
      <div class="tags">
        {#each post['tags'] as tag}
          <a href="tag/{tag}">#{tag}</a>
        {/each}
      </div>
    </small>
  </main>
</header>

<article>
  <section>
    {@html post.content}
  </section>
</article>

<style>
  header,
  article {
    width: 100%;
    max-width: 42em;
    padding: 0 0.75em;
    margin: 0 auto;
  }

  header h1 {
    margin: 1em 0 0.5em;
  }
  header small {
    display: flex;
    flex-direction: column;
    font-family: 'Karla';
  }
  header .tags {
    display: flex;
    margin-top: 0.5em;
  }
  header .tags a {
    padding: 0.2em 0.4em;
    border-radius: 0.2em;
    font-size: 0.9rem;
    font-weight: bold;
    background: #d6d9e0;
    color: #606570;
  }
  header .tags a:not(:last-child) {
    margin-right: 1em;
  }

  article {
    margin-top: 3em;
    line-height: 1.5;
    font-family: 'Crimson Pro', Georgia, 'Times New Roman', Times, serif;
    font-size: 1.3rem;
  }
  article > section:not(:first-child) {
    margin-top: 2em;
  }
  article :global(.aqua-code-box) {
    line-height: unset;
  }
  article :global(p) {
    margin-top: 0.75em;
  }
  article :global(img) {
    margin: auto;
    border-radius: 0.1em;
  }
  article :global(h2) {
    margin-top: 1em;
    font-weight: bold;
  }
  article :global(h3) {
    margin: 0.5em 0;
    font-size: 1.5rem;
    font-weight: bold;
  }
  article :global(ol, ul) {
    padding: 0;
    margin: 0;
    margin-top: 1em;
  }
  article :global(li) {
    margin-left: 1em;
  }
  article :global(.info-box) {
    font-size: 1rem;
  }
  article :global(blockquote) {
    text-align: center;
    font-style: italic;
    font-size: 1.5rem;
    line-height: 2rem;
    margin: 0.5em;
  }

  @media only screen and (min-width: 600px) {
    header,
    article {
      font-size: 1.25rem;
    }

    article :global(blockquote) {
      font-size: 2rem;
      line-height: 3rem;
      margin: 1.5em;
    }
  }
</style>
