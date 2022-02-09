<script context="module">
  import { blockUrl, tendermintUrl } from "../../config/";

  export async function preload(page) {
    const { slug } = page.params;
    return { slug };
  }
</script>

<script>
  import { Txs } from "../../stores/transaction";
  import Hash from "../../components/Hash.svelte";
  import { onMount } from "svelte";

  export let tx = null;
  export let slug;

  let store = new Txs();

  let update = async () => {
    tx = await store.get(slug, true);
  };

  onMount(() => {
    update();
  });
</script>

<svelte:head>
  <title>Block {slug}</title>
</svelte:head>
<h1><Hash text="Transaction {slug}" /></h1>
<pre>{JSON.stringify(tx, null, "\t")}</pre>
