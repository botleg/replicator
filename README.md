Replicator
===

This repository contains the files for the docker image [hanzel/replicator](https://hub.docker.com/r/hanzel/replicator/). This image can replicate other services in the network. It works with docker swarm and multi-host networking. The application has one route:

* `/container-id`: creates and starts a new image similar to the one with the given `container-id`.

Usage
---

The port `443` is exposed. So you can access the service with the address `https://replicator` if the images are in the same network.

To provide the authentication for https, the following three files are needed in `/ssl` folder:

* `cert.pem`: Client certificate file
* `key.pem`: Certificate key file
* `ca.pem`: Certificate authority file

Set the following environment variable:

* `DOCKER_HOST`: The host url and port of the Docker Remote API. Eg: `tcp://192.168.99.100:2376`