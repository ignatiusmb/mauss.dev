<script>
  export let href;
  export let className = null;
</script>

<a rel="preload" class={className} {href}>
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
