<script>
  import { onMount } from 'svelte';

  let y, hide, height;
  onMount(() => (height = window.innerHeight));

  $: {
    if (y > height / 3) hide = false;
    else hide = true;
  }
</script>

<style>
  span {
    cursor: pointer;
    position: fixed;
    z-index: 9;
    bottom: 0;
    right: 0.4em;
    width: 1.5em;
    height: 1.5em;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 1.5em;
    color: var(--aqua-primary);
    background-color: rgba(0, 0, 0, 0.25);
    transform: translateY(-40%);
    transition: transform 200ms;
  }
  span.hide {
    transform: translateY(100%);
  }
  span:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
</style>

<!-- markup (zero or more items) goes here -->
<svelte:window bind:scrollY={y} />
<span class:hide on:click={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}>
  <i class="fas fa-angle-double-up" />
</span>
