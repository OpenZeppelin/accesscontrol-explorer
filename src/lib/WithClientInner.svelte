<script lang="ts">
  import type { Chain } from '$lib/chains';
  import { initClient } from '@urql/svelte';
  import { getClientOptions } from '$lib/urql-client';

  export let chain: Chain;

  initClient(getClientOptions(chain));
</script>

<slot />
