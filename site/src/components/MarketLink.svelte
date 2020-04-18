<script>
  export let id;
  import { store } from "../stores/markets.js";
  import { onDestroy, onMount } from 'svelte'

  let unsubscribe
  let market

  onDestroy(() => {
    if(unsubscribe) {
      unsubscribe();
      unsubscribe = null;
    }
  });

  function updateMarkets(data) {
    market = data.markets.get(id);
  }

  onMount (() => {
    if(!unsubscribe) {
      unsubscribe = store.subscribe(updateMarkets);
    }
  })

</script>

{#if !market}
    Loading...
{:else}
<a href='/trading/markets/{id}'>{market.name}</a>
{/if}
