<script lang="ts">
  import Icon from '$lib/Icon.svelte';
  import { chain } from '$lib/store';
  import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

  export let page: string;

  $: href = new URL(page, $chain.explorer).href;
</script>

<a class="text-sm text-gray-300 hover:text-gray-400" {href}><Icon i={faExternalLinkAlt}/></a>
