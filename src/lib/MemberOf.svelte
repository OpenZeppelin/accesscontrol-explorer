<script lang="ts">
  import { gql, query } from '@urql/svelte';
  import { paginatedStore } from '$lib/paginated-store';
  import LoadMore from '$lib/LoadMore.svelte';
  import Address from '$lib/Address.svelte';
  import Role from '$lib/Role.svelte';
  import TreeList, { TreeNode } from './TreeList.svelte';

  export let address: string;

  const queryResult = paginatedStore(gql`
    query ($address: String, $limit: Int, $offset: Int) {
      account(id: $address) {
        id
        membership(skip: $offset, first: $limit) {
          id
          accesscontrolrole {
            id
            contract { id }
            role { id }
          }
        }
      }
    }
  `, {
    address: address.toLowerCase(),
    limit: 100,
  });

  let tree: TreeNode[] = [];

  $: {
    const map: Record<string, string[]> = {};

    for (const entry of $queryResult.data?.account.membership ?? []) {
      const { contract, role } = entry.accesscontrolrole;
      (map[contract.id] ??= []).push(role.id);
    }

    tree = Object.entries(map).map(([a, roles]) => ({
      component: Address,
      props: { a },
      children: roles.map(r => ({
        component: Role,
        props: { r, address: a },
      })),
    }));
  };

  query(queryResult);
</script>

<section>
<h1 class="font-bold">Member of</h1>

<TreeList values={tree} />

<LoadMore store={queryResult} />
</section>
