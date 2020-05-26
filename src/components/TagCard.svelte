<script>
  export let post, time;

  import { fly } from 'svelte/transition';
  const [, date] = post['pretty-date'].split(',');
</script>

<section in:fly={{ x: -200, duration: time }}>
  <p>{post.title}</p>
  <aside>
    <small>{date.trim()}</small>
    <small>&bull;</small>
    <small>{post['read-time']} min read</small>
    <slot />
  </aside>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    padding: 0.5em 1em;
    border-radius: 0.25em;
    box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12);
    background-color: var(--bg-color-secondary);
  }
  p {
    flex: 1;
    padding: 0.5em 0;
  }
  aside {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  aside > :global(:not(:first-child)) {
    margin-left: 0.5em;
  }

  @media only screen and (min-width: 600px) {
    section {
      place-items: center;
      flex-direction: unset;
    }
    p {
      padding: 0;
    }
  }
</style>
