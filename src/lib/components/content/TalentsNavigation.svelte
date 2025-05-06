<script>
  import { page } from "$app/state";
</script>

<nav class="navigation">
  <a href="/items" class="button button--secondary" class:active={page.url.pathname === "/items"}>
    All items
  </a>

  <a href="/powers" class="button button--secondary" class:active={page.url.pathname === "/powers"}>
    All powers
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
