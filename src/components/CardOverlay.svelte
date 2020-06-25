<script>
  export let show;
  import { fade } from 'svelte/transition';
</script>

{#if show}
  <div transition:fade={{ duration: 200 }}>
    <slot />
  </div>
{/if}

<style>
  div {
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 1em 0.5em;
    border-radius: inherit;
    background-color: rgba(0, 0, 0, 0.7);
    color: #fff;
    text-align: center;
  }
</style>
