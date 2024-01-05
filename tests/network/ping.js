import test from 'ava'
import '../setup.js'

test('should ping node', async t => {
    const { node, target } = t.context

    await node.dial(target)

    // Ping node
    const latency = await node.services.ping.ping(target)
    // console.log(latency)

    t.pass()
})
