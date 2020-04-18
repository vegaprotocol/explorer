<script context="module">
    import {Orders} from '../../../../stores/orders'

    export async function preload(page) {
        let ordersStore = new Orders()
        const { slug } = page.params;

        const order = await ordersStore.getByReference(slug, this.fetch)
        return { id: order.id, slug }
    }
</script>

<script>
    import { goto } from '@sapper/app'
    import { onMount } from 'svelte'
    export let id
    export let slug
    const title = slug
    onMount(() => {
        goto(`/trading/orders/${id}`);
    })
</script>

<svelte:head>
    <title>{title}!</title>
</svelte:head>

<p>Redirecting to order id...</p>