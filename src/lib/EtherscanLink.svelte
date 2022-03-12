<script lang="ts">
  import Icon from '$lib/Icon.svelte';
  import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

  export let page: string;
</script>

<a class="text-sm text-gray-300 hover:text-gray-400" href="https://etherscan.io/{page}"><Icon i={faExternalLinkAlt}/></a>
