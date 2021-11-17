<script lang="ts">
  type T = $$Generic;
  type Subtree<T> = (T | [T, Subtree<T>])[];

  export let values: Subtree<T>;
</script>

<ul>
  {#each values as value}
  {/each}
</ul>

<style>
  .role-list-item {
    --w: 1.5em;
    position: relative;
    padding-left: var(--w);
    overflow-y: hidden
  }

  .role-list-item::before,
  .role-list-item::after {
    content: '';
    display: block;
    width: calc(.4 * var(--w));
    position: absolute;
    left: calc(.4 * var(--w));
  }

  .role-list-item::before {
    border-left: 1px solid currentColor;
    top: 0;
    bottom: 0;
  }

  .role-list-item:last-child::before {
    bottom: 50%;
  }

  .role-list-item::after {
    border-bottom: 1px solid currentColor;
    bottom: 50%;
  }
</style>
