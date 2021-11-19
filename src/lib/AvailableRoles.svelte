<script lang="ts">
  import { gql, query } from '@urql/svelte';
  import { paginatedStore } from '$lib/paginated-store';
  import LoadMore from '$lib/LoadMore.svelte';
  import Role from '$lib/Role.svelte';
  import TreeList, { TreeNode } from './TreeList.svelte';

  export let address: string;

  const queryResult = paginatedStore(gql`
    query ($address: String, $limit: Int, $offset: Int) {
      account(id: $address) {
        id
        asAccessControl {
          id
          roles(first: $limit, skip: $offset) {
            id
            role { id }
            admin {
              id
              role { id }
            }
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
    const root: TreeNode[] = [];
    const childrenMap: Record<string, TreeNode[]> = {};

    for (const { role, admin } of $queryResult.data?.account.asAccessControl.roles ?? []) {
      console.log(role.id, admin.role.id);
      const siblings: TreeNode[] = (role.id === admin.role.id ? root : (childrenMap[admin.role.id] ??= []));
      const children = (childrenMap[role.id] ??= []);
      const node = { component: Role, props: { r: role.id }, children };
      siblings.push(node);
    }

    tree = root;
  };

  query(queryResult);
</script>

<section>
<h1 class="font-bold">Available Roles</h1>

<TreeList values={tree} />

<LoadMore store={queryResult} />
</section>
