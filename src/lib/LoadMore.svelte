<script lang="ts">
  import type { PaginatedStore } from './paginated-store';

  export let store: PaginatedStore;
</script>

{#if $store.fetching || $store.stale}
  Loading...
{:else if $store.error}
  Error {$store.error.message}
{:else}
  <button on:click={store.loadMore}>More</button>
{/if}
