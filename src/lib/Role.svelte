<script context="module" lang="ts">
  export const prerender = true;
</script>

<script lang="ts">
  import roleDict from './role-dict.json';

  export let r: string;
  export let address: string;

  $: short = r.replace(/^0x(.{4}).*(.{4})$/, '0x$1...$2');
  $: decoded = roleDict[r] ?? short;
</script>

<a href="/role/{address}/{r}" class="p-1 -m-1 rounded bg-gray-50 hover:bg-gray-100" title={r}>
  {decoded}
</a>
