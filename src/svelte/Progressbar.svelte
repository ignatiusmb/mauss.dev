<script>
  import { onMount } from 'svelte';
  let y, innerHeight, mounted;
  onMount(() => (mounted = true));
  $: progress = (y / ((mounted ? document.body.scrollHeight : y) - innerHeight)) * 100;
</script>

<svelte:window bind:scrollY={y} bind:innerHeight />
<div style="width:{progress > 99.5 ? 100 : progress}%" />

<style>
  div {
    z-index: 3;
    height: 0.25em;
    position: fixed;
    top: 0;
    background-color: var(--mauss-primary);
  }
</style>
