<script lang="ts">
  import { afterNavigate, goto } from "$app/navigation";
  import { page } from "$app/state";

  let query = $state(page.url.searchParams.get("query") || "");
  let input: HTMLInputElement | null = $state(null);

  afterNavigate(() => {
    // Keep focus after submiting form
    if (query && input) input.focus();
  });

  function submit(event: KeyboardEvent): void {
    if (event.key !== "Enter") return;

    event.preventDefault();

    if (!query) return;

    goto(`/search?query=${query}`);
  }
</script>

<form action="/search" method="GET">
  <input
    class="form-input"
    type="search"
    id="query"
    name="query"
    aria-label="Search"
    autocomplete="off"
    bind:value={query}
    bind:this={input}
    onkeydown={submit}
  />
</form>
