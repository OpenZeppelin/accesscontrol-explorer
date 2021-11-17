import { operationStore } from '@urql/svelte';
import type { OperationStore } from '@urql/svelte';
import type { TypedDocumentNode } from '@graphql-typed-document-node/core';

interface PageVars {
  limit?: number;
  offset?: number;
}

export interface PaginatedStore<D = any, V extends PageVars = object, R = D> extends OperationStore<D, V, R> {
  loadMore: () => void;
}

type Query<D, V> = string | TypedDocumentNode<D, V>;

export function paginatedStore<D = any, V extends PageVars = object, R = D>(
  query: Query<D, V>, variables?: V
): PaginatedStore<D, V, R> {
  const store = Object.assign(
    operationStore<D, V, R>(query, { offset: 0, ...variables }),
    {
      loadMore: () => store.update($store => {
        $store.variables.offset += $store.variables.limit;
        $store.reexecute();
        return $store;
      }),
    },
  );

  return store;
}
