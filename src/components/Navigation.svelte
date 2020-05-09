<script>
  export let segment;
  import ToggleTheme from './ToggleTheme.svelte';

  let scrolled;
</script>

<svelte:window bind:scrollY={scrolled} />

<nav class:scrolled>
  <a rel="prefetch" aria-current={segment === undefined ? 'page' : undefined} href="/">max</a>
  <a rel="prefetch" aria-current={segment === 'posts' ? 'page' : undefined} href="/posts">posts</a>

  <ToggleTheme />
</nav>

<style>
  nav {
    z-index: 2;
    width: 100%;
    position: fixed;
    bottom: 0;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    padding: 0.8em 1em;
    font-family: 'Karla', sans-serif;
    background-color: var(--bg-color);
    transition: var(--transition-duration) var(--transition-function);
  }
  nav.scrolled {
    box-shadow: 0 4px 3px rgba(0, 0, 0, 0.5);
    transition: var(--transition-duration) var(--transition-function);
  }
  nav :global(:last-child) {
    margin-right: auto;
  }

  [aria-current]::after {
    width: 100%;
    background-color: maroon;
  }
  a {
    position: relative;
    padding: 0.1em 0.2em;
    color: var(--fg-color);
    text-transform: capitalize;
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
  a:first-of-type {
    text-transform: uppercase;
  }
  a:not(:first-of-type) {
    margin-right: 0.5em;
  }

  @media only screen and (min-width: 600px) {
    nav {
      position: sticky;
      top: 0;
      flex-direction: row;
    }
    nav :global(:last-child) {
      margin-left: auto;
      margin-right: unset;
    }
    a:not(:first-of-type) {
      margin-right: unset;
      margin-left: 0.5em;
    }
  }
</style>
