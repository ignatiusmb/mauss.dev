<script>
  export let status;
  export let error;

  const dev = process.env.NODE_ENV === "development";
</script>

<style>
  section {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  h1 {
    font-size: 5em;
  }

  p {
    font-size: 2em;
  }
</style>

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
