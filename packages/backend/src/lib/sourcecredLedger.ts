import { Constants } from '@metafam/utils';
import { CredGraph, LedgerManager, sourcecred } from 'sourcecred';

import { CONFIG } from '../config';

const storage = new sourcecred.ledger.storage.GithubStorage({
  apiToken: CONFIG.githubApiToken,
  repo: 'MetaFam/XP',
  branch: CONFIG.sourceCredLedgerBranch,
});

export const ledgerManager: LedgerManager =
  new sourcecred.ledger.manager.LedgerManager({
    storage,
  });

export async function loadCredGraph(): Promise<CredGraph | null> {
  const instance = sourcecred.instance.readInstance.getNetworkReadInstance(
    Constants.SC_OUTPUT_BASE,
  );
  try {
    return instance.readCredGraph();
  } catch (e) {
    return null;
  }
}
