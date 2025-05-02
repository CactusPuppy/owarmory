<script lang="ts">
  import { getContext } from "svelte";
  import SignInButton from "../auth/SignInButton.svelte";

  const currentUser = getContext("currentUser");
</script>

{#if currentUser}
  <a href="/build/new" class="button">Create build</a>
{:else}
  <SignInButton>Create build</SignInButton>
{/if}
