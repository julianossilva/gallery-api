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

### Before start
Access minio and add credentials (ACCESS_KEY and SECRET_KEY).
Create a bucket too.