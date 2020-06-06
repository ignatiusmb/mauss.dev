<script>
  export let segment;
  import NavLink from './independent/NavLink.svelte';
  import ToggleTheme from './independent/ToggleTheme.svelte';

  let scrolled, innerWidth;
  $: scrolled = innerWidth < 600 ? true : scrolled;
</script>

<svelte:window bind:scrollY={scrolled} bind:innerWidth />

<nav class:scrolled>
  <NavLink {segment} current={undefined}>max</NavLink>
  <NavLink {segment} current={'about'}>about</NavLink>
  <NavLink {segment} current={'posts'}>posts</NavLink>
  <NavLink {segment} current={'uses'}>uses</NavLink>

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
  nav :global(a:first-of-type) {
    text-transform: uppercase;
  }
  nav :global(a:not(:first-of-type)) {
    margin-right: 0.5em;
  }
  :global(html.dark) nav :global(a),
  :global(html.dark) nav :global(a:focus),
  :global(html.dark) nav :global(a:hover) {
    color: var(--fg-color);
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
    nav :global(a:not(:first-of-type)) {
      margin-right: unset;
      margin-left: 0.5em;
    }
  }
</style>
