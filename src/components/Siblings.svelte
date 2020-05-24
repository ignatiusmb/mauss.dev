<script>
  export let base, prev, next;
</script>

<aside>
  {#if prev}
    <a rel="prefetch" href="{base}/{prev.slug}" style="text-align: left">
      <strong>&larr; Prev</strong>
      <p>{prev.title}</p>
    </a>
  {/if}
  {#if next}
    <a rel="prefetch" href="{base}/{next.slug}" style="text-align: right">
      <strong>Next &rarr;</strong>
      <p>{next.title}</p>
    </a>
  {/if}
</aside>

<style>
  aside {
    margin-top: 2em;
    display: grid;
    grid-template-columns: 1fr;
    border-radius: 0.5em;
    border: 0.1em solid black;
  }
  a {
    display: grid;
    grid-template-rows: auto 1fr;
    color: inherit;
  }
  a:nth-child(2) {
    border-top: 0.1em solid black;
  }
  a:only-child {
    grid-column: 1 / -1;
  }
  a strong,
  a p {
    padding: 0.2em 0.8em;
    margin: 0;
  }
  strong {
    border-bottom: 0.1em solid black;
  }

  @media only screen and (min-width: 600px) {
    aside {
      grid-template-columns: 1fr 1fr;
    }
    a:nth-child(2) {
      border-top: none;
      border-left: 0.1em solid black;
    }
  }
</style>
