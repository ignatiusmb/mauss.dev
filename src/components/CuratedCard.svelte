<script>
  export let post;
  import Button from './Button.svelte';
</script>

<aside>
  <small>{post.title}</small>
  <Button href="curated/{post.slug}">read</Button>
</aside>

<style>
  aside {
    min-height: 3em;
    display: flex;
    align-items: center;
    padding: 0.5em;
  }
  aside small {
    margin-right: 0.5rem;
  }
  aside small:first-child {
    margin-left: 0.5rem;
  }
  aside :global(:last-child) {
    margin-left: auto;
  }
</style>
