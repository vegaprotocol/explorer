<script>
    import {store as networkStore} from "../../stores/network.js";

    import {onDestroy, onMount, afterUpdate } from 'svelte'
    import Validator from "../../components/Validator.svelte";
    import BlockSummary from "../../components/BlockSummary.svelte";

    let unsubscribeNetwork
    let validators

    onDestroy(() => {
        if (unsubscribeNetwork) {
            unsubscribeNetwork();
            unsubscribeNetwork = null;
        }
    });

    function updateData(data) {
        if (data.peers) {
            validators = [...data.peers.values()];
        }
    }

    afterUpdate(() => {
    })

    onMount(() => {
        if (!unsubscribeNetwork) {
            unsubscribeNetwork = networkStore.subscribe(updateData);
        }
    })
</script>

<svelte:head>
    <title>Network</title>
</svelte:head>
{#if validators && validators.length > 0}
    <h1>Validators</h1>
    {#each validators as validator}
        <Validator validator={validator} />
    {/each}
{/if}
