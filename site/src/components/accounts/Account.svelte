<script>
    import {afterUpdate} from 'svelte';
    import GeneralAccount from "./GeneralAccount.svelte";
    import GenericAccount from "./GenericAccount.svelte";
    import MarginAccount from "./MarginAccount.svelte";
    import InsuranceAccount from "./InsuranceAccount.svelte";
    import FeeAccount from "./FeeAccount.svelte";

    export let account;
    export let marketId = false;
    export let positions = false;

    let position
    let rows = []

    // This is used to provide a market for the currency
    if (!marketId && account.market) {
        marketId = account.market.id;
    }


    afterUpdate(() => {
        rows = []
        // This checks if there is a position for this market
        if (positions) {
            position = positions.find(p => p.market.id === marketId)
        }

        if (account.market) {
            rows = [...rows,
                {title: 'Market position', value: marketId, type: 'market'},
            ];

            if (position) {
                rows = [
                    ...rows,
                    {title: 'Open Volume', value: position.openVolume},
                    {title: 'Realised PNL', value: position.realisedPNL, type: 'price', marketId: marketId},
                    {title: 'Unrealised PNL', value: position.unrealisedPNL, type: 'price', marketId: marketId}
                ]
            }

            rows.push({title: 'Held margin balance', value: account.balance, type: 'price', marketId: marketId})

        } else {
            rows = [...rows,
                {title: account.asset.symbol, value: account.balance, type: 'price', marketId: marketId},
            ];
        }

    })
</script>
{#if position}
    <br><MarginAccount rows={rows} />
{:else}
    {#if account.type === 'General'}
        <GeneralAccount rows={rows} />
    {:else if account.type === 'FeeLiquidity'}
        <FeeAccount rows={rows} type={account.type} />
    {:else if account.type === 'FeeInfrastructure'}
        <FeeAccount rows={rows} type={account.type} />
    {:else if account.type === 'Settlement'}
        <GenericAccount rows={rows} type={account.type} />
    {:else if account.type === 'Insurance'}
        <InsuranceAccount rows={rows} />
    {:else}
        <GenericAccount rows={rows} type={account.type} />
    {/if}
{/if}
