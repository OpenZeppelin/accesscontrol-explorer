<script lang="ts">
  import { goto } from '$app/navigation';

  let query: string = '';

  const handleSubmit = async () => {
    console.log(query);
    await goto(`/address/${query}`);
  };
</script>

<section>
  <div class="flex justify-between">
    <h1 class="font-bold">Search</h1>
  </div>

  <form on:submit={handleSubmit}>
    <input type="search" class="w-full p-2 bg-gray-100" placeholder="Address" bind:value={query}>
  </form>
</section>
