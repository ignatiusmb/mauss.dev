<script>
  export let src, alt, date, read, href, time;

  import { fly } from 'svelte/transition';
</script>

<section in:fly={{ x: -200, duration: time }} out:fly={{ x: 200, duration: 300 }}>
  <main>
    <div class="img-wrapper">
      <img {src} {alt} />
    </div>
    <slot name="main" />
  </main>
  <aside>
    <small>{date.split(',')[1].trim()}</small>
    <small>&bull;</small>
    <small>{read} min read</small>
    <a rel="prefetch" {href}>read</a>
  </aside>
</section>

<style>
  section {
    display: grid;
    grid-template-rows: 6fr 3em;
    width: 100%;
    border-radius: 0.25em;
    box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12);
    background-color: var(--bg-color-secondary);
  }
  main {
    display: grid;
    grid-template-rows: 14.4em 1fr;
    cursor: pointer;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
    transform: translate(0%);
  }
  main::before {
    content: '';
    opacity: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    background-color: var(--bg-inverse);
    transition: opacity 15ms linear, background-color 15ms linear;
  }
  main:hover::before {
    opacity: 0.04;
  }
  .img-wrapper {
    position: relative;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
    background-color: rgba(0, 0, 0, 0.15);
  }
  img {
    width: 100%;
    height: 100%;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  aside {
    min-height: 3em;
    display: flex;
    align-items: center;
    padding: 0.5em;
  }
  aside small {
    margin-left: 0.5em;
  }
  aside a {
    padding: 0.5em 1em;
    border-radius: 4px;
    margin-left: auto;
    text-transform: uppercase;
    font-family: 'Roboto', sans-serif;
    color: var(--fg-color);
    background-color: var(--bg-color);
    transition: 50ms;
  }
  aside a:hover,
  aside a:active {
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    transform: scale(1.1);
  }
  aside a:visited {
    color: var(--fg-color);
  }
</style>
