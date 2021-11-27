<script context="module" lang="ts">
  export const prerender = true;
</script>

<script lang="ts">
  import { page } from '$app/stores';
  import { toChecksumAddress } from '$lib/checksum';
  import AvailableRoles from '$lib/AvailableRoles.svelte';
  import Module from '$lib/Module.svelte';
  import AddressHeader from '$lib/AddressHeader.svelte';
  import ContractLogs from '$lib/ContractLogs.svelte';

  $: address = toChecksumAddress($page.params.address);
</script>

<svelte:head>
<title>Access Control Explorer - Contract {address}</title>
<link rel="canonical" href="https://{$page.host}/contract/{address}">
</svelte:head>

<AddressHeader {address} view="contract" />

<div class="grid grid-cols-2 gap-2">
  <Module>
    <AvailableRoles {address} />
  </Module>
</div>

<ContractLogs {address} />
