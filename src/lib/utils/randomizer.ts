import type { Item } from "$src/generated/prisma";
import { SimpleFaker } from "@faker-js/faker";
import { ItemRarity, type FullItem } from "../types/build";

const RarityPriorityOrder = [ItemRarity.Epic, ItemRarity.Rare, ItemRarity.Common];

export function selectItems(
  budget: number,
  availableItems: FullItem[],
  randomizer: SimpleFaker,
): FullItem[] {
  const selectedItemIds: Set<Item["id"]> = new Set();
  const selectedItems: FullItem[] = [];
  const remainingItems = () => availableItems.filter((item) => !selectedItemIds.has(item.id));
  let remainingBudget = budget;
  for (const rarity of RarityPriorityOrder) {
    while (remainingItems().some((item) => isItemEligible(item, rarity, remainingBudget))) {
      const selectedItem = randomizer.helpers.arrayElement(
        remainingItems().filter((item) => isItemEligible(item, rarity, remainingBudget)),
      );
      selectedItemIds.add(selectedItem.id);
      selectedItems.push(selectedItem);
      remainingBudget -= selectedItem.cost;
    }
  }
  return selectedItems;
}

function isItemEligible(item: Item, rarity: ItemRarity, budget: number): boolean {
  return item.rarity === rarity && item.cost <= budget;
}
