<script>
  export let href;
  export let className = null;
</script>

<a rel="noopener noreferrer" target="_blank" {href} class={className}>
  <slot />
</a>

<style>
  a {
    color: inherit;
  }
  a:hover {
    filter: invert() hue-rotate(180deg);
  }
</style>
