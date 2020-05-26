<script>
  export let post, segment, filename;
  import Icon from './independent/Icon.svelte';
  import Edit from './Edit.svelte';
  import TagBadge from './TagBadge.svelte';
</script>

<header>
  <h1>{post['title']}</h1>
  <small>
    <time datetime={post.date}>{post['pretty-date']}</time>
    <span>{post['read-time']} min read</span>
    <Edit {segment} {filename} />
  </small>
  <small>
    {#each post.tags as tag}
      <TagBadge {tag} />
    {/each}
  </small>
  <slot />
</header>

<style>
  header {
    width: 100%;
    max-width: 42em;
    padding: 0 0.75em;
    margin: 0 auto;
    word-wrap: break-word;
    font-family: 'Karla', sans-serif;
  }

  h1 {
    margin: 1em 0 0.5em;
  }
  small {
    display: flex;
    flex-wrap: wrap;
    font-size: 0.9rem;
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
  small > :global(:not(:last-child)) {
    margin-right: 0.5em;
  }

  @media only screen and (min-width: 600px) {
    header {
      font-size: 1.25rem;
    }
  }
</style>
