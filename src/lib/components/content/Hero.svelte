<script lang="ts">
  import type { HeroData } from "$lib/types/hero";
  import { heroImage } from "$src/lib/constants/heroes";

  const { hero, large = false }: { hero: HeroData; large?: boolean } = $props();
</script>

<a href="/hero/{hero.name}" class="hero" class:large>
  <img
    src={heroImage(hero.name)}
    alt={hero.name}
    width={large ? 80 : 50}
    height={large ? 80 : 50}
  />
</a>

<style lang="scss">
  .hero {
    --size: #{px-to-rem(50)};
    display: block;
    flex: 0 0 var(--size);
    width: var(--size);
    height: var(--size);
    background: $color-bg-hero;
    border: 2px solid $white;
    border-radius: $border-radius-small;
    overflow: hidden;
    transition: transform 50ms;

    &:hover {
      transform: scale(1.1);
    }

    &.large {
      --size: #{px-to-rem(80)};
      border-radius: $border-radius;

      &:hover {
        transform: scale(1.05);
      }
    }

    img {
      display: block;
      width: 100%;
      height: auto;
    }
  }
</style>
