<script lang="ts">
  import type { FullStadiumBuild } from "$lib/types/build";
  import Heroes from "$lib/components/content/Heroes.svelte";
  import type { HeroData, HeroName } from "$lib/types/hero";
  import ItemsGrid from "./ItemsGrid.svelte";
  import Hero from "../content/Hero.svelte";
  import { ROUND_MAX } from "$lib/constants/round";
  import { onMount, untrack } from "svelte";
  import PowersGrid from "./PowersGrid.svelte";
  import { heroFromHeroName } from "$src/lib/constants/heroData";
  import type { FullRoundInfo, FullRoundSectionInfo } from "$src/lib/types/round";
  import type { Item, Power } from "$src/generated/prisma";
  import BuildItemOrder from "../content/BuildItemOrder.svelte";
  import BuildPowersOrder from "../content/BuildPowersOrder.svelte";

  interface Props {
    build: FullStadiumBuild;
    heroEditable?: boolean;
  }

  let { build = $bindable(), heroEditable = true }: Props = $props();

  const { roundInfos } = $derived(build);

  const talentRoundIndexes = [0, 2, 4, 6];
  const powerTalentType = "Power";
  const itemTalentTypes = ["Weapon", "Ability", "Survival"];

  let currentRoundIndex = $state(0);
  let currentTalentTypeTab = $state(itemTalentTypes[0]);
  let heroName: HeroName | null = $state(build.heroName);

  const selectedHero = $derived(heroFromHeroName(heroName as HeroName));

  const previousRounds: FullRoundInfo[] = $derived(build.roundInfos.slice(0, currentRoundIndex));
  const futureRounds: FullRoundInfo[] = $derived(
    build.roundInfos.slice(currentRoundIndex + 1, ROUND_MAX),
  );
  const powersFromPreviousRounds = $derived.by(getPowersFromPreviousRounds);
  const itemsFromPreviousRounds = $derived.by(getItemsFromPreviousRounds);
  const canSelectPowerForCurrentRound = $derived(talentRoundIndexes.includes(currentRoundIndex));

  const currentRound = $derived(build.roundInfos[currentRoundIndex] || {});
  // Currently only using a single section
  const currentRoundSection = $derived(currentRound.sections?.[0] || {});

  $effect(() => {
    if (selectedHero) untrack(removeHeroSpecificTalents);
  });

  // Add empty roundInfos for each round
  onMount(() => {
    for (let i = 0; i < ROUND_MAX; i++) {
      if (build.roundInfos[i]) continue;

      build.roundInfos[i] = {
        id: Math.random().toString(), // Id here is tempoary
        sections: [
          {
            id: Math.random().toString(), // Id here is tempoary
            title: "",
            power: null,
            items: [],
          },
        ],
        note: "",
      };
    }
  });

  function setRound(index: number): void {
    currentRoundIndex = index;

    // Reset talent tabs to the first tab if the current tab is "Power" and the new tab can't select powers
    if (currentTalentTypeTab === powerTalentType && !canSelectPowerForCurrentRound) {
      currentTalentTypeTab = itemTalentTypes[0];
    }
  }

  function selectHero(event: MouseEvent, hero: HeroData): void {
    event.preventDefault();

    console.log('select hero', hero)

    build.heroName = hero.name;
    heroName = hero.name;
  }

  function selectItem(item: Item): void {
    // Remove item from from future rounds
    futureRounds.forEach(({ sections }) => {
      sections.forEach((section: FullRoundSectionInfo) => {
        section.items = section.items.filter((i: Item) => i.id !== item.id);
      });
    });

    // Item is selected in the current round, remove it
    if (currentRoundSection.items.some((i: Item) => i.id === item.id)) {
      currentRoundSection.items = currentRoundSection.items.filter((i: Item) => i.id !== item.id);
    } else {
      // Item is not selected in the current round, add it
      currentRoundSection.items.push(item);
    }

    // Update state
    build = { ...build };
  }

  function selectPower(power: Power): void {
    // Remove selected power from from future rounds
    futureRounds.forEach(({ sections }) => {
      sections.forEach((section: FullRoundSectionInfo) => {
        if (section.power?.id === power.id) section.power = null;
      });
    });

    if (powersFromPreviousRounds.some((p) => p.id === power.id)) return;

    currentRoundSection.power = power;

    // Update state
    build = { ...build };
  }

  function getItemsFromPreviousRounds(): Item[] {
    return previousRounds.flatMap((roundInfo) => {
      return roundInfo.sections.flatMap((section: FullRoundSectionInfo) => section.items);
    });
  }

  function getPowersFromPreviousRounds(): Power[] {
    return previousRounds
      .flatMap((roundInfo) => {
        return roundInfo.sections.flatMap((section: FullRoundSectionInfo) => section.power);
      })
      .filter(Boolean);
  }

  function removeHeroSpecificTalents() {
    build.roundInfos.forEach((roundInfo: FullRoundInfo) => {
      roundInfo.sections.forEach((section: FullRoundSectionInfo) => {
        section.power = null;
        section.items = section.items.filter((item: Item) => !item.hero);
      });
    });

    // Update state
    build = { ...build };
  }
</script>

{#if heroEditable}
  <Heroes onclick={selectHero} highlightedHero={selectedHero}>
    {#snippet header()}{/snippet}
  </Heroes>
{:else if selectedHero}
  <Hero hero={selectedHero} large />
{/if}

<div class="form-group">
  <label class="form-label" for="title">Build title</label>
  <input
    type="text"
    class="form-input form-input--large"
    bind:value={build.buildTitle}
    name="title"
    id="title"
  />
</div>

<div class="form-group">
  <label class="form-label" for="description">Short description</label>
  <p class="form-help" id="description">
    A short introduction to your builds, quickly summarizing the main playstyle and intention. You
    can provide a more detail description later.
  </p>
  <textarea
    class="form-textarea"
    bind:value={build.description}
    name="description"
    aria-describedby="description"
  ></textarea>
</div>

<h2>Powers & Items</h2>

<p class="form-help">
  Select powers and items per round. You can provide alternative options per round.
</p>

<div class="tabs">
  {#each { length: 7 }, i}
    <button
      type="button"
      class="tab"
      class:active={i === currentRoundIndex}
      onclick={() => setRound(i)}>Round {i + 1}</button
    >
  {/each}
</div>

<div class="tabs-content">
  <div class="tabs dark">
    {#each itemTalentTypes as itemType (itemType)}
      <button
        type="button"
        class="tab"
        class:active={currentTalentTypeTab === itemType}
        onclick={() => (currentTalentTypeTab = itemType)}
      >
        {itemType}
      </button>
    {/each}

    {#if canSelectPowerForCurrentRound}
      <button
        type="button"
        class="tab"
        class:active={currentTalentTypeTab === powerTalentType}
        onclick={() => (currentTalentTypeTab = powerTalentType)}
      >
        {powerTalentType}
      </button>
    {/if}
  </div>

  <div class="tabs-content dark">
    {#if currentTalentTypeTab === powerTalentType}
      <PowersGrid
        currentlySelected={currentRoundSection.power}
        previouslySelected={powersFromPreviousRounds}
        onclick={selectPower}
      />
    {:else}
      <ItemsGrid
        onclick={selectItem}
        currentlySelected={currentRoundSection.items || []}
        previouslySelected={itemsFromPreviousRounds}
      />
    {/if}
  </div>

  <div class="form-group">
    <label class="form-label" for="round-notes">Round notes</label>
    <p class="form-help" id="round-notes">
      Provide an optional short description on the current round, explaining options, expectations,
      and possible play styles.
    </p>
    <textarea
      class="form-textarea"
      value={roundInfos[currentRoundIndex]?.note || ""}
      name="round-notes"
      aria-describedby="round-notes"
    ></textarea>
  </div>
</div>

<div class="order">
  <BuildPowersOrder {build} />
</div>

<div class="order">
  <BuildItemOrder {build} />
</div>

<h2>Description</h2>

<div class="form-group">
  <p class="form-help" id="additional-notes">
    Explain your build in detail, going over playstyles, item order, possible deviations, and
    whatever else you might think of.
  </p>
  <textarea
    class="form-textarea form-textarea--large"
    bind:value={build.additionalNotes}
    name="additional-notes"
    aria-describedby="additional-notes"
  ></textarea>
</div>

<style lang="scss">
  h2 {
    margin: 3rem 0 1rem;
  }

  .tabs {
    display: flex;
    gap: 0 1rem;
    padding: 0.5rem 1rem;
    background: $color-border;
    border-radius: $border-radius $border-radius 0 0;

    &.dark {
      background: $color-bg-dark;
    }
  }

  .tab {
    padding: 0.5rem;
    border-radius: $border-radius-small;
    color: $color-text-alt;
    font-family: $font-stack-brand;
    font-size: $font-size-base;

    &:hover {
      color: $white;
    }

    &.active {
      background: $secondary;
      color: $white;
    }
  }

  .tabs-content {
    padding: 1.5rem;
    margin-bottom: 3rem;
    border: 1px solid $color-border;
    border-radius: 0 0 $border-radius $border-radius;

    &.dark {
      border-color: $color-bg-dark;
    }
  }

  .order {
    margin-bottom: 2rem;
  }
</style>
