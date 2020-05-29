<script>
  export let href;
</script>

<a rel="prefetch" {href}>
  <slot />
</a>

<style>
  a {
    padding: 0.5em 1em;
    border-radius: 4px;
    text-transform: uppercase;
    color: var(--fg-color);
    background-color: var(--bg-color);
    transition: 50ms;
  }
  a:hover,
  a:active {
    margin-left: 1em;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    transform: scale(1.1);
  }
</style>
