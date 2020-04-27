<script>
  export let tag;
  import Link from './complement/Link.svelte';
</script>

<span class={tag}>
  <Link href="tag/{tag}">#{tag}</Link>
</span>

<style>
  span {
    padding: 0.2em 0.4em;
    border-radius: 0.2em;
    font-size: 0.9rem;
    background: #d6d9e0;
    color: #606570;
  }

  .ppl2020 {
    background: #feb229;
    color: #000000;
  }

  .android {
    background: #56a036;
    color: #ffffff;
  }
  .git {
    background: #f54d27;
    color: #413932;
  }
  .tutorial {
    background: #feffa5;
    color: #b30047;
  }
</style>
