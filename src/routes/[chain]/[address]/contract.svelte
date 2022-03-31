<script context="module" lang="ts">
  export const prerender = true;
</script>

<script lang="ts">
  import { page } from '$app/stores';
  import { chain } from '$lib/store';
  import { toChecksumAddress } from '$lib/checksum';

  import AddressHeader from '$lib/AddressHeader.svelte';
  import Module from '$lib/Module.svelte';
  import OwnableDetails from '$lib/OwnableDetails.svelte';
  import AvailableRoles from '$lib/AvailableRoles.svelte';
  import ContractLogs from '$lib/ContractLogs.svelte';

  $: address = toChecksumAddress($page.params.address);
</script>

<svelte:head>
<title>Access Control Explorer - Contract {address}</title>
<link rel="canonical" href="https://{$page.host}/{$chain}/{address}/contract">
</svelte:head>

<AddressHeader {address} view="contract" />

<div class="grid grid-cols-2 gap-2">
  <Module>
    <OwnableDetails {address} />
  </Module>
  <Module>
    <AvailableRoles {address} />
  </Module>
</div>

<ContractLogs {address} />
