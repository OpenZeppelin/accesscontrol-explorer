<script context="module" lang="ts">
  export const prerender = true;
</script>

<script lang="ts">
  import { page } from '$app/stores';
  import { toChecksumAddress } from '$lib/checksum';
  import MemberOf from '$lib/MemberOf.svelte';
  import Module from '$lib/Module.svelte';
  import Icon from '$lib/Icon.svelte';
  import AddressHeader from '$lib/AddressHeader.svelte';

  import { faEye } from '@fortawesome/free-regular-svg-icons';

  $: address = toChecksumAddress($page.params.address);
</script>

<svelte:head>
<title>Access Control Explorer - Account {address}</title>
<link rel="canonical" href="https://{$page.host}/address/{address}">
</svelte:head>

<AddressHeader {address} view="account" />

<div class="grid grid-cols-2 gap-2">
  <Module>
    <MemberOf {address} />
  </Module>
</div>
