# Code7 admission code test

This code base uses `Next.js` and `React` for its front-end, and `Node.js`, `Express.js`.

For the database structure it has two examples one using `MongoDB` and the other using `Postgres`.

## Before to start

Before start setting up the project to run on your local machine, set up your local `Postgres` or your Mongo Atlas `MongoDB` database.

## Get Started

Before runnig the project make sure to set up the environment variables correctly.

### Front-end

For the front-end environment variables go the `./front-end` and create new file called `.env.local` fill it with the following data:

```
API_ENDPOINT=http://localhost:5000
```

### Back-end

### Postgres

For the postgres back-end environment variables go to `./back-end-postgres` and create a new file `.env` and fill it with the following data:

```
NODE_ENV=development
APP_NAME=Code7 Back-end
APP_SESSION_SECRET=RANDOM_HEXDECIMAL_STRING_DATA
ALLOWED_DOMAIN_URL=http://localhost:3000

SEQUELIZE_DIALECT=postgres
SEQUELIZE_HOST=PG_HOST
SEQUELIZE_USERNAME=PG_USERNAME
SEQUELIZE_PASSWORD=PG_PASSWORD
SEQUELIZE_DATABASE=PG_DATABASE

JWT_ACCESS_TOKEN_SECRET=RANDOM_HEXDECIMAL_STRING_DATA
JWT_REFRESH_TOKEN_SECRET=RANDOM_HEXDECIMAL_STRING_DATA
```

### MongoDB

For the mongoDB back-end environment variables go to `./back-end-mongodb` and create a new file `.env` and fill it with the following data:

```
NODE_ENV=development
APP_NAME=Code7 Back-end
APP_SESSION_SECRET=RANDOM_HEXDECIMAL_STRING_DATA
ALLOWED_DOMAIN_URL=http://localhost:3000

ATLAS_URI=MONGO_ATLAS_DATABASE_URI

JWT_ACCESS_TOKEN_SECRET=RANDOM_HEXDECIMAL_STRING_DATA
JWT_REFRESH_TOKEN_SECRET=RANDOM_HEXDECIMAL_STRING_DATA
```

## Installing dependencies

To install all the required dependencies the back-end version of your choice

### Postgres based back-end

```
yarn concurrently:dependencies:postgres:install
```

### MongoDB based back-end

```
yarn concurrently:dependencies:mongo:install
```

## Running the project

Once the above step were completed now simply the start command for the desired back-end version

### Postgres based back-end

```
yarn concurrently:postgres:dev
```

### MongoDB based back-end

```
yarn concurrently:mongo:dev
```

From now on it should be all set up.

Now just to http://localhost:3000 in the browser.

Developed by [Davi Silva](https://github.com/davi-silva).
