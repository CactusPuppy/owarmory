<script lang="ts">
  import Hero from "$lib/components/content/Hero.svelte";
	import ItemStatistics from "$lib/components/content/ItemStatistics.svelte";
  import { heroes } from "$lib/constants/heroes";
  import type { Build } from "$lib/types/build";

  const build: Build = {
    title: "I am a build for a hero",
    introduction: "Some short description, consectetur adipiscing elit. Donec ornare justo quis felis feugiat vestibulum. Nulla facilisi. Aliquam volutpat sed ipsum vel finibus. Morbi diam erat, congue ut gravida vitae.",
    hero: heroes[0],
    author: {
      username: "Some guy"
    }
  }

  const { title, hero, introduction, author } = $derived(build)
</script>

<article itemscope itemtype="https://schema.org/Article">
  <header class="header">
    <Hero {hero} large />

    <div class="meta">
      <h1 class="title">{title}</h1>

      <a class="hero" href="/hero/{hero.name}">{hero.name}</a>
      <a class="author" href="/user/{author.username}" itemprop="author">{author.username}</a>
    </div>
  </header>

  <p class="introduction">{introduction}</p>

  <div class="layout">
    <aside class="sidebar block">
      <ItemStatistics items={[]} {hero} />
    </aside>

    <section class="article block">
    </section>
  </div>
</article>

<style lang="scss">
  a {
    color: $secondary;
    text-decoration: none;

    &:hover {
      color: $white;
      text-decoration: underline;
    }
  }

  .header {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    @include breakpoint(tablet) {
      flex-direction: row;
      gap: 0 2rem;
    }
  }

  .title {
    margin: 0;

    @include breakpoint(tablet) {
      margin: -0.5rem 0;
    }
  }

  .introduction {
    font-style: italic;
    margin: 1rem 0 $vertical-offset-large;

    @include breakpoint(tablet) {
      margin-top: 2rem;
    }
  }

  .hero {
    margin-right: 1rem;
    font-size: $font-size-h3;
    font-style: $font-stack-brand;
    font-weight: bold;
  }

  .layout {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    @include breakpoint(tablet) {
      display: grid;
      grid-template-columns: 23rem auto;
      gap: 4rem;
    }
  }

  .sidebar {
    min-height: 20rem;
  }
</style>
