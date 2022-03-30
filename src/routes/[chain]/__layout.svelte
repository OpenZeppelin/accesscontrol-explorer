<script lang="ts">
  import { page } from '$app/stores';
  import { initClient } from '@urql/svelte';
  import { getClientOptions } from '$lib/urql-client';
  import { chain } from '$lib/store';

  import Header from '$lib/Header.svelte';

  import '../../app.css';

  chain.set($page.params.chain);
  chain.subscribe(id => {
    console.log("network switched to ", id)
    initClient(getClientOptions(id))
  });
</script>

<div class="container mx-auto max-w-screen-md flex flex-col gap-y-6">
  <Header/>
  <main class="flex flex-col gap-y-6">
    <slot />
  </main>
</div>
