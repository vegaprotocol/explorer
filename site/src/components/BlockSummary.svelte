<script>
    import TwoColumnData from "./TwoColumnData.svelte";
    export let block;

    const rows = [
        { title: 'Block ID', value: block.header.height, type: 'block' },
        { title: 'Proposer', value: block.header.proposer_address, type: 'validator' },
        { title: 'Time', value: block.header.time },

        { title: 'Transactions', value: block.num_txs },
    ]
</script>

<TwoColumnData rows={rows} />
