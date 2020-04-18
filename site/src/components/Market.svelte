<script>
  import TwoColumnData from "./TwoColumnData.svelte";

  export let id;
  import {store} from "../stores/markets.js";

  import {onDestroy, onMount} from 'svelte'

  let unsubscribe
  let market

  onDestroy(() => {
    if (unsubscribe) {
      unsubscribe();
      unsubscribe = null;
    }
  });

  function updateMarkets(data) {
    console.log(market)
    market = data.markets.get(id);
  }

  onMount(() => {
    if (!unsubscribe) {
      unsubscribe = store.subscribe(updateMarkets);
    }
  })
</script>

<div>
  {#if market}
    <h1>{market.name}</h1>
    <TwoColumnData rows={[
      { title: 'ID', value: market.id },
      { title: 'Name', value: market.name },
      { title: 'Best Bid Price', value: market.data.bestBidPrice, marketId: market.id, type: 'price' },
      { title: 'Best Offer Price', value: market.data.bestOfferPrice, marketId: market.id, type: 'price' },
      { title: 'Mark Price', value: market.data.markPrice, marketId: market.id, type: 'price' },
      { title: 'Mid Price', value: market.data.midPrice, marketId: market.id, type: 'price' },
      { title: 'Decimal places', value: market.decimalPlaces },
      { title: 'Tradable instrument', value: market.tradableInstrument.instrument, type: 'raw' },
      { title: 'Instrument margin calculator', value: market.tradableInstrument.marginCalculator, type: 'raw' },
    ]} />
  {:else}
    <h1>Loading {id}...</h1>
  {/if}
</div>
