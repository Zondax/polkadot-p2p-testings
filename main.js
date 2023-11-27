import { multiaddr } from '@multiformats/multiaddr'
import { createLibp2p } from 'libp2p'
import { noise } from '@chainsafe/libp2p-noise'
import { yamux } from '@chainsafe/libp2p-yamux'
import { mplex } from '@libp2p/mplex'
import { tcp } from '@libp2p/tcp'
import { webSockets } from '@libp2p/websockets'
import { createEd25519PeerId } from '@libp2p/peer-id-factory'
import { pingService } from 'libp2p/ping'
import { setTimeout } from "timers/promises"

async function main() {
    console.log("***** Testing Polkadot *****")

    const peerId = await createEd25519PeerId()

    const node = await createLibp2p({
        transports: [tcp(), webSockets()],
        streamMuxers: [yamux(), mplex()],
        connectionEncryption: [noise()],
        addresses: {
            listen: ['/ip4/0.0.0.0/tcp/0']
        },
        services: {
            ping: pingService(),
        },
        peerId,
    })
    // start libp2p
    await node.start()
    console.log('libp2p has started')

    // print out listening addresses
    console.log('listening on addresses:')
    node.getMultiaddrs().forEach((ma) => console.log(ma.toString()))

    const targetNode = multiaddr('/ip4/127.0.0.1/tcp/30333/p2p/12D3KooWAu9cGVsqrxRf5cDfAJQQjP7Gn4J1KTGtdjhWRb5cu5WL')
    
    const conn = await node.dial(targetNode)

    // Run Test 1 - Ping node

    // Run Test 2 - Sync node with blocks

    // wait
    await setTimeout(20000)

    await node.stop()
    console.log("node stopped")
}

main()