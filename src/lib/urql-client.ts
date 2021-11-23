import type { ClientOptions } from '@urql/core';
import { dedupExchange, fetchExchange } from '@urql/core';
import { cacheExchange } from '@urql/exchange-graphcache';
import { simplePagination } from '@urql/exchange-graphcache/extras';
import schema from '$lib/subgraph/schema.json';

const pagination = () => simplePagination({ limitArgument: 'first' });

export const clientOptions: ClientOptions = {
  url: 'https://api.thegraph.com/subgraphs/name/amxx/access-control',
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
        },
      },
    }),
    fetchExchange,
  ],
};
