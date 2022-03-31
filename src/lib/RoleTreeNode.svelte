<script lang="ts">
  import Role from '$lib/Role.svelte';

  export let address: string;
  export let roleId: string;
  export let focused: boolean = false;
</script>

<span class:font-bold={focused}>
  <Role {address} {roleId} />
</span>
