<br />
<div align="center">
<h3 align="center">NestJS Logger</h3>

  <p align="center">
    A Nest.js production-ready logger implementation.
  </p>
</div>


## Introduction

This project implements a production-ready logger for Nest.js applications using Winston and Morgan on a clean architecture (Hexagonal Architecture).

You can read a detailed explanation of the project on the following article: https://medium.com/p/d03e3bb56772/edit

That implements a production-ready system advanced or basic Microservices or Monoliths projects applying concepts like:

* Correlation IDs
* Decoupled log transporters
* Log levels
* Logging Rules
* Log formatters

## Project structure

The project is structured in a Nest.js monorepo.

The folder structure is as follows:

* **apps**: It contains the project's executable applications, in this case, the REST API.
    * **api**: It contains the REST API developed with Nest.js.
* **libs**: It contains the project packages or Bounded Contexts on a DDD language.
  * **shared**: It contains the code of the Shared Kernel.
      * **src**: It contains the source code.
          * **config**: It contains de config module.
          * **context**: It contains the context module.
          * **logger**: It contains the logger module.

## Key concepts

### Architecture

The project is structured on a Hexagonal Architecture, so it has the following layers:

* **Application**
* **Domain**
* **Infrastructure**

### Logging Libraries

We use Winston to manage the logs and Morgan to log the HTTP requests. All that is managed by the `LoggerModule`.

To manage Winston transports, we use the `WinstonLoggerTransportsKey` DI token that is defined on the `LoggerModule`.

### Decoupling Logging library

To decouple the Logging library from our domain, we have created a `Logger` interface that is implemented by the `WinstonLogger` class.

If we want to change the logging library, we only have to implement the `Logger` interface and update the dependecy on the `LoggerModule`.

### NestJS Logger

NestJS uses a custom logger for bootstrap and internal logging. To use our logger, we need to create an adapter that implements the NestJS `LoggerService` interface. That is implemented in the `NestjsLoggerServiceAdapter` class.

We pass that adapter to the NestJS app on the `main.ts` file.

### Correlation IDs

To manage correlation IDs, we use `nestjs-cls` library that implements a Local Storage. With that, we can isolate and share data on a request lifecycle.

The system reads the `x-correlation-id` HTTP header and stores it on the Local Storage. If the header is not present, the system generates a new UUID and stores it on the Local Storage.

### Context Wrapper

To add custom data to all the logs, we use a wrapper `LoggerContextWrapper`.

That class is injected with a Transient scope. By that, we can get the caller class and add it to the logs.

## Installation

* Install dependencies
  ```sh
  yarn install
  ```

* Copy file .env.example a .env
  ```sh
  cp .env.example .env
  ```

* Start REST API
  ```sh
  yarn start:dev api
  ```
  
* Test REST API
  ```sh
  curl -X GET http://localhost:3000
  ```
  
* Test REST API with correlation ID
  ```sh
    curl -X GET http://localhost:3000 -H "x-correlation-id: 87815cc5-d0f2-41e5-a731-ac55bbb733e8"
  ```
  
## To do

We will continue working on this project to add new features

PRs are welcome!

- [ X ] Add testing.