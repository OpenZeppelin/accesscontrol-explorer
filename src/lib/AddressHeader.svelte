<script lang="ts">
  import EtherscanLink from '$lib/EtherscanLink.svelte';

  export let address: string;
  export let view: 'contract' | 'account';
</script>

<header class="flex gap-x-2 text-lg items-baseline">
  {#if view === 'contract'}
  <h1 class="font-bold">
  <a href="/contract/{address}">Contract</a>
  </h1>
  {:else}
  <a href="/contract/{address}">Contract</a>
  {/if}

  <span>·</span>

  {#if view === 'account'}
  <h1 class="font-bold">
  <a href="/account/{address}">Account</a>
  </h1>
  {:else}
  <a href="/account/{address}">Account</a>
  {/if}

  <h2 class="flex-grow text-right text-base text-gray-500 font-mono">{address} <EtherscanLink page="/address/{address}"/></h2>
</header>
