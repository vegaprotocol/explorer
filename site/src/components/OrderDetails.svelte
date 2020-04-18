<script>
    import TwoColumnData from "./TwoColumnData.svelte";
    export let order;

    const tradeCount = order.trades && order.trades.length ? order.trades.length : 0

    const rows = [
        { title: 'ID', value: order.id },
        { title: 'Version', value: order.version },
        { title: 'Status', value: order.status },
        { title: 'Party', value: order.party.id, type: 'party' },
        { title: 'Block', value: order.id, type: 'block' },
        { title: 'Reference', value: order.reference, type: 'hash' },
        { title: 'Market', value: order.market.id, type: 'market' },
        { title: 'Size', value: order.size },
        { title: 'Price', value: order.price, type: 'price', marketId: order.market.id },
        { title: 'Side', value: order.side },
        { title: 'Time In Force', value: order.timeInForce },
        { title: 'Type', value: order.type },
        { title: 'Trades', value: tradeCount },
    ]
</script>

<TwoColumnData rows={rows} />