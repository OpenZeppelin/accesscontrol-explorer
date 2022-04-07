<script context="module" lang="ts">
  export const prerender = true;
</script>

<script lang="ts">
  import { chain } from '$lib/store';
  import { toChecksumAddress } from './checksum';

  export let network: string | undefined = undefined;
  export let address: string;
  export let tab: string = '';
  export let shorten: boolean = false;

  $: checksum = toChecksumAddress(address);
  $: short = checksum.replace(/^0x(.{4}).*(.{4})$/, '0x$1...$2');
</script>

<a href="/{network ?? $chain.descr}:{checksum}/{tab}" class="p-1 -m-1 font-mono rounded bg-gray-50 hover:bg-gray-100" title={checksum}>
  {#if shorten}
    {short}
  {:else}
    {checksum}
  {/if}
</a>
