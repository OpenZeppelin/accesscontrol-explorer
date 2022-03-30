<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { chain } from '$lib/store';
  import Search from '$lib/Search.svelte';
  import CHAINS from '$lib/chains.json';

  const handleChange = async e => {
    e.preventDefault();
    chain.set(e.target.value);

    const path = $page.path.split('/');
    path[1] = e.target.value;
    await goto(path.join('/'));
  };
</script>

<header class="flex justify-between items-center h-12">
  <h1 class="font-bold text-lg">
    <a href={`/${$chain}`}>Access Control Explorer</a>
  </h1>

  <select on:change={handleChange}>
    {#each Object.keys(CHAINS) as key}
      <option value={key} selected={$chain == key}>{key}</option>
    {/each}
  </select>

  <img class="h-6" src="/logo.svg" alt="OpenZeppelin" />
</header>

<Search/>
