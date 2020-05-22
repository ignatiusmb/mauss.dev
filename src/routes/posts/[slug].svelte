<script context="module">
  export async function preload(page, session) {
    const { slug } = page.params;
    const list = await this.fetch('posts.json').then(r => r.json());
    const post = await this.fetch(`posts/${slug}.json`).then(r => r.json());

    for (let i = 0; i < list.length; i++) {
      if (list[i].slug !== post.slug) continue;
      post['siblings'] = {};
      post.siblings.base = 'posts';
      const [prev, next] = [list[i - 1], list[i + 1]];
      post.siblings.prev = prev ? { slug: prev.slug, title: prev.title } : null;
      post.siblings.next = next ? { slug: next.slug, title: next.title } : null;
      break;
    }
    return { post };
  }
</script>

<script>
  export let post;
  import Icon from '../../components/independent/Icon.svelte';
  import Header from '../../components/Header.svelte';
  import Sibling from '../../components/SiblingPost.svelte';
  import Tag from '../../components/Tag.svelte';

  import { afterUpdate } from 'svelte';
  import { stores } from '@sapper/app';
  const { preloading, page, session } = stores();
  const [, segment] = $page.path.split('/');
  afterUpdate(() => Aqua.tsunami());
</script>

<svelte:head>
  <title>{post.title} &bull; Posts | IMB</title>
  {#if post.description}
    <meta name="description" content={post.description} />
  {/if}
  <link rel="shortcut icon" type="image/png" href="images/favicon/blog.png" />
</svelte:head>

<Header {post} segment="content/{segment}" />

<article>
  <section>
    {@html post.content}
  </section>

  <Sibling {...post.siblings} />
</article>

<style>
  article {
    width: 100%;
    max-width: 42em;
    padding: 0 0.75em;
    margin: 0 auto;
    word-wrap: break-word;
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
    border: 0.5em solid var(--bg-color-secondary);
    border-radius: 0.1em;
  }
  article :global(img[src^="https://"]) {
    padding: 0.5em;
    border: none;
  }
  article :global(h2) {
    margin-top: 2em;
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
    margin-top: 0.75em;
  }
  article :global(li) {
    margin-left: 1em;
  }
  article :global(blockquote li) {
    margin-left: unset;
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
