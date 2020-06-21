<script>
  export let spoilers;
  import { fly } from 'svelte/transition';
  let show = false;
</script>

<section class="info-box note">
  <p>Be sure to come back and check out the spoilers section below when you're done.</p>
</section>

<section class="info-box important" on:click={() => (show = !show)} style="cursor: pointer">
  {#if !show}
    <h2>CLICK TO REVEAL SPOILERS</h2>
    <p>
      Clicking this card will reveal the another section below which will contain major spoilers as we will be breaking
      down most parts of the story as well as the ending, and dicussing any related theories to it, please proceed with
      caution.
    </p>
  {:else}
    <h2>CLICK TO HIDE SPOILERS</h2>
  {/if}
</section>

{#if show}
  <section class="spoilers" in:fly={{ x: -150 }} out:fly={{ x: 150 }}>
    {@html spoilers}
  </section>
{/if}

<style>
  section.spoilers {
    padding: 0.5em 1em;
    border: 0.25em dashed rgba(226, 177, 0, 1);
    border-radius: 0.5em;
    margin-left: -5px;
  }
</style>
