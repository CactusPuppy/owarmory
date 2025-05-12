<script lang="ts">
  import { page } from "$app/state";
</script>

<div class="full-page">
  <main>
    <h1 class="error-title">{page.status}</h1>
    <p class="error-message">{page.error?.message}</p>
    <p class="home-button"><a href="/" class="button">Back to Home</a></p>
  </main>
</div>

<style lang="scss">
  .full-page {
    width: 100dvw;
    height: 100dvh;
    align-content: center;
  }

  .error-title {
    margin-top: 0;
    margin-bottom: 1rem;
    text-align: center;
  }

  .error-message {
    text-align: center;
    font-weight: bold;
    font-size: 1.25rem;
  }

  .home-button {
    margin-top: 2rem;
    text-align: center;
    box-sizing: border-box;
  }
</style>
