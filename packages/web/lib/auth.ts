import { Maybe } from '@metafam/utils';
import { DIDSession } from 'did-session';

import { get, remove, set } from './store';

const storageKey = 'metagame-auth-token';
const didSessionKey = 'metagame-auth-did-session';
const walletconnectKey = 'walletconnect';
const mobileLinkChoiceKey = 'WALLETCONNECT_DEEPLINK_CHOICE';

export const getTokenFromStore = (): Maybe<string> => get(storageKey);
export const setTokenInStore = (token: string): void => set(storageKey, token);
export const clearToken = (): void => remove(storageKey);

// Temporary workaround to clear cached walletconnect mobile wallet
// https://github.com/WalletConnect/walletconnect-monorepo/issues/394
export const clearWalletConnect = () => {
  remove(walletconnectKey);
  remove(mobileLinkChoiceKey);
};

export const getCachedDIDSession = async (): Promise<Maybe<DIDSession>> => {
  const serializedSession = get(didSessionKey);
  if (serializedSession) {
    return DIDSession.fromSession(serializedSession);
  }
  return null;
};
export const cacheDIDSession = (session: DIDSession) => {
  set(didSessionKey, session.serialize());
};
export const clearDIDSessionCache = (): void => remove(didSessionKey);
