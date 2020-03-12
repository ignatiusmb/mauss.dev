<script>
  import ToggleTheme from './ToggleTheme.svelte';

  import { stores } from '@sapper/app';

  const { page } = stores();
  const pages = ['posts'];
  let scrolled;

  $: path = $page.path.split('/').slice(1);
  $: segment = pages.includes(path[0]) ? path[0] : 'home';
</script>

<svelte:window bind:scrollY={scrolled} />

<nav class:scrolled>
  <a class={segment === 'home' ? 'active' : ''} href="/">max</a>
  <a class={segment === 'posts' ? 'active' : ''} href="/posts">posts</a>

  <ToggleTheme />
</nav>

<style>
  nav {
    z-index: 2;
    position: sticky;
    top: 0;
    display: grid;
    gap: 1em;
    grid-template-columns: repeat(2, auto) 1fr;
    align-items: center;
    padding: 0.8em 1em;
    background-color: var(--bg-color);
  }
  nav.scrolled {
    box-shadow: 0 4px 3px rgba(0, 0, 0, 0.5);
    transition: box-shadow 200ms;
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
    transition: width 200ms ease;
    transform: translateY(100%);
  }
  a:active::after,
  .active::after {
    width: 100%;
    background-color: maroon;
  }
  a:hover::after,
  a:focus::after,
  a:active::after {
    left: 0;
    right: auto;
    width: 100%;
  }
  a:visited {
    color: inherit;
  }

  a:first-child {
    text-transform: uppercase;
  }
</style>
