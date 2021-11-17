<script context="module" lang="ts">
  export const prerender = true;
</script>

<script lang="ts">
  export let a: string;

  $: short = a.replace(/^0x(.{4}).*(.{4})$/, '0x$1...$2');
</script>

<a href="/address/{a}" class="p-1 -m-1 rounded bg-gray-50 hover:bg-gray-100" title={a}>
  {short}
</a>
