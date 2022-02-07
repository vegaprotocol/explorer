# Vega Block Explorer

> :warning: This repo is a hacky Vega block explorer. The API is useful, though.

[![Netlify Status](https://api.netlify.com/api/v1/badges/4fff1f7f-315e-46dd-b821-2ddae569ebbc/deploy-status)](https://explorer.vega.trading)

This repo contains two things:
- A Go service that unpacks Vega transactions from Tendermint
- A client-side block explorer

## API
The [API](https://github.com/vegaprotocol/explorer/tree/master/api) is a handy tool for decoding Vega transactions. By posting a block height and node to it, you will get back the decoded transactions:

| Property  | Value | Value |
| ------------- | ------------- | ------------- |
| `block_height`  | integer  | The block you are interested in |
| `node_url`  | string  | The URL to a node serving a [Tendermint RPC interface](https://docs.tendermint.com/master/rpc/) |

### Example request
```bash
curl 'https://explorer.vega.trading/.netlify/functions/chain-explorer-api' \
      --data-raw '{"block_height":3,"node_url":"https://n01.testnet.vega.xyz/tm/"}'
```

```json
[
  {
    "Type": "RegisterNewNode",
    "Command": "{\"pubKey\":\"8zibj9deRRE6QbR6fz2dh2NGicFTGPyezhz0Sm7jFic=\",\"chainPubKey\":\"FiTeZCDdqSkwgtSDgCiUaJgVDSg1FhJJ0tcx6AGT4kWLd1uzQg==\"}",
    "Sig": "p11WREwa6ydeE7F+BWYWF0luHKaPlOsJVupFv3ZCr7ZmyUi7z5S6JBEsky0hFfa2vY7WLhTZFJPqFBJqtcMoBw==",
    "PubKey": "0xf3389b8fd75e45113a41b47a7f3d9d87634689c15318fc9ece1cf44a6ee31627",
    "Nonce": 15906718751856568000
  }
]
```

# Site
The web-frontend is a (bad) [Sapper](https://sapper.svelte.dev) project. Don't look to it for a good example of how to use [Svelte](https://svelte.dev/), or sapper. More information is available in [the README](./site/README.md).

# Deployment
Both the Go service & site are deployed to Netlify on build. Check out the Makefile to see what is involved there.

# Dependencies
The resulting site is *fragile* as it depends on:
- The Go service correctly decoding transactions;
- [Vega](https://github.com/vegaprotocol/vega)'s GraphQL API
- [Vega](https://github.com/vegaprotocol/vega)'s REST API
- [Tendermint](https://github.com/tendermint/tendermint)'s RPC

So the chances of updates somewhere along the line breaking this are... pretty high!
