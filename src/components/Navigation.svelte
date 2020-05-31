<script>
  export let segment;
  import ToggleTheme from './independent/ToggleTheme.svelte';

  let scrolled, innerWidth;
  $: scrolled = innerWidth < 600 ? true : scrolled;
</script>

<svelte:window bind:scrollY={scrolled} bind:innerWidth />

<nav class:scrolled>
  <a rel="prefetch" aria-current={segment === undefined ? 'page' : undefined} href="/">max</a>
  <a rel="prefetch" aria-current={segment === 'about' ? 'page' : undefined} href="/about">about</a>
  <a rel="prefetch" aria-current={segment === 'posts' ? 'page' : undefined} href="/posts">posts</a>
  <a rel="prefetch" aria-current={segment === 'uses' ? 'page' : undefined} href="/uses">uses</a>

  <ToggleTheme />
</nav>

<style>
  nav {
    z-index: 3;
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
    box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.5);
    transition: var(--transition-duration) var(--transition-function);
  }
  nav :global(:last-child) {
    margin-right: auto;
  }

  [aria-current]::after {
    width: 100%;
    background-color: #990000;
  }
  nav a {
    position: relative;
    padding: 0.1em 0.2em;
    color: var(--fg-color);
    text-transform: capitalize;
  }
  nav a:hover,
  nav a:focus {
    color: var(--fg-color);
  }
  nav a::after {
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
  nav a:hover::after,
  nav a:focus::after {
    left: 0;
    right: auto;
    width: 100%;
  }
  nav a:visited {
    color: inherit;
  }
  nav a:first-of-type {
    text-transform: uppercase;
  }
  nav a:not(:first-of-type) {
    margin-right: 0.5em;
  }

  @media only screen and (min-width: 600px) {
    nav {
      position: sticky;
      top: 0;
      flex-direction: row;
    }
    nav.scrolled {
      box-shadow: 0 4px 3px rgba(0, 0, 0, 0.5);
    }
    nav :global(:last-child) {
      margin-left: auto;
      margin-right: unset;
    }
    nav a:not(:first-of-type) {
      margin-right: unset;
      margin-left: 0.5em;
    }
  }
</style>
