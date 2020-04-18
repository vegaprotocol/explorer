<script>
    export let type;
    let emoji = ''

    if (type === 'OrderSubmission') {
        emoji = '🛒'
    }
</script>

<span>
  {#if emoji}
      <strong>{emoji}</strong>
  {/if}
  <span>{type}</span>
</span>