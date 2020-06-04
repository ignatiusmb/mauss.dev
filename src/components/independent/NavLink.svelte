<script>
  export let segment, current;
  $: isCurrent = current => (segment === current ? 'page' : undefined);
</script>

<a rel="prefetch" aria-current={isCurrent(current)} href="/{current ? current : ''}">
  <slot />
</a>

<style>
  [aria-current]::after {
    width: 100%;
    background-color: #990000;
  }

  a {
    position: relative;
    padding: 0.1em 0.2em;
    color: var(--fg-color);
    text-transform: capitalize;
  }
  a:hover,
  a:focus {
    color: var(--fg-color);
  }
  a::after {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    width: 0;
    height: 0.25em;
    border-radius: 0.8em;
    background-color: crimson;
    transition: width var(--transition-duration) ease;
    transform: translateY(100%);
  }
  a:hover::after,
  a:focus::after {
    left: 0;
    right: auto;
    width: 100%;
  }
  a:visited {
    color: inherit;
  }
</style>
