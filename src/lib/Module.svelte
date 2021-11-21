<script lang="ts">
  export let title: string | undefined = undefined;
</script>

<div class="border-2 border-gray-100 bg-gray-50 p-2 rounded">
  {#if title}
    <h1 class="font-bold">{title}</h1>
  {/if}
  <slot/>
</div>

