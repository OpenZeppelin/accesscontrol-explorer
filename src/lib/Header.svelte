<script lang="ts">
  import { page } from '$app/stores';
  import Search from '$lib/Search.svelte';
</script>

<header class="flex justify-between items-center h-12">
  <h1 class="font-bold text-lg">
    <a href="/">Access Control Explorer</a>
  </h1>
  <img class="h-6" src="/logo.svg" alt="OpenZeppelin" />
</header>

<Search/>
