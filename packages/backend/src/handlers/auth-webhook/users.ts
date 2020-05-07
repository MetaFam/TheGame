import fetch from 'node-fetch';

import config from '../../config';

const getPlayerQuery = `
query GetPlayerFromETH ($eth_address: String) {
  Account(
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

const createProfileMutation = `
mutation CreateAccountFromETH ($eth_address: String) {
  insert_Account(
    objects: {
      type: "ETHEREUM", 
      identifier: $eth_address
      Player: {
        data: {}
      }
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
  const resProfile = await hasuraQuery(createProfileMutation, {
    eth_address: ethAddress,
  });
  return resProfile.insert_Account.returning[0].Player;
}

export async function getPlayer(ethAddress: string): Promise<IPlayer> {
  const res = await hasuraQuery(getPlayerQuery, {
    eth_address: ethAddress,
  });

  let player = res.Account[0]?.Player;

  if(!player) {
    player = await createPlayer(ethAddress);
  }

  return player;
}
