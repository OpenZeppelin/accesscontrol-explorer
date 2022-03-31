<script context="module" lang="ts">
  export const prerender = true;
</script>

<script lang="ts">
  import { chain } from '$lib/store';
  import roleDict from './role-dict.json';

  export let address: string;
  export let roleId: string;

  $: short = roleId.replace(/^0x(.{4}).*(.{4})$/, '0x$1...$2');
  $: decoded = roleDict[roleId] ?? short;
</script>

<a href="/{$chain}/role/{address}/{roleId}" class="p-1 -m-1 rounded bg-gray-50 hover:bg-gray-100" title={roleId}>
  {decoded}
</a>
