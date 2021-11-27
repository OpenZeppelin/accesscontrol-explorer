<script lang="ts">
  import humanizeDuration from 'humanize-duration';

  export let timestamp: number;

  $: dateString = new Date(timestamp).toUTCString();
  $: humanDuration = humanizeDuration(Date.now() - timestamp, { largest: 1 });
</script>

<span title={dateString}>{humanDuration} ago</span>
