<script>
  export let post = null;
  export let segment = null;
  export let filename = null;
  export let showEdit = false;
  export let siblings = null;
  import PostHeader from '../components/PostHeader.svelte';
  import LinkExt from '../components/independent/LinkExt.svelte';
  import Edit from '../components/Edit.svelte';
  import Siblings from '../components/Siblings.svelte';

  import { afterUpdate } from 'svelte';
  afterUpdate(() => Aqua.tsunami());
</script>

<article>
  <PostHeader {post} {segment} {filename} />

  <slot />

  {#if showEdit}
    <section>
      <p>Find an issue with this post? Have something to add, update, or clarify? All my posts here are editable.</p>
      <p>
        Just create a new
        <LinkExt href="https://github.com/ignatiusmb/mauss/issues">Issue</LinkExt>
        or
        <LinkExt href="https://github.com/ignatiusmb/mauss/pulls">PR</LinkExt>
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
    max-width: 53rem;
    padding: 0 1rem;
    margin: 0 auto;
    word-wrap: break-word;
    line-height: 1.5;
  }
  article :global(section) {
    font-size: clamp(1rem, 2vw, 1.15rem);
  }
  article > :global(section:first-of-type) {
    margin-top: 4em;
  }
  section {
    margin-top: 2em;
    padding: 0.4em 0.8em;
    border-left: 2px solid crimson;
    background-color: rgba(0, 0, 0, 0.05);
  }
  article :global(section > :first-child) {
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
  article :global(h2),
  article :global(h3) {
    font-family: 'Karla', sans-serif;
  }
  article :global(h2) {
    margin-top: 1.5em;
    font-size: clamp(1.5rem, 4vw, 2rem);
    font-weight: bold;
  }
  article :global(h2 + h3) {
    margin-top: 0.5em;
  }
  article :global(h3) {
    margin: 1em 0 -0.25em;
    font-size: clamp(1.2rem, 4vw, 1.5rem);
    font-weight: bold;
  }
  article :global(ol + h3),
  article :global(ul + h3) {
    margin-top: 1.25em;
  }
  article :global(ol),
  article :global(ul) {
    padding: 0;
    margin: 0;
    margin-top: 0.75em;
    margin-bottom: -0.5em;
  }
  article :global(ol li:not(:only-child):last-child),
  article :global(ul li:not(:only-child):last-child) {
    margin-bottom: 1em;
  }
  article :global(li) {
    margin-left: 1em;
  }
  article :global(blockquote) {
    text-align: center;
    font-style: italic;
    font-size: clamp(1.5rem, 3vw, 2rem);
    line-height: clamp(2rem, 3vw, 3rem);
    margin: clamp(0.5em, 3vw, 1.5rem);
  }
  article :global(blockquote li) {
    margin-left: unset;
  }
  article :global(.info-box) {
    font-size: 1rem;
  }
</style>
