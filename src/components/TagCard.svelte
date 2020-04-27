<script>
  export let src, alt, date, read, href, time;

  import { fly } from 'svelte/transition';
</script>

<section in:fly={{ x: -200, duration: time }} out:fly={{ x: 200, duration: 300 }}>
  <p>{alt}</p>
  <aside>
    <small>{date.split(',')[1].trim()}</small>
    <small>&bull;</small>
    <small>{read} min read</small>
    <a rel="prefetch" {href}>read</a>
  </aside>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    padding: 0.5em 1em;
    border-radius: 0.25em;
    box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12);
    background-color: var(--bg-color-secondary);
  }
  p {
    flex: 1;
    padding: 0.5em 0;
  }
  aside {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  aside > * {
    margin-left: 0.5em;
  }
  a {
    padding: 0.5em 1em;
    border-radius: 4px;
    text-transform: uppercase;
    font-family: 'Roboto', sans-serif;
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
  a:visited {
    color: var(--fg-color);
  }

  @media only screen and (min-width: 600px) {
    section {
      place-items: center;
      flex-direction: unset;
    }
    p {
      padding: 0;
    }
  }
</style>
