<script>
  import {stores} from "@sapper/app";
  import {onMount, onDestroy } from 'svelte'

  import MarketLink from "../../components/MarketLink.svelte";
  import {Parties} from "../../stores/parties.js";
  import Hash from "../../components/Hash.svelte";
  import BlockLink from "../../components/BlockLink.svelte";
  import OrderLink from "../../components/OrderLink.svelte";
  import PriceByMarket from "../../components/PriceByMarket.svelte";
  import Account from "../../components/accounts/Account.svelte";
  const {page} = stores();
  let {slug} = $page.params;

  let store = new Parties()
  let party
  let polling

  let update = async () => {
    party = await store.get(slug, true)
  }

  onDestroy(() => {
    if (polling) {
      clearInterval(polling);
    }
  })

  onMount(() => {
    update()
    polling = setInterval(update, 1000)
  })

</script>

<div>
  {#if party}
     <h1>
       {#if party.id.length > 15}
       <Hash text={party.id} />
       {:else}
       {party.id}
       {/if}
     </h1>

    <h2>Accounts</h2>
    <ul>
      {#each party.accounts as a}
        <Account account={a} positions={party.positions} />
      {/each}
    </ul>
    <h2>Recent orders</h2>
    <ul>
    {#each party.orders as or}
      <li>
        <OrderLink id={or.id} short={true} />:
        {#if or.remaining === 0}
        <s>{or.side} in <MarketLink id={or.market.id} /></s>: {or.size} @ <PriceByMarket marketId={or.market.id} price={or.price} />
        {:else if (or.remaining === or.size)}
        <b>{or.side} in <MarketLink id={or.market.id} /></b>: {or.size} @ <PriceByMarket marketId={or.market.id} price={or.price} />
        {:else}
          {#if or.remaining !== '0'}
            <b>{or.side} in <MarketLink id={or.market.id} /></b>: {or.size} @ <PriceByMarket marketId={or.market.id} price={or.price} /><i>(remaining: {or.remaining})</i>
          {:else}
            <s>{or.side} in <MarketLink id={or.market.id} /></s>: {or.size} @ <PriceByMarket marketId={or.market.id} price={or.price} /> (filled)
          {/if}
        {/if}
        in <BlockLink id={or.id} />
      </li>
    {/each}
    </ul>
  {:else}
    <h1>Loading...</h1>
  {/if}
</div>
