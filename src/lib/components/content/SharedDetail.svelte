<script lang="ts">
  import CurrencyIcon from "$lib/components/icon/CurrencyIcon.svelte";
  import type { FullStatMod } from "$src/lib/types/build";
  import StatMods from "./StatMods.svelte";
  import RemovedWarning from "./RemovedWarning.svelte";

  interface Props {
    name?: string;
    description?: string | null;
    cost?: number;
    category?: string;
    removed: boolean;
    statMods?: FullStatMod[];
    isPopover?: boolean;
  }

  const { name, description, cost = 0, category, removed, statMods, isPopover }: Props = $props();

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
    <RemovedWarning full={isPopover} />
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
