<script lang="ts">
  import type { Power } from "$src/generated/prisma";
  import Card from "../common/Card.svelte";
  import Popover from "../common/Popover.svelte";
  import SharedDetail from "./SharedDetail.svelte";

  interface Props {
    power: Power;
    large?: boolean;
    full?: boolean;
    outline?: boolean;
    onclick?: (power: Power) => void;
  }

  const {
    power,
    large = false,
    full = false,
    outline = false,
    onclick = () => null,
  }: Props = $props();

  const { name, description, iconURL } = $derived(power);

  const imageSize = $derived(large ? 60 : 34);
</script>

{#if full}
  <Card {outline} onclick={() => onclick(power)}>
    {#snippet header()}
      <div class="power">
        <img src={iconURL} alt={name} />
      </div>

      {name}
    {/snippet}

    <SharedDetail {description} />
  </Card>
{:else}
  <Popover onclick={() => onclick(power)}>
    <div class="power" class:large>
      <img src={iconURL} alt={name} width={imageSize} height={imageSize} />
    </div>

    {#snippet content()}
      <SharedDetail {name} {description} />
    {/snippet}
  </Popover>
{/if}

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
