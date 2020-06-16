<script>
  import MetaHead from '../components/MetaHead.svelte';
  let innerWidth;
</script>

<svelte:window bind:innerWidth />

<MetaHead
  title="Ignatius Bagussuputra"
  description="Mauss. Personal website of Ignatius Bagussuputra. A Computer Science undergraduate from University of
  Indonesia." />

<header>
  <h1>ignatiusmb</h1>
  {#if innerWidth < 600}
    <h3 style="text-align: center">Navigation for mobile is placed at the bottom</h3>
  {/if}
</header>

<style>
  header {
    padding-bottom: 3em;
  }
  h1 {
    margin: 1.5em 0 1em;
    text-align: center;
    text-transform: uppercase;
    font-size: 2.5rem;
    font-family: var(--aqua-monospace);
    font-weight: bold;
    letter-spacing: 3vw;
    text-indent: 3vw;
  }

  @media only screen and (min-width: 600px) {
    h1 {
      font-size: 3rem;
    }
  }
</style>
