<footer class="footer">
  <div class="content">
    <div>
      Join us on <a
        href="https://discord.gg/JNCx6U3g9F"
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
    padding: 1rem $gutter;
    background: rgba($color-bg-dark, 0.75);
    color: $color-text-alt;
    font-size: $font-size-small;

    @include breakpoint(tablet) {
      line-height: 1;
    }
  }

  .content {
    width: 100%;
    max-width: calc(map.get($breakpoints, page-max-width) + $gutter * 2);
    margin: 0 auto;

    @include breakpoint(tablet) {
      display: flex;
      justify-content: space-between;
    }
  }
</style>
