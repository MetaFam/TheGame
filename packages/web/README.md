## MetaGame NextJS Web App

In the project directory, you can run:

### `yarn dev`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />

### `yarn typecheck`

Runs TypeScript to check if there are any type errors

### `yarn build`

Builds the app and exports the static site for production to the `out` folder.

### `yarn start`

Runs the NextJS server for production use (We generate a static site right now, not running a server)

### Troubleshooting

To build and debug the Docker container (that is used in production):

- Make sure the backend services are running with e.g. `yarn docker:start`
- Build the container. Note that the GRAPHQL_URL is pointing to the docker host: `docker build -f docker/frontend/Dockerfile --build-arg GRAPHQL_URL=http://host.docker.internal:8080/v1/graphql -t the-game-frontend .`

Then you can run that container with

```
docker run -p 3000:3000 -e NEXT_PUBLIC_GRAPHQL_URL=http://localhost:8080/v1/graphql the-game-frontend
```
