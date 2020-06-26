<script>
  export let segment;
  import Icons from '../components/independent/Icons.svelte';
  import Navigation from '../components/Navigation.svelte';
  import Footer from '../components/Footer.svelte';
  import ScrollTop from '../components/ScrollTop.svelte';

  import '@ignatiusmb/aqua/lib/aqua.min.css';
  import '../styles/fonts.css';
  import '../styles/theme.css';
  import '../styles/blog.css';
  import '../styles/animation.css';

  let innerWidth;
  $: mobile = innerWidth < 600;
</script>

<svelte:window bind:innerWidth />
<Icons />

<Navigation {segment} {mobile} />
<slot />
<Footer {mobile} />

<ScrollTop />

<style>
  :global(#sapper) {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    font-family: var(--aqua-default);
  }
</style>
