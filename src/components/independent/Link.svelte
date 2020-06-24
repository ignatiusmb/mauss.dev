<script>
  export let href;
  export let invert = true;
  export let className = null;
</script>

<a rel="preload" {href} class={className} class:invert>
  <slot />
</a>

<style>
  a {
    cursor: pointer;
    color: inherit !important;
  }
  a.invert:hover {
    filter: invert() hue-rotate(180deg);
  }
</style>
