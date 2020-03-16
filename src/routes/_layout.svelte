<script>
  export let segment;
  import Navigation from '../components/Navigation.svelte';
  import Footer from '../components/Footer.svelte';
  import ScrollTop from '../components/ScrollTop.svelte';

  import '@ignatiusmb/aqua/lib/core.css';
  import '@ignatiusmb/aqua/lib/main.css';
</script>

<Navigation {segment} />

<slot />

<ScrollTop />
<Footer />

<style>
  :global(#sapper) {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
</style>
