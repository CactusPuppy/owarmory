<script lang="ts">
  import iconCurrency from "$lib/images/icons/currency.svg";

  interface Props {
    scale?: number;
  }

  const { scale = 1 }: Props = $props();
</script>

<img class="icon" src={iconCurrency} alt="$" height={18 * scale} width={22 * scale} />

<style lang="scss">
  .icon {
    display: inline-block;
  }
</style>
