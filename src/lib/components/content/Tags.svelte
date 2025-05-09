<script lang="ts">
  import type { Tag } from "$src/generated/prisma";

  interface Props {
    tags: Tag[];
  }

  const { tags }: Props = $props();
</script>

<div class="tags">
  {#each tags as { id, label } (id)}
    <a class="tag" href="/tags/{label}">{label}</a>
  {/each}
</div>

<style lang="scss">
  @use "sass:color";

  .tags {
    display: inline-flex;
    flex-wrap: wrap;
    gap: 0.25rem;
  }

  .tag {
    display: block;
    padding: 0.15rem 0.5rem;
    border-radius: $border-radius;
    background: rgba($secondary, 0.25);
    font-size: 0.85em;
    font-family: $font-stack-brand;
    color: color.adjust($secondary, $lightness: 10%);
    text-decoration: none;

    &:hover,
    &:focus-visible {
      background: $secondary;
      color: $white;
    }
  }
</style>
