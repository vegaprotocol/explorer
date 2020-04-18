<script>
    import TwoColumnData from "./TwoColumnData.svelte";
    export let trade;

    const rows = [
        { title: 'ID', value: trade.id },
        { title: 'Block', value: trade.id, type: 'block' },

        { title: 'Buyer', value: trade.buyer.id, type: 'party' },
        { title: 'Seller', value: trade.seller.id, type: 'party' },

        { title: 'BuyOrder', value: trade.buyOrder, type: 'order' },
        { title: 'SellOrder', value: trade.sellOrder, type: 'order' },

        { title: 'Market', value: trade.market.id, type: 'market' },
        { title: 'Size', value: trade.size },
        { title: 'Price', value: trade.price, type: 'price', marketId: trade.market.id }
    ]
</script>

<TwoColumnData rows={rows} />
