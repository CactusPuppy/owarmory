<script>
  import Heroes from "$lib/components/content/Heroes.svelte";
  import Power from "$lib/components/content/Power.svelte";
  import Item from "$lib/components/content/Item.svelte";
	import BuildsList from "$lib/components/content/BuildsList.svelte";

  // Placeholder stuff
  const items = [{
    id: 1,
    name: "Some item",
    description: "I am some description of an item that will appear in the popover",
    icon: "https://picsum.photos/seed/a/40",
    rarity: "common",
    cost: 4000
  }, {
    id: 2,
    name: "Some item",
    description: "I am some description of an item that will appear in the popover",
    icon: "https://picsum.photos/seed/b/40",
    rarity: "rare",
    cost: 2000
  }, {
    id: 3,
    name: "Some item",
    description: "I am some description of an item that will appear in the popover",
    icon: "https://picsum.photos/seed/c/40",
    rarity: "epic",
    cost: 4000
  }]

  const powers = [{
    id: 1,
    name: "Some power",
    description: "I am some description of a power that will appear in the popover",
    icon: "https://picsum.photos/40"
  }]
</script>

<Heroes />

<BuildsList header="Latest Builds" />

<div class="block vertical-offset-large">
  <p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

  <div class="list">
    {#each items as item (item.id)}
      <Item {item} />
    {/each}
  </div>

  <div class="list">
    {#each powers as power (power.id)}
      <Power {power} />
    {/each}
  </div>
</div>

<style lang="scss">
  .list {
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
  }
</style>
