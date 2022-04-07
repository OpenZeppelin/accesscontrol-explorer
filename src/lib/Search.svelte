<script lang="ts">
  import { goto } from '$app/navigation';
  import { chain } from '$lib/store';

  let query: string = '';

  const handleSubmit = async e => {
    e.preventDefault();
    await goto(`/${$chain.shortName}:${query}`);
    query = '';
  };
</script>

<section>
  <h1 class="font-bold">Search</h1>

  <form on:submit={handleSubmit}>
    <input type="search" class="w-full p-2 bg-gray-100" placeholder="Address" bind:value={query}>
  </form>
</section>
