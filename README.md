# Baseball-Scoresheet-Frontend

## How to keycloak this Angular project:

### Step 1: start KeyCloak docker container

1. Clone [**backend repo**](https://github.com/Mittelstufenprojekt/Baseball-Scoresheet-Backend)
2. Cd into `docker/local/keycloak/dev` folder
3. Execute the command `docker compose up`

### Step 2: follow backend README.md doc

1. Do all steps from README.md in backend repo

### Step 3: final realm configuration for frontend

1. Set `Root URL` to http://localhost:4200 (or whatever your frontend URL is)
2. Add `http://localhost:4200/*` to `Valid Redirect URIs` (or whatever your frontend URL is)
3. Set `Web Origins` parameter to `+` which will handle the CORS problem
4. Save the changes
