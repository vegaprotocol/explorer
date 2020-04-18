<script>
	import Nav from '../components/Nav.svelte';

	export let segment;
</script>

<style>
	main {
		position: relative;
		max-width: 66em;
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}

	@media (max-width: 767.98px) {
		main {
			padding: 0;
		}
	}
</style>

<Nav {segment}/>

<main>
	<slot></slot>
</main>