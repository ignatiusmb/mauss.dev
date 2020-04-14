<script>
  export let segment;
  import Navigation from '../components/Navigation.svelte';
  import Footer from '../components/Footer.svelte';
  import ScrollTop from '../components/ScrollTop.svelte';
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
