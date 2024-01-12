# NOTES

## inspect healthcheck for docker-compose

```
$ docker inspect --format "{{json .State.Health }}" misc-polkadot-1 | jq
```

## Recording blocks

See `./misc/docker-compose.yml` and run it `docker compose -f misc/docker-compose.yml`

## Generate new chain spec file with custom runtime

See https://chainsafe.github.io/gossamer/usage/import-runtime/
Example plain file https://docs.substrate.io/assets/tutorials/relay-chain-specs/plain-local-chainspec.json

### Detailed procedure

Start the gossamer container (because it is not possible with polkadot has it doesn't have the `import-runtime` needed command).
```
$ docker run -d -v ./misc/wasm:/tmp/wasm -v ./misc/chainspec:/tmp/chainspec gossamer
$ docker exec -ti elegant_panini bash
$ gossamer import-runtime --wasm-file /tmp/wasm/polkadot_runtime.compact.compressed.wasm --chain /tmp/chainspec/zondax-local-template-spec.json > zondax-local-spec.json
$ gossamer build-spec --raw --chain zondax-local-spec.json > zondax-local-spec-raw.json
```

## Test your rpc-json call

```
$ curl http://127.0.0.1:9944/ \
-X POST \
-H "Content-Type: application/json" \
--data '{"method":"rpc_methods","params":[],"id":1,"jsonrpc":"2.0"}'
```