<script lang="ts">
  import WithClientInner from './WithClientInner.svelte';

  export let chain: string;
</script>

{#key chain}
<WithClientInner {chain}>
  <slot />
</WithClientInner>
{/key}
