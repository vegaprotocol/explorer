<script>
    export let text;
    export let href = false;
    let copyElement;
    function copyReaction(){
      copyElement.innerHTML = '✅';
      setTimeout(() => {
          if (copyElement) {
              copyElement.innerHTML = '📋'
          }
      }, 3000)
    }
</script>
<style>
    .firstPart, .lastPart {
        display: inline-block;
        vertical-align: bottom;
        white-space: nowrap;
        overflow: hidden;
    }

    .firstPart {
        max-width: calc(100% - 3.68em);
        min-width: 1.76em;
        text-overflow: ellipsis;
    }

    .lastPart {
        max-width: calc(100% - 2.76em);
        direction: rtl;
    }

    .hash-wrapper {
        display: inline;
        white-space: nowrap;
        overflow: hidden;
        position: relative;
    }

    b {
        display: none;
    }

    .hash-wrapper:hover b {
        position: absolute;
        padding: 2px 5px;
        background: rgba(255,255,255,0.8);
        right: 4px;
        top: -4px;
        display: inline-block;
        cursor: pointer;
    }

    a span {
       text-decoration: underline;
    }

</style>

{#if text}
<div class="hash-wrapper">
    {#if text.length > 20}
            {#if href}
            <a href={href}>
                <span class="firstPart">{text}</span><span class="lastPart">{text.substr(-5)}</span>
            </a>
            {:else}
                <span class="firstPart">{text}</span><span class="lastPart">{text.substr(-5)}</span>
            {/if}
    {:else}
        {text}
    {/if}
</div>
{/if}
