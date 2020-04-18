<script>
    export let id
    export let short = false
    let display = id

    if (short) {
       display = Number(id.split('-')[1]).toString()
    }
</script>

<a href='/trading/orders/{id}'>
  {display}
</a>