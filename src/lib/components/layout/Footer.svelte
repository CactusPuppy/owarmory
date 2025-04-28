<footer class="footer">
  <div>
    Join us on <a
      href="discord-link"
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Discord (opens in new tab)">Discord</a
    >
  </div>

  <div>
    <a href="/privacy">Privacy</a> | Contribute on
    <a
      href="https://github.com/CactusPuppy/owarmory/"
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Github (opens in new tab)">GitHub</a
    >
  </div>
</footer>

<style lang="scss">
  @use "sass:map";

  a {
    color: $color-text-alt;

    &:hover {
      color: $white;
    }
  }

  .footer {
    max-width: calc(map.get($breakpoints, page-max-width) + $gutter * 2);
    padding: 0.75rem $gutter;
    margin: $vertical-offset-large auto 0;
    color: $color-text-alt;
    font-size: $font-size-small;

    @include breakpoint(tablet) {
      display: flex;
      justify-content: space-between;
    }
  }
</style>
