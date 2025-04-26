<script lang="ts">
	import { goto } from "$app/navigation";
	import { heroes } from "$lib/constants/heroes";
	import Hero from "./Hero.svelte";
	import Item from "./Item.svelte";
	import Power from "./Power.svelte";

  const power = (id: number) => ({
    id,
    name: "Some power",
    description: "I am some description of a power that will appear in the popover",
    icon: `https://picsum.photos/seed/${id}/40`
  })

  const item = (id: number) => ({
    id,
    name: "Some power",
    description: "I am some description of a power that will appear in the popover",
    icon: `https://picsum.photos/seed/${id}/40`,
    rarity: "rare",
    cost: 2000 * id
  })

  const href = '/build/test'

  function onclick(event: MouseEvent): void {
    const target = event.target as HTMLElement

    if (target.nodeName === 'A') return
    if (target.closest('a')) return

    goto(href)
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- A proper link can be found right in the div. It doesn't impede a11y. -->
<div class="build" {onclick}>
  <Hero hero={heroes[0]} />

  <div class="meta">
    <a {href} class="name">Some build name</a>

    <div class="author">
      By <a href="/user/username">user</a>
    </div>
  </div>

  <div class="items">
    {#each { length: 4 }, i}
      <Power power={power(i + 1)} />
    {/each}

    {#each { length: 6 }, i}
      <Item item={item(i + 10)} />
    {/each}
  </div>
</div>

<style lang="scss">
  .build {
    $transition-duration: 25ms;
    --outline-size: 0.5rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
    border-radius: $border-radius-small;
    box-shadow: 0 0 0 $color-bg-light;
    transition: box-shadow $transition-duration, background-color $transition-duration $transition-duration;
    cursor: pointer;

    @include breakpoint(tablet) {
      flex-wrap: nowrap;
    }

    &:hover,
    &:active {
      background: $color-bg-light;
      box-shadow: 0 0 0 var(--outline-size) $color-bg-light;
      transition: box-shadow $transition-duration;

      @include breakpoint(tablet) {
        --outline-size: 1rem;
      }
    }
  }

  .meta {
    line-height: 1;
  }

  .name {
    display: block;
    margin-bottom: 0.25rem;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: $font-stack-brand;
    font-weight: bold;
    color: $white;
    text-decoration: none;
    white-space: nowrap;

    &:hover {
      box-shadow: 0 2px 0 $white;
    }
  }

  .author {
    font-size: $font-size-small;
    color: $color-text-alt;

    a {
      color: $color-text-alt;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
        color: $white;
      }
    }
  }

  .items {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    min-width: 0;

    @include breakpoint(tablet) {
      justify-content: flex-end;
    }
  }
</style>
