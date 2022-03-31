<script lang="ts">
  import humanizeDuration from 'humanize-duration';
  import { paginatedStore, query } from "./paginated-store";
  import { ContractLogsDocument } from "./subgraph/queries";
  import LoadMore from "$lib/LoadMore.svelte";
  import Role from "$lib/Role.svelte";
  import HumanTime from "$lib/HumanTime.svelte";
  import Address from '$lib/Address.svelte';
  import EtherscanLink from '$lib/EtherscanLink.svelte';

  export let address: string;

  $: queryResult = query(paginatedStore(ContractLogsDocument, {
    address: `${address.toLowerCase()}`,
    limit: 10,
  }));
</script>

{#if $queryResult.data?.account?.events.length}
<div>
<div class="border rounded overflow-x-auto text-sm">
<table class="table-auto w-full divide-y">
<thead>
  <tr>
    <th class="logs-cell">Event</th>
    <th class="logs-cell">Role</th>
    <th class="logs-cell">Account</th>
    <th class="logs-cell">Admin</th>
    <th class="logs-cell">Time</th>
  </tr>
</thead>
<tbody class="divide-y">
{#each $queryResult.data.account.events as log}
  {#if log.__typename === 'RoleGranted' || log.__typename === 'RoleRevoked'}
  <tr>
    <td class="logs-cell">{log.__typename}</td>
    <td class="logs-cell"><Role {address} roleId={log.role.role.id} /></td>
    <td class="logs-cell"><Address address={log.account.id} shorten/></td>
    <td class="logs-cell"><Address address={log.sender.id} shorten/></td>
    <td class="logs-cell"><HumanTime timestamp={1000 * log.timestamp} /></td>
    <td class="logs-cell"><EtherscanLink page="tx/{log.transaction.id}"/></td>
  </tr>
  {/if}
  {#if log.__typename === 'OwnershipTransferred' || log.__typename === 'ERC1967AdminChanged'}
  <tr>
    <td class="logs-cell">{log.__typename}</td>
    <td class="logs-cell"></td>
    <td class="logs-cell"><Address address={log.owner.id} shorten/></td>
    <td class="logs-cell"></td>
    <td class="logs-cell"><EtherscanLink page="tx/{log.transaction.id}"/></td>
  </tr>
  {/if}
{/each}
</tbody>
</table>
</div>

<LoadMore store={queryResult}/>
</div>
{/if}

<style>
.logs-cell {
  @apply py-2 px-2 text-left whitespace-nowrap;
}
</style>
