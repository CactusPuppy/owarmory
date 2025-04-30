<script lang="ts">
  import type { User } from "$src/generated/prisma";
  import { getContext } from "svelte";

  const currentUser: User = getContext("currentUser");
</script>

<a href="/account" class="avatar">
  <img src="//:0" alt={currentUser.username} height="64" width="64" />
</a>

<style lang="scss">
  .avatar {
    height: 4rem;
    width: 4rem;
    border-radius: 50%;
    border: 2px solid $white;
    background: $color-bg-dark;
    color: $color-text-base;
    text-decoration: none;
    overflow: hidden;

    &:hover {
      filter: brightness(1.2);
    }

    img {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 50%;
      width: 100%;
      height: auto;
      background: $color-bg-dark;
    }
  }
</style>
