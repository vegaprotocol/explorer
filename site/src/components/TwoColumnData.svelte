<style>
    dl {
        border: solid #333;
        border-width: 1px 1px 0 0;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
    }
    dt {
        padding: 2px 4px;
        background: #333;
        text-align: right;
        color: #fff;
        flex-wrap: nowrap;
        grid-column: span 1;
    }
    dd {
        grid-column: span 3;
        white-space: nowrap;
        overflow: hidden;
        flex-grow: 1;
        margin: 0;
        padding: 2px 4px;
        border-bottom: 1px solid #333;
    }
</style>

<script>
    import Hash from "./Hash.svelte";
    import MarketLink from "./MarketLink.svelte";
    import PartyLink from "./PartyLink.svelte";
    import BlockLink from "./BlockLink.svelte";
    import PriceByMarket from "./PriceByMarket.svelte";
    import OrderLink from "./OrderLink.svelte";
    import OrderReferenceLink from "./OrderReferenceLink.svelte";
    import ValidatorLink from "./ValidatorLink.svelte";

    export let rows

    /*    const rows = [
        {
            'title': 'Block ID',
            'data': {value: 123, marketId: '123', type: 'price' }
        }
    ] */
</script>

{#if rows}
    <dl>
    {#each rows as row}
            <dt>{row.title.trim()}</dt>
            <dd>
                {#if row.value}
                    {#if row.type === 'party'}
                        <PartyLink id={row.value} />
                    {:else if row.type === 'validator'}
                        <ValidatorLink id={row.value} />
                    {:else if row.type === 'block'}
                        <BlockLink id={row.value} />
                    {:else if row.type === 'hash'}
                        <Hash text={row.value} />
                    {:else if row.type === 'order'}
                        <OrderLink id={row.value} />
                    {:else if row.type === 'order-reference'}
                        <OrderReferenceLink reference={row.value} />
                    {:else if row.type === 'market'}
                        <MarketLink id={row.value} />
                    {:else if row.type === 'raw'}
                        <pre>{JSON.stringify(row.value, null, 2)}</pre>
                    {:else if row.type === 'price' }
                        <PriceByMarket price={row.value} marketId={row.marketId} />
                    {:else if row.type === 'image'}
                        <img src={row.value} width="60" height="60" />
                    {:else if typeof row.value === 'number' || typeof row.value === 'string'}
                        {row.value}
                    {:else}
                        -
                    {/if}
                {:else}
                    -
                {/if}
            </dd>
    {/each}
    </dl>
{/if}
