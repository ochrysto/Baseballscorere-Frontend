# Baseball Scoresheet Frontend

This project is an Angular application for scoring baseball games. It utilizes a Java Spring Boot backend with a PostgreSQL database and integrates Keycloak for Single Sign-On (SSO) and authentication. Both the backend and Keycloak are containerized using Docker.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Routes](#routes)

## Features

- User authentication and authorization using Keycloak
- CRUD operations for games, teams, scorers, and umpires
- Secure routes guarded by Angular AuthGuard
- Responsive and user-friendly UI

## Prerequisites

- [Node.js](https://nodejs.org/) (v20 or later)
- [Angular CLI](https://angular.io/cli) (v17 or later)
- [Docker](https://www.docker.com/)

## Installation

### Step 1: Clone the Repository

```bash
git clone git@github.com:Mittelstufenprojekt/Baseball-Scoresheet-Frontend.git
cd Baseball-Scoresheet-Frontend
```

### Step 2: Install Dependencies

```bash
npm install
```

## Configuration

### Step 1: Start Keycloak Docker Container

1. Clone the [backend repository](https://github.com/Mittelstufenprojekt/Baseball-Scoresheet-Backend)
2. Navigate to the `docker/local/keycloak/dev` directory:
   ```bash
   cd docker/local/keycloak/dev
   ```
3. Start the Keycloak container:
   ```bash
   docker-compose up
   ```

### Step 2: Follow Backend Setup Instructions

1. Refer to the README.md in the backend repository and complete the setup steps.

### Step 3: Configure Keycloak for Frontend

1. In the Keycloak admin console, set the `Root URL` to `http://localhost:4200` (or your frontend URL).
2. Add `http://localhost:4200/*` (or your frontend URL) to `Valid Redirect URIs`.
3. Set the `Web Origins` parameter to `+` to handle CORS issues.
4. Save the changes.

## Running the Application

To start the Angular application, run:

```bash
npm start
```

The application will be available at `http://localhost:4200`.

## Routes

The application uses the following routes:

- `/`: Home page (protected)
- `/game`: Create a new game (protected)
- `/game/:id`: Score game (protected)
- `/game/:id/line-up`: Create game lineup (protected)
- `/create-team`: Create a new team (protected)
- `/edit-team`: Select a team to edit (protected)
- `/edit-team/:id`: Add players to a team or edit team (protected)
- `/public`: Example of a public route
- `/protected`: Example of a protected route (protected)
- `/create-scorer`: Create a new scorer (protected)
- `/create-umpire`: Create a new umpire (protected)
