<script lang="ts">
  import { getContext } from "svelte";
  import SignInButton from "../auth/SignInButton.svelte";

  const currentUser = getContext("currentUser");
</script>

{#if currentUser}
  <a href="/build/new" class="button">
    <span class="mobile" aria-label="Create build">+</span>
    <span class="desktop">Create build</span>
  </a>
{:else}
  <SignInButton>
    <span class="mobile" aria-label="Create build">+</span>
    <span class="desktop">Create build</span>
  </SignInButton>
{/if}

<style lang="scss">
  .mobile {
    @include breakpoint(tablet) {
      display: none;
    }
  }

  .desktop {
    display: none;

    @include breakpoint(tablet) {
      display: block;
    }
  }
</style>
