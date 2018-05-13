# Payroll API

## Installation

1. Docker, docker-compose, docker-machine
2. python3, pip3, node, npm, nodemon

### Technologies
1. django
2. mariadb

## Starting The Server

```Bash
make up
```

## Rebuilding The Docker Container

```Bash
make build && make up

OR

make reup
```

## Running Migrations
```Bash
# If you are prompted to migrate the database then use the following commands
# to ssh into the api container and run the migrations.
make ssh
python manage.py migrate
```

## Commands

```Bash
# Builds, (re)creates, starts, and attaches to container for the API
make up

# Starts an already built API
make start

# Stops the API
make stop

# SSH into the local API container
make ssh

# Builds the API
make build
```

## Accessing The Local Django Server

```Bash
localhost:8080
```

## Routes

```Bash
# Handles the csv file uploads
/record/upload/

# Fetches the list of payments for the payroll record
/payment/all/
```