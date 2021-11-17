<script lang="ts">
  import { gql, query } from '@urql/svelte';
  import { paginatedStore } from '$lib/paginated-store';
  import LoadMore from '$lib/LoadMore.svelte';

  export let address: string;
  export let roleId: string;

  const role = paginatedStore(gql`
    query ($id: String, $limit: Int, $offset: Int) {
      accessControlRole(id: $id) {
        id
        admin {
          role { id }
        }
        adminOf(first: $limit, skip: $offset) {
          role { id }
        }
      }
    }
  `, {
    id: `${address.toLowerCase()}/${roleId}`,
    limit: 100,
  });

  $: console.log($role);

  query(role);
</script>

{#if $role.data?.accessControlRole}
  Admin: {$role.data.accessControlRole.admin.role.id}
{/if}

<h1>Admin of</h1>

<h1>Members</h1>


<LoadMore store={role} />
