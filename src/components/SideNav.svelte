<script>
  import NavToggle from './buttons/NavToggle.svelte';
  import { navToggledStatus } from '../store.js';
  export let toggled;
</script>

<style>
  aside {
    z-index: 3;
    width: 10em;
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: var(--bg-color);
    transform: translateX(100%);
    transition: transform 200ms;
  }
  aside.toggled {
    box-shadow: 0 4px 3px rgba(0, 0, 0, 0.5);
    transform: translateX(0%);
  }
  aside :global(span) {
    align-self: flex-end;
    margin: 0.5em 1em;
  }

  ul,
  li {
    display: flex;
    padding: 0;
    margin: 0;
  }
  ul {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-right: 2em;
    background-color: var(--bg-color);
  }
  li {
    padding: 0.8em 0.6em;
    border-top: 1px solid var(--fg-color);
  }
  li:last-child {
    border-bottom: 1px solid var(--fg-color);
  }
  a {
    position: relative;
    padding: 0.1em 0.2em;
    color: var(--fg-color);
    text-transform: capitalize;
  }
</style>

<!-- markup (zero or more items) goes here -->
<aside class:toggled>
  <NavToggle>Close</NavToggle>
  <ul>
    <li>
      <a href="notes">notes</a>
    </li>
    <li>
      <a href="posts">posts</a>
    </li>
  </ul>
</aside>
