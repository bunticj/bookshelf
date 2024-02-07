# Bookshelf

## Project Overview

The **Bookshelf** project is a REST API developed using a containerized-modular approach. This architecture leverages Docker containers to encapsulate key components, providing portability and isolation. The system is designed for book management, allowing users to add their own books and manage them effectively. It supports two types of roles: author and admin.

Swagger API docs on: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

1. **MariaDB Container**:
   - Responsible for data storage and retrieval. Initialize the database using 'DbSetup.sql' script in the init directory.

2. **Bookshelf**:
   - Manages HTTP interactions, acting as the interface between clients and the database. It supports two types of roles:
     - **Author**: Users with author roles can add their own books, manage them, and perform related operations.
     - **Admin**: Users with admin roles have access to additional functionalities such as user management, book category management, etc.

Bookshelf follows an object-oriented and layered approach, promoting maintainability and scalability. The codebase is maintained clean and consistent using a linter.

## Orchestration

The project is orchestrated using Docker Compose, allowing for seamless management of the containers. The `docker-compose.yml` file defines the configuration and relationship between the containers, simplifying deployment and ensuring consistent behavior across different environments.

## Project Setup
For the purpose of this assignment, `.env` files are committed to start the project as easily as possible (in normal circumstances, we would never do that). The env file contains variables for database params, verbose log output, configuration, etc.
To start the project, Docker and Docker Compose are required.
Run the following command:




```
docker compose up
```

## Bookshelf Project Structure

### bookshelf/app

**`bookshelf/app/src/App.ts`**: Application entry point, start Express app.

**`bookshelf/app/src/apiLayer`**
- `./middleware`: Authentication and Error middlewares.
- `./validator`: Contains validation methods for client requests, handled in controllers.
- `./controller`: Contains handlers for HTTP requests, used by routers.
- `./router`: Includes Admin and API router.

**`bookshelf/app/src/businessLayer`**
- `./service`: Retrieves data from the repository, used by controllers.
- `./model`: Contains data-only classes that we work with.
- `./utils`, `./enum`, `./interface`: Houses utility functions, constants, enums.

**`bookshelf/app/src/dataAccessLayer`**
- `/database`: Handles database connection and executes DB queries, which are called by the repository.
- `/repository`: Invokes DB queries, formats data to be in the format presented in the model, and exposes it to service classes.

**`bookshelf/app/src/docs`**
- `/swagger.json`: Swagger configuration.

### bookshelf/tests

**`bookshelf/tests`**: Application unit tests
