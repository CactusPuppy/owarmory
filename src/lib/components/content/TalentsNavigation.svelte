<script>
  import { page } from "$app/state";

  const { prefix = "" } = $props();
</script>

<nav class="navigation">
  <a
    href={`${prefix}/items`}
    class="button button--secondary"
    class:active={page.url.pathname === "/items"}
  >
    All Items
  </a>

  <a
    href={`${prefix}/powers`}
    class="button button--secondary"
    class:active={page.url.pathname === "/powers"}
  >
    All Powers
  </a>
</nav>

<style lang="scss">
  .navigation {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
  }

  .button {
    width: 100%;
    text-align: center;
  }

  .active {
    background: $secondary;
    color: $white;
    border-color: transparent;
  }
</style>
