<script>
    export let marketId;
    export let price = '';

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
        market = data.markets.get(marketId);
    }

    onMount (() => {
        if(!unsubscribe) {
            unsubscribe = store.subscribe(updateMarkets);
        }
    })

    function formatNumber(price, decimalPlaces) {
        // Used to store a minus
        let prefix = ''

        // Preserve plus or minus prefix
        if (price.charAt(0) === '-') {
            prefix = price.substring(0, 1)
            price = price.substring(1)
        }

        if (decimalPlaces === 0) {
            return prefix + price
        }

        // EG: str = '1', d = 3. Shouuld be '0.001'
        if (decimalPlaces >= price.length) {
            return prefix + '0.' + price.padStart(decimalPlaces, '0')
        }

        // EG: str = '12345', d = 2. Should be '123.45
        const re = new RegExp(`([\\d]+)(\\d{${decimalPlaces}})$`)

        return prefix + price.replace(re, '$1.$2')
    }
</script>

{#if Number(price) === NaN }
    -
{:else}
    {#if market}
        {formatNumber(price, market.decimalPlaces)}
    {:else}
        {formatNumber(price, 5 )}
    {/if}
{/if}