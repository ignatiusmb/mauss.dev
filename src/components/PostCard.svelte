<script>
  export let src, alt, href;
</script>

<section>
  <main>
    <div class="img-wrapper">
      <img {src} {alt} />
    </div>
    <slot name="main" />
  </main>
  <aside>
    <a rel="prefetch" {href}>read</a>
  </aside>
</section>

<style>
  section {
    position: relative;
    width: 100%;
    max-width: 24em;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    border-radius: 0.5em;
    box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12);
    margin: 1em;
    background-color: var(--bg-card-color);
  }
  main {
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
    background-color: #000;
    transition: opacity 15ms linear, background-color 15ms linear;
  }
  main:hover::before {
    opacity: 0.04;
  }
  .img-wrapper {
    position: relative;
    padding-top: 56.25%;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
    background-color: rgba(0, 0, 0, 0.15);
  }
  img {
    position: absolute;
    top: 0;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
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
