<script lang="ts">
  import Heroes from "$src/lib/components/content/Heroes.svelte";
  import Item from "$src/lib/components/content/Item.svelte";
  import Power from "$src/lib/components/content/Power.svelte";
  import { heroes } from "$src/lib/constants/heroData.js";
  import type { HeroData } from "$src/lib/types/hero.js";
  import { faker } from "@faker-js/faker";

  const { data } = $props();

  const { allItems, allPowers } = data;
  let selectedHero = $state(faker.helpers.arrayElement(heroes));
  let availableCash = $state(3500); // starting cash

  function selectNewHero() {
    selectedHero = faker.helpers.arrayElement(heroes);
  }

  const validItems = $derived(
    allItems
      .filter((item) => item.heroName == null || item.heroName == selectedHero.name)
      .filter((item) => item.cost <= availableCash),
  );
  const validPowers = $derived(allPowers.filter((power) => power.heroName == selectedHero.name));

  let selectedItemIndex: number = $state(Math.floor(Math.random() * validItems.length));
  let selectedPowerIndex: number = $state(Math.floor(Math.random() * validPowers.length));

  const selectedItem = $derived(validItems[selectedItemIndex]);
  const selectedPower = $derived(validPowers[selectedPowerIndex]);

  function selectHero(event: MouseEvent, hero: HeroData): void {
    event.preventDefault();

    selectedHero = hero;
    selectNewItem();
    selectNewPower();
  }

  function selectNewItem() {
    selectedItemIndex = Math.floor(Math.random() * validItems.length);
  }

  function selectNewPower() {
    selectedPowerIndex = Math.floor(Math.random() * validPowers.length);
  }
</script>

<Heroes onclick={selectHero} highlightedHero={selectedHero} />
<hr />
<button onclick={selectNewHero} class="button">Roll New Hero</button>

<h2>What is your budget?</h2>
<input type="number" class="form-input" bind:value={availableCash} />

<h2>Your random power is:</h2>
<Power power={selectedPower} full />

<button onclick={selectNewPower} class="button">Roll New Power</button>

<h2>Your random item is:</h2>
{#if selectedItem}
  <Item item={selectedItem} full />
  <p>If you can't find it, this item is in the <em>{selectedItem.category}</em> category</p>
{:else}
  <p>Could not find a valid item fitting your constraints.</p>
{/if}

<button onclick={selectNewItem} class="button">Roll New Item</button>

<style lang="scss">
  .button {
    margin-top: 0.5em;
  }

  hr {
    margin-top: 1em;
  }

  em {
    color: $color-text-titles;
    font-weight: bold;
    font-style: normal;
  }
</style>
