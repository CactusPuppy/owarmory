<script lang="ts">
  import { SignIn } from "@auth/sveltekit/components";
  import type { Snippet } from "svelte";

  interface Props {
    secondary?: boolean;
    children?: Snippet;
  }

  const { secondary = false, children }: Props = $props();

  let loading = $state(false);
</script>

<SignIn provider="battlenet">
  {#snippet submitButton()}
    <!-- The wrapper already is a button, we can't have a button in a button -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="wrapper" onclick={() => (loading = true)}>
      <div class="button" class:button--secondary={secondary} class:disabled={loading}>
        {#if loading}
          Signing in...
        {:else if children}
          {@render children()}
        {:else}
          Sign in <span class="desktop">with Battle.net</span>
        {/if}
      </div>
    </div>
  {/snippet}
</SignIn>

<style lang="scss">
  .desktop {
    display: none;

    @include breakpoint(tablet) {
      display: inline;
    }
  }
</style>
