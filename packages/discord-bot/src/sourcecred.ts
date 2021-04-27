import { LedgerManager, ReloadResult, sourcecred } from "sourcecred";

import { CONFIG } from './config';

const storage = new sourcecred.ledger.storage.GithubStorage({
  apiToken: CONFIG.githubApiToken,
  repo: 'MetaFam/XP',
  branch: 'master',
});

export const manager: LedgerManager = new sourcecred.ledger.manager.LedgerManager({
  storage,
});

let loading = false;
let ledgerLoadedPromise: Promise<ReloadResult>;

export const loadSourceCredLedger = (): Promise<ReloadResult> => {
  if (!loading) {
    loading = true;
    ledgerLoadedPromise = manager.reloadLedger();
    ledgerLoadedPromise.then(() => {
      loading = false;
    });
  }
  return ledgerLoadedPromise;
}

console.log('created ledger manager');
