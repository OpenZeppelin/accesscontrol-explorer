<script context="module" lang="ts">
  export const prerender = true;
</script>

<script lang="ts">
  import { page } from '$app/stores';
  import RoleInfo from '$lib/RoleInfo.svelte';
  import Address from '$lib/Address.svelte';
  import Role from '$lib/Role.svelte';
  import { toChecksumAddress } from '$lib/checksum';

  $: address = toChecksumAddress($page.params.address);
  $: roleId = $page.params.role;
</script>

<svelte:head>
<title>Access Control Explorer - Address {address} - Role {roleId}</title>
</svelte:head>

<div class="flex flex-col gap-y-2">
  <h1 class="font-bold"><Role r={roleId} {address} /> @ <Address a={address} /></h1>
  <RoleInfo {address} {roleId} />
</div>
