/* eslint-disable */
const fetch = require('node-fetch');
const gql = require('fake-tag');

const PRODUCTION_URL = 'https://api.metagame.wtf/v1/graphql';
const LOCAL_URL = 'http://localhost:8080/v1/graphql';
const HASURA_GRAPHQL_ADMIN_SECRET = process.env.HASURA_GRAPHQL_ADMIN_SECRET || 'metagame_secret';
const NUM_PLAYERS = 300;

const authHeaders = {
      ['content-type']: 'application/json',
      ['x-hasura-admin-secret']: HASURA_GRAPHQL_ADMIN_SECRET,
}

async function fetchGraphQL(url, operationsDoc, operationName, variables = {}, isUpdate = false) {
  const result = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
      headers: isUpdate ? authHeaders : undefined,
  });

  return await result.json();
}

const topPlayersQuery = gql`
  query GetTopPlayers {
    player(
      limit: ${NUM_PLAYERS}
      order_by: { total_xp: desc }
      where: {
        availability_hours: { _gte: 0 }
        timezone: { _in: null }
        playerType: { id: { _in: null } }
        Player_Skills: { Skill: { id: { _in: null } } }
      }
    ) {
      id
      username
      ethereum_address
      availability_hours
      timezone
      ColorAspect {
        mask
      }
      playerType {
        id
      }
      Player_Skills {
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
    PRODUCTION_URL,
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

const getPlayerIdsAndSkillsQuery = gql`
  query GetPlayerIds($addresses: [String!]) {
    player(where: { ethereum_address: { _in: $addresses } }) {
      id
      ethereum_address
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
    LOCAL_URL,
    getPlayerIdsAndSkillsQuery,
    'GetPlayerIds',
    {
      addresses,
    },
  );

  if (errors) {
    // handle those errors like a pro
    errors.map((e) => {
      throw e;
    });
  }

  const ids = {};
  data.player.map(({ id, ethereum_address }) => {
    ids[ethereum_address] = id;
  });
  return { ids, skills: data.skill };
}

const deleteSkillsMutation = gql`
  mutation DeleteSkills {
    delete_player_skill(where: {}) {
      affected_rows
    }
  }
`;

async function deleteSkills() {
  const { errors } = await fetchGraphQL(
    LOCAL_URL,
    deleteSkillsMutation,
    'DeleteSkills',
      {},
      true
  );

  if (errors) {
    // handle those errors like a pro
    errors.map((e) => {
      throw e;
    });
  }
}

const updatePlayerMutation = gql`
  mutation UpdatePlayer(
    $playerId: uuid!
    $availability: Int
    $timezone: String
    $playerTypeId: Int
    $colorMask: Int
    $username: String
    $skills: [player_skill_insert_input!]!
  ) {
    insert_player_skill(objects: $skills) {
      affected_rows
    }
    update_player_by_pk(
      pk_columns: { id: $playerId }
      _set: {
        player_type_id: $playerTypeId
        timezone: $timezone
        availability_hours: $availability
        color_mask: $colorMask
        username: $username
      }
    ) {
      id
      username
      ethereum_address
      availability_hours
      timezone
      ColorAspect {
        mask
      }
      playerType {
        id
      }
      Player_Skills {
        Skill {
          id
        }
      }
    }
  }
`;

async function updatePlayer(variables) {
  const { errors, data } = await fetchGraphQL(
    LOCAL_URL,
    updatePlayerMutation,
    'UpdatePlayer',
      variables,
      true
  );

  if (errors) {
    // handle those errors like a pro
    errors.map((e) => {
      throw e;
    });
  }

  return data.update_player_by_pk;
}

const skillsMap = {};

function getSkillId(skills, { Skill: { category, name } }) {
  const skillMapId = category + name;
  if (!skillsMap[skillMapId]) {
    skills.map((skill) => {
      skillsMap[skill.category + skill.name] = skill.id;
    });
  }
  return skillsMap[skillMapId];
}

async function forceMigrateAccounts() {

    const url = 'http://localhost:4000/actions/migrateSourceCredAccounts\?force\=true';
  const result = await fetch(url, {
    method: 'POST',
  });
  return await result.json();
  
}

async function startSeeding() {
  console.log(`Force migrating sourcecred users into local db`);
  const result = await forceMigrateAccounts();
  console.log(result);
  console.log(`Fetching players from prod db`);
  const players = await fetchTopPlayers();
  const addresses = players.map((p) => p.ethereum_address);
  console.log(`Fetching player ids for players from local db`);
  const { ids, skills } = await fetchPlayerIdsAndSkills(addresses);
  const mutations = players.map(player => {
    const id = ids[player.ethereum_address];
    if (!id) return undefined;
    return {
      playerId: id,
      availability: player.availability_hours,
      timezone: player.timezone,
      playerTypeId: player.playerType.id,
      colorMask: player.ColorAspect?.mask || null,
      username: player.username,
      skills:
        player.Player_Skills.map((skill) => ({
          skill_id: getSkillId(skills, skill),
          player_id: id,
        })),
    };
  }).filter(m => !!m);
  console.log(
    `Updating player information in local db for players in prod db`,
  );
  await deleteSkills();
  const updated = await Promise.all(mutations.map((mutation) => updatePlayer(mutation)));
  console.log(`Successfully seeded local db with ${updated.length} players`);
}

startSeeding()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
