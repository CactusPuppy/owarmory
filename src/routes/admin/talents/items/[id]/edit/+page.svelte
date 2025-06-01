<script lang="ts">
  import type { Item } from "$src/generated/prisma";

  const { data } = $props();
  const { item }: { item: Item } = data;
</script>

<h1>Test: {item.name}</h1>
