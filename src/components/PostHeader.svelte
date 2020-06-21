<script>
  export let segment = null;
  export let filename = null;
  export let post;
  import Edit from './Edit.svelte';
  import { lastWords } from '../utils/helper';
</script>

<header>
  <h1>{post['title']}</h1>
  <small>
    {#if post.date}
      <span>
        <time datetime={post.date}>{post['pretty-date']}</time>
      </span>
    {/if}
    {#if post.updated && post.updated !== post.date}
      <span>
        <time datetime={post.updated}>Updated {lastWords(2, post['pretty-updated'])}</time>
      </span>
    {/if}
    <span>{post['read-time']} min read</span>
    {#if segment && filename}
      <Edit {segment} {filename} />
    {/if}
  </small>

  <slot />
</header>

<style>
  header {
    display: flex;
    flex-direction: column;
    word-wrap: break-word;
    line-height: 1;
    font-family: var(--aqua-heading);
  }

  h1 {
    margin: 1em 0 0.5em;
    font-size: clamp(1.75rem, 4vw, 2.5rem);
  }
  small {
    display: flex;
    flex-wrap: wrap;
    font-size: clamp(0.9rem, 2vw, 1.1rem);
  }
  header :global(small:not(:first-of-type)) {
    margin-top: 0.5em;
  }
  small:first-of-type :not(:last-child)::after {
    content: '~';
    margin-left: 0.5em;
    color: crimson;
    font-weight: bolder;
  }
  small > :global(span) {
    margin-bottom: 0.25em;
  }
</style>
