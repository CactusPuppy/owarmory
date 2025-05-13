<script lang="ts">
  const { text }: { text: string } = $props();
</script>

<h2>
  <div class="dash"></div>
  <span>{text}</span>
  <div class="dash"></div>
</h2>

<style lang="scss">
  h2 {
    display: flex;
    align-items: center;
    margin: 2rem 0 1rem;
    font-size: $font-size-h3;

    &:first-child {
      margin-top: 0;
    }
  }

  span {
    padding: 0 1rem;
  }

  .dash {
    height: 2px;
    width: 100%;
    background: $color-border;
  }
</style>
