<script>
  export let href;
  export let label = null;
  export let className = null;
</script>

<a rel="noopener noreferrer" target="_blank" {href} aria-label={label} class={className}>
  <slot />
</a>

<style>
  a {
    cursor: pointer;
  }
</style>
