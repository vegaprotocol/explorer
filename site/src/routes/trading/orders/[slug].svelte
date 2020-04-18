<script context="module">
    import {Orders} from '../../../stores/orders'

    export async function preload(page) {
        let ordersStore = new Orders()
        const { slug } = page.params;

        const order = await ordersStore.get(slug, this.fetch)
        debugger
        return { order, slug, ordersStore }
    }
</script>

<script>
    import {onMount, onDestroy, afterUpdate} from 'svelte';
    import {store} from '../../../stores/blocks'
    import BlockHeader from "../../../components/BlockHeader.svelte";
    import OrderDetails from "../../../components/OrderDetails.svelte";
    import TradeDetails from "../../../components/TradeDetails.svelte";
    import Hash from "../../../components/Hash.svelte";

    export let slug
    export let ordersStore

    const title = slug
    let data = [];
    let block = false
    export let order = false
    let unsubscribe
    let polling

    async function poll () {
        order = await ordersStore.get(slug, this.fetch, true)
    }

    onMount(async () => {
        if (!unsubscribe) {
            unsubscribe = store.subscribe(update);
        }

        if (order.status === 'Active') {
            polling = setInterval(poll, 500)
        }
    })

    onDestroy(() => {
        if (unsubscribe) {
            unsubscribe();
            unsubscribe = null;
        }

        if (polling) {
            clearInterval(polling)
        }
    });

    afterUpdate(() => {
        if (polling && order.status !== 'Active') {
            clearInterval(polling)
        }
    })

    function update(data) {
        debugger
        block = data.blocks.get(slug)
    }

    function navigate(id) {
        slug = id
        update()
    }

</script>
<style>
    .trades-container {
        margin: 0 0 0 1em;
    }

    hr {
        margin: 3em 0 2em 0;
    }

</style>

<svelte:head>
    <title>{title}!</title>
</svelte:head>

<h1><Hash text="Order {order.id}" /></h1>

{#if block}
    <BlockHeader block={block.block} />
    <hr>
{/if}
<OrderDetails order={order} />
{#if order.trades}
    <hr>
    <h2>Trades</h2>
    <div class="trades-container">
        {#each order.trades as trade}
             <TradeDetails trade={trade} /><br>
        {/each}
    </div>
{/if}
