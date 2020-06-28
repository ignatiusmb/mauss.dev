<script context="module">
  import { compareDate } from '../utils/helper';
  export async function preload() {
    const data = {
      about: await this.fetch('about.json').then(r => r.json()),
      curated: await this.fetch('curated.json').then(r => r.json()),
      posts: await this.fetch('posts.json').then(r => r.json()),
      reviews: await this.fetch('reviews.json').then(r => r.json())
    };

    data['curated'] = data['curated'].sort((x, y) => compareDate(x.updated, y.updated));
    data['reviews'] = data['reviews'].filter(p => p.rating && p.verdict);
    for (const key in data) if (Array.isArray(data[key])) data[key] = data[key].slice(0, 4);

    return { data };
  }
</script>

<script>
  export let data;
  import Link from '../components/independent/Link.svelte';
  import MetaHead from '../components/MetaHead.svelte';
  import PostArticle from '../pages/PostArticle.svelte';
  const inherit = false;
</script>

<MetaHead
  title="Ignatius Bagussuputra"
  description="Mauss. Personal website of Ignatius Bagussuputra. A Computer Science undergraduate from University of
  Indonesia." />

<PostArticle header={false}>
  <header slot="header">
    <img src="profile/mauss.jpeg" alt="Mauss Profile" />
    <h2>
      <Link {inherit} href="about">Ignatius Bagussuputra</Link>
    </h2>
    <h3>CS Student at University of Indonesia</h3>
  </header>

  <section>
    <h2>Recent Posts 📚</h2>
    <p>What's on my mind (or life) recently:</p>
    <ul>
      {#each data['posts'] as post}
        <li>
          <Link {inherit} href="posts/{post.slug}">{post.title}</Link>
        </li>
      {/each}
      <li>
        <Link {inherit} href="posts">More posts...</Link>
      </li>
    </ul>
  </section>

  <section>
    <h2>Recent Reviews ⭐</h2>
    <p>Creative contents I've been consuming recently:</p>
    <ul>
      {#each data['reviews'] as review}
        <li>
          <Link {inherit} href="reviews/{review.slug}">{review.title}</Link>
        </li>
      {/each}
      <li>
        <Link {inherit} href="reviews">More reviews...</Link>
      </li>
    </ul>
  </section>

  <section>
    <h2>Recently Curated ⚖️</h2>
    <p>Stuffs I've been curating recently:</p>
    <ul>
      {#each data['curated'] as curated}
        <li>
          <Link {inherit} href="curated/{curated.slug}">{curated.title}</Link>
        </li>
      {/each}
      <li>
        <Link {inherit} href="curated">More curated stuffs...</Link>
      </li>
    </ul>
  </section>
</PostArticle>

<style>
  header {
    padding: 3em 0 0;
    text-align: center;
  }
  header img {
    width: 14em;
    height: 14em;
    border: 0;
    border-radius: 50%;
  }
</style>
