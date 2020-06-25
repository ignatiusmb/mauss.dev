<script>
  export let seasons;
  import Spoilers from './SpoilerSection.svelte';
  let selected = 0;
</script>

<select name="Seasons" bind:value={selected}>
  {#each seasons as { title }, i}
    <option value={i}>{title}</option>
  {/each}
</select>

<section>
  <h2>{seasons[selected]['title']}</h2>
</section>

<section>
  {@html seasons[selected]['content']}
</section>

{#if seasons[selected]['spoilers']}
  <Spoilers spoilers={seasons[selected]['spoilers']} />
{/if}

<style>
  select {
    width: 100%;
    padding: 0.25em 0.5em;
    border-radius: 0.25em;
    margin-top: 2em;
    font-size: 1rem;
  }

  section h2 {
    margin: 1em 0 2em;
    text-align: center;
    font-weight: normal;
  }
</style>
