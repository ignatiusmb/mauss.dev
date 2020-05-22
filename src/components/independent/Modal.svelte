<script>
  export let show;
  import { fly } from 'svelte/transition';
</script>

{#if show}
  <div class="backdrop" on:click|self>
    <section transition:fly={{ duration: 250 }}>
      <slot />
    </section>
  </div>
{/if}

<style>
  div.backdrop {
    z-index: 3;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.8);
  }
  section {
    max-width: 50%;
    padding: 3.5em 2em 2.5em;
    border-radius: 0.5em;
    background: white;
    text-align: center;
  }
  section :global(aside) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2em;
    margin-top: 2em;
  }
</style>
