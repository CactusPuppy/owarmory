<script lang="ts">
  import imageLogo from "$lib/images/logo.webp";
  import imageLogoSmall from "$lib/images/logo-small.webp";
  import UserMenu from "$lib/components/user/UserMenu.svelte";
  import { getContext } from "svelte";
  import SignInButton from "$lib/components/auth/SignInButton.svelte";
  import Search from "$src/lib/components/layout/Search.svelte";
  import CreateBuildButton from "../content/CreateBuildButton.svelte";

  const currentUser = getContext("currentUser");
</script>

<nav>
  <div class="content">
    <a href="/" class="logo">
      <img class="logo__desktop" src={imageLogo} height="64" width="175" alt="OW Armory" />
      <img class="logo__mobile" src={imageLogoSmall} height="50" width="47" alt="OW Armory" />
    </a>

    <Search />

    <div class="actions">
      {#if currentUser}
        <UserMenu />
      {:else}
        <SignInButton secondary />
      {/if}

      <CreateBuildButton />
    </div>
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
    background: rgba($color-bg-dark, 0.75);
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
    gap: 1rem;
    height: 100%;
    max-width: calc(map.get($breakpoints, page-max-width) + ($gutter * 2));
    padding: 0 1rem;
    margin: 0 auto;

    @include breakpoint(mobile) {
      padding: 0 $gutter;
    }

    @include breakpoint(desktop) {
      gap: 3rem;
    }
  }

  .logo {
    &:hover {
      filter: brightness(1.2);
    }
  }

  .logo__mobile {
    display: block;

    @include breakpoint(tablet) {
      display: none;
    }
  }

  .logo__desktop {
    display: none;

    @include breakpoint(tablet) {
      display: block;
    }
  }

  .actions {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
</style>
