<script lang="ts">
  import { paginatedStore, query } from '$lib/paginated-store';
  import { RoleInfoDocument } from '$lib/subgraph/queries';
  import LoadMore from '$lib/LoadMore.svelte';
  import Role from '$lib/Role.svelte';
  import Module from './Module.svelte';
  import Address from './Address.svelte';

  export let address: string;
  export let roleId: string;

  $: role = query(paginatedStore(RoleInfoDocument, {
    id: `${address.toLowerCase()}/${roleId}`,
    limit: 100,
  }));

</script>

<p>
  Admin: 
  {#if $role.data}
    <Role r={$role.data.accessControlRole.admin.role.id} {address} />
  {/if}
</p>

<Module title="Admin of">
  <ul>
  {#if $role.data}
    {#each $role.data?.accessControlRole.adminOf as { role: other }}
      <li><Role r={other.id} {address} /></li>
    {/each}
  {/if}
  </ul>
  <LoadMore store={role} />
</Module>


