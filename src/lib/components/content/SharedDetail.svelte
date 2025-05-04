<script lang="ts">
  import CurrencyIcon from "$lib/components/icon/CurrencyIcon.svelte";
  import type { FullStatMod } from "$src/lib/types/build";
  import StatMods from "./StatMods.svelte";

  interface Props {
    name?: string;
    description?: string | null;
    cost?: number;
    statMods?: FullStatMod[];
  }

  const { name, description, cost = 0, statMods }: Props = $props();

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

  function wrapBracketsWithMark(text: string): string {
    return text.replace(/\[[^\]]+\]/g, (match) => `<mark>${match}</mark>`);
  }
</script>

<div class="detail">
  {#if name}
    <strong class="name">{name}</strong>
  {/if}

  {#if normalStatMods.length}
    <StatMods statMods={normalStatMods} />
  {/if}

  {#if description}
    <!-- eslint-disable-next-line svelte/no-at-html-tags This should be safe, right? The input is determined by us. -->
    <p class="description">{@html wrapBracketsWithMark(description)}</p>
  {/if}

  {#if postDescriptionMods.length}
    <StatMods statMods={postDescriptionMods} />
  {/if}

  <div class="cost">
    {#if cost}
      <CurrencyIcon />
      {cost.toLocaleString()}
    {:else}
      <strong>Power</strong>
    {/if}
  </div>
</div>

<style lang="scss">
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

  .cost {
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
</style>
