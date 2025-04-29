<script lang="ts">
  import { heroes } from "$lib/constants/heroData";
  import type { HeroData, HeroRole } from "$lib/types/hero";
  import Hero from "./Hero.svelte";
  import imageTank from "$lib/images/content/tank.png";
  import imageDps from "$lib/images/content/dps.png";
  import imageSupport from "$lib/images/content/support.png";
  import type { Snippet } from "svelte";

  type RoleGroup = {
    [key in HeroRole]?: HeroData[];
  };

  type Props = {
    header?: Snippet;
    highlightedHero: HeroData | null;
    onclick?: (event: MouseEvent, hero: HeroData) => void;
  }

  const {
    header,
    highlightedHero = null,
    onclick = () => null,
  }: Props = $props();

  const roleImages: Record<HeroRole, string> = {
    Tank: imageTank,
    Damage: imageDps,
    Support: imageSupport,
  };

  const heroesByRole: RoleGroup = heroes.reduce((acc, hero) => {
    if (!acc[hero.role]) acc[hero.role] = [];

    acc[hero.role]!.push(hero);
    return acc;
  }, {} as RoleGroup);
</script>

{#if header}
  {@render header()}
{:else}
  <h1>Heroes</h1>
{/if}

<div class="roles">
  {#each Object.entries(heroesByRole) as [role, heroNames] (role)}
    <div class="role">
      <img class="icon" src={roleImages[role as HeroRole]} alt={role} height="42" width="42" />

      <div class="grid">
        {#each heroNames as hero (hero)}
          <Hero {hero} {onclick} active={highlightedHero?.name === hero.name} />
        {/each}
      </div>
    </div>
  {/each}
</div>

<style lang="scss">
  h1 {
    margin: 0 0 1rem;
  }

  .roles {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    @include breakpoint(tablet) {
      flex-direction: row;
      justify-content: space-between;
    }
  }

  .role {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
  }

  .icon {
    margin-top: 0.25rem;
  }

  .grid {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
</style>
