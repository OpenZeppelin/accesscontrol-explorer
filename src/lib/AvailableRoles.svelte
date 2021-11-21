<script lang="ts">
  import { paginatedStore, query } from '$lib/paginated-store';
  import LoadMore from '$lib/LoadMore.svelte';
  import Role from '$lib/Role.svelte';
  import TreeList, { TreeNode } from '$lib/TreeList.svelte';
  import { AccountRolesDocument } from  '$lib/subgraph/queries';

  export let address: string;

  $: queryResult = query(paginatedStore(AccountRolesDocument, {
    address: address.toLowerCase(),
    limit: 100,
  }));

  let tree: TreeNode[] = [];

  $: {
    const root: TreeNode[] = [];
    const childrenMap: Record<string, TreeNode[]> = {};

    for (const { role, admin } of $queryResult.data?.account.asAccessControl?.roles ?? []) {
      const siblings: TreeNode[] = (role.id === admin.role.id ? root : (childrenMap[admin.role.id] ??= []));
      const children = (childrenMap[role.id] ??= []);
      const node = { component: Role, props: { r: role.id, address }, children };
      siblings.push(node);
    }

    tree = root;
  };
</script>

<section>
<h1 class="font-bold">Available Roles</h1>

{#if $queryResult.data?.account.asAccessControl}
  <TreeList values={tree} />
{:else if $queryResult.data}
  <p>Not an AccessControl contract.</p>
{/if}

<LoadMore store={queryResult} />
</section>
