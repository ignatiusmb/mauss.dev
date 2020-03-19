<script>
  export let tag;
  import Link from './Link.svelte';
</script>

<span class={tag}>
  <Link href={tag}>#{tag}</Link>
</span>

<style>
  span {
    padding: 0.2em 0.4em;
    border-radius: 0.2em;
    font-size: 0.9rem;
    font-weight: bold;
    background: #d6d9e0;
    color: #606570;
  }

  .PPL2020 {
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
