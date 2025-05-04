<script lang="ts">
  import type { FullStatMod } from "$src/lib/types/build";
  import { DefaultStatIconPath } from "$src/lib/constants/stats";
  import { StatDisplayName } from "$src/lib/utils/stat";

  interface Props {
    statMods: FullStatMod[];
  }

  const { statMods }: Props = $props();
</script>

<div class="stat-mods">
  {#each statMods as { id, amount, isPercentage, stat } (id)}
    {@const { name, iconURL } = stat}

    <div class="stat-mod">
      <img src={iconURL ?? DefaultStatIconPath} alt="" width="18" height="18" />

      <div>
        <strong>{amount}{isPercentage ? "%" : ""}</strong>
        {StatDisplayName(name)}
      </div>
    </div>
  {/each}
</div>

<style lang="scss">
  @use "sass:color";

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
</style>
