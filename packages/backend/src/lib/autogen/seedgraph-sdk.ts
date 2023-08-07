/* eslint-disable */
import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_Height = {
  hash: InputMaybe<Scalars['Bytes']>;
  number: InputMaybe<Scalars['Int']>;
  number_gte: InputMaybe<Scalars['Int']>;
};

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta: Maybe<_Meta_>;
  transfer: Maybe<Transfer>;
  transfers: Array<Transfer>;
  userToken: Maybe<UserToken>;
  userTokens: Array<UserToken>;
};


export type Query_MetaArgs = {
  block: InputMaybe<Block_Height>;
};


export type QueryTransferArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTransfersArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Transfer_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Transfer_Filter>;
};


export type QueryUserTokenArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryUserTokensArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<UserToken_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<UserToken_Filter>;
};

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta: Maybe<_Meta_>;
  transfer: Maybe<Transfer>;
  transfers: Array<Transfer>;
  userToken: Maybe<UserToken>;
  userTokens: Array<UserToken>;
};


export type Subscription_MetaArgs = {
  block: InputMaybe<Block_Height>;
};


export type SubscriptionTransferArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTransfersArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Transfer_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<Transfer_Filter>;
};


export type SubscriptionUserTokenArgs = {
  block: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionUserTokensArgs = {
  block: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<UserToken_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where: InputMaybe<UserToken_Filter>;
};

export type Transfer = {
  __typename?: 'Transfer';
  amount: Scalars['BigInt'];
  from: Scalars['Bytes'];
  id: Scalars['ID'];
  timestamp: Scalars['BigInt'];
  to: Scalars['Bytes'];
  token: Scalars['Bytes'];
  txHash: Scalars['Bytes'];
};

export type Transfer_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<BlockChangedFilter>;
  amount: InputMaybe<Scalars['BigInt']>;
  amount_gt: InputMaybe<Scalars['BigInt']>;
  amount_gte: InputMaybe<Scalars['BigInt']>;
  amount_in: InputMaybe<Array<Scalars['BigInt']>>;
  amount_lt: InputMaybe<Scalars['BigInt']>;
  amount_lte: InputMaybe<Scalars['BigInt']>;
  amount_not: InputMaybe<Scalars['BigInt']>;
  amount_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  and: InputMaybe<Array<InputMaybe<Transfer_Filter>>>;
  from: InputMaybe<Scalars['Bytes']>;
  from_contains: InputMaybe<Scalars['Bytes']>;
  from_gt: InputMaybe<Scalars['Bytes']>;
  from_gte: InputMaybe<Scalars['Bytes']>;
  from_in: InputMaybe<Array<Scalars['Bytes']>>;
  from_lt: InputMaybe<Scalars['Bytes']>;
  from_lte: InputMaybe<Scalars['Bytes']>;
  from_not: InputMaybe<Scalars['Bytes']>;
  from_not_contains: InputMaybe<Scalars['Bytes']>;
  from_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  id: InputMaybe<Scalars['ID']>;
  id_gt: InputMaybe<Scalars['ID']>;
  id_gte: InputMaybe<Scalars['ID']>;
  id_in: InputMaybe<Array<Scalars['ID']>>;
  id_lt: InputMaybe<Scalars['ID']>;
  id_lte: InputMaybe<Scalars['ID']>;
  id_not: InputMaybe<Scalars['ID']>;
  id_not_in: InputMaybe<Array<Scalars['ID']>>;
  or: InputMaybe<Array<InputMaybe<Transfer_Filter>>>;
  timestamp: InputMaybe<Scalars['BigInt']>;
  timestamp_gt: InputMaybe<Scalars['BigInt']>;
  timestamp_gte: InputMaybe<Scalars['BigInt']>;
  timestamp_in: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt: InputMaybe<Scalars['BigInt']>;
  timestamp_lte: InputMaybe<Scalars['BigInt']>;
  timestamp_not: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  to: InputMaybe<Scalars['Bytes']>;
  to_contains: InputMaybe<Scalars['Bytes']>;
  to_gt: InputMaybe<Scalars['Bytes']>;
  to_gte: InputMaybe<Scalars['Bytes']>;
  to_in: InputMaybe<Array<Scalars['Bytes']>>;
  to_lt: InputMaybe<Scalars['Bytes']>;
  to_lte: InputMaybe<Scalars['Bytes']>;
  to_not: InputMaybe<Scalars['Bytes']>;
  to_not_contains: InputMaybe<Scalars['Bytes']>;
  to_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  token: InputMaybe<Scalars['Bytes']>;
  token_contains: InputMaybe<Scalars['Bytes']>;
  token_gt: InputMaybe<Scalars['Bytes']>;
  token_gte: InputMaybe<Scalars['Bytes']>;
  token_in: InputMaybe<Array<Scalars['Bytes']>>;
  token_lt: InputMaybe<Scalars['Bytes']>;
  token_lte: InputMaybe<Scalars['Bytes']>;
  token_not: InputMaybe<Scalars['Bytes']>;
  token_not_contains: InputMaybe<Scalars['Bytes']>;
  token_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  txHash: InputMaybe<Scalars['Bytes']>;
  txHash_contains: InputMaybe<Scalars['Bytes']>;
  txHash_gt: InputMaybe<Scalars['Bytes']>;
  txHash_gte: InputMaybe<Scalars['Bytes']>;
  txHash_in: InputMaybe<Array<Scalars['Bytes']>>;
  txHash_lt: InputMaybe<Scalars['Bytes']>;
  txHash_lte: InputMaybe<Scalars['Bytes']>;
  txHash_not: InputMaybe<Scalars['Bytes']>;
  txHash_not_contains: InputMaybe<Scalars['Bytes']>;
  txHash_not_in: InputMaybe<Array<Scalars['Bytes']>>;
};

export enum Transfer_OrderBy {
  Amount = 'amount',
  From = 'from',
  Id = 'id',
  Timestamp = 'timestamp',
  To = 'to',
  Token = 'token',
  TxHash = 'txHash'
}

export type UserToken = {
  __typename?: 'UserToken';
  address: Scalars['String'];
  id: Scalars['ID'];
  pSeedBalance: Scalars['BigInt'];
  pSeedTransfers: Array<Transfer>;
  seedBalance: Scalars['BigInt'];
  seedTransfers: Array<Transfer>;
};


export type UserTokenPSeedTransfersArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Transfer_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<Transfer_Filter>;
};


export type UserTokenSeedTransfersArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Transfer_OrderBy>;
  orderDirection: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<Transfer_Filter>;
};

export type UserToken_Filter = {
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
  and: InputMaybe<Array<InputMaybe<UserToken_Filter>>>;
  id: InputMaybe<Scalars['ID']>;
  id_gt: InputMaybe<Scalars['ID']>;
  id_gte: InputMaybe<Scalars['ID']>;
  id_in: InputMaybe<Array<Scalars['ID']>>;
  id_lt: InputMaybe<Scalars['ID']>;
  id_lte: InputMaybe<Scalars['ID']>;
  id_not: InputMaybe<Scalars['ID']>;
  id_not_in: InputMaybe<Array<Scalars['ID']>>;
  or: InputMaybe<Array<InputMaybe<UserToken_Filter>>>;
  pSeedBalance: InputMaybe<Scalars['BigInt']>;
  pSeedBalance_gt: InputMaybe<Scalars['BigInt']>;
  pSeedBalance_gte: InputMaybe<Scalars['BigInt']>;
  pSeedBalance_in: InputMaybe<Array<Scalars['BigInt']>>;
  pSeedBalance_lt: InputMaybe<Scalars['BigInt']>;
  pSeedBalance_lte: InputMaybe<Scalars['BigInt']>;
  pSeedBalance_not: InputMaybe<Scalars['BigInt']>;
  pSeedBalance_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  pSeedTransfers: InputMaybe<Array<Scalars['String']>>;
  pSeedTransfers_: InputMaybe<Transfer_Filter>;
  pSeedTransfers_contains: InputMaybe<Array<Scalars['String']>>;
  pSeedTransfers_contains_nocase: InputMaybe<Array<Scalars['String']>>;
  pSeedTransfers_not: InputMaybe<Array<Scalars['String']>>;
  pSeedTransfers_not_contains: InputMaybe<Array<Scalars['String']>>;
  pSeedTransfers_not_contains_nocase: InputMaybe<Array<Scalars['String']>>;
  seedBalance: InputMaybe<Scalars['BigInt']>;
  seedBalance_gt: InputMaybe<Scalars['BigInt']>;
  seedBalance_gte: InputMaybe<Scalars['BigInt']>;
  seedBalance_in: InputMaybe<Array<Scalars['BigInt']>>;
  seedBalance_lt: InputMaybe<Scalars['BigInt']>;
  seedBalance_lte: InputMaybe<Scalars['BigInt']>;
  seedBalance_not: InputMaybe<Scalars['BigInt']>;
  seedBalance_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  seedTransfers: InputMaybe<Array<Scalars['String']>>;
  seedTransfers_: InputMaybe<Transfer_Filter>;
  seedTransfers_contains: InputMaybe<Array<Scalars['String']>>;
  seedTransfers_contains_nocase: InputMaybe<Array<Scalars['String']>>;
  seedTransfers_not: InputMaybe<Array<Scalars['String']>>;
  seedTransfers_not_contains: InputMaybe<Array<Scalars['String']>>;
  seedTransfers_not_contains_nocase: InputMaybe<Array<Scalars['String']>>;
};

export enum UserToken_OrderBy {
  Address = 'address',
  Id = 'id',
  PSeedBalance = 'pSeedBalance',
  PSeedTransfers = 'pSeedTransfers',
  SeedBalance = 'seedBalance',
  SeedTransfers = 'seedTransfers'
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
  Deny = 'deny'
}

export type GetTokenBalancesQueryVariables = Exact<{
  address: Scalars['ID'];
}>;


export type GetTokenBalancesQuery = { __typename?: 'Query', userToken: { __typename?: 'UserToken', id: string, seedBalance: any, pSeedBalance: any } | null };

export type GetTopPSeedHoldersQueryVariables = Exact<{
  limit: InputMaybe<Scalars['Int']>;
}>;


export type GetTopPSeedHoldersQuery = { __typename?: 'Query', userTokens: Array<{ __typename?: 'UserToken', id: string, seedBalance: any, pSeedBalance: any }> };


export const GetTokenBalancesDocument = gql`
    query GetTokenBalances($address: ID!) {
  userToken(id: $address) {
    id
    seedBalance
    pSeedBalance
  }
}
    `;
export const GetTopPSeedHoldersDocument = gql`
    query GetTopPSeedHolders($limit: Int) {
  userTokens(
    orderBy: pSeedBalance
    orderDirection: desc
    where: {pSeedBalance_gt: "0", address_not: "0xbaf60086da36033b458b892e2432958e219f4ed6"}
    first: $limit
  ) {
    id
    seedBalance
    pSeedBalance
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    GetTokenBalances(variables: GetTokenBalancesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetTokenBalancesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetTokenBalancesQuery>(GetTokenBalancesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetTokenBalances');
    },
    GetTopPSeedHolders(variables?: GetTopPSeedHoldersQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetTopPSeedHoldersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetTopPSeedHoldersQuery>(GetTopPSeedHoldersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetTopPSeedHolders');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;