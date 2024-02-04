# Backend Server

Sample chat using tailwindcss socket.io and sign-in and sign-up authentication with api

sample backend server with api/auth/sign-in and api/auth-sign-in for authentication jwt

## Features

- prisma orm
- authentication jwt
- socket.io
- redis
- avatar uploading using service cloudinary


## Getting Started


This project was built to be used with the front end for authentication and communication via socket.io

### Prerequisites

- [frontend](https://github.com/jefeez/umbrella)


### Installation

Step-by-step instructions on how to install this project.

you need .env filer on project with this line below

```
PORT = 3000
CORS = *
DATABASE_URL = *
SECRET_JWT = *
JWT_EXPIRE_IN = 1h
CLOUDINARY_URL = *
REDIS_URL = *
```

```bash
git clone https://github.com/jefeez/umbrella-server
cd umbrella-server
yarn install
npx prisma migrate dev --name user
yarn start:dev 
yarn build
yarn start
```
