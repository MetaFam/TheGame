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

export function login(client, token) {
  client.writeData({
    data: {
      authState: 'logged',
      authToken: token,
    },
  });
  setTokenInStore(token);
}

export function logout() {
  clearToken();
}

export function checkStoredAuth(client) {
  const token = getTokenFromStore();
  if(token) {
    login(client, token);
  }
}
