<script>
    import MarketLink from './MarketLink.svelte'
    import TransactionType from "./TransactionType.svelte";
    import PartyLink from "./PartyLink.svelte";
    import OrderReferenceLink from "./OrderReferenceLink.svelte";
    import PriceByMarket from "./PriceByMarket.svelte";
    import TwoColumnData from "./TwoColumnData.svelte";

    export let tx;
    export let pubKey;
    export let type;


    let rows = []

    for (const [key, value] of Object.entries(tx)) {
        rows.push({ title: key, value })
    }

</script>


<details class="{pubKey}">
    <summary>
      {#if type === 'OrderSubmission'}
      &nbsp;&nbsp;<TransactionType type={type} /> {tx.size} @ <PriceByMarket price={tx.price} marketId={tx.marketId} /> in <MarketLink id={tx.marketId} /><br>
      {:else}
      &nbsp;&nbsp;<TransactionType type={type} /><br>
      {/if}
    </summary>
    <TwoColumnData rows={rows} />
</details>
