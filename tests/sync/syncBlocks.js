import test from 'ava'
import { lpStream } from 'it-length-prefixed-stream'
import { setTimeout } from "timers/promises"
import '../setup.js'

// We verify sepecification defined here 
// https://spec.polkadot.network/chap-networking

test('should receive announce block message', async t => {
    const { node, target } = t.context
    t.timeout(21000)

    // this is our protocol id
    const DOT_BLOCK_ANNOUNCES_PROTOCOL = '/dot/block-announces/1'
    await node.handle(DOT_BLOCK_ANNOUNCES_PROTOCOL, ({ stream }) => {
        const lp = lpStream(stream)

        t.pass()
    })

    const stream = await node.dialProtocol(target, DOT_BLOCK_ANNOUNCES_PROTOCOL)

    // wait the time that a new block is generated
    await setTimeout(20000)
})

test.skip('should sync 10 blocks', async t => {
    const { node, target } = t.context

    // this is our protocol id
    const DOT_SYNC_PROTOCOL = '/dot/sync/2'
    // await node.handle(DOT_SYNC_PROTOCOL, ({ stream }) => {
    //     const lp = lpStream(stream)
    //     console.log(lp)
    // })

    const stream = await node.dialProtocol(target, DOT_SYNC_PROTOCOL)
    const lp = lpStream(stream)
    lp.write(Uint8Array.from([0, 1, 2, 3, 4]))

    console.log(await lp.read())

    t.pass()
})

test.todo('blocks headers should be consecutive')