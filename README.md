<br />
<div align="center">
<h3 align="center">NestJS Logger</h3>

  <p align="center">
    A Nest.js production-ready logger implementation.
  </p>
</div>


## Introduction

This project implements a production-ready logger for Nest.js applications using Winston and Morgan on a clean architecture (Hexagonal Architecture).

That implements a production-ready system advanced or basic Microservices or Monoliths projects applying concepts like:

* Correlation IDs
* Decoupled log transporters
* Log levels


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
  
## To do

We will continue working on this project to add new features

PRs are welcome!

- [ ] Add testing.