<script>
  export let href, className;
</script>

<a rel="preload" class={className} {href}>
  <slot />
</a>

<style>
  a {
    color: #81a5f8;
  }
  a:hover {
    color: #477cf4;
  }
</style>
