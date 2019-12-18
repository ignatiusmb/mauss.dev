<script>
  import NavToggle from './buttons/NavToggle.svelte';
  import HubUser from './hub/UserContainer.svelte';
  import { navToggledStatus } from '../store.js';
  import { stores } from '@sapper/app';

  export let toggled;

  const { page } = stores();

  $: segment = $page.path.split('/').slice(1);
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
    justify-content: space-between;
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
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-right: 2em;
    background-color: var(--bg-color);
  }
  li {
    border-top: 1px solid var(--fg-color);
  }
  li:last-child {
    border-bottom: 1px solid var(--fg-color);
  }
  aside :global(a) {
    width: 100%;
    position: relative;
    padding: 0.7em 0.8em;
    color: var(--fg-color);
    text-transform: capitalize;
  }
</style>

<!-- markup (zero or more items) goes here -->
<aside class:toggled>
  <NavToggle>Close</NavToggle>

  <ul>
    {#if segment[0] === ''}
      <li>
        <a href="resume">resume</a>
      </li>
    {:else if segment[0] === 'blog'}
      <li>
        <a href="blog/notes">notes</a>
      </li>
      <li>
        <a href="blog/posts">posts</a>
      </li>
    {/if}
    <li>
      <a href="contact">contact</a>
    </li>
  </ul>

  <HubUser />
</aside>
