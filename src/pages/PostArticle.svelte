<script>
  export let segment, filename;
  export let showEdit = false;
  export let siblings = null;
  import Edit from '../components/Edit.svelte';
  import Siblings from '../components/siblings.svelte';

  import { afterUpdate } from 'svelte';
  afterUpdate(() => Aqua.tsunami());
</script>

<svelte:head>
  <link rel="shortcut icon" type="image/png" href="images/favicon/blog.png" />
</svelte:head>

<article>
  <slot />

  {#if showEdit}
    <section>
      <p>Find an issue with this post? Have something to add, update, or clarify? All my posts here are editable.</p>
      <p>
        Just create a new
        <strong>Issue</strong>
        or
        <strong>PR</strong>
        on GitHub, any fix or addition is much appreciated!
        <Edit {segment} {filename} />
      </p>
    </section>
  {/if}

  {#if siblings}
    <Siblings {...siblings} />
  {/if}
</article>

<style>
  article {
    width: 100%;
    max-width: 42em;
    padding: 0 0.75em;
    margin: 3em auto 0;
    word-wrap: break-word;
    line-height: 1.5;
    font-family: 'Crimson Pro', Georgia, 'Times New Roman', Times, serif;
    font-size: 1.3rem;
  }
  section {
    margin-top: 2em;
    padding: 0.4em 0.8em;
    border-left: 2px solid crimson;
    background-color: rgba(0, 0, 0, 0.05);
  }
  section > p:first-child {
    margin: 0;
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
