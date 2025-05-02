<script>
  import { SignIn } from "@auth/sveltekit/components";

  let loading = $state(false);
</script>

<SignIn provider="battlenet">
  {#snippet submitButton()}
    <!-- The wrapper already is a button, we can't have a button in a button -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="button" class:disabled={loading} onclick={() => (loading = true)}>
      {#if loading}
        Signing in...
      {:else}
        Sign in with Battle.net
      {/if}
    </div>
  {/snippet}
</SignIn>
