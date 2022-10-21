# MetaGame Backend

This instance is not exposed to the public, but only accessible through Hasura.

## Restoring a local DB from a Postgres dump

- Obtain a postgres dump (`.sql` or `.sql.gz`) from render.com or by way of another friendly builder.
- If the dump is compressed, run `gunzip backup.sql.gz`
- Copy the dump into the running container:
  - `docker cp backup.sql the-game_database_1:/var/lib/postgresql`
- Restore using `psql`:
  - `docker-compose exec database psql -U metagame -d metagame-db -W -f /var/lib/postgresql/backup.sql`
