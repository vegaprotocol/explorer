<script>
	import {store} from "../../stores/blocks.js";

	import {onDestroy, onMount} from 'svelte'
	import Hash from "../../components/Hash.svelte";

	let unsubscribe
	let blocks

	onDestroy(() => {
		if (unsubscribe) {
			unsubscribe();
			unsubscribe = null;
		}
	});

	function updateData(data) {
		blocks = data.blocks;
	}

	onMount(() => {
		if (!unsubscribe) {
			unsubscribe = store.subscribe(updateData);
		}
	})


</script>

<style>
	ul {
		margin: 0 0 1em 0;
		line-height: 1.5;
	}
</style>

<svelte:head>
	<title>Blocks</title>
</svelte:head>

<h1>Recent blocks</h1>
{#if blocks}
<ul>
	{#each [...blocks].sort().reverse() as [id, {block}](id)}
		<li>
			<a href='blocks/{block.header.height}'>
				{block.header.height}
			</a>
			{#if block.num_txs}
				(txs: {block.num_txs}, size: {block.block_size} time: {block.header.time})
			{:else}
				(txs: {block.header.num_txs}, hash: <Hash text={block.block_id.hash} />)
			{/if}
		</li>
	{/each}
</ul>
{/if}