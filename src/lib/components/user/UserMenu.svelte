<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import type { User } from "$lib/types/user";
  import { api } from "$lib/utils/api";
  import { getContext } from "svelte";

  const currentUser: User = getContext('currentUser');

  // This function is temporary, the log out will be moved to the /account page
  async function logout(event: MouseEvent) {
    event.preventDefault();

    await api<User>("logout");
    invalidateAll();
  }
</script>

<a href="/account" class="avatar" onclick={logout}>
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
