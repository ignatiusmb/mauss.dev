<script>
  export let base, prev, next;
  import Link from './complement/Link.svelte';
</script>

<aside>
  {#if prev}
    <Link href="{base}/{prev.slug}">&larr; {prev.title}</Link>
  {/if}
  {#if next}
    <Link href="{base}/{next.slug}">{next.title} &rarr;</Link>
  {/if}
</aside>

<style>
  aside {
    margin-top: 2em;
    display: grid;
  }
  aside :global(a) {
    width: 100%;
  }
  aside :global(a:last-child) {
    text-align: right;
  }
</style>
