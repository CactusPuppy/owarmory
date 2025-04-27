<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import type { User } from "$lib/types/user";
  import { api } from "$lib/utils/api";

  async function logout() {
    await api<User>("logout");
    invalidateAll();
  }
</script>

<button class="button" onclick={logout}>
  Logout
</button>
