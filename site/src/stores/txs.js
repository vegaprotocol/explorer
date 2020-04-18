import { tendermintUrl } from "../config"

export async function getTx() {
    let res = await fetch(blockUrl(), {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            block_height: parseInt(slug, 10),
            node_url: tendermintUrl()
        })
    })

    let json = await res.json()

    return json.map(d => {
        d.Command = JSON.parse(d.Command)
        return d
    })

}