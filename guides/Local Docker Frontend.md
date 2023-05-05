I have been an error that only happens on the test instance, not locally. To try and debug it, I needed to run the Docker container locally. These are the commands I used:

- `docker build -f docker/frontend/Dockerfile --network=host --build-arg GRAPHQL_URL=http://localhost:8080/v1/graphql -t web-prod:latest .`
- `docker run -p 3000:3000 -e NEXT_PUBLIC_GRAPHQL_URL=http://host.docker.internal/v1/graphql web-prod:latest`

The tricky part is accessing Hasura running on the local machine rather than in the container.
