<script lang="ts">
  interface Props {
    name: string,
    description: string,
    cost?: number
  }

  const { name, description, cost = 0 }: Props = $props();
</script>

<div class="detail">
  <strong class="name">{name}</strong>
  <p class="description">{description}</p>

  <div class="cost">
    {#if cost}
      ${cost}
    {:else}
      Free
    {/if}
  </div>
</div>

<style lang="scss">
  .detail {
    width: 23rem;
    padding: 1.5rem;
  }

  .name {
    display: block;
    margin-bottom: 1rem;
    color: $color-text-titles;
    font-size: 1.2em;
    line-height: 1.1;
    font-weight: bold;
    font-family: $font-stack-brand;
  }

  .description {
    margin: 0;
    padding: 0.5rem 0;
    border-top: 1px solid rgba($color-text-alt, 0.5);
    border-bottom: 1px solid rgba($color-text-alt, 0.5);
    color: $color-text-alt;
  }

  .cost {
    margin-top: 1rem;
    color: $white;
    font-weight: bold;
    font-family: $font-stack-brand;
  }
</style>
