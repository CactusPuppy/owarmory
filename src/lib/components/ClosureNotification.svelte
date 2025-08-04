<script lang="ts">
  import WarningIcon from "$lib/images/icons/warning.svelte";
</script>

<div class="closure-notification">
  <a href="/thank-you-whats-next" target="_blank" class="icon-container">
    <WarningIcon />
  </a>
  <div>
    <h3>OW Armory Is Shutting Down</h3>
    <p>
      Builds cannot be created or edited at this time. Your builds are being ported to
      stadiumbuilds.io and will not be lost. If you do not want your build to be ported, you may
      delete your post now to prevent that post from being transferred.<br />Thank you all for your
      support over the past few months.
    </p>
    <a href="/thank-you-whats-next" target="_blank"><button class="button">Read More</button></a>
  </div>
</div>

<style lang="scss">
  @use "sass:color";
  .closure-notification {
    gap: 1.5rem;
    align-items: center;
    margin-top: $vertical-offset-md;
    margin-bottom: calc($vertical-offset-md - $vertical-offset-large);
    padding: $gutter;
    border: 2px solid $primary;
    border-radius: $border-radius;
    background-color: color.adjust(color.change($primary, $alpha: 25%), $lightness: -25%);

    @include breakpoint(mobile) {
      display: flex;
    }

    .icon-container {
      display: flex;
      align-self: center;
      justify-content: center;
      width: calc($item-size * 2.5);
      height: calc($item-size * 2.5);
      flex-grow: 1;
      margin-bottom: 1rem;

      @include breakpoint(mobile) {
        margin-bottom: 0;
      }
    }

    h3 {
      margin-bottom: 0;
      margin-top: 0;
    }

    p {
      color: $color-text-alt;
    }
  }
</style>
