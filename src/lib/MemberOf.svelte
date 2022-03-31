<script lang="ts">
  import { paginatedStore, query } from '$lib/paginated-store';
  import LoadMore from '$lib/LoadMore.svelte';
  import Address from '$lib/Address.svelte';
  import Role from '$lib/Role.svelte';
  import TreeList, { TreeNode } from '$lib/TreeList.svelte';
  import { AccountMembershipDocument } from '$lib/subgraph/queries';

  export let address: string;

  $: queryResult = query(paginatedStore(AccountMembershipDocument, {
    address: address.toLowerCase(),
    limit: 100,
  }));

  let tree: TreeNode[] = [];

  $: {
    const map: Record<string, string[]> = {};

    for (const entry of $queryResult.data?.account?.membership ?? []) {
      const { contract, role } = entry.accesscontrolrole;
      (map[contract.id] ??= []).push(role.id);
    }

    tree = Object.entries(map).map(([address, roles]) => ({
      component: Address,
      props: { address, tab: 'contract', shorten: true },
      children: roles.map(roleId => ({
        component: Role,
        props: { address, roleId },
      })),
    }));
  };
</script>

<section>
  <h1 class="font-bold">Member of</h1>
  <TreeList values={tree} />
  <LoadMore store={queryResult} />
</section>
