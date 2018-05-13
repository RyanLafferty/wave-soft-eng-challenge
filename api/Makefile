# docker commands
DOCKER_COMMAND := docker
DOCKER_COMPOSE_COMMAND := docker-compose
DOCKER_MACHINE_COMMAND := docker-machine
DOCKER_SWARM_COMMAND := docker swarm

# docker compose files
APP_DOCKER_COMPOSE := -f docker-compose.yml

# app containers
APP_CONTAINER := app

# db containers
DB_CONTAINER := db


# app
.PHONY: up start stop ssh db build reup

up:
	$(DOCKER_COMPOSE_COMMAND) $(APP_DOCKER_COMPOSE) up
start:
	$(DOCKER_COMPOSE_COMMAND) $(APP_DOCKER_COMPOSE) start
stop:
	$(DOCKER_COMPOSE_COMMAND) $(APP_DOCKER_COMPOSE) stop
ssh:
	$(DOCKER_COMMAND) exec -it $(APP_CONTAINER) /bin/bash
db:
	$(DOCKER_COMMAND) exec -it $(DB_CONTAINER) /usr/bin/mysql -u root -D payroll --password=root
build:
	$(DOCKER_COMPOSE_COMMAND) $(APP_DOCKER_COMPOSE) build
reup: build up
