/* eslint-disable */
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
  Int8: any;
};

export type AmpUpdate = {
  __typename?: 'AmpUpdate';
  endAmp: Scalars['BigInt'];
  endTimestamp: Scalars['BigInt'];
  id: Scalars['ID'];
  poolId: Pool;
  scheduledTimestamp: Scalars['Int'];
  startAmp: Scalars['BigInt'];
  startTimestamp: Scalars['BigInt'];
};

export type AmpUpdate_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<AmpUpdate_Filter>>>;
  endAmp: InputMaybe<Scalars['BigInt']>;
  endAmp_gt: InputMaybe<Scalars['BigInt']>;
  endAmp_gte: InputMaybe<Scalars['BigInt']>;
  endAmp_in: InputMaybe<Array<Scalars['BigInt']>>;
  endAmp_lt: InputMaybe<Scalars['BigInt']>;
  endAmp_lte: InputMaybe<Scalars['BigInt']>;
  endAmp_not: InputMaybe<Scalars['BigInt']>;
  endAmp_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  endTimestamp: InputMaybe<Scalars['BigInt']>;
  endTimestamp_gt: InputMaybe<Scalars['BigInt']>;
  endTimestamp_gte: InputMaybe<Scalars['BigInt']>;
  endTimestamp_in: InputMaybe<Array<Scalars['BigInt']>>;
  endTimestamp_lt: InputMaybe<Scalars['BigInt']>;
  endTimestamp_lte: InputMaybe<Scalars['BigInt']>;
  endTimestamp_not: InputMaybe<Scalars['BigInt']>;
  endTimestamp_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  id: InputMaybe<Scalars['ID']>;
  id_gt: InputMaybe<Scalars['ID']>;
  id_gte: InputMaybe<Scalars['ID']>;
  id_in: InputMaybe<Array<Scalars['ID']>>;
  id_lt: InputMaybe<Scalars['ID']>;
  id_lte: InputMaybe<Scalars['ID']>;
  id_not: InputMaybe<Scalars['ID']>;
  id_not_in: InputMaybe<Array<Scalars['ID']>>;
  or: InputMaybe<Array<InputMaybe<AmpUpdate_Filter>>>;
  poolId: InputMaybe<Scalars['String']>;
  poolId_: InputMaybe<Pool_Filter>;
  poolId_contains: InputMaybe<Scalars['String']>;
  poolId_contains_nocase: InputMaybe<Scalars['String']>;
  poolId_ends_with: InputMaybe<Scalars['String']>;
  poolId_ends_with_nocase: InputMaybe<Scalars['String']>;
  poolId_gt: InputMaybe<Scalars['String']>;
  poolId_gte: InputMaybe<Scalars['String']>;
  poolId_in: InputMaybe<Array<Scalars['String']>>;
  poolId_lt: InputMaybe<Scalars['String']>;
  poolId_lte: InputMaybe<Scalars['String']>;
  poolId_not: InputMaybe<Scalars['String']>;
  poolId_not_contains: InputMaybe<Scalars['String']>;
  poolId_not_contains_nocase: InputMaybe<Scalars['String']>;
  poolId_not_ends_with: InputMaybe<Scalars['String']>;
  poolId_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  poolId_not_in: InputMaybe<Array<Scalars['String']>>;
  poolId_not_starts_with: InputMaybe<Scalars['String']>;
  poolId_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  poolId_starts_with: InputMaybe<Scalars['String']>;
  poolId_starts_with_nocase: InputMaybe<Scalars['String']>;
  scheduledTimestamp: InputMaybe<Scalars['Int']>;
  scheduledTimestamp_gt: InputMaybe<Scalars['Int']>;
  scheduledTimestamp_gte: InputMaybe<Scalars['Int']>;
  scheduledTimestamp_in: InputMaybe<Array<Scalars['Int']>>;
  scheduledTimestamp_lt: InputMaybe<Scalars['Int']>;
  scheduledTimestamp_lte: InputMaybe<Scalars['Int']>;
  scheduledTimestamp_not: InputMaybe<Scalars['Int']>;
  scheduledTimestamp_not_in: InputMaybe<Array<Scalars['Int']>>;
  startAmp: InputMaybe<Scalars['BigInt']>;
  startAmp_gt: InputMaybe<Scalars['BigInt']>;
  startAmp_gte: InputMaybe<Scalars['BigInt']>;
  startAmp_in: InputMaybe<Array<Scalars['BigInt']>>;
  startAmp_lt: InputMaybe<Scalars['BigInt']>;
  startAmp_lte: InputMaybe<Scalars['BigInt']>;
  startAmp_not: InputMaybe<Scalars['BigInt']>;
  startAmp_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  startTimestamp: InputMaybe<Scalars['BigInt']>;
  startTimestamp_gt: InputMaybe<Scalars['BigInt']>;
  startTimestamp_gte: InputMaybe<Scalars['BigInt']>;
  startTimestamp_in: InputMaybe<Array<Scalars['BigInt']>>;
  startTimestamp_lt: InputMaybe<Scalars['BigInt']>;
  startTimestamp_lte: InputMaybe<Scalars['BigInt']>;
  startTimestamp_not: InputMaybe<Scalars['BigInt']>;
  startTimestamp_not_in: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum AmpUpdate_OrderBy {
  EndAmp = 'endAmp',
  EndTimestamp = 'endTimestamp',
  Id = 'id',
  PoolId = 'poolId',
  PoolIdAddress = 'poolId__address',
  PoolIdAlpha = 'poolId__alpha',
  PoolIdAmp = 'poolId__amp',
  PoolIdBaseToken = 'poolId__baseToken',
  PoolIdBeta = 'poolId__beta',
  PoolIdC = 'poolId__c',
  PoolIdCreateTime = 'poolId__createTime',
  PoolIdDSq = 'poolId__dSq',
  PoolIdDelta = 'poolId__delta',
  PoolIdEpsilon = 'poolId__epsilon',
  PoolIdExpiryTime = 'poolId__expiryTime',
  PoolIdFactory = 'poolId__factory',
  PoolIdHoldersCount = 'poolId__holdersCount',
  PoolIdId = 'poolId__id',
  PoolIdIsInRecoveryMode = 'poolId__isInRecoveryMode',
  PoolIdIsPaused = 'poolId__isPaused',
  PoolIdJoinExitEnabled = 'poolId__joinExitEnabled',
  PoolIdLambda = 'poolId__lambda',
  PoolIdLastJoinExitAmp = 'poolId__lastJoinExitAmp',
  PoolIdLastPostJoinExitInvariant = 'poolId__lastPostJoinExitInvariant',
  PoolIdLowerTarget = 'poolId__lowerTarget',
  PoolIdMainIndex = 'poolId__mainIndex',
  PoolIdManagementAumFee = 'poolId__managementAumFee',
  PoolIdManagementFee = 'poolId__managementFee',
  PoolIdMustAllowlistLPs = 'poolId__mustAllowlistLPs',
  PoolIdName = 'poolId__name',
  PoolIdOracleEnabled = 'poolId__oracleEnabled',
  PoolIdOwner = 'poolId__owner',
  PoolIdPoolType = 'poolId__poolType',
  PoolIdPoolTypeVersion = 'poolId__poolTypeVersion',
  PoolIdPrincipalToken = 'poolId__principalToken',
  PoolIdProtocolAumFeeCache = 'poolId__protocolAumFeeCache',
  PoolIdProtocolId = 'poolId__protocolId',
  PoolIdProtocolSwapFeeCache = 'poolId__protocolSwapFeeCache',
  PoolIdProtocolYieldFeeCache = 'poolId__protocolYieldFeeCache',
  PoolIdRoot3Alpha = 'poolId__root3Alpha',
  PoolIdS = 'poolId__s',
  PoolIdSqrtAlpha = 'poolId__sqrtAlpha',
  PoolIdSqrtBeta = 'poolId__sqrtBeta',
  PoolIdStrategyType = 'poolId__strategyType',
  PoolIdSwapEnabled = 'poolId__swapEnabled',
  PoolIdSwapFee = 'poolId__swapFee',
  PoolIdSwapsCount = 'poolId__swapsCount',
  PoolIdSymbol = 'poolId__symbol',
  PoolIdTauAlphaX = 'poolId__tauAlphaX',
  PoolIdTauAlphaY = 'poolId__tauAlphaY',
  PoolIdTauBetaX = 'poolId__tauBetaX',
  PoolIdTauBetaY = 'poolId__tauBetaY',
  PoolIdTotalAumFeeCollectedInBpt = 'poolId__totalAumFeeCollectedInBPT',
  PoolIdTotalLiquidity = 'poolId__totalLiquidity',
  PoolIdTotalProtocolFee = 'poolId__totalProtocolFee',
  PoolIdTotalProtocolFeePaidInBpt = 'poolId__totalProtocolFeePaidInBPT',
  PoolIdTotalShares = 'poolId__totalShares',
  PoolIdTotalSwapFee = 'poolId__totalSwapFee',
  PoolIdTotalSwapVolume = 'poolId__totalSwapVolume',
  PoolIdTotalWeight = 'poolId__totalWeight',
  PoolIdTx = 'poolId__tx',
  PoolIdU = 'poolId__u',
  PoolIdUnitSeconds = 'poolId__unitSeconds',
  PoolIdUpperTarget = 'poolId__upperTarget',
  PoolIdV = 'poolId__v',
  PoolIdW = 'poolId__w',
  PoolIdWrappedIndex = 'poolId__wrappedIndex',
  PoolIdZ = 'poolId__z',
  ScheduledTimestamp = 'scheduledTimestamp',
  StartAmp = 'startAmp',
  StartTimestamp = 'startTimestamp',
}

export type Balancer = {
  __typename?: 'Balancer';
  id: Scalars['ID'];
  poolCount: Scalars['Int'];
  pools: Maybe<Array<Pool>>;
  protocolFeesCollector: Maybe<Scalars['Bytes']>;
  totalLiquidity: Scalars['BigDecimal'];
  totalProtocolFee: Maybe<Scalars['BigDecimal']>;
  totalSwapCount: Scalars['BigInt'];
  totalSwapFee: Scalars['BigDecimal'];
  totalSwapVolume: Scalars['BigDecimal'];
};

export type BalancerPoolsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Pool_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<Pool_Filter>;
};

export type BalancerSnapshot = {
  __typename?: 'BalancerSnapshot';
  id: Scalars['ID'];
  poolCount: Scalars['Int'];
  timestamp: Scalars['Int'];
  totalLiquidity: Scalars['BigDecimal'];
  totalProtocolFee: Maybe<Scalars['BigDecimal']>;
  totalSwapCount: Scalars['BigInt'];
  totalSwapFee: Scalars['BigDecimal'];
  totalSwapVolume: Scalars['BigDecimal'];
  vault: Balancer;
};

export type BalancerSnapshot_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<BalancerSnapshot_Filter>>>;
  id: InputMaybe<Scalars['ID']>;
  id_gt: InputMaybe<Scalars['ID']>;
  id_gte: InputMaybe<Scalars['ID']>;
  id_in: InputMaybe<Array<Scalars['ID']>>;
  id_lt: InputMaybe<Scalars['ID']>;
  id_lte: InputMaybe<Scalars['ID']>;
  id_not: InputMaybe<Scalars['ID']>;
  id_not_in: InputMaybe<Array<Scalars['ID']>>;
  or: InputMaybe<Array<InputMaybe<BalancerSnapshot_Filter>>>;
  poolCount: InputMaybe<Scalars['Int']>;
  poolCount_gt: InputMaybe<Scalars['Int']>;
  poolCount_gte: InputMaybe<Scalars['Int']>;
  poolCount_in: InputMaybe<Array<Scalars['Int']>>;
  poolCount_lt: InputMaybe<Scalars['Int']>;
  poolCount_lte: InputMaybe<Scalars['Int']>;
  poolCount_not: InputMaybe<Scalars['Int']>;
  poolCount_not_in: InputMaybe<Array<Scalars['Int']>>;
  timestamp: InputMaybe<Scalars['Int']>;
  timestamp_gt: InputMaybe<Scalars['Int']>;
  timestamp_gte: InputMaybe<Scalars['Int']>;
  timestamp_in: InputMaybe<Array<Scalars['Int']>>;
  timestamp_lt: InputMaybe<Scalars['Int']>;
  timestamp_lte: InputMaybe<Scalars['Int']>;
  timestamp_not: InputMaybe<Scalars['Int']>;
  timestamp_not_in: InputMaybe<Array<Scalars['Int']>>;
  totalLiquidity: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidity_gt: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidity_gte: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidity_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalLiquidity_lt: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidity_lte: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidity_not: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidity_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalProtocolFee: InputMaybe<Scalars['BigDecimal']>;
  totalProtocolFee_gt: InputMaybe<Scalars['BigDecimal']>;
  totalProtocolFee_gte: InputMaybe<Scalars['BigDecimal']>;
  totalProtocolFee_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalProtocolFee_lt: InputMaybe<Scalars['BigDecimal']>;
  totalProtocolFee_lte: InputMaybe<Scalars['BigDecimal']>;
  totalProtocolFee_not: InputMaybe<Scalars['BigDecimal']>;
  totalProtocolFee_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalSwapCount: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_gt: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_gte: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_in: InputMaybe<Array<Scalars['BigInt']>>;
  totalSwapCount_lt: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_lte: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_not: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  totalSwapFee: InputMaybe<Scalars['BigDecimal']>;
  totalSwapFee_gt: InputMaybe<Scalars['BigDecimal']>;
  totalSwapFee_gte: InputMaybe<Scalars['BigDecimal']>;
  totalSwapFee_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalSwapFee_lt: InputMaybe<Scalars['BigDecimal']>;
  totalSwapFee_lte: InputMaybe<Scalars['BigDecimal']>;
  totalSwapFee_not: InputMaybe<Scalars['BigDecimal']>;
  totalSwapFee_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalSwapVolume: InputMaybe<Scalars['BigDecimal']>;
  totalSwapVolume_gt: InputMaybe<Scalars['BigDecimal']>;
  totalSwapVolume_gte: InputMaybe<Scalars['BigDecimal']>;
  totalSwapVolume_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalSwapVolume_lt: InputMaybe<Scalars['BigDecimal']>;
  totalSwapVolume_lte: InputMaybe<Scalars['BigDecimal']>;
  totalSwapVolume_not: InputMaybe<Scalars['BigDecimal']>;
  totalSwapVolume_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  vault: InputMaybe<Scalars['String']>;
  vault_: InputMaybe<Balancer_Filter>;
  vault_contains: InputMaybe<Scalars['String']>;
  vault_contains_nocase: InputMaybe<Scalars['String']>;
  vault_ends_with: InputMaybe<Scalars['String']>;
  vault_ends_with_nocase: InputMaybe<Scalars['String']>;
  vault_gt: InputMaybe<Scalars['String']>;
  vault_gte: InputMaybe<Scalars['String']>;
  vault_in: InputMaybe<Array<Scalars['String']>>;
  vault_lt: InputMaybe<Scalars['String']>;
  vault_lte: InputMaybe<Scalars['String']>;
  vault_not: InputMaybe<Scalars['String']>;
  vault_not_contains: InputMaybe<Scalars['String']>;
  vault_not_contains_nocase: InputMaybe<Scalars['String']>;
  vault_not_ends_with: InputMaybe<Scalars['String']>;
  vault_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  vault_not_in: InputMaybe<Array<Scalars['String']>>;
  vault_not_starts_with: InputMaybe<Scalars['String']>;
  vault_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  vault_starts_with: InputMaybe<Scalars['String']>;
  vault_starts_with_nocase: InputMaybe<Scalars['String']>;
};

export enum BalancerSnapshot_OrderBy {
  Id = 'id',
  PoolCount = 'poolCount',
  Timestamp = 'timestamp',
  TotalLiquidity = 'totalLiquidity',
  TotalProtocolFee = 'totalProtocolFee',
  TotalSwapCount = 'totalSwapCount',
  TotalSwapFee = 'totalSwapFee',
  TotalSwapVolume = 'totalSwapVolume',
  Vault = 'vault',
  VaultId = 'vault__id',
  VaultPoolCount = 'vault__poolCount',
  VaultProtocolFeesCollector = 'vault__protocolFeesCollector',
  VaultTotalLiquidity = 'vault__totalLiquidity',
  VaultTotalProtocolFee = 'vault__totalProtocolFee',
  VaultTotalSwapCount = 'vault__totalSwapCount',
  VaultTotalSwapFee = 'vault__totalSwapFee',
  VaultTotalSwapVolume = 'vault__totalSwapVolume',
}

export type Balancer_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<Balancer_Filter>>>;
  id: InputMaybe<Scalars['ID']>;
  id_gt: InputMaybe<Scalars['ID']>;
  id_gte: InputMaybe<Scalars['ID']>;
  id_in: InputMaybe<Array<Scalars['ID']>>;
  id_lt: InputMaybe<Scalars['ID']>;
  id_lte: InputMaybe<Scalars['ID']>;
  id_not: InputMaybe<Scalars['ID']>;
  id_not_in: InputMaybe<Array<Scalars['ID']>>;
  or: InputMaybe<Array<InputMaybe<Balancer_Filter>>>;
  poolCount: InputMaybe<Scalars['Int']>;
  poolCount_gt: InputMaybe<Scalars['Int']>;
  poolCount_gte: InputMaybe<Scalars['Int']>;
  poolCount_in: InputMaybe<Array<Scalars['Int']>>;
  poolCount_lt: InputMaybe<Scalars['Int']>;
  poolCount_lte: InputMaybe<Scalars['Int']>;
  poolCount_not: InputMaybe<Scalars['Int']>;
  poolCount_not_in: InputMaybe<Array<Scalars['Int']>>;
  pools_: InputMaybe<Pool_Filter>;
  protocolFeesCollector: InputMaybe<Scalars['Bytes']>;
  protocolFeesCollector_contains: InputMaybe<Scalars['Bytes']>;
  protocolFeesCollector_gt: InputMaybe<Scalars['Bytes']>;
  protocolFeesCollector_gte: InputMaybe<Scalars['Bytes']>;
  protocolFeesCollector_in: InputMaybe<Array<Scalars['Bytes']>>;
  protocolFeesCollector_lt: InputMaybe<Scalars['Bytes']>;
  protocolFeesCollector_lte: InputMaybe<Scalars['Bytes']>;
  protocolFeesCollector_not: InputMaybe<Scalars['Bytes']>;
  protocolFeesCollector_not_contains: InputMaybe<Scalars['Bytes']>;
  protocolFeesCollector_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  totalLiquidity: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidity_gt: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidity_gte: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidity_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalLiquidity_lt: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidity_lte: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidity_not: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidity_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalProtocolFee: InputMaybe<Scalars['BigDecimal']>;
  totalProtocolFee_gt: InputMaybe<Scalars['BigDecimal']>;
  totalProtocolFee_gte: InputMaybe<Scalars['BigDecimal']>;
  totalProtocolFee_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalProtocolFee_lt: InputMaybe<Scalars['BigDecimal']>;
  totalProtocolFee_lte: InputMaybe<Scalars['BigDecimal']>;
  totalProtocolFee_not: InputMaybe<Scalars['BigDecimal']>;
  totalProtocolFee_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalSwapCount: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_gt: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_gte: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_in: InputMaybe<Array<Scalars['BigInt']>>;
  totalSwapCount_lt: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_lte: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_not: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  totalSwapFee: InputMaybe<Scalars['BigDecimal']>;
  totalSwapFee_gt: InputMaybe<Scalars['BigDecimal']>;
  totalSwapFee_gte: InputMaybe<Scalars['BigDecimal']>;
  totalSwapFee_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalSwapFee_lt: InputMaybe<Scalars['BigDecimal']>;
  totalSwapFee_lte: InputMaybe<Scalars['BigDecimal']>;
  totalSwapFee_not: InputMaybe<Scalars['BigDecimal']>;
  totalSwapFee_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalSwapVolume: InputMaybe<Scalars['BigDecimal']>;
  totalSwapVolume_gt: InputMaybe<Scalars['BigDecimal']>;
  totalSwapVolume_gte: InputMaybe<Scalars['BigDecimal']>;
  totalSwapVolume_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalSwapVolume_lt: InputMaybe<Scalars['BigDecimal']>;
  totalSwapVolume_lte: InputMaybe<Scalars['BigDecimal']>;
  totalSwapVolume_not: InputMaybe<Scalars['BigDecimal']>;
  totalSwapVolume_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export enum Balancer_OrderBy {
  Id = 'id',
  PoolCount = 'poolCount',
  Pools = 'pools',
  ProtocolFeesCollector = 'protocolFeesCollector',
  TotalLiquidity = 'totalLiquidity',
  TotalProtocolFee = 'totalProtocolFee',
  TotalSwapCount = 'totalSwapCount',
  TotalSwapFee = 'totalSwapFee',
  TotalSwapVolume = 'totalSwapVolume',
}

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_Height = {
  hash: InputMaybe<Scalars['Bytes']>;
  number: InputMaybe<Scalars['Int']>;
  number_gte: InputMaybe<Scalars['Int']>;
};

export type CircuitBreaker = {
  __typename?: 'CircuitBreaker';
  bptPrice: Scalars['BigDecimal'];
  id: Scalars['ID'];
  lowerBoundPercentage: Scalars['BigDecimal'];
  pool: Pool;
  token: PoolToken;
  upperBoundPercentage: Scalars['BigDecimal'];
};

export type CircuitBreaker_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<CircuitBreaker_Filter>>>;
  bptPrice: InputMaybe<Scalars['BigDecimal']>;
  bptPrice_gt: InputMaybe<Scalars['BigDecimal']>;
  bptPrice_gte: InputMaybe<Scalars['BigDecimal']>;
  bptPrice_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  bptPrice_lt: InputMaybe<Scalars['BigDecimal']>;
  bptPrice_lte: InputMaybe<Scalars['BigDecimal']>;
  bptPrice_not: InputMaybe<Scalars['BigDecimal']>;
  bptPrice_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  id: InputMaybe<Scalars['ID']>;
  id_gt: InputMaybe<Scalars['ID']>;
  id_gte: InputMaybe<Scalars['ID']>;
  id_in: InputMaybe<Array<Scalars['ID']>>;
  id_lt: InputMaybe<Scalars['ID']>;
  id_lte: InputMaybe<Scalars['ID']>;
  id_not: InputMaybe<Scalars['ID']>;
  id_not_in: InputMaybe<Array<Scalars['ID']>>;
  lowerBoundPercentage: InputMaybe<Scalars['BigDecimal']>;
  lowerBoundPercentage_gt: InputMaybe<Scalars['BigDecimal']>;
  lowerBoundPercentage_gte: InputMaybe<Scalars['BigDecimal']>;
  lowerBoundPercentage_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  lowerBoundPercentage_lt: InputMaybe<Scalars['BigDecimal']>;
  lowerBoundPercentage_lte: InputMaybe<Scalars['BigDecimal']>;
  lowerBoundPercentage_not: InputMaybe<Scalars['BigDecimal']>;
  lowerBoundPercentage_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  or: InputMaybe<Array<InputMaybe<CircuitBreaker_Filter>>>;
  pool: InputMaybe<Scalars['String']>;
  pool_: InputMaybe<Pool_Filter>;
  pool_contains: InputMaybe<Scalars['String']>;
  pool_contains_nocase: InputMaybe<Scalars['String']>;
  pool_ends_with: InputMaybe<Scalars['String']>;
  pool_ends_with_nocase: InputMaybe<Scalars['String']>;
  pool_gt: InputMaybe<Scalars['String']>;
  pool_gte: InputMaybe<Scalars['String']>;
  pool_in: InputMaybe<Array<Scalars['String']>>;
  pool_lt: InputMaybe<Scalars['String']>;
  pool_lte: InputMaybe<Scalars['String']>;
  pool_not: InputMaybe<Scalars['String']>;
  pool_not_contains: InputMaybe<Scalars['String']>;
  pool_not_contains_nocase: InputMaybe<Scalars['String']>;
  pool_not_ends_with: InputMaybe<Scalars['String']>;
  pool_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  pool_not_in: InputMaybe<Array<Scalars['String']>>;
  pool_not_starts_with: InputMaybe<Scalars['String']>;
  pool_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  pool_starts_with: InputMaybe<Scalars['String']>;
  pool_starts_with_nocase: InputMaybe<Scalars['String']>;
  token: InputMaybe<Scalars['String']>;
  token_: InputMaybe<PoolToken_Filter>;
  token_contains: InputMaybe<Scalars['String']>;
  token_contains_nocase: InputMaybe<Scalars['String']>;
  token_ends_with: InputMaybe<Scalars['String']>;
  token_ends_with_nocase: InputMaybe<Scalars['String']>;
  token_gt: InputMaybe<Scalars['String']>;
  token_gte: InputMaybe<Scalars['String']>;
  token_in: InputMaybe<Array<Scalars['String']>>;
  token_lt: InputMaybe<Scalars['String']>;
  token_lte: InputMaybe<Scalars['String']>;
  token_not: InputMaybe<Scalars['String']>;
  token_not_contains: InputMaybe<Scalars['String']>;
  token_not_contains_nocase: InputMaybe<Scalars['String']>;
  token_not_ends_with: InputMaybe<Scalars['String']>;
  token_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  token_not_in: InputMaybe<Array<Scalars['String']>>;
  token_not_starts_with: InputMaybe<Scalars['String']>;
  token_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  token_starts_with: InputMaybe<Scalars['String']>;
  token_starts_with_nocase: InputMaybe<Scalars['String']>;
  upperBoundPercentage: InputMaybe<Scalars['BigDecimal']>;
  upperBoundPercentage_gt: InputMaybe<Scalars['BigDecimal']>;
  upperBoundPercentage_gte: InputMaybe<Scalars['BigDecimal']>;
  upperBoundPercentage_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  upperBoundPercentage_lt: InputMaybe<Scalars['BigDecimal']>;
  upperBoundPercentage_lte: InputMaybe<Scalars['BigDecimal']>;
  upperBoundPercentage_not: InputMaybe<Scalars['BigDecimal']>;
  upperBoundPercentage_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export enum CircuitBreaker_OrderBy {
  BptPrice = 'bptPrice',
  Id = 'id',
  LowerBoundPercentage = 'lowerBoundPercentage',
  Pool = 'pool',
  PoolAddress = 'pool__address',
  PoolAlpha = 'pool__alpha',
  PoolAmp = 'pool__amp',
  PoolBaseToken = 'pool__baseToken',
  PoolBeta = 'pool__beta',
  PoolC = 'pool__c',
  PoolCreateTime = 'pool__createTime',
  PoolDSq = 'pool__dSq',
  PoolDelta = 'pool__delta',
  PoolEpsilon = 'pool__epsilon',
  PoolExpiryTime = 'pool__expiryTime',
  PoolFactory = 'pool__factory',
  PoolHoldersCount = 'pool__holdersCount',
  PoolId = 'pool__id',
  PoolIsInRecoveryMode = 'pool__isInRecoveryMode',
  PoolIsPaused = 'pool__isPaused',
  PoolJoinExitEnabled = 'pool__joinExitEnabled',
  PoolLambda = 'pool__lambda',
  PoolLastJoinExitAmp = 'pool__lastJoinExitAmp',
  PoolLastPostJoinExitInvariant = 'pool__lastPostJoinExitInvariant',
  PoolLowerTarget = 'pool__lowerTarget',
  PoolMainIndex = 'pool__mainIndex',
  PoolManagementAumFee = 'pool__managementAumFee',
  PoolManagementFee = 'pool__managementFee',
  PoolMustAllowlistLPs = 'pool__mustAllowlistLPs',
  PoolName = 'pool__name',
  PoolOracleEnabled = 'pool__oracleEnabled',
  PoolOwner = 'pool__owner',
  PoolPoolType = 'pool__poolType',
  PoolPoolTypeVersion = 'pool__poolTypeVersion',
  PoolPrincipalToken = 'pool__principalToken',
  PoolProtocolAumFeeCache = 'pool__protocolAumFeeCache',
  PoolProtocolId = 'pool__protocolId',
  PoolProtocolSwapFeeCache = 'pool__protocolSwapFeeCache',
  PoolProtocolYieldFeeCache = 'pool__protocolYieldFeeCache',
  PoolRoot3Alpha = 'pool__root3Alpha',
  PoolS = 'pool__s',
  PoolSqrtAlpha = 'pool__sqrtAlpha',
  PoolSqrtBeta = 'pool__sqrtBeta',
  PoolStrategyType = 'pool__strategyType',
  PoolSwapEnabled = 'pool__swapEnabled',
  PoolSwapFee = 'pool__swapFee',
  PoolSwapsCount = 'pool__swapsCount',
  PoolSymbol = 'pool__symbol',
  PoolTauAlphaX = 'pool__tauAlphaX',
  PoolTauAlphaY = 'pool__tauAlphaY',
  PoolTauBetaX = 'pool__tauBetaX',
  PoolTauBetaY = 'pool__tauBetaY',
  PoolTotalAumFeeCollectedInBpt = 'pool__totalAumFeeCollectedInBPT',
  PoolTotalLiquidity = 'pool__totalLiquidity',
  PoolTotalProtocolFee = 'pool__totalProtocolFee',
  PoolTotalProtocolFeePaidInBpt = 'pool__totalProtocolFeePaidInBPT',
  PoolTotalShares = 'pool__totalShares',
  PoolTotalSwapFee = 'pool__totalSwapFee',
  PoolTotalSwapVolume = 'pool__totalSwapVolume',
  PoolTotalWeight = 'pool__totalWeight',
  PoolTx = 'pool__tx',
  PoolU = 'pool__u',
  PoolUnitSeconds = 'pool__unitSeconds',
  PoolUpperTarget = 'pool__upperTarget',
  PoolV = 'pool__v',
  PoolW = 'pool__w',
  PoolWrappedIndex = 'pool__wrappedIndex',
  PoolZ = 'pool__z',
  Token = 'token',
  TokenAddress = 'token__address',
  TokenAssetManager = 'token__assetManager',
  TokenBalance = 'token__balance',
  TokenCashBalance = 'token__cashBalance',
  TokenDecimals = 'token__decimals',
  TokenId = 'token__id',
  TokenIndex = 'token__index',
  TokenIsExemptFromYieldProtocolFee = 'token__isExemptFromYieldProtocolFee',
  TokenManagedBalance = 'token__managedBalance',
  TokenName = 'token__name',
  TokenOldPriceRate = 'token__oldPriceRate',
  TokenPaidProtocolFees = 'token__paidProtocolFees',
  TokenPriceRate = 'token__priceRate',
  TokenSymbol = 'token__symbol',
  TokenWeight = 'token__weight',
  UpperBoundPercentage = 'upperBoundPercentage',
}

export type GradualWeightUpdate = {
  __typename?: 'GradualWeightUpdate';
  endTimestamp: Scalars['BigInt'];
  endWeights: Array<Scalars['BigInt']>;
  id: Scalars['ID'];
  poolId: Pool;
  scheduledTimestamp: Scalars['Int'];
  startTimestamp: Scalars['BigInt'];
  startWeights: Array<Scalars['BigInt']>;
};

export type GradualWeightUpdate_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<GradualWeightUpdate_Filter>>>;
  endTimestamp: InputMaybe<Scalars['BigInt']>;
  endTimestamp_gt: InputMaybe<Scalars['BigInt']>;
  endTimestamp_gte: InputMaybe<Scalars['BigInt']>;
  endTimestamp_in: InputMaybe<Array<Scalars['BigInt']>>;
  endTimestamp_lt: InputMaybe<Scalars['BigInt']>;
  endTimestamp_lte: InputMaybe<Scalars['BigInt']>;
  endTimestamp_not: InputMaybe<Scalars['BigInt']>;
  endTimestamp_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  endWeights: InputMaybe<Array<Scalars['BigInt']>>;
  endWeights_contains: InputMaybe<Array<Scalars['BigInt']>>;
  endWeights_contains_nocase: InputMaybe<Array<Scalars['BigInt']>>;
  endWeights_not: InputMaybe<Array<Scalars['BigInt']>>;
  endWeights_not_contains: InputMaybe<Array<Scalars['BigInt']>>;
  endWeights_not_contains_nocase: InputMaybe<Array<Scalars['BigInt']>>;
  id: InputMaybe<Scalars['ID']>;
  id_gt: InputMaybe<Scalars['ID']>;
  id_gte: InputMaybe<Scalars['ID']>;
  id_in: InputMaybe<Array<Scalars['ID']>>;
  id_lt: InputMaybe<Scalars['ID']>;
  id_lte: InputMaybe<Scalars['ID']>;
  id_not: InputMaybe<Scalars['ID']>;
  id_not_in: InputMaybe<Array<Scalars['ID']>>;
  or: InputMaybe<Array<InputMaybe<GradualWeightUpdate_Filter>>>;
  poolId: InputMaybe<Scalars['String']>;
  poolId_: InputMaybe<Pool_Filter>;
  poolId_contains: InputMaybe<Scalars['String']>;
  poolId_contains_nocase: InputMaybe<Scalars['String']>;
  poolId_ends_with: InputMaybe<Scalars['String']>;
  poolId_ends_with_nocase: InputMaybe<Scalars['String']>;
  poolId_gt: InputMaybe<Scalars['String']>;
  poolId_gte: InputMaybe<Scalars['String']>;
  poolId_in: InputMaybe<Array<Scalars['String']>>;
  poolId_lt: InputMaybe<Scalars['String']>;
  poolId_lte: InputMaybe<Scalars['String']>;
  poolId_not: InputMaybe<Scalars['String']>;
  poolId_not_contains: InputMaybe<Scalars['String']>;
  poolId_not_contains_nocase: InputMaybe<Scalars['String']>;
  poolId_not_ends_with: InputMaybe<Scalars['String']>;
  poolId_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  poolId_not_in: InputMaybe<Array<Scalars['String']>>;
  poolId_not_starts_with: InputMaybe<Scalars['String']>;
  poolId_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  poolId_starts_with: InputMaybe<Scalars['String']>;
  poolId_starts_with_nocase: InputMaybe<Scalars['String']>;
  scheduledTimestamp: InputMaybe<Scalars['Int']>;
  scheduledTimestamp_gt: InputMaybe<Scalars['Int']>;
  scheduledTimestamp_gte: InputMaybe<Scalars['Int']>;
  scheduledTimestamp_in: InputMaybe<Array<Scalars['Int']>>;
  scheduledTimestamp_lt: InputMaybe<Scalars['Int']>;
  scheduledTimestamp_lte: InputMaybe<Scalars['Int']>;
  scheduledTimestamp_not: InputMaybe<Scalars['Int']>;
  scheduledTimestamp_not_in: InputMaybe<Array<Scalars['Int']>>;
  startTimestamp: InputMaybe<Scalars['BigInt']>;
  startTimestamp_gt: InputMaybe<Scalars['BigInt']>;
  startTimestamp_gte: InputMaybe<Scalars['BigInt']>;
  startTimestamp_in: InputMaybe<Array<Scalars['BigInt']>>;
  startTimestamp_lt: InputMaybe<Scalars['BigInt']>;
  startTimestamp_lte: InputMaybe<Scalars['BigInt']>;
  startTimestamp_not: InputMaybe<Scalars['BigInt']>;
  startTimestamp_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  startWeights: InputMaybe<Array<Scalars['BigInt']>>;
  startWeights_contains: InputMaybe<Array<Scalars['BigInt']>>;
  startWeights_contains_nocase: InputMaybe<Array<Scalars['BigInt']>>;
  startWeights_not: InputMaybe<Array<Scalars['BigInt']>>;
  startWeights_not_contains: InputMaybe<Array<Scalars['BigInt']>>;
  startWeights_not_contains_nocase: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum GradualWeightUpdate_OrderBy {
  EndTimestamp = 'endTimestamp',
  EndWeights = 'endWeights',
  Id = 'id',
  PoolId = 'poolId',
  PoolIdAddress = 'poolId__address',
  PoolIdAlpha = 'poolId__alpha',
  PoolIdAmp = 'poolId__amp',
  PoolIdBaseToken = 'poolId__baseToken',
  PoolIdBeta = 'poolId__beta',
  PoolIdC = 'poolId__c',
  PoolIdCreateTime = 'poolId__createTime',
  PoolIdDSq = 'poolId__dSq',
  PoolIdDelta = 'poolId__delta',
  PoolIdEpsilon = 'poolId__epsilon',
  PoolIdExpiryTime = 'poolId__expiryTime',
  PoolIdFactory = 'poolId__factory',
  PoolIdHoldersCount = 'poolId__holdersCount',
  PoolIdId = 'poolId__id',
  PoolIdIsInRecoveryMode = 'poolId__isInRecoveryMode',
  PoolIdIsPaused = 'poolId__isPaused',
  PoolIdJoinExitEnabled = 'poolId__joinExitEnabled',
  PoolIdLambda = 'poolId__lambda',
  PoolIdLastJoinExitAmp = 'poolId__lastJoinExitAmp',
  PoolIdLastPostJoinExitInvariant = 'poolId__lastPostJoinExitInvariant',
  PoolIdLowerTarget = 'poolId__lowerTarget',
  PoolIdMainIndex = 'poolId__mainIndex',
  PoolIdManagementAumFee = 'poolId__managementAumFee',
  PoolIdManagementFee = 'poolId__managementFee',
  PoolIdMustAllowlistLPs = 'poolId__mustAllowlistLPs',
  PoolIdName = 'poolId__name',
  PoolIdOracleEnabled = 'poolId__oracleEnabled',
  PoolIdOwner = 'poolId__owner',
  PoolIdPoolType = 'poolId__poolType',
  PoolIdPoolTypeVersion = 'poolId__poolTypeVersion',
  PoolIdPrincipalToken = 'poolId__principalToken',
  PoolIdProtocolAumFeeCache = 'poolId__protocolAumFeeCache',
  PoolIdProtocolId = 'poolId__protocolId',
  PoolIdProtocolSwapFeeCache = 'poolId__protocolSwapFeeCache',
  PoolIdProtocolYieldFeeCache = 'poolId__protocolYieldFeeCache',
  PoolIdRoot3Alpha = 'poolId__root3Alpha',
  PoolIdS = 'poolId__s',
  PoolIdSqrtAlpha = 'poolId__sqrtAlpha',
  PoolIdSqrtBeta = 'poolId__sqrtBeta',
  PoolIdStrategyType = 'poolId__strategyType',
  PoolIdSwapEnabled = 'poolId__swapEnabled',
  PoolIdSwapFee = 'poolId__swapFee',
  PoolIdSwapsCount = 'poolId__swapsCount',
  PoolIdSymbol = 'poolId__symbol',
  PoolIdTauAlphaX = 'poolId__tauAlphaX',
  PoolIdTauAlphaY = 'poolId__tauAlphaY',
  PoolIdTauBetaX = 'poolId__tauBetaX',
  PoolIdTauBetaY = 'poolId__tauBetaY',
  PoolIdTotalAumFeeCollectedInBpt = 'poolId__totalAumFeeCollectedInBPT',
  PoolIdTotalLiquidity = 'poolId__totalLiquidity',
  PoolIdTotalProtocolFee = 'poolId__totalProtocolFee',
  PoolIdTotalProtocolFeePaidInBpt = 'poolId__totalProtocolFeePaidInBPT',
  PoolIdTotalShares = 'poolId__totalShares',
  PoolIdTotalSwapFee = 'poolId__totalSwapFee',
  PoolIdTotalSwapVolume = 'poolId__totalSwapVolume',
  PoolIdTotalWeight = 'poolId__totalWeight',
  PoolIdTx = 'poolId__tx',
  PoolIdU = 'poolId__u',
  PoolIdUnitSeconds = 'poolId__unitSeconds',
  PoolIdUpperTarget = 'poolId__upperTarget',
  PoolIdV = 'poolId__v',
  PoolIdW = 'poolId__w',
  PoolIdWrappedIndex = 'poolId__wrappedIndex',
  PoolIdZ = 'poolId__z',
  ScheduledTimestamp = 'scheduledTimestamp',
  StartTimestamp = 'startTimestamp',
  StartWeights = 'startWeights',
}

export enum InvestType {
  Exit = 'Exit',
  Join = 'Join',
}

export type JoinExit = {
  __typename?: 'JoinExit';
  amounts: Array<Scalars['BigDecimal']>;
  id: Scalars['ID'];
  pool: Pool;
  sender: Scalars['Bytes'];
  timestamp: Scalars['Int'];
  tx: Scalars['Bytes'];
  type: InvestType;
  user: User;
  valueUSD: Maybe<Scalars['BigDecimal']>;
};

export type JoinExit_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  amounts: InputMaybe<Array<Scalars['BigDecimal']>>;
  amounts_contains: InputMaybe<Array<Scalars['BigDecimal']>>;
  amounts_contains_nocase: InputMaybe<Array<Scalars['BigDecimal']>>;
  amounts_not: InputMaybe<Array<Scalars['BigDecimal']>>;
  amounts_not_contains: InputMaybe<Array<Scalars['BigDecimal']>>;
  amounts_not_contains_nocase: InputMaybe<Array<Scalars['BigDecimal']>>;
  and: InputMaybe<Array<InputMaybe<JoinExit_Filter>>>;
  id: InputMaybe<Scalars['ID']>;
  id_gt: InputMaybe<Scalars['ID']>;
  id_gte: InputMaybe<Scalars['ID']>;
  id_in: InputMaybe<Array<Scalars['ID']>>;
  id_lt: InputMaybe<Scalars['ID']>;
  id_lte: InputMaybe<Scalars['ID']>;
  id_not: InputMaybe<Scalars['ID']>;
  id_not_in: InputMaybe<Array<Scalars['ID']>>;
  or: InputMaybe<Array<InputMaybe<JoinExit_Filter>>>;
  pool: InputMaybe<Scalars['String']>;
  pool_: InputMaybe<Pool_Filter>;
  pool_contains: InputMaybe<Scalars['String']>;
  pool_contains_nocase: InputMaybe<Scalars['String']>;
  pool_ends_with: InputMaybe<Scalars['String']>;
  pool_ends_with_nocase: InputMaybe<Scalars['String']>;
  pool_gt: InputMaybe<Scalars['String']>;
  pool_gte: InputMaybe<Scalars['String']>;
  pool_in: InputMaybe<Array<Scalars['String']>>;
  pool_lt: InputMaybe<Scalars['String']>;
  pool_lte: InputMaybe<Scalars['String']>;
  pool_not: InputMaybe<Scalars['String']>;
  pool_not_contains: InputMaybe<Scalars['String']>;
  pool_not_contains_nocase: InputMaybe<Scalars['String']>;
  pool_not_ends_with: InputMaybe<Scalars['String']>;
  pool_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  pool_not_in: InputMaybe<Array<Scalars['String']>>;
  pool_not_starts_with: InputMaybe<Scalars['String']>;
  pool_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  pool_starts_with: InputMaybe<Scalars['String']>;
  pool_starts_with_nocase: InputMaybe<Scalars['String']>;
  sender: InputMaybe<Scalars['Bytes']>;
  sender_contains: InputMaybe<Scalars['Bytes']>;
  sender_gt: InputMaybe<Scalars['Bytes']>;
  sender_gte: InputMaybe<Scalars['Bytes']>;
  sender_in: InputMaybe<Array<Scalars['Bytes']>>;
  sender_lt: InputMaybe<Scalars['Bytes']>;
  sender_lte: InputMaybe<Scalars['Bytes']>;
  sender_not: InputMaybe<Scalars['Bytes']>;
  sender_not_contains: InputMaybe<Scalars['Bytes']>;
  sender_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  timestamp: InputMaybe<Scalars['Int']>;
  timestamp_gt: InputMaybe<Scalars['Int']>;
  timestamp_gte: InputMaybe<Scalars['Int']>;
  timestamp_in: InputMaybe<Array<Scalars['Int']>>;
  timestamp_lt: InputMaybe<Scalars['Int']>;
  timestamp_lte: InputMaybe<Scalars['Int']>;
  timestamp_not: InputMaybe<Scalars['Int']>;
  timestamp_not_in: InputMaybe<Array<Scalars['Int']>>;
  tx: InputMaybe<Scalars['Bytes']>;
  tx_contains: InputMaybe<Scalars['Bytes']>;
  tx_gt: InputMaybe<Scalars['Bytes']>;
  tx_gte: InputMaybe<Scalars['Bytes']>;
  tx_in: InputMaybe<Array<Scalars['Bytes']>>;
  tx_lt: InputMaybe<Scalars['Bytes']>;
  tx_lte: InputMaybe<Scalars['Bytes']>;
  tx_not: InputMaybe<Scalars['Bytes']>;
  tx_not_contains: InputMaybe<Scalars['Bytes']>;
  tx_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  type: InputMaybe<InvestType>;
  type_in: InputMaybe<Array<InvestType>>;
  type_not: InputMaybe<InvestType>;
  type_not_in: InputMaybe<Array<InvestType>>;
  user: InputMaybe<Scalars['String']>;
  user_: InputMaybe<User_Filter>;
  user_contains: InputMaybe<Scalars['String']>;
  user_contains_nocase: InputMaybe<Scalars['String']>;
  user_ends_with: InputMaybe<Scalars['String']>;
  user_ends_with_nocase: InputMaybe<Scalars['String']>;
  user_gt: InputMaybe<Scalars['String']>;
  user_gte: InputMaybe<Scalars['String']>;
  user_in: InputMaybe<Array<Scalars['String']>>;
  user_lt: InputMaybe<Scalars['String']>;
  user_lte: InputMaybe<Scalars['String']>;
  user_not: InputMaybe<Scalars['String']>;
  user_not_contains: InputMaybe<Scalars['String']>;
  user_not_contains_nocase: InputMaybe<Scalars['String']>;
  user_not_ends_with: InputMaybe<Scalars['String']>;
  user_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  user_not_in: InputMaybe<Array<Scalars['String']>>;
  user_not_starts_with: InputMaybe<Scalars['String']>;
  user_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  user_starts_with: InputMaybe<Scalars['String']>;
  user_starts_with_nocase: InputMaybe<Scalars['String']>;
  valueUSD: InputMaybe<Scalars['BigDecimal']>;
  valueUSD_gt: InputMaybe<Scalars['BigDecimal']>;
  valueUSD_gte: InputMaybe<Scalars['BigDecimal']>;
  valueUSD_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  valueUSD_lt: InputMaybe<Scalars['BigDecimal']>;
  valueUSD_lte: InputMaybe<Scalars['BigDecimal']>;
  valueUSD_not: InputMaybe<Scalars['BigDecimal']>;
  valueUSD_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export enum JoinExit_OrderBy {
  Amounts = 'amounts',
  Id = 'id',
  Pool = 'pool',
  PoolAddress = 'pool__address',
  PoolAlpha = 'pool__alpha',
  PoolAmp = 'pool__amp',
  PoolBaseToken = 'pool__baseToken',
  PoolBeta = 'pool__beta',
  PoolC = 'pool__c',
  PoolCreateTime = 'pool__createTime',
  PoolDSq = 'pool__dSq',
  PoolDelta = 'pool__delta',
  PoolEpsilon = 'pool__epsilon',
  PoolExpiryTime = 'pool__expiryTime',
  PoolFactory = 'pool__factory',
  PoolHoldersCount = 'pool__holdersCount',
  PoolId = 'pool__id',
  PoolIsInRecoveryMode = 'pool__isInRecoveryMode',
  PoolIsPaused = 'pool__isPaused',
  PoolJoinExitEnabled = 'pool__joinExitEnabled',
  PoolLambda = 'pool__lambda',
  PoolLastJoinExitAmp = 'pool__lastJoinExitAmp',
  PoolLastPostJoinExitInvariant = 'pool__lastPostJoinExitInvariant',
  PoolLowerTarget = 'pool__lowerTarget',
  PoolMainIndex = 'pool__mainIndex',
  PoolManagementAumFee = 'pool__managementAumFee',
  PoolManagementFee = 'pool__managementFee',
  PoolMustAllowlistLPs = 'pool__mustAllowlistLPs',
  PoolName = 'pool__name',
  PoolOracleEnabled = 'pool__oracleEnabled',
  PoolOwner = 'pool__owner',
  PoolPoolType = 'pool__poolType',
  PoolPoolTypeVersion = 'pool__poolTypeVersion',
  PoolPrincipalToken = 'pool__principalToken',
  PoolProtocolAumFeeCache = 'pool__protocolAumFeeCache',
  PoolProtocolId = 'pool__protocolId',
  PoolProtocolSwapFeeCache = 'pool__protocolSwapFeeCache',
  PoolProtocolYieldFeeCache = 'pool__protocolYieldFeeCache',
  PoolRoot3Alpha = 'pool__root3Alpha',
  PoolS = 'pool__s',
  PoolSqrtAlpha = 'pool__sqrtAlpha',
  PoolSqrtBeta = 'pool__sqrtBeta',
  PoolStrategyType = 'pool__strategyType',
  PoolSwapEnabled = 'pool__swapEnabled',
  PoolSwapFee = 'pool__swapFee',
  PoolSwapsCount = 'pool__swapsCount',
  PoolSymbol = 'pool__symbol',
  PoolTauAlphaX = 'pool__tauAlphaX',
  PoolTauAlphaY = 'pool__tauAlphaY',
  PoolTauBetaX = 'pool__tauBetaX',
  PoolTauBetaY = 'pool__tauBetaY',
  PoolTotalAumFeeCollectedInBpt = 'pool__totalAumFeeCollectedInBPT',
  PoolTotalLiquidity = 'pool__totalLiquidity',
  PoolTotalProtocolFee = 'pool__totalProtocolFee',
  PoolTotalProtocolFeePaidInBpt = 'pool__totalProtocolFeePaidInBPT',
  PoolTotalShares = 'pool__totalShares',
  PoolTotalSwapFee = 'pool__totalSwapFee',
  PoolTotalSwapVolume = 'pool__totalSwapVolume',
  PoolTotalWeight = 'pool__totalWeight',
  PoolTx = 'pool__tx',
  PoolU = 'pool__u',
  PoolUnitSeconds = 'pool__unitSeconds',
  PoolUpperTarget = 'pool__upperTarget',
  PoolV = 'pool__v',
  PoolW = 'pool__w',
  PoolWrappedIndex = 'pool__wrappedIndex',
  PoolZ = 'pool__z',
  Sender = 'sender',
  Timestamp = 'timestamp',
  Tx = 'tx',
  Type = 'type',
  User = 'user',
  UserId = 'user__id',
  ValueUsd = 'valueUSD',
}

export type LatestPrice = {
  __typename?: 'LatestPrice';
  asset: Scalars['Bytes'];
  block: Scalars['BigInt'];
  id: Scalars['ID'];
  poolId: Pool;
  price: Scalars['BigDecimal'];
  pricingAsset: Scalars['Bytes'];
};

export type LatestPrice_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<LatestPrice_Filter>>>;
  asset: InputMaybe<Scalars['Bytes']>;
  asset_contains: InputMaybe<Scalars['Bytes']>;
  asset_gt: InputMaybe<Scalars['Bytes']>;
  asset_gte: InputMaybe<Scalars['Bytes']>;
  asset_in: InputMaybe<Array<Scalars['Bytes']>>;
  asset_lt: InputMaybe<Scalars['Bytes']>;
  asset_lte: InputMaybe<Scalars['Bytes']>;
  asset_not: InputMaybe<Scalars['Bytes']>;
  asset_not_contains: InputMaybe<Scalars['Bytes']>;
  asset_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  block: InputMaybe<Scalars['BigInt']>;
  block_gt: InputMaybe<Scalars['BigInt']>;
  block_gte: InputMaybe<Scalars['BigInt']>;
  block_in: InputMaybe<Array<Scalars['BigInt']>>;
  block_lt: InputMaybe<Scalars['BigInt']>;
  block_lte: InputMaybe<Scalars['BigInt']>;
  block_not: InputMaybe<Scalars['BigInt']>;
  block_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  id: InputMaybe<Scalars['ID']>;
  id_gt: InputMaybe<Scalars['ID']>;
  id_gte: InputMaybe<Scalars['ID']>;
  id_in: InputMaybe<Array<Scalars['ID']>>;
  id_lt: InputMaybe<Scalars['ID']>;
  id_lte: InputMaybe<Scalars['ID']>;
  id_not: InputMaybe<Scalars['ID']>;
  id_not_in: InputMaybe<Array<Scalars['ID']>>;
  or: InputMaybe<Array<InputMaybe<LatestPrice_Filter>>>;
  poolId: InputMaybe<Scalars['String']>;
  poolId_: InputMaybe<Pool_Filter>;
  poolId_contains: InputMaybe<Scalars['String']>;
  poolId_contains_nocase: InputMaybe<Scalars['String']>;
  poolId_ends_with: InputMaybe<Scalars['String']>;
  poolId_ends_with_nocase: InputMaybe<Scalars['String']>;
  poolId_gt: InputMaybe<Scalars['String']>;
  poolId_gte: InputMaybe<Scalars['String']>;
  poolId_in: InputMaybe<Array<Scalars['String']>>;
  poolId_lt: InputMaybe<Scalars['String']>;
  poolId_lte: InputMaybe<Scalars['String']>;
  poolId_not: InputMaybe<Scalars['String']>;
  poolId_not_contains: InputMaybe<Scalars['String']>;
  poolId_not_contains_nocase: InputMaybe<Scalars['String']>;
  poolId_not_ends_with: InputMaybe<Scalars['String']>;
  poolId_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  poolId_not_in: InputMaybe<Array<Scalars['String']>>;
  poolId_not_starts_with: InputMaybe<Scalars['String']>;
  poolId_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  poolId_starts_with: InputMaybe<Scalars['String']>;
  poolId_starts_with_nocase: InputMaybe<Scalars['String']>;
  price: InputMaybe<Scalars['BigDecimal']>;
  price_gt: InputMaybe<Scalars['BigDecimal']>;
  price_gte: InputMaybe<Scalars['BigDecimal']>;
  price_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  price_lt: InputMaybe<Scalars['BigDecimal']>;
  price_lte: InputMaybe<Scalars['BigDecimal']>;
  price_not: InputMaybe<Scalars['BigDecimal']>;
  price_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  pricingAsset: InputMaybe<Scalars['Bytes']>;
  pricingAsset_contains: InputMaybe<Scalars['Bytes']>;
  pricingAsset_gt: InputMaybe<Scalars['Bytes']>;
  pricingAsset_gte: InputMaybe<Scalars['Bytes']>;
  pricingAsset_in: InputMaybe<Array<Scalars['Bytes']>>;
  pricingAsset_lt: InputMaybe<Scalars['Bytes']>;
  pricingAsset_lte: InputMaybe<Scalars['Bytes']>;
  pricingAsset_not: InputMaybe<Scalars['Bytes']>;
  pricingAsset_not_contains: InputMaybe<Scalars['Bytes']>;
  pricingAsset_not_in: InputMaybe<Array<Scalars['Bytes']>>;
};

export enum LatestPrice_OrderBy {
  Asset = 'asset',
  Block = 'block',
  Id = 'id',
  PoolId = 'poolId',
  PoolIdAddress = 'poolId__address',
  PoolIdAlpha = 'poolId__alpha',
  PoolIdAmp = 'poolId__amp',
  PoolIdBaseToken = 'poolId__baseToken',
  PoolIdBeta = 'poolId__beta',
  PoolIdC = 'poolId__c',
  PoolIdCreateTime = 'poolId__createTime',
  PoolIdDSq = 'poolId__dSq',
  PoolIdDelta = 'poolId__delta',
  PoolIdEpsilon = 'poolId__epsilon',
  PoolIdExpiryTime = 'poolId__expiryTime',
  PoolIdFactory = 'poolId__factory',
  PoolIdHoldersCount = 'poolId__holdersCount',
  PoolIdId = 'poolId__id',
  PoolIdIsInRecoveryMode = 'poolId__isInRecoveryMode',
  PoolIdIsPaused = 'poolId__isPaused',
  PoolIdJoinExitEnabled = 'poolId__joinExitEnabled',
  PoolIdLambda = 'poolId__lambda',
  PoolIdLastJoinExitAmp = 'poolId__lastJoinExitAmp',
  PoolIdLastPostJoinExitInvariant = 'poolId__lastPostJoinExitInvariant',
  PoolIdLowerTarget = 'poolId__lowerTarget',
  PoolIdMainIndex = 'poolId__mainIndex',
  PoolIdManagementAumFee = 'poolId__managementAumFee',
  PoolIdManagementFee = 'poolId__managementFee',
  PoolIdMustAllowlistLPs = 'poolId__mustAllowlistLPs',
  PoolIdName = 'poolId__name',
  PoolIdOracleEnabled = 'poolId__oracleEnabled',
  PoolIdOwner = 'poolId__owner',
  PoolIdPoolType = 'poolId__poolType',
  PoolIdPoolTypeVersion = 'poolId__poolTypeVersion',
  PoolIdPrincipalToken = 'poolId__principalToken',
  PoolIdProtocolAumFeeCache = 'poolId__protocolAumFeeCache',
  PoolIdProtocolId = 'poolId__protocolId',
  PoolIdProtocolSwapFeeCache = 'poolId__protocolSwapFeeCache',
  PoolIdProtocolYieldFeeCache = 'poolId__protocolYieldFeeCache',
  PoolIdRoot3Alpha = 'poolId__root3Alpha',
  PoolIdS = 'poolId__s',
  PoolIdSqrtAlpha = 'poolId__sqrtAlpha',
  PoolIdSqrtBeta = 'poolId__sqrtBeta',
  PoolIdStrategyType = 'poolId__strategyType',
  PoolIdSwapEnabled = 'poolId__swapEnabled',
  PoolIdSwapFee = 'poolId__swapFee',
  PoolIdSwapsCount = 'poolId__swapsCount',
  PoolIdSymbol = 'poolId__symbol',
  PoolIdTauAlphaX = 'poolId__tauAlphaX',
  PoolIdTauAlphaY = 'poolId__tauAlphaY',
  PoolIdTauBetaX = 'poolId__tauBetaX',
  PoolIdTauBetaY = 'poolId__tauBetaY',
  PoolIdTotalAumFeeCollectedInBpt = 'poolId__totalAumFeeCollectedInBPT',
  PoolIdTotalLiquidity = 'poolId__totalLiquidity',
  PoolIdTotalProtocolFee = 'poolId__totalProtocolFee',
  PoolIdTotalProtocolFeePaidInBpt = 'poolId__totalProtocolFeePaidInBPT',
  PoolIdTotalShares = 'poolId__totalShares',
  PoolIdTotalSwapFee = 'poolId__totalSwapFee',
  PoolIdTotalSwapVolume = 'poolId__totalSwapVolume',
  PoolIdTotalWeight = 'poolId__totalWeight',
  PoolIdTx = 'poolId__tx',
  PoolIdU = 'poolId__u',
  PoolIdUnitSeconds = 'poolId__unitSeconds',
  PoolIdUpperTarget = 'poolId__upperTarget',
  PoolIdV = 'poolId__v',
  PoolIdW = 'poolId__w',
  PoolIdWrappedIndex = 'poolId__wrappedIndex',
  PoolIdZ = 'poolId__z',
  Price = 'price',
  PricingAsset = 'pricingAsset',
}

export type ManagementOperation = {
  __typename?: 'ManagementOperation';
  cashDelta: Scalars['BigDecimal'];
  id: Scalars['ID'];
  managedDelta: Scalars['BigDecimal'];
  poolTokenId: PoolToken;
  timestamp: Scalars['Int'];
  type: OperationType;
};

export type ManagementOperation_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<ManagementOperation_Filter>>>;
  cashDelta: InputMaybe<Scalars['BigDecimal']>;
  cashDelta_gt: InputMaybe<Scalars['BigDecimal']>;
  cashDelta_gte: InputMaybe<Scalars['BigDecimal']>;
  cashDelta_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  cashDelta_lt: InputMaybe<Scalars['BigDecimal']>;
  cashDelta_lte: InputMaybe<Scalars['BigDecimal']>;
  cashDelta_not: InputMaybe<Scalars['BigDecimal']>;
  cashDelta_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  id: InputMaybe<Scalars['ID']>;
  id_gt: InputMaybe<Scalars['ID']>;
  id_gte: InputMaybe<Scalars['ID']>;
  id_in: InputMaybe<Array<Scalars['ID']>>;
  id_lt: InputMaybe<Scalars['ID']>;
  id_lte: InputMaybe<Scalars['ID']>;
  id_not: InputMaybe<Scalars['ID']>;
  id_not_in: InputMaybe<Array<Scalars['ID']>>;
  managedDelta: InputMaybe<Scalars['BigDecimal']>;
  managedDelta_gt: InputMaybe<Scalars['BigDecimal']>;
  managedDelta_gte: InputMaybe<Scalars['BigDecimal']>;
  managedDelta_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  managedDelta_lt: InputMaybe<Scalars['BigDecimal']>;
  managedDelta_lte: InputMaybe<Scalars['BigDecimal']>;
  managedDelta_not: InputMaybe<Scalars['BigDecimal']>;
  managedDelta_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  or: InputMaybe<Array<InputMaybe<ManagementOperation_Filter>>>;
  poolTokenId: InputMaybe<Scalars['String']>;
  poolTokenId_: InputMaybe<PoolToken_Filter>;
  poolTokenId_contains: InputMaybe<Scalars['String']>;
  poolTokenId_contains_nocase: InputMaybe<Scalars['String']>;
  poolTokenId_ends_with: InputMaybe<Scalars['String']>;
  poolTokenId_ends_with_nocase: InputMaybe<Scalars['String']>;
  poolTokenId_gt: InputMaybe<Scalars['String']>;
  poolTokenId_gte: InputMaybe<Scalars['String']>;
  poolTokenId_in: InputMaybe<Array<Scalars['String']>>;
  poolTokenId_lt: InputMaybe<Scalars['String']>;
  poolTokenId_lte: InputMaybe<Scalars['String']>;
  poolTokenId_not: InputMaybe<Scalars['String']>;
  poolTokenId_not_contains: InputMaybe<Scalars['String']>;
  poolTokenId_not_contains_nocase: InputMaybe<Scalars['String']>;
  poolTokenId_not_ends_with: InputMaybe<Scalars['String']>;
  poolTokenId_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  poolTokenId_not_in: InputMaybe<Array<Scalars['String']>>;
  poolTokenId_not_starts_with: InputMaybe<Scalars['String']>;
  poolTokenId_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  poolTokenId_starts_with: InputMaybe<Scalars['String']>;
  poolTokenId_starts_with_nocase: InputMaybe<Scalars['String']>;
  timestamp: InputMaybe<Scalars['Int']>;
  timestamp_gt: InputMaybe<Scalars['Int']>;
  timestamp_gte: InputMaybe<Scalars['Int']>;
  timestamp_in: InputMaybe<Array<Scalars['Int']>>;
  timestamp_lt: InputMaybe<Scalars['Int']>;
  timestamp_lte: InputMaybe<Scalars['Int']>;
  timestamp_not: InputMaybe<Scalars['Int']>;
  timestamp_not_in: InputMaybe<Array<Scalars['Int']>>;
  type: InputMaybe<OperationType>;
  type_in: InputMaybe<Array<OperationType>>;
  type_not: InputMaybe<OperationType>;
  type_not_in: InputMaybe<Array<OperationType>>;
};

export enum ManagementOperation_OrderBy {
  CashDelta = 'cashDelta',
  Id = 'id',
  ManagedDelta = 'managedDelta',
  PoolTokenId = 'poolTokenId',
  PoolTokenIdAddress = 'poolTokenId__address',
  PoolTokenIdAssetManager = 'poolTokenId__assetManager',
  PoolTokenIdBalance = 'poolTokenId__balance',
  PoolTokenIdCashBalance = 'poolTokenId__cashBalance',
  PoolTokenIdDecimals = 'poolTokenId__decimals',
  PoolTokenIdId = 'poolTokenId__id',
  PoolTokenIdIndex = 'poolTokenId__index',
  PoolTokenIdIsExemptFromYieldProtocolFee = 'poolTokenId__isExemptFromYieldProtocolFee',
  PoolTokenIdManagedBalance = 'poolTokenId__managedBalance',
  PoolTokenIdName = 'poolTokenId__name',
  PoolTokenIdOldPriceRate = 'poolTokenId__oldPriceRate',
  PoolTokenIdPaidProtocolFees = 'poolTokenId__paidProtocolFees',
  PoolTokenIdPriceRate = 'poolTokenId__priceRate',
  PoolTokenIdSymbol = 'poolTokenId__symbol',
  PoolTokenIdWeight = 'poolTokenId__weight',
  Timestamp = 'timestamp',
  Type = 'type',
}

export enum OperationType {
  Deposit = 'Deposit',
  Update = 'Update',
  Withdraw = 'Withdraw',
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export type Pool = {
  __typename?: 'Pool';
  address: Scalars['Bytes'];
  alpha: Maybe<Scalars['BigDecimal']>;
  amp: Maybe<Scalars['BigInt']>;
  baseToken: Maybe<Scalars['Bytes']>;
  beta: Maybe<Scalars['BigDecimal']>;
  c: Maybe<Scalars['BigDecimal']>;
  circuitBreakers: Maybe<Array<CircuitBreaker>>;
  createTime: Scalars['Int'];
  dSq: Maybe<Scalars['BigDecimal']>;
  delta: Maybe<Scalars['BigDecimal']>;
  epsilon: Maybe<Scalars['BigDecimal']>;
  expiryTime: Maybe<Scalars['BigInt']>;
  factory: Maybe<Scalars['Bytes']>;
  historicalValues: Maybe<Array<PoolHistoricalLiquidity>>;
  holdersCount: Scalars['BigInt'];
  id: Scalars['ID'];
  isInRecoveryMode: Maybe<Scalars['Boolean']>;
  isPaused: Maybe<Scalars['Boolean']>;
  joinExitEnabled: Maybe<Scalars['Boolean']>;
  lambda: Maybe<Scalars['BigDecimal']>;
  lastJoinExitAmp: Maybe<Scalars['BigInt']>;
  lastPostJoinExitInvariant: Maybe<Scalars['BigDecimal']>;
  lowerTarget: Maybe<Scalars['BigDecimal']>;
  mainIndex: Maybe<Scalars['Int']>;
  managementAumFee: Maybe<Scalars['BigDecimal']>;
  managementFee: Maybe<Scalars['BigDecimal']>;
  mustAllowlistLPs: Maybe<Scalars['Boolean']>;
  name: Maybe<Scalars['String']>;
  oracleEnabled: Scalars['Boolean'];
  owner: Maybe<Scalars['Bytes']>;
  poolType: Maybe<Scalars['String']>;
  poolTypeVersion: Maybe<Scalars['Int']>;
  priceRateProviders: Maybe<Array<PriceRateProvider>>;
  principalToken: Maybe<Scalars['Bytes']>;
  protocolAumFeeCache: Maybe<Scalars['BigDecimal']>;
  protocolId: Maybe<Scalars['Int']>;
  protocolIdData: Maybe<ProtocolIdData>;
  protocolSwapFeeCache: Maybe<Scalars['BigDecimal']>;
  protocolYieldFeeCache: Maybe<Scalars['BigDecimal']>;
  root3Alpha: Maybe<Scalars['BigDecimal']>;
  s: Maybe<Scalars['BigDecimal']>;
  shares: Maybe<Array<PoolShare>>;
  snapshots: Maybe<Array<PoolSnapshot>>;
  sqrtAlpha: Maybe<Scalars['BigDecimal']>;
  sqrtBeta: Maybe<Scalars['BigDecimal']>;
  strategyType: Scalars['Int'];
  swapEnabled: Scalars['Boolean'];
  swapFee: Scalars['BigDecimal'];
  swaps: Maybe<Array<Swap>>;
  swapsCount: Scalars['BigInt'];
  symbol: Maybe<Scalars['String']>;
  tauAlphaX: Maybe<Scalars['BigDecimal']>;
  tauAlphaY: Maybe<Scalars['BigDecimal']>;
  tauBetaX: Maybe<Scalars['BigDecimal']>;
  tauBetaY: Maybe<Scalars['BigDecimal']>;
  tokens: Maybe<Array<PoolToken>>;
  tokensList: Array<Scalars['Bytes']>;
  totalAumFeeCollectedInBPT: Maybe<Scalars['BigDecimal']>;
  totalLiquidity: Scalars['BigDecimal'];
  totalProtocolFee: Maybe<Scalars['BigDecimal']>;
  totalProtocolFeePaidInBPT: Maybe<Scalars['BigDecimal']>;
  totalShares: Scalars['BigDecimal'];
  totalSwapFee: Scalars['BigDecimal'];
  totalSwapVolume: Scalars['BigDecimal'];
  totalWeight: Maybe<Scalars['BigDecimal']>;
  tx: Maybe<Scalars['Bytes']>;
  u: Maybe<Scalars['BigDecimal']>;
  unitSeconds: Maybe<Scalars['BigInt']>;
  upperTarget: Maybe<Scalars['BigDecimal']>;
  v: Maybe<Scalars['BigDecimal']>;
  vaultID: Balancer;
  w: Maybe<Scalars['BigDecimal']>;
  weightUpdates: Maybe<Array<GradualWeightUpdate>>;
  wrappedIndex: Maybe<Scalars['Int']>;
  z: Maybe<Scalars['BigDecimal']>;
};

export type PoolCircuitBreakersArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<CircuitBreaker_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<CircuitBreaker_Filter>;
};

export type PoolHistoricalValuesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<PoolHistoricalLiquidity_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<PoolHistoricalLiquidity_Filter>;
};

export type PoolPriceRateProvidersArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<PriceRateProvider_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<PriceRateProvider_Filter>;
};

export type PoolSharesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<PoolShare_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<PoolShare_Filter>;
};

export type PoolSnapshotsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<PoolSnapshot_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<PoolSnapshot_Filter>;
};

export type PoolSwapsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Swap_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<Swap_Filter>;
};

export type PoolTokensArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<PoolToken_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<PoolToken_Filter>;
};

export type PoolWeightUpdatesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<GradualWeightUpdate_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<GradualWeightUpdate_Filter>;
};

export type PoolContract = {
  __typename?: 'PoolContract';
  id: Scalars['ID'];
  pool: Pool;
};

export type PoolContract_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<PoolContract_Filter>>>;
  id: InputMaybe<Scalars['ID']>;
  id_gt: InputMaybe<Scalars['ID']>;
  id_gte: InputMaybe<Scalars['ID']>;
  id_in: InputMaybe<Array<Scalars['ID']>>;
  id_lt: InputMaybe<Scalars['ID']>;
  id_lte: InputMaybe<Scalars['ID']>;
  id_not: InputMaybe<Scalars['ID']>;
  id_not_in: InputMaybe<Array<Scalars['ID']>>;
  or: InputMaybe<Array<InputMaybe<PoolContract_Filter>>>;
  pool: InputMaybe<Scalars['String']>;
  pool_: InputMaybe<Pool_Filter>;
  pool_contains: InputMaybe<Scalars['String']>;
  pool_contains_nocase: InputMaybe<Scalars['String']>;
  pool_ends_with: InputMaybe<Scalars['String']>;
  pool_ends_with_nocase: InputMaybe<Scalars['String']>;
  pool_gt: InputMaybe<Scalars['String']>;
  pool_gte: InputMaybe<Scalars['String']>;
  pool_in: InputMaybe<Array<Scalars['String']>>;
  pool_lt: InputMaybe<Scalars['String']>;
  pool_lte: InputMaybe<Scalars['String']>;
  pool_not: InputMaybe<Scalars['String']>;
  pool_not_contains: InputMaybe<Scalars['String']>;
  pool_not_contains_nocase: InputMaybe<Scalars['String']>;
  pool_not_ends_with: InputMaybe<Scalars['String']>;
  pool_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  pool_not_in: InputMaybe<Array<Scalars['String']>>;
  pool_not_starts_with: InputMaybe<Scalars['String']>;
  pool_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  pool_starts_with: InputMaybe<Scalars['String']>;
  pool_starts_with_nocase: InputMaybe<Scalars['String']>;
};

export enum PoolContract_OrderBy {
  Id = 'id',
  Pool = 'pool',
  PoolAddress = 'pool__address',
  PoolAlpha = 'pool__alpha',
  PoolAmp = 'pool__amp',
  PoolBaseToken = 'pool__baseToken',
  PoolBeta = 'pool__beta',
  PoolC = 'pool__c',
  PoolCreateTime = 'pool__createTime',
  PoolDSq = 'pool__dSq',
  PoolDelta = 'pool__delta',
  PoolEpsilon = 'pool__epsilon',
  PoolExpiryTime = 'pool__expiryTime',
  PoolFactory = 'pool__factory',
  PoolHoldersCount = 'pool__holdersCount',
  PoolId = 'pool__id',
  PoolIsInRecoveryMode = 'pool__isInRecoveryMode',
  PoolIsPaused = 'pool__isPaused',
  PoolJoinExitEnabled = 'pool__joinExitEnabled',
  PoolLambda = 'pool__lambda',
  PoolLastJoinExitAmp = 'pool__lastJoinExitAmp',
  PoolLastPostJoinExitInvariant = 'pool__lastPostJoinExitInvariant',
  PoolLowerTarget = 'pool__lowerTarget',
  PoolMainIndex = 'pool__mainIndex',
  PoolManagementAumFee = 'pool__managementAumFee',
  PoolManagementFee = 'pool__managementFee',
  PoolMustAllowlistLPs = 'pool__mustAllowlistLPs',
  PoolName = 'pool__name',
  PoolOracleEnabled = 'pool__oracleEnabled',
  PoolOwner = 'pool__owner',
  PoolPoolType = 'pool__poolType',
  PoolPoolTypeVersion = 'pool__poolTypeVersion',
  PoolPrincipalToken = 'pool__principalToken',
  PoolProtocolAumFeeCache = 'pool__protocolAumFeeCache',
  PoolProtocolId = 'pool__protocolId',
  PoolProtocolSwapFeeCache = 'pool__protocolSwapFeeCache',
  PoolProtocolYieldFeeCache = 'pool__protocolYieldFeeCache',
  PoolRoot3Alpha = 'pool__root3Alpha',
  PoolS = 'pool__s',
  PoolSqrtAlpha = 'pool__sqrtAlpha',
  PoolSqrtBeta = 'pool__sqrtBeta',
  PoolStrategyType = 'pool__strategyType',
  PoolSwapEnabled = 'pool__swapEnabled',
  PoolSwapFee = 'pool__swapFee',
  PoolSwapsCount = 'pool__swapsCount',
  PoolSymbol = 'pool__symbol',
  PoolTauAlphaX = 'pool__tauAlphaX',
  PoolTauAlphaY = 'pool__tauAlphaY',
  PoolTauBetaX = 'pool__tauBetaX',
  PoolTauBetaY = 'pool__tauBetaY',
  PoolTotalAumFeeCollectedInBpt = 'pool__totalAumFeeCollectedInBPT',
  PoolTotalLiquidity = 'pool__totalLiquidity',
  PoolTotalProtocolFee = 'pool__totalProtocolFee',
  PoolTotalProtocolFeePaidInBpt = 'pool__totalProtocolFeePaidInBPT',
  PoolTotalShares = 'pool__totalShares',
  PoolTotalSwapFee = 'pool__totalSwapFee',
  PoolTotalSwapVolume = 'pool__totalSwapVolume',
  PoolTotalWeight = 'pool__totalWeight',
  PoolTx = 'pool__tx',
  PoolU = 'pool__u',
  PoolUnitSeconds = 'pool__unitSeconds',
  PoolUpperTarget = 'pool__upperTarget',
  PoolV = 'pool__v',
  PoolW = 'pool__w',
  PoolWrappedIndex = 'pool__wrappedIndex',
  PoolZ = 'pool__z',
}

export type PoolHistoricalLiquidity = {
  __typename?: 'PoolHistoricalLiquidity';
  block: Scalars['BigInt'];
  id: Scalars['ID'];
  poolId: Pool;
  poolLiquidity: Scalars['BigDecimal'];
  poolShareValue: Scalars['BigDecimal'];
  poolTotalShares: Scalars['BigDecimal'];
  pricingAsset: Scalars['Bytes'];
};

export type PoolHistoricalLiquidity_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<PoolHistoricalLiquidity_Filter>>>;
  block: InputMaybe<Scalars['BigInt']>;
  block_gt: InputMaybe<Scalars['BigInt']>;
  block_gte: InputMaybe<Scalars['BigInt']>;
  block_in: InputMaybe<Array<Scalars['BigInt']>>;
  block_lt: InputMaybe<Scalars['BigInt']>;
  block_lte: InputMaybe<Scalars['BigInt']>;
  block_not: InputMaybe<Scalars['BigInt']>;
  block_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  id: InputMaybe<Scalars['ID']>;
  id_gt: InputMaybe<Scalars['ID']>;
  id_gte: InputMaybe<Scalars['ID']>;
  id_in: InputMaybe<Array<Scalars['ID']>>;
  id_lt: InputMaybe<Scalars['ID']>;
  id_lte: InputMaybe<Scalars['ID']>;
  id_not: InputMaybe<Scalars['ID']>;
  id_not_in: InputMaybe<Array<Scalars['ID']>>;
  or: InputMaybe<Array<InputMaybe<PoolHistoricalLiquidity_Filter>>>;
  poolId: InputMaybe<Scalars['String']>;
  poolId_: InputMaybe<Pool_Filter>;
  poolId_contains: InputMaybe<Scalars['String']>;
  poolId_contains_nocase: InputMaybe<Scalars['String']>;
  poolId_ends_with: InputMaybe<Scalars['String']>;
  poolId_ends_with_nocase: InputMaybe<Scalars['String']>;
  poolId_gt: InputMaybe<Scalars['String']>;
  poolId_gte: InputMaybe<Scalars['String']>;
  poolId_in: InputMaybe<Array<Scalars['String']>>;
  poolId_lt: InputMaybe<Scalars['String']>;
  poolId_lte: InputMaybe<Scalars['String']>;
  poolId_not: InputMaybe<Scalars['String']>;
  poolId_not_contains: InputMaybe<Scalars['String']>;
  poolId_not_contains_nocase: InputMaybe<Scalars['String']>;
  poolId_not_ends_with: InputMaybe<Scalars['String']>;
  poolId_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  poolId_not_in: InputMaybe<Array<Scalars['String']>>;
  poolId_not_starts_with: InputMaybe<Scalars['String']>;
  poolId_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  poolId_starts_with: InputMaybe<Scalars['String']>;
  poolId_starts_with_nocase: InputMaybe<Scalars['String']>;
  poolLiquidity: InputMaybe<Scalars['BigDecimal']>;
  poolLiquidity_gt: InputMaybe<Scalars['BigDecimal']>;
  poolLiquidity_gte: InputMaybe<Scalars['BigDecimal']>;
  poolLiquidity_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  poolLiquidity_lt: InputMaybe<Scalars['BigDecimal']>;
  poolLiquidity_lte: InputMaybe<Scalars['BigDecimal']>;
  poolLiquidity_not: InputMaybe<Scalars['BigDecimal']>;
  poolLiquidity_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  poolShareValue: InputMaybe<Scalars['BigDecimal']>;
  poolShareValue_gt: InputMaybe<Scalars['BigDecimal']>;
  poolShareValue_gte: InputMaybe<Scalars['BigDecimal']>;
  poolShareValue_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  poolShareValue_lt: InputMaybe<Scalars['BigDecimal']>;
  poolShareValue_lte: InputMaybe<Scalars['BigDecimal']>;
  poolShareValue_not: InputMaybe<Scalars['BigDecimal']>;
  poolShareValue_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  poolTotalShares: InputMaybe<Scalars['BigDecimal']>;
  poolTotalShares_gt: InputMaybe<Scalars['BigDecimal']>;
  poolTotalShares_gte: InputMaybe<Scalars['BigDecimal']>;
  poolTotalShares_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  poolTotalShares_lt: InputMaybe<Scalars['BigDecimal']>;
  poolTotalShares_lte: InputMaybe<Scalars['BigDecimal']>;
  poolTotalShares_not: InputMaybe<Scalars['BigDecimal']>;
  poolTotalShares_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  pricingAsset: InputMaybe<Scalars['Bytes']>;
  pricingAsset_contains: InputMaybe<Scalars['Bytes']>;
  pricingAsset_gt: InputMaybe<Scalars['Bytes']>;
  pricingAsset_gte: InputMaybe<Scalars['Bytes']>;
  pricingAsset_in: InputMaybe<Array<Scalars['Bytes']>>;
  pricingAsset_lt: InputMaybe<Scalars['Bytes']>;
  pricingAsset_lte: InputMaybe<Scalars['Bytes']>;
  pricingAsset_not: InputMaybe<Scalars['Bytes']>;
  pricingAsset_not_contains: InputMaybe<Scalars['Bytes']>;
  pricingAsset_not_in: InputMaybe<Array<Scalars['Bytes']>>;
};

export enum PoolHistoricalLiquidity_OrderBy {
  Block = 'block',
  Id = 'id',
  PoolId = 'poolId',
  PoolIdAddress = 'poolId__address',
  PoolIdAlpha = 'poolId__alpha',
  PoolIdAmp = 'poolId__amp',
  PoolIdBaseToken = 'poolId__baseToken',
  PoolIdBeta = 'poolId__beta',
  PoolIdC = 'poolId__c',
  PoolIdCreateTime = 'poolId__createTime',
  PoolIdDSq = 'poolId__dSq',
  PoolIdDelta = 'poolId__delta',
  PoolIdEpsilon = 'poolId__epsilon',
  PoolIdExpiryTime = 'poolId__expiryTime',
  PoolIdFactory = 'poolId__factory',
  PoolIdHoldersCount = 'poolId__holdersCount',
  PoolIdId = 'poolId__id',
  PoolIdIsInRecoveryMode = 'poolId__isInRecoveryMode',
  PoolIdIsPaused = 'poolId__isPaused',
  PoolIdJoinExitEnabled = 'poolId__joinExitEnabled',
  PoolIdLambda = 'poolId__lambda',
  PoolIdLastJoinExitAmp = 'poolId__lastJoinExitAmp',
  PoolIdLastPostJoinExitInvariant = 'poolId__lastPostJoinExitInvariant',
  PoolIdLowerTarget = 'poolId__lowerTarget',
  PoolIdMainIndex = 'poolId__mainIndex',
  PoolIdManagementAumFee = 'poolId__managementAumFee',
  PoolIdManagementFee = 'poolId__managementFee',
  PoolIdMustAllowlistLPs = 'poolId__mustAllowlistLPs',
  PoolIdName = 'poolId__name',
  PoolIdOracleEnabled = 'poolId__oracleEnabled',
  PoolIdOwner = 'poolId__owner',
  PoolIdPoolType = 'poolId__poolType',
  PoolIdPoolTypeVersion = 'poolId__poolTypeVersion',
  PoolIdPrincipalToken = 'poolId__principalToken',
  PoolIdProtocolAumFeeCache = 'poolId__protocolAumFeeCache',
  PoolIdProtocolId = 'poolId__protocolId',
  PoolIdProtocolSwapFeeCache = 'poolId__protocolSwapFeeCache',
  PoolIdProtocolYieldFeeCache = 'poolId__protocolYieldFeeCache',
  PoolIdRoot3Alpha = 'poolId__root3Alpha',
  PoolIdS = 'poolId__s',
  PoolIdSqrtAlpha = 'poolId__sqrtAlpha',
  PoolIdSqrtBeta = 'poolId__sqrtBeta',
  PoolIdStrategyType = 'poolId__strategyType',
  PoolIdSwapEnabled = 'poolId__swapEnabled',
  PoolIdSwapFee = 'poolId__swapFee',
  PoolIdSwapsCount = 'poolId__swapsCount',
  PoolIdSymbol = 'poolId__symbol',
  PoolIdTauAlphaX = 'poolId__tauAlphaX',
  PoolIdTauAlphaY = 'poolId__tauAlphaY',
  PoolIdTauBetaX = 'poolId__tauBetaX',
  PoolIdTauBetaY = 'poolId__tauBetaY',
  PoolIdTotalAumFeeCollectedInBpt = 'poolId__totalAumFeeCollectedInBPT',
  PoolIdTotalLiquidity = 'poolId__totalLiquidity',
  PoolIdTotalProtocolFee = 'poolId__totalProtocolFee',
  PoolIdTotalProtocolFeePaidInBpt = 'poolId__totalProtocolFeePaidInBPT',
  PoolIdTotalShares = 'poolId__totalShares',
  PoolIdTotalSwapFee = 'poolId__totalSwapFee',
  PoolIdTotalSwapVolume = 'poolId__totalSwapVolume',
  PoolIdTotalWeight = 'poolId__totalWeight',
  PoolIdTx = 'poolId__tx',
  PoolIdU = 'poolId__u',
  PoolIdUnitSeconds = 'poolId__unitSeconds',
  PoolIdUpperTarget = 'poolId__upperTarget',
  PoolIdV = 'poolId__v',
  PoolIdW = 'poolId__w',
  PoolIdWrappedIndex = 'poolId__wrappedIndex',
  PoolIdZ = 'poolId__z',
  PoolLiquidity = 'poolLiquidity',
  PoolShareValue = 'poolShareValue',
  PoolTotalShares = 'poolTotalShares',
  PricingAsset = 'pricingAsset',
}

export type PoolShare = {
  __typename?: 'PoolShare';
  balance: Scalars['BigDecimal'];
  id: Scalars['ID'];
  poolId: Pool;
  userAddress: User;
};

export type PoolShare_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<PoolShare_Filter>>>;
  balance: InputMaybe<Scalars['BigDecimal']>;
  balance_gt: InputMaybe<Scalars['BigDecimal']>;
  balance_gte: InputMaybe<Scalars['BigDecimal']>;
  balance_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  balance_lt: InputMaybe<Scalars['BigDecimal']>;
  balance_lte: InputMaybe<Scalars['BigDecimal']>;
  balance_not: InputMaybe<Scalars['BigDecimal']>;
  balance_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  id: InputMaybe<Scalars['ID']>;
  id_gt: InputMaybe<Scalars['ID']>;
  id_gte: InputMaybe<Scalars['ID']>;
  id_in: InputMaybe<Array<Scalars['ID']>>;
  id_lt: InputMaybe<Scalars['ID']>;
  id_lte: InputMaybe<Scalars['ID']>;
  id_not: InputMaybe<Scalars['ID']>;
  id_not_in: InputMaybe<Array<Scalars['ID']>>;
  or: InputMaybe<Array<InputMaybe<PoolShare_Filter>>>;
  poolId: InputMaybe<Scalars['String']>;
  poolId_: InputMaybe<Pool_Filter>;
  poolId_contains: InputMaybe<Scalars['String']>;
  poolId_contains_nocase: InputMaybe<Scalars['String']>;
  poolId_ends_with: InputMaybe<Scalars['String']>;
  poolId_ends_with_nocase: InputMaybe<Scalars['String']>;
  poolId_gt: InputMaybe<Scalars['String']>;
  poolId_gte: InputMaybe<Scalars['String']>;
  poolId_in: InputMaybe<Array<Scalars['String']>>;
  poolId_lt: InputMaybe<Scalars['String']>;
  poolId_lte: InputMaybe<Scalars['String']>;
  poolId_not: InputMaybe<Scalars['String']>;
  poolId_not_contains: InputMaybe<Scalars['String']>;
  poolId_not_contains_nocase: InputMaybe<Scalars['String']>;
  poolId_not_ends_with: InputMaybe<Scalars['String']>;
  poolId_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  poolId_not_in: InputMaybe<Array<Scalars['String']>>;
  poolId_not_starts_with: InputMaybe<Scalars['String']>;
  poolId_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  poolId_starts_with: InputMaybe<Scalars['String']>;
  poolId_starts_with_nocase: InputMaybe<Scalars['String']>;
  userAddress: InputMaybe<Scalars['String']>;
  userAddress_: InputMaybe<User_Filter>;
  userAddress_contains: InputMaybe<Scalars['String']>;
  userAddress_contains_nocase: InputMaybe<Scalars['String']>;
  userAddress_ends_with: InputMaybe<Scalars['String']>;
  userAddress_ends_with_nocase: InputMaybe<Scalars['String']>;
  userAddress_gt: InputMaybe<Scalars['String']>;
  userAddress_gte: InputMaybe<Scalars['String']>;
  userAddress_in: InputMaybe<Array<Scalars['String']>>;
  userAddress_lt: InputMaybe<Scalars['String']>;
  userAddress_lte: InputMaybe<Scalars['String']>;
  userAddress_not: InputMaybe<Scalars['String']>;
  userAddress_not_contains: InputMaybe<Scalars['String']>;
  userAddress_not_contains_nocase: InputMaybe<Scalars['String']>;
  userAddress_not_ends_with: InputMaybe<Scalars['String']>;
  userAddress_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  userAddress_not_in: InputMaybe<Array<Scalars['String']>>;
  userAddress_not_starts_with: InputMaybe<Scalars['String']>;
  userAddress_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  userAddress_starts_with: InputMaybe<Scalars['String']>;
  userAddress_starts_with_nocase: InputMaybe<Scalars['String']>;
};

export enum PoolShare_OrderBy {
  Balance = 'balance',
  Id = 'id',
  PoolId = 'poolId',
  PoolIdAddress = 'poolId__address',
  PoolIdAlpha = 'poolId__alpha',
  PoolIdAmp = 'poolId__amp',
  PoolIdBaseToken = 'poolId__baseToken',
  PoolIdBeta = 'poolId__beta',
  PoolIdC = 'poolId__c',
  PoolIdCreateTime = 'poolId__createTime',
  PoolIdDSq = 'poolId__dSq',
  PoolIdDelta = 'poolId__delta',
  PoolIdEpsilon = 'poolId__epsilon',
  PoolIdExpiryTime = 'poolId__expiryTime',
  PoolIdFactory = 'poolId__factory',
  PoolIdHoldersCount = 'poolId__holdersCount',
  PoolIdId = 'poolId__id',
  PoolIdIsInRecoveryMode = 'poolId__isInRecoveryMode',
  PoolIdIsPaused = 'poolId__isPaused',
  PoolIdJoinExitEnabled = 'poolId__joinExitEnabled',
  PoolIdLambda = 'poolId__lambda',
  PoolIdLastJoinExitAmp = 'poolId__lastJoinExitAmp',
  PoolIdLastPostJoinExitInvariant = 'poolId__lastPostJoinExitInvariant',
  PoolIdLowerTarget = 'poolId__lowerTarget',
  PoolIdMainIndex = 'poolId__mainIndex',
  PoolIdManagementAumFee = 'poolId__managementAumFee',
  PoolIdManagementFee = 'poolId__managementFee',
  PoolIdMustAllowlistLPs = 'poolId__mustAllowlistLPs',
  PoolIdName = 'poolId__name',
  PoolIdOracleEnabled = 'poolId__oracleEnabled',
  PoolIdOwner = 'poolId__owner',
  PoolIdPoolType = 'poolId__poolType',
  PoolIdPoolTypeVersion = 'poolId__poolTypeVersion',
  PoolIdPrincipalToken = 'poolId__principalToken',
  PoolIdProtocolAumFeeCache = 'poolId__protocolAumFeeCache',
  PoolIdProtocolId = 'poolId__protocolId',
  PoolIdProtocolSwapFeeCache = 'poolId__protocolSwapFeeCache',
  PoolIdProtocolYieldFeeCache = 'poolId__protocolYieldFeeCache',
  PoolIdRoot3Alpha = 'poolId__root3Alpha',
  PoolIdS = 'poolId__s',
  PoolIdSqrtAlpha = 'poolId__sqrtAlpha',
  PoolIdSqrtBeta = 'poolId__sqrtBeta',
  PoolIdStrategyType = 'poolId__strategyType',
  PoolIdSwapEnabled = 'poolId__swapEnabled',
  PoolIdSwapFee = 'poolId__swapFee',
  PoolIdSwapsCount = 'poolId__swapsCount',
  PoolIdSymbol = 'poolId__symbol',
  PoolIdTauAlphaX = 'poolId__tauAlphaX',
  PoolIdTauAlphaY = 'poolId__tauAlphaY',
  PoolIdTauBetaX = 'poolId__tauBetaX',
  PoolIdTauBetaY = 'poolId__tauBetaY',
  PoolIdTotalAumFeeCollectedInBpt = 'poolId__totalAumFeeCollectedInBPT',
  PoolIdTotalLiquidity = 'poolId__totalLiquidity',
  PoolIdTotalProtocolFee = 'poolId__totalProtocolFee',
  PoolIdTotalProtocolFeePaidInBpt = 'poolId__totalProtocolFeePaidInBPT',
  PoolIdTotalShares = 'poolId__totalShares',
  PoolIdTotalSwapFee = 'poolId__totalSwapFee',
  PoolIdTotalSwapVolume = 'poolId__totalSwapVolume',
  PoolIdTotalWeight = 'poolId__totalWeight',
  PoolIdTx = 'poolId__tx',
  PoolIdU = 'poolId__u',
  PoolIdUnitSeconds = 'poolId__unitSeconds',
  PoolIdUpperTarget = 'poolId__upperTarget',
  PoolIdV = 'poolId__v',
  PoolIdW = 'poolId__w',
  PoolIdWrappedIndex = 'poolId__wrappedIndex',
  PoolIdZ = 'poolId__z',
  UserAddress = 'userAddress',
  UserAddressId = 'userAddress__id',
}

export type PoolSnapshot = {
  __typename?: 'PoolSnapshot';
  amounts: Array<Scalars['BigDecimal']>;
  holdersCount: Scalars['BigInt'];
  id: Scalars['ID'];
  liquidity: Scalars['BigDecimal'];
  pool: Pool;
  protocolFee: Maybe<Scalars['BigDecimal']>;
  swapFees: Scalars['BigDecimal'];
  swapVolume: Scalars['BigDecimal'];
  swapsCount: Scalars['BigInt'];
  timestamp: Scalars['Int'];
  totalShares: Scalars['BigDecimal'];
};

export type PoolSnapshot_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  amounts: InputMaybe<Array<Scalars['BigDecimal']>>;
  amounts_contains: InputMaybe<Array<Scalars['BigDecimal']>>;
  amounts_contains_nocase: InputMaybe<Array<Scalars['BigDecimal']>>;
  amounts_not: InputMaybe<Array<Scalars['BigDecimal']>>;
  amounts_not_contains: InputMaybe<Array<Scalars['BigDecimal']>>;
  amounts_not_contains_nocase: InputMaybe<Array<Scalars['BigDecimal']>>;
  and: InputMaybe<Array<InputMaybe<PoolSnapshot_Filter>>>;
  holdersCount: InputMaybe<Scalars['BigInt']>;
  holdersCount_gt: InputMaybe<Scalars['BigInt']>;
  holdersCount_gte: InputMaybe<Scalars['BigInt']>;
  holdersCount_in: InputMaybe<Array<Scalars['BigInt']>>;
  holdersCount_lt: InputMaybe<Scalars['BigInt']>;
  holdersCount_lte: InputMaybe<Scalars['BigInt']>;
  holdersCount_not: InputMaybe<Scalars['BigInt']>;
  holdersCount_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  id: InputMaybe<Scalars['ID']>;
  id_gt: InputMaybe<Scalars['ID']>;
  id_gte: InputMaybe<Scalars['ID']>;
  id_in: InputMaybe<Array<Scalars['ID']>>;
  id_lt: InputMaybe<Scalars['ID']>;
  id_lte: InputMaybe<Scalars['ID']>;
  id_not: InputMaybe<Scalars['ID']>;
  id_not_in: InputMaybe<Array<Scalars['ID']>>;
  liquidity: InputMaybe<Scalars['BigDecimal']>;
  liquidity_gt: InputMaybe<Scalars['BigDecimal']>;
  liquidity_gte: InputMaybe<Scalars['BigDecimal']>;
  liquidity_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  liquidity_lt: InputMaybe<Scalars['BigDecimal']>;
  liquidity_lte: InputMaybe<Scalars['BigDecimal']>;
  liquidity_not: InputMaybe<Scalars['BigDecimal']>;
  liquidity_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  or: InputMaybe<Array<InputMaybe<PoolSnapshot_Filter>>>;
  pool: InputMaybe<Scalars['String']>;
  pool_: InputMaybe<Pool_Filter>;
  pool_contains: InputMaybe<Scalars['String']>;
  pool_contains_nocase: InputMaybe<Scalars['String']>;
  pool_ends_with: InputMaybe<Scalars['String']>;
  pool_ends_with_nocase: InputMaybe<Scalars['String']>;
  pool_gt: InputMaybe<Scalars['String']>;
  pool_gte: InputMaybe<Scalars['String']>;
  pool_in: InputMaybe<Array<Scalars['String']>>;
  pool_lt: InputMaybe<Scalars['String']>;
  pool_lte: InputMaybe<Scalars['String']>;
  pool_not: InputMaybe<Scalars['String']>;
  pool_not_contains: InputMaybe<Scalars['String']>;
  pool_not_contains_nocase: InputMaybe<Scalars['String']>;
  pool_not_ends_with: InputMaybe<Scalars['String']>;
  pool_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  pool_not_in: InputMaybe<Array<Scalars['String']>>;
  pool_not_starts_with: InputMaybe<Scalars['String']>;
  pool_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  pool_starts_with: InputMaybe<Scalars['String']>;
  pool_starts_with_nocase: InputMaybe<Scalars['String']>;
  protocolFee: InputMaybe<Scalars['BigDecimal']>;
  protocolFee_gt: InputMaybe<Scalars['BigDecimal']>;
  protocolFee_gte: InputMaybe<Scalars['BigDecimal']>;
  protocolFee_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  protocolFee_lt: InputMaybe<Scalars['BigDecimal']>;
  protocolFee_lte: InputMaybe<Scalars['BigDecimal']>;
  protocolFee_not: InputMaybe<Scalars['BigDecimal']>;
  protocolFee_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  swapFees: InputMaybe<Scalars['BigDecimal']>;
  swapFees_gt: InputMaybe<Scalars['BigDecimal']>;
  swapFees_gte: InputMaybe<Scalars['BigDecimal']>;
  swapFees_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  swapFees_lt: InputMaybe<Scalars['BigDecimal']>;
  swapFees_lte: InputMaybe<Scalars['BigDecimal']>;
  swapFees_not: InputMaybe<Scalars['BigDecimal']>;
  swapFees_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  swapVolume: InputMaybe<Scalars['BigDecimal']>;
  swapVolume_gt: InputMaybe<Scalars['BigDecimal']>;
  swapVolume_gte: InputMaybe<Scalars['BigDecimal']>;
  swapVolume_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  swapVolume_lt: InputMaybe<Scalars['BigDecimal']>;
  swapVolume_lte: InputMaybe<Scalars['BigDecimal']>;
  swapVolume_not: InputMaybe<Scalars['BigDecimal']>;
  swapVolume_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  swapsCount: InputMaybe<Scalars['BigInt']>;
  swapsCount_gt: InputMaybe<Scalars['BigInt']>;
  swapsCount_gte: InputMaybe<Scalars['BigInt']>;
  swapsCount_in: InputMaybe<Array<Scalars['BigInt']>>;
  swapsCount_lt: InputMaybe<Scalars['BigInt']>;
  swapsCount_lte: InputMaybe<Scalars['BigInt']>;
  swapsCount_not: InputMaybe<Scalars['BigInt']>;
  swapsCount_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp: InputMaybe<Scalars['Int']>;
  timestamp_gt: InputMaybe<Scalars['Int']>;
  timestamp_gte: InputMaybe<Scalars['Int']>;
  timestamp_in: InputMaybe<Array<Scalars['Int']>>;
  timestamp_lt: InputMaybe<Scalars['Int']>;
  timestamp_lte: InputMaybe<Scalars['Int']>;
  timestamp_not: InputMaybe<Scalars['Int']>;
  timestamp_not_in: InputMaybe<Array<Scalars['Int']>>;
  totalShares: InputMaybe<Scalars['BigDecimal']>;
  totalShares_gt: InputMaybe<Scalars['BigDecimal']>;
  totalShares_gte: InputMaybe<Scalars['BigDecimal']>;
  totalShares_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalShares_lt: InputMaybe<Scalars['BigDecimal']>;
  totalShares_lte: InputMaybe<Scalars['BigDecimal']>;
  totalShares_not: InputMaybe<Scalars['BigDecimal']>;
  totalShares_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export enum PoolSnapshot_OrderBy {
  Amounts = 'amounts',
  HoldersCount = 'holdersCount',
  Id = 'id',
  Liquidity = 'liquidity',
  Pool = 'pool',
  PoolAddress = 'pool__address',
  PoolAlpha = 'pool__alpha',
  PoolAmp = 'pool__amp',
  PoolBaseToken = 'pool__baseToken',
  PoolBeta = 'pool__beta',
  PoolC = 'pool__c',
  PoolCreateTime = 'pool__createTime',
  PoolDSq = 'pool__dSq',
  PoolDelta = 'pool__delta',
  PoolEpsilon = 'pool__epsilon',
  PoolExpiryTime = 'pool__expiryTime',
  PoolFactory = 'pool__factory',
  PoolHoldersCount = 'pool__holdersCount',
  PoolId = 'pool__id',
  PoolIsInRecoveryMode = 'pool__isInRecoveryMode',
  PoolIsPaused = 'pool__isPaused',
  PoolJoinExitEnabled = 'pool__joinExitEnabled',
  PoolLambda = 'pool__lambda',
  PoolLastJoinExitAmp = 'pool__lastJoinExitAmp',
  PoolLastPostJoinExitInvariant = 'pool__lastPostJoinExitInvariant',
  PoolLowerTarget = 'pool__lowerTarget',
  PoolMainIndex = 'pool__mainIndex',
  PoolManagementAumFee = 'pool__managementAumFee',
  PoolManagementFee = 'pool__managementFee',
  PoolMustAllowlistLPs = 'pool__mustAllowlistLPs',
  PoolName = 'pool__name',
  PoolOracleEnabled = 'pool__oracleEnabled',
  PoolOwner = 'pool__owner',
  PoolPoolType = 'pool__poolType',
  PoolPoolTypeVersion = 'pool__poolTypeVersion',
  PoolPrincipalToken = 'pool__principalToken',
  PoolProtocolAumFeeCache = 'pool__protocolAumFeeCache',
  PoolProtocolId = 'pool__protocolId',
  PoolProtocolSwapFeeCache = 'pool__protocolSwapFeeCache',
  PoolProtocolYieldFeeCache = 'pool__protocolYieldFeeCache',
  PoolRoot3Alpha = 'pool__root3Alpha',
  PoolS = 'pool__s',
  PoolSqrtAlpha = 'pool__sqrtAlpha',
  PoolSqrtBeta = 'pool__sqrtBeta',
  PoolStrategyType = 'pool__strategyType',
  PoolSwapEnabled = 'pool__swapEnabled',
  PoolSwapFee = 'pool__swapFee',
  PoolSwapsCount = 'pool__swapsCount',
  PoolSymbol = 'pool__symbol',
  PoolTauAlphaX = 'pool__tauAlphaX',
  PoolTauAlphaY = 'pool__tauAlphaY',
  PoolTauBetaX = 'pool__tauBetaX',
  PoolTauBetaY = 'pool__tauBetaY',
  PoolTotalAumFeeCollectedInBpt = 'pool__totalAumFeeCollectedInBPT',
  PoolTotalLiquidity = 'pool__totalLiquidity',
  PoolTotalProtocolFee = 'pool__totalProtocolFee',
  PoolTotalProtocolFeePaidInBpt = 'pool__totalProtocolFeePaidInBPT',
  PoolTotalShares = 'pool__totalShares',
  PoolTotalSwapFee = 'pool__totalSwapFee',
  PoolTotalSwapVolume = 'pool__totalSwapVolume',
  PoolTotalWeight = 'pool__totalWeight',
  PoolTx = 'pool__tx',
  PoolU = 'pool__u',
  PoolUnitSeconds = 'pool__unitSeconds',
  PoolUpperTarget = 'pool__upperTarget',
  PoolV = 'pool__v',
  PoolW = 'pool__w',
  PoolWrappedIndex = 'pool__wrappedIndex',
  PoolZ = 'pool__z',
  ProtocolFee = 'protocolFee',
  SwapFees = 'swapFees',
  SwapVolume = 'swapVolume',
  SwapsCount = 'swapsCount',
  Timestamp = 'timestamp',
  TotalShares = 'totalShares',
}

export type PoolToken = {
  __typename?: 'PoolToken';
  address: Scalars['String'];
  assetManager: Scalars['Bytes'];
  balance: Scalars['BigDecimal'];
  cashBalance: Scalars['BigDecimal'];
  circuitBreaker: Maybe<CircuitBreaker>;
  decimals: Scalars['Int'];
  id: Scalars['ID'];
  index: Maybe<Scalars['Int']>;
  isExemptFromYieldProtocolFee: Maybe<Scalars['Boolean']>;
  managedBalance: Scalars['BigDecimal'];
  managements: Maybe<Array<ManagementOperation>>;
  name: Scalars['String'];
  oldPriceRate: Maybe<Scalars['BigDecimal']>;
  paidProtocolFees: Maybe<Scalars['BigDecimal']>;
  poolId: Maybe<Pool>;
  priceRate: Scalars['BigDecimal'];
  symbol: Scalars['String'];
  token: Token;
  weight: Maybe<Scalars['BigDecimal']>;
};

export type PoolTokenManagementsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<ManagementOperation_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<ManagementOperation_Filter>;
};

export type PoolToken_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  address: InputMaybe<Scalars['String']>;
  address_contains: InputMaybe<Scalars['String']>;
  address_contains_nocase: InputMaybe<Scalars['String']>;
  address_ends_with: InputMaybe<Scalars['String']>;
  address_ends_with_nocase: InputMaybe<Scalars['String']>;
  address_gt: InputMaybe<Scalars['String']>;
  address_gte: InputMaybe<Scalars['String']>;
  address_in: InputMaybe<Array<Scalars['String']>>;
  address_lt: InputMaybe<Scalars['String']>;
  address_lte: InputMaybe<Scalars['String']>;
  address_not: InputMaybe<Scalars['String']>;
  address_not_contains: InputMaybe<Scalars['String']>;
  address_not_contains_nocase: InputMaybe<Scalars['String']>;
  address_not_ends_with: InputMaybe<Scalars['String']>;
  address_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  address_not_in: InputMaybe<Array<Scalars['String']>>;
  address_not_starts_with: InputMaybe<Scalars['String']>;
  address_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  address_starts_with: InputMaybe<Scalars['String']>;
  address_starts_with_nocase: InputMaybe<Scalars['String']>;
  and: InputMaybe<Array<InputMaybe<PoolToken_Filter>>>;
  assetManager: InputMaybe<Scalars['Bytes']>;
  assetManager_contains: InputMaybe<Scalars['Bytes']>;
  assetManager_gt: InputMaybe<Scalars['Bytes']>;
  assetManager_gte: InputMaybe<Scalars['Bytes']>;
  assetManager_in: InputMaybe<Array<Scalars['Bytes']>>;
  assetManager_lt: InputMaybe<Scalars['Bytes']>;
  assetManager_lte: InputMaybe<Scalars['Bytes']>;
  assetManager_not: InputMaybe<Scalars['Bytes']>;
  assetManager_not_contains: InputMaybe<Scalars['Bytes']>;
  assetManager_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  balance: InputMaybe<Scalars['BigDecimal']>;
  balance_gt: InputMaybe<Scalars['BigDecimal']>;
  balance_gte: InputMaybe<Scalars['BigDecimal']>;
  balance_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  balance_lt: InputMaybe<Scalars['BigDecimal']>;
  balance_lte: InputMaybe<Scalars['BigDecimal']>;
  balance_not: InputMaybe<Scalars['BigDecimal']>;
  balance_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  cashBalance: InputMaybe<Scalars['BigDecimal']>;
  cashBalance_gt: InputMaybe<Scalars['BigDecimal']>;
  cashBalance_gte: InputMaybe<Scalars['BigDecimal']>;
  cashBalance_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  cashBalance_lt: InputMaybe<Scalars['BigDecimal']>;
  cashBalance_lte: InputMaybe<Scalars['BigDecimal']>;
  cashBalance_not: InputMaybe<Scalars['BigDecimal']>;
  cashBalance_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  circuitBreaker: InputMaybe<Scalars['String']>;
  circuitBreaker_: InputMaybe<CircuitBreaker_Filter>;
  circuitBreaker_contains: InputMaybe<Scalars['String']>;
  circuitBreaker_contains_nocase: InputMaybe<Scalars['String']>;
  circuitBreaker_ends_with: InputMaybe<Scalars['String']>;
  circuitBreaker_ends_with_nocase: InputMaybe<Scalars['String']>;
  circuitBreaker_gt: InputMaybe<Scalars['String']>;
  circuitBreaker_gte: InputMaybe<Scalars['String']>;
  circuitBreaker_in: InputMaybe<Array<Scalars['String']>>;
  circuitBreaker_lt: InputMaybe<Scalars['String']>;
  circuitBreaker_lte: InputMaybe<Scalars['String']>;
  circuitBreaker_not: InputMaybe<Scalars['String']>;
  circuitBreaker_not_contains: InputMaybe<Scalars['String']>;
  circuitBreaker_not_contains_nocase: InputMaybe<Scalars['String']>;
  circuitBreaker_not_ends_with: InputMaybe<Scalars['String']>;
  circuitBreaker_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  circuitBreaker_not_in: InputMaybe<Array<Scalars['String']>>;
  circuitBreaker_not_starts_with: InputMaybe<Scalars['String']>;
  circuitBreaker_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  circuitBreaker_starts_with: InputMaybe<Scalars['String']>;
  circuitBreaker_starts_with_nocase: InputMaybe<Scalars['String']>;
  decimals: InputMaybe<Scalars['Int']>;
  decimals_gt: InputMaybe<Scalars['Int']>;
  decimals_gte: InputMaybe<Scalars['Int']>;
  decimals_in: InputMaybe<Array<Scalars['Int']>>;
  decimals_lt: InputMaybe<Scalars['Int']>;
  decimals_lte: InputMaybe<Scalars['Int']>;
  decimals_not: InputMaybe<Scalars['Int']>;
  decimals_not_in: InputMaybe<Array<Scalars['Int']>>;
  id: InputMaybe<Scalars['ID']>;
  id_gt: InputMaybe<Scalars['ID']>;
  id_gte: InputMaybe<Scalars['ID']>;
  id_in: InputMaybe<Array<Scalars['ID']>>;
  id_lt: InputMaybe<Scalars['ID']>;
  id_lte: InputMaybe<Scalars['ID']>;
  id_not: InputMaybe<Scalars['ID']>;
  id_not_in: InputMaybe<Array<Scalars['ID']>>;
  index: InputMaybe<Scalars['Int']>;
  index_gt: InputMaybe<Scalars['Int']>;
  index_gte: InputMaybe<Scalars['Int']>;
  index_in: InputMaybe<Array<Scalars['Int']>>;
  index_lt: InputMaybe<Scalars['Int']>;
  index_lte: InputMaybe<Scalars['Int']>;
  index_not: InputMaybe<Scalars['Int']>;
  index_not_in: InputMaybe<Array<Scalars['Int']>>;
  isExemptFromYieldProtocolFee: InputMaybe<Scalars['Boolean']>;
  isExemptFromYieldProtocolFee_in: InputMaybe<Array<Scalars['Boolean']>>;
  isExemptFromYieldProtocolFee_not: InputMaybe<Scalars['Boolean']>;
  isExemptFromYieldProtocolFee_not_in: InputMaybe<Array<Scalars['Boolean']>>;
  managedBalance: InputMaybe<Scalars['BigDecimal']>;
  managedBalance_gt: InputMaybe<Scalars['BigDecimal']>;
  managedBalance_gte: InputMaybe<Scalars['BigDecimal']>;
  managedBalance_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  managedBalance_lt: InputMaybe<Scalars['BigDecimal']>;
  managedBalance_lte: InputMaybe<Scalars['BigDecimal']>;
  managedBalance_not: InputMaybe<Scalars['BigDecimal']>;
  managedBalance_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  managements_: InputMaybe<ManagementOperation_Filter>;
  name: InputMaybe<Scalars['String']>;
  name_contains: InputMaybe<Scalars['String']>;
  name_contains_nocase: InputMaybe<Scalars['String']>;
  name_ends_with: InputMaybe<Scalars['String']>;
  name_ends_with_nocase: InputMaybe<Scalars['String']>;
  name_gt: InputMaybe<Scalars['String']>;
  name_gte: InputMaybe<Scalars['String']>;
  name_in: InputMaybe<Array<Scalars['String']>>;
  name_lt: InputMaybe<Scalars['String']>;
  name_lte: InputMaybe<Scalars['String']>;
  name_not: InputMaybe<Scalars['String']>;
  name_not_contains: InputMaybe<Scalars['String']>;
  name_not_contains_nocase: InputMaybe<Scalars['String']>;
  name_not_ends_with: InputMaybe<Scalars['String']>;
  name_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  name_not_in: InputMaybe<Array<Scalars['String']>>;
  name_not_starts_with: InputMaybe<Scalars['String']>;
  name_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  name_starts_with: InputMaybe<Scalars['String']>;
  name_starts_with_nocase: InputMaybe<Scalars['String']>;
  oldPriceRate: InputMaybe<Scalars['BigDecimal']>;
  oldPriceRate_gt: InputMaybe<Scalars['BigDecimal']>;
  oldPriceRate_gte: InputMaybe<Scalars['BigDecimal']>;
  oldPriceRate_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  oldPriceRate_lt: InputMaybe<Scalars['BigDecimal']>;
  oldPriceRate_lte: InputMaybe<Scalars['BigDecimal']>;
  oldPriceRate_not: InputMaybe<Scalars['BigDecimal']>;
  oldPriceRate_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  or: InputMaybe<Array<InputMaybe<PoolToken_Filter>>>;
  paidProtocolFees: InputMaybe<Scalars['BigDecimal']>;
  paidProtocolFees_gt: InputMaybe<Scalars['BigDecimal']>;
  paidProtocolFees_gte: InputMaybe<Scalars['BigDecimal']>;
  paidProtocolFees_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  paidProtocolFees_lt: InputMaybe<Scalars['BigDecimal']>;
  paidProtocolFees_lte: InputMaybe<Scalars['BigDecimal']>;
  paidProtocolFees_not: InputMaybe<Scalars['BigDecimal']>;
  paidProtocolFees_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  poolId: InputMaybe<Scalars['String']>;
  poolId_: InputMaybe<Pool_Filter>;
  poolId_contains: InputMaybe<Scalars['String']>;
  poolId_contains_nocase: InputMaybe<Scalars['String']>;
  poolId_ends_with: InputMaybe<Scalars['String']>;
  poolId_ends_with_nocase: InputMaybe<Scalars['String']>;
  poolId_gt: InputMaybe<Scalars['String']>;
  poolId_gte: InputMaybe<Scalars['String']>;
  poolId_in: InputMaybe<Array<Scalars['String']>>;
  poolId_lt: InputMaybe<Scalars['String']>;
  poolId_lte: InputMaybe<Scalars['String']>;
  poolId_not: InputMaybe<Scalars['String']>;
  poolId_not_contains: InputMaybe<Scalars['String']>;
  poolId_not_contains_nocase: InputMaybe<Scalars['String']>;
  poolId_not_ends_with: InputMaybe<Scalars['String']>;
  poolId_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  poolId_not_in: InputMaybe<Array<Scalars['String']>>;
  poolId_not_starts_with: InputMaybe<Scalars['String']>;
  poolId_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  poolId_starts_with: InputMaybe<Scalars['String']>;
  poolId_starts_with_nocase: InputMaybe<Scalars['String']>;
  priceRate: InputMaybe<Scalars['BigDecimal']>;
  priceRate_gt: InputMaybe<Scalars['BigDecimal']>;
  priceRate_gte: InputMaybe<Scalars['BigDecimal']>;
  priceRate_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  priceRate_lt: InputMaybe<Scalars['BigDecimal']>;
  priceRate_lte: InputMaybe<Scalars['BigDecimal']>;
  priceRate_not: InputMaybe<Scalars['BigDecimal']>;
  priceRate_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  symbol: InputMaybe<Scalars['String']>;
  symbol_contains: InputMaybe<Scalars['String']>;
  symbol_contains_nocase: InputMaybe<Scalars['String']>;
  symbol_ends_with: InputMaybe<Scalars['String']>;
  symbol_ends_with_nocase: InputMaybe<Scalars['String']>;
  symbol_gt: InputMaybe<Scalars['String']>;
  symbol_gte: InputMaybe<Scalars['String']>;
  symbol_in: InputMaybe<Array<Scalars['String']>>;
  symbol_lt: InputMaybe<Scalars['String']>;
  symbol_lte: InputMaybe<Scalars['String']>;
  symbol_not: InputMaybe<Scalars['String']>;
  symbol_not_contains: InputMaybe<Scalars['String']>;
  symbol_not_contains_nocase: InputMaybe<Scalars['String']>;
  symbol_not_ends_with: InputMaybe<Scalars['String']>;
  symbol_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  symbol_not_in: InputMaybe<Array<Scalars['String']>>;
  symbol_not_starts_with: InputMaybe<Scalars['String']>;
  symbol_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  symbol_starts_with: InputMaybe<Scalars['String']>;
  symbol_starts_with_nocase: InputMaybe<Scalars['String']>;
  token: InputMaybe<Scalars['String']>;
  token_: InputMaybe<Token_Filter>;
  token_contains: InputMaybe<Scalars['String']>;
  token_contains_nocase: InputMaybe<Scalars['String']>;
  token_ends_with: InputMaybe<Scalars['String']>;
  token_ends_with_nocase: InputMaybe<Scalars['String']>;
  token_gt: InputMaybe<Scalars['String']>;
  token_gte: InputMaybe<Scalars['String']>;
  token_in: InputMaybe<Array<Scalars['String']>>;
  token_lt: InputMaybe<Scalars['String']>;
  token_lte: InputMaybe<Scalars['String']>;
  token_not: InputMaybe<Scalars['String']>;
  token_not_contains: InputMaybe<Scalars['String']>;
  token_not_contains_nocase: InputMaybe<Scalars['String']>;
  token_not_ends_with: InputMaybe<Scalars['String']>;
  token_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  token_not_in: InputMaybe<Array<Scalars['String']>>;
  token_not_starts_with: InputMaybe<Scalars['String']>;
  token_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  token_starts_with: InputMaybe<Scalars['String']>;
  token_starts_with_nocase: InputMaybe<Scalars['String']>;
  weight: InputMaybe<Scalars['BigDecimal']>;
  weight_gt: InputMaybe<Scalars['BigDecimal']>;
  weight_gte: InputMaybe<Scalars['BigDecimal']>;
  weight_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  weight_lt: InputMaybe<Scalars['BigDecimal']>;
  weight_lte: InputMaybe<Scalars['BigDecimal']>;
  weight_not: InputMaybe<Scalars['BigDecimal']>;
  weight_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export enum PoolToken_OrderBy {
  Address = 'address',
  AssetManager = 'assetManager',
  Balance = 'balance',
  CashBalance = 'cashBalance',
  CircuitBreaker = 'circuitBreaker',
  CircuitBreakerBptPrice = 'circuitBreaker__bptPrice',
  CircuitBreakerId = 'circuitBreaker__id',
  CircuitBreakerLowerBoundPercentage = 'circuitBreaker__lowerBoundPercentage',
  CircuitBreakerUpperBoundPercentage = 'circuitBreaker__upperBoundPercentage',
  Decimals = 'decimals',
  Id = 'id',
  Index = 'index',
  IsExemptFromYieldProtocolFee = 'isExemptFromYieldProtocolFee',
  ManagedBalance = 'managedBalance',
  Managements = 'managements',
  Name = 'name',
  OldPriceRate = 'oldPriceRate',
  PaidProtocolFees = 'paidProtocolFees',
  PoolId = 'poolId',
  PoolIdAddress = 'poolId__address',
  PoolIdAlpha = 'poolId__alpha',
  PoolIdAmp = 'poolId__amp',
  PoolIdBaseToken = 'poolId__baseToken',
  PoolIdBeta = 'poolId__beta',
  PoolIdC = 'poolId__c',
  PoolIdCreateTime = 'poolId__createTime',
  PoolIdDSq = 'poolId__dSq',
  PoolIdDelta = 'poolId__delta',
  PoolIdEpsilon = 'poolId__epsilon',
  PoolIdExpiryTime = 'poolId__expiryTime',
  PoolIdFactory = 'poolId__factory',
  PoolIdHoldersCount = 'poolId__holdersCount',
  PoolIdId = 'poolId__id',
  PoolIdIsInRecoveryMode = 'poolId__isInRecoveryMode',
  PoolIdIsPaused = 'poolId__isPaused',
  PoolIdJoinExitEnabled = 'poolId__joinExitEnabled',
  PoolIdLambda = 'poolId__lambda',
  PoolIdLastJoinExitAmp = 'poolId__lastJoinExitAmp',
  PoolIdLastPostJoinExitInvariant = 'poolId__lastPostJoinExitInvariant',
  PoolIdLowerTarget = 'poolId__lowerTarget',
  PoolIdMainIndex = 'poolId__mainIndex',
  PoolIdManagementAumFee = 'poolId__managementAumFee',
  PoolIdManagementFee = 'poolId__managementFee',
  PoolIdMustAllowlistLPs = 'poolId__mustAllowlistLPs',
  PoolIdName = 'poolId__name',
  PoolIdOracleEnabled = 'poolId__oracleEnabled',
  PoolIdOwner = 'poolId__owner',
  PoolIdPoolType = 'poolId__poolType',
  PoolIdPoolTypeVersion = 'poolId__poolTypeVersion',
  PoolIdPrincipalToken = 'poolId__principalToken',
  PoolIdProtocolAumFeeCache = 'poolId__protocolAumFeeCache',
  PoolIdProtocolId = 'poolId__protocolId',
  PoolIdProtocolSwapFeeCache = 'poolId__protocolSwapFeeCache',
  PoolIdProtocolYieldFeeCache = 'poolId__protocolYieldFeeCache',
  PoolIdRoot3Alpha = 'poolId__root3Alpha',
  PoolIdS = 'poolId__s',
  PoolIdSqrtAlpha = 'poolId__sqrtAlpha',
  PoolIdSqrtBeta = 'poolId__sqrtBeta',
  PoolIdStrategyType = 'poolId__strategyType',
  PoolIdSwapEnabled = 'poolId__swapEnabled',
  PoolIdSwapFee = 'poolId__swapFee',
  PoolIdSwapsCount = 'poolId__swapsCount',
  PoolIdSymbol = 'poolId__symbol',
  PoolIdTauAlphaX = 'poolId__tauAlphaX',
  PoolIdTauAlphaY = 'poolId__tauAlphaY',
  PoolIdTauBetaX = 'poolId__tauBetaX',
  PoolIdTauBetaY = 'poolId__tauBetaY',
  PoolIdTotalAumFeeCollectedInBpt = 'poolId__totalAumFeeCollectedInBPT',
  PoolIdTotalLiquidity = 'poolId__totalLiquidity',
  PoolIdTotalProtocolFee = 'poolId__totalProtocolFee',
  PoolIdTotalProtocolFeePaidInBpt = 'poolId__totalProtocolFeePaidInBPT',
  PoolIdTotalShares = 'poolId__totalShares',
  PoolIdTotalSwapFee = 'poolId__totalSwapFee',
  PoolIdTotalSwapVolume = 'poolId__totalSwapVolume',
  PoolIdTotalWeight = 'poolId__totalWeight',
  PoolIdTx = 'poolId__tx',
  PoolIdU = 'poolId__u',
  PoolIdUnitSeconds = 'poolId__unitSeconds',
  PoolIdUpperTarget = 'poolId__upperTarget',
  PoolIdV = 'poolId__v',
  PoolIdW = 'poolId__w',
  PoolIdWrappedIndex = 'poolId__wrappedIndex',
  PoolIdZ = 'poolId__z',
  PriceRate = 'priceRate',
  Symbol = 'symbol',
  Token = 'token',
  TokenAddress = 'token__address',
  TokenDecimals = 'token__decimals',
  TokenFxOracleDecimals = 'token__fxOracleDecimals',
  TokenId = 'token__id',
  TokenLatestFxPrice = 'token__latestFXPrice',
  TokenLatestUsdPrice = 'token__latestUSDPrice',
  TokenLatestUsdPriceTimestamp = 'token__latestUSDPriceTimestamp',
  TokenName = 'token__name',
  TokenSymbol = 'token__symbol',
  TokenTotalBalanceNotional = 'token__totalBalanceNotional',
  TokenTotalBalanceUsd = 'token__totalBalanceUSD',
  TokenTotalSwapCount = 'token__totalSwapCount',
  TokenTotalVolumeNotional = 'token__totalVolumeNotional',
  TokenTotalVolumeUsd = 'token__totalVolumeUSD',
  Weight = 'weight',
}

export type Pool_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  address: InputMaybe<Scalars['Bytes']>;
  address_contains: InputMaybe<Scalars['Bytes']>;
  address_gt: InputMaybe<Scalars['Bytes']>;
  address_gte: InputMaybe<Scalars['Bytes']>;
  address_in: InputMaybe<Array<Scalars['Bytes']>>;
  address_lt: InputMaybe<Scalars['Bytes']>;
  address_lte: InputMaybe<Scalars['Bytes']>;
  address_not: InputMaybe<Scalars['Bytes']>;
  address_not_contains: InputMaybe<Scalars['Bytes']>;
  address_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  alpha: InputMaybe<Scalars['BigDecimal']>;
  alpha_gt: InputMaybe<Scalars['BigDecimal']>;
  alpha_gte: InputMaybe<Scalars['BigDecimal']>;
  alpha_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  alpha_lt: InputMaybe<Scalars['BigDecimal']>;
  alpha_lte: InputMaybe<Scalars['BigDecimal']>;
  alpha_not: InputMaybe<Scalars['BigDecimal']>;
  alpha_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  amp: InputMaybe<Scalars['BigInt']>;
  amp_gt: InputMaybe<Scalars['BigInt']>;
  amp_gte: InputMaybe<Scalars['BigInt']>;
  amp_in: InputMaybe<Array<Scalars['BigInt']>>;
  amp_lt: InputMaybe<Scalars['BigInt']>;
  amp_lte: InputMaybe<Scalars['BigInt']>;
  amp_not: InputMaybe<Scalars['BigInt']>;
  amp_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  and: InputMaybe<Array<InputMaybe<Pool_Filter>>>;
  baseToken: InputMaybe<Scalars['Bytes']>;
  baseToken_contains: InputMaybe<Scalars['Bytes']>;
  baseToken_gt: InputMaybe<Scalars['Bytes']>;
  baseToken_gte: InputMaybe<Scalars['Bytes']>;
  baseToken_in: InputMaybe<Array<Scalars['Bytes']>>;
  baseToken_lt: InputMaybe<Scalars['Bytes']>;
  baseToken_lte: InputMaybe<Scalars['Bytes']>;
  baseToken_not: InputMaybe<Scalars['Bytes']>;
  baseToken_not_contains: InputMaybe<Scalars['Bytes']>;
  baseToken_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  beta: InputMaybe<Scalars['BigDecimal']>;
  beta_gt: InputMaybe<Scalars['BigDecimal']>;
  beta_gte: InputMaybe<Scalars['BigDecimal']>;
  beta_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  beta_lt: InputMaybe<Scalars['BigDecimal']>;
  beta_lte: InputMaybe<Scalars['BigDecimal']>;
  beta_not: InputMaybe<Scalars['BigDecimal']>;
  beta_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  c: InputMaybe<Scalars['BigDecimal']>;
  c_gt: InputMaybe<Scalars['BigDecimal']>;
  c_gte: InputMaybe<Scalars['BigDecimal']>;
  c_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  c_lt: InputMaybe<Scalars['BigDecimal']>;
  c_lte: InputMaybe<Scalars['BigDecimal']>;
  c_not: InputMaybe<Scalars['BigDecimal']>;
  c_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  circuitBreakers_: InputMaybe<CircuitBreaker_Filter>;
  createTime: InputMaybe<Scalars['Int']>;
  createTime_gt: InputMaybe<Scalars['Int']>;
  createTime_gte: InputMaybe<Scalars['Int']>;
  createTime_in: InputMaybe<Array<Scalars['Int']>>;
  createTime_lt: InputMaybe<Scalars['Int']>;
  createTime_lte: InputMaybe<Scalars['Int']>;
  createTime_not: InputMaybe<Scalars['Int']>;
  createTime_not_in: InputMaybe<Array<Scalars['Int']>>;
  dSq: InputMaybe<Scalars['BigDecimal']>;
  dSq_gt: InputMaybe<Scalars['BigDecimal']>;
  dSq_gte: InputMaybe<Scalars['BigDecimal']>;
  dSq_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  dSq_lt: InputMaybe<Scalars['BigDecimal']>;
  dSq_lte: InputMaybe<Scalars['BigDecimal']>;
  dSq_not: InputMaybe<Scalars['BigDecimal']>;
  dSq_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  delta: InputMaybe<Scalars['BigDecimal']>;
  delta_gt: InputMaybe<Scalars['BigDecimal']>;
  delta_gte: InputMaybe<Scalars['BigDecimal']>;
  delta_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  delta_lt: InputMaybe<Scalars['BigDecimal']>;
  delta_lte: InputMaybe<Scalars['BigDecimal']>;
  delta_not: InputMaybe<Scalars['BigDecimal']>;
  delta_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  epsilon: InputMaybe<Scalars['BigDecimal']>;
  epsilon_gt: InputMaybe<Scalars['BigDecimal']>;
  epsilon_gte: InputMaybe<Scalars['BigDecimal']>;
  epsilon_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  epsilon_lt: InputMaybe<Scalars['BigDecimal']>;
  epsilon_lte: InputMaybe<Scalars['BigDecimal']>;
  epsilon_not: InputMaybe<Scalars['BigDecimal']>;
  epsilon_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  expiryTime: InputMaybe<Scalars['BigInt']>;
  expiryTime_gt: InputMaybe<Scalars['BigInt']>;
  expiryTime_gte: InputMaybe<Scalars['BigInt']>;
  expiryTime_in: InputMaybe<Array<Scalars['BigInt']>>;
  expiryTime_lt: InputMaybe<Scalars['BigInt']>;
  expiryTime_lte: InputMaybe<Scalars['BigInt']>;
  expiryTime_not: InputMaybe<Scalars['BigInt']>;
  expiryTime_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  factory: InputMaybe<Scalars['Bytes']>;
  factory_contains: InputMaybe<Scalars['Bytes']>;
  factory_gt: InputMaybe<Scalars['Bytes']>;
  factory_gte: InputMaybe<Scalars['Bytes']>;
  factory_in: InputMaybe<Array<Scalars['Bytes']>>;
  factory_lt: InputMaybe<Scalars['Bytes']>;
  factory_lte: InputMaybe<Scalars['Bytes']>;
  factory_not: InputMaybe<Scalars['Bytes']>;
  factory_not_contains: InputMaybe<Scalars['Bytes']>;
  factory_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  historicalValues_: InputMaybe<PoolHistoricalLiquidity_Filter>;
  holdersCount: InputMaybe<Scalars['BigInt']>;
  holdersCount_gt: InputMaybe<Scalars['BigInt']>;
  holdersCount_gte: InputMaybe<Scalars['BigInt']>;
  holdersCount_in: InputMaybe<Array<Scalars['BigInt']>>;
  holdersCount_lt: InputMaybe<Scalars['BigInt']>;
  holdersCount_lte: InputMaybe<Scalars['BigInt']>;
  holdersCount_not: InputMaybe<Scalars['BigInt']>;
  holdersCount_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  id: InputMaybe<Scalars['ID']>;
  id_gt: InputMaybe<Scalars['ID']>;
  id_gte: InputMaybe<Scalars['ID']>;
  id_in: InputMaybe<Array<Scalars['ID']>>;
  id_lt: InputMaybe<Scalars['ID']>;
  id_lte: InputMaybe<Scalars['ID']>;
  id_not: InputMaybe<Scalars['ID']>;
  id_not_in: InputMaybe<Array<Scalars['ID']>>;
  isInRecoveryMode: InputMaybe<Scalars['Boolean']>;
  isInRecoveryMode_in: InputMaybe<Array<Scalars['Boolean']>>;
  isInRecoveryMode_not: InputMaybe<Scalars['Boolean']>;
  isInRecoveryMode_not_in: InputMaybe<Array<Scalars['Boolean']>>;
  isPaused: InputMaybe<Scalars['Boolean']>;
  isPaused_in: InputMaybe<Array<Scalars['Boolean']>>;
  isPaused_not: InputMaybe<Scalars['Boolean']>;
  isPaused_not_in: InputMaybe<Array<Scalars['Boolean']>>;
  joinExitEnabled: InputMaybe<Scalars['Boolean']>;
  joinExitEnabled_in: InputMaybe<Array<Scalars['Boolean']>>;
  joinExitEnabled_not: InputMaybe<Scalars['Boolean']>;
  joinExitEnabled_not_in: InputMaybe<Array<Scalars['Boolean']>>;
  lambda: InputMaybe<Scalars['BigDecimal']>;
  lambda_gt: InputMaybe<Scalars['BigDecimal']>;
  lambda_gte: InputMaybe<Scalars['BigDecimal']>;
  lambda_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  lambda_lt: InputMaybe<Scalars['BigDecimal']>;
  lambda_lte: InputMaybe<Scalars['BigDecimal']>;
  lambda_not: InputMaybe<Scalars['BigDecimal']>;
  lambda_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  lastJoinExitAmp: InputMaybe<Scalars['BigInt']>;
  lastJoinExitAmp_gt: InputMaybe<Scalars['BigInt']>;
  lastJoinExitAmp_gte: InputMaybe<Scalars['BigInt']>;
  lastJoinExitAmp_in: InputMaybe<Array<Scalars['BigInt']>>;
  lastJoinExitAmp_lt: InputMaybe<Scalars['BigInt']>;
  lastJoinExitAmp_lte: InputMaybe<Scalars['BigInt']>;
  lastJoinExitAmp_not: InputMaybe<Scalars['BigInt']>;
  lastJoinExitAmp_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  lastPostJoinExitInvariant: InputMaybe<Scalars['BigDecimal']>;
  lastPostJoinExitInvariant_gt: InputMaybe<Scalars['BigDecimal']>;
  lastPostJoinExitInvariant_gte: InputMaybe<Scalars['BigDecimal']>;
  lastPostJoinExitInvariant_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  lastPostJoinExitInvariant_lt: InputMaybe<Scalars['BigDecimal']>;
  lastPostJoinExitInvariant_lte: InputMaybe<Scalars['BigDecimal']>;
  lastPostJoinExitInvariant_not: InputMaybe<Scalars['BigDecimal']>;
  lastPostJoinExitInvariant_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  lowerTarget: InputMaybe<Scalars['BigDecimal']>;
  lowerTarget_gt: InputMaybe<Scalars['BigDecimal']>;
  lowerTarget_gte: InputMaybe<Scalars['BigDecimal']>;
  lowerTarget_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  lowerTarget_lt: InputMaybe<Scalars['BigDecimal']>;
  lowerTarget_lte: InputMaybe<Scalars['BigDecimal']>;
  lowerTarget_not: InputMaybe<Scalars['BigDecimal']>;
  lowerTarget_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  mainIndex: InputMaybe<Scalars['Int']>;
  mainIndex_gt: InputMaybe<Scalars['Int']>;
  mainIndex_gte: InputMaybe<Scalars['Int']>;
  mainIndex_in: InputMaybe<Array<Scalars['Int']>>;
  mainIndex_lt: InputMaybe<Scalars['Int']>;
  mainIndex_lte: InputMaybe<Scalars['Int']>;
  mainIndex_not: InputMaybe<Scalars['Int']>;
  mainIndex_not_in: InputMaybe<Array<Scalars['Int']>>;
  managementAumFee: InputMaybe<Scalars['BigDecimal']>;
  managementAumFee_gt: InputMaybe<Scalars['BigDecimal']>;
  managementAumFee_gte: InputMaybe<Scalars['BigDecimal']>;
  managementAumFee_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  managementAumFee_lt: InputMaybe<Scalars['BigDecimal']>;
  managementAumFee_lte: InputMaybe<Scalars['BigDecimal']>;
  managementAumFee_not: InputMaybe<Scalars['BigDecimal']>;
  managementAumFee_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  managementFee: InputMaybe<Scalars['BigDecimal']>;
  managementFee_gt: InputMaybe<Scalars['BigDecimal']>;
  managementFee_gte: InputMaybe<Scalars['BigDecimal']>;
  managementFee_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  managementFee_lt: InputMaybe<Scalars['BigDecimal']>;
  managementFee_lte: InputMaybe<Scalars['BigDecimal']>;
  managementFee_not: InputMaybe<Scalars['BigDecimal']>;
  managementFee_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  mustAllowlistLPs: InputMaybe<Scalars['Boolean']>;
  mustAllowlistLPs_in: InputMaybe<Array<Scalars['Boolean']>>;
  mustAllowlistLPs_not: InputMaybe<Scalars['Boolean']>;
  mustAllowlistLPs_not_in: InputMaybe<Array<Scalars['Boolean']>>;
  name: InputMaybe<Scalars['String']>;
  name_contains: InputMaybe<Scalars['String']>;
  name_contains_nocase: InputMaybe<Scalars['String']>;
  name_ends_with: InputMaybe<Scalars['String']>;
  name_ends_with_nocase: InputMaybe<Scalars['String']>;
  name_gt: InputMaybe<Scalars['String']>;
  name_gte: InputMaybe<Scalars['String']>;
  name_in: InputMaybe<Array<Scalars['String']>>;
  name_lt: InputMaybe<Scalars['String']>;
  name_lte: InputMaybe<Scalars['String']>;
  name_not: InputMaybe<Scalars['String']>;
  name_not_contains: InputMaybe<Scalars['String']>;
  name_not_contains_nocase: InputMaybe<Scalars['String']>;
  name_not_ends_with: InputMaybe<Scalars['String']>;
  name_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  name_not_in: InputMaybe<Array<Scalars['String']>>;
  name_not_starts_with: InputMaybe<Scalars['String']>;
  name_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  name_starts_with: InputMaybe<Scalars['String']>;
  name_starts_with_nocase: InputMaybe<Scalars['String']>;
  or: InputMaybe<Array<InputMaybe<Pool_Filter>>>;
  oracleEnabled: InputMaybe<Scalars['Boolean']>;
  oracleEnabled_in: InputMaybe<Array<Scalars['Boolean']>>;
  oracleEnabled_not: InputMaybe<Scalars['Boolean']>;
  oracleEnabled_not_in: InputMaybe<Array<Scalars['Boolean']>>;
  owner: InputMaybe<Scalars['Bytes']>;
  owner_contains: InputMaybe<Scalars['Bytes']>;
  owner_gt: InputMaybe<Scalars['Bytes']>;
  owner_gte: InputMaybe<Scalars['Bytes']>;
  owner_in: InputMaybe<Array<Scalars['Bytes']>>;
  owner_lt: InputMaybe<Scalars['Bytes']>;
  owner_lte: InputMaybe<Scalars['Bytes']>;
  owner_not: InputMaybe<Scalars['Bytes']>;
  owner_not_contains: InputMaybe<Scalars['Bytes']>;
  owner_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  poolType: InputMaybe<Scalars['String']>;
  poolTypeVersion: InputMaybe<Scalars['Int']>;
  poolTypeVersion_gt: InputMaybe<Scalars['Int']>;
  poolTypeVersion_gte: InputMaybe<Scalars['Int']>;
  poolTypeVersion_in: InputMaybe<Array<Scalars['Int']>>;
  poolTypeVersion_lt: InputMaybe<Scalars['Int']>;
  poolTypeVersion_lte: InputMaybe<Scalars['Int']>;
  poolTypeVersion_not: InputMaybe<Scalars['Int']>;
  poolTypeVersion_not_in: InputMaybe<Array<Scalars['Int']>>;
  poolType_contains: InputMaybe<Scalars['String']>;
  poolType_contains_nocase: InputMaybe<Scalars['String']>;
  poolType_ends_with: InputMaybe<Scalars['String']>;
  poolType_ends_with_nocase: InputMaybe<Scalars['String']>;
  poolType_gt: InputMaybe<Scalars['String']>;
  poolType_gte: InputMaybe<Scalars['String']>;
  poolType_in: InputMaybe<Array<Scalars['String']>>;
  poolType_lt: InputMaybe<Scalars['String']>;
  poolType_lte: InputMaybe<Scalars['String']>;
  poolType_not: InputMaybe<Scalars['String']>;
  poolType_not_contains: InputMaybe<Scalars['String']>;
  poolType_not_contains_nocase: InputMaybe<Scalars['String']>;
  poolType_not_ends_with: InputMaybe<Scalars['String']>;
  poolType_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  poolType_not_in: InputMaybe<Array<Scalars['String']>>;
  poolType_not_starts_with: InputMaybe<Scalars['String']>;
  poolType_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  poolType_starts_with: InputMaybe<Scalars['String']>;
  poolType_starts_with_nocase: InputMaybe<Scalars['String']>;
  priceRateProviders_: InputMaybe<PriceRateProvider_Filter>;
  principalToken: InputMaybe<Scalars['Bytes']>;
  principalToken_contains: InputMaybe<Scalars['Bytes']>;
  principalToken_gt: InputMaybe<Scalars['Bytes']>;
  principalToken_gte: InputMaybe<Scalars['Bytes']>;
  principalToken_in: InputMaybe<Array<Scalars['Bytes']>>;
  principalToken_lt: InputMaybe<Scalars['Bytes']>;
  principalToken_lte: InputMaybe<Scalars['Bytes']>;
  principalToken_not: InputMaybe<Scalars['Bytes']>;
  principalToken_not_contains: InputMaybe<Scalars['Bytes']>;
  principalToken_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  protocolAumFeeCache: InputMaybe<Scalars['BigDecimal']>;
  protocolAumFeeCache_gt: InputMaybe<Scalars['BigDecimal']>;
  protocolAumFeeCache_gte: InputMaybe<Scalars['BigDecimal']>;
  protocolAumFeeCache_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  protocolAumFeeCache_lt: InputMaybe<Scalars['BigDecimal']>;
  protocolAumFeeCache_lte: InputMaybe<Scalars['BigDecimal']>;
  protocolAumFeeCache_not: InputMaybe<Scalars['BigDecimal']>;
  protocolAumFeeCache_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  protocolId: InputMaybe<Scalars['Int']>;
  protocolIdData: InputMaybe<Scalars['String']>;
  protocolIdData_: InputMaybe<ProtocolIdData_Filter>;
  protocolIdData_contains: InputMaybe<Scalars['String']>;
  protocolIdData_contains_nocase: InputMaybe<Scalars['String']>;
  protocolIdData_ends_with: InputMaybe<Scalars['String']>;
  protocolIdData_ends_with_nocase: InputMaybe<Scalars['String']>;
  protocolIdData_gt: InputMaybe<Scalars['String']>;
  protocolIdData_gte: InputMaybe<Scalars['String']>;
  protocolIdData_in: InputMaybe<Array<Scalars['String']>>;
  protocolIdData_lt: InputMaybe<Scalars['String']>;
  protocolIdData_lte: InputMaybe<Scalars['String']>;
  protocolIdData_not: InputMaybe<Scalars['String']>;
  protocolIdData_not_contains: InputMaybe<Scalars['String']>;
  protocolIdData_not_contains_nocase: InputMaybe<Scalars['String']>;
  protocolIdData_not_ends_with: InputMaybe<Scalars['String']>;
  protocolIdData_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  protocolIdData_not_in: InputMaybe<Array<Scalars['String']>>;
  protocolIdData_not_starts_with: InputMaybe<Scalars['String']>;
  protocolIdData_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  protocolIdData_starts_with: InputMaybe<Scalars['String']>;
  protocolIdData_starts_with_nocase: InputMaybe<Scalars['String']>;
  protocolId_gt: InputMaybe<Scalars['Int']>;
  protocolId_gte: InputMaybe<Scalars['Int']>;
  protocolId_in: InputMaybe<Array<Scalars['Int']>>;
  protocolId_lt: InputMaybe<Scalars['Int']>;
  protocolId_lte: InputMaybe<Scalars['Int']>;
  protocolId_not: InputMaybe<Scalars['Int']>;
  protocolId_not_in: InputMaybe<Array<Scalars['Int']>>;
  protocolSwapFeeCache: InputMaybe<Scalars['BigDecimal']>;
  protocolSwapFeeCache_gt: InputMaybe<Scalars['BigDecimal']>;
  protocolSwapFeeCache_gte: InputMaybe<Scalars['BigDecimal']>;
  protocolSwapFeeCache_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  protocolSwapFeeCache_lt: InputMaybe<Scalars['BigDecimal']>;
  protocolSwapFeeCache_lte: InputMaybe<Scalars['BigDecimal']>;
  protocolSwapFeeCache_not: InputMaybe<Scalars['BigDecimal']>;
  protocolSwapFeeCache_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  protocolYieldFeeCache: InputMaybe<Scalars['BigDecimal']>;
  protocolYieldFeeCache_gt: InputMaybe<Scalars['BigDecimal']>;
  protocolYieldFeeCache_gte: InputMaybe<Scalars['BigDecimal']>;
  protocolYieldFeeCache_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  protocolYieldFeeCache_lt: InputMaybe<Scalars['BigDecimal']>;
  protocolYieldFeeCache_lte: InputMaybe<Scalars['BigDecimal']>;
  protocolYieldFeeCache_not: InputMaybe<Scalars['BigDecimal']>;
  protocolYieldFeeCache_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  root3Alpha: InputMaybe<Scalars['BigDecimal']>;
  root3Alpha_gt: InputMaybe<Scalars['BigDecimal']>;
  root3Alpha_gte: InputMaybe<Scalars['BigDecimal']>;
  root3Alpha_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  root3Alpha_lt: InputMaybe<Scalars['BigDecimal']>;
  root3Alpha_lte: InputMaybe<Scalars['BigDecimal']>;
  root3Alpha_not: InputMaybe<Scalars['BigDecimal']>;
  root3Alpha_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  s: InputMaybe<Scalars['BigDecimal']>;
  s_gt: InputMaybe<Scalars['BigDecimal']>;
  s_gte: InputMaybe<Scalars['BigDecimal']>;
  s_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  s_lt: InputMaybe<Scalars['BigDecimal']>;
  s_lte: InputMaybe<Scalars['BigDecimal']>;
  s_not: InputMaybe<Scalars['BigDecimal']>;
  s_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  shares_: InputMaybe<PoolShare_Filter>;
  snapshots_: InputMaybe<PoolSnapshot_Filter>;
  sqrtAlpha: InputMaybe<Scalars['BigDecimal']>;
  sqrtAlpha_gt: InputMaybe<Scalars['BigDecimal']>;
  sqrtAlpha_gte: InputMaybe<Scalars['BigDecimal']>;
  sqrtAlpha_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  sqrtAlpha_lt: InputMaybe<Scalars['BigDecimal']>;
  sqrtAlpha_lte: InputMaybe<Scalars['BigDecimal']>;
  sqrtAlpha_not: InputMaybe<Scalars['BigDecimal']>;
  sqrtAlpha_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  sqrtBeta: InputMaybe<Scalars['BigDecimal']>;
  sqrtBeta_gt: InputMaybe<Scalars['BigDecimal']>;
  sqrtBeta_gte: InputMaybe<Scalars['BigDecimal']>;
  sqrtBeta_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  sqrtBeta_lt: InputMaybe<Scalars['BigDecimal']>;
  sqrtBeta_lte: InputMaybe<Scalars['BigDecimal']>;
  sqrtBeta_not: InputMaybe<Scalars['BigDecimal']>;
  sqrtBeta_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  strategyType: InputMaybe<Scalars['Int']>;
  strategyType_gt: InputMaybe<Scalars['Int']>;
  strategyType_gte: InputMaybe<Scalars['Int']>;
  strategyType_in: InputMaybe<Array<Scalars['Int']>>;
  strategyType_lt: InputMaybe<Scalars['Int']>;
  strategyType_lte: InputMaybe<Scalars['Int']>;
  strategyType_not: InputMaybe<Scalars['Int']>;
  strategyType_not_in: InputMaybe<Array<Scalars['Int']>>;
  swapEnabled: InputMaybe<Scalars['Boolean']>;
  swapEnabled_in: InputMaybe<Array<Scalars['Boolean']>>;
  swapEnabled_not: InputMaybe<Scalars['Boolean']>;
  swapEnabled_not_in: InputMaybe<Array<Scalars['Boolean']>>;
  swapFee: InputMaybe<Scalars['BigDecimal']>;
  swapFee_gt: InputMaybe<Scalars['BigDecimal']>;
  swapFee_gte: InputMaybe<Scalars['BigDecimal']>;
  swapFee_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  swapFee_lt: InputMaybe<Scalars['BigDecimal']>;
  swapFee_lte: InputMaybe<Scalars['BigDecimal']>;
  swapFee_not: InputMaybe<Scalars['BigDecimal']>;
  swapFee_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  swapsCount: InputMaybe<Scalars['BigInt']>;
  swapsCount_gt: InputMaybe<Scalars['BigInt']>;
  swapsCount_gte: InputMaybe<Scalars['BigInt']>;
  swapsCount_in: InputMaybe<Array<Scalars['BigInt']>>;
  swapsCount_lt: InputMaybe<Scalars['BigInt']>;
  swapsCount_lte: InputMaybe<Scalars['BigInt']>;
  swapsCount_not: InputMaybe<Scalars['BigInt']>;
  swapsCount_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  swaps_: InputMaybe<Swap_Filter>;
  symbol: InputMaybe<Scalars['String']>;
  symbol_contains: InputMaybe<Scalars['String']>;
  symbol_contains_nocase: InputMaybe<Scalars['String']>;
  symbol_ends_with: InputMaybe<Scalars['String']>;
  symbol_ends_with_nocase: InputMaybe<Scalars['String']>;
  symbol_gt: InputMaybe<Scalars['String']>;
  symbol_gte: InputMaybe<Scalars['String']>;
  symbol_in: InputMaybe<Array<Scalars['String']>>;
  symbol_lt: InputMaybe<Scalars['String']>;
  symbol_lte: InputMaybe<Scalars['String']>;
  symbol_not: InputMaybe<Scalars['String']>;
  symbol_not_contains: InputMaybe<Scalars['String']>;
  symbol_not_contains_nocase: InputMaybe<Scalars['String']>;
  symbol_not_ends_with: InputMaybe<Scalars['String']>;
  symbol_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  symbol_not_in: InputMaybe<Array<Scalars['String']>>;
  symbol_not_starts_with: InputMaybe<Scalars['String']>;
  symbol_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  symbol_starts_with: InputMaybe<Scalars['String']>;
  symbol_starts_with_nocase: InputMaybe<Scalars['String']>;
  tauAlphaX: InputMaybe<Scalars['BigDecimal']>;
  tauAlphaX_gt: InputMaybe<Scalars['BigDecimal']>;
  tauAlphaX_gte: InputMaybe<Scalars['BigDecimal']>;
  tauAlphaX_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  tauAlphaX_lt: InputMaybe<Scalars['BigDecimal']>;
  tauAlphaX_lte: InputMaybe<Scalars['BigDecimal']>;
  tauAlphaX_not: InputMaybe<Scalars['BigDecimal']>;
  tauAlphaX_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  tauAlphaY: InputMaybe<Scalars['BigDecimal']>;
  tauAlphaY_gt: InputMaybe<Scalars['BigDecimal']>;
  tauAlphaY_gte: InputMaybe<Scalars['BigDecimal']>;
  tauAlphaY_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  tauAlphaY_lt: InputMaybe<Scalars['BigDecimal']>;
  tauAlphaY_lte: InputMaybe<Scalars['BigDecimal']>;
  tauAlphaY_not: InputMaybe<Scalars['BigDecimal']>;
  tauAlphaY_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  tauBetaX: InputMaybe<Scalars['BigDecimal']>;
  tauBetaX_gt: InputMaybe<Scalars['BigDecimal']>;
  tauBetaX_gte: InputMaybe<Scalars['BigDecimal']>;
  tauBetaX_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  tauBetaX_lt: InputMaybe<Scalars['BigDecimal']>;
  tauBetaX_lte: InputMaybe<Scalars['BigDecimal']>;
  tauBetaX_not: InputMaybe<Scalars['BigDecimal']>;
  tauBetaX_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  tauBetaY: InputMaybe<Scalars['BigDecimal']>;
  tauBetaY_gt: InputMaybe<Scalars['BigDecimal']>;
  tauBetaY_gte: InputMaybe<Scalars['BigDecimal']>;
  tauBetaY_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  tauBetaY_lt: InputMaybe<Scalars['BigDecimal']>;
  tauBetaY_lte: InputMaybe<Scalars['BigDecimal']>;
  tauBetaY_not: InputMaybe<Scalars['BigDecimal']>;
  tauBetaY_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  tokensList: InputMaybe<Array<Scalars['Bytes']>>;
  tokensList_contains: InputMaybe<Array<Scalars['Bytes']>>;
  tokensList_contains_nocase: InputMaybe<Array<Scalars['Bytes']>>;
  tokensList_not: InputMaybe<Array<Scalars['Bytes']>>;
  tokensList_not_contains: InputMaybe<Array<Scalars['Bytes']>>;
  tokensList_not_contains_nocase: InputMaybe<Array<Scalars['Bytes']>>;
  tokens_: InputMaybe<PoolToken_Filter>;
  totalAumFeeCollectedInBPT: InputMaybe<Scalars['BigDecimal']>;
  totalAumFeeCollectedInBPT_gt: InputMaybe<Scalars['BigDecimal']>;
  totalAumFeeCollectedInBPT_gte: InputMaybe<Scalars['BigDecimal']>;
  totalAumFeeCollectedInBPT_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalAumFeeCollectedInBPT_lt: InputMaybe<Scalars['BigDecimal']>;
  totalAumFeeCollectedInBPT_lte: InputMaybe<Scalars['BigDecimal']>;
  totalAumFeeCollectedInBPT_not: InputMaybe<Scalars['BigDecimal']>;
  totalAumFeeCollectedInBPT_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalLiquidity: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidity_gt: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidity_gte: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidity_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalLiquidity_lt: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidity_lte: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidity_not: InputMaybe<Scalars['BigDecimal']>;
  totalLiquidity_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalProtocolFee: InputMaybe<Scalars['BigDecimal']>;
  totalProtocolFeePaidInBPT: InputMaybe<Scalars['BigDecimal']>;
  totalProtocolFeePaidInBPT_gt: InputMaybe<Scalars['BigDecimal']>;
  totalProtocolFeePaidInBPT_gte: InputMaybe<Scalars['BigDecimal']>;
  totalProtocolFeePaidInBPT_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalProtocolFeePaidInBPT_lt: InputMaybe<Scalars['BigDecimal']>;
  totalProtocolFeePaidInBPT_lte: InputMaybe<Scalars['BigDecimal']>;
  totalProtocolFeePaidInBPT_not: InputMaybe<Scalars['BigDecimal']>;
  totalProtocolFeePaidInBPT_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalProtocolFee_gt: InputMaybe<Scalars['BigDecimal']>;
  totalProtocolFee_gte: InputMaybe<Scalars['BigDecimal']>;
  totalProtocolFee_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalProtocolFee_lt: InputMaybe<Scalars['BigDecimal']>;
  totalProtocolFee_lte: InputMaybe<Scalars['BigDecimal']>;
  totalProtocolFee_not: InputMaybe<Scalars['BigDecimal']>;
  totalProtocolFee_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalShares: InputMaybe<Scalars['BigDecimal']>;
  totalShares_gt: InputMaybe<Scalars['BigDecimal']>;
  totalShares_gte: InputMaybe<Scalars['BigDecimal']>;
  totalShares_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalShares_lt: InputMaybe<Scalars['BigDecimal']>;
  totalShares_lte: InputMaybe<Scalars['BigDecimal']>;
  totalShares_not: InputMaybe<Scalars['BigDecimal']>;
  totalShares_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalSwapFee: InputMaybe<Scalars['BigDecimal']>;
  totalSwapFee_gt: InputMaybe<Scalars['BigDecimal']>;
  totalSwapFee_gte: InputMaybe<Scalars['BigDecimal']>;
  totalSwapFee_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalSwapFee_lt: InputMaybe<Scalars['BigDecimal']>;
  totalSwapFee_lte: InputMaybe<Scalars['BigDecimal']>;
  totalSwapFee_not: InputMaybe<Scalars['BigDecimal']>;
  totalSwapFee_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalSwapVolume: InputMaybe<Scalars['BigDecimal']>;
  totalSwapVolume_gt: InputMaybe<Scalars['BigDecimal']>;
  totalSwapVolume_gte: InputMaybe<Scalars['BigDecimal']>;
  totalSwapVolume_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalSwapVolume_lt: InputMaybe<Scalars['BigDecimal']>;
  totalSwapVolume_lte: InputMaybe<Scalars['BigDecimal']>;
  totalSwapVolume_not: InputMaybe<Scalars['BigDecimal']>;
  totalSwapVolume_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalWeight: InputMaybe<Scalars['BigDecimal']>;
  totalWeight_gt: InputMaybe<Scalars['BigDecimal']>;
  totalWeight_gte: InputMaybe<Scalars['BigDecimal']>;
  totalWeight_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalWeight_lt: InputMaybe<Scalars['BigDecimal']>;
  totalWeight_lte: InputMaybe<Scalars['BigDecimal']>;
  totalWeight_not: InputMaybe<Scalars['BigDecimal']>;
  totalWeight_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  tx: InputMaybe<Scalars['Bytes']>;
  tx_contains: InputMaybe<Scalars['Bytes']>;
  tx_gt: InputMaybe<Scalars['Bytes']>;
  tx_gte: InputMaybe<Scalars['Bytes']>;
  tx_in: InputMaybe<Array<Scalars['Bytes']>>;
  tx_lt: InputMaybe<Scalars['Bytes']>;
  tx_lte: InputMaybe<Scalars['Bytes']>;
  tx_not: InputMaybe<Scalars['Bytes']>;
  tx_not_contains: InputMaybe<Scalars['Bytes']>;
  tx_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  u: InputMaybe<Scalars['BigDecimal']>;
  u_gt: InputMaybe<Scalars['BigDecimal']>;
  u_gte: InputMaybe<Scalars['BigDecimal']>;
  u_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  u_lt: InputMaybe<Scalars['BigDecimal']>;
  u_lte: InputMaybe<Scalars['BigDecimal']>;
  u_not: InputMaybe<Scalars['BigDecimal']>;
  u_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  unitSeconds: InputMaybe<Scalars['BigInt']>;
  unitSeconds_gt: InputMaybe<Scalars['BigInt']>;
  unitSeconds_gte: InputMaybe<Scalars['BigInt']>;
  unitSeconds_in: InputMaybe<Array<Scalars['BigInt']>>;
  unitSeconds_lt: InputMaybe<Scalars['BigInt']>;
  unitSeconds_lte: InputMaybe<Scalars['BigInt']>;
  unitSeconds_not: InputMaybe<Scalars['BigInt']>;
  unitSeconds_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  upperTarget: InputMaybe<Scalars['BigDecimal']>;
  upperTarget_gt: InputMaybe<Scalars['BigDecimal']>;
  upperTarget_gte: InputMaybe<Scalars['BigDecimal']>;
  upperTarget_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  upperTarget_lt: InputMaybe<Scalars['BigDecimal']>;
  upperTarget_lte: InputMaybe<Scalars['BigDecimal']>;
  upperTarget_not: InputMaybe<Scalars['BigDecimal']>;
  upperTarget_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  v: InputMaybe<Scalars['BigDecimal']>;
  v_gt: InputMaybe<Scalars['BigDecimal']>;
  v_gte: InputMaybe<Scalars['BigDecimal']>;
  v_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  v_lt: InputMaybe<Scalars['BigDecimal']>;
  v_lte: InputMaybe<Scalars['BigDecimal']>;
  v_not: InputMaybe<Scalars['BigDecimal']>;
  v_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  vaultID: InputMaybe<Scalars['String']>;
  vaultID_: InputMaybe<Balancer_Filter>;
  vaultID_contains: InputMaybe<Scalars['String']>;
  vaultID_contains_nocase: InputMaybe<Scalars['String']>;
  vaultID_ends_with: InputMaybe<Scalars['String']>;
  vaultID_ends_with_nocase: InputMaybe<Scalars['String']>;
  vaultID_gt: InputMaybe<Scalars['String']>;
  vaultID_gte: InputMaybe<Scalars['String']>;
  vaultID_in: InputMaybe<Array<Scalars['String']>>;
  vaultID_lt: InputMaybe<Scalars['String']>;
  vaultID_lte: InputMaybe<Scalars['String']>;
  vaultID_not: InputMaybe<Scalars['String']>;
  vaultID_not_contains: InputMaybe<Scalars['String']>;
  vaultID_not_contains_nocase: InputMaybe<Scalars['String']>;
  vaultID_not_ends_with: InputMaybe<Scalars['String']>;
  vaultID_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  vaultID_not_in: InputMaybe<Array<Scalars['String']>>;
  vaultID_not_starts_with: InputMaybe<Scalars['String']>;
  vaultID_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  vaultID_starts_with: InputMaybe<Scalars['String']>;
  vaultID_starts_with_nocase: InputMaybe<Scalars['String']>;
  w: InputMaybe<Scalars['BigDecimal']>;
  w_gt: InputMaybe<Scalars['BigDecimal']>;
  w_gte: InputMaybe<Scalars['BigDecimal']>;
  w_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  w_lt: InputMaybe<Scalars['BigDecimal']>;
  w_lte: InputMaybe<Scalars['BigDecimal']>;
  w_not: InputMaybe<Scalars['BigDecimal']>;
  w_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  weightUpdates_: InputMaybe<GradualWeightUpdate_Filter>;
  wrappedIndex: InputMaybe<Scalars['Int']>;
  wrappedIndex_gt: InputMaybe<Scalars['Int']>;
  wrappedIndex_gte: InputMaybe<Scalars['Int']>;
  wrappedIndex_in: InputMaybe<Array<Scalars['Int']>>;
  wrappedIndex_lt: InputMaybe<Scalars['Int']>;
  wrappedIndex_lte: InputMaybe<Scalars['Int']>;
  wrappedIndex_not: InputMaybe<Scalars['Int']>;
  wrappedIndex_not_in: InputMaybe<Array<Scalars['Int']>>;
  z: InputMaybe<Scalars['BigDecimal']>;
  z_gt: InputMaybe<Scalars['BigDecimal']>;
  z_gte: InputMaybe<Scalars['BigDecimal']>;
  z_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  z_lt: InputMaybe<Scalars['BigDecimal']>;
  z_lte: InputMaybe<Scalars['BigDecimal']>;
  z_not: InputMaybe<Scalars['BigDecimal']>;
  z_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export enum Pool_OrderBy {
  Address = 'address',
  Alpha = 'alpha',
  Amp = 'amp',
  BaseToken = 'baseToken',
  Beta = 'beta',
  C = 'c',
  CircuitBreakers = 'circuitBreakers',
  CreateTime = 'createTime',
  DSq = 'dSq',
  Delta = 'delta',
  Epsilon = 'epsilon',
  ExpiryTime = 'expiryTime',
  Factory = 'factory',
  HistoricalValues = 'historicalValues',
  HoldersCount = 'holdersCount',
  Id = 'id',
  IsInRecoveryMode = 'isInRecoveryMode',
  IsPaused = 'isPaused',
  JoinExitEnabled = 'joinExitEnabled',
  Lambda = 'lambda',
  LastJoinExitAmp = 'lastJoinExitAmp',
  LastPostJoinExitInvariant = 'lastPostJoinExitInvariant',
  LowerTarget = 'lowerTarget',
  MainIndex = 'mainIndex',
  ManagementAumFee = 'managementAumFee',
  ManagementFee = 'managementFee',
  MustAllowlistLPs = 'mustAllowlistLPs',
  Name = 'name',
  OracleEnabled = 'oracleEnabled',
  Owner = 'owner',
  PoolType = 'poolType',
  PoolTypeVersion = 'poolTypeVersion',
  PriceRateProviders = 'priceRateProviders',
  PrincipalToken = 'principalToken',
  ProtocolAumFeeCache = 'protocolAumFeeCache',
  ProtocolId = 'protocolId',
  ProtocolIdData = 'protocolIdData',
  ProtocolIdDataId = 'protocolIdData__id',
  ProtocolIdDataName = 'protocolIdData__name',
  ProtocolSwapFeeCache = 'protocolSwapFeeCache',
  ProtocolYieldFeeCache = 'protocolYieldFeeCache',
  Root3Alpha = 'root3Alpha',
  S = 's',
  Shares = 'shares',
  Snapshots = 'snapshots',
  SqrtAlpha = 'sqrtAlpha',
  SqrtBeta = 'sqrtBeta',
  StrategyType = 'strategyType',
  SwapEnabled = 'swapEnabled',
  SwapFee = 'swapFee',
  Swaps = 'swaps',
  SwapsCount = 'swapsCount',
  Symbol = 'symbol',
  TauAlphaX = 'tauAlphaX',
  TauAlphaY = 'tauAlphaY',
  TauBetaX = 'tauBetaX',
  TauBetaY = 'tauBetaY',
  Tokens = 'tokens',
  TokensList = 'tokensList',
  TotalAumFeeCollectedInBpt = 'totalAumFeeCollectedInBPT',
  TotalLiquidity = 'totalLiquidity',
  TotalProtocolFee = 'totalProtocolFee',
  TotalProtocolFeePaidInBpt = 'totalProtocolFeePaidInBPT',
  TotalShares = 'totalShares',
  TotalSwapFee = 'totalSwapFee',
  TotalSwapVolume = 'totalSwapVolume',
  TotalWeight = 'totalWeight',
  Tx = 'tx',
  U = 'u',
  UnitSeconds = 'unitSeconds',
  UpperTarget = 'upperTarget',
  V = 'v',
  VaultId = 'vaultID',
  VaultIdId = 'vaultID__id',
  VaultIdPoolCount = 'vaultID__poolCount',
  VaultIdProtocolFeesCollector = 'vaultID__protocolFeesCollector',
  VaultIdTotalLiquidity = 'vaultID__totalLiquidity',
  VaultIdTotalProtocolFee = 'vaultID__totalProtocolFee',
  VaultIdTotalSwapCount = 'vaultID__totalSwapCount',
  VaultIdTotalSwapFee = 'vaultID__totalSwapFee',
  VaultIdTotalSwapVolume = 'vaultID__totalSwapVolume',
  W = 'w',
  WeightUpdates = 'weightUpdates',
  WrappedIndex = 'wrappedIndex',
  Z = 'z',
}

export type PriceRateProvider = {
  __typename?: 'PriceRateProvider';
  address: Scalars['Bytes'];
  cacheDuration: Maybe<Scalars['Int']>;
  cacheExpiry: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  lastCached: Maybe<Scalars['Int']>;
  poolId: Pool;
  rate: Maybe<Scalars['BigDecimal']>;
  token: PoolToken;
};

export type PriceRateProvider_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  address: InputMaybe<Scalars['Bytes']>;
  address_contains: InputMaybe<Scalars['Bytes']>;
  address_gt: InputMaybe<Scalars['Bytes']>;
  address_gte: InputMaybe<Scalars['Bytes']>;
  address_in: InputMaybe<Array<Scalars['Bytes']>>;
  address_lt: InputMaybe<Scalars['Bytes']>;
  address_lte: InputMaybe<Scalars['Bytes']>;
  address_not: InputMaybe<Scalars['Bytes']>;
  address_not_contains: InputMaybe<Scalars['Bytes']>;
  address_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  and: InputMaybe<Array<InputMaybe<PriceRateProvider_Filter>>>;
  cacheDuration: InputMaybe<Scalars['Int']>;
  cacheDuration_gt: InputMaybe<Scalars['Int']>;
  cacheDuration_gte: InputMaybe<Scalars['Int']>;
  cacheDuration_in: InputMaybe<Array<Scalars['Int']>>;
  cacheDuration_lt: InputMaybe<Scalars['Int']>;
  cacheDuration_lte: InputMaybe<Scalars['Int']>;
  cacheDuration_not: InputMaybe<Scalars['Int']>;
  cacheDuration_not_in: InputMaybe<Array<Scalars['Int']>>;
  cacheExpiry: InputMaybe<Scalars['Int']>;
  cacheExpiry_gt: InputMaybe<Scalars['Int']>;
  cacheExpiry_gte: InputMaybe<Scalars['Int']>;
  cacheExpiry_in: InputMaybe<Array<Scalars['Int']>>;
  cacheExpiry_lt: InputMaybe<Scalars['Int']>;
  cacheExpiry_lte: InputMaybe<Scalars['Int']>;
  cacheExpiry_not: InputMaybe<Scalars['Int']>;
  cacheExpiry_not_in: InputMaybe<Array<Scalars['Int']>>;
  id: InputMaybe<Scalars['ID']>;
  id_gt: InputMaybe<Scalars['ID']>;
  id_gte: InputMaybe<Scalars['ID']>;
  id_in: InputMaybe<Array<Scalars['ID']>>;
  id_lt: InputMaybe<Scalars['ID']>;
  id_lte: InputMaybe<Scalars['ID']>;
  id_not: InputMaybe<Scalars['ID']>;
  id_not_in: InputMaybe<Array<Scalars['ID']>>;
  lastCached: InputMaybe<Scalars['Int']>;
  lastCached_gt: InputMaybe<Scalars['Int']>;
  lastCached_gte: InputMaybe<Scalars['Int']>;
  lastCached_in: InputMaybe<Array<Scalars['Int']>>;
  lastCached_lt: InputMaybe<Scalars['Int']>;
  lastCached_lte: InputMaybe<Scalars['Int']>;
  lastCached_not: InputMaybe<Scalars['Int']>;
  lastCached_not_in: InputMaybe<Array<Scalars['Int']>>;
  or: InputMaybe<Array<InputMaybe<PriceRateProvider_Filter>>>;
  poolId: InputMaybe<Scalars['String']>;
  poolId_: InputMaybe<Pool_Filter>;
  poolId_contains: InputMaybe<Scalars['String']>;
  poolId_contains_nocase: InputMaybe<Scalars['String']>;
  poolId_ends_with: InputMaybe<Scalars['String']>;
  poolId_ends_with_nocase: InputMaybe<Scalars['String']>;
  poolId_gt: InputMaybe<Scalars['String']>;
  poolId_gte: InputMaybe<Scalars['String']>;
  poolId_in: InputMaybe<Array<Scalars['String']>>;
  poolId_lt: InputMaybe<Scalars['String']>;
  poolId_lte: InputMaybe<Scalars['String']>;
  poolId_not: InputMaybe<Scalars['String']>;
  poolId_not_contains: InputMaybe<Scalars['String']>;
  poolId_not_contains_nocase: InputMaybe<Scalars['String']>;
  poolId_not_ends_with: InputMaybe<Scalars['String']>;
  poolId_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  poolId_not_in: InputMaybe<Array<Scalars['String']>>;
  poolId_not_starts_with: InputMaybe<Scalars['String']>;
  poolId_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  poolId_starts_with: InputMaybe<Scalars['String']>;
  poolId_starts_with_nocase: InputMaybe<Scalars['String']>;
  rate: InputMaybe<Scalars['BigDecimal']>;
  rate_gt: InputMaybe<Scalars['BigDecimal']>;
  rate_gte: InputMaybe<Scalars['BigDecimal']>;
  rate_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  rate_lt: InputMaybe<Scalars['BigDecimal']>;
  rate_lte: InputMaybe<Scalars['BigDecimal']>;
  rate_not: InputMaybe<Scalars['BigDecimal']>;
  rate_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  token: InputMaybe<Scalars['String']>;
  token_: InputMaybe<PoolToken_Filter>;
  token_contains: InputMaybe<Scalars['String']>;
  token_contains_nocase: InputMaybe<Scalars['String']>;
  token_ends_with: InputMaybe<Scalars['String']>;
  token_ends_with_nocase: InputMaybe<Scalars['String']>;
  token_gt: InputMaybe<Scalars['String']>;
  token_gte: InputMaybe<Scalars['String']>;
  token_in: InputMaybe<Array<Scalars['String']>>;
  token_lt: InputMaybe<Scalars['String']>;
  token_lte: InputMaybe<Scalars['String']>;
  token_not: InputMaybe<Scalars['String']>;
  token_not_contains: InputMaybe<Scalars['String']>;
  token_not_contains_nocase: InputMaybe<Scalars['String']>;
  token_not_ends_with: InputMaybe<Scalars['String']>;
  token_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  token_not_in: InputMaybe<Array<Scalars['String']>>;
  token_not_starts_with: InputMaybe<Scalars['String']>;
  token_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  token_starts_with: InputMaybe<Scalars['String']>;
  token_starts_with_nocase: InputMaybe<Scalars['String']>;
};

export enum PriceRateProvider_OrderBy {
  Address = 'address',
  CacheDuration = 'cacheDuration',
  CacheExpiry = 'cacheExpiry',
  Id = 'id',
  LastCached = 'lastCached',
  PoolId = 'poolId',
  PoolIdAddress = 'poolId__address',
  PoolIdAlpha = 'poolId__alpha',
  PoolIdAmp = 'poolId__amp',
  PoolIdBaseToken = 'poolId__baseToken',
  PoolIdBeta = 'poolId__beta',
  PoolIdC = 'poolId__c',
  PoolIdCreateTime = 'poolId__createTime',
  PoolIdDSq = 'poolId__dSq',
  PoolIdDelta = 'poolId__delta',
  PoolIdEpsilon = 'poolId__epsilon',
  PoolIdExpiryTime = 'poolId__expiryTime',
  PoolIdFactory = 'poolId__factory',
  PoolIdHoldersCount = 'poolId__holdersCount',
  PoolIdId = 'poolId__id',
  PoolIdIsInRecoveryMode = 'poolId__isInRecoveryMode',
  PoolIdIsPaused = 'poolId__isPaused',
  PoolIdJoinExitEnabled = 'poolId__joinExitEnabled',
  PoolIdLambda = 'poolId__lambda',
  PoolIdLastJoinExitAmp = 'poolId__lastJoinExitAmp',
  PoolIdLastPostJoinExitInvariant = 'poolId__lastPostJoinExitInvariant',
  PoolIdLowerTarget = 'poolId__lowerTarget',
  PoolIdMainIndex = 'poolId__mainIndex',
  PoolIdManagementAumFee = 'poolId__managementAumFee',
  PoolIdManagementFee = 'poolId__managementFee',
  PoolIdMustAllowlistLPs = 'poolId__mustAllowlistLPs',
  PoolIdName = 'poolId__name',
  PoolIdOracleEnabled = 'poolId__oracleEnabled',
  PoolIdOwner = 'poolId__owner',
  PoolIdPoolType = 'poolId__poolType',
  PoolIdPoolTypeVersion = 'poolId__poolTypeVersion',
  PoolIdPrincipalToken = 'poolId__principalToken',
  PoolIdProtocolAumFeeCache = 'poolId__protocolAumFeeCache',
  PoolIdProtocolId = 'poolId__protocolId',
  PoolIdProtocolSwapFeeCache = 'poolId__protocolSwapFeeCache',
  PoolIdProtocolYieldFeeCache = 'poolId__protocolYieldFeeCache',
  PoolIdRoot3Alpha = 'poolId__root3Alpha',
  PoolIdS = 'poolId__s',
  PoolIdSqrtAlpha = 'poolId__sqrtAlpha',
  PoolIdSqrtBeta = 'poolId__sqrtBeta',
  PoolIdStrategyType = 'poolId__strategyType',
  PoolIdSwapEnabled = 'poolId__swapEnabled',
  PoolIdSwapFee = 'poolId__swapFee',
  PoolIdSwapsCount = 'poolId__swapsCount',
  PoolIdSymbol = 'poolId__symbol',
  PoolIdTauAlphaX = 'poolId__tauAlphaX',
  PoolIdTauAlphaY = 'poolId__tauAlphaY',
  PoolIdTauBetaX = 'poolId__tauBetaX',
  PoolIdTauBetaY = 'poolId__tauBetaY',
  PoolIdTotalAumFeeCollectedInBpt = 'poolId__totalAumFeeCollectedInBPT',
  PoolIdTotalLiquidity = 'poolId__totalLiquidity',
  PoolIdTotalProtocolFee = 'poolId__totalProtocolFee',
  PoolIdTotalProtocolFeePaidInBpt = 'poolId__totalProtocolFeePaidInBPT',
  PoolIdTotalShares = 'poolId__totalShares',
  PoolIdTotalSwapFee = 'poolId__totalSwapFee',
  PoolIdTotalSwapVolume = 'poolId__totalSwapVolume',
  PoolIdTotalWeight = 'poolId__totalWeight',
  PoolIdTx = 'poolId__tx',
  PoolIdU = 'poolId__u',
  PoolIdUnitSeconds = 'poolId__unitSeconds',
  PoolIdUpperTarget = 'poolId__upperTarget',
  PoolIdV = 'poolId__v',
  PoolIdW = 'poolId__w',
  PoolIdWrappedIndex = 'poolId__wrappedIndex',
  PoolIdZ = 'poolId__z',
  Rate = 'rate',
  Token = 'token',
  TokenAddress = 'token__address',
  TokenAssetManager = 'token__assetManager',
  TokenBalance = 'token__balance',
  TokenCashBalance = 'token__cashBalance',
  TokenDecimals = 'token__decimals',
  TokenId = 'token__id',
  TokenIndex = 'token__index',
  TokenIsExemptFromYieldProtocolFee = 'token__isExemptFromYieldProtocolFee',
  TokenManagedBalance = 'token__managedBalance',
  TokenName = 'token__name',
  TokenOldPriceRate = 'token__oldPriceRate',
  TokenPaidProtocolFees = 'token__paidProtocolFees',
  TokenPriceRate = 'token__priceRate',
  TokenSymbol = 'token__symbol',
  TokenWeight = 'token__weight',
}

export type ProtocolIdData = {
  __typename?: 'ProtocolIdData';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type ProtocolIdData_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<ProtocolIdData_Filter>>>;
  id: InputMaybe<Scalars['ID']>;
  id_gt: InputMaybe<Scalars['ID']>;
  id_gte: InputMaybe<Scalars['ID']>;
  id_in: InputMaybe<Array<Scalars['ID']>>;
  id_lt: InputMaybe<Scalars['ID']>;
  id_lte: InputMaybe<Scalars['ID']>;
  id_not: InputMaybe<Scalars['ID']>;
  id_not_in: InputMaybe<Array<Scalars['ID']>>;
  name: InputMaybe<Scalars['String']>;
  name_contains: InputMaybe<Scalars['String']>;
  name_contains_nocase: InputMaybe<Scalars['String']>;
  name_ends_with: InputMaybe<Scalars['String']>;
  name_ends_with_nocase: InputMaybe<Scalars['String']>;
  name_gt: InputMaybe<Scalars['String']>;
  name_gte: InputMaybe<Scalars['String']>;
  name_in: InputMaybe<Array<Scalars['String']>>;
  name_lt: InputMaybe<Scalars['String']>;
  name_lte: InputMaybe<Scalars['String']>;
  name_not: InputMaybe<Scalars['String']>;
  name_not_contains: InputMaybe<Scalars['String']>;
  name_not_contains_nocase: InputMaybe<Scalars['String']>;
  name_not_ends_with: InputMaybe<Scalars['String']>;
  name_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  name_not_in: InputMaybe<Array<Scalars['String']>>;
  name_not_starts_with: InputMaybe<Scalars['String']>;
  name_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  name_starts_with: InputMaybe<Scalars['String']>;
  name_starts_with_nocase: InputMaybe<Scalars['String']>;
  or: InputMaybe<Array<InputMaybe<ProtocolIdData_Filter>>>;
};

export enum ProtocolIdData_OrderBy {
  Id = 'id',
  Name = 'name',
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta: Maybe<_Meta_>;
  ampUpdate: Maybe<AmpUpdate>;
  ampUpdates: Array<AmpUpdate>;
  balancer: Maybe<Balancer>;
  balancerSnapshot: Maybe<BalancerSnapshot>;
  balancerSnapshots: Array<BalancerSnapshot>;
  balancers: Array<Balancer>;
  circuitBreaker: Maybe<CircuitBreaker>;
  circuitBreakers: Array<CircuitBreaker>;
  gradualWeightUpdate: Maybe<GradualWeightUpdate>;
  gradualWeightUpdates: Array<GradualWeightUpdate>;
  joinExit: Maybe<JoinExit>;
  joinExits: Array<JoinExit>;
  latestPrice: Maybe<LatestPrice>;
  latestPrices: Array<LatestPrice>;
  managementOperation: Maybe<ManagementOperation>;
  managementOperations: Array<ManagementOperation>;
  pool: Maybe<Pool>;
  poolContract: Maybe<PoolContract>;
  poolContracts: Array<PoolContract>;
  poolHistoricalLiquidities: Array<PoolHistoricalLiquidity>;
  poolHistoricalLiquidity: Maybe<PoolHistoricalLiquidity>;
  poolShare: Maybe<PoolShare>;
  poolShares: Array<PoolShare>;
  poolSnapshot: Maybe<PoolSnapshot>;
  poolSnapshots: Array<PoolSnapshot>;
  poolToken: Maybe<PoolToken>;
  poolTokens: Array<PoolToken>;
  pools: Array<Pool>;
  priceRateProvider: Maybe<PriceRateProvider>;
  priceRateProviders: Array<PriceRateProvider>;
  protocolIdData: Maybe<ProtocolIdData>;
  protocolIdDatas: Array<ProtocolIdData>;
  swap: Maybe<Swap>;
  swapFeeUpdate: Maybe<SwapFeeUpdate>;
  swapFeeUpdates: Array<SwapFeeUpdate>;
  swaps: Array<Swap>;
  token: Maybe<Token>;
  tokenPrice: Maybe<TokenPrice>;
  tokenPrices: Array<TokenPrice>;
  tokenSnapshot: Maybe<TokenSnapshot>;
  tokenSnapshots: Array<TokenSnapshot>;
  tokens: Array<Token>;
  tradePair: Maybe<TradePair>;
  tradePairSnapshot: Maybe<TradePairSnapshot>;
  tradePairSnapshots: Array<TradePairSnapshot>;
  tradePairs: Array<TradePair>;
  user: Maybe<User>;
  userInternalBalance: Maybe<UserInternalBalance>;
  userInternalBalances: Array<UserInternalBalance>;
  users: Array<User>;
};

export type Query_MetaArgs = {
  block: InputMaybe<Block_Height>;
};

export type QueryAmpUpdateArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryAmpUpdatesArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<AmpUpdate_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<AmpUpdate_Filter>;
};

export type QueryBalancerArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryBalancerSnapshotArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryBalancerSnapshotsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<BalancerSnapshot_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<BalancerSnapshot_Filter>;
};

export type QueryBalancersArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Balancer_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Balancer_Filter>;
};

export type QueryCircuitBreakerArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryCircuitBreakersArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<CircuitBreaker_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<CircuitBreaker_Filter>;
};

export type QueryGradualWeightUpdateArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryGradualWeightUpdatesArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<GradualWeightUpdate_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<GradualWeightUpdate_Filter>;
};

export type QueryJoinExitArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryJoinExitsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<JoinExit_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<JoinExit_Filter>;
};

export type QueryLatestPriceArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryLatestPricesArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<LatestPrice_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<LatestPrice_Filter>;
};

export type QueryManagementOperationArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryManagementOperationsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<ManagementOperation_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<ManagementOperation_Filter>;
};

export type QueryPoolArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryPoolContractArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryPoolContractsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<PoolContract_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<PoolContract_Filter>;
};

export type QueryPoolHistoricalLiquiditiesArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<PoolHistoricalLiquidity_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<PoolHistoricalLiquidity_Filter>;
};

export type QueryPoolHistoricalLiquidityArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryPoolShareArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryPoolSharesArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<PoolShare_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<PoolShare_Filter>;
};

export type QueryPoolSnapshotArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryPoolSnapshotsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<PoolSnapshot_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<PoolSnapshot_Filter>;
};

export type QueryPoolTokenArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryPoolTokensArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<PoolToken_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<PoolToken_Filter>;
};

export type QueryPoolsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Pool_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Pool_Filter>;
};

export type QueryPriceRateProviderArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryPriceRateProvidersArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<PriceRateProvider_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<PriceRateProvider_Filter>;
};

export type QueryProtocolIdDataArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryProtocolIdDatasArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<ProtocolIdData_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<ProtocolIdData_Filter>;
};

export type QuerySwapArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QuerySwapFeeUpdateArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QuerySwapFeeUpdatesArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<SwapFeeUpdate_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<SwapFeeUpdate_Filter>;
};

export type QuerySwapsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Swap_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Swap_Filter>;
};

export type QueryTokenArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryTokenPriceArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryTokenPricesArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<TokenPrice_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<TokenPrice_Filter>;
};

export type QueryTokenSnapshotArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryTokenSnapshotsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<TokenSnapshot_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<TokenSnapshot_Filter>;
};

export type QueryTokensArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Token_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Token_Filter>;
};

export type QueryTradePairArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryTradePairSnapshotArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryTradePairSnapshotsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<TradePairSnapshot_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<TradePairSnapshot_Filter>;
};

export type QueryTradePairsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<TradePair_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<TradePair_Filter>;
};

export type QueryUserArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryUserInternalBalanceArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type QueryUserInternalBalancesArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<UserInternalBalance_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<UserInternalBalance_Filter>;
};

export type QueryUsersArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<User_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<User_Filter>;
};

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta: Maybe<_Meta_>;
  ampUpdate: Maybe<AmpUpdate>;
  ampUpdates: Array<AmpUpdate>;
  balancer: Maybe<Balancer>;
  balancerSnapshot: Maybe<BalancerSnapshot>;
  balancerSnapshots: Array<BalancerSnapshot>;
  balancers: Array<Balancer>;
  circuitBreaker: Maybe<CircuitBreaker>;
  circuitBreakers: Array<CircuitBreaker>;
  gradualWeightUpdate: Maybe<GradualWeightUpdate>;
  gradualWeightUpdates: Array<GradualWeightUpdate>;
  joinExit: Maybe<JoinExit>;
  joinExits: Array<JoinExit>;
  latestPrice: Maybe<LatestPrice>;
  latestPrices: Array<LatestPrice>;
  managementOperation: Maybe<ManagementOperation>;
  managementOperations: Array<ManagementOperation>;
  pool: Maybe<Pool>;
  poolContract: Maybe<PoolContract>;
  poolContracts: Array<PoolContract>;
  poolHistoricalLiquidities: Array<PoolHistoricalLiquidity>;
  poolHistoricalLiquidity: Maybe<PoolHistoricalLiquidity>;
  poolShare: Maybe<PoolShare>;
  poolShares: Array<PoolShare>;
  poolSnapshot: Maybe<PoolSnapshot>;
  poolSnapshots: Array<PoolSnapshot>;
  poolToken: Maybe<PoolToken>;
  poolTokens: Array<PoolToken>;
  pools: Array<Pool>;
  priceRateProvider: Maybe<PriceRateProvider>;
  priceRateProviders: Array<PriceRateProvider>;
  protocolIdData: Maybe<ProtocolIdData>;
  protocolIdDatas: Array<ProtocolIdData>;
  swap: Maybe<Swap>;
  swapFeeUpdate: Maybe<SwapFeeUpdate>;
  swapFeeUpdates: Array<SwapFeeUpdate>;
  swaps: Array<Swap>;
  token: Maybe<Token>;
  tokenPrice: Maybe<TokenPrice>;
  tokenPrices: Array<TokenPrice>;
  tokenSnapshot: Maybe<TokenSnapshot>;
  tokenSnapshots: Array<TokenSnapshot>;
  tokens: Array<Token>;
  tradePair: Maybe<TradePair>;
  tradePairSnapshot: Maybe<TradePairSnapshot>;
  tradePairSnapshots: Array<TradePairSnapshot>;
  tradePairs: Array<TradePair>;
  user: Maybe<User>;
  userInternalBalance: Maybe<UserInternalBalance>;
  userInternalBalances: Array<UserInternalBalance>;
  users: Array<User>;
};

export type Subscription_MetaArgs = {
  block: InputMaybe<Block_Height>;
};

export type SubscriptionAmpUpdateArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionAmpUpdatesArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<AmpUpdate_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<AmpUpdate_Filter>;
};

export type SubscriptionBalancerArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionBalancerSnapshotArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionBalancerSnapshotsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<BalancerSnapshot_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<BalancerSnapshot_Filter>;
};

export type SubscriptionBalancersArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Balancer_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Balancer_Filter>;
};

export type SubscriptionCircuitBreakerArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionCircuitBreakersArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<CircuitBreaker_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<CircuitBreaker_Filter>;
};

export type SubscriptionGradualWeightUpdateArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionGradualWeightUpdatesArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<GradualWeightUpdate_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<GradualWeightUpdate_Filter>;
};

export type SubscriptionJoinExitArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionJoinExitsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<JoinExit_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<JoinExit_Filter>;
};

export type SubscriptionLatestPriceArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionLatestPricesArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<LatestPrice_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<LatestPrice_Filter>;
};

export type SubscriptionManagementOperationArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionManagementOperationsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<ManagementOperation_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<ManagementOperation_Filter>;
};

export type SubscriptionPoolArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionPoolContractArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionPoolContractsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<PoolContract_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<PoolContract_Filter>;
};

export type SubscriptionPoolHistoricalLiquiditiesArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<PoolHistoricalLiquidity_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<PoolHistoricalLiquidity_Filter>;
};

export type SubscriptionPoolHistoricalLiquidityArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionPoolShareArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionPoolSharesArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<PoolShare_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<PoolShare_Filter>;
};

export type SubscriptionPoolSnapshotArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionPoolSnapshotsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<PoolSnapshot_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<PoolSnapshot_Filter>;
};

export type SubscriptionPoolTokenArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionPoolTokensArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<PoolToken_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<PoolToken_Filter>;
};

export type SubscriptionPoolsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Pool_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Pool_Filter>;
};

export type SubscriptionPriceRateProviderArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionPriceRateProvidersArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<PriceRateProvider_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<PriceRateProvider_Filter>;
};

export type SubscriptionProtocolIdDataArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionProtocolIdDatasArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<ProtocolIdData_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<ProtocolIdData_Filter>;
};

export type SubscriptionSwapArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionSwapFeeUpdateArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionSwapFeeUpdatesArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<SwapFeeUpdate_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<SwapFeeUpdate_Filter>;
};

export type SubscriptionSwapsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Swap_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Swap_Filter>;
};

export type SubscriptionTokenArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionTokenPriceArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionTokenPricesArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<TokenPrice_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<TokenPrice_Filter>;
};

export type SubscriptionTokenSnapshotArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionTokenSnapshotsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<TokenSnapshot_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<TokenSnapshot_Filter>;
};

export type SubscriptionTokensArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Token_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Token_Filter>;
};

export type SubscriptionTradePairArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionTradePairSnapshotArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionTradePairSnapshotsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<TradePairSnapshot_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<TradePairSnapshot_Filter>;
};

export type SubscriptionTradePairsArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<TradePair_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<TradePair_Filter>;
};

export type SubscriptionUserArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionUserInternalBalanceArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};

export type SubscriptionUserInternalBalancesArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<UserInternalBalance_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<UserInternalBalance_Filter>;
};

export type SubscriptionUsersArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<User_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<User_Filter>;
};

export type Swap = {
  __typename?: 'Swap';
  caller: Scalars['Bytes'];
  id: Scalars['ID'];
  poolId: Pool;
  timestamp: Scalars['Int'];
  tokenAmountIn: Scalars['BigDecimal'];
  tokenAmountOut: Scalars['BigDecimal'];
  tokenIn: Scalars['Bytes'];
  tokenInSym: Scalars['String'];
  tokenOut: Scalars['Bytes'];
  tokenOutSym: Scalars['String'];
  tx: Scalars['Bytes'];
  userAddress: User;
  valueUSD: Scalars['BigDecimal'];
};

export type SwapFeeUpdate = {
  __typename?: 'SwapFeeUpdate';
  endSwapFeePercentage: Scalars['BigDecimal'];
  endTimestamp: Scalars['BigInt'];
  id: Scalars['ID'];
  pool: Pool;
  scheduledTimestamp: Scalars['Int'];
  startSwapFeePercentage: Scalars['BigDecimal'];
  startTimestamp: Scalars['BigInt'];
};

export type SwapFeeUpdate_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<SwapFeeUpdate_Filter>>>;
  endSwapFeePercentage: InputMaybe<Scalars['BigDecimal']>;
  endSwapFeePercentage_gt: InputMaybe<Scalars['BigDecimal']>;
  endSwapFeePercentage_gte: InputMaybe<Scalars['BigDecimal']>;
  endSwapFeePercentage_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  endSwapFeePercentage_lt: InputMaybe<Scalars['BigDecimal']>;
  endSwapFeePercentage_lte: InputMaybe<Scalars['BigDecimal']>;
  endSwapFeePercentage_not: InputMaybe<Scalars['BigDecimal']>;
  endSwapFeePercentage_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  endTimestamp: InputMaybe<Scalars['BigInt']>;
  endTimestamp_gt: InputMaybe<Scalars['BigInt']>;
  endTimestamp_gte: InputMaybe<Scalars['BigInt']>;
  endTimestamp_in: InputMaybe<Array<Scalars['BigInt']>>;
  endTimestamp_lt: InputMaybe<Scalars['BigInt']>;
  endTimestamp_lte: InputMaybe<Scalars['BigInt']>;
  endTimestamp_not: InputMaybe<Scalars['BigInt']>;
  endTimestamp_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  id: InputMaybe<Scalars['ID']>;
  id_gt: InputMaybe<Scalars['ID']>;
  id_gte: InputMaybe<Scalars['ID']>;
  id_in: InputMaybe<Array<Scalars['ID']>>;
  id_lt: InputMaybe<Scalars['ID']>;
  id_lte: InputMaybe<Scalars['ID']>;
  id_not: InputMaybe<Scalars['ID']>;
  id_not_in: InputMaybe<Array<Scalars['ID']>>;
  or: InputMaybe<Array<InputMaybe<SwapFeeUpdate_Filter>>>;
  pool: InputMaybe<Scalars['String']>;
  pool_: InputMaybe<Pool_Filter>;
  pool_contains: InputMaybe<Scalars['String']>;
  pool_contains_nocase: InputMaybe<Scalars['String']>;
  pool_ends_with: InputMaybe<Scalars['String']>;
  pool_ends_with_nocase: InputMaybe<Scalars['String']>;
  pool_gt: InputMaybe<Scalars['String']>;
  pool_gte: InputMaybe<Scalars['String']>;
  pool_in: InputMaybe<Array<Scalars['String']>>;
  pool_lt: InputMaybe<Scalars['String']>;
  pool_lte: InputMaybe<Scalars['String']>;
  pool_not: InputMaybe<Scalars['String']>;
  pool_not_contains: InputMaybe<Scalars['String']>;
  pool_not_contains_nocase: InputMaybe<Scalars['String']>;
  pool_not_ends_with: InputMaybe<Scalars['String']>;
  pool_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  pool_not_in: InputMaybe<Array<Scalars['String']>>;
  pool_not_starts_with: InputMaybe<Scalars['String']>;
  pool_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  pool_starts_with: InputMaybe<Scalars['String']>;
  pool_starts_with_nocase: InputMaybe<Scalars['String']>;
  scheduledTimestamp: InputMaybe<Scalars['Int']>;
  scheduledTimestamp_gt: InputMaybe<Scalars['Int']>;
  scheduledTimestamp_gte: InputMaybe<Scalars['Int']>;
  scheduledTimestamp_in: InputMaybe<Array<Scalars['Int']>>;
  scheduledTimestamp_lt: InputMaybe<Scalars['Int']>;
  scheduledTimestamp_lte: InputMaybe<Scalars['Int']>;
  scheduledTimestamp_not: InputMaybe<Scalars['Int']>;
  scheduledTimestamp_not_in: InputMaybe<Array<Scalars['Int']>>;
  startSwapFeePercentage: InputMaybe<Scalars['BigDecimal']>;
  startSwapFeePercentage_gt: InputMaybe<Scalars['BigDecimal']>;
  startSwapFeePercentage_gte: InputMaybe<Scalars['BigDecimal']>;
  startSwapFeePercentage_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  startSwapFeePercentage_lt: InputMaybe<Scalars['BigDecimal']>;
  startSwapFeePercentage_lte: InputMaybe<Scalars['BigDecimal']>;
  startSwapFeePercentage_not: InputMaybe<Scalars['BigDecimal']>;
  startSwapFeePercentage_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  startTimestamp: InputMaybe<Scalars['BigInt']>;
  startTimestamp_gt: InputMaybe<Scalars['BigInt']>;
  startTimestamp_gte: InputMaybe<Scalars['BigInt']>;
  startTimestamp_in: InputMaybe<Array<Scalars['BigInt']>>;
  startTimestamp_lt: InputMaybe<Scalars['BigInt']>;
  startTimestamp_lte: InputMaybe<Scalars['BigInt']>;
  startTimestamp_not: InputMaybe<Scalars['BigInt']>;
  startTimestamp_not_in: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum SwapFeeUpdate_OrderBy {
  EndSwapFeePercentage = 'endSwapFeePercentage',
  EndTimestamp = 'endTimestamp',
  Id = 'id',
  Pool = 'pool',
  PoolAddress = 'pool__address',
  PoolAlpha = 'pool__alpha',
  PoolAmp = 'pool__amp',
  PoolBaseToken = 'pool__baseToken',
  PoolBeta = 'pool__beta',
  PoolC = 'pool__c',
  PoolCreateTime = 'pool__createTime',
  PoolDSq = 'pool__dSq',
  PoolDelta = 'pool__delta',
  PoolEpsilon = 'pool__epsilon',
  PoolExpiryTime = 'pool__expiryTime',
  PoolFactory = 'pool__factory',
  PoolHoldersCount = 'pool__holdersCount',
  PoolId = 'pool__id',
  PoolIsInRecoveryMode = 'pool__isInRecoveryMode',
  PoolIsPaused = 'pool__isPaused',
  PoolJoinExitEnabled = 'pool__joinExitEnabled',
  PoolLambda = 'pool__lambda',
  PoolLastJoinExitAmp = 'pool__lastJoinExitAmp',
  PoolLastPostJoinExitInvariant = 'pool__lastPostJoinExitInvariant',
  PoolLowerTarget = 'pool__lowerTarget',
  PoolMainIndex = 'pool__mainIndex',
  PoolManagementAumFee = 'pool__managementAumFee',
  PoolManagementFee = 'pool__managementFee',
  PoolMustAllowlistLPs = 'pool__mustAllowlistLPs',
  PoolName = 'pool__name',
  PoolOracleEnabled = 'pool__oracleEnabled',
  PoolOwner = 'pool__owner',
  PoolPoolType = 'pool__poolType',
  PoolPoolTypeVersion = 'pool__poolTypeVersion',
  PoolPrincipalToken = 'pool__principalToken',
  PoolProtocolAumFeeCache = 'pool__protocolAumFeeCache',
  PoolProtocolId = 'pool__protocolId',
  PoolProtocolSwapFeeCache = 'pool__protocolSwapFeeCache',
  PoolProtocolYieldFeeCache = 'pool__protocolYieldFeeCache',
  PoolRoot3Alpha = 'pool__root3Alpha',
  PoolS = 'pool__s',
  PoolSqrtAlpha = 'pool__sqrtAlpha',
  PoolSqrtBeta = 'pool__sqrtBeta',
  PoolStrategyType = 'pool__strategyType',
  PoolSwapEnabled = 'pool__swapEnabled',
  PoolSwapFee = 'pool__swapFee',
  PoolSwapsCount = 'pool__swapsCount',
  PoolSymbol = 'pool__symbol',
  PoolTauAlphaX = 'pool__tauAlphaX',
  PoolTauAlphaY = 'pool__tauAlphaY',
  PoolTauBetaX = 'pool__tauBetaX',
  PoolTauBetaY = 'pool__tauBetaY',
  PoolTotalAumFeeCollectedInBpt = 'pool__totalAumFeeCollectedInBPT',
  PoolTotalLiquidity = 'pool__totalLiquidity',
  PoolTotalProtocolFee = 'pool__totalProtocolFee',
  PoolTotalProtocolFeePaidInBpt = 'pool__totalProtocolFeePaidInBPT',
  PoolTotalShares = 'pool__totalShares',
  PoolTotalSwapFee = 'pool__totalSwapFee',
  PoolTotalSwapVolume = 'pool__totalSwapVolume',
  PoolTotalWeight = 'pool__totalWeight',
  PoolTx = 'pool__tx',
  PoolU = 'pool__u',
  PoolUnitSeconds = 'pool__unitSeconds',
  PoolUpperTarget = 'pool__upperTarget',
  PoolV = 'pool__v',
  PoolW = 'pool__w',
  PoolWrappedIndex = 'pool__wrappedIndex',
  PoolZ = 'pool__z',
  ScheduledTimestamp = 'scheduledTimestamp',
  StartSwapFeePercentage = 'startSwapFeePercentage',
  StartTimestamp = 'startTimestamp',
}

export type Swap_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<Swap_Filter>>>;
  caller: InputMaybe<Scalars['Bytes']>;
  caller_contains: InputMaybe<Scalars['Bytes']>;
  caller_gt: InputMaybe<Scalars['Bytes']>;
  caller_gte: InputMaybe<Scalars['Bytes']>;
  caller_in: InputMaybe<Array<Scalars['Bytes']>>;
  caller_lt: InputMaybe<Scalars['Bytes']>;
  caller_lte: InputMaybe<Scalars['Bytes']>;
  caller_not: InputMaybe<Scalars['Bytes']>;
  caller_not_contains: InputMaybe<Scalars['Bytes']>;
  caller_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  id: InputMaybe<Scalars['ID']>;
  id_gt: InputMaybe<Scalars['ID']>;
  id_gte: InputMaybe<Scalars['ID']>;
  id_in: InputMaybe<Array<Scalars['ID']>>;
  id_lt: InputMaybe<Scalars['ID']>;
  id_lte: InputMaybe<Scalars['ID']>;
  id_not: InputMaybe<Scalars['ID']>;
  id_not_in: InputMaybe<Array<Scalars['ID']>>;
  or: InputMaybe<Array<InputMaybe<Swap_Filter>>>;
  poolId: InputMaybe<Scalars['String']>;
  poolId_: InputMaybe<Pool_Filter>;
  poolId_contains: InputMaybe<Scalars['String']>;
  poolId_contains_nocase: InputMaybe<Scalars['String']>;
  poolId_ends_with: InputMaybe<Scalars['String']>;
  poolId_ends_with_nocase: InputMaybe<Scalars['String']>;
  poolId_gt: InputMaybe<Scalars['String']>;
  poolId_gte: InputMaybe<Scalars['String']>;
  poolId_in: InputMaybe<Array<Scalars['String']>>;
  poolId_lt: InputMaybe<Scalars['String']>;
  poolId_lte: InputMaybe<Scalars['String']>;
  poolId_not: InputMaybe<Scalars['String']>;
  poolId_not_contains: InputMaybe<Scalars['String']>;
  poolId_not_contains_nocase: InputMaybe<Scalars['String']>;
  poolId_not_ends_with: InputMaybe<Scalars['String']>;
  poolId_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  poolId_not_in: InputMaybe<Array<Scalars['String']>>;
  poolId_not_starts_with: InputMaybe<Scalars['String']>;
  poolId_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  poolId_starts_with: InputMaybe<Scalars['String']>;
  poolId_starts_with_nocase: InputMaybe<Scalars['String']>;
  timestamp: InputMaybe<Scalars['Int']>;
  timestamp_gt: InputMaybe<Scalars['Int']>;
  timestamp_gte: InputMaybe<Scalars['Int']>;
  timestamp_in: InputMaybe<Array<Scalars['Int']>>;
  timestamp_lt: InputMaybe<Scalars['Int']>;
  timestamp_lte: InputMaybe<Scalars['Int']>;
  timestamp_not: InputMaybe<Scalars['Int']>;
  timestamp_not_in: InputMaybe<Array<Scalars['Int']>>;
  tokenAmountIn: InputMaybe<Scalars['BigDecimal']>;
  tokenAmountIn_gt: InputMaybe<Scalars['BigDecimal']>;
  tokenAmountIn_gte: InputMaybe<Scalars['BigDecimal']>;
  tokenAmountIn_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  tokenAmountIn_lt: InputMaybe<Scalars['BigDecimal']>;
  tokenAmountIn_lte: InputMaybe<Scalars['BigDecimal']>;
  tokenAmountIn_not: InputMaybe<Scalars['BigDecimal']>;
  tokenAmountIn_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  tokenAmountOut: InputMaybe<Scalars['BigDecimal']>;
  tokenAmountOut_gt: InputMaybe<Scalars['BigDecimal']>;
  tokenAmountOut_gte: InputMaybe<Scalars['BigDecimal']>;
  tokenAmountOut_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  tokenAmountOut_lt: InputMaybe<Scalars['BigDecimal']>;
  tokenAmountOut_lte: InputMaybe<Scalars['BigDecimal']>;
  tokenAmountOut_not: InputMaybe<Scalars['BigDecimal']>;
  tokenAmountOut_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  tokenIn: InputMaybe<Scalars['Bytes']>;
  tokenInSym: InputMaybe<Scalars['String']>;
  tokenInSym_contains: InputMaybe<Scalars['String']>;
  tokenInSym_contains_nocase: InputMaybe<Scalars['String']>;
  tokenInSym_ends_with: InputMaybe<Scalars['String']>;
  tokenInSym_ends_with_nocase: InputMaybe<Scalars['String']>;
  tokenInSym_gt: InputMaybe<Scalars['String']>;
  tokenInSym_gte: InputMaybe<Scalars['String']>;
  tokenInSym_in: InputMaybe<Array<Scalars['String']>>;
  tokenInSym_lt: InputMaybe<Scalars['String']>;
  tokenInSym_lte: InputMaybe<Scalars['String']>;
  tokenInSym_not: InputMaybe<Scalars['String']>;
  tokenInSym_not_contains: InputMaybe<Scalars['String']>;
  tokenInSym_not_contains_nocase: InputMaybe<Scalars['String']>;
  tokenInSym_not_ends_with: InputMaybe<Scalars['String']>;
  tokenInSym_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  tokenInSym_not_in: InputMaybe<Array<Scalars['String']>>;
  tokenInSym_not_starts_with: InputMaybe<Scalars['String']>;
  tokenInSym_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  tokenInSym_starts_with: InputMaybe<Scalars['String']>;
  tokenInSym_starts_with_nocase: InputMaybe<Scalars['String']>;
  tokenIn_contains: InputMaybe<Scalars['Bytes']>;
  tokenIn_gt: InputMaybe<Scalars['Bytes']>;
  tokenIn_gte: InputMaybe<Scalars['Bytes']>;
  tokenIn_in: InputMaybe<Array<Scalars['Bytes']>>;
  tokenIn_lt: InputMaybe<Scalars['Bytes']>;
  tokenIn_lte: InputMaybe<Scalars['Bytes']>;
  tokenIn_not: InputMaybe<Scalars['Bytes']>;
  tokenIn_not_contains: InputMaybe<Scalars['Bytes']>;
  tokenIn_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  tokenOut: InputMaybe<Scalars['Bytes']>;
  tokenOutSym: InputMaybe<Scalars['String']>;
  tokenOutSym_contains: InputMaybe<Scalars['String']>;
  tokenOutSym_contains_nocase: InputMaybe<Scalars['String']>;
  tokenOutSym_ends_with: InputMaybe<Scalars['String']>;
  tokenOutSym_ends_with_nocase: InputMaybe<Scalars['String']>;
  tokenOutSym_gt: InputMaybe<Scalars['String']>;
  tokenOutSym_gte: InputMaybe<Scalars['String']>;
  tokenOutSym_in: InputMaybe<Array<Scalars['String']>>;
  tokenOutSym_lt: InputMaybe<Scalars['String']>;
  tokenOutSym_lte: InputMaybe<Scalars['String']>;
  tokenOutSym_not: InputMaybe<Scalars['String']>;
  tokenOutSym_not_contains: InputMaybe<Scalars['String']>;
  tokenOutSym_not_contains_nocase: InputMaybe<Scalars['String']>;
  tokenOutSym_not_ends_with: InputMaybe<Scalars['String']>;
  tokenOutSym_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  tokenOutSym_not_in: InputMaybe<Array<Scalars['String']>>;
  tokenOutSym_not_starts_with: InputMaybe<Scalars['String']>;
  tokenOutSym_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  tokenOutSym_starts_with: InputMaybe<Scalars['String']>;
  tokenOutSym_starts_with_nocase: InputMaybe<Scalars['String']>;
  tokenOut_contains: InputMaybe<Scalars['Bytes']>;
  tokenOut_gt: InputMaybe<Scalars['Bytes']>;
  tokenOut_gte: InputMaybe<Scalars['Bytes']>;
  tokenOut_in: InputMaybe<Array<Scalars['Bytes']>>;
  tokenOut_lt: InputMaybe<Scalars['Bytes']>;
  tokenOut_lte: InputMaybe<Scalars['Bytes']>;
  tokenOut_not: InputMaybe<Scalars['Bytes']>;
  tokenOut_not_contains: InputMaybe<Scalars['Bytes']>;
  tokenOut_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  tx: InputMaybe<Scalars['Bytes']>;
  tx_contains: InputMaybe<Scalars['Bytes']>;
  tx_gt: InputMaybe<Scalars['Bytes']>;
  tx_gte: InputMaybe<Scalars['Bytes']>;
  tx_in: InputMaybe<Array<Scalars['Bytes']>>;
  tx_lt: InputMaybe<Scalars['Bytes']>;
  tx_lte: InputMaybe<Scalars['Bytes']>;
  tx_not: InputMaybe<Scalars['Bytes']>;
  tx_not_contains: InputMaybe<Scalars['Bytes']>;
  tx_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  userAddress: InputMaybe<Scalars['String']>;
  userAddress_: InputMaybe<User_Filter>;
  userAddress_contains: InputMaybe<Scalars['String']>;
  userAddress_contains_nocase: InputMaybe<Scalars['String']>;
  userAddress_ends_with: InputMaybe<Scalars['String']>;
  userAddress_ends_with_nocase: InputMaybe<Scalars['String']>;
  userAddress_gt: InputMaybe<Scalars['String']>;
  userAddress_gte: InputMaybe<Scalars['String']>;
  userAddress_in: InputMaybe<Array<Scalars['String']>>;
  userAddress_lt: InputMaybe<Scalars['String']>;
  userAddress_lte: InputMaybe<Scalars['String']>;
  userAddress_not: InputMaybe<Scalars['String']>;
  userAddress_not_contains: InputMaybe<Scalars['String']>;
  userAddress_not_contains_nocase: InputMaybe<Scalars['String']>;
  userAddress_not_ends_with: InputMaybe<Scalars['String']>;
  userAddress_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  userAddress_not_in: InputMaybe<Array<Scalars['String']>>;
  userAddress_not_starts_with: InputMaybe<Scalars['String']>;
  userAddress_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  userAddress_starts_with: InputMaybe<Scalars['String']>;
  userAddress_starts_with_nocase: InputMaybe<Scalars['String']>;
  valueUSD: InputMaybe<Scalars['BigDecimal']>;
  valueUSD_gt: InputMaybe<Scalars['BigDecimal']>;
  valueUSD_gte: InputMaybe<Scalars['BigDecimal']>;
  valueUSD_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  valueUSD_lt: InputMaybe<Scalars['BigDecimal']>;
  valueUSD_lte: InputMaybe<Scalars['BigDecimal']>;
  valueUSD_not: InputMaybe<Scalars['BigDecimal']>;
  valueUSD_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export enum Swap_OrderBy {
  Caller = 'caller',
  Id = 'id',
  PoolId = 'poolId',
  PoolIdAddress = 'poolId__address',
  PoolIdAlpha = 'poolId__alpha',
  PoolIdAmp = 'poolId__amp',
  PoolIdBaseToken = 'poolId__baseToken',
  PoolIdBeta = 'poolId__beta',
  PoolIdC = 'poolId__c',
  PoolIdCreateTime = 'poolId__createTime',
  PoolIdDSq = 'poolId__dSq',
  PoolIdDelta = 'poolId__delta',
  PoolIdEpsilon = 'poolId__epsilon',
  PoolIdExpiryTime = 'poolId__expiryTime',
  PoolIdFactory = 'poolId__factory',
  PoolIdHoldersCount = 'poolId__holdersCount',
  PoolIdId = 'poolId__id',
  PoolIdIsInRecoveryMode = 'poolId__isInRecoveryMode',
  PoolIdIsPaused = 'poolId__isPaused',
  PoolIdJoinExitEnabled = 'poolId__joinExitEnabled',
  PoolIdLambda = 'poolId__lambda',
  PoolIdLastJoinExitAmp = 'poolId__lastJoinExitAmp',
  PoolIdLastPostJoinExitInvariant = 'poolId__lastPostJoinExitInvariant',
  PoolIdLowerTarget = 'poolId__lowerTarget',
  PoolIdMainIndex = 'poolId__mainIndex',
  PoolIdManagementAumFee = 'poolId__managementAumFee',
  PoolIdManagementFee = 'poolId__managementFee',
  PoolIdMustAllowlistLPs = 'poolId__mustAllowlistLPs',
  PoolIdName = 'poolId__name',
  PoolIdOracleEnabled = 'poolId__oracleEnabled',
  PoolIdOwner = 'poolId__owner',
  PoolIdPoolType = 'poolId__poolType',
  PoolIdPoolTypeVersion = 'poolId__poolTypeVersion',
  PoolIdPrincipalToken = 'poolId__principalToken',
  PoolIdProtocolAumFeeCache = 'poolId__protocolAumFeeCache',
  PoolIdProtocolId = 'poolId__protocolId',
  PoolIdProtocolSwapFeeCache = 'poolId__protocolSwapFeeCache',
  PoolIdProtocolYieldFeeCache = 'poolId__protocolYieldFeeCache',
  PoolIdRoot3Alpha = 'poolId__root3Alpha',
  PoolIdS = 'poolId__s',
  PoolIdSqrtAlpha = 'poolId__sqrtAlpha',
  PoolIdSqrtBeta = 'poolId__sqrtBeta',
  PoolIdStrategyType = 'poolId__strategyType',
  PoolIdSwapEnabled = 'poolId__swapEnabled',
  PoolIdSwapFee = 'poolId__swapFee',
  PoolIdSwapsCount = 'poolId__swapsCount',
  PoolIdSymbol = 'poolId__symbol',
  PoolIdTauAlphaX = 'poolId__tauAlphaX',
  PoolIdTauAlphaY = 'poolId__tauAlphaY',
  PoolIdTauBetaX = 'poolId__tauBetaX',
  PoolIdTauBetaY = 'poolId__tauBetaY',
  PoolIdTotalAumFeeCollectedInBpt = 'poolId__totalAumFeeCollectedInBPT',
  PoolIdTotalLiquidity = 'poolId__totalLiquidity',
  PoolIdTotalProtocolFee = 'poolId__totalProtocolFee',
  PoolIdTotalProtocolFeePaidInBpt = 'poolId__totalProtocolFeePaidInBPT',
  PoolIdTotalShares = 'poolId__totalShares',
  PoolIdTotalSwapFee = 'poolId__totalSwapFee',
  PoolIdTotalSwapVolume = 'poolId__totalSwapVolume',
  PoolIdTotalWeight = 'poolId__totalWeight',
  PoolIdTx = 'poolId__tx',
  PoolIdU = 'poolId__u',
  PoolIdUnitSeconds = 'poolId__unitSeconds',
  PoolIdUpperTarget = 'poolId__upperTarget',
  PoolIdV = 'poolId__v',
  PoolIdW = 'poolId__w',
  PoolIdWrappedIndex = 'poolId__wrappedIndex',
  PoolIdZ = 'poolId__z',
  Timestamp = 'timestamp',
  TokenAmountIn = 'tokenAmountIn',
  TokenAmountOut = 'tokenAmountOut',
  TokenIn = 'tokenIn',
  TokenInSym = 'tokenInSym',
  TokenOut = 'tokenOut',
  TokenOutSym = 'tokenOutSym',
  Tx = 'tx',
  UserAddress = 'userAddress',
  UserAddressId = 'userAddress__id',
  ValueUsd = 'valueUSD',
}

export type Token = {
  __typename?: 'Token';
  address: Scalars['String'];
  decimals: Scalars['Int'];
  fxOracleDecimals: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  latestFXPrice: Maybe<Scalars['BigDecimal']>;
  latestPrice: Maybe<LatestPrice>;
  latestUSDPrice: Maybe<Scalars['BigDecimal']>;
  latestUSDPriceTimestamp: Maybe<Scalars['BigInt']>;
  name: Maybe<Scalars['String']>;
  pool: Maybe<Pool>;
  symbol: Maybe<Scalars['String']>;
  totalBalanceNotional: Scalars['BigDecimal'];
  totalBalanceUSD: Scalars['BigDecimal'];
  totalSwapCount: Scalars['BigInt'];
  totalVolumeNotional: Scalars['BigDecimal'];
  totalVolumeUSD: Scalars['BigDecimal'];
};

export type TokenPrice = {
  __typename?: 'TokenPrice';
  amount: Scalars['BigDecimal'];
  asset: Scalars['Bytes'];
  block: Scalars['BigInt'];
  id: Scalars['ID'];
  poolId: Pool;
  price: Scalars['BigDecimal'];
  pricingAsset: Scalars['Bytes'];
  timestamp: Scalars['Int'];
};

export type TokenPrice_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  amount: InputMaybe<Scalars['BigDecimal']>;
  amount_gt: InputMaybe<Scalars['BigDecimal']>;
  amount_gte: InputMaybe<Scalars['BigDecimal']>;
  amount_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  amount_lt: InputMaybe<Scalars['BigDecimal']>;
  amount_lte: InputMaybe<Scalars['BigDecimal']>;
  amount_not: InputMaybe<Scalars['BigDecimal']>;
  amount_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  and: InputMaybe<Array<InputMaybe<TokenPrice_Filter>>>;
  asset: InputMaybe<Scalars['Bytes']>;
  asset_contains: InputMaybe<Scalars['Bytes']>;
  asset_gt: InputMaybe<Scalars['Bytes']>;
  asset_gte: InputMaybe<Scalars['Bytes']>;
  asset_in: InputMaybe<Array<Scalars['Bytes']>>;
  asset_lt: InputMaybe<Scalars['Bytes']>;
  asset_lte: InputMaybe<Scalars['Bytes']>;
  asset_not: InputMaybe<Scalars['Bytes']>;
  asset_not_contains: InputMaybe<Scalars['Bytes']>;
  asset_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  block: InputMaybe<Scalars['BigInt']>;
  block_gt: InputMaybe<Scalars['BigInt']>;
  block_gte: InputMaybe<Scalars['BigInt']>;
  block_in: InputMaybe<Array<Scalars['BigInt']>>;
  block_lt: InputMaybe<Scalars['BigInt']>;
  block_lte: InputMaybe<Scalars['BigInt']>;
  block_not: InputMaybe<Scalars['BigInt']>;
  block_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  id: InputMaybe<Scalars['ID']>;
  id_gt: InputMaybe<Scalars['ID']>;
  id_gte: InputMaybe<Scalars['ID']>;
  id_in: InputMaybe<Array<Scalars['ID']>>;
  id_lt: InputMaybe<Scalars['ID']>;
  id_lte: InputMaybe<Scalars['ID']>;
  id_not: InputMaybe<Scalars['ID']>;
  id_not_in: InputMaybe<Array<Scalars['ID']>>;
  or: InputMaybe<Array<InputMaybe<TokenPrice_Filter>>>;
  poolId: InputMaybe<Scalars['String']>;
  poolId_: InputMaybe<Pool_Filter>;
  poolId_contains: InputMaybe<Scalars['String']>;
  poolId_contains_nocase: InputMaybe<Scalars['String']>;
  poolId_ends_with: InputMaybe<Scalars['String']>;
  poolId_ends_with_nocase: InputMaybe<Scalars['String']>;
  poolId_gt: InputMaybe<Scalars['String']>;
  poolId_gte: InputMaybe<Scalars['String']>;
  poolId_in: InputMaybe<Array<Scalars['String']>>;
  poolId_lt: InputMaybe<Scalars['String']>;
  poolId_lte: InputMaybe<Scalars['String']>;
  poolId_not: InputMaybe<Scalars['String']>;
  poolId_not_contains: InputMaybe<Scalars['String']>;
  poolId_not_contains_nocase: InputMaybe<Scalars['String']>;
  poolId_not_ends_with: InputMaybe<Scalars['String']>;
  poolId_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  poolId_not_in: InputMaybe<Array<Scalars['String']>>;
  poolId_not_starts_with: InputMaybe<Scalars['String']>;
  poolId_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  poolId_starts_with: InputMaybe<Scalars['String']>;
  poolId_starts_with_nocase: InputMaybe<Scalars['String']>;
  price: InputMaybe<Scalars['BigDecimal']>;
  price_gt: InputMaybe<Scalars['BigDecimal']>;
  price_gte: InputMaybe<Scalars['BigDecimal']>;
  price_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  price_lt: InputMaybe<Scalars['BigDecimal']>;
  price_lte: InputMaybe<Scalars['BigDecimal']>;
  price_not: InputMaybe<Scalars['BigDecimal']>;
  price_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  pricingAsset: InputMaybe<Scalars['Bytes']>;
  pricingAsset_contains: InputMaybe<Scalars['Bytes']>;
  pricingAsset_gt: InputMaybe<Scalars['Bytes']>;
  pricingAsset_gte: InputMaybe<Scalars['Bytes']>;
  pricingAsset_in: InputMaybe<Array<Scalars['Bytes']>>;
  pricingAsset_lt: InputMaybe<Scalars['Bytes']>;
  pricingAsset_lte: InputMaybe<Scalars['Bytes']>;
  pricingAsset_not: InputMaybe<Scalars['Bytes']>;
  pricingAsset_not_contains: InputMaybe<Scalars['Bytes']>;
  pricingAsset_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  timestamp: InputMaybe<Scalars['Int']>;
  timestamp_gt: InputMaybe<Scalars['Int']>;
  timestamp_gte: InputMaybe<Scalars['Int']>;
  timestamp_in: InputMaybe<Array<Scalars['Int']>>;
  timestamp_lt: InputMaybe<Scalars['Int']>;
  timestamp_lte: InputMaybe<Scalars['Int']>;
  timestamp_not: InputMaybe<Scalars['Int']>;
  timestamp_not_in: InputMaybe<Array<Scalars['Int']>>;
};

export enum TokenPrice_OrderBy {
  Amount = 'amount',
  Asset = 'asset',
  Block = 'block',
  Id = 'id',
  PoolId = 'poolId',
  PoolIdAddress = 'poolId__address',
  PoolIdAlpha = 'poolId__alpha',
  PoolIdAmp = 'poolId__amp',
  PoolIdBaseToken = 'poolId__baseToken',
  PoolIdBeta = 'poolId__beta',
  PoolIdC = 'poolId__c',
  PoolIdCreateTime = 'poolId__createTime',
  PoolIdDSq = 'poolId__dSq',
  PoolIdDelta = 'poolId__delta',
  PoolIdEpsilon = 'poolId__epsilon',
  PoolIdExpiryTime = 'poolId__expiryTime',
  PoolIdFactory = 'poolId__factory',
  PoolIdHoldersCount = 'poolId__holdersCount',
  PoolIdId = 'poolId__id',
  PoolIdIsInRecoveryMode = 'poolId__isInRecoveryMode',
  PoolIdIsPaused = 'poolId__isPaused',
  PoolIdJoinExitEnabled = 'poolId__joinExitEnabled',
  PoolIdLambda = 'poolId__lambda',
  PoolIdLastJoinExitAmp = 'poolId__lastJoinExitAmp',
  PoolIdLastPostJoinExitInvariant = 'poolId__lastPostJoinExitInvariant',
  PoolIdLowerTarget = 'poolId__lowerTarget',
  PoolIdMainIndex = 'poolId__mainIndex',
  PoolIdManagementAumFee = 'poolId__managementAumFee',
  PoolIdManagementFee = 'poolId__managementFee',
  PoolIdMustAllowlistLPs = 'poolId__mustAllowlistLPs',
  PoolIdName = 'poolId__name',
  PoolIdOracleEnabled = 'poolId__oracleEnabled',
  PoolIdOwner = 'poolId__owner',
  PoolIdPoolType = 'poolId__poolType',
  PoolIdPoolTypeVersion = 'poolId__poolTypeVersion',
  PoolIdPrincipalToken = 'poolId__principalToken',
  PoolIdProtocolAumFeeCache = 'poolId__protocolAumFeeCache',
  PoolIdProtocolId = 'poolId__protocolId',
  PoolIdProtocolSwapFeeCache = 'poolId__protocolSwapFeeCache',
  PoolIdProtocolYieldFeeCache = 'poolId__protocolYieldFeeCache',
  PoolIdRoot3Alpha = 'poolId__root3Alpha',
  PoolIdS = 'poolId__s',
  PoolIdSqrtAlpha = 'poolId__sqrtAlpha',
  PoolIdSqrtBeta = 'poolId__sqrtBeta',
  PoolIdStrategyType = 'poolId__strategyType',
  PoolIdSwapEnabled = 'poolId__swapEnabled',
  PoolIdSwapFee = 'poolId__swapFee',
  PoolIdSwapsCount = 'poolId__swapsCount',
  PoolIdSymbol = 'poolId__symbol',
  PoolIdTauAlphaX = 'poolId__tauAlphaX',
  PoolIdTauAlphaY = 'poolId__tauAlphaY',
  PoolIdTauBetaX = 'poolId__tauBetaX',
  PoolIdTauBetaY = 'poolId__tauBetaY',
  PoolIdTotalAumFeeCollectedInBpt = 'poolId__totalAumFeeCollectedInBPT',
  PoolIdTotalLiquidity = 'poolId__totalLiquidity',
  PoolIdTotalProtocolFee = 'poolId__totalProtocolFee',
  PoolIdTotalProtocolFeePaidInBpt = 'poolId__totalProtocolFeePaidInBPT',
  PoolIdTotalShares = 'poolId__totalShares',
  PoolIdTotalSwapFee = 'poolId__totalSwapFee',
  PoolIdTotalSwapVolume = 'poolId__totalSwapVolume',
  PoolIdTotalWeight = 'poolId__totalWeight',
  PoolIdTx = 'poolId__tx',
  PoolIdU = 'poolId__u',
  PoolIdUnitSeconds = 'poolId__unitSeconds',
  PoolIdUpperTarget = 'poolId__upperTarget',
  PoolIdV = 'poolId__v',
  PoolIdW = 'poolId__w',
  PoolIdWrappedIndex = 'poolId__wrappedIndex',
  PoolIdZ = 'poolId__z',
  Price = 'price',
  PricingAsset = 'pricingAsset',
  Timestamp = 'timestamp',
}

export type TokenSnapshot = {
  __typename?: 'TokenSnapshot';
  id: Scalars['ID'];
  timestamp: Scalars['Int'];
  token: Token;
  totalBalanceNotional: Scalars['BigDecimal'];
  totalBalanceUSD: Scalars['BigDecimal'];
  totalSwapCount: Scalars['BigInt'];
  totalVolumeNotional: Scalars['BigDecimal'];
  totalVolumeUSD: Scalars['BigDecimal'];
};

export type TokenSnapshot_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<TokenSnapshot_Filter>>>;
  id: InputMaybe<Scalars['ID']>;
  id_gt: InputMaybe<Scalars['ID']>;
  id_gte: InputMaybe<Scalars['ID']>;
  id_in: InputMaybe<Array<Scalars['ID']>>;
  id_lt: InputMaybe<Scalars['ID']>;
  id_lte: InputMaybe<Scalars['ID']>;
  id_not: InputMaybe<Scalars['ID']>;
  id_not_in: InputMaybe<Array<Scalars['ID']>>;
  or: InputMaybe<Array<InputMaybe<TokenSnapshot_Filter>>>;
  timestamp: InputMaybe<Scalars['Int']>;
  timestamp_gt: InputMaybe<Scalars['Int']>;
  timestamp_gte: InputMaybe<Scalars['Int']>;
  timestamp_in: InputMaybe<Array<Scalars['Int']>>;
  timestamp_lt: InputMaybe<Scalars['Int']>;
  timestamp_lte: InputMaybe<Scalars['Int']>;
  timestamp_not: InputMaybe<Scalars['Int']>;
  timestamp_not_in: InputMaybe<Array<Scalars['Int']>>;
  token: InputMaybe<Scalars['String']>;
  token_: InputMaybe<Token_Filter>;
  token_contains: InputMaybe<Scalars['String']>;
  token_contains_nocase: InputMaybe<Scalars['String']>;
  token_ends_with: InputMaybe<Scalars['String']>;
  token_ends_with_nocase: InputMaybe<Scalars['String']>;
  token_gt: InputMaybe<Scalars['String']>;
  token_gte: InputMaybe<Scalars['String']>;
  token_in: InputMaybe<Array<Scalars['String']>>;
  token_lt: InputMaybe<Scalars['String']>;
  token_lte: InputMaybe<Scalars['String']>;
  token_not: InputMaybe<Scalars['String']>;
  token_not_contains: InputMaybe<Scalars['String']>;
  token_not_contains_nocase: InputMaybe<Scalars['String']>;
  token_not_ends_with: InputMaybe<Scalars['String']>;
  token_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  token_not_in: InputMaybe<Array<Scalars['String']>>;
  token_not_starts_with: InputMaybe<Scalars['String']>;
  token_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  token_starts_with: InputMaybe<Scalars['String']>;
  token_starts_with_nocase: InputMaybe<Scalars['String']>;
  totalBalanceNotional: InputMaybe<Scalars['BigDecimal']>;
  totalBalanceNotional_gt: InputMaybe<Scalars['BigDecimal']>;
  totalBalanceNotional_gte: InputMaybe<Scalars['BigDecimal']>;
  totalBalanceNotional_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalBalanceNotional_lt: InputMaybe<Scalars['BigDecimal']>;
  totalBalanceNotional_lte: InputMaybe<Scalars['BigDecimal']>;
  totalBalanceNotional_not: InputMaybe<Scalars['BigDecimal']>;
  totalBalanceNotional_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalBalanceUSD: InputMaybe<Scalars['BigDecimal']>;
  totalBalanceUSD_gt: InputMaybe<Scalars['BigDecimal']>;
  totalBalanceUSD_gte: InputMaybe<Scalars['BigDecimal']>;
  totalBalanceUSD_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalBalanceUSD_lt: InputMaybe<Scalars['BigDecimal']>;
  totalBalanceUSD_lte: InputMaybe<Scalars['BigDecimal']>;
  totalBalanceUSD_not: InputMaybe<Scalars['BigDecimal']>;
  totalBalanceUSD_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalSwapCount: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_gt: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_gte: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_in: InputMaybe<Array<Scalars['BigInt']>>;
  totalSwapCount_lt: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_lte: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_not: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  totalVolumeNotional: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeNotional_gt: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeNotional_gte: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeNotional_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalVolumeNotional_lt: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeNotional_lte: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeNotional_not: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeNotional_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalVolumeUSD: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeUSD_gt: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeUSD_gte: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeUSD_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalVolumeUSD_lt: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeUSD_lte: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeUSD_not: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeUSD_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export enum TokenSnapshot_OrderBy {
  Id = 'id',
  Timestamp = 'timestamp',
  Token = 'token',
  TokenAddress = 'token__address',
  TokenDecimals = 'token__decimals',
  TokenFxOracleDecimals = 'token__fxOracleDecimals',
  TokenId = 'token__id',
  TokenLatestFxPrice = 'token__latestFXPrice',
  TokenLatestUsdPrice = 'token__latestUSDPrice',
  TokenLatestUsdPriceTimestamp = 'token__latestUSDPriceTimestamp',
  TokenName = 'token__name',
  TokenSymbol = 'token__symbol',
  TokenTotalBalanceNotional = 'token__totalBalanceNotional',
  TokenTotalBalanceUsd = 'token__totalBalanceUSD',
  TokenTotalSwapCount = 'token__totalSwapCount',
  TokenTotalVolumeNotional = 'token__totalVolumeNotional',
  TokenTotalVolumeUsd = 'token__totalVolumeUSD',
  TotalBalanceNotional = 'totalBalanceNotional',
  TotalBalanceUsd = 'totalBalanceUSD',
  TotalSwapCount = 'totalSwapCount',
  TotalVolumeNotional = 'totalVolumeNotional',
  TotalVolumeUsd = 'totalVolumeUSD',
}

export type Token_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  address: InputMaybe<Scalars['String']>;
  address_contains: InputMaybe<Scalars['String']>;
  address_contains_nocase: InputMaybe<Scalars['String']>;
  address_ends_with: InputMaybe<Scalars['String']>;
  address_ends_with_nocase: InputMaybe<Scalars['String']>;
  address_gt: InputMaybe<Scalars['String']>;
  address_gte: InputMaybe<Scalars['String']>;
  address_in: InputMaybe<Array<Scalars['String']>>;
  address_lt: InputMaybe<Scalars['String']>;
  address_lte: InputMaybe<Scalars['String']>;
  address_not: InputMaybe<Scalars['String']>;
  address_not_contains: InputMaybe<Scalars['String']>;
  address_not_contains_nocase: InputMaybe<Scalars['String']>;
  address_not_ends_with: InputMaybe<Scalars['String']>;
  address_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  address_not_in: InputMaybe<Array<Scalars['String']>>;
  address_not_starts_with: InputMaybe<Scalars['String']>;
  address_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  address_starts_with: InputMaybe<Scalars['String']>;
  address_starts_with_nocase: InputMaybe<Scalars['String']>;
  and: InputMaybe<Array<InputMaybe<Token_Filter>>>;
  decimals: InputMaybe<Scalars['Int']>;
  decimals_gt: InputMaybe<Scalars['Int']>;
  decimals_gte: InputMaybe<Scalars['Int']>;
  decimals_in: InputMaybe<Array<Scalars['Int']>>;
  decimals_lt: InputMaybe<Scalars['Int']>;
  decimals_lte: InputMaybe<Scalars['Int']>;
  decimals_not: InputMaybe<Scalars['Int']>;
  decimals_not_in: InputMaybe<Array<Scalars['Int']>>;
  fxOracleDecimals: InputMaybe<Scalars['Int']>;
  fxOracleDecimals_gt: InputMaybe<Scalars['Int']>;
  fxOracleDecimals_gte: InputMaybe<Scalars['Int']>;
  fxOracleDecimals_in: InputMaybe<Array<Scalars['Int']>>;
  fxOracleDecimals_lt: InputMaybe<Scalars['Int']>;
  fxOracleDecimals_lte: InputMaybe<Scalars['Int']>;
  fxOracleDecimals_not: InputMaybe<Scalars['Int']>;
  fxOracleDecimals_not_in: InputMaybe<Array<Scalars['Int']>>;
  id: InputMaybe<Scalars['ID']>;
  id_gt: InputMaybe<Scalars['ID']>;
  id_gte: InputMaybe<Scalars['ID']>;
  id_in: InputMaybe<Array<Scalars['ID']>>;
  id_lt: InputMaybe<Scalars['ID']>;
  id_lte: InputMaybe<Scalars['ID']>;
  id_not: InputMaybe<Scalars['ID']>;
  id_not_in: InputMaybe<Array<Scalars['ID']>>;
  latestFXPrice: InputMaybe<Scalars['BigDecimal']>;
  latestFXPrice_gt: InputMaybe<Scalars['BigDecimal']>;
  latestFXPrice_gte: InputMaybe<Scalars['BigDecimal']>;
  latestFXPrice_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  latestFXPrice_lt: InputMaybe<Scalars['BigDecimal']>;
  latestFXPrice_lte: InputMaybe<Scalars['BigDecimal']>;
  latestFXPrice_not: InputMaybe<Scalars['BigDecimal']>;
  latestFXPrice_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  latestPrice: InputMaybe<Scalars['String']>;
  latestPrice_: InputMaybe<LatestPrice_Filter>;
  latestPrice_contains: InputMaybe<Scalars['String']>;
  latestPrice_contains_nocase: InputMaybe<Scalars['String']>;
  latestPrice_ends_with: InputMaybe<Scalars['String']>;
  latestPrice_ends_with_nocase: InputMaybe<Scalars['String']>;
  latestPrice_gt: InputMaybe<Scalars['String']>;
  latestPrice_gte: InputMaybe<Scalars['String']>;
  latestPrice_in: InputMaybe<Array<Scalars['String']>>;
  latestPrice_lt: InputMaybe<Scalars['String']>;
  latestPrice_lte: InputMaybe<Scalars['String']>;
  latestPrice_not: InputMaybe<Scalars['String']>;
  latestPrice_not_contains: InputMaybe<Scalars['String']>;
  latestPrice_not_contains_nocase: InputMaybe<Scalars['String']>;
  latestPrice_not_ends_with: InputMaybe<Scalars['String']>;
  latestPrice_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  latestPrice_not_in: InputMaybe<Array<Scalars['String']>>;
  latestPrice_not_starts_with: InputMaybe<Scalars['String']>;
  latestPrice_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  latestPrice_starts_with: InputMaybe<Scalars['String']>;
  latestPrice_starts_with_nocase: InputMaybe<Scalars['String']>;
  latestUSDPrice: InputMaybe<Scalars['BigDecimal']>;
  latestUSDPriceTimestamp: InputMaybe<Scalars['BigInt']>;
  latestUSDPriceTimestamp_gt: InputMaybe<Scalars['BigInt']>;
  latestUSDPriceTimestamp_gte: InputMaybe<Scalars['BigInt']>;
  latestUSDPriceTimestamp_in: InputMaybe<Array<Scalars['BigInt']>>;
  latestUSDPriceTimestamp_lt: InputMaybe<Scalars['BigInt']>;
  latestUSDPriceTimestamp_lte: InputMaybe<Scalars['BigInt']>;
  latestUSDPriceTimestamp_not: InputMaybe<Scalars['BigInt']>;
  latestUSDPriceTimestamp_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  latestUSDPrice_gt: InputMaybe<Scalars['BigDecimal']>;
  latestUSDPrice_gte: InputMaybe<Scalars['BigDecimal']>;
  latestUSDPrice_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  latestUSDPrice_lt: InputMaybe<Scalars['BigDecimal']>;
  latestUSDPrice_lte: InputMaybe<Scalars['BigDecimal']>;
  latestUSDPrice_not: InputMaybe<Scalars['BigDecimal']>;
  latestUSDPrice_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  name: InputMaybe<Scalars['String']>;
  name_contains: InputMaybe<Scalars['String']>;
  name_contains_nocase: InputMaybe<Scalars['String']>;
  name_ends_with: InputMaybe<Scalars['String']>;
  name_ends_with_nocase: InputMaybe<Scalars['String']>;
  name_gt: InputMaybe<Scalars['String']>;
  name_gte: InputMaybe<Scalars['String']>;
  name_in: InputMaybe<Array<Scalars['String']>>;
  name_lt: InputMaybe<Scalars['String']>;
  name_lte: InputMaybe<Scalars['String']>;
  name_not: InputMaybe<Scalars['String']>;
  name_not_contains: InputMaybe<Scalars['String']>;
  name_not_contains_nocase: InputMaybe<Scalars['String']>;
  name_not_ends_with: InputMaybe<Scalars['String']>;
  name_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  name_not_in: InputMaybe<Array<Scalars['String']>>;
  name_not_starts_with: InputMaybe<Scalars['String']>;
  name_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  name_starts_with: InputMaybe<Scalars['String']>;
  name_starts_with_nocase: InputMaybe<Scalars['String']>;
  or: InputMaybe<Array<InputMaybe<Token_Filter>>>;
  pool: InputMaybe<Scalars['String']>;
  pool_: InputMaybe<Pool_Filter>;
  pool_contains: InputMaybe<Scalars['String']>;
  pool_contains_nocase: InputMaybe<Scalars['String']>;
  pool_ends_with: InputMaybe<Scalars['String']>;
  pool_ends_with_nocase: InputMaybe<Scalars['String']>;
  pool_gt: InputMaybe<Scalars['String']>;
  pool_gte: InputMaybe<Scalars['String']>;
  pool_in: InputMaybe<Array<Scalars['String']>>;
  pool_lt: InputMaybe<Scalars['String']>;
  pool_lte: InputMaybe<Scalars['String']>;
  pool_not: InputMaybe<Scalars['String']>;
  pool_not_contains: InputMaybe<Scalars['String']>;
  pool_not_contains_nocase: InputMaybe<Scalars['String']>;
  pool_not_ends_with: InputMaybe<Scalars['String']>;
  pool_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  pool_not_in: InputMaybe<Array<Scalars['String']>>;
  pool_not_starts_with: InputMaybe<Scalars['String']>;
  pool_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  pool_starts_with: InputMaybe<Scalars['String']>;
  pool_starts_with_nocase: InputMaybe<Scalars['String']>;
  symbol: InputMaybe<Scalars['String']>;
  symbol_contains: InputMaybe<Scalars['String']>;
  symbol_contains_nocase: InputMaybe<Scalars['String']>;
  symbol_ends_with: InputMaybe<Scalars['String']>;
  symbol_ends_with_nocase: InputMaybe<Scalars['String']>;
  symbol_gt: InputMaybe<Scalars['String']>;
  symbol_gte: InputMaybe<Scalars['String']>;
  symbol_in: InputMaybe<Array<Scalars['String']>>;
  symbol_lt: InputMaybe<Scalars['String']>;
  symbol_lte: InputMaybe<Scalars['String']>;
  symbol_not: InputMaybe<Scalars['String']>;
  symbol_not_contains: InputMaybe<Scalars['String']>;
  symbol_not_contains_nocase: InputMaybe<Scalars['String']>;
  symbol_not_ends_with: InputMaybe<Scalars['String']>;
  symbol_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  symbol_not_in: InputMaybe<Array<Scalars['String']>>;
  symbol_not_starts_with: InputMaybe<Scalars['String']>;
  symbol_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  symbol_starts_with: InputMaybe<Scalars['String']>;
  symbol_starts_with_nocase: InputMaybe<Scalars['String']>;
  totalBalanceNotional: InputMaybe<Scalars['BigDecimal']>;
  totalBalanceNotional_gt: InputMaybe<Scalars['BigDecimal']>;
  totalBalanceNotional_gte: InputMaybe<Scalars['BigDecimal']>;
  totalBalanceNotional_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalBalanceNotional_lt: InputMaybe<Scalars['BigDecimal']>;
  totalBalanceNotional_lte: InputMaybe<Scalars['BigDecimal']>;
  totalBalanceNotional_not: InputMaybe<Scalars['BigDecimal']>;
  totalBalanceNotional_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalBalanceUSD: InputMaybe<Scalars['BigDecimal']>;
  totalBalanceUSD_gt: InputMaybe<Scalars['BigDecimal']>;
  totalBalanceUSD_gte: InputMaybe<Scalars['BigDecimal']>;
  totalBalanceUSD_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalBalanceUSD_lt: InputMaybe<Scalars['BigDecimal']>;
  totalBalanceUSD_lte: InputMaybe<Scalars['BigDecimal']>;
  totalBalanceUSD_not: InputMaybe<Scalars['BigDecimal']>;
  totalBalanceUSD_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalSwapCount: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_gt: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_gte: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_in: InputMaybe<Array<Scalars['BigInt']>>;
  totalSwapCount_lt: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_lte: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_not: InputMaybe<Scalars['BigInt']>;
  totalSwapCount_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  totalVolumeNotional: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeNotional_gt: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeNotional_gte: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeNotional_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalVolumeNotional_lt: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeNotional_lte: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeNotional_not: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeNotional_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalVolumeUSD: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeUSD_gt: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeUSD_gte: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeUSD_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalVolumeUSD_lt: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeUSD_lte: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeUSD_not: InputMaybe<Scalars['BigDecimal']>;
  totalVolumeUSD_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export enum Token_OrderBy {
  Address = 'address',
  Decimals = 'decimals',
  FxOracleDecimals = 'fxOracleDecimals',
  Id = 'id',
  LatestFxPrice = 'latestFXPrice',
  LatestPrice = 'latestPrice',
  LatestPriceAsset = 'latestPrice__asset',
  LatestPriceBlock = 'latestPrice__block',
  LatestPriceId = 'latestPrice__id',
  LatestPricePrice = 'latestPrice__price',
  LatestPricePricingAsset = 'latestPrice__pricingAsset',
  LatestUsdPrice = 'latestUSDPrice',
  LatestUsdPriceTimestamp = 'latestUSDPriceTimestamp',
  Name = 'name',
  Pool = 'pool',
  PoolAddress = 'pool__address',
  PoolAlpha = 'pool__alpha',
  PoolAmp = 'pool__amp',
  PoolBaseToken = 'pool__baseToken',
  PoolBeta = 'pool__beta',
  PoolC = 'pool__c',
  PoolCreateTime = 'pool__createTime',
  PoolDSq = 'pool__dSq',
  PoolDelta = 'pool__delta',
  PoolEpsilon = 'pool__epsilon',
  PoolExpiryTime = 'pool__expiryTime',
  PoolFactory = 'pool__factory',
  PoolHoldersCount = 'pool__holdersCount',
  PoolId = 'pool__id',
  PoolIsInRecoveryMode = 'pool__isInRecoveryMode',
  PoolIsPaused = 'pool__isPaused',
  PoolJoinExitEnabled = 'pool__joinExitEnabled',
  PoolLambda = 'pool__lambda',
  PoolLastJoinExitAmp = 'pool__lastJoinExitAmp',
  PoolLastPostJoinExitInvariant = 'pool__lastPostJoinExitInvariant',
  PoolLowerTarget = 'pool__lowerTarget',
  PoolMainIndex = 'pool__mainIndex',
  PoolManagementAumFee = 'pool__managementAumFee',
  PoolManagementFee = 'pool__managementFee',
  PoolMustAllowlistLPs = 'pool__mustAllowlistLPs',
  PoolName = 'pool__name',
  PoolOracleEnabled = 'pool__oracleEnabled',
  PoolOwner = 'pool__owner',
  PoolPoolType = 'pool__poolType',
  PoolPoolTypeVersion = 'pool__poolTypeVersion',
  PoolPrincipalToken = 'pool__principalToken',
  PoolProtocolAumFeeCache = 'pool__protocolAumFeeCache',
  PoolProtocolId = 'pool__protocolId',
  PoolProtocolSwapFeeCache = 'pool__protocolSwapFeeCache',
  PoolProtocolYieldFeeCache = 'pool__protocolYieldFeeCache',
  PoolRoot3Alpha = 'pool__root3Alpha',
  PoolS = 'pool__s',
  PoolSqrtAlpha = 'pool__sqrtAlpha',
  PoolSqrtBeta = 'pool__sqrtBeta',
  PoolStrategyType = 'pool__strategyType',
  PoolSwapEnabled = 'pool__swapEnabled',
  PoolSwapFee = 'pool__swapFee',
  PoolSwapsCount = 'pool__swapsCount',
  PoolSymbol = 'pool__symbol',
  PoolTauAlphaX = 'pool__tauAlphaX',
  PoolTauAlphaY = 'pool__tauAlphaY',
  PoolTauBetaX = 'pool__tauBetaX',
  PoolTauBetaY = 'pool__tauBetaY',
  PoolTotalAumFeeCollectedInBpt = 'pool__totalAumFeeCollectedInBPT',
  PoolTotalLiquidity = 'pool__totalLiquidity',
  PoolTotalProtocolFee = 'pool__totalProtocolFee',
  PoolTotalProtocolFeePaidInBpt = 'pool__totalProtocolFeePaidInBPT',
  PoolTotalShares = 'pool__totalShares',
  PoolTotalSwapFee = 'pool__totalSwapFee',
  PoolTotalSwapVolume = 'pool__totalSwapVolume',
  PoolTotalWeight = 'pool__totalWeight',
  PoolTx = 'pool__tx',
  PoolU = 'pool__u',
  PoolUnitSeconds = 'pool__unitSeconds',
  PoolUpperTarget = 'pool__upperTarget',
  PoolV = 'pool__v',
  PoolW = 'pool__w',
  PoolWrappedIndex = 'pool__wrappedIndex',
  PoolZ = 'pool__z',
  Symbol = 'symbol',
  TotalBalanceNotional = 'totalBalanceNotional',
  TotalBalanceUsd = 'totalBalanceUSD',
  TotalSwapCount = 'totalSwapCount',
  TotalVolumeNotional = 'totalVolumeNotional',
  TotalVolumeUsd = 'totalVolumeUSD',
}

export type TradePair = {
  __typename?: 'TradePair';
  /** Token Address - Token Address */
  id: Scalars['ID'];
  token0: Token;
  token1: Token;
  totalSwapFee: Scalars['BigDecimal'];
  totalSwapVolume: Scalars['BigDecimal'];
};

export type TradePairSnapshot = {
  __typename?: 'TradePairSnapshot';
  id: Scalars['ID'];
  pair: TradePair;
  timestamp: Scalars['Int'];
  totalSwapFee: Scalars['BigDecimal'];
  totalSwapVolume: Scalars['BigDecimal'];
};

export type TradePairSnapshot_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<TradePairSnapshot_Filter>>>;
  id: InputMaybe<Scalars['ID']>;
  id_gt: InputMaybe<Scalars['ID']>;
  id_gte: InputMaybe<Scalars['ID']>;
  id_in: InputMaybe<Array<Scalars['ID']>>;
  id_lt: InputMaybe<Scalars['ID']>;
  id_lte: InputMaybe<Scalars['ID']>;
  id_not: InputMaybe<Scalars['ID']>;
  id_not_in: InputMaybe<Array<Scalars['ID']>>;
  or: InputMaybe<Array<InputMaybe<TradePairSnapshot_Filter>>>;
  pair: InputMaybe<Scalars['String']>;
  pair_: InputMaybe<TradePair_Filter>;
  pair_contains: InputMaybe<Scalars['String']>;
  pair_contains_nocase: InputMaybe<Scalars['String']>;
  pair_ends_with: InputMaybe<Scalars['String']>;
  pair_ends_with_nocase: InputMaybe<Scalars['String']>;
  pair_gt: InputMaybe<Scalars['String']>;
  pair_gte: InputMaybe<Scalars['String']>;
  pair_in: InputMaybe<Array<Scalars['String']>>;
  pair_lt: InputMaybe<Scalars['String']>;
  pair_lte: InputMaybe<Scalars['String']>;
  pair_not: InputMaybe<Scalars['String']>;
  pair_not_contains: InputMaybe<Scalars['String']>;
  pair_not_contains_nocase: InputMaybe<Scalars['String']>;
  pair_not_ends_with: InputMaybe<Scalars['String']>;
  pair_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  pair_not_in: InputMaybe<Array<Scalars['String']>>;
  pair_not_starts_with: InputMaybe<Scalars['String']>;
  pair_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  pair_starts_with: InputMaybe<Scalars['String']>;
  pair_starts_with_nocase: InputMaybe<Scalars['String']>;
  timestamp: InputMaybe<Scalars['Int']>;
  timestamp_gt: InputMaybe<Scalars['Int']>;
  timestamp_gte: InputMaybe<Scalars['Int']>;
  timestamp_in: InputMaybe<Array<Scalars['Int']>>;
  timestamp_lt: InputMaybe<Scalars['Int']>;
  timestamp_lte: InputMaybe<Scalars['Int']>;
  timestamp_not: InputMaybe<Scalars['Int']>;
  timestamp_not_in: InputMaybe<Array<Scalars['Int']>>;
  totalSwapFee: InputMaybe<Scalars['BigDecimal']>;
  totalSwapFee_gt: InputMaybe<Scalars['BigDecimal']>;
  totalSwapFee_gte: InputMaybe<Scalars['BigDecimal']>;
  totalSwapFee_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalSwapFee_lt: InputMaybe<Scalars['BigDecimal']>;
  totalSwapFee_lte: InputMaybe<Scalars['BigDecimal']>;
  totalSwapFee_not: InputMaybe<Scalars['BigDecimal']>;
  totalSwapFee_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalSwapVolume: InputMaybe<Scalars['BigDecimal']>;
  totalSwapVolume_gt: InputMaybe<Scalars['BigDecimal']>;
  totalSwapVolume_gte: InputMaybe<Scalars['BigDecimal']>;
  totalSwapVolume_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalSwapVolume_lt: InputMaybe<Scalars['BigDecimal']>;
  totalSwapVolume_lte: InputMaybe<Scalars['BigDecimal']>;
  totalSwapVolume_not: InputMaybe<Scalars['BigDecimal']>;
  totalSwapVolume_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export enum TradePairSnapshot_OrderBy {
  Id = 'id',
  Pair = 'pair',
  PairId = 'pair__id',
  PairTotalSwapFee = 'pair__totalSwapFee',
  PairTotalSwapVolume = 'pair__totalSwapVolume',
  Timestamp = 'timestamp',
  TotalSwapFee = 'totalSwapFee',
  TotalSwapVolume = 'totalSwapVolume',
}

export type TradePair_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<TradePair_Filter>>>;
  id: InputMaybe<Scalars['ID']>;
  id_gt: InputMaybe<Scalars['ID']>;
  id_gte: InputMaybe<Scalars['ID']>;
  id_in: InputMaybe<Array<Scalars['ID']>>;
  id_lt: InputMaybe<Scalars['ID']>;
  id_lte: InputMaybe<Scalars['ID']>;
  id_not: InputMaybe<Scalars['ID']>;
  id_not_in: InputMaybe<Array<Scalars['ID']>>;
  or: InputMaybe<Array<InputMaybe<TradePair_Filter>>>;
  token0: InputMaybe<Scalars['String']>;
  token0_: InputMaybe<Token_Filter>;
  token0_contains: InputMaybe<Scalars['String']>;
  token0_contains_nocase: InputMaybe<Scalars['String']>;
  token0_ends_with: InputMaybe<Scalars['String']>;
  token0_ends_with_nocase: InputMaybe<Scalars['String']>;
  token0_gt: InputMaybe<Scalars['String']>;
  token0_gte: InputMaybe<Scalars['String']>;
  token0_in: InputMaybe<Array<Scalars['String']>>;
  token0_lt: InputMaybe<Scalars['String']>;
  token0_lte: InputMaybe<Scalars['String']>;
  token0_not: InputMaybe<Scalars['String']>;
  token0_not_contains: InputMaybe<Scalars['String']>;
  token0_not_contains_nocase: InputMaybe<Scalars['String']>;
  token0_not_ends_with: InputMaybe<Scalars['String']>;
  token0_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  token0_not_in: InputMaybe<Array<Scalars['String']>>;
  token0_not_starts_with: InputMaybe<Scalars['String']>;
  token0_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  token0_starts_with: InputMaybe<Scalars['String']>;
  token0_starts_with_nocase: InputMaybe<Scalars['String']>;
  token1: InputMaybe<Scalars['String']>;
  token1_: InputMaybe<Token_Filter>;
  token1_contains: InputMaybe<Scalars['String']>;
  token1_contains_nocase: InputMaybe<Scalars['String']>;
  token1_ends_with: InputMaybe<Scalars['String']>;
  token1_ends_with_nocase: InputMaybe<Scalars['String']>;
  token1_gt: InputMaybe<Scalars['String']>;
  token1_gte: InputMaybe<Scalars['String']>;
  token1_in: InputMaybe<Array<Scalars['String']>>;
  token1_lt: InputMaybe<Scalars['String']>;
  token1_lte: InputMaybe<Scalars['String']>;
  token1_not: InputMaybe<Scalars['String']>;
  token1_not_contains: InputMaybe<Scalars['String']>;
  token1_not_contains_nocase: InputMaybe<Scalars['String']>;
  token1_not_ends_with: InputMaybe<Scalars['String']>;
  token1_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  token1_not_in: InputMaybe<Array<Scalars['String']>>;
  token1_not_starts_with: InputMaybe<Scalars['String']>;
  token1_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  token1_starts_with: InputMaybe<Scalars['String']>;
  token1_starts_with_nocase: InputMaybe<Scalars['String']>;
  totalSwapFee: InputMaybe<Scalars['BigDecimal']>;
  totalSwapFee_gt: InputMaybe<Scalars['BigDecimal']>;
  totalSwapFee_gte: InputMaybe<Scalars['BigDecimal']>;
  totalSwapFee_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalSwapFee_lt: InputMaybe<Scalars['BigDecimal']>;
  totalSwapFee_lte: InputMaybe<Scalars['BigDecimal']>;
  totalSwapFee_not: InputMaybe<Scalars['BigDecimal']>;
  totalSwapFee_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalSwapVolume: InputMaybe<Scalars['BigDecimal']>;
  totalSwapVolume_gt: InputMaybe<Scalars['BigDecimal']>;
  totalSwapVolume_gte: InputMaybe<Scalars['BigDecimal']>;
  totalSwapVolume_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalSwapVolume_lt: InputMaybe<Scalars['BigDecimal']>;
  totalSwapVolume_lte: InputMaybe<Scalars['BigDecimal']>;
  totalSwapVolume_not: InputMaybe<Scalars['BigDecimal']>;
  totalSwapVolume_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export enum TradePair_OrderBy {
  Id = 'id',
  Token0 = 'token0',
  Token0Address = 'token0__address',
  Token0Decimals = 'token0__decimals',
  Token0FxOracleDecimals = 'token0__fxOracleDecimals',
  Token0Id = 'token0__id',
  Token0LatestFxPrice = 'token0__latestFXPrice',
  Token0LatestUsdPrice = 'token0__latestUSDPrice',
  Token0LatestUsdPriceTimestamp = 'token0__latestUSDPriceTimestamp',
  Token0Name = 'token0__name',
  Token0Symbol = 'token0__symbol',
  Token0TotalBalanceNotional = 'token0__totalBalanceNotional',
  Token0TotalBalanceUsd = 'token0__totalBalanceUSD',
  Token0TotalSwapCount = 'token0__totalSwapCount',
  Token0TotalVolumeNotional = 'token0__totalVolumeNotional',
  Token0TotalVolumeUsd = 'token0__totalVolumeUSD',
  Token1 = 'token1',
  Token1Address = 'token1__address',
  Token1Decimals = 'token1__decimals',
  Token1FxOracleDecimals = 'token1__fxOracleDecimals',
  Token1Id = 'token1__id',
  Token1LatestFxPrice = 'token1__latestFXPrice',
  Token1LatestUsdPrice = 'token1__latestUSDPrice',
  Token1LatestUsdPriceTimestamp = 'token1__latestUSDPriceTimestamp',
  Token1Name = 'token1__name',
  Token1Symbol = 'token1__symbol',
  Token1TotalBalanceNotional = 'token1__totalBalanceNotional',
  Token1TotalBalanceUsd = 'token1__totalBalanceUSD',
  Token1TotalSwapCount = 'token1__totalSwapCount',
  Token1TotalVolumeNotional = 'token1__totalVolumeNotional',
  Token1TotalVolumeUsd = 'token1__totalVolumeUSD',
  TotalSwapFee = 'totalSwapFee',
  TotalSwapVolume = 'totalSwapVolume',
}

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  sharesOwned: Maybe<Array<PoolShare>>;
  swaps: Maybe<Array<Swap>>;
  userInternalBalances: Maybe<Array<UserInternalBalance>>;
};

export type UserSharesOwnedArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<PoolShare_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<PoolShare_Filter>;
};

export type UserSwapsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Swap_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<Swap_Filter>;
};

export type UserUserInternalBalancesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<UserInternalBalance_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<UserInternalBalance_Filter>;
};

export type UserInternalBalance = {
  __typename?: 'UserInternalBalance';
  balance: Scalars['BigDecimal'];
  id: Scalars['ID'];
  token: Scalars['Bytes'];
  tokenInfo: Maybe<Token>;
  userAddress: Maybe<User>;
};

export type UserInternalBalance_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<UserInternalBalance_Filter>>>;
  balance: InputMaybe<Scalars['BigDecimal']>;
  balance_gt: InputMaybe<Scalars['BigDecimal']>;
  balance_gte: InputMaybe<Scalars['BigDecimal']>;
  balance_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  balance_lt: InputMaybe<Scalars['BigDecimal']>;
  balance_lte: InputMaybe<Scalars['BigDecimal']>;
  balance_not: InputMaybe<Scalars['BigDecimal']>;
  balance_not_in: InputMaybe<Array<Scalars['BigDecimal']>>;
  id: InputMaybe<Scalars['ID']>;
  id_gt: InputMaybe<Scalars['ID']>;
  id_gte: InputMaybe<Scalars['ID']>;
  id_in: InputMaybe<Array<Scalars['ID']>>;
  id_lt: InputMaybe<Scalars['ID']>;
  id_lte: InputMaybe<Scalars['ID']>;
  id_not: InputMaybe<Scalars['ID']>;
  id_not_in: InputMaybe<Array<Scalars['ID']>>;
  or: InputMaybe<Array<InputMaybe<UserInternalBalance_Filter>>>;
  token: InputMaybe<Scalars['Bytes']>;
  tokenInfo: InputMaybe<Scalars['String']>;
  tokenInfo_: InputMaybe<Token_Filter>;
  tokenInfo_contains: InputMaybe<Scalars['String']>;
  tokenInfo_contains_nocase: InputMaybe<Scalars['String']>;
  tokenInfo_ends_with: InputMaybe<Scalars['String']>;
  tokenInfo_ends_with_nocase: InputMaybe<Scalars['String']>;
  tokenInfo_gt: InputMaybe<Scalars['String']>;
  tokenInfo_gte: InputMaybe<Scalars['String']>;
  tokenInfo_in: InputMaybe<Array<Scalars['String']>>;
  tokenInfo_lt: InputMaybe<Scalars['String']>;
  tokenInfo_lte: InputMaybe<Scalars['String']>;
  tokenInfo_not: InputMaybe<Scalars['String']>;
  tokenInfo_not_contains: InputMaybe<Scalars['String']>;
  tokenInfo_not_contains_nocase: InputMaybe<Scalars['String']>;
  tokenInfo_not_ends_with: InputMaybe<Scalars['String']>;
  tokenInfo_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  tokenInfo_not_in: InputMaybe<Array<Scalars['String']>>;
  tokenInfo_not_starts_with: InputMaybe<Scalars['String']>;
  tokenInfo_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  tokenInfo_starts_with: InputMaybe<Scalars['String']>;
  tokenInfo_starts_with_nocase: InputMaybe<Scalars['String']>;
  token_contains: InputMaybe<Scalars['Bytes']>;
  token_gt: InputMaybe<Scalars['Bytes']>;
  token_gte: InputMaybe<Scalars['Bytes']>;
  token_in: InputMaybe<Array<Scalars['Bytes']>>;
  token_lt: InputMaybe<Scalars['Bytes']>;
  token_lte: InputMaybe<Scalars['Bytes']>;
  token_not: InputMaybe<Scalars['Bytes']>;
  token_not_contains: InputMaybe<Scalars['Bytes']>;
  token_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  userAddress: InputMaybe<Scalars['String']>;
  userAddress_: InputMaybe<User_Filter>;
  userAddress_contains: InputMaybe<Scalars['String']>;
  userAddress_contains_nocase: InputMaybe<Scalars['String']>;
  userAddress_ends_with: InputMaybe<Scalars['String']>;
  userAddress_ends_with_nocase: InputMaybe<Scalars['String']>;
  userAddress_gt: InputMaybe<Scalars['String']>;
  userAddress_gte: InputMaybe<Scalars['String']>;
  userAddress_in: InputMaybe<Array<Scalars['String']>>;
  userAddress_lt: InputMaybe<Scalars['String']>;
  userAddress_lte: InputMaybe<Scalars['String']>;
  userAddress_not: InputMaybe<Scalars['String']>;
  userAddress_not_contains: InputMaybe<Scalars['String']>;
  userAddress_not_contains_nocase: InputMaybe<Scalars['String']>;
  userAddress_not_ends_with: InputMaybe<Scalars['String']>;
  userAddress_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  userAddress_not_in: InputMaybe<Array<Scalars['String']>>;
  userAddress_not_starts_with: InputMaybe<Scalars['String']>;
  userAddress_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  userAddress_starts_with: InputMaybe<Scalars['String']>;
  userAddress_starts_with_nocase: InputMaybe<Scalars['String']>;
};

export enum UserInternalBalance_OrderBy {
  Balance = 'balance',
  Id = 'id',
  Token = 'token',
  TokenInfo = 'tokenInfo',
  TokenInfoAddress = 'tokenInfo__address',
  TokenInfoDecimals = 'tokenInfo__decimals',
  TokenInfoFxOracleDecimals = 'tokenInfo__fxOracleDecimals',
  TokenInfoId = 'tokenInfo__id',
  TokenInfoLatestFxPrice = 'tokenInfo__latestFXPrice',
  TokenInfoLatestUsdPrice = 'tokenInfo__latestUSDPrice',
  TokenInfoLatestUsdPriceTimestamp = 'tokenInfo__latestUSDPriceTimestamp',
  TokenInfoName = 'tokenInfo__name',
  TokenInfoSymbol = 'tokenInfo__symbol',
  TokenInfoTotalBalanceNotional = 'tokenInfo__totalBalanceNotional',
  TokenInfoTotalBalanceUsd = 'tokenInfo__totalBalanceUSD',
  TokenInfoTotalSwapCount = 'tokenInfo__totalSwapCount',
  TokenInfoTotalVolumeNotional = 'tokenInfo__totalVolumeNotional',
  TokenInfoTotalVolumeUsd = 'tokenInfo__totalVolumeUSD',
  UserAddress = 'userAddress',
  UserAddressId = 'userAddress__id',
}

export type User_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  and: InputMaybe<Array<InputMaybe<User_Filter>>>;
  id: InputMaybe<Scalars['ID']>;
  id_gt: InputMaybe<Scalars['ID']>;
  id_gte: InputMaybe<Scalars['ID']>;
  id_in: InputMaybe<Array<Scalars['ID']>>;
  id_lt: InputMaybe<Scalars['ID']>;
  id_lte: InputMaybe<Scalars['ID']>;
  id_not: InputMaybe<Scalars['ID']>;
  id_not_in: InputMaybe<Array<Scalars['ID']>>;
  or: InputMaybe<Array<InputMaybe<User_Filter>>>;
  sharesOwned_: InputMaybe<PoolShare_Filter>;
  swaps_: InputMaybe<Swap_Filter>;
  userInternalBalances_: InputMaybe<UserInternalBalance_Filter>;
};

export enum User_OrderBy {
  Id = 'id',
  SharesOwned = 'sharesOwned',
  Swaps = 'swaps',
  UserInternalBalances = 'userInternalBalances',
}

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny',
}

export type GetPoolTokenDataQueryVariables = Exact<{
  address: Scalars['Bytes'];
}>;

export type GetPoolTokenDataQuery = {
  __typename?: 'Query';
  pools: Array<{
    __typename?: 'Pool';
    id: string;
    totalShares: any;
    tokens: Array<{
      __typename?: 'PoolToken';
      id: string;
      symbol: string;
      balance: any;
      token: {
        __typename?: 'Token';
        id: string;
        symbol: string | null;
        latestUSDPrice: any | null;
      };
    }> | null;
  }>;
};

export const GetPoolTokenDataDocument = gql`
  query GetPoolTokenData($address: Bytes!) {
    pools(where: { address: $address }) {
      id
      totalShares
      tokens {
        id
        symbol
        balance
        token {
          id
          symbol
          latestUSDPrice
        }
      }
    }
  }
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper,
) {
  return {
    GetPoolTokenData(
      variables: GetPoolTokenDataQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetPoolTokenDataQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetPoolTokenDataQuery>(
            GetPoolTokenDataDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'GetPoolTokenData',
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
