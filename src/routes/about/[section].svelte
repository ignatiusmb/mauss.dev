<script context="module">
  export async function preload({ params }) {
    const { section } = params;
    const articles = await this.fetch('about.json').then(r => r.json());
    if (!articles[section]) return this.error(404, 'Section not found');
    return { section, post: articles[section] };
  }
</script>

<script>
  export let section, post;
  import MetaHead from '../../components/MetaHead.svelte';
  import PostArticle from '../../pages/PostArticle.svelte';
  import { capitalize } from '../../utils/helper';
</script>

<MetaHead
  {post}
  canonical="about/{section}"
  title="About - {capitalize(section)}"
  description="Get to know Ignatius Bagussuputra from his About page." />

<PostArticle {post} segment="content" filename="about/{section}.md">
  <section>
    {@html post.content}
  </section>
</PostArticle>
