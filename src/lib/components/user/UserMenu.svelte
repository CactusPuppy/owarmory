<script lang="ts">
  import type { User } from "$src/generated/prisma";
  import { getContext } from "svelte";

  const currentUser: User = getContext("currentUser");
</script>

<div class="user">
  Signed in as <a href="/account">{currentUser.name}</a>
</div>

<style lang="scss">
  a {
    font-family: $font-stack-brand;
  }

  .user {
    white-space: nowrap;
    font-size: $font-size-small;
  }
</style>
