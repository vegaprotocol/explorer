import { writable } from 'svelte/store';
import { apiUrl } from '../config/'

const initialValue = new Map()

function Parties() {
	const { subscribe, set, update } = writable(initialValue);

	return {
        subscribe,
        get: async (id, polling) => {
            const value = initialValue.get(id)
            if (value && !polling) {
                return value
            } else {
                /*
                    proposals {
      id
      reference
      state
      datetime
    }
    positions {
      market { id }
      openVolume
      realisedPNL
      unrealisedPNL
      averageEntryPrice

      margins {
        maintenanceLevel
        searchLevel
        initialLevel
        collateralReleaseLevel
      }
    }
  }
                 */
                const res = await fetch(apiUrl('query'), {
                    "headers": {
                        "content-type": "application/json",
                    },
                    "body": "{\"operationName\":null,\"variables\":{},\"query\":\"{\\n  party(id: \\\"" +id+ "\\\") {\\n    id\\n    proposals {\\n      id\\n      reference\\n      state\\n      datetime\\n    }\\n    positions {\\n      market {\\n        id\\n      }\\n      openVolume\\n      realisedPNL\\n      unrealisedPNL\\n      averageEntryPrice\\n      margins {\\n        maintenanceLevel\\n        searchLevel\\n        initialLevel\\n        collateralReleaseLevel\\n      }}\\n    accounts {\\n      type\\n      asset { id symbol }\\n      market {\\n        id\\n        decimalPlaces\\n      }\\n      balance\\n    }\\n    orders(last: 30) {\\n      id\\n      size\\n      price\\n      side\\n      remaining\\n      market{id} trades {\\n        id\\n        size\\n        aggressor\\n        size\\n        seller {\\n          id\\n        }\\n        buyer {\\n          id\\n        }\\n      }\\n    }\\n  }\\n}\\n\"}",
                    "method": "POST",
                    "mode": "cors",
                    "credentials": "omit"
                });

                const { data } = await res.json()
                    //                update(initialValue.set(id, data.party))
                return data.party
            }
       },
		reset: () => set(0)
	};
}

export {Parties}
