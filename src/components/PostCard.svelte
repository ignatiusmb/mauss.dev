<script>
  export let post;
  import Button from './Button.svelte';
  const date = post['pretty-date'].split(',')[1].trim();
</script>

<article>
  <div class="img-wrapper">
    <img src={post.image} alt={post.title} />
  </div>
  <slot />
</article>
<aside>
  <small>{date}</small>
  <small>&bull;</small>
  <small>{post['read-time']} min read</small>
  <Button href="posts/{post.slug}">read</Button>
</aside>

<style>
  article {
    display: grid;
    grid-template-rows: 14.4em 1fr;
    cursor: pointer;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
    transform: translate(0%);
  }
  article::before {
    content: '';
    opacity: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    background-color: var(--bg-inverse);
    transition: opacity 15ms linear, background-color 15ms linear;
  }
  article:hover::before {
    opacity: 0.04;
  }
  .img-wrapper {
    position: relative;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
    background-color: rgba(0, 0, 0, 0.15);
  }
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  aside {
    min-height: 3em;
    display: flex;
    align-items: center;
    padding: 0.5em;
  }
  aside small {
    margin-left: 0.5em;
  }
  aside :global(:last-child) {
    margin-left: auto;
  }
</style>
