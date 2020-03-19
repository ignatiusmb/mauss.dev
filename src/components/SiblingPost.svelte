<script>
  export let base, prev, next;
  import Link from './Link.svelte';
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
  aside :global(a:last-child) {
    justify-self: end;
  }
</style>
