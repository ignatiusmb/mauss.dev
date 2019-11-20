<script>
  import ToggleTheme from './ToggleTheme.svelte';

  export let segment;

  let scrolled, active, toggled;
  function expand() {
    toggled = !toggled;
  }
</script>

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

  ul,
  li {
    display: flex;
    padding: 0;
    margin: 0;
  }
  li {
    padding: 0.8em 0.6em;
  }

  aside {
    position: sticky;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.8em 0.6em;
  }
  aside a:first-child {
    margin-right: 0.5em;
    text-transform: uppercase;
  }
  aside a:not(:first-child) {
    margin-left: 0.5em;
  }
  aside span {
    cursor: pointer;
    margin-left: 1em;
    font-size: 140%;
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

  main {
    position: absolute;
    top: 100%;
    right: 0;
    transform: translateX(100%);
    transition: transform 200ms;
  }
  main ul {
    display: flex;
    flex-direction: column;
    padding-right: 2em;
    background-color: var(--bg-color);
  }
  main.toggled {
    box-shadow: 0 4px 3px rgba(0, 0, 0, 0.5);
    transform: translateX(0%);
  }
</style>

<svelte:window bind:scrollY={scrolled} />

<nav class:scrolled={scrolled || (!scrolled && active)}>
  <aside>
    <a href="https://imbagus.com">max</a>
    <a class="active" href="/">blog</a>
    <ToggleTheme />
    <span on:click={expand}>
      <i class="fas fa-bars" />
    </span>
  </aside>
  <main class:toggled>
    <ul>
      <li>
        <a class={segment === 'notes' ? 'active' : ''} href="notes">notes</a>
      </li>
      <li>
        <a class={segment === 'posts' ? 'active' : ''} href="posts">posts</a>
      </li>
    </ul>
  </main>
</nav>
