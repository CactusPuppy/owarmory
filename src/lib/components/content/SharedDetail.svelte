<script lang="ts">
  import CurrencyIcon from "$lib/components/icon/CurrencyIcon.svelte";
  import type { FullStatMod } from "$src/lib/types/build";
  import StatMods from "./StatMods.svelte";
  import WarningIcon from "$lib/images/icons/warning.svelte";

  interface Props {
    name?: string;
    description?: string | null;
    cost?: number;
    category?: string;
    removed: boolean;
    statMods?: FullStatMod[];
  }

  const { name, description, cost = 0, category, removed, statMods }: Props = $props();

  const normalStatMods = $derived(
    statMods
      ?.filter((statMod) => !statMod.hidden && !statMod.isShownPostDescription)
      .sort((a, b) => a.orderIndex - b.orderIndex) ?? [],
  );
  const postDescriptionMods = $derived(
    statMods
      ?.filter((statMod) => !statMod.hidden && statMod.isShownPostDescription)
      .sort((a, b) => a.orderIndex - b.orderIndex) ?? [],
  );

  function parseDescription(text: string): string {
    let output = wrapBracketsWithMark(text);
    output = wrapNumbersWithMark(output);

    return output;
  }

  /** Replace [word] with <mark>[word]</mark> */
  function wrapBracketsWithMark(text: string): string {
    return text.replace(/\[[^\]]+\]/g, (match) => `<mark>${match}</mark>`);
  }

  /** Replace 10, 10%, 10s, and 10m with <mark>{match}<mark> */
  function wrapNumbersWithMark(text: string): string {
    return text.replace(/\d+(?:\.\d+)?(?:%|s|m)?/g, "<mark>$&</mark>");
  }
</script>

<div class="detail">
  {#if name}
    <strong class="name">{name}</strong>
  {/if}

  {#if removed}
    <div class="removal-warning">
      <div class="icon">
        <WarningIcon />
      </div>

      <div class="warning">
        <p><em>Possibly Unavailable</em></p>
        <p>
          This item or power has been marked as unavailable. This might be due to the item being
          disabled temporarily, or it might be because the item has been permanently retired.
        </p>
        <p>
          Think this warning should be removed? Let us know on our <a
            href="https://discord.gg/JNCx6U3g9F"
            target="_blank"
            rel="noopener noreferrer">Discord</a
          >.
        </p>
      </div>
    </div>
  {/if}

  {#if normalStatMods.length}
    <StatMods statMods={normalStatMods} />
  {/if}

  {#if description}
    <!-- eslint-disable-next-line svelte/no-at-html-tags This should be safe, right? The input is determined by us. -->
    <p class="description">{@html parseDescription(description)}</p>
  {/if}

  {#if postDescriptionMods.length}
    <StatMods statMods={postDescriptionMods} />
  {/if}

  <div class="footer">
    {#if category}
      <span>
        <CurrencyIcon />
        {cost.toLocaleString()}
      </span>
      <div class="footer__separator"></div>
      <span class="footer__category">
        {category}
      </span>
    {:else}
      <strong>Power</strong>
    {/if}
  </div>
</div>

<style lang="scss">
  @use "sass:color";

  .detail {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .name {
    padding-bottom: 1rem;
    display: block;
    margin-bottom: 0.5rem;
    border-bottom: 1px solid rgba($color-text-alt, 0.35);
    color: $color-text-titles;
    font-size: 1.2em;
    line-height: 1.1;
    font-weight: bold;
    font-family: $font-stack-brand;
  }

  .removal-warning {
    color: $yellow;
    border: 1px solid $yellow;
    background-color: color.adjust(color.change($yellow, $alpha: 33%), $lightness: 20%);
    border-radius: $border-radius;
    padding: 1rem;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 0.5rem;

    .icon {
      width: calc($item-size);
      height: calc($item-size);
    }

    .warning {
      font-size: 0.8em;
      color: color.adjust($yellow, $lightness: -5%, $saturation: 10%);
      flex: 1;
      em {
        font-size: 1.25em;
        font-style: normal;
        font-weight: bold;
      }

      p:last-child {
        margin-bottom: 0;
      }

      a {
        font-weight: bold;
        color: inherit;
      }
    }
  }

  .description {
    margin: 0;
    padding: 0 0 0.5rem;
    color: $color-text-alt;
    font-size: $font-size-small;
    line-height: 1.5;

    :global(mark) {
      background: transparent;
      color: $white;
    }
  }

  .footer {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding-top: 0.5rem;
    margin-top: auto;
    border-top: 1px solid rgba($color-text-alt, 0.35);
    color: $white;
    font-weight: bold;
    font-family: $font-stack-brand;

    strong {
      color: $primary;
    }
  }

  .footer__separator {
    border-left-width: 1px;
    border-right-width: 1px;
    border-color: $color-border;
    border-style: solid;
    height: 1lh;
  }

  .footer__category {
    color: $secondary;
  }
</style>
