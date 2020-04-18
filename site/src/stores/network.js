import { readable } from "svelte/store";
import { apiUrl, tendermintUrl } from "../config";

let timer;

export function initialValue() {
  return {
    peerCount: 0,
    peers: new Map(),
  };
}

export function makeNetworkStore(args) {
  let initial = initialValue();
  return readable(initial, makeSubscribe(initial, args));
}

function unsubscribe() {
  return;
}

function makeSubscribe(data, _args) {
  return (set) => {
    if (!timer) {
      timer = setInterval(() => {
        fetchNetworkData(data, set);
      }, 5000);
    }

    fetchNetworkData(data, set);

    return unsubscribe;
  };
}

async function fetchNetworkData(data, set) {
  try {
    const response = await fetch(tendermintUrl("validators"));

    if (response.ok) {
      const res = await response.json();

      data.peerCount = res.result.total;

      res.result.validators.forEach((validator) => {
        data.peers.set(validator.address, validator);
      });
       


      const vegaResponse = await fetch(apiUrl("query"), {
        headers: {
          "content-type": "application/json",
        },
        body: "{\"operationName\":null,\"variables\":{},\"query\":\"{\\n  nodes {\\n    id\\n    pubkey\\n    tmPubkey\\n    ethereumAdddress\\n    infoUrl\\n    location\\n    stakedByOperator\\n    stakedByDelegates\\n    stakedTotal\\n    pendingStake\\n    status\\n    score\\n    normalisedScore\\n    name\\n    avatarUrl\\n  }\\n}\\n\"}",
        method: "POST",
        mode: "cors",
      });

      if (vegaResponse.ok) {
        const res = await vegaResponse.json();

        data.peers.forEach(validator => {
           const r = res.data.nodes.find(n => n.tmPubkey === validator.pub_key.value)

           const aug = Object.assign({}, validator, r)
           data.peers.set(validator.address, aug);
        });


        set(data);
     } 
   } else {
      const text = response.text();
      throw new Error(text);
    }
  } catch (error) {
    data.error = error;
    set(data);
  }
}

export const store = makeNetworkStore();
