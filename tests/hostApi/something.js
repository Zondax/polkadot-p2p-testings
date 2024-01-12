import test from 'ava'
import axios from 'axios'

test('should call a "ZondaxTest_get_len" in the host api', async t => {
    const result = await axios.post('http://127.0.0.1:9944/', {method:"state_call", params: ["ZondaxTest_get_len", "0x"], id:1, jsonrpc:"2.0"})
    console.log(result.data)
    t.pass()
})
