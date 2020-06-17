<script>
  export let query;
</script>

<div>
  <input type="text" bind:value={query} placeholder="Type in your search query here" />
</div>

<style>
  div {
    display: grid;
    width: 100%;
    margin-bottom: 1em;
  }
</style>
