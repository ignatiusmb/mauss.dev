<script>
  import Nav from '../components/Nav.svelte';
  import Footer from '../components/Footer.svelte';
  import ScrollTop from '../components/ScrollTop.svelte';

  import '@ignatiusmb/aqua/lib/core.css';
  import '@ignatiusmb/aqua/lib/main.css';

  export let segment;
</script>

<style>
  main {
    flex: 1;
    padding-top: 1em;
    background-color: var(--bg-color);
  }
</style>

<Nav {segment} />

<main>
  <slot />
</main>

<ScrollTop />
<Footer />
