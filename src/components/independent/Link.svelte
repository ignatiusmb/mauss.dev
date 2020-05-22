<script>
  export let href, className;
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
