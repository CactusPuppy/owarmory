<script lang="ts">
  import type { FlatFullRoundInfo, FlatFullStadiumBuild, BuildDataSchema } from "$lib/types/build";
  import Heroes from "$lib/components/content/Heroes.svelte";
  import type { HeroData, HeroName } from "$lib/types/hero";
  import ItemsGrid from "./ItemsGrid.svelte";
  import Hero from "../content/Hero.svelte";
  import { ROUND_MAX } from "$lib/constants/round";
  import { setContext, untrack } from "svelte";
  import PowersGrid from "./PowersGrid.svelte";
  import { heroFromHeroName } from "$src/lib/constants/heroData";
  import type { FullItem as Item } from "$lib/types/build";
  import type { Power, StadiumBuild, Tag } from "$src/generated/prisma";
  import BuildItemOrder from "../content/BuildItemOrder.svelte";
  import BuildPowersOrder from "../content/BuildPowersOrder.svelte";
  import { api } from "$src/lib/utils/api";
  import { getBuildItemsForRound, getBuildPowersForRound } from "$src/lib/utils/build";
  import type { AvailableTalents } from "$src/lib/types/talent";
  import type { SlashPrefixedString } from "$src/lib/types/path";
  import type { z } from "zod";
  import { goto } from "$app/navigation";
  import { buildPath } from "$lib/utils/routes";
  import MarkdownPreviewDescription from "./MarkdownPreviewDescription.svelte";
  import Textarea from "./Textarea.svelte";
  import Issues from "./Issues.svelte";
  import TextInput from "./TextInput.svelte";
  import { slide } from "svelte/transition";
  import CompoundedBuild from "../content/CompoundedBuild.svelte";

  interface Props {
    availableTalents: AvailableTalents;
    tags: Tag[];
    build: FlatFullStadiumBuild;
    method: "POST" | "PATCH";
    path?: SlashPrefixedString;
    heroEditable?: boolean;
  }

  let {
    availableTalents,
    tags,
    build = $bindable(),
    method,
    path = "/build/form",
    heroEditable = true,
  }: Props = $props();

  const { roundInfos } = $derived(build);

  const talentRoundIndexes = [0, 2, 4, 6];
  const powerTalentType = "Power";
  const itemTalentTypes = ["Weapon", "Ability", "Survival"];

  let currentRoundIndex = $state(0);
  let currentTalentTypeTab = $state(itemTalentTypes[0]);
  const heroName: HeroName | null = $derived(build.heroName as HeroName);
  let issues: string[] = $state([]);
  let saving = $state(false);
  let query = $state("");

  const validations: Record<string, boolean> = $state({});
  const containsErrors = $derived(!Object.values(validations).every(Boolean));

  const selectedHero = $derived(heroFromHeroName(heroName as HeroName));

  const availableItems = $derived(
    availableTalents.items
      .filter((item) => item.heroName == null || item.heroName == heroName)
      .filter((item) => item.category == currentTalentTypeTab),
  );
  const availablePowers = $derived(
    availableTalents.powers.filter((power) => power.heroName == heroName),
  );

  const filteredItems = $derived(availableItems.filter(filterTalents));
  const filteredPowers = $derived(availablePowers.filter(filterTalents));

  const futureRounds: FlatFullRoundInfo[] = $derived(
    build.roundInfos!.slice(currentRoundIndex + 1, ROUND_MAX),
  );
  const otherRounds: FlatFullRoundInfo[] = $derived(
    build.roundInfos!.filter((_, index) => index !== currentRoundIndex),
  );
  const powersFromPreviousRounds = $derived.by(getPowersFromPreviousRounds);
  const itemsFromPreviousRounds = $derived.by(getItemsFromPreviousRounds);
  const canSelectPowerForCurrentRound = $derived(talentRoundIndexes.includes(currentRoundIndex));

  const currentRound = $derived(roundInfos![currentRoundIndex] || {});
  // Currently only using a single section
  const currentRoundSection = $derived(currentRound.sections?.[0] || {});

  // svelte-ignore state_referenced_locally
  const currentRoundContext = $state({ value: currentRoundIndex + 1 });
  $effect(() => {
    currentRoundContext.value = currentRoundIndex + 1;
  });
  setContext("currentRound", currentRoundContext);

  $effect(() => {
    if (selectedHero) untrack(removeHeroSpecificTalents);
  });

  $effect(() => {
    validateItemsForCurrentRound();
    validateFinalPowers();
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

    build.heroName = hero.name;
    build = { ...build };
  }

  function selectItem(item: Item): void {
    if (currentRoundSection.soldItems.some((i) => i.id === item.id)) {
      // If item is being sold this round, remove its sale
      currentRoundSection.soldItems = currentRoundSection.soldItems.filter((i) => i.id !== item.id);
      // Remove purchase item from future standard sections until a sale occurs of the item
      for (const futureRound of futureRounds) {
        if (futureRound.sections[0].soldItems.some((soldItem) => soldItem.id == item.id)) break;
        futureRound.sections[0].purchasedItems = futureRound.sections[0].purchasedItems.filter(
          (i) => i.id !== item.id,
        );
      }
    } else if (currentRoundSection.purchasedItems.some((i) => i.id === item.id)) {
      // If item is being purchased this round, remove its purchase
      currentRoundSection.purchasedItems = currentRoundSection.purchasedItems.filter(
        (i) => i.id !== item.id,
      );
      // Remove sale item from future standard sections until purchased again
      for (const futureRound of futureRounds) {
        if (futureRound.sections[0].purchasedItems.some((soldItem) => soldItem.id == item.id))
          break;
        futureRound.sections[0].soldItems = futureRound.sections[0].soldItems.filter(
          (i) => i.id !== item.id,
        );
      }
    } else if (getBuildItemsForRound(build, currentRoundIndex).some((i) => i.id === item.id)) {
      // Item is currently in inventory, add to sale
      // Remove sale item from future standard sections until purchased again
      for (const futureRound of futureRounds) {
        if (futureRound.sections[0].purchasedItems.some((soldItem) => soldItem.id == item.id))
          break;
        futureRound.sections[0].soldItems = futureRound.sections[0].soldItems.filter(
          (i) => i.id !== item.id,
        );
      }
      currentRoundSection.soldItems.push(item);
    } else {
      // Item is not in inventory, add to purchases
      currentRoundSection.purchasedItems.push(item);
      // Remove purchase item from future standard sections until a sale occurs of the item
      for (const futureRound of futureRounds) {
        if (futureRound.sections[0].soldItems.some((soldItem) => soldItem.id == item.id)) break;
        futureRound.sections[0].purchasedItems = futureRound.sections[0].purchasedItems.filter(
          (i) => i.id !== item.id,
        );
      }
    }

    // Update state
    build = { ...build };
  }

  function selectPower(power: Power): void {
    // Remove selected power from other rounds
    otherRounds.forEach(({ sections }) => {
      sections.forEach((section) => {
        if (section.power?.id === power.id) section.power = null;
      });
    });

    if (currentRoundSection.power?.id === power.id) currentRoundSection.power = null;
    else currentRoundSection.power = power;

    // Update state
    build = { ...build };
  }

  function getItemsFromPreviousRounds(): Item[] {
    return getBuildItemsForRound(build, currentRoundIndex);
  }

  function getPowersFromPreviousRounds(): Power[] {
    return getBuildPowersForRound(build, currentRoundIndex);
  }

  function removeHeroSpecificTalents(): void {
    build.roundInfos.forEach((roundInfo) => {
      roundInfo.sections.forEach((section) => {
        if (section.power?.heroName != heroName) section.power = null;
        section.purchasedItems = section.purchasedItems.filter(
          (item) => item.heroName == null || heroName == item.heroName,
        );
        section.soldItems = section.soldItems.filter(
          (item) => item.heroName == null || heroName == item.heroName,
        );
      });
    });

    // Update state
    build = { ...build };
  }

  function validateItemsForCurrentRound(): void {
    const items = getBuildItemsForRound(build, currentRoundIndex + 1);
    validations[`items-length-${currentRoundIndex}`] = items.length <= 6;
  }

  function validateFinalPowers(): void {
    const powers = getBuildPowersForRound(build, ROUND_MAX);
    validations[`powers-length`] = powers.length == 4;
  }

  async function onsubmit(event: SubmitEvent): Promise<void> {
    event.preventDefault();

    issues = [];
    saving = true;

    try {
      const response = (await api(path, {}, null, {
        method,
        body: JSON.stringify(build),
      })) as { newBuild: StadiumBuild };

      if (!response) throw new Error("Something went wrong while saving");

      const { newBuild } = response;

      await goto(buildPath(newBuild), { invalidateAll: true });
    } catch (error: unknown) {
      console.error(error);

      if (error && typeof error == "object" && "message" in error) {
        if ("errorType" in error && error.errorType == "validation") {
          const zodError = JSON.parse(error.message as string) as z.ZodError<
            typeof BuildDataSchema
          >;
          issues = zodError.issues.map((issue) => issue.message);
        } else {
          issues = [error.message as string];
        }
      }

      window.scrollTo({ top: 0 });
    } finally {
      saving = false;
    }
  }

  function filterTalents(talent: Item[] | Power[]): boolean {
    // Filter on the full object by stringifying it. Bit ugly, but that makes it easy to filter by name,
    // description, and stat names all at once.
    return JSON.stringify(talent).toLowerCase().includes(query.toLowerCase());
  }
</script>

{#if issues.length}
  <div class="issues">
    <Issues {issues} />
  </div>
{/if}

<form {onsubmit}>
  {#if heroEditable}
    <Heroes onclick={selectHero} highlightedHero={selectedHero}>
      {#snippet header()}{/snippet}
    </Heroes>
  {:else if selectedHero}
    <Hero hero={selectedHero} large />
  {/if}

  <TextInput
    label="Build title"
    id="title"
    large
    bind:value={build.buildTitle}
    lengthValidation={{ min: 10, max: 70, oninput: (isValid) => (validations.title = isValid) }}
  />

  <Textarea
    label="Short description"
    id="description"
    bind:value={build.description}
    lengthValidation={{
      min: 20,
      max: 300,
      oninput: (isValid) => (validations.description = isValid),
    }}
  >
    A short introduction to your builds, quickly summarizing the main playstyle and intention. You
    can provide a more detailed description later.
  </Textarea>

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

    <div class="inset">
      <input
        type="text"
        class="form-input"
        placeholder="Search powers and items..."
        bind:value={query}
      />
    </div>

    <div class="tabs-content dark inset">
      <div class="build-talents-layout">
        <div class="compounded-build">
          <CompoundedBuild {build} large={false} onclick={selectItem} />

          {#if validations[`items-length-${currentRoundIndex}`] === false}
            <div class="form-text-error inline" transition:slide={{ duration: 100 }}>
              You would end up with more than 6 items this round.
            </div>
          {/if}
        </div>

        {#if currentTalentTypeTab === powerTalentType}
          <PowersGrid
            {availablePowers}
            currentlySelected={currentRoundSection.power}
            previouslySelected={powersFromPreviousRounds}
            filtered={filteredPowers}
            onclick={selectPower}
          />
        {:else}
          <ItemsGrid
            {availableItems}
            onclick={selectItem}
            currentlyPurchasing={currentRoundSection.purchasedItems}
            currentlySelling={currentRoundSection.soldItems}
            previouslySelected={itemsFromPreviousRounds}
            filtered={filteredItems}
          />
        {/if}
      </div>
    </div>

    <div class="inset">
      <Textarea
        label="Round notes"
        id="round-notes"
        bind:value={() => currentRound?.note || "", (v) => (currentRound.note = v)}
        lengthValidation={{
          min: 0,
          max: 1500,
          oninput: (isValid) => (validations[`note-${currentRound}`] = isValid),
        }}
      >
        Provide an optional short description on the current round, explaining options,
        expectations, and possible play styles.
      </Textarea>
    </div>
  </div>

  <div class="order">
    <BuildPowersOrder {build} />

    {#if validations[`powers-length`] === false}
      <div class="form-text-error" transition:slide={{ duration: 100 }}>
        Please select 4 powers.
      </div>
    {/if}
  </div>

  <div class="order">
    <BuildItemOrder {build} />
  </div>

  <h2>Description</h2>

  <div class="form-group">
    <p class="form-help" id="additional-notes">
      Explain your build in detail, going over playstyles, item order, possible deviations, and
      whatever else you might think of.<br />
      Markdown enabled. <strong>**bold**</strong>, <em>_italic_</em>, and more.<br />
      Insert powers and items using &#123;&#123;Item Name&#125;&#125;.
    </p>

    <MarkdownPreviewDescription value={build.additionalNotes}>
      <textarea
        class="form-textarea form-textarea--large"
        bind:value={build.additionalNotes}
        name="additional-notes"
        aria-describedby="additional-notes"
      ></textarea>
    </MarkdownPreviewDescription>
  </div>

  {#if tags.length}
    <div class="form-group">
      <label class="form-label" for="tags">Tags</label>
      <p class="form-help" id="tags">
        Select predefined tags that help others find your build. Select up to 3.
      </p>
      <select
        multiple
        size="3"
        class="form-select"
        name="tags"
        aria-describedby="tags"
        bind:value={
          () => build.tags.map((tag) => tag.id),
          (v) => (build.tags = tags.filter((tag) => v.some((id) => id === tag.id)))
        }
      >
        {#each tags as { id, label } (id)}
          <option value={id}>{label}</option>
        {/each}
      </select>
    </div>
  {/if}

  <button class="button button--large save" disabled={saving || containsErrors}>
    {#if saving}
      Saving...
    {:else}
      Save build
    {/if}
  </button>
</form>

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
      border-radius: 0;
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
    margin-bottom: 3rem;
    border: 1px solid $color-border;
    border-radius: 0 0 $border-radius $border-radius;

    &.dark {
      border: 0;
      border-radius: 0;
      margin: 0;
    }
  }

  .build-talents-layout {
    @include breakpoint(tablet) {
      display: grid;
      grid-template-columns: 12rem auto;
      gap: 1rem;
    }
  }

  .compounded-build {
    margin-bottom: 3rem;
  }

  .inset {
    padding: 1.5rem;

    + .inset {
      padding-top: 0;
    }
  }

  .order {
    margin-bottom: 2rem;
  }

  .save {
    margin-top: 3rem;
  }

  .issues {
    margin-bottom: 3rem;
  }
</style>
