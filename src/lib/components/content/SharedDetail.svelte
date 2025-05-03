<script lang="ts">
  import CurrencyIcon from "$lib/components/icon/CurrencyIcon.svelte";
  import type { StatMod } from "$src/generated/prisma";

  interface Props {
    name?: string;
    description?: string | null;
    cost?: number;
    // This type should include the `stat` include
    statMods?: StatMod[];
  }

  const { name, description, cost = 0, statMods }: Props = $props();

  function wrapBracketsWithMark(text: string): string {
    return text.replace(/\[[^\]]+\]/g, (match) => `<mark>${match}</mark>`);
  }
</script>

<div class="detail">
  {#if name}
    <strong class="name">{name}</strong>
  {/if}

  {#if description}
    <!-- eslint-disable-next-line svelte/no-at-html-tags This should be safe, right? The input is determined by us. -->
    <p class="description">{@html wrapBracketsWithMark(description)}</p>
  {/if}

  {#if statMods?.length}
    <div class="stat-mods">
      {#each statMods as { id, amount, isPercentage, stat } (id)}
        {@const { name, iconURL } = stat}

        <div class="stat-mod">
          <img src={iconURL} alt="" width="18" height="18" />

          <div>
            <strong>{amount}{isPercentage ? "%" : ""}</strong>
            {name}
          </div>
        </div>
      {/each}
    </div>
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

  .stat-mods {
    padding: 0 0 0.5rem;
  }

  .stat-mod {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: color.adjust($color-text-alt, $lightness: 15%);
    font-size: $font-size-small;
    line-height: 1.5;

    strong {
      color: $white;
      font-family: $font-stack-brand;
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
