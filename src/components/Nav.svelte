<script>
  import ToggleTheme from './ToggleTheme.svelte';
  import NavSidebar from './NavSidebar.svelte';
  import NavToggle from './buttons/NavToggle.svelte';

  import { stores } from '@sapper/app';
  import { navToggledStatus } from '../store.js';

  const { page } = stores();
  const pages = ['blog'];
  let scrolled;

  $: toggled = $navToggledStatus;
  $: path = $page.path.split('/').slice(1);
  $: segment = pages.includes(path[0]) ? path[0] : 'home';
</script>

<svelte:window bind:scrollY={scrolled} />

<nav class:scrolled>
  <main>
    <a class={segment === 'home' ? 'active' : ''} href="/">max</a>
    <a class={segment === 'blog' ? 'active' : ''} href="/blog">blog</a>

    <ToggleTheme />
    <NavToggle>Menu</NavToggle>
  </main>
</nav>
<NavSidebar {toggled} />

<style>
  nav {
    z-index: 2;
    position: sticky;
    top: 0;
    display: flex;
    padding: 0 0.5em;
    background-color: var(--bg-color);
  }
  nav.scrolled {
    box-shadow: 0 4px 3px rgba(0, 0, 0, 0.5);
    transition: box-shadow 200ms;
  }

  main {
    position: sticky;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.8em 0.6em;
  }
  main a:first-child {
    margin-right: 0.5em;
    text-transform: uppercase;
  }
  main a:not(:first-child) {
    margin-left: 0.5em;
  }
  main > :global(span) {
    margin-left: 1em;
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
</style>
