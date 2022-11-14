import { LedgerManager, ReloadResult, sourcecred } from 'sourcecred';

import { CONFIG } from './config.js';

const storage = new sourcecred.ledger.storage.WritableGithubStorage({
  apiToken: CONFIG.githubApiToken,
  repo: 'MetaFam/XP',
  branch: CONFIG.sourceCredLedgerBranch,
});

export interface LedgerLoadResult {
  result: ReloadResult;
  manager: LedgerManager;
}

let loading = false;
let ledgerLoadedPromise: Promise<LedgerLoadResult>;

export const loadSourceCredLedger = (
  force?: boolean,
): Promise<LedgerLoadResult> => {
  const manager: LedgerManager = new sourcecred.ledger.manager.LedgerManager({
    storage,
  });
  if (force === true || (ledgerLoadedPromise == null && !loading)) {
    loading = true;
    console.log('reloading ledger...');
    ledgerLoadedPromise = manager.reloadLedger().then((reloadResult) => ({
      result: reloadResult,
      manager,
    }));
    ledgerLoadedPromise.then(() => {
      loading = false;
    });
  }
  return ledgerLoadedPromise;
};

export const resetLedger = (): void => {
  loadSourceCredLedger(true);
};
