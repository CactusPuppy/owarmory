<script lang="ts">
  import imageLogo from "$lib/images/logo.webp"
	import UserMenu from "$lib/components/user/UserMenu.svelte";
</script>

<nav>
  <div class="content">
    <a href="/" class="logo">
      <img src={imageLogo} height="64" width="175" alt="OW Armory" />
    </a>

    <UserMenu />
  </div>
</nav>

<style lang="scss">
  @use "sass:map";

  // Create a gradient background to fills the available space, always leaving an opaque block of at least page-max-width
  // For instance if a screen width is 2000px the gradient is [transparent to opaque for 400px][opaque for 1200px][opaque to transparent for 400px]
  // If the screen width is smaller than page-max-width the background is always fully opaque.
  // Convoluted? Maybe. Neat? I think so!
  $opaque-width: min(map.get($breakpoints, page-max-width), 100%);
  $fade-width: max((100vw - map.get($breakpoints, page-max-width)) / 2, 0px);
  $start-opaque: $fade-width;
  $end-opaque: calc($start-opaque + $opaque-width);

  nav {
    height: $navigation-height;
    background: rgba($color-bg-dark, 0.5);
    mask-image: linear-gradient(
      to right,
      transparent,
      white $start-opaque,
      white $end-opaque,
      transparent
    );
  }

  .content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    max-width: calc(map.get($breakpoints, page-max-width) + ($gutter * 2));
    padding: 0 $gutter;
    margin: 0 auto;
  }

  .logo {
    &:hover {
      filter: brightness(1.2);

    }
    img {
      display: block;
    }
  }
</style>
