<script lang="ts">
  import Heroes from "$src/lib/components/content/Heroes.svelte";
  import Item from "$src/lib/components/content/Item.svelte";
  import Power from "$src/lib/components/content/Power.svelte";
  import { ItemCategory } from "$src/lib/types/build.js";
  import { heroes } from "$src/lib/constants/heroData.js";
  import type { HeroData } from "$src/lib/types/hero.js";
  import { getRandomizerContext, setRandomizerContext } from "$src/contexts/randomizerContext.js";
  import { selectItems } from "$src/lib/utils/randomizer.js";

  let categoryRestriction = $state("");
  const { data } = $props();

  const { seed, allItems, allPowers } = data;
  setRandomizerContext(seed);
  const randomizer = getRandomizerContext();
  let selectedHero = $state(randomizer.helpers.arrayElement(heroes));
  let availableCash = $state(3500); // starting cash

  function selectNewHero() {
    selectedHero = randomizer.helpers.arrayElement(heroes);
  }

  const validItems = $derived(
    allItems
      .filter((item) => item.heroName == null || item.heroName == selectedHero.name)
      .filter((item) => !categoryRestriction || item.category == categoryRestriction)
      .filter((item) => item.cost <= availableCash),
  );
  const validPowers = $derived(allPowers.filter((power) => power.heroName == selectedHero.name));

  // svelte-ignore state_referenced_locally
  const selectedItemIndex: number = $state(Math.floor(Math.random() * validItems.length));
  // svelte-ignore state_referenced_locally
  let selectedPowerIndex: number = $state(Math.floor(Math.random() * validPowers.length));

  let selectedItems = $derived(selectItems(availableCash, validItems, randomizer));
  const selectedPower = $derived(validPowers[selectedPowerIndex]);

  function selectHero(event: MouseEvent, hero: HeroData): void {
    event.preventDefault();

    selectedHero = hero;
    selectNewItem();
    selectNewPower();
  }

  function selectNewItem() {
    selectedItems = selectItems(availableCash, validItems, randomizer);
  }

  $effect(() => {
    if (selectedItemIndex >= validItems.length) selectNewItem();
    if (selectedPowerIndex >= validPowers.length) selectNewPower();
  });

  function selectNewPower() {
    selectedPowerIndex = Math.floor(Math.random() * validPowers.length);
  }
</script>

<Heroes onclick={selectHero} highlightedHero={selectedHero} />
<button onclick={selectNewHero} class="button">Roll New Hero</button>

<div class="container">
  <div>
    <h2>Your random power is:</h2>
    <div>
      <Power power={selectedPower} full />
    </div>
    <button onclick={selectNewPower} class="button">Roll New Power</button>
    <hr />
  </div>
  <div>
    <h2>What is your budget?</h2>
    <input type="number" class="form-input" bind:value={availableCash} />
    <h3>Item Category Restriction</h3>
    <select class="form-input" bind:value={categoryRestriction}>
      <option value="">(None)</option>
      {#each Object.values(ItemCategory) as type (type)}
        <option value={type}>{type}</option>
      {/each}
    </select>
    <hr />
    <h2>Your random items are:</h2>
    <button onclick={selectNewItem} class="button">Roll New Items</button>
    <div class="items">
      {#each selectedItems as item (item.id)}
        <Item {item} full />
      {:else}
        <p>Could not find any valid items fitting your constraints.</p>
      {/each}
    </div>
    <hr />
  </div>
</div>

<style lang="scss">
  @use "sass:map";

  .container {
    @include breakpoint(tablet) {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 2rem;
    }

    & > div {
      max-width: calc(map.get($breakpoints, page-max-width) / 2);
    }
  }
  .button {
    margin-bottom: 1em;
    margin-top: 1em;
  }

  .items {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }
  h2,
  h3 {
    margin-top: 0.25em;
    margin-bottom: 0.25em;
  }

  hr {
    margin-top: 1.5em;
    margin-bottom: 1.5em;
  }
</style>
