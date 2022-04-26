import type { ClientOptions } from '@urql/core';
import { dedupExchange, fetchExchange } from '@urql/core';
import { cacheExchange } from '@urql/exchange-graphcache';
import { simplePagination } from '@urql/exchange-graphcache/extras';

import type { Chain } from '$lib/chains';
import schema from '$lib/subgraph/schema.json';

const pagination = () => simplePagination({ limitArgument: 'first' });

export function getClientOptions(chain: Chain): ClientOptions {
  return  {
    url: chain.subgraph, // or "https://api.thegraph.com/subgraphs/name/amxx/access-control",
    exchanges: [
      dedupExchange,
      cacheExchange({
        schema: schema as any,
        resolvers: {
          AccessControl: {
            roles: pagination(),
          },
          AccessControlRole: {
            adminOf: pagination(),
            members: pagination(),
          },
          Account: {
            membership: pagination(),
            ownerOf: pagination(),
            events: pagination(),
          },
        },
      }),
      fetchExchange,
    ],
  };
}
