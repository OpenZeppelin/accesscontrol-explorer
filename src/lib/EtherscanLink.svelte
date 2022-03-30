<script lang="ts">
  import Icon from '$lib/Icon.svelte';
  import { chain } from '$lib/store';
  import CHAINS from '$lib/chains.json';
  import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

  export let page: string;

  $: href = new URL(page, CHAINS[$chain]?.explorer ?? 'https://etherscan.io').href;
</script>

<a class="text-sm text-gray-300 hover:text-gray-400" {href}><Icon i={faExternalLinkAlt}/></a>
