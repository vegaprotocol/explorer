<script context="module">
  import { blockUrl, tendermintUrl } from "../../config/";

  export async function preload(page) {
    const { slug } = page.params;
    let data;
    let res = await this.fetch(blockUrl(), {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        block_height: parseInt(slug, 10),
        node_url: tendermintUrl(),
      }),
    });

    let json = await res.json();

    if (json && json.length > 0) {
      data = json.map((d) => {
        d.Command = JSON.parse(d.Command);
        return d;
      });
    } else {
      data = false;
    }

    return { data, slug };
  }
</script>

<script>
  import Transaction from "../../components/Transaction.svelte";
  import { onDestroy } from "svelte";
  import { store } from "../../stores/blocks";
  import BlockHeader from "../../components/BlockHeader.svelte";
  import Hash from "../../components/Hash.svelte";

  export let slug;
  export let data = [];
  export let block = [];
  let unsubscribe;

  if (!unsubscribe) {
    unsubscribe = store.subscribe(update);
  }

  onDestroy(() => {
    if (unsubscribe) {
      unsubscribe();
      unsubscribe = null;
    }
  });

  function update(data) {
    if (!data) {
      return;
    }

    block = data.blocks.get(slug);
    if (!block && data.fetchBlock) {
      data.fetchBlock(slug);
    }
  }

  function getBlockFromTradeId(id) {
    return Number(id.split("-")[0].replace("V", 0)).toString();
  }
</script>

<svelte:head>
  <title>Block {slug}</title>
</svelte:head>

<ul>
  <li><a href="/blocks/{Number(slug) - 1}">Previous block</a></li>
  <li><a href="/blocks/{Number(slug) + 1}">Next block</a></li>
</ul>
<h1><Hash text="Block height {slug}" /></h1>

<ul class="content">
  {#if block}
    <BlockHeader block={block.block} />
    <hr />
  {/if}
  {#if data}
    {#each data as { Type, PubKey, Command }, i}
      <Transaction tx={Command} pubKey={PubKey} type={Type} />
    {/each}
  {/if}
</ul>

<style>
  ul {
    float: right;
    list-style: none;
  }

  li {
    float: left;
  }

  li + li {
    margin-left: 10px;
  }
</style>
