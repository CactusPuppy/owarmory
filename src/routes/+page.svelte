<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<style lang="scss">
  p {
    a {
      color: $primary;
      content: returnTheThing();

      @include breakpoint(tablet) {
        color: blue;
      }
    }
  }
</style>
