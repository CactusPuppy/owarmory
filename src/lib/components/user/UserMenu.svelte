<script lang="ts">
  import type { User } from "$src/generated/prisma";
  import { cleanName } from "$src/lib/utils/user";
  import { getContext } from "svelte";
  import iconUser from "$lib/images/icons/user.svg";

  const currentUser: User = getContext("currentUser");
</script>

<div class="user">
  <span class="user__desktop">
    Signed in as <a href="/account">{cleanName(currentUser.name!)}</a>
  </span>

  <a href="/account" class="user__mobile">
    <img src={iconUser} alt={currentUser.name} height="40" width="40" />
  </a>
</div>

<style lang="scss">
  a {
    font-family: $font-stack-brand;
  }

  .user {
    white-space: nowrap;
    font-size: $font-size-small;
  }

  .user__mobile {
    display: flex;
    align-items: center;

    &:hover,
    &:active {
      filter: brightness(100);
    }

    @include breakpoint(tablet) {
      display: none;
    }
  }

  .user__desktop {
    display: none;

    @include breakpoint(tablet) {
      display: block;
    }
  }
</style>
