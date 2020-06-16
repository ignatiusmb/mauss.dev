<script>
  export let post;
  import Recommendation from './independent/Recommendation.svelte';
  import CardOverlay from './CardOverlay.svelte';
  import Button from './Button.svelte';
  import { capitalize } from '../utils/helper';
  const status = parseInt(post.recommended);
  let show = false;
</script>

<article on:mouseenter={() => (show = true)} on:mouseleave={() => (show = false)}>
  <img src={post.image} alt={post.title} />
  <CardOverlay {show}>
    <h3>{post.title}</h3>
  </CardOverlay>
</article>
<aside>
  <small>
    <span>{capitalize(post.category)}</span>
    <span>⭐ {post.rating}</span>
  </small>
  <small>
    <Recommendation {status} hot={post['must-watch']} />
  </small>
  <Button href="reviews/{post.slug}">read</Button>
</aside>

<style>
  article {
    position: relative;
    display: grid;
    grid-template-rows: 18em;
    cursor: pointer;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
  }
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    text-align: center;
  }

  aside {
    display: grid;
    gap: 0.5em;
    grid-template-columns: 1fr;
    padding: 0.5em;
    text-align: center;
  }
  aside small:first-child {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  aside :global(:last-child a) {
    width: 100%;
  }
</style>
