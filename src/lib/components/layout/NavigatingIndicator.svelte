<script>
  import { afterNavigate, beforeNavigate } from "$app/navigation";

  let navigating = $state(false);
  let done = $state(false);

  beforeNavigate(() => {
    navigating = true;
    done = false;
  });

  afterNavigate(({ from }) => {
    if (!from) return;

    navigating = false;
    done = true;

    setTimeout(() => {
      done = false;
    }, 200);
  });
</script>

<div class="bar" class:navigating class:done></div>

<style lang="scss">
  @use "sass:color";

  .bar {
    position: fixed;
    height: 0.25rem;
    width: 0;
    background: $primary;
    z-index: 10;
    animation: none;

    &::after {
      content: "";
      display: none;
      position: absolute;
      top: 0;
      right: 0;
      background: linear-gradient(
        to right,
        transparent,
        color.adjust($primary, $lightness: 30%, $saturation: 50%)
      );
      height: 100%;
      width: 2rem;
      filter: blur(5px);
    }
  }

  .navigating,
  .done {
    transition: width 200ms;

    &::after {
      display: block;
    }
  }

  @keyframes fake-load {
    0% {
      width: 0%;
    }

    1% {
      width: 20%;
    }

    100% {
      width: 80%;
    }
  }

  .navigating {
    animation: fake-load 20000ms linear;
  }

  .done {
    width: 100%;
  }
</style>
