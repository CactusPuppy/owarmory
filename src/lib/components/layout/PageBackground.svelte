<script lang="ts">
  import { page } from "$app/state";
  import imageGladius from "$lib/images/backgrounds/gladius.webp";
  import imageDam from "$lib/images/backgrounds/dam.webp";
  import imageBusan from "$lib/images/backgrounds/busan.webp";
  import imageParis from "$lib/images/backgrounds/paris.webp";
  import seedrandom from "seedrandom";
  import { fade } from "svelte/transition";

  const backgrounds = [imageGladius, imageDam, imageBusan, imageParis];

  const seed = $derived(seedrandom(page.url.pathname));
  const background = $derived(backgrounds[Math.floor(seed() * backgrounds.length)]);
</script>

{#key background}
  <img
    src={background}
    alt=""
    out:fade={{ duration: 200 }}
    in:fade={{ duration: 200, delay: 100 }}
  />
{/key}

<style lang="scss">
  img {
    z-index: -10;
    position: absolute;
    width: 100%;
    height: auto;
    top: $navigation-height;
    left: 0;
    opacity: 0.15;
    filter: blur(10px);
    mask-image: linear-gradient(white, transparent);
  }
</style>
