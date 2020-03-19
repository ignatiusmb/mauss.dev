<script>
  export let href, className;
</script>

<a rel="preload" class={className} {href}>
  <slot />
</a>

<style>
  a {
    color: royalblue;
    background: linear-gradient(to right, midnightblue, midnightblue 50%, royalblue 50%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: 200% 100%;
    background-position: 100%;
    transition: background-position 275ms ease;
  }
  a:hover {
    background-position: 0 100%;
  }
</style>
