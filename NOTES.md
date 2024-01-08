# NOTES

## inspect healthcheck for docker-compose

```
$ docker inspect --format "{{json .State.Health }}" misc-polkadot-1 | jq
```

## Recording blocks

See `./misc/docker-compose.yml` and run it `docker compose -f misc/docker-compose.yml`