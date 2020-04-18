<script>
    import Hash from "./Hash.svelte";

    export let id;
    import {store} from "../stores/bots.js";
    import {onDestroy, onMount} from 'svelte'
    if (id.substr(0, 2).toLowerCase() === '0x') {
        id = id.substr(2)
    }

    let unsubscribe

    onDestroy(() => {
        if (unsubscribe) {
            unsubscribe();
            unsubscribe = null;
        }
    })

    function updateMarkets(data) {
    }

    onMount(() => {
        if (!unsubscribe) {
            unsubscribe = () => {
            } //store.subscribe();
        }
    })

    let icon = ''
    if (id === 'network') {
        icon = '🔴'
    }

</script>
    {#if id.length > 15}
        <Hash text={id} href='/party/{id}' />
    {:else}
        <a href='/party/{id}'>
        {icon}
        {id}
        </a>
    {/if}