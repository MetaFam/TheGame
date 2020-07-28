import { GetPlayerFromAddress } from '../graphql/queries';

const STORAGE_KEY = 'auth-token';

export function getTokenFromStore() {
  return localStorage.getItem(STORAGE_KEY);
}

function setTokenInStore(token) {
  return localStorage.setItem(STORAGE_KEY, token);
}

function clearToken() {
  return localStorage.removeItem(STORAGE_KEY);
}

export function loginLoading(client, loading = true) {
  client.writeData({
    data: {
      authState: loading ? 'loading' : 'anonymous',
    },
  });
}

export async function login(client, token, ethAddress) {
  loginLoading(client);
  client.writeData({
    data: {
      authToken: token,
    },
  });
  return client
    .query({
      query: GetPlayerFromAddress,
      variables: { ethereum_address: ethAddress },
    })
    .then(async res => {
      if (res.data.Player.length === 0) {
        throw new Error('Impossible to fetch player, not found.');
      }
      client.writeData({
        data: {
          authState: 'logged',
          playerId: res.data.Player[0].id,
        },
      });
      setTokenInStore(token);
    })
    .catch(async error => {
      logout(client);
      throw error;
    });
}

export function logout(client) {
  clearToken();
  client.resetStore();
}
