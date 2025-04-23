<script>
  import Popover from "../common/Popover.svelte";
  import SharedDetail from "./SharedDetail.svelte";

  const { power } = $props();

  const { name, description, icon } = $derived(power);
</script>

<Popover>
  <div class="power">
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

    img {
      width: 100%;
      height: auto;
      border-radius: $border-radius-small;
      border: 1px solid $color-bg-base;
    }
  }
</style>
