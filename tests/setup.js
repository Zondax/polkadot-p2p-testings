import test from 'ava'
import { startNode, getMultiaddr } from './utils.js'

test.beforeEach(async t => {
	t.context.node = await startNode()
    t.context.target = await getMultiaddr()
})


test.afterEach.always(async t => {
	const { node } = t.context

    await node.stop()
})