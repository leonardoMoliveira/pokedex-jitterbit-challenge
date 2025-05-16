# Pokédex

This repository is a template for a Pokédex application. It contains a server-side REST API built using [NestJS](https://nestjs.com) and a client-side single-page application built in [Angular](https://angular.dev).

## Architectural Approach (API)

The `api/` project follows a modular and layered architecture using NestJS. The main principles are:

- **Separation of Concerns:** Controllers handle HTTP requests, services encapsulate business logic, and use cases orchestrate application flows.
- **Use Cases:** Business logic is implemented in use case classes, which are injected into controllers.
- **DTOs and Interfaces:** Data Transfer Objects (DTOs) and interfaces are used to define the shape of data exchanged between layers and with external APIs.
- **Exception Handling:** Custom exceptions are used to provide meaningful error responses and to decouple error handling from framework-specific exceptions.
- **Dependency Injection:** All dependencies are injected, making the codebase modular and easy to test.

## Future Improvements

- Implement hexagonal architecture to make API business rules decoupled from external APIs, frameworks, and databases.
- Cache the response of PokeAPI since it is an open source API with limited resources.
- Treat errors in a more detailed way with custom exceptions and retries.
- Install linters such as ESLint + Prettier to enforce code style.
- Dockerize both applications (API and App) for easier deployment and development.

## Prerequisites
* [Node.js v20](https://nodejs.org/en)

## Setup
1. Clone the repository.
2. Install dependencies:
    ```shell
    cd /path/to/cloned/pokedex/
    cd api/
    npm install
    cd ../app/
    npm install
    ```

## Build
To build both projects:
```shell
cd api/
npm run build
cd ../app/
# (Angular builds automatically on serve, or use:)
npm run build
```

## Run
In two separate shells, start the API and app:
```shell
cd api/
npm run start
```
```shell
cd app/
npm run start
```
Both the API and app will rebuild as changes are made to them.
