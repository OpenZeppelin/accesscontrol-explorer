<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { chain } from '$lib/store';
  import Search from '$lib/Search.svelte';
  import { CHAINS, getChain, getChainDesc } from '$lib/chains';

  const handleChange = async (e: any) => {
    e.preventDefault();
    $chain = getChain(e.target.value);
    await goto($page.path.replace(/\/((eip155:)?\w+)(:0x[0-9a-zA-Z]{40})?/, `/${getChainDesc($chain)}$3`));
  };
</script>

<header class="flex justify-between items-center h-12">
  <h1 class="font-bold text-lg">
    <a href={`/${$chain.shortName}`}>Access Control Explorer</a>
  </h1>

  <select on:change={handleChange}>
    {#each CHAINS as entry}
      <option value={entry.name} selected={entry.id == $chain.id}>{entry.name}</option>
    {/each}
  </select>

  <img class="h-6" src="/logo.svg" alt="OpenZeppelin" />
</header>

<Search/>
