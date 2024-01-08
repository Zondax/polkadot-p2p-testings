import { multiaddr } from '@multiformats/multiaddr'
import { createLibp2p } from 'libp2p'
import { noise } from '@chainsafe/libp2p-noise'
import { yamux } from '@chainsafe/libp2p-yamux'
import { mplex } from '@libp2p/mplex'
import { tcp } from '@libp2p/tcp'
import { createEd25519PeerId } from '@libp2p/peer-id-factory'
import { pingService } from 'libp2p/ping'
import { identifyService } from 'libp2p/identify'

async function startNode () {
    const peerId = await createEd25519PeerId()

    const node = await createLibp2p({
        transports: [tcp()],
        streamMuxers: [yamux(), mplex()],
        connectionEncryption: [noise()],
        connectionManager: {
            minConnections: 1, // to avoid auto dial (default is 50)
        },
        addresses: {
            listen: ['/ip4/0.0.0.0/tcp/0']
        },
        services: {
            ping: pingService(),
            identify: identifyService(),
        },
        peerId,
    })
    // start libp2p
    await node.start()

    // node.getMultiaddrs().forEach((ma) => console.log(ma.toString()))

    return node
}

function getMultiaddr () {
    // this hardcoded in the dockerfile fir polkadot node
    const targetNode = multiaddr('/ip4/127.0.0.1/tcp/30333/p2p/12D3KooWAu9cGVsqrxRf5cDfAJQQjP7Gn4J1KTGtdjhWRb5cu5WL')
    return targetNode
}

export {
    startNode,
    getMultiaddr,
}