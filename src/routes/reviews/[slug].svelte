<script context="module">
  export async function preload({ path, params, query }) {
    const list = await this.fetch('reviews.json').then(r => r.json());
    const post = await this.fetch(`reviews/${params.slug}.json`).then(r => r.json());

    for (let i = 0; i < list.length; i++) {
      if (list[i].slug !== post.slug) continue;
      post['siblings'] = {};
      post.siblings.base = 'reviews';
      const [prev, next] = [list[i - 1], list[i + 1]];
      post.siblings.prev = prev ? { slug: prev.slug, title: prev.title } : null;
      post.siblings.next = next ? { slug: next.slug, title: next.title } : null;
      break;
    }

    return { post };
  }
</script>

<script>
  export let post;
  import MetaHead from '../../components/MetaHead.svelte';
  import Disclaimer from '../../components/Disclaimer.svelte';
  import TabSection from '../../components/TabSection.svelte';
  import Spoilers from '../../components/SpoilerSection.svelte';
  import PostArticle from '../../pages/PostArticle.svelte';
  const segment = 'content/reviews';
  $: canonical = `reviews/${post.slug}`;
  $: filename = `${post.slug}.md`;
</script>

<MetaHead {post} {canonical} title={post.title} description={post.description} />

<PostArticle {post} {segment} {filename} siblings={post.siblings} showEdit={true}>
  <small slot="header">
    <span>
      <a href={post.link}>MyAnimeList</a>
    </span>
  </small>

  <Disclaimer link={true} />

  <section>
    {@html post.content}
  </section>

  {#if post.seasons}
    <TabSection seasons={post.seasons} />
  {:else if post.spoilers}
    <Spoilers />

    <section>
      {@html post.spoilers}
    </section>
  {/if}
</PostArticle>

<style>
  small {
    font-size: 1rem;
  }
</style>
