<script>
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';

  let mounted = false;
  onMount(() => {
    mounted = true;
  });
</script>

{#if mounted}
  <main in:fly={{ x: -200, duration: 300 }} out:fly={{ x: 200, duration: 300 }}>
    <slot />
  </main>
{/if}
