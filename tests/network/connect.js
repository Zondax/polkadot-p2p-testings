import test from 'ava'
import { createLibp2p } from 'libp2p'
import { noise } from '@chainsafe/libp2p-noise'
import { yamux } from '@chainsafe/libp2p-yamux'
import { mplex } from '@libp2p/mplex'
import { tcp } from '@libp2p/tcp'
import { createEd25519PeerId } from '@libp2p/peer-id-factory'
import { getMultiaddr } from '../utils.js'

test.afterEach.always(async t => {
	const { node } = t.context

    await node.stop()
})

// Verifying network specification
// https://spec.polkadot.network/chap-networking

test('should connect to node', async t => {
    const peerId = await createEd25519PeerId()
    const node = await createLibp2p({
        transports: [tcp()],
        streamMuxers: [yamux(), mplex()],
        connectionEncryption: [noise()],
        addresses: {
            listen: ['/ip4/0.0.0.0/tcp/0']
        },
        peerId,
    })
    t.context.node = node

    await node.start()

    const target = getMultiaddr()
    await node.dial(target)
    t.pass()
})

test('reject connection ( missing yamux )', async t => {
    const peerId = await createEd25519PeerId()
    const node = await createLibp2p({
        transports: [tcp()],
        streamMuxers: [mplex()],
        connectionEncryption: [noise()],
        addresses: {
            listen: ['/ip4/0.0.0.0/tcp/0']
        },
        peerId,
    })
    t.context.node = node

    await node.start()

    const target = getMultiaddr()
    try {
        await node.dial(target)
    } catch {
        t.pass()
    }
})


test('should connect without mplex', async t => {
    const peerId = await createEd25519PeerId()
    const node = await createLibp2p({
        transports: [tcp()],
        streamMuxers: [yamux()],
        connectionEncryption: [noise()],
        addresses: {
            listen: ['/ip4/0.0.0.0/tcp/0']
        },
        peerId,
    })
    t.context.node = node
    await node.start()

    const target = getMultiaddr()
    await node.dial(target)
    t.pass()
})

test('should reject unencrypted connection', async t => {
    const peerId = await createEd25519PeerId()
    const node = await createLibp2p({
        transports: [tcp()],
        streamMuxers: [yamux(), mplex()],
        connectionEncryption: [],
        addresses: {
            listen: ['/ip4/0.0.0.0/tcp/0']
        },
        peerId,
    })
    t.context.node = node

    await node.start()

    const target = getMultiaddr()
    try {
        await node.dial(target)
    } catch {
        t.pass()
    }
})