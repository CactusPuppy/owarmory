<script lang="ts">
  import { afterNavigate, goto } from "$app/navigation";
  import { page } from "$app/state";
  import iconSearch from "$lib/images/icons/search.svg";

  let query = $state(page.url.searchParams.get("query") || "");
  let input: HTMLInputElement | null = $state(null);

  afterNavigate(() => {
    // Keep focus after submiting form
    if (query && input) input.focus();
  });

  function submit(event: SubmitEvent): void {
    event.preventDefault();

    if (!query) return;

    goto(`/search?query=${query}`);
  }
</script>

<form action="/search" method="GET" onsubmit={submit}>
  <input
    class="form-input"
    type="search"
    id="query"
    name="query"
    aria-label="Search"
    autocomplete="off"
    placeholder="Search..."
    bind:value={query}
    bind:this={input}
  />

  <button class="submit" type="submit">
    <img src={iconSearch} alt="Search" width="24" height="24" />
  </button>
</form>

<style lang="scss">
  @use "sass:color";

  form {
    position: relative;
    width: 100%;
  }

  .form-input {
    width: 100%;
    background: color.adjust($color-bg-base, $lightness: 7.5);
  }

  .submit {
    display: flex;
    align-items: center;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    padding: 0 0.5rem;

    &:hover {
      filter: brightness(100);
    }
  }
</style>
