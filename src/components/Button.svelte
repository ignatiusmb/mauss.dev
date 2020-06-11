<script>
  export let href;
  import Link from './independent/Link.svelte';
</script>

<span>
  <Link {href}>
    <slot />
  </Link>
</span>

<style>
  span {
    display: inline-flex;
    border-radius: 4px;
    text-transform: uppercase;
    color: var(--fg-color);
    background-color: var(--bg-color);
    transition: 50ms;
  }
  span:hover,
  span:active {
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    transform: scale(1.05);
  }
  span :global(a) {
    padding: 0.5em 1em;
  }
  span :global(a:hover) {
    filter: none;
  }
</style>
