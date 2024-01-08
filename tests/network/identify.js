import test from 'ava'
import '../setup.js'

test('should identify node', async t => {
    const { node, target } = t.context

   const conn = await node.dial(target)

    // Identify node
    await node.services.identify.identify(conn)

    t.pass()
})

test('should recognize all the protocols', async t => {
    const { node, target } = t.context
    t.plan(PROTOCOLS.length)

    const conn = await node.dial(target)

    // Identify node
    const result = await node.services.identify.identify(conn)

    for (const protocol of result.protocols) {
        t.true(PROTOCOLS.includes(protocol), `protocol ${protocol} not recognized`)
    }
})

// List of protocols that should be present
const PROTOCOLS = [
    '/671704481181e7d9770e0d257ffd4cc53d63377023dcc41a535a4996ae2cf32b/block-announces/1',
    '/dot/block-announces/1',
    '/671704481181e7d9770e0d257ffd4cc53d63377023dcc41a535a4996ae2cf32b/grandpa/1',
    '/paritytech/grandpa/1',
    '/671704481181e7d9770e0d257ffd4cc53d63377023dcc41a535a4996ae2cf32b/beefy/2',
    '/671704481181e7d9770e0d257ffd4cc53d63377023dcc41a535a4996ae2cf32b/validation/2',
    '/polkadot/validation/1',
    '/671704481181e7d9770e0d257ffd4cc53d63377023dcc41a535a4996ae2cf32b/collation/2',
    '/polkadot/collation/1',
    '/671704481181e7d9770e0d257ffd4cc53d63377023dcc41a535a4996ae2cf32b/transactions/1',
    '/dot/transactions/1',
    '/ipfs/ping/1.0.0',
    '/ipfs/id/1.0.0',
    '/ipfs/id/push/1.0.0',
    '/671704481181e7d9770e0d257ffd4cc53d63377023dcc41a535a4996ae2cf32b/kad',
    '/dot/kad',
    '/671704481181e7d9770e0d257ffd4cc53d63377023dcc41a535a4996ae2cf32b/req_collation/2',
    '/671704481181e7d9770e0d257ffd4cc53d63377023dcc41a535a4996ae2cf32b/req_chunk/1',
    '/polkadot/req_chunk/1',
    '/671704481181e7d9770e0d257ffd4cc53d63377023dcc41a535a4996ae2cf32b/req_available_data/1',
    '/polkadot/req_available_data/1',
    '/671704481181e7d9770e0d257ffd4cc53d63377023dcc41a535a4996ae2cf32b/req_attested_candidate/2',
    '/671704481181e7d9770e0d257ffd4cc53d63377023dcc41a535a4996ae2cf32b/sync/2',
    '/dot/sync/2',
    '/671704481181e7d9770e0d257ffd4cc53d63377023dcc41a535a4996ae2cf32b/state/2',
    '/dot/state/2',
    '/671704481181e7d9770e0d257ffd4cc53d63377023dcc41a535a4996ae2cf32b/sync/warp',
    '/dot/sync/warp',
    '/671704481181e7d9770e0d257ffd4cc53d63377023dcc41a535a4996ae2cf32b/beefy/justifications/1',
    '/671704481181e7d9770e0d257ffd4cc53d63377023dcc41a535a4996ae2cf32b/light/2',
    '/dot/light/2',
    '/671704481181e7d9770e0d257ffd4cc53d63377023dcc41a535a4996ae2cf32b/send_dispute/1',
    '/polkadot/send_dispute/1',
    '/671704481181e7d9770e0d257ffd4cc53d63377023dcc41a535a4996ae2cf32b/req_statement/1',
    '/polkadot/req_statement/1',
    '/671704481181e7d9770e0d257ffd4cc53d63377023dcc41a535a4996ae2cf32b/req_pov/1',
    '/polkadot/req_pov/1',
    '/671704481181e7d9770e0d257ffd4cc53d63377023dcc41a535a4996ae2cf32b/req_collation/1',
    '/polkadot/req_collation/1'
]