Docker is Maintainerr's supported method of installation.

Images for amd64 & arm64 are available under `jorenn92/maintainerr` and `ghcr.io/jorenn92/maintainerr`.
The containers data location is set as /opt/data. A docker [volume][tooltip] is strongly encouraged to persist your configuration.

[tooltip]: https://docs.docker.com/storage/volumes/#start-a-container-with-a-volume "Click here to be taken to the Docker documentation page on volumes."


> !!! info
    You have the <font color="orange"> option </font> to define a User and Group ID for running the container. Maintainerr will utilize the user:group setting as it's running user (inside the container), and any files it generates within your host data volume will be associated with this designated user and group. If not explicitly specified, the default UID:GID is set to 1000:1000.
    <font color="red">See [Run](#run) and [Compose](#compose) below for examples.</font>

!!! tip annotate
      **Make sure your data volume is read/writeable by this UID:GID!**

      It is possible that you will need to change permissions on the host's data directory. (1)

1. The data directory location largely depends on how you are installing Maintainerr. If using docker, these are the two places where you set the host data directory.

    Docker run:

          -v ./data:/opt/data \ 

    Docker compose: 

          volumes:
          - type: bind
            source: ./data
            target: /opt/data

=== "Linux Permissions Example"
          chown -R 1000:1000 /opt/data

=== "Windows Permissions"
	
		1. Right-click the file or folder you want to set permissions for and select "Properties".
		2. Navigate to the "Security" tab.
		3. Click on the "Edit" button to change permissions.
		4. In the permissions window, select a user or group from the list. Then, check or uncheck the boxes in the "Permissions for [username]" section to grant or deny specific permissions (like "Read", "Write", etc.).
		5. Click "OK" to apply the changes.


## Run
``` {.bash .annotate}
    docker run -d \
    --name maintainerr \
    -e TZ=Europe/Brussels \
    -v ./data:/opt/data \
    -u 1000:1000 \
    -p 6246:6246 \ # (1)!
    --restart unless-stopped \
    ghcr.io/jorenn92/maintainerr:latest # (2)!
```

1. This is defined as `host:container`.
2. For this line, you could also use `jorenn92/maintainerr` instead, to use the DockerHub image. The `latest` tag at the end is not required, unless you want to specify which tag to use.

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

You may alternatively use a third-party updating mechanism, such as [Watchtower](https://github.com/containrrr/watchtower), to keep Maintainerr up-to-date automatically.

## Compose

Define the Maintainerr service in your docker-compose.yml as follows.

``` {.yaml .annotate}
version: '3'

services:
    maintainerr:
        image: ghcr.io/jorenn92/maintainerr:latest # (1)!
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
          - 6246:6246 # (2)!
        restart: unless-stopped
```

1. For this line, you could also use `jorenn92/maintainerr` instead, to use the DockerHub image. The `latest` tag at the end is not required, unless you want to specify which tag to use.
2. This is defined as `host:container`.

Save your docker-compose.yml file.
Then, while in the directory where your docker-compose file exists, start all services defined in your Compose file:

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
