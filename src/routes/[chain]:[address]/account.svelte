<script context="module" lang="ts">
  export const prerender = true;
</script>

<script lang="ts">
  import { page } from '$app/stores';
  import { chain } from '$lib/store';
  import { toChecksumAddress } from '$lib/checksum';

  import AddressHeader from '$lib/AddressHeader.svelte';
  import Module from '$lib/Module.svelte';
  import AdminOf from '$lib/AdminOf.svelte';
  import OwnerOf from '$lib/OwnerOf.svelte';
  import MemberOf from '$lib/MemberOf.svelte';

  $: address = toChecksumAddress($page.params.address);
</script>

<svelte:head>
<title>Access Control Explorer - Account {address}</title>
<link rel="canonical" href="https://{$page.host}/{$chain.shortName}:{address}/account">
</svelte:head>

<AddressHeader {address} view="account" />

<div class="grid grid-cols-3 gap-2">
  <Module>
    <OwnerOf {address} />
  </Module>
  <Module>
    <MemberOf {address} />
  </Module>
  <Module>
    <AdminOf {address} />
  </Module>
</div>
