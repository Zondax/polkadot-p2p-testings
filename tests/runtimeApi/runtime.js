import test from 'ava'
import axios from 'axios'

test('should call a "Core_version" in the runtime', async t => {
    await axios.post('http://127.0.0.1:9944/', {method:"state_call", params: ["Core_version", "0x"], id:1, jsonrpc:"2.0"})
    t.pass()
})
