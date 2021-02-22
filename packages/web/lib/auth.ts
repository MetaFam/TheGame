import { get, remove, set } from './store';

const STORAGE_KEY = 'metagame-auth-token';
const mobileLinkChoiceKey = 'WALLETCONNECT_DEEPLINK_CHOICE';

export const getTokenFromStore = (): string | null => get(STORAGE_KEY);

export const setTokenInStore = (token: string): void => set(STORAGE_KEY, token);

export const clearToken = (): void => remove(STORAGE_KEY);

// Temporary workaround to clear cached walletconnect mobile wallet
// https://github.com/WalletConnect/walletconnect-monorepo/issues/394
export const clearWCMobile = (): void => remove(mobileLinkChoiceKey);
