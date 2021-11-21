<script lang="ts">
  import Header from '$lib/Header.svelte';

  import '../app.css';

  import { initClient } from '@urql/svelte';
  import { clientOptions } from '$lib/urql-client';

  initClient(clientOptions);
</script>

<div class="container mx-auto max-w-screen-md flex flex-col gap-y-6">
  <Header />

  <main>
    <slot />
  </main>
</div>
