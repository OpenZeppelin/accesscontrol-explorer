<script lang="ts">
  import { paginatedStore, query } from '$lib/paginated-store';
  import { RoleInfoDocument, RoleMembersDocument } from '$lib/subgraph/queries';
  import LoadMore from '$lib/LoadMore.svelte';
  import Role from '$lib/Role.svelte';
  import Module from './Module.svelte';
  import Address from './Address.svelte';

  export let address: string;
  export let roleId: string;

  $: members = query(paginatedStore(RoleMembersDocument, {
    id: `${address.toLowerCase()}/${roleId}`,
    limit: 10,
  }));
</script>

<section>
<h1 class="font-bold text-lg mb-2">Members</h1>
<ul>
{#if $members.data}
  {#each $members.data?.accessControlRole.members as { account: { id: address } }}
    <li><Address {address} /></li>
  {:else}
    <li>None</li>
  {/each}
{/if}
</ul>
<LoadMore store={members} />
</section>
