<script lang="ts">
  import { page } from '$app/stores';
  import { chain } from '$lib/store';
  import WithClient from '$lib/WithClient.svelte';
  import Header from '$lib/Header.svelte';
  import { getChain } from '$lib/chains';

  import '../../app.css';

  $chain = getChain($page.params.chain);
</script>

<div class="container mx-auto max-w-screen-md flex flex-col gap-y-6">
  <Header/>
  <main class="flex flex-col gap-y-6">
    <WithClient chain={$chain}>
      <slot />
    </WithClient>
  </main>
</div>