Docker is the easiest way to start Maintainerr.

Images for amd64 & arm64 are available under `jorenn92/maintainerr` and `ghcr.io/jorenn92/maintainerr`.
The containers data location is /opt/data. A docker volume/bind is strongly encouraged to persist your configuration.

> !!! info
    You have the <font color="orange"> option </font> to define a User and Group ID for running the container. Maintainerr will utilize the user:group setting as it's running user (inside the container), and any files it generates within your host data volume will be associated with this designated user and group. If not explicitly specified, the default UID:GID is set to 1000:1000.
    <font color="red">See [Run](#run) and [Compose](#compose) below for examples.</font>

Take note &darr;
> !!! warning
      **Make sure your data volume is read/writeable by this UID:GID!**
 >> `It is possible that you will need to change permissions on the hosts data directory.`
 >>:bulb:[Linux Permission Command](https://www.ibm.com/docs/en/aix/7.1?topic=c-chown-command)
 >>:bulb:[Windows Permissions](https://v2cloud.com/tutorials/how-to-change-folder-permissions-on-windows)

If you are still lost about permissions or something else so far, reach out on &nbsp; [Discord :fontawesome-brands-discord:](https://discord.gg/WP4ZW2QYwk){.md-button--primary .md-button}

## Run

```bash
docker run -d \
--name maintainerr \
-e TZ=Europe/Brussels \
-v ./data:/opt/data \
-u 1000:1000 \
-p 6246:6246 \
--restart unless-stopped \
ghcr.io/jorenn92/maintainerr:latest
```

### Updating

Stop and remove the existing container:

```bash
docker rm -f maintainerr
```

Pull the latest image:

```bash
docker pull ghcr.io/jorenn92/maintainerr:latest
```

Finally, run the container with the same parameters you originally used to create the container.

You may alternatively use a third-party updating mechanism, such as Watchtower or Ouroboros, to keep Maintainerr up-to-date automatically.

## Compose

Define the Maintainerr service in your docker-compose.yml as follows.

```Yaml
version: '3'

services:
    maintainerr:
        image: ghcr.io/jorenn92/maintainerr:latest # or jorenn92/maintainerr:latest
        container_name: maintainerr
        user: 1000:1000
        volumes:
          - type: bind
            source: ./data
            target: /opt/data
        environment:
          - TZ=Europe/Brussels
#      - DEBUG=true # uncomment to enable debug logs
        ports:
          - 6246:6246
        restart: unless-stopped
```

Then, start all services defined in your Compose file:

```bash
docker compose up -d
```

### Updating

Pull the latest image:

```bash
docker compose pull
```

Then, restart all services defined in the Compose file:

```bash
docker compose up -d
```
