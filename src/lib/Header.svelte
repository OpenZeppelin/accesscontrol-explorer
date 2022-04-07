<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { chain } from '$lib/store';
  import Search from '$lib/Search.svelte';
  import getChain, { CHAINS } from '$lib/chains';

  const handleChange = async (e: any) => {
    e.preventDefault();
    chain.set(getChain(e.target.value));
    await goto($page.path.replace(/\/([a-z]+)(:0x[0-9a-zA-Z]{40})?/, `/${e.target.value}$2`));
  };
</script>

<header class="flex justify-between items-center h-12">
  <h1 class="font-bold text-lg">
    <a href={`/${$chain.shortName}`}>Access Control Explorer</a>
  </h1>

  <select on:change={handleChange}>
    {#each CHAINS as entry}
      <option value={entry.shortName} selected={entry.id == $chain.id}>{entry.name || entry.shortName}</option>
    {/each}
  </select>

  <img class="h-6" src="/logo.svg" alt="OpenZeppelin" />
</header>

<Search/>
