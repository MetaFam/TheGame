export interface LedgerManager {
  reloadLedger: () => Promise<ReloadResult>;
  ledger: Ledger;
}

export interface Ledger {
  accounts: () => SCAccountInfo[];
}

export interface ReloadResult {
  error: string | null;
}

export interface SCReadInstance {
  readCredGraph: () => Promise<CredGraph>;
}

export type CredGraph = {
  
}

export interface SCAccountsData {
  accounts: SCAccount[];
  intervalEndpoints: number[];
  unclaimedAliases: SCUnclaimedAlias[];
}

export interface SCAccount {
  account: SCAccountInfo;
  cred: number[];
  totalCred: number;
}

export interface SCAccountInfo {
  active: boolean;
  balance: string;
  identity: SCIdentity;
  paid: string;
}

export interface SCIdentity {
  address: string;
  aliases: SCAlias[];
  id: string;
  name: string;
  subtype: string;
}

export interface SCAlias {
  address: string;
  description: string;
}

export interface SCUnclaimedAlias {
  alias: SCAlias;
  cred: number[];
  totalCred: number;
}

export interface AddressBookEntry {
  name: string;
  createdAt: number;
  address: string;
  discordId: string;
}
