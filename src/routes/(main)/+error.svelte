<script lang="ts">
  import { page } from "$app/state";
</script>

<h1 class="error-title">{page.status}</h1>
<p class="error-message">{page.error?.message}</p>

<style lang="scss">
  .error-title {
    text-align: center;
  }

  .error-message {
    text-align: center;
  }
</style>
