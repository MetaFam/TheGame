import fetch from 'node-fetch';

import config from '../../config';

const getPlayerQuery = `
query GetPlayerFromETH ($eth_address: String) {
  Profile(
    where: { 
      identifier: { _eq: $eth_address },
      type: { _eq: "ETHEREUM" }
    }
  ) {
    Player {
      id
    }  
  }
}
`;

const createPlayerMutation = `
mutation CreatePlayer {
  insert_Player(objects: {}) {
    returning {
      id
    }
  }
}
`;

const createProfileMutation = `
mutation CreateProfileFromETH ($player_id: uuid, $eth_address: String) {
  insert_Profile(
    objects: {
      player_id: $player_id, 
      type: "ETHEREUM", 
      identifier: $eth_address
    }) {
    returning {
      identifier
    }
  }
}
`;

async function hasuraQuery(query: string, qv: any = {}) {
  const result = await fetch(config.graphqlURL, {
    method: 'POST',
    body: JSON.stringify({ query: query, variables: qv }),
    headers: {
      'Content-Type': 'application/json',
      'x-hasura-access-key': config.adminKey,
    },
  });

  const { errors, data } = await result.json();

  if(errors) {
    throw new Error(JSON.stringify(errors));
  }
  return data;
}

interface IPlayer {
  id: string
}

export async function createPlayer(ethAddress: string): Promise<IPlayer> {
  const resPlayer = await hasuraQuery(createPlayerMutation );
  const player = resPlayer.insert_Player.returning[0];

  await hasuraQuery(createProfileMutation, {
    player_id: player.id,
    eth_address: ethAddress,
  });

  // TODO do it in only one query

  return player;
}

export async function getPlayer(ethAddress: string): Promise<IPlayer> {
  const res = await hasuraQuery(getPlayerQuery, {
    eth_address: ethAddress,
  });

  let player = res.Profile[0]?.Player;

  if(!player) {
    // TODO if two requests sent at the same time, collision
    player = await createPlayer(ethAddress);
  }

  return player;
}
