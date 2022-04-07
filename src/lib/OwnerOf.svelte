<script lang="ts">
  import { paginatedStore, query } from '$lib/paginated-store';
  import LoadMore from '$lib/LoadMore.svelte';
  import Address from '$lib/Address.svelte';
  import TreeList from '$lib/TreeList.svelte';
  import type { TreeNode } from '$lib/TreeList.svelte';
  import { AccountOwnerOfDocument } from '$lib/subgraph/queries';

  export let address: string;

  $: queryResult = query(paginatedStore(AccountOwnerOfDocument, {
    address: address.toLowerCase(),
    limit: 10,
  }));

  let tree: TreeNode[] = [];

  $: {
    tree = ($queryResult.data?.account?.ownerOf ?? []).map(({ id }) => ({
      component: Address,
      props: { address: id, tab: 'contract', shorten: true },
    }));
  };
</script>

<section>
  <h1 class="font-bold">Owner of</h1>
  <TreeList values={tree} />
  <LoadMore store={queryResult} />
</section>
