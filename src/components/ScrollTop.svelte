<script>
  import { onMount } from 'svelte';
  let y, mounted;
  onMount(() => (mounted = true));
  $: height = mounted ? document.body.scrollHeight / 3 : y;
  $: show = y > height;
</script>

<svelte:window bind:scrollY={y} />
<span class:show on:click={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}>
  <i class="fas fa-angle-double-up" />
</span>

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
    transform: translateY(100%);
    transition: transform var(--transition-duration);
  }
  span.show {
    transform: translateY(-40%);
  }
  span:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
</style>
