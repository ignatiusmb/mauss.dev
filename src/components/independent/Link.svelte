<script>
  export let href;
  export let className = null;
</script>

<a rel="preload" class={className} {href}>
  <slot />
</a>

<style>
  a {
    cursor: pointer;
    color: inherit !important;
  }
  a:hover {
    filter: invert() hue-rotate(180deg);
  }
</style>
