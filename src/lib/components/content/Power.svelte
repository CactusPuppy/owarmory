<script lang="ts">
  import Popover from "../common/Popover.svelte";
  import SharedDetail from "./SharedDetail.svelte";

  interface Props {
    power: unknown
    large: boolean
  }

  const { power, large = false }: Props = $props();

  // @ts-expect-error There's no type right now
  const { name, description, icon } = $derived(power);
</script>

<Popover>
  <div class="power" class:large>
    <img src={icon} alt={name} />
  </div>

  {#snippet content()}
    <SharedDetail {name} {description} />
  {/snippet}
</Popover>

<style lang="scss">
  @use "sass:color";

  .power {
    border-radius: $border-radius-small;
    width: $item-size;
    height: $item-size;
    overflow: hidden;
    border: 2px solid $primary;
    background: $primary;

    &:hover {
      border-color: color.adjust($primary, $lightness: 10%);
    }

    &.large {
      width: $power-size-large;
      height: $power-size-large;
      border-radius: $border-radius;
    }

    img {
      width: 100%;
      height: auto;
      border-radius: $border-radius-small;
      border: 1px solid $color-bg-base;
    }
  }

</style>
