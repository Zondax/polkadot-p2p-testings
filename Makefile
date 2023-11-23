download:
	wget https://github.com/paritytech/polkadot-sdk/releases/download/polkadot-v1.2.0/polkadot
	wget https://github.com/paritytech/polkadot-sdk/releases/download/polkadot-v1.2.0/polkadot-execute-worker
	wget https://github.com/paritytech/polkadot-sdk/releases/download/polkadot-v1.2.0/polkadot-prepare-worker

start:
	./polkadot --dev --port 30333
