<script context="module" lang="ts">
  export const prerender = true;
</script>

<script lang="ts">
  import { page } from '$app/stores';
  import RoleMembers from '$lib/RoleMembers.svelte';
  import Address from '$lib/Address.svelte';
  import Role from '$lib/Role.svelte';
  import Module from '$lib/Module.svelte';
  import AvailableRoles from '$lib/AvailableRoles.svelte';
  import Tabs from '$lib/Tabs.svelte';
  import { toChecksumAddress } from '$lib/checksum';

  $: address = toChecksumAddress($page.params.address);
  $: roleId = $page.params.roleId;
</script>

<svelte:head>
<title>Access Control Explorer - Address {address} - Role {roleId}</title>
</svelte:head>

<Tabs {address} view="contract" />

<div class="grid grid-cols-2 gap-2">
  <Module>
    <AvailableRoles {address} focus={roleId} />
  </Module>
</div>

<RoleMembers {address} {roleId} />
