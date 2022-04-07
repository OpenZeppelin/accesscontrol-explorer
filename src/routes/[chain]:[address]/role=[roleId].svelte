<script context="module" lang="ts">
  export const prerender = true;
</script>

<script lang="ts">
  import { page } from '$app/stores';
  import { chain } from '$lib/store';
  import { toChecksumAddress } from '$lib/checksum';

  import AddressHeader from '$lib/AddressHeader.svelte';
  import Module from '$lib/Module.svelte';
  import AvailableRoles from '$lib/AvailableRoles.svelte';
  import RoleMembers from '$lib/RoleMembers.svelte';

  $: address = toChecksumAddress($page.params.address);
  $: roleId = $page.params.roleId;
</script>

<svelte:head>
<title>Access Control Explorer - Address {address} - Role {roleId}</title>
<link rel="canonical" href="https://{$page.host}/{$chain.shortName}:{address}/role={roleId}">
</svelte:head>

<AddressHeader {address} view="contract" />

<div class="grid grid-cols-2 gap-2">
  <Module>
    <AvailableRoles {address} focus={roleId} />
  </Module>
</div>

<RoleMembers {address} {roleId} />
