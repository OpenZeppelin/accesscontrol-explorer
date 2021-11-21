<script context="module" lang="ts">
  export const prerender = true;
</script>

<script lang="ts">
  import { page } from '$app/stores';
  import AvailableRoles from '$lib/AvailableRoles.svelte';
  import MemberOf from '$lib/MemberOf.svelte';
  import Module from '$lib/Module.svelte';
  import { toChecksumAddress } from '$lib/checksum';

  $: address = toChecksumAddress($page.params.address);
</script>

<svelte:head>
<title>Access Control Explorer - Address {address}</title>
<link rel="canonical" href="https://{$page.host}/address/{address}">
</svelte:head>

<h1 class="font-bold mb-4">{address}</h1>

<div class="grid grid-cols-2 gap-2">
  <Module>
    <AvailableRoles address={address} />
  </Module>
  <Module>
    <MemberOf address={address} />
  </Module>
</div>
