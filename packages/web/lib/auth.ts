const STORAGE_KEY = 'metagame-auth-token';

export const getTokenFromStore = (): string | null =>
  typeof window === 'undefined' ? null : localStorage.getItem(STORAGE_KEY);

export const setTokenInStore = (token: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, token);
};

export const clearToken = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
};
