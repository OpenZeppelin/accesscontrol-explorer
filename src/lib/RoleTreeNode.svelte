<script lang="ts">
  import Role from '$lib/Role.svelte';

  export let r: string;
  export let address: string;

  export let focused: boolean = false;
</script>

<span class:font-bold={focused}>
  <Role {r} {address} />
</span>
