<script lang="ts">
  import { chain } from '$lib/store';
  import EtherscanLink from '$lib/EtherscanLink.svelte';

  export let address: string;
  export let view: 'account' | 'contract';
</script>

<header class="flex gap-x-2 text-lg items-baseline">
  <a class:selected={view === 'account'} href="/{$chain}/{address}/account">Account</a>
  <span>·</span>
  <a class:selected={view === 'contract'} href="/{$chain}/{address}/contract">Contract</a>

  <h2 class="flex-grow text-right text-base text-gray-500 font-mono">{address} <EtherscanLink page="/address/{address}"/></h2>
</header>

<style lang="css">
  header a.selected {
    font-weight: bold;
  }
</style>