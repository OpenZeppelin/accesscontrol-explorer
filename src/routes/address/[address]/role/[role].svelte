<script context="module" lang="ts">
  export const prerender = true;
</script>

<script lang="ts">
  import { gql, query } from '@urql/svelte';
  import { paginatedStore } from '$lib/paginated-store';
  import { page } from '$app/stores';
  import RoleInfo from '$lib/RoleInfo.svelte';

  $: address = $page.params.address;
  $: roleId = $page.params.role;
</script>

<svelte:head>
<title>Access Control Explorer - Address {address} - Role {roleId}</title>
</svelte:head>

<h1><a href="/address/{address}">{address}</a></h1>
<h2>{roleId}</h2>

<RoleInfo {address} {roleId} />
