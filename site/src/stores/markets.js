import { readable } from "svelte/store";
import {apiUrl} from "../config";

export function initialValue() {
    return {
        markets: new Map(),
    }
}

export function makeMarketStore(args) {
    let initial = initialValue();
    return readable(initial, makeSubscribe(initial, args));
}

function unsubscribe() {
}

function makeSubscribe(data, _args) {
    return set => {
        fetchMarketData(data, set);

        return unsubscribe;
    };
}

async function fetchMarketData(data, set) {
    try {
        // 5. Dispatch the request for the users
        const response = await fetch(apiUrl("query"), {
            "headers": {
                "content-type": "application/json"
            },
            "body": "{\"operationName\":null,\"variables\":{},\"query\":\"{\\n  markets {\\n    id\\n    name \\n tradableInstrument {\\n      instrument {\\n        id\\n        code\\n        name\\n           metadata {\\n          tags\\n        }\\n        product {\\n          ... on Future {\\n            maturity\\n                }\\n        }\\n      }\\n      marginCalculator {\\n        scalingFactors {\\n          searchLevel\\n          initialMargin\\n          collateralRelease\\n        }\\n      }\\n    }\\n    tradingMode       data {\\n      markPrice\\n      bestBidPrice, bestOfferPrice, midPrice, openInterest    }\\n    decimalPlaces\\n    accounts {\\n      type\\n      balance\\n      asset { id symbol }\\n    }\\n    orders(last: 20) {\\n      id\\n    }\\n  }\\n}\\n\"}",
            "method": "POST",
            "mode": "cors"
        });
        if(response.ok) {
            const res = await response.json();

            for (const market of res.data.markets) {
                data.markets.set(market.id,
                    market
                );
            }
            set(data);

        } else {
            const text = response.text();
            throw new Error(text);
        }

    } catch(error) {
        data.error = error;
        set(data);
    }
}

export const store = makeMarketStore()
