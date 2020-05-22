<script>
  export let href, className;
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
