<script>
  export let store, total, bound;
  import Icon from './Icon.svelte';
  function handleIndexing(index) {
    index = Math.round(index);
    if (index < 0 || (index > $store && curr + bound > total)) return;
    $store = index;
  }
  $: curr = $store * bound;
  $: next = curr + bound <= total ? curr + bound : total;
</script>

<section>
  <span on:click|preventDefault={() => handleIndexing(0)}>
    <Icon name="chevrons-left" />
  </span>
  <span on:click|preventDefault={() => handleIndexing($store - 1)}>
    <Icon name="chevron-left" />
  </span>
  <div>{curr} - {next} / {total}</div>
  <span on:click|preventDefault={() => handleIndexing($store + 1)}>
    <Icon name="chevron-right" />
  </span>
  <span on:click|preventDefault={() => handleIndexing(Math.floor(total / bound))}>
    <Icon name="chevrons-right" />
  </span>
</section>

<style>
  section {
    width: 100%;
    max-width: 32em;
    display: flex;
    align-items: center;
  }
  section span {
    cursor: pointer;
    width: 2em;
    font-size: 1.5rem;
    text-align: center;
  }
  section div {
    flex: 1;
    text-align: center;
  }
</style>
