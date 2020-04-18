<script>
    import {stores} from "@sapper/app";
    import {onDestroy, onMount} from 'svelte'

    import {store} from "../../../stores/markets.js";
    import Market from "../../../components/Market.svelte";
    import TwoColumnData from "../../../components/TwoColumnData.svelte";
    import Account from "../../../components/accounts/Account.svelte";

    const {page} = stores();
    const {slug} = $page.params;

    let unsubscribe
    let market

    onDestroy(() => {
        if (unsubscribe) {
            unsubscribe();
            unsubscribe = null;
        }
    });

    function updateMarkets(data) {
        market = data.markets.get(slug);
    }

    onMount(() => {
        if (!unsubscribe) {
            unsubscribe = store.subscribe(updateMarkets);
        }
    })


</script>

<div>
  {#if market}
      <Market id={market.id} />
      {#if market.accounts && market.accounts.length > 0}
          {#each market.accounts as a}
              <Account account={a} marketId={market.id} />
          {/each}
      {/if}
  {:else}
      <h1>Loading...</h1>
  {/if}
</div>
