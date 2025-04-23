<script lang="ts">
  import imageGladius from "$lib/images/backgrounds/gladius.webp"
</script>

<img src={imageGladius} alt="" />

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
