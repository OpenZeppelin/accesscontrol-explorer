<script lang="ts">
  import { paginatedStore, query } from '$lib/paginated-store';
  import LoadMore from '$lib/LoadMore.svelte';
  import RoleTreeNode from '$lib/RoleTreeNode.svelte';
  import TreeList, { TreeNode } from '$lib/TreeList.svelte';
  import { AccountRolesDocument } from  '$lib/subgraph/queries';

  export let address: string;
  export let focus: string | undefined = undefined;

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
      const focused = role.id === focus;
      const node = { component: RoleTreeNode, props: { r: role.id, address, focused }, children };
      siblings.push(node);
    }

    tree = root;
  };
</script>

<section>
{#if $queryResult.data?.account.asAccessControl}
  <TreeList values={tree} />
{:else if $queryResult.data}
  <p>Not an AccessControl contract.</p>
{/if}

<LoadMore store={queryResult} />
</section>
