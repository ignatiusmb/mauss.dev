<script>
  export let seasons;
  import TabContent from './TabContent.svelte';
  let selected = 0;
</script>

<select name="Seasons" bind:value={selected}>
  {#each seasons as { title }, i}
    <option value={i}>{title}</option>
  {/each}
</select>

<TabContent post={seasons[selected]} />

<style>
  select {
    width: 100%;
    padding: 0.25em 0.5em;
    border-radius: 0.25em;
    margin-top: 2em;
    font-size: 1rem;
  }
</style>
