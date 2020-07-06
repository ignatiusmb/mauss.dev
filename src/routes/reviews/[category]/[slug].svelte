<script context="module">
  export async function preload({ params }) {
    const { category, slug } = params;
    const list = await this.fetch('reviews.json').then((r) => r.json());
    const res = await this.fetch(`reviews/${category}/${slug}.json`);
    if (res.status !== 200) return this.error(404, 'Review not found');

    const post = await res.json();
    for (let i = 0; i < list.length; i++) {
      if (list[i].slug !== `${category}/${post.slug}`) continue;
      post['siblings'] = { base: 'reviews' };
      const [prev, next] = [list[i - 1], list[i + 1]];
      if (prev && prev.rating) post.siblings.prev = { slug: prev.slug, title: prev.title };
      if (next && next.rating) post.siblings.next = { slug: next.slug, title: next.title };
      break;
    }
    return { post };
  }
</script>

<script>
  export let post;
  import MetaHead from '../../../pages/MetaHead.svelte';
  import Article from '../../../pages/Article.svelte';

  import Disclaimer from '../../../components/Disclaimer.svelte';
  import ReviewsTab from '../../../components/ReviewsTab.svelte';
  import Spoilers from '../../../components/SpoilerSection.svelte';

  const segment = `content/reviews/${post.category}`;
  $: canonical = `reviews/${post.category}/${post.slug}`;
  $: filename = `${post.slug}.md`;
</script>

<MetaHead {post} {canonical} title={post.title} description={post.description} />

<Article {post} path="content/reviews/{post.category}/{post.slug}.md" siblings={post.siblings} showEdit>
  <small slot="header">
    <span>
      <a href={post.link}>MyAnimeList</a>
    </span>
  </small>

  <Disclaimer link />

  <section>
    {@html post.content}
  </section>

  {#if post.seasons}
    <ReviewsTab seasons={post.seasons} />
  {:else if post.spoilers}
    <Spoilers spoilers={post.spoilers} />
  {/if}

  {#if post.closing}
    <section>
      {@html post.closing}
    </section>
  {/if}
</Article>

<style>
  small {
    font-size: 1rem;
  }
</style>
