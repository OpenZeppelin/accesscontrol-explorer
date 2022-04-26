<script lang="ts">
  import { paginatedStore, query } from '$lib/paginated-store';
  import { AccountAdminDocument } from  '$lib/subgraph/queries';
  import Address from '$lib/Address.svelte';

  export let address: string;

  $: queryResult = query(paginatedStore(AccountAdminDocument, {
    address: address.toLowerCase(),
    limit: 100,
  }));
</script>

<section>
  {#if $queryResult.data?.account?.asOwnable}
    <h1 class="font-bold">Owner</h1>
    <Address address={$queryResult.data.account.asOwnable.owner.id} shorten />
  {:else if $queryResult.data}
    <p>Not an Ownable contract.</p>
  {/if}

  {#if $queryResult.data?.account?.erc1967Admin}
    <h1 class="font-bold">ERC1967 admin</h1>
    <Address address={$queryResult.data.account.erc1967Admin.id} shorten />
  {:else if $queryResult.data}
    <p>Not an ERC1967 contract.</p>
  {/if}
</section>
