<script lang="ts">
	import type { HeroName } from "$lib/types/hero";

  const { hero, large = false } : { hero: HeroName, large?: boolean } = $props();
</script>

<a href="/{hero}" class="hero" class:large>
  <img src="//:0" alt={hero} />
</a>

<style lang="scss">
  .hero {
    --size: #{px-to-rem(50)};
    display: block;
    flex: 0 0 var(--size);
    width: var(--size);
    height: var(--size);
    background: $color-bg-dark;
    border: 2px solid $white;
    border-radius: $border-radius-small;
    overflow: hidden;

    &.large {
      --size: #{px-to-rem(80)};
      border-radius: $border-radius;
    }

    img {
      display: block;
    }
  }
</style>
