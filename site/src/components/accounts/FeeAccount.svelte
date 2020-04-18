<script>
    import TwoColumnData from "../TwoColumnData.svelte";
    export let rows;
    export let type;
</script>

<h2>Fee Account ({type})</h2>
<TwoColumnData rows={rows} />
