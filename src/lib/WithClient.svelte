<script lang="ts">
  import type { Chain } from '$lib/chains';
  import WithClientInner from './WithClientInner.svelte';

  export let chain: Chain;
</script>

{#key chain}
<WithClientInner {chain}>
  <slot />
</WithClientInner>
{/key}
