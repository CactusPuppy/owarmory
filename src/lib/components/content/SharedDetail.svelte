<script lang="ts">
  import CurrencyIcon from "$lib/components/icon/CurrencyIcon.svelte";

  interface Props {
    name?: string;
    description?: string | null;
    cost?: number;
  }

  const { name, description, cost = 0 }: Props = $props();
</script>

<div class="detail">
  {#if name}
    <strong class="name">{name}</strong>
  {/if}

  {#if description}
    <p class="description">{description}</p>
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
