<script lang="ts">
  import { initClient } from '@urql/svelte';
  import { getClientOptions } from '$lib/urql-client';

  export let chain: string;

  initClient(getClientOptions(chain));
</script>

<slot />
