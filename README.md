# Fastify Structured App

This is a structured Fastify application.

## Folder Structure

 ├── app  
 │ ├── handlers  
 │ ├── middlewares  
 │ ├── models  
 │ ├── routers  
 │ ├── services  
 │ ├── main.js  
 ├── node_modules  
 ├── .env  
 ├── .gitignore  
 ├── docker-compose.yml  
 ├── Dockerfile  
 ├── .env.example  
 ├── package.json  
 └── readme.md  

# Set up environment variables:
Create a .env file in the root directory and copy the content from .env.example:

cp .env.example .env

# Running the App

start.bat (or sh) to start services

# Run Tests 
Execute the test suite using Jest:
```sh
npm run test
```

# API Documentation
Swagger documentation is available at 
https://BASE_URL/docs.
