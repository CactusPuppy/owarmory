<script lang="ts">
  import { enhance } from "$app/forms";
  import { DefaultStatIconPath } from "$src/lib/constants/stats.js";
  import { ItemCategory, ItemRarity, type FullItem } from "$src/lib/types/build.js";

  const { data, form } = $props();
  const { item }: { item: FullItem } = data;
</script>

<h1>Editing {item.name}</h1>

<form method="POST" use:enhance>
  {#if form?.success}
    <p class="success">Item updated successfully</p>
  {/if}
  {#if form?.error}
    <p class="error">{form.error}</p>
  {/if}
  <label class="form-label">
    Name
    <input name="name" type="text" class="form-input" value={item.name} />
  </label>

  <label class="form-label">
    Is Removed
    <input name="removed" type="checkbox" checked={item.removed} />
  </label>

  <label class="form-label">
    Category
    <select name="category" value={item.category} class="form-input">
      {#each Object.values(ItemCategory) as category (category)}
        <option value={category}>{category}</option>
      {/each}
    </select>
  </label>

  <label class="form-label">
    Rarity
    <select name="rarity" class="form-input" value={item.rarity}>
      {#each Object.values(ItemRarity) as rarity (rarity)}
        <option value={rarity}>{rarity}</option>
      {/each}
    </select>
  </label>

  <label class="form-label">
    Cost
    <input name="cost" type="number" class="form-input" value={item.cost} />
  </label>

  <label class="form-label">
    Icon URL
    <input name="iconURL" type="text" class="form-input" value={item.iconURL ?? ""} />
  </label>

  <label class="form-label">
    Description
    <textarea name="description" value={item.description} class="form-textarea"></textarea>
  </label>

  <div class="form-group stat-mods">
    <span class="form-label">Stat Mods</span>
    {#each item.statMods.sort((a, b) => a.orderIndex - b.orderIndex) as mod (mod.id)}
      <div class="stat-mod">
        <img src={mod.stat.iconURL ?? DefaultStatIconPath} alt="" width="18" height="18" />
        <!-- eslint-disable-next-line svelte/no-useless-mustaches -->
        {mod.stat.name}:{" "}
        <input
          name={`statModAmount-${mod.orderIndex}`}
          type="number"
          class="form-input"
          value={mod.amount}
        />
        {mod.isPercentage ? "%" : ""}
      </div>
    {/each}
  </div>

  <button class="button" type="submit">Save</button>
</form>

<style lang="scss">
  @use "sass:color";
  form {
    & > label {
      margin-bottom: 1rem;
    }
  }
  .stat-mods {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  .stat-mod {
    display: flex;
    align-items: center;
    white-space: pre;
    font-weight: bold;
    color: $white;

    & input[type="number"] {
      width: min-content;
    }
  }

  .success {
    background-color: $green;
    color: $white;
    font-weight: bold;
    padding: 1em;
    border-radius: $border-radius-small;
  }
  .error {
    background-color: $red;
    color: $white;
    font-weight: bold;
    padding: 1em;
    border-radius: $border-radius-small;
  }
</style>
