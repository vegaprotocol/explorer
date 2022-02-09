<script>
  export let type;
  export let hash;
  let emoji = "";

  if (type === "OrderSubmission") {
    emoji = "🛒";
  }
</script>

<span>
  {#if emoji}
    <strong>{emoji}</strong>
  {/if}
  <a href="/transaction/{hash}">
    {type}
  </a>
</span>
