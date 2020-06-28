<script>
  export let href;
  export let inherit = true;
  export let invert = true;
</script>

<a rel="preload" {href} class:inherit class:invert>
  <slot />
</a>

<style>
  a {
    cursor: pointer;
  }
  a.inherit {
    color: inherit !important;
  }
  a.invert:hover {
    filter: invert() hue-rotate(180deg);
  }
</style>
