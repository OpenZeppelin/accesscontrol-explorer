<script lang="ts">
  import { gql, query } from '@urql/svelte';
  import { paginatedStore } from '$lib/paginated-store';
  import LoadMore from '$lib/LoadMore.svelte';
  import Role from '$lib/Role.svelte';

  export let address: string;

  const account = paginatedStore(gql`
    query ($address: String, $limit: Int, $offset: Int) {
      account(id: $address) {
        id
        asAccessControl {
          id
          roles(first: $limit, skip: $offset) {
            id
            role {
              id
            }
          }
        }
      }
    }
  `, {
    address: address.toLowerCase(),
    limit: 100,
  });

  query(account);
</script>

<section>
<h1 class="font-bold">Available Roles</h1>

{#if $account.data?.account}
  <ul>
  {#each $account.data.account.asAccessControl.roles as { role }}
    <li><Role r={role.id} {address} /></li>
  {/each}
  </ul>
{/if}

<LoadMore store={account} />
</section>
