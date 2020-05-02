<script>
  export let store, total;
  function handleIndexing(index) {
    if (index < 0) return;
    index = Math.round(index);
    if (index > $store && curr + 6 > total) return;
    $store = index;
  }
  $: curr = $store * 6;
  $: next = curr + 6 <= total ? curr + 6 : total;
</script>

<section>
  <a href="." on:click|preventDefault={() => handleIndexing(0)}>
    <i class="fas fa-angle-double-left" />
  </a>
  <a href="." on:click|preventDefault={() => handleIndexing($store - 1)}>
    <i class="fas fa-angle-left" />
  </a>
  <div>{curr} - {next} / {total}</div>
  <a href="." on:click|preventDefault={() => handleIndexing($store + 1)}>
    <i class="fas fa-angle-right" />
  </a>
  <a href="." on:click|preventDefault={() => handleIndexing(total / 6)}>
    <i class="fas fa-angle-double-right" />
  </a>
</section>

<style>
  section {
    width: 100%;
    max-width: 32em;
    display: flex;
    align-items: center;
  }
  section a {
    width: 2em;
    font-size: 1.5rem;
    text-align: center;
  }
  section div {
    flex: 1;
    text-align: center;
  }
</style>
