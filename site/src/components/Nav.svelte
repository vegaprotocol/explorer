<script>
	export let segment;
	import { store } from "../stores/blocks.js";

	import { onDestroy, onMount } from 'svelte'

	let unsubscribe
	let height

	onDestroy(() => {
		if(unsubscribe) {
			unsubscribe();
			unsubscribe = null;
		}
	});

	function updateData(data) {
		height = data.height;
	}

	onMount (() => {
		if(!unsubscribe) {
			unsubscribe = store.subscribe(updateData);
		}
	})

</script>

<style>
	nav {
		border-bottom: 1px solid rgba(255,62,0,0.1);
		font-weight: 300;
		padding: 0 1em;
	}

	ul {
		margin: 0;
		padding: 0;
	}

	/* clearfix */
	nav::after {
		content: '';
		display: block;
		clear: both;
	}

	li {
		display: block;
		float: left;
	}

	[aria-current] {
		position: relative;
		display: inline-block;
	}

	[aria-current]::after {
		position: absolute;
		content: '';
		width: calc(100% - 1em);
		height: 2px;
		background-color: rgb(255,62,0);
		display: block;
		bottom: -1px;
	}

	a {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
	}
    .height{
		float: right;
		display: block;
	}

</style>

<nav>
	<ul>
		<li><a aria-current='{segment === undefined ? "page" : undefined}' href='.'>home</a></li>
		<li><a aria-current='{segment === "network" ? "page" : undefined}' href='network'>network</a></li>
		<li><a aria-current='{segment === "trading" ? "page" : undefined}' href='trading'>trading</a></li>
		<li><a aria-current='{segment === "blocks" ? "page" : undefined}' href='blocks'>blocks</a></li>
		<li><a aria-current='{segment === "party" ? "page" : undefined}' href='party'>party</a></li>
	</ul>
	<span class="height">
		<a href="/blocks/{height}">{height}</a>
	</span>
</nav>
