import queries from '../graphql/queries';
import { getSignerAddress } from '../lib/did';

const STORAGE_KEY = 'auth-token';

function getTokenFromStore() {
  return localStorage.getItem(STORAGE_KEY);
}

function setTokenInStore(token) {
  return localStorage.setItem(STORAGE_KEY, token);
}

function clearToken() {
  return localStorage.removeItem(STORAGE_KEY);
}

export function loginLoading(client) {
  client.writeData({
    data: {
      authState: 'loading',
    },
  });
}

export async function login(client, token, ethAddress) {
  client.writeData({
    data: {
      authState: 'loading',
      authToken: token,
    },
  });
  setTokenInStore(token);

  return client.query({
  query: queries.get_MyAccount,
    variables: { eth_address: ethAddress }
  })
    .then(async res => {
      if(res.data.Account.length === 0) {
        throw new Error('Impossible to fetch player, not found.');
      }
      client.writeData({
        data: {
          authState: 'logged',
          playerId: res.data.Account[0].Player.id,
        },
      });
      setTokenInStore(token);
    })
    .catch(async error => {
      client.writeData({
        data: {
          authState: 'error',
          authToken: null,
        },
      });
      throw error;
    });
}

export function logout() {
  clearToken();
}

export function checkStoredAuth(client) {
  const token = getTokenFromStore();
  if(token) {
    const address = getSignerAddress(token);
    login(client, token, address).catch(console.error)
  }
}
