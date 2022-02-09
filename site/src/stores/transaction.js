import { writable } from "svelte/store";
import { apiUrl, tendermintUrl } from "../config/";

const initialValue = new Map();

function Txs() {
  const { subscribe, set, update } = writable(initialValue);

  return {
    get: async (hash) => {
      const value = initialValue.get(hash);
      if (value) {
        return value;
      } else {
        const response = await fetch(tendermintUrl(`tx?hash=${hash}`));
        const json = await response.json();
        console.log(json);
        return json.result;
      }
    },
    reset: () => set(0),
  };
}

export { Txs };
