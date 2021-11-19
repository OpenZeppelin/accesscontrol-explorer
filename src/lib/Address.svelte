<script context="module" lang="ts">
  export const prerender = true;
</script>

<script lang="ts">
  import { toChecksumAddress } from './checksum';
  export let a: string;

  $: checksum = toChecksumAddress(a);
  $: short = checksum.replace(/^0x(.{4}).*(.{4})$/, '0x$1...$2');
</script>

<a href="/address/{checksum}" class="p-1 -m-1 rounded bg-gray-50 hover:bg-gray-100" title={checksum}>
  {short}
</a>
