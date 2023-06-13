# galery-api

## Install dependencies
Install dependencies with npm.
```
npm install
```

## Create a .env file similar to .env.example
Copy .env.example as .env and edit. Tests and docker will need .env file.
```
cp .env.example .env
```

## Migrations
Run migrations with prisma.
```
npx prisma migrate dev
```

## Test
Run tests with npm.
```
npm test
```

## Develop inside container with neovim and tmux
Start containers and attach shell to app container

execute **dev.sh** to start containers and attach a shell.

### Scripts
- **start_services.sh**: start only containers with dependencies.
- **stop_containers.sh**: stop all containers.
- **rebuild_containers.sh**: rebuild all containers.
- **remove_containers.sh**: remove all containers.

###