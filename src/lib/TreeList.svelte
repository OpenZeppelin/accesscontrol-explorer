<script lang="ts" context="module">
  import type { SvelteComponent, SvelteComponentTyped } from "svelte";

  export interface TreeNode {
    component: typeof SvelteComponent;
    props: Record<string, unknown>;
    children?: TreeNode[]
  };
</script>

<script lang="ts">
  type T = $$Generic<keyof any>;
  export let values: TreeNode[];
  export let subtree = false;
</script>

<ul>
  {#each values as { component, props, children = [] }}
  <li class:subtree-item={subtree}>
    <svelte:component this={component} {...props}/>
    <svelte:self subtree values={children ?? []} />
  </li>
  {/each}
</ul>

<style>
  .subtree-item {
    --x: .6em;
    --y: .7em;
    position: relative;
    padding-left: calc(2.5 * var(--x));
    overflow-y: hidden
  }

  .subtree-item::before,
  .subtree-item::after {
    content: '';
    display: block;
    width: var(--x);
    position: absolute;
    left: var(--x);
  }

  .subtree-item::before {
    border-left: 1px solid currentColor;
    top: 0;
    height: 100%;
  }

  .subtree-item:last-child::before {
    height: var(--y);
  }

  .subtree-item::after {
    border-bottom: 1px solid currentColor;
    top: var(--y);
  }
</style>
