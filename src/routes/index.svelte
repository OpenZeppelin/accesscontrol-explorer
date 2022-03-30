<script context="module">
  import { onMount } from 'svelte';
  import { prefetchRoutes } from '$app/navigation';

  onMount(() => {
    prefetchRoutes();
  });

  export async function load() {
    return {
      status: 301,
      redirect: `/mainnet/`,
    }
  }
</script>
