<script>
  export let post;
  import Spoilers from './SpoilerSection.svelte';
</script>

<section>
  <h2>{post.title}</h2>
</section>

<section>
  {@html post.content}
</section>

{#if post.spoilers}
  <Spoilers />

  <section>
    {@html post.spoilers}
  </section>
{/if}

<style>
  section h2 {
    margin: 1em 0 2em;
    text-align: center;
    font-weight: normal;
  }
</style>
