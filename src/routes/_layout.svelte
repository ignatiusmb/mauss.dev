<script>
  export let segment;
  import Icons from '../components/independent/Icons.svelte';
  import Navigation from '../components/Navigation.svelte';
  import Footer from '../components/Footer.svelte';
  import ScrollTop from '../components/ScrollTop.svelte';

  import '../../static/css/fonts.css';
  import '../../static/css/theme.css';
  import '../../static/css/core.css';
  import '../../static/css/main.css';
  import '../../static/css/blog.css';
  import '../../static/css/animation.css';
</script>

<Icons />

<Navigation {segment} />
<slot />
<Footer />

<ScrollTop />

<style>
  :global(#sapper) {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
</style>
