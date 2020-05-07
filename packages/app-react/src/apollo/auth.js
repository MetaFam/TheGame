import queries from '../graphql/queries';

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
          authToken: token,
          playerId: res.data.Account[0].Player.id,
        },
      });
      setTokenInStore(token);
    })
    .catch(async error => {
      logout();
      throw error;
    });
}

export function logout(client) {
  clearToken();
  client.resetStore();
}
