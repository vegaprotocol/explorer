import { readable } from "svelte/store";
import { tendermintUrl } from "../config";

let timer

export function initialValue() {
    return {
        height: '0',
        blocks: new Map(),
        fetchBlock: false
    }
}

export function makeBlockStore(args) {
    let initial = initialValue();
    return readable(initial, makeSubscribe(initial, args));
}

function unsubscribe() {
    return
}

function makeSubscribe(data, _args) {
    return set => {
        if (!timer) {
            timer = setInterval(() => {
                fetchBlockData(data, set)
            }, 5000)
        }

        fetchBlockData(data, set);

        return unsubscribe;
    };
}

async function fetchBlockByHeight(height, data, set) {
    try {
        const response = await fetch(tendermintUrl('block?height=' + height));

        if(response.ok) {
            const res = await response.json();
            const block = res.result.block_meta;

            data.blocks.set(block.header.height, {
              block
            });

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

async function fetchBlockData(data, set) {
    try {
        const response = await fetch(tendermintUrl('blockchain'));

        if(response.ok) {
            const res = await response.json();
            data.height = res.result.last_height
            res.result.block_metas.forEach(block => {
                data.blocks.set(block.header.height, {
                   block
                });
            })

            data.fetchBlock = (height) => {
                fetchBlockByHeight(height, data, set)
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

export const store = makeBlockStore()
