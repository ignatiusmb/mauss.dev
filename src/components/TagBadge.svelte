<script>
  export let tag;
  import Link from './independent/Link.svelte';
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

  .android {
    background: #56a036;
    color: #fff;
  }
  .firebase {
    background: #ffca28;
    color: #757575;
  }
  .git {
    background: #f54d27;
    color: #413932;
  }
  .javascript {
    background: #f7df1e;
    color: #000;
  }
  .lighthouse {
    background: #304ffe;
    color: #fff;
  }
  .ppl2020 {
    background: #feb229;
    color: #000;
  }
  .sapper {
    background: rgb(21, 151, 148);
    color: #fff;
  }
  .svelte {
    background: #ff3e00;
    color: #fff;
  }
  .tutorial {
    background: #feffa5;
    color: #b30047;
  }
</style>
