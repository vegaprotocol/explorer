import { writable } from "svelte/store";
import { apiUrl } from "../config/";

const initialValue = new Map();

function Orders() {
  const { subscribe, set } = writable(initialValue);

  return {
    subscribe,
    get: async (id, fetch, polling) => {
      const value = initialValue.get(id);
      if (value && !polling) {
        return value;
      } else {
        const res = await fetch(apiUrl("query"), {
          headers: {
            "content-type": "application/json",
          },
          body:
            '{"operationName":null,"variables":{},"query":"{\\n  orderByID(orderId: \\"' +
            id +
            '\\") {\\n    version, id\\n    side\\n    size\\n    price\\n    timeInForce\\n    market {\\n      id\\n    }\\n    remaining\\n    party {\\n      id\\n    }\\n    createdAt\\n    expiresAt\\n    status\\n    reference\\n    type\\n    rejectionReason\\n    trades {\\n     price\\n id\\n      size\\n      createdAt\\n      aggressor\\n   market{id} \\n   buyOrder \\n sellOrder \\n createdAt \\n buyer {\\n        id\\n      }\\n      seller {\\n        id\\n      }\\n    }\\n  }\\n}\\n"}',
          method: "POST",
          mode: "cors",
          credentials: "omit",
        });

        const { data } = await res.json();
        return data.orderByID;
      }
    },
    getByReference: async (reference, fetch, polling) => {
      const value = initialValue.get(reference);
      if (value && !polling) {
        return value;
      } else {
        const res = await fetch(apiUrl("query"), {
          headers: {
            "content-type": "application/json",
          },
          body:
            '{"operationName":null,"variables":{},"query":"{\\n  orderByReference(reference: \\"' +
            reference +
            '\\") {\\n    id\\n }\\n}\\n"}',
          method: "POST",
          mode: "cors",
          credentials: "omit",
        });

        const { data } = await res.json();
        return data.orderByReferenceID;
      }
    },
    reset: () => set(0),
  };
}

export { Orders };
