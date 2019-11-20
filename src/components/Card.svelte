<script>
  export let src, alt, href;
</script>

<style>
  section {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    border-radius: 0.5em;
    box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12);
    margin: 1em 0;
    background-color: var(--bg-card-color);
  }
  div {
    cursor: pointer;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
  }
  div:hover {
    background-color: var(--bg-toggle-active-color);
  }
  img {
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
    background-color: rgba(0, 0, 0, 0.15);
  }
  img::before {
    padding-top: 56.25%;
  }

  aside {
    min-height: 3em;
    display: flex;
    justify-content: flex-end;
    padding: 0.5em;
  }
  aside a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 0.5em;
    text-transform: uppercase;
    font-family: 'Roboto', sans-serif;
  }
  aside a:visited {
    color: var(--fg-color);
  }
</style>

<!-- markup (zero or more items) goes here -->
<section>
  <div>
    <img {src} {alt} />
    <slot name="main" />
  </div>
  <aside>
    <a rel="prefetch" {href}>read</a>
  </aside>
</section>
