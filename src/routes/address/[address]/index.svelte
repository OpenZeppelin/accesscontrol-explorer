<script context="module" lang="ts">
  export const prerender = true;
</script>

<script lang="ts">
  import { page } from '$app/stores';
  import AvailableRoles from '$lib/AvailableRoles.svelte';
  import MemberOf from '$lib/MemberOf.svelte';
  import { toChecksumAddress } from '$lib/checksum';

  $: address = toChecksumAddress($page.params.address);
</script>

<svelte:head>
<title>Access Control Explorer - Address {address}</title>
<link rel="canonical" href="https://{$page.host}/address/{address}">
</svelte:head>

<h1 class="font-bold mb-4">{address}</h1>

<div class="grid grid-cols-2 gap-2">
  <div class="border-2 border-gray-100 bg-gray-50 p-2 rounded">
    <AvailableRoles address={address} />
  </div>
  <div class="border-2 border-gray-100 bg-gray-50 p-2 rounded">
    <MemberOf address={address} />
  </div>
</div>
