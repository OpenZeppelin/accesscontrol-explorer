<script context="module" lang="ts">
  export const prerender = true;
</script>

<script lang="ts">
  import type { IconDefinition, IconPathData } from "@fortawesome/fontawesome-common-types";

  export let i: IconDefinition;
  export let size = "1em";

  let width = 0;
  let height = 0;
  let path: IconPathData = [];

  $: [width, height,,, path] = i.icon;

  const p = (d: IconPathData) => Array.isArray(d) ? d : [d];
</script>

<svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" class="inline" style="height: {size}; width: {size}; vertical-align: -0.125em;">
  {#each p(path) as d}
    <path fill="currentColor" {d}></path>
  {/each}
</svg>
