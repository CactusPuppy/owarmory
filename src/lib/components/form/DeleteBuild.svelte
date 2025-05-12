<script lang="ts">
  import { goto } from "$app/navigation";
  import type { FullStadiumBuild } from "$src/lib/types/build";
  import { api } from "$src/lib/utils/api";

  const { build }: { build: FullStadiumBuild } = $props();

  let confirmationShowing = $state(false);
  let loading = $state(false);

  async function deleteBuild(): Promise<void> {
    try {
      loading = true;

      await api("/build/form", {}, null, {
        method: "DELETE",
        body: JSON.stringify({ id: build.id }),
      });

      goto("/");
    } catch {
      alert("Something went wrong, please try again");
      loading = false;
    }
  }
</script>

<div class="danger-zone">
  <h4>Remove this build</h4>
  <p>
    Removing this build will remove it and all associations to it. <strong
      >This can not be undone</strong
    >.
  </p>

  {#if confirmationShowing}
    <button class="button" onclick={deleteBuild}>
      {#if loading}
        Removing...
      {:else}
        Confirm
      {/if}
    </button>

    <button class="button button--secondary" onclick={() => (confirmationShowing = false)}
      >Cancel</button
    >
  {:else}
    <button class="button button--danger" onclick={() => (confirmationShowing = true)}
      >Remove build</button
    >
  {/if}
</div>

<style lang="scss">
  h4 {
    margin: 0;
    color: $red;
  }

  p {
    margin: 0.75rem 0 1rem 0;
    color: $color-text-alt;
  }

  .danger-zone {
    max-width: 20rem;
    padding: 1rem;
    margin-top: 3rem;
    border-radius: $border-radius-small;
    border: 2px solid $red;
  }
</style>
