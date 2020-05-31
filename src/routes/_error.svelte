<script>
  export let status, error;

  const dev = process.env.NODE_ENV === 'development';
</script>

<svelte:head>
  <title>{status}</title>
</svelte:head>

<article>
  <section>
    <h1>{status}</h1>
    <p>{error.message}</p>
  </section>

  {#if dev && error.stack}
    <section>
      <pre>{error.stack}</pre>
    </section>
  {/if}
</article>

<style>
  section {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  h1 {
    font-size: 5em;
  }

  p {
    font-size: 2em;
  }
</style>
