<script lang="ts">
  import Header from '$lib/Header.svelte';

  import '../app.css';

  import { initClient, dedupExchange, fetchExchange } from '@urql/svelte';
  import { cacheExchange } from '@urql/exchange-graphcache';
  import { simplePagination } from '@urql/exchange-graphcache/extras';

  initClient({
    url: 'https://api.thegraph.com/subgraphs/name/amxx/access-control',
    exchanges: [
      dedupExchange,
      cacheExchange({
        resolvers: {
          AccessControl: {
            roles: simplePagination({
              limitArgument: 'first',
            }),
          },
          AccessControlRole: {
            adminOf: simplePagination({
              limitArgument: 'first',
            }),
          },
        },
      }),
      fetchExchange,
    ],
  });
</script>

<div class="container mx-auto max-w-screen-md flex flex-col gap-y-6">
  <Header />

  <main>
    <slot />
  </main>
</div>
