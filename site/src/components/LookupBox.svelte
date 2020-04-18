<script>
  let message = "Experimental search. Enter an ID above.";
  let link = "";

  function detect(e) {
    const i = e.target.value.toLowerCase();

    if (i.substr(0, 2) === "0x") {
      message = "This looks like a party id 🎉";
      link = `/party/${i}`;
    } else if (i.indexOf("-") !== -1 && i.toLowerCase()[0] === "v") {
      const split = i.split("-");
      const block = Number(split[0].substr(1)).toString();
      if (split.length === 2) {
        // Order
        message = "This looks like an order 🤗";
        link = `/trading/orders/${i.toUpperCase()}`;
      } else {
        // Trade
        message = "This looks like a trade 🤗";
        link = `/trading/orders/${split[0].toUpperCase()}-${split[1]}`;
      }
    } else if (!isNaN(Number(i))) {
      message = "That looks like a block id‍";
      link = `/blocks/${i}`;
    } else if (i.indexOf("-") !== -1) {
      // Probably an order reference
      message = "Hmm. Maybe an order reference? 🤔";
      link = false;
    } else if (i.length === 0 || i.trim().length === 0) {
      message = "Could you say that again? 🧏";
      link = false;
    } else if (i.length <= 8) {
      message = "Please enter something real 🤷‍";
      link = false;
    } else {
      // Could be a party
      message = "Last guess. Could be a party? 🤔";
      link = `/party/${i}`;
    }
  }
</script>

<div class="lookup">
  <h2>Paste an ID below to get started 🕵️</h2>
  <form>
    <input class="input" type="text" on:input={detect} />
  </form>
</div>

<p class="result">
  {message}
  {#if link}
    <a href={link}>Go!</a>
  {/if}
</p>

<style>
  .lookup {
    text-align: center;
  }

  .input {
    font-size: 2em;
    padding: 8px;
  }

  .result {
    text-align: center;
  }
</style>
