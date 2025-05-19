<script lang="ts">
  import type { HeroData } from "$lib/types/hero";
  import { heroImage } from "$lib/constants/heroes";
  import { heroPath } from "$src/lib/utils/routes";

  interface Props {
    hero: HeroData;
    large?: boolean;
    active?: boolean;
    onclick?: (event: MouseEvent, hero: HeroData) => void;
  }

  const { hero, large = false, active = false, onclick = () => null }: Props = $props();
</script>

<a
  href={heroPath(hero.name)}
  class="hero"
  class:large
  class:active
  onclick={(event: MouseEvent) => onclick(event, hero)}
>
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

    &.active {
      transform: scale(1.25);
      border-color: $primary;
      box-shadow: 0 0 0 2px $primary;
    }

    img {
      display: block;
      width: 100%;
      height: auto;
    }
  }
</style>
