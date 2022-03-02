import Bottleneck from 'bottleneck';
import fetch from 'node-fetch';

/* eslint-disable no-console */

const PRODUCTION_GRAPHQL_URL = (
  process.env.PRODUCTION_GRAPHQL_URL
  || 'https://api.metagame.wtf/v1/graphql'
);
const SOURCE_GRAPHQL_URL = (
  process.env.SOURCE_GRAPHQL_URL || 'http://localhost:8080/v1/graphql'
);
const ACCOUNT_MIGRATION_URL = (
  process.env.ACCOUNT_MIGRATION_URL
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

  const body = await result.text()
  try {
    return JSON.parse(body);
  } catch (err) {
    console.error(`JSON Error: ${err.message}`);
    console.error(body);
    return { errors: [err.message] };
  }
}

const topPlayersQuery = /* GraphQL */`
  query GetTopPlayers {
    player(
      limit: ${NUM_PLAYERS}
      order_by: { totalXP: desc }
    ) {
      id
      ethereumAddress
      profile {
        username 
        availableHours
        timeZone
        colorMask
        explorerTypeTitle
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
    SOURCE_GRAPHQL_URL,
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
    SOURCE_GRAPHQL_URL,
    deleteSkillsMutation,
    'DeleteSkills',
    {},
    true,
  );

  if (errors) throw errors[0];
}

const upsertPlayerMutation = /* GraphQL */`
  mutation UpsertPlayer(
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
    insert_profile(
      objects: [{
        playerId: $playerId
        explorerTypeTitle: $explorerTypeTitle
        timeZone: $timeZone
        availableHours: $availableHours
        colorMask: $colorMask
        username: $username
      }]
      on_conflict: {
        constraint: profile_player_id_key
        update_columns: [
          explorerTypeTitle
          timeZone
          availableHours
          colorMask
          username
        ]
      }
    ) {
      affected_rows
      returning {
        username
        availableHours
        timeZone
        colorMask
        explorerTypeTitle
        player {
          id
          ethereumAddress
          skills {
            Skill {
              id
            }
          }
        }
      }
    }
  }
`;

async function upsertPlayer(variables) {
  const { errors, data } = await fetchGraphQL(
    SOURCE_GRAPHQL_URL,
    upsertPlayerMutation,
    'UpsertPlayer',
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
  const result = await fetch(ACCOUNT_MIGRATION_URL, {
    method: 'POST',
  });

  const body = await result.text();
  try {
    return JSON.parse(body);
  } catch (err) {
    console.error(`JSON Error: ${err.message}`);
    console.error(body);
    return { errors: [err.message] };
  }
}

async function startSeeding() {
  console.debug(`Force migrating sourcecred users with: ${ACCOUNT_MIGRATION_URL}`);
  const result = await forceMigrateAccounts();
  console.debug(result);
  console.debug(`Fetching players from: ${PRODUCTION_GRAPHQL_URL}`);
  const players = await fetchTopPlayers();
  const addresses = players.map(({ ethereumAddress }) => ethereumAddress);
  console.debug(`Fetching player ids for players from ${SOURCE_GRAPHQL_URL} for ${addresses.length} addresses`);
  const { ids, skills } = await fetchPlayerIdsAndSkills(addresses);
  console.debug(`Fetched ${Object.keys(ids).length} player ids for players from addresses.`);
  const mutations = (
    players.map((player, idx) => {
      const playerId = ids[player.ethereumAddress];
      if (!playerId) return undefined;
      return {
        ethereumAddress: player.ethereumAddress,
        count: idx + 1,
        variables: {
          playerId,
          username: player.profile?.username ?? null,
          availableHours: player.profile?.availableHours ?? null,
          timeZone: player.profile?.timeZone ?? null,
          colorMask: player.profile?.colorMask ?? null,
          explorerTypeTitle: player.profile?.explorerTypeTitle ?? null,
          skills: (
            player.skills.map((skill) => ({
              skill_id: getSkillId(skills, skill),
              player_id: playerId,
            }))
          ),
        }
      };
    })
    .filter(m => !!m)
  );
  console.debug(
    `Updating ${mutations.length} players information in ${SOURCE_GRAPHQL_URL}`,
  );
  await deleteSkills();
  const limiter = new Bottleneck({
    maxConcurrent: 30,
    minTime: 100, // 100 = 10 / second
  });
  const updated = await Promise.all(mutations.map(
    ({ ethereumAddress, count, variables }) => {
      console.debug(`${count.toString().padStart(3, '0')}: Updating ${ethereumAddress} ("${variables.username}")`);
      return limiter.schedule(() => upsertPlayer(variables))
    }
  ));
  console.debug(`Successfully seeded db with ${updated.length} players`);
}

startSeeding()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});
