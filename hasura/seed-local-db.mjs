import fetch from 'node-fetch';

/* eslint-disable no-console */

const PRODUCTION_GRAPHQL_URL = (
  process.env.PRODUCTION_GRAPHQL_URL
  || 'https://api.metagame.wtf/v1/graphql'
);
const LOCAL_GRAPHQL_URL = (
  process.env.LOCAL_GRAPHQL_URL || 'http://localhost:8080/v1/graphql'
);
const LOCAL_BACKEND_ACCOUNT_MIGRATION_URL = (
  process.env.LOCAL_BACKEND_ACCOUNT_MIGRATION_URL
  || 'http://localhost:4000/actions/migrateSourceCredAccounts?force=true'
);
const HASURA_GRAPHQL_ADMIN_SECRET = (
  process.env.HASURA_GRAPHQL_ADMIN_SECRET || 'metagame_secret'
);
const NUM_PLAYERS = process.env.SEED_NUM_PLAYERS || 300;

const authHeaders = {
  'content-type': 'application/json',
  'x-hasura-admin-secret': HASURA_GRAPHQL_ADMIN_SECRET,
}

async function fetchGraphQL(
  url, operationsDoc, operationName, variables = {}, isUpdate = false
) {
  const result = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      query: operationsDoc,
      variables,
      operationName,
    }),
    headers: isUpdate ? authHeaders : undefined,
  });

  const json = await result.json();
  return json;
}

const topPlayersQuery = /* GraphQL */`
  query GetTopPlayers {
    player(
      limit: ${NUM_PLAYERS}
      order_by: { total_xp: desc }
    ) {
      id
      username
      ethereum_address
      availability_hours
      timezone
      color_mask
      type {
        title
      }
      skills {
        Skill {
          id
          category
          name
        }
      }
    }
  }
`;

async function fetchTopPlayers() {
  const { errors, data } = await fetchGraphQL(
    PRODUCTION_GRAPHQL_URL,
    topPlayersQuery,
    'GetTopPlayers',
  );

  if (errors) {
    // handle those errors like a pro
    errors.map((e) => {
      throw e;
    });
  }

  return data.player;
}

const getPlayerIdsAndSkillsQuery = /* GraphQL */`
  query GetPlayerIds($addresses: [String!]) {
    player(where: { ethereumAddress: { _in: $addresses } }) {
      id
      ethereumAddress
    }
    skill {
      id
      category
      name
    }
  }
`;

async function fetchPlayerIdsAndSkills(addresses) {
  const { errors, data } = await fetchGraphQL(
    LOCAL_GRAPHQL_URL,
    getPlayerIdsAndSkillsQuery,
    'GetPlayerIds',
    { addresses },
  );

  if (errors) {
    throw errors[0]
  }

  const ids = Object.fromEntries(
    data.player.map(({ id, ethereumAddress }) => (
      [ethereumAddress, id]
    ))
  );
  return { ids, skills: data.skill };
}

const deleteSkillsMutation = /* GraphQL */`
  mutation DeleteSkills {
    delete_player_skill(where: {}) {
      affected_rows
    }
  }
`;

async function deleteSkills() {
  const { errors } = await fetchGraphQL(
    LOCAL_GRAPHQL_URL,
    deleteSkillsMutation,
    'DeleteSkills',
    {},
    true,
  );

  if (errors) throw errors[0];
}

const updatePlayerMutation = /* GraphQL */`
  mutation UpdatePlayer(
    $playerId: uuid!
    $availableHours: Int
    $timeZone: String
    $explorerTypeTitle: String
    $colorMask: Int
    $username: String
    $skills: [player_skill_insert_input!]!
  ) {
    insert_player_skill(objects: $skills) {
      affected_rows
    }
    update_profile(
      where: { playerId: { _eq: $playerId } }
      _set: {
        explorerTypeTitle: $explorerTypeTitle
        timeZone: $timeZone
        availableHours: $availableHours
        colorMask: $colorMask
        username: $username
      }
    ) {
      returning {
        username
        availableHours
        timeZone
        colorMask
        explorerTypeTitle
        player {
          skills {
            Skill {
              id
            }
          }
          id
          ethereumAddress
        }
      }
    }
  }
`;


async function updatePlayer(variables) {
  const { errors, data } = await fetchGraphQL(
    LOCAL_GRAPHQL_URL,
    updatePlayerMutation,
    'UpdatePlayer',
    variables,
    true,
  );

  if (errors) {
    console.error({ errors });
    throw errors[0];
  }

  return data.update_profile;
}

const skillsMap = {};

function getSkillId(skills, { Skill: { category, name } }) {
  const skillMapId = category + name;
  if (!skillsMap[skillMapId]) {
    skills.forEach((skill) => {
      skillsMap[skill.category + skill.name] = skill.id;
    });
  }
  return skillsMap[skillMapId];
}

async function forceMigrateAccounts() {
  const result = await fetch(LOCAL_BACKEND_ACCOUNT_MIGRATION_URL, {
    method: 'POST',
  });
  const json = await result.json();
  return json;
}

async function startSeeding() {
  console.debug(`Force migrating sourcecred users with: ${LOCAL_BACKEND_ACCOUNT_MIGRATION_URL}`);
  const result = await forceMigrateAccounts();
  console.debug(result);
  console.debug(`Fetching players from: ${PRODUCTION_GRAPHQL_URL}`);
  const players = await fetchTopPlayers();
  const addresses = players.map(({ ethereum_address }) => ethereum_address);
  console.debug(`Fetching player ids for players from ${LOCAL_GRAPHQL_URL} for ${addresses.length} addresses`);
  const { ids, skills } = await fetchPlayerIdsAndSkills(addresses);
  console.debug(`Fetched ${Object.keys(ids).length} player ids for players from addresses.`);
  const mutations = (
    players.map((player) => {
      const playerId = ids[player.ethereum_address];
      if (!playerId) return undefined;
      return {
        playerId,
        availableHours: player.availability_hours,
        timeZone: player.timezone,
        explorerTypeTitle: player.type?.title,
        colorMask: player.color_mask ?? null,
        username: player.username,
        skills: (
          player.skills.map((skill) => ({
            skill_id: getSkillId(skills, skill),
            player_id: playerId,
          }))
        ),
      };
    })
    .filter(m => !!m)
  );
  console.debug(
    `Updating ${mutations.length} players information in ${LOCAL_GRAPHQL_URL}`,
  );
  await deleteSkills();
  const updated = await Promise.all(mutations.map(
    (mutation) => updatePlayer(mutation)
  ));
  console.debug(`Successfully seeded local db with ${updated.length} players`);
}

startSeeding()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});
