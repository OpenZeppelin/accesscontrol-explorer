<script lang="ts">
  import { gql, query } from '@urql/svelte';
  import { paginatedStore } from '$lib/paginated-store';
  import LoadMore from '$lib/LoadMore.svelte';
  import Address from '$lib/Address.svelte';
  import Role from '$lib/Role.svelte';

  export let address: string;

  const account = paginatedStore(gql`
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

  $: membership = Object.entries<string[]>(
    $account.data?.account.membership.reduce((map, entry) => {
      const { contract, role } = entry.accesscontrolrole;
      (map[contract.id] ??= []).push(role.id);
      return map;
    }, {})
    ?? {}
  );

  query(account);
</script>

<section>
<h1 class="font-bold">Member of</h1>

{#if membership}
  <ul>
    {#each membership as [address, roles]}
      <li><Address a={address} /></li>
      <ul>
        {#each roles as role}
          <li class="role-list-item"><Role r={role} {address} /></li>
          <li class="role-list-item"><Role r={role} {address} /></li>
        {/each}
      </ul>
    {/each}
  </ul>
{/if}

<LoadMore store={account} />
</section>

<style>
  .role-list-item {
    --w: 1.5em;
    position: relative;
    padding-left: var(--w);
    overflow-y: hidden
  }

  .role-list-item::before,
  .role-list-item::after {
    content: '';
    display: block;
    width: calc(.4 * var(--w));
    position: absolute;
    left: calc(.4 * var(--w));
  }

  .role-list-item::before {
    border-left: 1px solid currentColor;
    top: 0;
    bottom: 0;
  }

  .role-list-item:last-child::before {
    bottom: 50%;
  }

  .role-list-item::after {
    border-bottom: 1px solid currentColor;
    bottom: 50%;
  }
</style>
