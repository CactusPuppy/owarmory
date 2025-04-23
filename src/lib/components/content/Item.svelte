<script>
  import Popover from "../common/Popover.svelte";
  import SharedDetail from "./SharedDetail.svelte";

  const { item } = $props();

  const { name, description, icon, rarity, cost } = $derived(item);
</script>

<Popover>
  <div class="item {rarity}">
    <img src={icon} alt={name} />
  </div>

  {#snippet content()}
    <SharedDetail {name} {description} {cost} />
  {/snippet}
</Popover>

<style lang="scss">
  @use "sass:color";

  .item {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: $item-size;
    height: $item-size;
    overflow: hidden;
    padding: 0.25rem;
    border: 2px solid var(--color-rarity);
    box-shadow: inset 0 0 0 1px $color-bg-base;
    background: var(--color-rarity);

    @each $rarity, $color in $color-rarities {
      &.#{$rarity} {
        --color-rarity: #{$color};

        &:hover {
          --color-rarity: #{color.adjust($color, $lightness: 10%)};
        }
      }
    }

    img {
      width: calc(100% - 0.25rem);
      height: auto;
    }
  }
</style>
