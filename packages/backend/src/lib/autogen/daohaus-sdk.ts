/* eslint-disable */
import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from 'graphql';
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
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
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
};

export type DaoHausBlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type DaoHausBlock_Height = {
  hash: InputMaybe<Scalars['Bytes']>;
  number: InputMaybe<Scalars['Int']>;
  number_gte: InputMaybe<Scalars['Int']>;
};

export type DaoHausContent = {
  __typename?: 'Content';
  /** content of the content */
  content: Scalars['String'];
  /** type of the content */
  contentType: Scalars['String'];
  /** block timestamp when the content was created */
  createdAt: Scalars['String'];
  /** description of the content */
  description: Maybe<Scalars['String']>;
  /** unique identifier and primary key of the entity */
  id: Scalars['ID'];
  /** location of the content */
  location: Scalars['String'];
  /** related member address */
  memberAddress: Scalars['Bytes'];
  /** moloch dao scoped to this content */
  moloch: Maybe<DaoHausMoloch>;
  /** related dao address */
  molochAddress: Maybe<Scalars['String']>;
  /** boolean value of whether the content is ratified by the dao */
  ratified: Scalars['Boolean'];
  /** raw content of the content before parsing */
  rawData: Scalars['String'];
  /** title of the content */
  title: Maybe<Scalars['String']>;
  /** transaction hash when the content was created */
  transactionHash: Scalars['Bytes'];
};

export type DaoHausContent_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<DaoHausBlockChangedFilter>;
  content: InputMaybe<Scalars['String']>;
  contentType: InputMaybe<Scalars['String']>;
  contentType_contains: InputMaybe<Scalars['String']>;
  contentType_contains_nocase: InputMaybe<Scalars['String']>;
  contentType_ends_with: InputMaybe<Scalars['String']>;
  contentType_ends_with_nocase: InputMaybe<Scalars['String']>;
  contentType_gt: InputMaybe<Scalars['String']>;
  contentType_gte: InputMaybe<Scalars['String']>;
  contentType_in: InputMaybe<Array<Scalars['String']>>;
  contentType_lt: InputMaybe<Scalars['String']>;
  contentType_lte: InputMaybe<Scalars['String']>;
  contentType_not: InputMaybe<Scalars['String']>;
  contentType_not_contains: InputMaybe<Scalars['String']>;
  contentType_not_contains_nocase: InputMaybe<Scalars['String']>;
  contentType_not_ends_with: InputMaybe<Scalars['String']>;
  contentType_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  contentType_not_in: InputMaybe<Array<Scalars['String']>>;
  contentType_not_starts_with: InputMaybe<Scalars['String']>;
  contentType_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  contentType_starts_with: InputMaybe<Scalars['String']>;
  contentType_starts_with_nocase: InputMaybe<Scalars['String']>;
  content_contains: InputMaybe<Scalars['String']>;
  content_contains_nocase: InputMaybe<Scalars['String']>;
  content_ends_with: InputMaybe<Scalars['String']>;
  content_ends_with_nocase: InputMaybe<Scalars['String']>;
  content_gt: InputMaybe<Scalars['String']>;
  content_gte: InputMaybe<Scalars['String']>;
  content_in: InputMaybe<Array<Scalars['String']>>;
  content_lt: InputMaybe<Scalars['String']>;
  content_lte: InputMaybe<Scalars['String']>;
  content_not: InputMaybe<Scalars['String']>;
  content_not_contains: InputMaybe<Scalars['String']>;
  content_not_contains_nocase: InputMaybe<Scalars['String']>;
  content_not_ends_with: InputMaybe<Scalars['String']>;
  content_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  content_not_in: InputMaybe<Array<Scalars['String']>>;
  content_not_starts_with: InputMaybe<Scalars['String']>;
  content_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  content_starts_with: InputMaybe<Scalars['String']>;
  content_starts_with_nocase: InputMaybe<Scalars['String']>;
  createdAt: InputMaybe<Scalars['String']>;
  createdAt_contains: InputMaybe<Scalars['String']>;
  createdAt_contains_nocase: InputMaybe<Scalars['String']>;
  createdAt_ends_with: InputMaybe<Scalars['String']>;
  createdAt_ends_with_nocase: InputMaybe<Scalars['String']>;
  createdAt_gt: InputMaybe<Scalars['String']>;
  createdAt_gte: InputMaybe<Scalars['String']>;
  createdAt_in: InputMaybe<Array<Scalars['String']>>;
  createdAt_lt: InputMaybe<Scalars['String']>;
  createdAt_lte: InputMaybe<Scalars['String']>;
  createdAt_not: InputMaybe<Scalars['String']>;
  createdAt_not_contains: InputMaybe<Scalars['String']>;
  createdAt_not_contains_nocase: InputMaybe<Scalars['String']>;
  createdAt_not_ends_with: InputMaybe<Scalars['String']>;
  createdAt_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  createdAt_not_in: InputMaybe<Array<Scalars['String']>>;
  createdAt_not_starts_with: InputMaybe<Scalars['String']>;
  createdAt_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  createdAt_starts_with: InputMaybe<Scalars['String']>;
  createdAt_starts_with_nocase: InputMaybe<Scalars['String']>;
  description: InputMaybe<Scalars['String']>;
  description_contains: InputMaybe<Scalars['String']>;
  description_contains_nocase: InputMaybe<Scalars['String']>;
  description_ends_with: InputMaybe<Scalars['String']>;
  description_ends_with_nocase: InputMaybe<Scalars['String']>;
  description_gt: InputMaybe<Scalars['String']>;
  description_gte: InputMaybe<Scalars['String']>;
  description_in: InputMaybe<Array<Scalars['String']>>;
  description_lt: InputMaybe<Scalars['String']>;
  description_lte: InputMaybe<Scalars['String']>;
  description_not: InputMaybe<Scalars['String']>;
  description_not_contains: InputMaybe<Scalars['String']>;
  description_not_contains_nocase: InputMaybe<Scalars['String']>;
  description_not_ends_with: InputMaybe<Scalars['String']>;
  description_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  description_not_in: InputMaybe<Array<Scalars['String']>>;
  description_not_starts_with: InputMaybe<Scalars['String']>;
  description_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  description_starts_with: InputMaybe<Scalars['String']>;
  description_starts_with_nocase: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['ID']>;
  id_gt: InputMaybe<Scalars['ID']>;
  id_gte: InputMaybe<Scalars['ID']>;
  id_in: InputMaybe<Array<Scalars['ID']>>;
  id_lt: InputMaybe<Scalars['ID']>;
  id_lte: InputMaybe<Scalars['ID']>;
  id_not: InputMaybe<Scalars['ID']>;
  id_not_in: InputMaybe<Array<Scalars['ID']>>;
  location: InputMaybe<Scalars['String']>;
  location_contains: InputMaybe<Scalars['String']>;
  location_contains_nocase: InputMaybe<Scalars['String']>;
  location_ends_with: InputMaybe<Scalars['String']>;
  location_ends_with_nocase: InputMaybe<Scalars['String']>;
  location_gt: InputMaybe<Scalars['String']>;
  location_gte: InputMaybe<Scalars['String']>;
  location_in: InputMaybe<Array<Scalars['String']>>;
  location_lt: InputMaybe<Scalars['String']>;
  location_lte: InputMaybe<Scalars['String']>;
  location_not: InputMaybe<Scalars['String']>;
  location_not_contains: InputMaybe<Scalars['String']>;
  location_not_contains_nocase: InputMaybe<Scalars['String']>;
  location_not_ends_with: InputMaybe<Scalars['String']>;
  location_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  location_not_in: InputMaybe<Array<Scalars['String']>>;
  location_not_starts_with: InputMaybe<Scalars['String']>;
  location_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  location_starts_with: InputMaybe<Scalars['String']>;
  location_starts_with_nocase: InputMaybe<Scalars['String']>;
  memberAddress: InputMaybe<Scalars['Bytes']>;
  memberAddress_contains: InputMaybe<Scalars['Bytes']>;
  memberAddress_in: InputMaybe<Array<Scalars['Bytes']>>;
  memberAddress_not: InputMaybe<Scalars['Bytes']>;
  memberAddress_not_contains: InputMaybe<Scalars['Bytes']>;
  memberAddress_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  moloch: InputMaybe<Scalars['String']>;
  molochAddress: InputMaybe<Scalars['String']>;
  molochAddress_contains: InputMaybe<Scalars['String']>;
  molochAddress_contains_nocase: InputMaybe<Scalars['String']>;
  molochAddress_ends_with: InputMaybe<Scalars['String']>;
  molochAddress_ends_with_nocase: InputMaybe<Scalars['String']>;
  molochAddress_gt: InputMaybe<Scalars['String']>;
  molochAddress_gte: InputMaybe<Scalars['String']>;
  molochAddress_in: InputMaybe<Array<Scalars['String']>>;
  molochAddress_lt: InputMaybe<Scalars['String']>;
  molochAddress_lte: InputMaybe<Scalars['String']>;
  molochAddress_not: InputMaybe<Scalars['String']>;
  molochAddress_not_contains: InputMaybe<Scalars['String']>;
  molochAddress_not_contains_nocase: InputMaybe<Scalars['String']>;
  molochAddress_not_ends_with: InputMaybe<Scalars['String']>;
  molochAddress_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  molochAddress_not_in: InputMaybe<Array<Scalars['String']>>;
  molochAddress_not_starts_with: InputMaybe<Scalars['String']>;
  molochAddress_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  molochAddress_starts_with: InputMaybe<Scalars['String']>;
  molochAddress_starts_with_nocase: InputMaybe<Scalars['String']>;
  moloch_: InputMaybe<DaoHausMoloch_Filter>;
  moloch_contains: InputMaybe<Scalars['String']>;
  moloch_contains_nocase: InputMaybe<Scalars['String']>;
  moloch_ends_with: InputMaybe<Scalars['String']>;
  moloch_ends_with_nocase: InputMaybe<Scalars['String']>;
  moloch_gt: InputMaybe<Scalars['String']>;
  moloch_gte: InputMaybe<Scalars['String']>;
  moloch_in: InputMaybe<Array<Scalars['String']>>;
  moloch_lt: InputMaybe<Scalars['String']>;
  moloch_lte: InputMaybe<Scalars['String']>;
  moloch_not: InputMaybe<Scalars['String']>;
  moloch_not_contains: InputMaybe<Scalars['String']>;
  moloch_not_contains_nocase: InputMaybe<Scalars['String']>;
  moloch_not_ends_with: InputMaybe<Scalars['String']>;
  moloch_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  moloch_not_in: InputMaybe<Array<Scalars['String']>>;
  moloch_not_starts_with: InputMaybe<Scalars['String']>;
  moloch_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  moloch_starts_with: InputMaybe<Scalars['String']>;
  moloch_starts_with_nocase: InputMaybe<Scalars['String']>;
  ratified: InputMaybe<Scalars['Boolean']>;
  ratified_in: InputMaybe<Array<Scalars['Boolean']>>;
  ratified_not: InputMaybe<Scalars['Boolean']>;
  ratified_not_in: InputMaybe<Array<Scalars['Boolean']>>;
  rawData: InputMaybe<Scalars['String']>;
  rawData_contains: InputMaybe<Scalars['String']>;
  rawData_contains_nocase: InputMaybe<Scalars['String']>;
  rawData_ends_with: InputMaybe<Scalars['String']>;
  rawData_ends_with_nocase: InputMaybe<Scalars['String']>;
  rawData_gt: InputMaybe<Scalars['String']>;
  rawData_gte: InputMaybe<Scalars['String']>;
  rawData_in: InputMaybe<Array<Scalars['String']>>;
  rawData_lt: InputMaybe<Scalars['String']>;
  rawData_lte: InputMaybe<Scalars['String']>;
  rawData_not: InputMaybe<Scalars['String']>;
  rawData_not_contains: InputMaybe<Scalars['String']>;
  rawData_not_contains_nocase: InputMaybe<Scalars['String']>;
  rawData_not_ends_with: InputMaybe<Scalars['String']>;
  rawData_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  rawData_not_in: InputMaybe<Array<Scalars['String']>>;
  rawData_not_starts_with: InputMaybe<Scalars['String']>;
  rawData_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  rawData_starts_with: InputMaybe<Scalars['String']>;
  rawData_starts_with_nocase: InputMaybe<Scalars['String']>;
  title: InputMaybe<Scalars['String']>;
  title_contains: InputMaybe<Scalars['String']>;
  title_contains_nocase: InputMaybe<Scalars['String']>;
  title_ends_with: InputMaybe<Scalars['String']>;
  title_ends_with_nocase: InputMaybe<Scalars['String']>;
  title_gt: InputMaybe<Scalars['String']>;
  title_gte: InputMaybe<Scalars['String']>;
  title_in: InputMaybe<Array<Scalars['String']>>;
  title_lt: InputMaybe<Scalars['String']>;
  title_lte: InputMaybe<Scalars['String']>;
  title_not: InputMaybe<Scalars['String']>;
  title_not_contains: InputMaybe<Scalars['String']>;
  title_not_contains_nocase: InputMaybe<Scalars['String']>;
  title_not_ends_with: InputMaybe<Scalars['String']>;
  title_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  title_not_in: InputMaybe<Array<Scalars['String']>>;
  title_not_starts_with: InputMaybe<Scalars['String']>;
  title_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  title_starts_with: InputMaybe<Scalars['String']>;
  title_starts_with_nocase: InputMaybe<Scalars['String']>;
  transactionHash: InputMaybe<Scalars['Bytes']>;
  transactionHash_contains: InputMaybe<Scalars['Bytes']>;
  transactionHash_in: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_in: InputMaybe<Array<Scalars['Bytes']>>;
};

export enum DaoHausContent_OrderBy {
  Content = 'content',
  ContentType = 'contentType',
  CreatedAt = 'createdAt',
  Description = 'description',
  Id = 'id',
  Location = 'location',
  MemberAddress = 'memberAddress',
  Moloch = 'moloch',
  MolochAddress = 'molochAddress',
  Ratified = 'ratified',
  RawData = 'rawData',
  Title = 'title',
  TransactionHash = 'transactionHash',
}

export type DaoHausDaoMeta = {
  __typename?: 'DaoMeta';
  /** deprecated */
  http: Maybe<Scalars['String']>;
  /** unique identifier and primary key of the entity */
  id: Scalars['ID'];
  /** deprecated */
  newContract: Maybe<Scalars['String']>;
  /** deprecated */
  title: Maybe<Scalars['String']>;
  /** deprecated */
  version: Maybe<Scalars['String']>;
};

export type DaoHausDaoMeta_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<DaoHausBlockChangedFilter>;
  http: InputMaybe<Scalars['String']>;
  http_contains: InputMaybe<Scalars['String']>;
  http_contains_nocase: InputMaybe<Scalars['String']>;
  http_ends_with: InputMaybe<Scalars['String']>;
  http_ends_with_nocase: InputMaybe<Scalars['String']>;
  http_gt: InputMaybe<Scalars['String']>;
  http_gte: InputMaybe<Scalars['String']>;
  http_in: InputMaybe<Array<Scalars['String']>>;
  http_lt: InputMaybe<Scalars['String']>;
  http_lte: InputMaybe<Scalars['String']>;
  http_not: InputMaybe<Scalars['String']>;
  http_not_contains: InputMaybe<Scalars['String']>;
  http_not_contains_nocase: InputMaybe<Scalars['String']>;
  http_not_ends_with: InputMaybe<Scalars['String']>;
  http_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  http_not_in: InputMaybe<Array<Scalars['String']>>;
  http_not_starts_with: InputMaybe<Scalars['String']>;
  http_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  http_starts_with: InputMaybe<Scalars['String']>;
  http_starts_with_nocase: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['ID']>;
  id_gt: InputMaybe<Scalars['ID']>;
  id_gte: InputMaybe<Scalars['ID']>;
  id_in: InputMaybe<Array<Scalars['ID']>>;
  id_lt: InputMaybe<Scalars['ID']>;
  id_lte: InputMaybe<Scalars['ID']>;
  id_not: InputMaybe<Scalars['ID']>;
  id_not_in: InputMaybe<Array<Scalars['ID']>>;
  newContract: InputMaybe<Scalars['String']>;
  newContract_contains: InputMaybe<Scalars['String']>;
  newContract_contains_nocase: InputMaybe<Scalars['String']>;
  newContract_ends_with: InputMaybe<Scalars['String']>;
  newContract_ends_with_nocase: InputMaybe<Scalars['String']>;
  newContract_gt: InputMaybe<Scalars['String']>;
  newContract_gte: InputMaybe<Scalars['String']>;
  newContract_in: InputMaybe<Array<Scalars['String']>>;
  newContract_lt: InputMaybe<Scalars['String']>;
  newContract_lte: InputMaybe<Scalars['String']>;
  newContract_not: InputMaybe<Scalars['String']>;
  newContract_not_contains: InputMaybe<Scalars['String']>;
  newContract_not_contains_nocase: InputMaybe<Scalars['String']>;
  newContract_not_ends_with: InputMaybe<Scalars['String']>;
  newContract_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  newContract_not_in: InputMaybe<Array<Scalars['String']>>;
  newContract_not_starts_with: InputMaybe<Scalars['String']>;
  newContract_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  newContract_starts_with: InputMaybe<Scalars['String']>;
  newContract_starts_with_nocase: InputMaybe<Scalars['String']>;
  title: InputMaybe<Scalars['String']>;
  title_contains: InputMaybe<Scalars['String']>;
  title_contains_nocase: InputMaybe<Scalars['String']>;
  title_ends_with: InputMaybe<Scalars['String']>;
  title_ends_with_nocase: InputMaybe<Scalars['String']>;
  title_gt: InputMaybe<Scalars['String']>;
  title_gte: InputMaybe<Scalars['String']>;
  title_in: InputMaybe<Array<Scalars['String']>>;
  title_lt: InputMaybe<Scalars['String']>;
  title_lte: InputMaybe<Scalars['String']>;
  title_not: InputMaybe<Scalars['String']>;
  title_not_contains: InputMaybe<Scalars['String']>;
  title_not_contains_nocase: InputMaybe<Scalars['String']>;
  title_not_ends_with: InputMaybe<Scalars['String']>;
  title_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  title_not_in: InputMaybe<Array<Scalars['String']>>;
  title_not_starts_with: InputMaybe<Scalars['String']>;
  title_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  title_starts_with: InputMaybe<Scalars['String']>;
  title_starts_with_nocase: InputMaybe<Scalars['String']>;
  version: InputMaybe<Scalars['String']>;
  version_contains: InputMaybe<Scalars['String']>;
  version_contains_nocase: InputMaybe<Scalars['String']>;
  version_ends_with: InputMaybe<Scalars['String']>;
  version_ends_with_nocase: InputMaybe<Scalars['String']>;
  version_gt: InputMaybe<Scalars['String']>;
  version_gte: InputMaybe<Scalars['String']>;
  version_in: InputMaybe<Array<Scalars['String']>>;
  version_lt: InputMaybe<Scalars['String']>;
  version_lte: InputMaybe<Scalars['String']>;
  version_not: InputMaybe<Scalars['String']>;
  version_not_contains: InputMaybe<Scalars['String']>;
  version_not_contains_nocase: InputMaybe<Scalars['String']>;
  version_not_ends_with: InputMaybe<Scalars['String']>;
  version_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  version_not_in: InputMaybe<Array<Scalars['String']>>;
  version_not_starts_with: InputMaybe<Scalars['String']>;
  version_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  version_starts_with: InputMaybe<Scalars['String']>;
  version_starts_with_nocase: InputMaybe<Scalars['String']>;
};

export enum DaoHausDaoMeta_OrderBy {
  Http = 'http',
  Id = 'id',
  NewContract = 'newContract',
  Title = 'title',
  Version = 'version',
}

export type DaoHausMember = {
  __typename?: 'Member';
  /** timestamp when the member was created */
  createdAt: Scalars['String'];
  /** address that has received delegated shares from the member (most often, the member's own address) */
  delegateKey: Scalars['Bytes'];
  /** boolean value of whether member ragequit from the dao */
  didRagequit: Scalars['Boolean'];
  /** deprecated */
  exists: Scalars['Boolean'];
  /** latest proposal that the member has voted yes on (helper value for disabling ragequit if member has a yes vote on an active proposal) */
  highestIndexYesVote: Maybe<DaoHausProposal>;
  /** unique identifier and primary key of the entity */
  id: Scalars['ID'];
  /** moloch dao address (if the member is a dao) */
  isDao: Maybe<DaoHausMoloch>;
  /** safe minion address (if the member is a safe minion) */
  isSafeMinion: Maybe<DaoHausSafeMinion>;
  /** proposal index of the proposal that kicked the member from the dao (0 if member is unkicked) */
  jailed: Maybe<Scalars['BigInt']>;
  /** boolean value of whether member was kicked from the dao */
  kicked: Maybe<Scalars['Boolean']>;
  /** current loot held by the member */
  loot: Scalars['BigInt'];
  /** address of the member */
  memberAddress: Scalars['Bytes'];
  /** moloch dao scoped to this member */
  moloch: DaoHausMoloch;
  /** related dao address */
  molochAddress: Scalars['Bytes'];
  /** boolean value of whether member was proposed to be kicked from the dao */
  proposedToKick: Maybe<Scalars['Boolean']>;
  /** rage quits scoped to this member */
  rageQuits: Maybe<Array<DaoHausRageQuit>>;
  /** current shares held by the member */
  shares: Scalars['BigInt'];
  /** submitted proposals scoped to this member */
  submissions: Maybe<Array<DaoHausProposal>>;
  /** token balances scoped to this member */
  tokenBalances: Maybe<Array<DaoHausTokenBalance>>;
  /** amount of token tributed when the member first joined the dao */
  tokenTribute: Scalars['BigInt'];
  /** votes scoped to this member */
  votes: Maybe<Array<DaoHausVote>>;
};

export type DaoHausMemberRageQuitsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DaoHausRageQuit_OrderBy>;
  orderDirection: InputMaybe<DaoHausOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<DaoHausRageQuit_Filter>;
};

export type DaoHausMemberSubmissionsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DaoHausProposal_OrderBy>;
  orderDirection: InputMaybe<DaoHausOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<DaoHausProposal_Filter>;
};

export type DaoHausMemberTokenBalancesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DaoHausTokenBalance_OrderBy>;
  orderDirection: InputMaybe<DaoHausOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<DaoHausTokenBalance_Filter>;
};

export type DaoHausMemberVotesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DaoHausVote_OrderBy>;
  orderDirection: InputMaybe<DaoHausOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<DaoHausVote_Filter>;
};

export type DaoHausMember_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<DaoHausBlockChangedFilter>;
  createdAt: InputMaybe<Scalars['String']>;
  createdAt_contains: InputMaybe<Scalars['String']>;
  createdAt_contains_nocase: InputMaybe<Scalars['String']>;
  createdAt_ends_with: InputMaybe<Scalars['String']>;
  createdAt_ends_with_nocase: InputMaybe<Scalars['String']>;
  createdAt_gt: InputMaybe<Scalars['String']>;
  createdAt_gte: InputMaybe<Scalars['String']>;
  createdAt_in: InputMaybe<Array<Scalars['String']>>;
  createdAt_lt: InputMaybe<Scalars['String']>;
  createdAt_lte: InputMaybe<Scalars['String']>;
  createdAt_not: InputMaybe<Scalars['String']>;
  createdAt_not_contains: InputMaybe<Scalars['String']>;
  createdAt_not_contains_nocase: InputMaybe<Scalars['String']>;
  createdAt_not_ends_with: InputMaybe<Scalars['String']>;
  createdAt_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  createdAt_not_in: InputMaybe<Array<Scalars['String']>>;
  createdAt_not_starts_with: InputMaybe<Scalars['String']>;
  createdAt_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  createdAt_starts_with: InputMaybe<Scalars['String']>;
  createdAt_starts_with_nocase: InputMaybe<Scalars['String']>;
  delegateKey: InputMaybe<Scalars['Bytes']>;
  delegateKey_contains: InputMaybe<Scalars['Bytes']>;
  delegateKey_in: InputMaybe<Array<Scalars['Bytes']>>;
  delegateKey_not: InputMaybe<Scalars['Bytes']>;
  delegateKey_not_contains: InputMaybe<Scalars['Bytes']>;
  delegateKey_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  didRagequit: InputMaybe<Scalars['Boolean']>;
  didRagequit_in: InputMaybe<Array<Scalars['Boolean']>>;
  didRagequit_not: InputMaybe<Scalars['Boolean']>;
  didRagequit_not_in: InputMaybe<Array<Scalars['Boolean']>>;
  exists: InputMaybe<Scalars['Boolean']>;
  exists_in: InputMaybe<Array<Scalars['Boolean']>>;
  exists_not: InputMaybe<Scalars['Boolean']>;
  exists_not_in: InputMaybe<Array<Scalars['Boolean']>>;
  highestIndexYesVote: InputMaybe<Scalars['String']>;
  highestIndexYesVote_: InputMaybe<DaoHausProposal_Filter>;
  highestIndexYesVote_contains: InputMaybe<Scalars['String']>;
  highestIndexYesVote_contains_nocase: InputMaybe<Scalars['String']>;
  highestIndexYesVote_ends_with: InputMaybe<Scalars['String']>;
  highestIndexYesVote_ends_with_nocase: InputMaybe<Scalars['String']>;
  highestIndexYesVote_gt: InputMaybe<Scalars['String']>;
  highestIndexYesVote_gte: InputMaybe<Scalars['String']>;
  highestIndexYesVote_in: InputMaybe<Array<Scalars['String']>>;
  highestIndexYesVote_lt: InputMaybe<Scalars['String']>;
  highestIndexYesVote_lte: InputMaybe<Scalars['String']>;
  highestIndexYesVote_not: InputMaybe<Scalars['String']>;
  highestIndexYesVote_not_contains: InputMaybe<Scalars['String']>;
  highestIndexYesVote_not_contains_nocase: InputMaybe<Scalars['String']>;
  highestIndexYesVote_not_ends_with: InputMaybe<Scalars['String']>;
  highestIndexYesVote_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  highestIndexYesVote_not_in: InputMaybe<Array<Scalars['String']>>;
  highestIndexYesVote_not_starts_with: InputMaybe<Scalars['String']>;
  highestIndexYesVote_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  highestIndexYesVote_starts_with: InputMaybe<Scalars['String']>;
  highestIndexYesVote_starts_with_nocase: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['ID']>;
  id_gt: InputMaybe<Scalars['ID']>;
  id_gte: InputMaybe<Scalars['ID']>;
  id_in: InputMaybe<Array<Scalars['ID']>>;
  id_lt: InputMaybe<Scalars['ID']>;
  id_lte: InputMaybe<Scalars['ID']>;
  id_not: InputMaybe<Scalars['ID']>;
  id_not_in: InputMaybe<Array<Scalars['ID']>>;
  isDao: InputMaybe<Scalars['String']>;
  isDao_: InputMaybe<DaoHausMoloch_Filter>;
  isDao_contains: InputMaybe<Scalars['String']>;
  isDao_contains_nocase: InputMaybe<Scalars['String']>;
  isDao_ends_with: InputMaybe<Scalars['String']>;
  isDao_ends_with_nocase: InputMaybe<Scalars['String']>;
  isDao_gt: InputMaybe<Scalars['String']>;
  isDao_gte: InputMaybe<Scalars['String']>;
  isDao_in: InputMaybe<Array<Scalars['String']>>;
  isDao_lt: InputMaybe<Scalars['String']>;
  isDao_lte: InputMaybe<Scalars['String']>;
  isDao_not: InputMaybe<Scalars['String']>;
  isDao_not_contains: InputMaybe<Scalars['String']>;
  isDao_not_contains_nocase: InputMaybe<Scalars['String']>;
  isDao_not_ends_with: InputMaybe<Scalars['String']>;
  isDao_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  isDao_not_in: InputMaybe<Array<Scalars['String']>>;
  isDao_not_starts_with: InputMaybe<Scalars['String']>;
  isDao_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  isDao_starts_with: InputMaybe<Scalars['String']>;
  isDao_starts_with_nocase: InputMaybe<Scalars['String']>;
  isSafeMinion: InputMaybe<Scalars['String']>;
  isSafeMinion_: InputMaybe<DaoHausSafeMinion_Filter>;
  isSafeMinion_contains: InputMaybe<Scalars['String']>;
  isSafeMinion_contains_nocase: InputMaybe<Scalars['String']>;
  isSafeMinion_ends_with: InputMaybe<Scalars['String']>;
  isSafeMinion_ends_with_nocase: InputMaybe<Scalars['String']>;
  isSafeMinion_gt: InputMaybe<Scalars['String']>;
  isSafeMinion_gte: InputMaybe<Scalars['String']>;
  isSafeMinion_in: InputMaybe<Array<Scalars['String']>>;
  isSafeMinion_lt: InputMaybe<Scalars['String']>;
  isSafeMinion_lte: InputMaybe<Scalars['String']>;
  isSafeMinion_not: InputMaybe<Scalars['String']>;
  isSafeMinion_not_contains: InputMaybe<Scalars['String']>;
  isSafeMinion_not_contains_nocase: InputMaybe<Scalars['String']>;
  isSafeMinion_not_ends_with: InputMaybe<Scalars['String']>;
  isSafeMinion_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  isSafeMinion_not_in: InputMaybe<Array<Scalars['String']>>;
  isSafeMinion_not_starts_with: InputMaybe<Scalars['String']>;
  isSafeMinion_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  isSafeMinion_starts_with: InputMaybe<Scalars['String']>;
  isSafeMinion_starts_with_nocase: InputMaybe<Scalars['String']>;
  jailed: InputMaybe<Scalars['BigInt']>;
  jailed_gt: InputMaybe<Scalars['BigInt']>;
  jailed_gte: InputMaybe<Scalars['BigInt']>;
  jailed_in: InputMaybe<Array<Scalars['BigInt']>>;
  jailed_lt: InputMaybe<Scalars['BigInt']>;
  jailed_lte: InputMaybe<Scalars['BigInt']>;
  jailed_not: InputMaybe<Scalars['BigInt']>;
  jailed_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  kicked: InputMaybe<Scalars['Boolean']>;
  kicked_in: InputMaybe<Array<Scalars['Boolean']>>;
  kicked_not: InputMaybe<Scalars['Boolean']>;
  kicked_not_in: InputMaybe<Array<Scalars['Boolean']>>;
  loot: InputMaybe<Scalars['BigInt']>;
  loot_gt: InputMaybe<Scalars['BigInt']>;
  loot_gte: InputMaybe<Scalars['BigInt']>;
  loot_in: InputMaybe<Array<Scalars['BigInt']>>;
  loot_lt: InputMaybe<Scalars['BigInt']>;
  loot_lte: InputMaybe<Scalars['BigInt']>;
  loot_not: InputMaybe<Scalars['BigInt']>;
  loot_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  memberAddress: InputMaybe<Scalars['Bytes']>;
  memberAddress_contains: InputMaybe<Scalars['Bytes']>;
  memberAddress_in: InputMaybe<Array<Scalars['Bytes']>>;
  memberAddress_not: InputMaybe<Scalars['Bytes']>;
  memberAddress_not_contains: InputMaybe<Scalars['Bytes']>;
  memberAddress_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  moloch: InputMaybe<Scalars['String']>;
  molochAddress: InputMaybe<Scalars['Bytes']>;
  molochAddress_contains: InputMaybe<Scalars['Bytes']>;
  molochAddress_in: InputMaybe<Array<Scalars['Bytes']>>;
  molochAddress_not: InputMaybe<Scalars['Bytes']>;
  molochAddress_not_contains: InputMaybe<Scalars['Bytes']>;
  molochAddress_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  moloch_: InputMaybe<DaoHausMoloch_Filter>;
  moloch_contains: InputMaybe<Scalars['String']>;
  moloch_contains_nocase: InputMaybe<Scalars['String']>;
  moloch_ends_with: InputMaybe<Scalars['String']>;
  moloch_ends_with_nocase: InputMaybe<Scalars['String']>;
  moloch_gt: InputMaybe<Scalars['String']>;
  moloch_gte: InputMaybe<Scalars['String']>;
  moloch_in: InputMaybe<Array<Scalars['String']>>;
  moloch_lt: InputMaybe<Scalars['String']>;
  moloch_lte: InputMaybe<Scalars['String']>;
  moloch_not: InputMaybe<Scalars['String']>;
  moloch_not_contains: InputMaybe<Scalars['String']>;
  moloch_not_contains_nocase: InputMaybe<Scalars['String']>;
  moloch_not_ends_with: InputMaybe<Scalars['String']>;
  moloch_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  moloch_not_in: InputMaybe<Array<Scalars['String']>>;
  moloch_not_starts_with: InputMaybe<Scalars['String']>;
  moloch_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  moloch_starts_with: InputMaybe<Scalars['String']>;
  moloch_starts_with_nocase: InputMaybe<Scalars['String']>;
  proposedToKick: InputMaybe<Scalars['Boolean']>;
  proposedToKick_in: InputMaybe<Array<Scalars['Boolean']>>;
  proposedToKick_not: InputMaybe<Scalars['Boolean']>;
  proposedToKick_not_in: InputMaybe<Array<Scalars['Boolean']>>;
  rageQuits_: InputMaybe<DaoHausRageQuit_Filter>;
  shares: InputMaybe<Scalars['BigInt']>;
  shares_gt: InputMaybe<Scalars['BigInt']>;
  shares_gte: InputMaybe<Scalars['BigInt']>;
  shares_in: InputMaybe<Array<Scalars['BigInt']>>;
  shares_lt: InputMaybe<Scalars['BigInt']>;
  shares_lte: InputMaybe<Scalars['BigInt']>;
  shares_not: InputMaybe<Scalars['BigInt']>;
  shares_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  submissions_: InputMaybe<DaoHausProposal_Filter>;
  tokenBalances_: InputMaybe<DaoHausTokenBalance_Filter>;
  tokenTribute: InputMaybe<Scalars['BigInt']>;
  tokenTribute_gt: InputMaybe<Scalars['BigInt']>;
  tokenTribute_gte: InputMaybe<Scalars['BigInt']>;
  tokenTribute_in: InputMaybe<Array<Scalars['BigInt']>>;
  tokenTribute_lt: InputMaybe<Scalars['BigInt']>;
  tokenTribute_lte: InputMaybe<Scalars['BigInt']>;
  tokenTribute_not: InputMaybe<Scalars['BigInt']>;
  tokenTribute_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  votes_: InputMaybe<DaoHausVote_Filter>;
};

export enum DaoHausMember_OrderBy {
  CreatedAt = 'createdAt',
  DelegateKey = 'delegateKey',
  DidRagequit = 'didRagequit',
  Exists = 'exists',
  HighestIndexYesVote = 'highestIndexYesVote',
  Id = 'id',
  IsDao = 'isDao',
  IsSafeMinion = 'isSafeMinion',
  Jailed = 'jailed',
  Kicked = 'kicked',
  Loot = 'loot',
  MemberAddress = 'memberAddress',
  Moloch = 'moloch',
  MolochAddress = 'molochAddress',
  ProposedToKick = 'proposedToKick',
  RageQuits = 'rageQuits',
  Shares = 'shares',
  Submissions = 'submissions',
  TokenBalances = 'tokenBalances',
  TokenTribute = 'tokenTribute',
  Votes = 'votes',
}

export type DaoHausMinion = {
  __typename?: 'Minion';
  /** bridge module address for a cross-chain minion */
  bridgeModule: Maybe<Scalars['String']>;
  /** timestamp of the block when the minion was summoned */
  createdAt: Scalars['String'];
  /** boolean value of whether this minion is a cross-chain minion */
  crossChainMinion: Scalars['Boolean'];
  /** name of the minion */
  details: Scalars['String'];
  /** chain id of the foreign chain */
  foreignChainId: Maybe<Scalars['String']>;
  /** safe address on the foreign chain */
  foreignSafeAddress: Maybe<Scalars['Bytes']>;
  /** unique identifier and primary key of the entity */
  id: Scalars['ID'];
  /** minimum quorum percentage of the minion */
  minQuorum: Maybe<Scalars['BigInt']>;
  /** minion address */
  minionAddress: Scalars['Bytes'];
  /** type of minion */
  minionType: Scalars['String'];
  /** moloch dao scoped to this minion */
  moloch: DaoHausMoloch;
  /** related dao address */
  molochAddress: Scalars['Bytes'];
  /** proposals scoped to this minion */
  proposals: Maybe<Array<DaoHausProposal>>;
  /** address of related safe */
  safeAddress: Maybe<Scalars['Bytes']>;
  /** version of the safe minion */
  safeMinionVersion: Maybe<Scalars['String']>;
  /** minion stream scoped to this minion */
  streams: Maybe<Array<DaoHausMinionStream>>;
  /** deprecated */
  uberHaus: Maybe<DaoHausMoloch>;
  /** address of uberhaus dao */
  uberHausAddress: Maybe<Scalars['Bytes']>;
  /** deprecated */
  uberHausDelegate: Maybe<Scalars['Bytes']>;
  /** deprecated */
  uberHausDelegateRewardFactor: Maybe<Scalars['BigInt']>;
  /** version of the minion */
  version: Maybe<Scalars['String']>;
};

export type DaoHausMinionProposalsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DaoHausProposal_OrderBy>;
  orderDirection: InputMaybe<DaoHausOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<DaoHausProposal_Filter>;
};

export type DaoHausMinionStreamsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DaoHausMinionStream_OrderBy>;
  orderDirection: InputMaybe<DaoHausOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<DaoHausMinionStream_Filter>;
};

export type DaoHausMinionAction = {
  __typename?: 'MinionAction';
  /** encoded data for minion action */
  data: Scalars['String'];
  /** unique identifier and primary key of the entity */
  id: Scalars['ID'];
  /** order of the minion action */
  index: Scalars['BigInt'];
  /** boolean value on whether the proposal can be executed by members only */
  memberOnly: Scalars['Boolean'];
  /** related minion address */
  minionAddress: Scalars['Bytes'];
  /** related dao address */
  molochAddress: Scalars['Bytes'];
  /** proposal scoped to this minion action */
  proposal: DaoHausProposal;
  /** target address of the minion action */
  target: Scalars['Bytes'];
  /** address of the token withdrawn from this minion action */
  withdrawToken: Scalars['Bytes'];
  /** value of the token withdrawn from this minion action */
  withdrawValue: Scalars['BigInt'];
};

export type DaoHausMinionAction_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<DaoHausBlockChangedFilter>;
  data: InputMaybe<Scalars['String']>;
  data_contains: InputMaybe<Scalars['String']>;
  data_contains_nocase: InputMaybe<Scalars['String']>;
  data_ends_with: InputMaybe<Scalars['String']>;
  data_ends_with_nocase: InputMaybe<Scalars['String']>;
  data_gt: InputMaybe<Scalars['String']>;
  data_gte: InputMaybe<Scalars['String']>;
  data_in: InputMaybe<Array<Scalars['String']>>;
  data_lt: InputMaybe<Scalars['String']>;
  data_lte: InputMaybe<Scalars['String']>;
  data_not: InputMaybe<Scalars['String']>;
  data_not_contains: InputMaybe<Scalars['String']>;
  data_not_contains_nocase: InputMaybe<Scalars['String']>;
  data_not_ends_with: InputMaybe<Scalars['String']>;
  data_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  data_not_in: InputMaybe<Array<Scalars['String']>>;
  data_not_starts_with: InputMaybe<Scalars['String']>;
  data_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  data_starts_with: InputMaybe<Scalars['String']>;
  data_starts_with_nocase: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['ID']>;
  id_gt: InputMaybe<Scalars['ID']>;
  id_gte: InputMaybe<Scalars['ID']>;
  id_in: InputMaybe<Array<Scalars['ID']>>;
  id_lt: InputMaybe<Scalars['ID']>;
  id_lte: InputMaybe<Scalars['ID']>;
  id_not: InputMaybe<Scalars['ID']>;
  id_not_in: InputMaybe<Array<Scalars['ID']>>;
  index: InputMaybe<Scalars['BigInt']>;
  index_gt: InputMaybe<Scalars['BigInt']>;
  index_gte: InputMaybe<Scalars['BigInt']>;
  index_in: InputMaybe<Array<Scalars['BigInt']>>;
  index_lt: InputMaybe<Scalars['BigInt']>;
  index_lte: InputMaybe<Scalars['BigInt']>;
  index_not: InputMaybe<Scalars['BigInt']>;
  index_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  memberOnly: InputMaybe<Scalars['Boolean']>;
  memberOnly_in: InputMaybe<Array<Scalars['Boolean']>>;
  memberOnly_not: InputMaybe<Scalars['Boolean']>;
  memberOnly_not_in: InputMaybe<Array<Scalars['Boolean']>>;
  minionAddress: InputMaybe<Scalars['Bytes']>;
  minionAddress_contains: InputMaybe<Scalars['Bytes']>;
  minionAddress_in: InputMaybe<Array<Scalars['Bytes']>>;
  minionAddress_not: InputMaybe<Scalars['Bytes']>;
  minionAddress_not_contains: InputMaybe<Scalars['Bytes']>;
  minionAddress_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  molochAddress: InputMaybe<Scalars['Bytes']>;
  molochAddress_contains: InputMaybe<Scalars['Bytes']>;
  molochAddress_in: InputMaybe<Array<Scalars['Bytes']>>;
  molochAddress_not: InputMaybe<Scalars['Bytes']>;
  molochAddress_not_contains: InputMaybe<Scalars['Bytes']>;
  molochAddress_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  proposal: InputMaybe<Scalars['String']>;
  proposal_: InputMaybe<DaoHausProposal_Filter>;
  proposal_contains: InputMaybe<Scalars['String']>;
  proposal_contains_nocase: InputMaybe<Scalars['String']>;
  proposal_ends_with: InputMaybe<Scalars['String']>;
  proposal_ends_with_nocase: InputMaybe<Scalars['String']>;
  proposal_gt: InputMaybe<Scalars['String']>;
  proposal_gte: InputMaybe<Scalars['String']>;
  proposal_in: InputMaybe<Array<Scalars['String']>>;
  proposal_lt: InputMaybe<Scalars['String']>;
  proposal_lte: InputMaybe<Scalars['String']>;
  proposal_not: InputMaybe<Scalars['String']>;
  proposal_not_contains: InputMaybe<Scalars['String']>;
  proposal_not_contains_nocase: InputMaybe<Scalars['String']>;
  proposal_not_ends_with: InputMaybe<Scalars['String']>;
  proposal_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  proposal_not_in: InputMaybe<Array<Scalars['String']>>;
  proposal_not_starts_with: InputMaybe<Scalars['String']>;
  proposal_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  proposal_starts_with: InputMaybe<Scalars['String']>;
  proposal_starts_with_nocase: InputMaybe<Scalars['String']>;
  target: InputMaybe<Scalars['Bytes']>;
  target_contains: InputMaybe<Scalars['Bytes']>;
  target_in: InputMaybe<Array<Scalars['Bytes']>>;
  target_not: InputMaybe<Scalars['Bytes']>;
  target_not_contains: InputMaybe<Scalars['Bytes']>;
  target_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  withdrawToken: InputMaybe<Scalars['Bytes']>;
  withdrawToken_contains: InputMaybe<Scalars['Bytes']>;
  withdrawToken_in: InputMaybe<Array<Scalars['Bytes']>>;
  withdrawToken_not: InputMaybe<Scalars['Bytes']>;
  withdrawToken_not_contains: InputMaybe<Scalars['Bytes']>;
  withdrawToken_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  withdrawValue: InputMaybe<Scalars['BigInt']>;
  withdrawValue_gt: InputMaybe<Scalars['BigInt']>;
  withdrawValue_gte: InputMaybe<Scalars['BigInt']>;
  withdrawValue_in: InputMaybe<Array<Scalars['BigInt']>>;
  withdrawValue_lt: InputMaybe<Scalars['BigInt']>;
  withdrawValue_lte: InputMaybe<Scalars['BigInt']>;
  withdrawValue_not: InputMaybe<Scalars['BigInt']>;
  withdrawValue_not_in: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum DaoHausMinionAction_OrderBy {
  Data = 'data',
  Id = 'id',
  Index = 'index',
  MemberOnly = 'memberOnly',
  MinionAddress = 'minionAddress',
  MolochAddress = 'molochAddress',
  Proposal = 'proposal',
  Target = 'target',
  WithdrawToken = 'withdrawToken',
  WithdrawValue = 'withdrawValue',
}

export type DaoHausMinionStream = {
  __typename?: 'MinionStream';
  /** boolean value of whether the minion stream is active */
  active: Scalars['Boolean'];
  /** block timestamp when the minion stream was cancelled */
  canceledAt: Maybe<Scalars['String']>;
  /** transaction hash hen the minion stream was cancelled */
  canceledBy: Maybe<Scalars['Bytes']>;
  /** block id when the minion stream was created */
  createdAt: Scalars['String'];
  /** transaction hash of cancellation of the minion stream */
  ctx: Scalars['Bytes'];
  /** transaction hash when the minion stream was executed */
  execTxHash: Maybe<Scalars['Bytes']>;
  /** boolean value of whether the minion stream was executed */
  executed: Scalars['Boolean'];
  /** block timestamp when the minion stream was executed */
  executedAt: Maybe<Scalars['String']>;
  /** block id when the minion stream was executed */
  executedBlock: Maybe<Scalars['BigInt']>;
  /** unique identifier and primary key of the entity */
  id: Scalars['ID'];
  /** minimum deposit amount to start the minion stream */
  minDeposit: Scalars['BigInt'];
  /** minion scoped to this minion stream */
  minion: DaoHausMinion;
  /** related proposal id */
  proposalId: Scalars['String'];
  /** member address that proposed the minion stream */
  proposer: Scalars['Bytes'];
  /** rate of minion stream per block */
  rate: Scalars['BigInt'];
  /** token address of super token */
  superTokenAddress: Scalars['Bytes'];
  /** recipient address of minion stream */
  to: Scalars['Bytes'];
  /** token address of minion stream */
  tokenAddress: Scalars['Bytes'];
};

export type DaoHausMinionStream_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<DaoHausBlockChangedFilter>;
  active: InputMaybe<Scalars['Boolean']>;
  active_in: InputMaybe<Array<Scalars['Boolean']>>;
  active_not: InputMaybe<Scalars['Boolean']>;
  active_not_in: InputMaybe<Array<Scalars['Boolean']>>;
  canceledAt: InputMaybe<Scalars['String']>;
  canceledAt_contains: InputMaybe<Scalars['String']>;
  canceledAt_contains_nocase: InputMaybe<Scalars['String']>;
  canceledAt_ends_with: InputMaybe<Scalars['String']>;
  canceledAt_ends_with_nocase: InputMaybe<Scalars['String']>;
  canceledAt_gt: InputMaybe<Scalars['String']>;
  canceledAt_gte: InputMaybe<Scalars['String']>;
  canceledAt_in: InputMaybe<Array<Scalars['String']>>;
  canceledAt_lt: InputMaybe<Scalars['String']>;
  canceledAt_lte: InputMaybe<Scalars['String']>;
  canceledAt_not: InputMaybe<Scalars['String']>;
  canceledAt_not_contains: InputMaybe<Scalars['String']>;
  canceledAt_not_contains_nocase: InputMaybe<Scalars['String']>;
  canceledAt_not_ends_with: InputMaybe<Scalars['String']>;
  canceledAt_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  canceledAt_not_in: InputMaybe<Array<Scalars['String']>>;
  canceledAt_not_starts_with: InputMaybe<Scalars['String']>;
  canceledAt_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  canceledAt_starts_with: InputMaybe<Scalars['String']>;
  canceledAt_starts_with_nocase: InputMaybe<Scalars['String']>;
  canceledBy: InputMaybe<Scalars['Bytes']>;
  canceledBy_contains: InputMaybe<Scalars['Bytes']>;
  canceledBy_in: InputMaybe<Array<Scalars['Bytes']>>;
  canceledBy_not: InputMaybe<Scalars['Bytes']>;
  canceledBy_not_contains: InputMaybe<Scalars['Bytes']>;
  canceledBy_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  createdAt: InputMaybe<Scalars['String']>;
  createdAt_contains: InputMaybe<Scalars['String']>;
  createdAt_contains_nocase: InputMaybe<Scalars['String']>;
  createdAt_ends_with: InputMaybe<Scalars['String']>;
  createdAt_ends_with_nocase: InputMaybe<Scalars['String']>;
  createdAt_gt: InputMaybe<Scalars['String']>;
  createdAt_gte: InputMaybe<Scalars['String']>;
  createdAt_in: InputMaybe<Array<Scalars['String']>>;
  createdAt_lt: InputMaybe<Scalars['String']>;
  createdAt_lte: InputMaybe<Scalars['String']>;
  createdAt_not: InputMaybe<Scalars['String']>;
  createdAt_not_contains: InputMaybe<Scalars['String']>;
  createdAt_not_contains_nocase: InputMaybe<Scalars['String']>;
  createdAt_not_ends_with: InputMaybe<Scalars['String']>;
  createdAt_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  createdAt_not_in: InputMaybe<Array<Scalars['String']>>;
  createdAt_not_starts_with: InputMaybe<Scalars['String']>;
  createdAt_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  createdAt_starts_with: InputMaybe<Scalars['String']>;
  createdAt_starts_with_nocase: InputMaybe<Scalars['String']>;
  ctx: InputMaybe<Scalars['Bytes']>;
  ctx_contains: InputMaybe<Scalars['Bytes']>;
  ctx_in: InputMaybe<Array<Scalars['Bytes']>>;
  ctx_not: InputMaybe<Scalars['Bytes']>;
  ctx_not_contains: InputMaybe<Scalars['Bytes']>;
  ctx_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  execTxHash: InputMaybe<Scalars['Bytes']>;
  execTxHash_contains: InputMaybe<Scalars['Bytes']>;
  execTxHash_in: InputMaybe<Array<Scalars['Bytes']>>;
  execTxHash_not: InputMaybe<Scalars['Bytes']>;
  execTxHash_not_contains: InputMaybe<Scalars['Bytes']>;
  execTxHash_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  executed: InputMaybe<Scalars['Boolean']>;
  executedAt: InputMaybe<Scalars['String']>;
  executedAt_contains: InputMaybe<Scalars['String']>;
  executedAt_contains_nocase: InputMaybe<Scalars['String']>;
  executedAt_ends_with: InputMaybe<Scalars['String']>;
  executedAt_ends_with_nocase: InputMaybe<Scalars['String']>;
  executedAt_gt: InputMaybe<Scalars['String']>;
  executedAt_gte: InputMaybe<Scalars['String']>;
  executedAt_in: InputMaybe<Array<Scalars['String']>>;
  executedAt_lt: InputMaybe<Scalars['String']>;
  executedAt_lte: InputMaybe<Scalars['String']>;
  executedAt_not: InputMaybe<Scalars['String']>;
  executedAt_not_contains: InputMaybe<Scalars['String']>;
  executedAt_not_contains_nocase: InputMaybe<Scalars['String']>;
  executedAt_not_ends_with: InputMaybe<Scalars['String']>;
  executedAt_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  executedAt_not_in: InputMaybe<Array<Scalars['String']>>;
  executedAt_not_starts_with: InputMaybe<Scalars['String']>;
  executedAt_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  executedAt_starts_with: InputMaybe<Scalars['String']>;
  executedAt_starts_with_nocase: InputMaybe<Scalars['String']>;
  executedBlock: InputMaybe<Scalars['BigInt']>;
  executedBlock_gt: InputMaybe<Scalars['BigInt']>;
  executedBlock_gte: InputMaybe<Scalars['BigInt']>;
  executedBlock_in: InputMaybe<Array<Scalars['BigInt']>>;
  executedBlock_lt: InputMaybe<Scalars['BigInt']>;
  executedBlock_lte: InputMaybe<Scalars['BigInt']>;
  executedBlock_not: InputMaybe<Scalars['BigInt']>;
  executedBlock_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  executed_in: InputMaybe<Array<Scalars['Boolean']>>;
  executed_not: InputMaybe<Scalars['Boolean']>;
  executed_not_in: InputMaybe<Array<Scalars['Boolean']>>;
  id: InputMaybe<Scalars['ID']>;
  id_gt: InputMaybe<Scalars['ID']>;
  id_gte: InputMaybe<Scalars['ID']>;
  id_in: InputMaybe<Array<Scalars['ID']>>;
  id_lt: InputMaybe<Scalars['ID']>;
  id_lte: InputMaybe<Scalars['ID']>;
  id_not: InputMaybe<Scalars['ID']>;
  id_not_in: InputMaybe<Array<Scalars['ID']>>;
  minDeposit: InputMaybe<Scalars['BigInt']>;
  minDeposit_gt: InputMaybe<Scalars['BigInt']>;
  minDeposit_gte: InputMaybe<Scalars['BigInt']>;
  minDeposit_in: InputMaybe<Array<Scalars['BigInt']>>;
  minDeposit_lt: InputMaybe<Scalars['BigInt']>;
  minDeposit_lte: InputMaybe<Scalars['BigInt']>;
  minDeposit_not: InputMaybe<Scalars['BigInt']>;
  minDeposit_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  minion: InputMaybe<Scalars['String']>;
  minion_: InputMaybe<DaoHausMinion_Filter>;
  minion_contains: InputMaybe<Scalars['String']>;
  minion_contains_nocase: InputMaybe<Scalars['String']>;
  minion_ends_with: InputMaybe<Scalars['String']>;
  minion_ends_with_nocase: InputMaybe<Scalars['String']>;
  minion_gt: InputMaybe<Scalars['String']>;
  minion_gte: InputMaybe<Scalars['String']>;
  minion_in: InputMaybe<Array<Scalars['String']>>;
  minion_lt: InputMaybe<Scalars['String']>;
  minion_lte: InputMaybe<Scalars['String']>;
  minion_not: InputMaybe<Scalars['String']>;
  minion_not_contains: InputMaybe<Scalars['String']>;
  minion_not_contains_nocase: InputMaybe<Scalars['String']>;
  minion_not_ends_with: InputMaybe<Scalars['String']>;
  minion_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  minion_not_in: InputMaybe<Array<Scalars['String']>>;
  minion_not_starts_with: InputMaybe<Scalars['String']>;
  minion_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  minion_starts_with: InputMaybe<Scalars['String']>;
  minion_starts_with_nocase: InputMaybe<Scalars['String']>;
  proposalId: InputMaybe<Scalars['String']>;
  proposalId_contains: InputMaybe<Scalars['String']>;
  proposalId_contains_nocase: InputMaybe<Scalars['String']>;
  proposalId_ends_with: InputMaybe<Scalars['String']>;
  proposalId_ends_with_nocase: InputMaybe<Scalars['String']>;
  proposalId_gt: InputMaybe<Scalars['String']>;
  proposalId_gte: InputMaybe<Scalars['String']>;
  proposalId_in: InputMaybe<Array<Scalars['String']>>;
  proposalId_lt: InputMaybe<Scalars['String']>;
  proposalId_lte: InputMaybe<Scalars['String']>;
  proposalId_not: InputMaybe<Scalars['String']>;
  proposalId_not_contains: InputMaybe<Scalars['String']>;
  proposalId_not_contains_nocase: InputMaybe<Scalars['String']>;
  proposalId_not_ends_with: InputMaybe<Scalars['String']>;
  proposalId_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  proposalId_not_in: InputMaybe<Array<Scalars['String']>>;
  proposalId_not_starts_with: InputMaybe<Scalars['String']>;
  proposalId_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  proposalId_starts_with: InputMaybe<Scalars['String']>;
  proposalId_starts_with_nocase: InputMaybe<Scalars['String']>;
  proposer: InputMaybe<Scalars['Bytes']>;
  proposer_contains: InputMaybe<Scalars['Bytes']>;
  proposer_in: InputMaybe<Array<Scalars['Bytes']>>;
  proposer_not: InputMaybe<Scalars['Bytes']>;
  proposer_not_contains: InputMaybe<Scalars['Bytes']>;
  proposer_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  rate: InputMaybe<Scalars['BigInt']>;
  rate_gt: InputMaybe<Scalars['BigInt']>;
  rate_gte: InputMaybe<Scalars['BigInt']>;
  rate_in: InputMaybe<Array<Scalars['BigInt']>>;
  rate_lt: InputMaybe<Scalars['BigInt']>;
  rate_lte: InputMaybe<Scalars['BigInt']>;
  rate_not: InputMaybe<Scalars['BigInt']>;
  rate_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  superTokenAddress: InputMaybe<Scalars['Bytes']>;
  superTokenAddress_contains: InputMaybe<Scalars['Bytes']>;
  superTokenAddress_in: InputMaybe<Array<Scalars['Bytes']>>;
  superTokenAddress_not: InputMaybe<Scalars['Bytes']>;
  superTokenAddress_not_contains: InputMaybe<Scalars['Bytes']>;
  superTokenAddress_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  to: InputMaybe<Scalars['Bytes']>;
  to_contains: InputMaybe<Scalars['Bytes']>;
  to_in: InputMaybe<Array<Scalars['Bytes']>>;
  to_not: InputMaybe<Scalars['Bytes']>;
  to_not_contains: InputMaybe<Scalars['Bytes']>;
  to_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  tokenAddress: InputMaybe<Scalars['Bytes']>;
  tokenAddress_contains: InputMaybe<Scalars['Bytes']>;
  tokenAddress_in: InputMaybe<Array<Scalars['Bytes']>>;
  tokenAddress_not: InputMaybe<Scalars['Bytes']>;
  tokenAddress_not_contains: InputMaybe<Scalars['Bytes']>;
  tokenAddress_not_in: InputMaybe<Array<Scalars['Bytes']>>;
};

export enum DaoHausMinionStream_OrderBy {
  Active = 'active',
  CanceledAt = 'canceledAt',
  CanceledBy = 'canceledBy',
  CreatedAt = 'createdAt',
  Ctx = 'ctx',
  ExecTxHash = 'execTxHash',
  Executed = 'executed',
  ExecutedAt = 'executedAt',
  ExecutedBlock = 'executedBlock',
  Id = 'id',
  MinDeposit = 'minDeposit',
  Minion = 'minion',
  ProposalId = 'proposalId',
  Proposer = 'proposer',
  Rate = 'rate',
  SuperTokenAddress = 'superTokenAddress',
  To = 'to',
  TokenAddress = 'tokenAddress',
}

export type DaoHausMinion_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<DaoHausBlockChangedFilter>;
  bridgeModule: InputMaybe<Scalars['String']>;
  bridgeModule_contains: InputMaybe<Scalars['String']>;
  bridgeModule_contains_nocase: InputMaybe<Scalars['String']>;
  bridgeModule_ends_with: InputMaybe<Scalars['String']>;
  bridgeModule_ends_with_nocase: InputMaybe<Scalars['String']>;
  bridgeModule_gt: InputMaybe<Scalars['String']>;
  bridgeModule_gte: InputMaybe<Scalars['String']>;
  bridgeModule_in: InputMaybe<Array<Scalars['String']>>;
  bridgeModule_lt: InputMaybe<Scalars['String']>;
  bridgeModule_lte: InputMaybe<Scalars['String']>;
  bridgeModule_not: InputMaybe<Scalars['String']>;
  bridgeModule_not_contains: InputMaybe<Scalars['String']>;
  bridgeModule_not_contains_nocase: InputMaybe<Scalars['String']>;
  bridgeModule_not_ends_with: InputMaybe<Scalars['String']>;
  bridgeModule_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  bridgeModule_not_in: InputMaybe<Array<Scalars['String']>>;
  bridgeModule_not_starts_with: InputMaybe<Scalars['String']>;
  bridgeModule_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  bridgeModule_starts_with: InputMaybe<Scalars['String']>;
  bridgeModule_starts_with_nocase: InputMaybe<Scalars['String']>;
  createdAt: InputMaybe<Scalars['String']>;
  createdAt_contains: InputMaybe<Scalars['String']>;
  createdAt_contains_nocase: InputMaybe<Scalars['String']>;
  createdAt_ends_with: InputMaybe<Scalars['String']>;
  createdAt_ends_with_nocase: InputMaybe<Scalars['String']>;
  createdAt_gt: InputMaybe<Scalars['String']>;
  createdAt_gte: InputMaybe<Scalars['String']>;
  createdAt_in: InputMaybe<Array<Scalars['String']>>;
  createdAt_lt: InputMaybe<Scalars['String']>;
  createdAt_lte: InputMaybe<Scalars['String']>;
  createdAt_not: InputMaybe<Scalars['String']>;
  createdAt_not_contains: InputMaybe<Scalars['String']>;
  createdAt_not_contains_nocase: InputMaybe<Scalars['String']>;
  createdAt_not_ends_with: InputMaybe<Scalars['String']>;
  createdAt_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  createdAt_not_in: InputMaybe<Array<Scalars['String']>>;
  createdAt_not_starts_with: InputMaybe<Scalars['String']>;
  createdAt_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  createdAt_starts_with: InputMaybe<Scalars['String']>;
  createdAt_starts_with_nocase: InputMaybe<Scalars['String']>;
  crossChainMinion: InputMaybe<Scalars['Boolean']>;
  crossChainMinion_in: InputMaybe<Array<Scalars['Boolean']>>;
  crossChainMinion_not: InputMaybe<Scalars['Boolean']>;
  crossChainMinion_not_in: InputMaybe<Array<Scalars['Boolean']>>;
  details: InputMaybe<Scalars['String']>;
  details_contains: InputMaybe<Scalars['String']>;
  details_contains_nocase: InputMaybe<Scalars['String']>;
  details_ends_with: InputMaybe<Scalars['String']>;
  details_ends_with_nocase: InputMaybe<Scalars['String']>;
  details_gt: InputMaybe<Scalars['String']>;
  details_gte: InputMaybe<Scalars['String']>;
  details_in: InputMaybe<Array<Scalars['String']>>;
  details_lt: InputMaybe<Scalars['String']>;
  details_lte: InputMaybe<Scalars['String']>;
  details_not: InputMaybe<Scalars['String']>;
  details_not_contains: InputMaybe<Scalars['String']>;
  details_not_contains_nocase: InputMaybe<Scalars['String']>;
  details_not_ends_with: InputMaybe<Scalars['String']>;
  details_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  details_not_in: InputMaybe<Array<Scalars['String']>>;
  details_not_starts_with: InputMaybe<Scalars['String']>;
  details_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  details_starts_with: InputMaybe<Scalars['String']>;
  details_starts_with_nocase: InputMaybe<Scalars['String']>;
  foreignChainId: InputMaybe<Scalars['String']>;
  foreignChainId_contains: InputMaybe<Scalars['String']>;
  foreignChainId_contains_nocase: InputMaybe<Scalars['String']>;
  foreignChainId_ends_with: InputMaybe<Scalars['String']>;
  foreignChainId_ends_with_nocase: InputMaybe<Scalars['String']>;
  foreignChainId_gt: InputMaybe<Scalars['String']>;
  foreignChainId_gte: InputMaybe<Scalars['String']>;
  foreignChainId_in: InputMaybe<Array<Scalars['String']>>;
  foreignChainId_lt: InputMaybe<Scalars['String']>;
  foreignChainId_lte: InputMaybe<Scalars['String']>;
  foreignChainId_not: InputMaybe<Scalars['String']>;
  foreignChainId_not_contains: InputMaybe<Scalars['String']>;
  foreignChainId_not_contains_nocase: InputMaybe<Scalars['String']>;
  foreignChainId_not_ends_with: InputMaybe<Scalars['String']>;
  foreignChainId_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  foreignChainId_not_in: InputMaybe<Array<Scalars['String']>>;
  foreignChainId_not_starts_with: InputMaybe<Scalars['String']>;
  foreignChainId_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  foreignChainId_starts_with: InputMaybe<Scalars['String']>;
  foreignChainId_starts_with_nocase: InputMaybe<Scalars['String']>;
  foreignSafeAddress: InputMaybe<Scalars['Bytes']>;
  foreignSafeAddress_contains: InputMaybe<Scalars['Bytes']>;
  foreignSafeAddress_in: InputMaybe<Array<Scalars['Bytes']>>;
  foreignSafeAddress_not: InputMaybe<Scalars['Bytes']>;
  foreignSafeAddress_not_contains: InputMaybe<Scalars['Bytes']>;
  foreignSafeAddress_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  id: InputMaybe<Scalars['ID']>;
  id_gt: InputMaybe<Scalars['ID']>;
  id_gte: InputMaybe<Scalars['ID']>;
  id_in: InputMaybe<Array<Scalars['ID']>>;
  id_lt: InputMaybe<Scalars['ID']>;
  id_lte: InputMaybe<Scalars['ID']>;
  id_not: InputMaybe<Scalars['ID']>;
  id_not_in: InputMaybe<Array<Scalars['ID']>>;
  minQuorum: InputMaybe<Scalars['BigInt']>;
  minQuorum_gt: InputMaybe<Scalars['BigInt']>;
  minQuorum_gte: InputMaybe<Scalars['BigInt']>;
  minQuorum_in: InputMaybe<Array<Scalars['BigInt']>>;
  minQuorum_lt: InputMaybe<Scalars['BigInt']>;
  minQuorum_lte: InputMaybe<Scalars['BigInt']>;
  minQuorum_not: InputMaybe<Scalars['BigInt']>;
  minQuorum_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  minionAddress: InputMaybe<Scalars['Bytes']>;
  minionAddress_contains: InputMaybe<Scalars['Bytes']>;
  minionAddress_in: InputMaybe<Array<Scalars['Bytes']>>;
  minionAddress_not: InputMaybe<Scalars['Bytes']>;
  minionAddress_not_contains: InputMaybe<Scalars['Bytes']>;
  minionAddress_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  minionType: InputMaybe<Scalars['String']>;
  minionType_contains: InputMaybe<Scalars['String']>;
  minionType_contains_nocase: InputMaybe<Scalars['String']>;
  minionType_ends_with: InputMaybe<Scalars['String']>;
  minionType_ends_with_nocase: InputMaybe<Scalars['String']>;
  minionType_gt: InputMaybe<Scalars['String']>;
  minionType_gte: InputMaybe<Scalars['String']>;
  minionType_in: InputMaybe<Array<Scalars['String']>>;
  minionType_lt: InputMaybe<Scalars['String']>;
  minionType_lte: InputMaybe<Scalars['String']>;
  minionType_not: InputMaybe<Scalars['String']>;
  minionType_not_contains: InputMaybe<Scalars['String']>;
  minionType_not_contains_nocase: InputMaybe<Scalars['String']>;
  minionType_not_ends_with: InputMaybe<Scalars['String']>;
  minionType_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  minionType_not_in: InputMaybe<Array<Scalars['String']>>;
  minionType_not_starts_with: InputMaybe<Scalars['String']>;
  minionType_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  minionType_starts_with: InputMaybe<Scalars['String']>;
  minionType_starts_with_nocase: InputMaybe<Scalars['String']>;
  moloch: InputMaybe<Scalars['String']>;
  molochAddress: InputMaybe<Scalars['Bytes']>;
  molochAddress_contains: InputMaybe<Scalars['Bytes']>;
  molochAddress_in: InputMaybe<Array<Scalars['Bytes']>>;
  molochAddress_not: InputMaybe<Scalars['Bytes']>;
  molochAddress_not_contains: InputMaybe<Scalars['Bytes']>;
  molochAddress_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  moloch_: InputMaybe<DaoHausMoloch_Filter>;
  moloch_contains: InputMaybe<Scalars['String']>;
  moloch_contains_nocase: InputMaybe<Scalars['String']>;
  moloch_ends_with: InputMaybe<Scalars['String']>;
  moloch_ends_with_nocase: InputMaybe<Scalars['String']>;
  moloch_gt: InputMaybe<Scalars['String']>;
  moloch_gte: InputMaybe<Scalars['String']>;
  moloch_in: InputMaybe<Array<Scalars['String']>>;
  moloch_lt: InputMaybe<Scalars['String']>;
  moloch_lte: InputMaybe<Scalars['String']>;
  moloch_not: InputMaybe<Scalars['String']>;
  moloch_not_contains: InputMaybe<Scalars['String']>;
  moloch_not_contains_nocase: InputMaybe<Scalars['String']>;
  moloch_not_ends_with: InputMaybe<Scalars['String']>;
  moloch_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  moloch_not_in: InputMaybe<Array<Scalars['String']>>;
  moloch_not_starts_with: InputMaybe<Scalars['String']>;
  moloch_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  moloch_starts_with: InputMaybe<Scalars['String']>;
  moloch_starts_with_nocase: InputMaybe<Scalars['String']>;
  proposals_: InputMaybe<DaoHausProposal_Filter>;
  safeAddress: InputMaybe<Scalars['Bytes']>;
  safeAddress_contains: InputMaybe<Scalars['Bytes']>;
  safeAddress_in: InputMaybe<Array<Scalars['Bytes']>>;
  safeAddress_not: InputMaybe<Scalars['Bytes']>;
  safeAddress_not_contains: InputMaybe<Scalars['Bytes']>;
  safeAddress_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  safeMinionVersion: InputMaybe<Scalars['String']>;
  safeMinionVersion_contains: InputMaybe<Scalars['String']>;
  safeMinionVersion_contains_nocase: InputMaybe<Scalars['String']>;
  safeMinionVersion_ends_with: InputMaybe<Scalars['String']>;
  safeMinionVersion_ends_with_nocase: InputMaybe<Scalars['String']>;
  safeMinionVersion_gt: InputMaybe<Scalars['String']>;
  safeMinionVersion_gte: InputMaybe<Scalars['String']>;
  safeMinionVersion_in: InputMaybe<Array<Scalars['String']>>;
  safeMinionVersion_lt: InputMaybe<Scalars['String']>;
  safeMinionVersion_lte: InputMaybe<Scalars['String']>;
  safeMinionVersion_not: InputMaybe<Scalars['String']>;
  safeMinionVersion_not_contains: InputMaybe<Scalars['String']>;
  safeMinionVersion_not_contains_nocase: InputMaybe<Scalars['String']>;
  safeMinionVersion_not_ends_with: InputMaybe<Scalars['String']>;
  safeMinionVersion_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  safeMinionVersion_not_in: InputMaybe<Array<Scalars['String']>>;
  safeMinionVersion_not_starts_with: InputMaybe<Scalars['String']>;
  safeMinionVersion_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  safeMinionVersion_starts_with: InputMaybe<Scalars['String']>;
  safeMinionVersion_starts_with_nocase: InputMaybe<Scalars['String']>;
  streams_: InputMaybe<DaoHausMinionStream_Filter>;
  uberHaus: InputMaybe<Scalars['String']>;
  uberHausAddress: InputMaybe<Scalars['Bytes']>;
  uberHausAddress_contains: InputMaybe<Scalars['Bytes']>;
  uberHausAddress_in: InputMaybe<Array<Scalars['Bytes']>>;
  uberHausAddress_not: InputMaybe<Scalars['Bytes']>;
  uberHausAddress_not_contains: InputMaybe<Scalars['Bytes']>;
  uberHausAddress_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  uberHausDelegate: InputMaybe<Scalars['Bytes']>;
  uberHausDelegateRewardFactor: InputMaybe<Scalars['BigInt']>;
  uberHausDelegateRewardFactor_gt: InputMaybe<Scalars['BigInt']>;
  uberHausDelegateRewardFactor_gte: InputMaybe<Scalars['BigInt']>;
  uberHausDelegateRewardFactor_in: InputMaybe<Array<Scalars['BigInt']>>;
  uberHausDelegateRewardFactor_lt: InputMaybe<Scalars['BigInt']>;
  uberHausDelegateRewardFactor_lte: InputMaybe<Scalars['BigInt']>;
  uberHausDelegateRewardFactor_not: InputMaybe<Scalars['BigInt']>;
  uberHausDelegateRewardFactor_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  uberHausDelegate_contains: InputMaybe<Scalars['Bytes']>;
  uberHausDelegate_in: InputMaybe<Array<Scalars['Bytes']>>;
  uberHausDelegate_not: InputMaybe<Scalars['Bytes']>;
  uberHausDelegate_not_contains: InputMaybe<Scalars['Bytes']>;
  uberHausDelegate_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  uberHaus_: InputMaybe<DaoHausMoloch_Filter>;
  uberHaus_contains: InputMaybe<Scalars['String']>;
  uberHaus_contains_nocase: InputMaybe<Scalars['String']>;
  uberHaus_ends_with: InputMaybe<Scalars['String']>;
  uberHaus_ends_with_nocase: InputMaybe<Scalars['String']>;
  uberHaus_gt: InputMaybe<Scalars['String']>;
  uberHaus_gte: InputMaybe<Scalars['String']>;
  uberHaus_in: InputMaybe<Array<Scalars['String']>>;
  uberHaus_lt: InputMaybe<Scalars['String']>;
  uberHaus_lte: InputMaybe<Scalars['String']>;
  uberHaus_not: InputMaybe<Scalars['String']>;
  uberHaus_not_contains: InputMaybe<Scalars['String']>;
  uberHaus_not_contains_nocase: InputMaybe<Scalars['String']>;
  uberHaus_not_ends_with: InputMaybe<Scalars['String']>;
  uberHaus_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  uberHaus_not_in: InputMaybe<Array<Scalars['String']>>;
  uberHaus_not_starts_with: InputMaybe<Scalars['String']>;
  uberHaus_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  uberHaus_starts_with: InputMaybe<Scalars['String']>;
  uberHaus_starts_with_nocase: InputMaybe<Scalars['String']>;
  version: InputMaybe<Scalars['String']>;
  version_contains: InputMaybe<Scalars['String']>;
  version_contains_nocase: InputMaybe<Scalars['String']>;
  version_ends_with: InputMaybe<Scalars['String']>;
  version_ends_with_nocase: InputMaybe<Scalars['String']>;
  version_gt: InputMaybe<Scalars['String']>;
  version_gte: InputMaybe<Scalars['String']>;
  version_in: InputMaybe<Array<Scalars['String']>>;
  version_lt: InputMaybe<Scalars['String']>;
  version_lte: InputMaybe<Scalars['String']>;
  version_not: InputMaybe<Scalars['String']>;
  version_not_contains: InputMaybe<Scalars['String']>;
  version_not_contains_nocase: InputMaybe<Scalars['String']>;
  version_not_ends_with: InputMaybe<Scalars['String']>;
  version_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  version_not_in: InputMaybe<Array<Scalars['String']>>;
  version_not_starts_with: InputMaybe<Scalars['String']>;
  version_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  version_starts_with: InputMaybe<Scalars['String']>;
  version_starts_with_nocase: InputMaybe<Scalars['String']>;
};

export enum DaoHausMinion_OrderBy {
  BridgeModule = 'bridgeModule',
  CreatedAt = 'createdAt',
  CrossChainMinion = 'crossChainMinion',
  Details = 'details',
  ForeignChainId = 'foreignChainId',
  ForeignSafeAddress = 'foreignSafeAddress',
  Id = 'id',
  MinQuorum = 'minQuorum',
  MinionAddress = 'minionAddress',
  MinionType = 'minionType',
  Moloch = 'moloch',
  MolochAddress = 'molochAddress',
  Proposals = 'proposals',
  SafeAddress = 'safeAddress',
  SafeMinionVersion = 'safeMinionVersion',
  Streams = 'streams',
  UberHaus = 'uberHaus',
  UberHausAddress = 'uberHausAddress',
  UberHausDelegate = 'uberHausDelegate',
  UberHausDelegateRewardFactor = 'uberHausDelegateRewardFactor',
  Version = 'version',
}

export type DaoHausMoloch = {
  __typename?: 'Moloch';
  /** approved tokens scoped to this dao */
  approvedTokens: Array<DaoHausToken>;
  /** timestamp of the block when the dao was summoned */
  createdAt: Scalars['String'];
  /** deprecated */
  deleted: Maybe<Scalars['Boolean']>;
  /** token address for the dao's primary token */
  depositToken: DaoHausToken;
  /** (1/dilutionBound) is the minimum membership treshold for a ragequit to pass */
  dilutionBound: Scalars['BigInt'];
  /** documents scoped to this dao */
  documents: Maybe<Array<DaoHausContent>>;
  /** length in seconds of the current grace period */
  gracePeriodLength: Scalars['BigInt'];
  /** the dao's treasury address */
  guildBankAddress: Maybe<Scalars['Bytes']>;
  /** deprecated */
  guildBankBalanceV1: Maybe<Scalars['BigInt']>;
  /** unique identifier and primary key of the entity */
  id: Scalars['ID'];
  /** member addresses scoped to this dao */
  members: Maybe<Array<DaoHausMember>>;
  /** minion addresses scoped to this dao */
  minions: Maybe<Array<DaoHausMinion>>;
  /** deprecated */
  newContract: Maybe<Scalars['String']>;
  /** length in seconds of the current voting period and grace period */
  periodDuration: Scalars['BigInt'];
  /** reward amount for processing a proposal */
  processingReward: Scalars['BigInt'];
  /** deposit amount required to submit a proposal */
  proposalDeposit: Scalars['BigInt'];
  /** proposals scoped to this dao */
  proposals: Maybe<Array<DaoHausProposal>>;
  /** ragequits scoped to this dao */
  rageQuits: Maybe<Array<DaoHausRageQuit>>;
  /** records scoped to this dao */
  records: Maybe<Array<DaoHausRecord>>;
  /** shamans scoped to this dao */
  shamans: Maybe<Array<DaoHausShaman>>;
  /** unused - address that receives tributes for submitting a proposal */
  spamPreventionAddress: Maybe<Scalars['Bytes']>;
  /** unused - tribute amount required for submitting a proposal */
  spamPreventionAmount: Maybe<Scalars['BigInt']>;
  /** address that created the dao */
  summoner: Scalars['Bytes'];
  /** timestamp of the block when the dao was summoned - duplicated */
  summoningTime: Scalars['BigInt'];
  /** token balances scoped to this dao */
  tokenBalances: Maybe<Array<DaoHausTokenBalance>>;
  /** tokens scoped to this dao */
  tokens: Array<DaoHausToken>;
  /** total circulating loot tokens */
  totalLoot: Scalars['BigInt'];
  /** total circulating shares tokens */
  totalShares: Scalars['BigInt'];
  /** boolean value of whether v2.2 is set up */
  v22Setup: Maybe<Scalars['Boolean']>;
  /** version of moloch contract (v1, v2, v2.1, v2.2) */
  version: Maybe<Scalars['String']>;
  /** length in seconds of the current voting period */
  votingPeriodLength: Scalars['BigInt'];
};

export type DaoHausMolochApprovedTokensArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DaoHausToken_OrderBy>;
  orderDirection: InputMaybe<DaoHausOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<DaoHausToken_Filter>;
};

export type DaoHausMolochDocumentsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DaoHausContent_OrderBy>;
  orderDirection: InputMaybe<DaoHausOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<DaoHausContent_Filter>;
};

export type DaoHausMolochMembersArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DaoHausMember_OrderBy>;
  orderDirection: InputMaybe<DaoHausOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<DaoHausMember_Filter>;
};

export type DaoHausMolochMinionsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DaoHausMinion_OrderBy>;
  orderDirection: InputMaybe<DaoHausOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<DaoHausMinion_Filter>;
};

export type DaoHausMolochProposalsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DaoHausProposal_OrderBy>;
  orderDirection: InputMaybe<DaoHausOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<DaoHausProposal_Filter>;
};

export type DaoHausMolochRageQuitsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DaoHausRageQuit_OrderBy>;
  orderDirection: InputMaybe<DaoHausOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<DaoHausRageQuit_Filter>;
};

export type DaoHausMolochRecordsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DaoHausRecord_OrderBy>;
  orderDirection: InputMaybe<DaoHausOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<DaoHausRecord_Filter>;
};

export type DaoHausMolochShamansArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DaoHausShaman_OrderBy>;
  orderDirection: InputMaybe<DaoHausOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<DaoHausShaman_Filter>;
};

export type DaoHausMolochTokenBalancesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DaoHausTokenBalance_OrderBy>;
  orderDirection: InputMaybe<DaoHausOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<DaoHausTokenBalance_Filter>;
};

export type DaoHausMolochTokensArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DaoHausToken_OrderBy>;
  orderDirection: InputMaybe<DaoHausOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<DaoHausToken_Filter>;
};

export type DaoHausMolochTransaction = {
  __typename?: 'MolochTransaction';
  /** block timestamp when the moloch transaction was created */
  createdAt: Scalars['String'];
  /** unique identifier and primary key of the entity */
  id: Scalars['ID'];
};

export type DaoHausMolochTransaction_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<DaoHausBlockChangedFilter>;
  createdAt: InputMaybe<Scalars['String']>;
  createdAt_contains: InputMaybe<Scalars['String']>;
  createdAt_contains_nocase: InputMaybe<Scalars['String']>;
  createdAt_ends_with: InputMaybe<Scalars['String']>;
  createdAt_ends_with_nocase: InputMaybe<Scalars['String']>;
  createdAt_gt: InputMaybe<Scalars['String']>;
  createdAt_gte: InputMaybe<Scalars['String']>;
  createdAt_in: InputMaybe<Array<Scalars['String']>>;
  createdAt_lt: InputMaybe<Scalars['String']>;
  createdAt_lte: InputMaybe<Scalars['String']>;
  createdAt_not: InputMaybe<Scalars['String']>;
  createdAt_not_contains: InputMaybe<Scalars['String']>;
  createdAt_not_contains_nocase: InputMaybe<Scalars['String']>;
  createdAt_not_ends_with: InputMaybe<Scalars['String']>;
  createdAt_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  createdAt_not_in: InputMaybe<Array<Scalars['String']>>;
  createdAt_not_starts_with: InputMaybe<Scalars['String']>;
  createdAt_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  createdAt_starts_with: InputMaybe<Scalars['String']>;
  createdAt_starts_with_nocase: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['ID']>;
  id_gt: InputMaybe<Scalars['ID']>;
  id_gte: InputMaybe<Scalars['ID']>;
  id_in: InputMaybe<Array<Scalars['ID']>>;
  id_lt: InputMaybe<Scalars['ID']>;
  id_lte: InputMaybe<Scalars['ID']>;
  id_not: InputMaybe<Scalars['ID']>;
  id_not_in: InputMaybe<Array<Scalars['ID']>>;
};

export enum DaoHausMolochTransaction_OrderBy {
  CreatedAt = 'createdAt',
  Id = 'id',
}

export type DaoHausMoloch_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<DaoHausBlockChangedFilter>;
  approvedTokens: InputMaybe<Array<Scalars['String']>>;
  approvedTokens_: InputMaybe<DaoHausToken_Filter>;
  approvedTokens_contains: InputMaybe<Array<Scalars['String']>>;
  approvedTokens_contains_nocase: InputMaybe<Array<Scalars['String']>>;
  approvedTokens_not: InputMaybe<Array<Scalars['String']>>;
  approvedTokens_not_contains: InputMaybe<Array<Scalars['String']>>;
  approvedTokens_not_contains_nocase: InputMaybe<Array<Scalars['String']>>;
  createdAt: InputMaybe<Scalars['String']>;
  createdAt_contains: InputMaybe<Scalars['String']>;
  createdAt_contains_nocase: InputMaybe<Scalars['String']>;
  createdAt_ends_with: InputMaybe<Scalars['String']>;
  createdAt_ends_with_nocase: InputMaybe<Scalars['String']>;
  createdAt_gt: InputMaybe<Scalars['String']>;
  createdAt_gte: InputMaybe<Scalars['String']>;
  createdAt_in: InputMaybe<Array<Scalars['String']>>;
  createdAt_lt: InputMaybe<Scalars['String']>;
  createdAt_lte: InputMaybe<Scalars['String']>;
  createdAt_not: InputMaybe<Scalars['String']>;
  createdAt_not_contains: InputMaybe<Scalars['String']>;
  createdAt_not_contains_nocase: InputMaybe<Scalars['String']>;
  createdAt_not_ends_with: InputMaybe<Scalars['String']>;
  createdAt_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  createdAt_not_in: InputMaybe<Array<Scalars['String']>>;
  createdAt_not_starts_with: InputMaybe<Scalars['String']>;
  createdAt_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  createdAt_starts_with: InputMaybe<Scalars['String']>;
  createdAt_starts_with_nocase: InputMaybe<Scalars['String']>;
  deleted: InputMaybe<Scalars['Boolean']>;
  deleted_in: InputMaybe<Array<Scalars['Boolean']>>;
  deleted_not: InputMaybe<Scalars['Boolean']>;
  deleted_not_in: InputMaybe<Array<Scalars['Boolean']>>;
  depositToken: InputMaybe<Scalars['String']>;
  depositToken_: InputMaybe<DaoHausToken_Filter>;
  depositToken_contains: InputMaybe<Scalars['String']>;
  depositToken_contains_nocase: InputMaybe<Scalars['String']>;
  depositToken_ends_with: InputMaybe<Scalars['String']>;
  depositToken_ends_with_nocase: InputMaybe<Scalars['String']>;
  depositToken_gt: InputMaybe<Scalars['String']>;
  depositToken_gte: InputMaybe<Scalars['String']>;
  depositToken_in: InputMaybe<Array<Scalars['String']>>;
  depositToken_lt: InputMaybe<Scalars['String']>;
  depositToken_lte: InputMaybe<Scalars['String']>;
  depositToken_not: InputMaybe<Scalars['String']>;
  depositToken_not_contains: InputMaybe<Scalars['String']>;
  depositToken_not_contains_nocase: InputMaybe<Scalars['String']>;
  depositToken_not_ends_with: InputMaybe<Scalars['String']>;
  depositToken_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  depositToken_not_in: InputMaybe<Array<Scalars['String']>>;
  depositToken_not_starts_with: InputMaybe<Scalars['String']>;
  depositToken_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  depositToken_starts_with: InputMaybe<Scalars['String']>;
  depositToken_starts_with_nocase: InputMaybe<Scalars['String']>;
  dilutionBound: InputMaybe<Scalars['BigInt']>;
  dilutionBound_gt: InputMaybe<Scalars['BigInt']>;
  dilutionBound_gte: InputMaybe<Scalars['BigInt']>;
  dilutionBound_in: InputMaybe<Array<Scalars['BigInt']>>;
  dilutionBound_lt: InputMaybe<Scalars['BigInt']>;
  dilutionBound_lte: InputMaybe<Scalars['BigInt']>;
  dilutionBound_not: InputMaybe<Scalars['BigInt']>;
  dilutionBound_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  documents_: InputMaybe<DaoHausContent_Filter>;
  gracePeriodLength: InputMaybe<Scalars['BigInt']>;
  gracePeriodLength_gt: InputMaybe<Scalars['BigInt']>;
  gracePeriodLength_gte: InputMaybe<Scalars['BigInt']>;
  gracePeriodLength_in: InputMaybe<Array<Scalars['BigInt']>>;
  gracePeriodLength_lt: InputMaybe<Scalars['BigInt']>;
  gracePeriodLength_lte: InputMaybe<Scalars['BigInt']>;
  gracePeriodLength_not: InputMaybe<Scalars['BigInt']>;
  gracePeriodLength_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  guildBankAddress: InputMaybe<Scalars['Bytes']>;
  guildBankAddress_contains: InputMaybe<Scalars['Bytes']>;
  guildBankAddress_in: InputMaybe<Array<Scalars['Bytes']>>;
  guildBankAddress_not: InputMaybe<Scalars['Bytes']>;
  guildBankAddress_not_contains: InputMaybe<Scalars['Bytes']>;
  guildBankAddress_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  guildBankBalanceV1: InputMaybe<Scalars['BigInt']>;
  guildBankBalanceV1_gt: InputMaybe<Scalars['BigInt']>;
  guildBankBalanceV1_gte: InputMaybe<Scalars['BigInt']>;
  guildBankBalanceV1_in: InputMaybe<Array<Scalars['BigInt']>>;
  guildBankBalanceV1_lt: InputMaybe<Scalars['BigInt']>;
  guildBankBalanceV1_lte: InputMaybe<Scalars['BigInt']>;
  guildBankBalanceV1_not: InputMaybe<Scalars['BigInt']>;
  guildBankBalanceV1_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  id: InputMaybe<Scalars['ID']>;
  id_gt: InputMaybe<Scalars['ID']>;
  id_gte: InputMaybe<Scalars['ID']>;
  id_in: InputMaybe<Array<Scalars['ID']>>;
  id_lt: InputMaybe<Scalars['ID']>;
  id_lte: InputMaybe<Scalars['ID']>;
  id_not: InputMaybe<Scalars['ID']>;
  id_not_in: InputMaybe<Array<Scalars['ID']>>;
  members_: InputMaybe<DaoHausMember_Filter>;
  minions_: InputMaybe<DaoHausMinion_Filter>;
  newContract: InputMaybe<Scalars['String']>;
  newContract_contains: InputMaybe<Scalars['String']>;
  newContract_contains_nocase: InputMaybe<Scalars['String']>;
  newContract_ends_with: InputMaybe<Scalars['String']>;
  newContract_ends_with_nocase: InputMaybe<Scalars['String']>;
  newContract_gt: InputMaybe<Scalars['String']>;
  newContract_gte: InputMaybe<Scalars['String']>;
  newContract_in: InputMaybe<Array<Scalars['String']>>;
  newContract_lt: InputMaybe<Scalars['String']>;
  newContract_lte: InputMaybe<Scalars['String']>;
  newContract_not: InputMaybe<Scalars['String']>;
  newContract_not_contains: InputMaybe<Scalars['String']>;
  newContract_not_contains_nocase: InputMaybe<Scalars['String']>;
  newContract_not_ends_with: InputMaybe<Scalars['String']>;
  newContract_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  newContract_not_in: InputMaybe<Array<Scalars['String']>>;
  newContract_not_starts_with: InputMaybe<Scalars['String']>;
  newContract_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  newContract_starts_with: InputMaybe<Scalars['String']>;
  newContract_starts_with_nocase: InputMaybe<Scalars['String']>;
  periodDuration: InputMaybe<Scalars['BigInt']>;
  periodDuration_gt: InputMaybe<Scalars['BigInt']>;
  periodDuration_gte: InputMaybe<Scalars['BigInt']>;
  periodDuration_in: InputMaybe<Array<Scalars['BigInt']>>;
  periodDuration_lt: InputMaybe<Scalars['BigInt']>;
  periodDuration_lte: InputMaybe<Scalars['BigInt']>;
  periodDuration_not: InputMaybe<Scalars['BigInt']>;
  periodDuration_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  processingReward: InputMaybe<Scalars['BigInt']>;
  processingReward_gt: InputMaybe<Scalars['BigInt']>;
  processingReward_gte: InputMaybe<Scalars['BigInt']>;
  processingReward_in: InputMaybe<Array<Scalars['BigInt']>>;
  processingReward_lt: InputMaybe<Scalars['BigInt']>;
  processingReward_lte: InputMaybe<Scalars['BigInt']>;
  processingReward_not: InputMaybe<Scalars['BigInt']>;
  processingReward_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  proposalDeposit: InputMaybe<Scalars['BigInt']>;
  proposalDeposit_gt: InputMaybe<Scalars['BigInt']>;
  proposalDeposit_gte: InputMaybe<Scalars['BigInt']>;
  proposalDeposit_in: InputMaybe<Array<Scalars['BigInt']>>;
  proposalDeposit_lt: InputMaybe<Scalars['BigInt']>;
  proposalDeposit_lte: InputMaybe<Scalars['BigInt']>;
  proposalDeposit_not: InputMaybe<Scalars['BigInt']>;
  proposalDeposit_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  proposals_: InputMaybe<DaoHausProposal_Filter>;
  rageQuits_: InputMaybe<DaoHausRageQuit_Filter>;
  records_: InputMaybe<DaoHausRecord_Filter>;
  shamans_: InputMaybe<DaoHausShaman_Filter>;
  spamPreventionAddress: InputMaybe<Scalars['Bytes']>;
  spamPreventionAddress_contains: InputMaybe<Scalars['Bytes']>;
  spamPreventionAddress_in: InputMaybe<Array<Scalars['Bytes']>>;
  spamPreventionAddress_not: InputMaybe<Scalars['Bytes']>;
  spamPreventionAddress_not_contains: InputMaybe<Scalars['Bytes']>;
  spamPreventionAddress_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  spamPreventionAmount: InputMaybe<Scalars['BigInt']>;
  spamPreventionAmount_gt: InputMaybe<Scalars['BigInt']>;
  spamPreventionAmount_gte: InputMaybe<Scalars['BigInt']>;
  spamPreventionAmount_in: InputMaybe<Array<Scalars['BigInt']>>;
  spamPreventionAmount_lt: InputMaybe<Scalars['BigInt']>;
  spamPreventionAmount_lte: InputMaybe<Scalars['BigInt']>;
  spamPreventionAmount_not: InputMaybe<Scalars['BigInt']>;
  spamPreventionAmount_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  summoner: InputMaybe<Scalars['Bytes']>;
  summoner_contains: InputMaybe<Scalars['Bytes']>;
  summoner_in: InputMaybe<Array<Scalars['Bytes']>>;
  summoner_not: InputMaybe<Scalars['Bytes']>;
  summoner_not_contains: InputMaybe<Scalars['Bytes']>;
  summoner_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  summoningTime: InputMaybe<Scalars['BigInt']>;
  summoningTime_gt: InputMaybe<Scalars['BigInt']>;
  summoningTime_gte: InputMaybe<Scalars['BigInt']>;
  summoningTime_in: InputMaybe<Array<Scalars['BigInt']>>;
  summoningTime_lt: InputMaybe<Scalars['BigInt']>;
  summoningTime_lte: InputMaybe<Scalars['BigInt']>;
  summoningTime_not: InputMaybe<Scalars['BigInt']>;
  summoningTime_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  tokenBalances_: InputMaybe<DaoHausTokenBalance_Filter>;
  tokens_: InputMaybe<DaoHausToken_Filter>;
  totalLoot: InputMaybe<Scalars['BigInt']>;
  totalLoot_gt: InputMaybe<Scalars['BigInt']>;
  totalLoot_gte: InputMaybe<Scalars['BigInt']>;
  totalLoot_in: InputMaybe<Array<Scalars['BigInt']>>;
  totalLoot_lt: InputMaybe<Scalars['BigInt']>;
  totalLoot_lte: InputMaybe<Scalars['BigInt']>;
  totalLoot_not: InputMaybe<Scalars['BigInt']>;
  totalLoot_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  totalShares: InputMaybe<Scalars['BigInt']>;
  totalShares_gt: InputMaybe<Scalars['BigInt']>;
  totalShares_gte: InputMaybe<Scalars['BigInt']>;
  totalShares_in: InputMaybe<Array<Scalars['BigInt']>>;
  totalShares_lt: InputMaybe<Scalars['BigInt']>;
  totalShares_lte: InputMaybe<Scalars['BigInt']>;
  totalShares_not: InputMaybe<Scalars['BigInt']>;
  totalShares_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  v22Setup: InputMaybe<Scalars['Boolean']>;
  v22Setup_in: InputMaybe<Array<Scalars['Boolean']>>;
  v22Setup_not: InputMaybe<Scalars['Boolean']>;
  v22Setup_not_in: InputMaybe<Array<Scalars['Boolean']>>;
  version: InputMaybe<Scalars['String']>;
  version_contains: InputMaybe<Scalars['String']>;
  version_contains_nocase: InputMaybe<Scalars['String']>;
  version_ends_with: InputMaybe<Scalars['String']>;
  version_ends_with_nocase: InputMaybe<Scalars['String']>;
  version_gt: InputMaybe<Scalars['String']>;
  version_gte: InputMaybe<Scalars['String']>;
  version_in: InputMaybe<Array<Scalars['String']>>;
  version_lt: InputMaybe<Scalars['String']>;
  version_lte: InputMaybe<Scalars['String']>;
  version_not: InputMaybe<Scalars['String']>;
  version_not_contains: InputMaybe<Scalars['String']>;
  version_not_contains_nocase: InputMaybe<Scalars['String']>;
  version_not_ends_with: InputMaybe<Scalars['String']>;
  version_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  version_not_in: InputMaybe<Array<Scalars['String']>>;
  version_not_starts_with: InputMaybe<Scalars['String']>;
  version_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  version_starts_with: InputMaybe<Scalars['String']>;
  version_starts_with_nocase: InputMaybe<Scalars['String']>;
  votingPeriodLength: InputMaybe<Scalars['BigInt']>;
  votingPeriodLength_gt: InputMaybe<Scalars['BigInt']>;
  votingPeriodLength_gte: InputMaybe<Scalars['BigInt']>;
  votingPeriodLength_in: InputMaybe<Array<Scalars['BigInt']>>;
  votingPeriodLength_lt: InputMaybe<Scalars['BigInt']>;
  votingPeriodLength_lte: InputMaybe<Scalars['BigInt']>;
  votingPeriodLength_not: InputMaybe<Scalars['BigInt']>;
  votingPeriodLength_not_in: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum DaoHausMoloch_OrderBy {
  ApprovedTokens = 'approvedTokens',
  CreatedAt = 'createdAt',
  Deleted = 'deleted',
  DepositToken = 'depositToken',
  DilutionBound = 'dilutionBound',
  Documents = 'documents',
  GracePeriodLength = 'gracePeriodLength',
  GuildBankAddress = 'guildBankAddress',
  GuildBankBalanceV1 = 'guildBankBalanceV1',
  Id = 'id',
  Members = 'members',
  Minions = 'minions',
  NewContract = 'newContract',
  PeriodDuration = 'periodDuration',
  ProcessingReward = 'processingReward',
  ProposalDeposit = 'proposalDeposit',
  Proposals = 'proposals',
  RageQuits = 'rageQuits',
  Records = 'records',
  Shamans = 'shamans',
  SpamPreventionAddress = 'spamPreventionAddress',
  SpamPreventionAmount = 'spamPreventionAmount',
  Summoner = 'summoner',
  SummoningTime = 'summoningTime',
  TokenBalances = 'tokenBalances',
  Tokens = 'tokens',
  TotalLoot = 'totalLoot',
  TotalShares = 'totalShares',
  V22Setup = 'v22Setup',
  Version = 'version',
  VotingPeriodLength = 'votingPeriodLength',
}

/** Defines the order direction, either ascending or descending */
export enum DaoHausOrderDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export type DaoHausProposal = {
  __typename?: 'Proposal';
  /** boolean value of whether this proposal is aborted */
  aborted: Maybe<Scalars['Boolean']>;
  /** minion action scoped to this proposal */
  actions: Maybe<Array<DaoHausMinionAction>>;
  /** address of the proposal applicant */
  applicant: Scalars['Bytes'];
  /** boolean value of whether proposal was cancelled */
  cancelled: Maybe<Scalars['Boolean']>;
  /** block timestamp when the proposal was cancelled */
  cancelledAt: Maybe<Scalars['String']>;
  /** block timestamp when the proposal was submitted */
  createdAt: Scalars['String'];
  /** address that submitted the proposal */
  createdBy: Scalars['Bytes'];
  /** address that has received delegated shares from the member (most often, the member's own address) */
  delegateKey: Scalars['Bytes'];
  /** proposal details scoped to this proposal */
  details: Maybe<Scalars['String']>;
  /** boolean value of whether proposal was passed */
  didPass: Scalars['Boolean'];
  /** escrow minion that holds a nft tribute for a new member proposal */
  escrow: Maybe<DaoHausProposalEscrow>;
  /** boolean value of whether the proposal is executed (for minion proposals only) */
  executed: Maybe<Scalars['Boolean']>;
  /** timestamp when the grace period ends */
  gracePeriodEnds: Scalars['BigInt'];
  /** boolean value of whether this proposal is a guildkick proposal */
  guildkick: Maybe<Scalars['Boolean']>;
  /** unused */
  guildkickOrWhitelistOrMinion: Maybe<Scalars['Boolean']>;
  /** unique identifier and primary key of the entity */
  id: Scalars['ID'];
  /** boolean value of whether this is a minion proposal */
  isMinion: Scalars['Boolean'];
  /** amount of loot requested in this proposal */
  lootRequested: Scalars['BigInt'];
  /** total dao shares and loot at time of yes vote (helper value for dilution bound calculation) */
  maxTotalSharesAndLootAtYesVote: Maybe<Scalars['BigInt']>;
  /** member scoped to this proposal */
  member: DaoHausMember;
  /** address of associated member */
  memberAddress: Scalars['Bytes'];
  /** minion object scoped to this proposal */
  minion: Maybe<DaoHausMinion>;
  /** minion address */
  minionAddress: Maybe<Scalars['Bytes']>;
  /** transaction hash scoped to the minion execution for this proposal */
  minionExecuteActionTx: Maybe<DaoHausMolochTransaction>;
  /** moloch dao scoped to this proposal */
  moloch: DaoHausMoloch;
  /** contract address of the DAO related to this proposal */
  molochAddress: Scalars['Bytes'];
  /** version of the moloch dao */
  molochVersion: Scalars['String'];
  /** boolean value of whether this proposal is a new member proposal */
  newMember: Maybe<Scalars['Boolean']>;
  /** number of shares that voted no */
  noShares: Scalars['BigInt'];
  /** amount of current shares that have voted no */
  noVotes: Scalars['BigInt'];
  /** amount of payment requested */
  paymentRequested: Scalars['BigInt'];
  /** address of payment token requested */
  paymentToken: Scalars['Bytes'];
  /** decimals of payment token */
  paymentTokenDecimals: Maybe<Scalars['BigInt']>;
  /** symbol of payment token requested */
  paymentTokenSymbol: Maybe<Scalars['String']>;
  /** boolean value of whether proposal was processed */
  processed: Scalars['Boolean'];
  /** block timestamp when the proposal was processed */
  processedAt: Maybe<Scalars['String']>;
  /** address of the proposal processor */
  processor: Maybe<Scalars['Bytes']>;
  /** id of the proposal */
  proposalId: Scalars['BigInt'];
  /** order that the proposal went through sponsorship process */
  proposalIndex: Maybe<Scalars['BigInt']>;
  /** address of the proposal proposer */
  proposer: Maybe<Scalars['Bytes']>;
  /** amount of shares requested in this proposal */
  sharesRequested: Scalars['BigInt'];
  /** address of the proposal sponsor */
  sponsor: Scalars['Bytes'];
  /** boolean value of whether proposal was sponsored */
  sponsored: Scalars['Boolean'];
  /** block timestamp when the proposal was sponsored */
  sponsoredAt: Maybe<Scalars['String']>;
  /** timestamp when the proposal enters the proposal queue */
  startingPeriod: Maybe<Scalars['BigInt']>;
  /** boolean value of whether this proposal is a trade proposal */
  trade: Maybe<Scalars['Boolean']>;
  /** amount of tribute offered in this proposal */
  tributeOffered: Scalars['BigInt'];
  /** address of tribute token */
  tributeToken: Scalars['Bytes'];
  /** decimals of tribute token */
  tributeTokenDecimals: Maybe<Scalars['BigInt']>;
  /** symbol of tribute token */
  tributeTokenSymbol: Maybe<Scalars['String']>;
  /** unused */
  uberHausMinionExecuted: Maybe<Scalars['Boolean']>;
  /** votes scoped to this proposal */
  votes: Maybe<Array<DaoHausVote>>;
  /** timestamp when the voting period ends */
  votingPeriodEnds: Scalars['BigInt'];
  /** timestamp when the voting period starts */
  votingPeriodStarts: Scalars['BigInt'];
  /** boolean value of whether this proposal is a whitelist token proposal */
  whitelist: Maybe<Scalars['Boolean']>;
  /** number of shares that voted yes */
  yesShares: Scalars['BigInt'];
  /** amount of current shares that have voted yes */
  yesVotes: Scalars['BigInt'];
};

export type DaoHausProposalActionsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DaoHausMinionAction_OrderBy>;
  orderDirection: InputMaybe<DaoHausOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<DaoHausMinionAction_Filter>;
};

export type DaoHausProposalVotesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DaoHausVote_OrderBy>;
  orderDirection: InputMaybe<DaoHausOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<DaoHausVote_Filter>;
};

export type DaoHausProposalEscrow = {
  __typename?: 'ProposalEscrow';
  /** amounts for tokens in escrow */
  amounts: Maybe<Array<Scalars['BigInt']>>;
  /** unique identifier and primary key of the entity */
  id: Scalars['ID'];
  /** address of the associated minion */
  minionAddress: Scalars['Bytes'];
  /** address of the associated moloch dao */
  molochAddress: Scalars['Bytes'];
  /** proposal scoped to this proposal escrow */
  proposal: DaoHausProposal;
  /** address of the user who proposed this proposal escrow */
  proposer: Scalars['Bytes'];
  /** address of the associated token */
  tokenAddresses: Maybe<Array<Scalars['Bytes']>>;
  /** token IDs for tokens in escrow */
  tokenIds: Maybe<Array<Scalars['BigInt']>>;
  /** token standards for tokens in escrow (1 for erc-20, 2 for erc-721, 3 for erc-1155) */
  tokenTypes: Maybe<Array<Scalars['BigInt']>>;
};

export type DaoHausProposalEscrow_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<DaoHausBlockChangedFilter>;
  amounts: InputMaybe<Array<Scalars['BigInt']>>;
  amounts_contains: InputMaybe<Array<Scalars['BigInt']>>;
  amounts_contains_nocase: InputMaybe<Array<Scalars['BigInt']>>;
  amounts_not: InputMaybe<Array<Scalars['BigInt']>>;
  amounts_not_contains: InputMaybe<Array<Scalars['BigInt']>>;
  amounts_not_contains_nocase: InputMaybe<Array<Scalars['BigInt']>>;
  id: InputMaybe<Scalars['ID']>;
  id_gt: InputMaybe<Scalars['ID']>;
  id_gte: InputMaybe<Scalars['ID']>;
  id_in: InputMaybe<Array<Scalars['ID']>>;
  id_lt: InputMaybe<Scalars['ID']>;
  id_lte: InputMaybe<Scalars['ID']>;
  id_not: InputMaybe<Scalars['ID']>;
  id_not_in: InputMaybe<Array<Scalars['ID']>>;
  minionAddress: InputMaybe<Scalars['Bytes']>;
  minionAddress_contains: InputMaybe<Scalars['Bytes']>;
  minionAddress_in: InputMaybe<Array<Scalars['Bytes']>>;
  minionAddress_not: InputMaybe<Scalars['Bytes']>;
  minionAddress_not_contains: InputMaybe<Scalars['Bytes']>;
  minionAddress_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  molochAddress: InputMaybe<Scalars['Bytes']>;
  molochAddress_contains: InputMaybe<Scalars['Bytes']>;
  molochAddress_in: InputMaybe<Array<Scalars['Bytes']>>;
  molochAddress_not: InputMaybe<Scalars['Bytes']>;
  molochAddress_not_contains: InputMaybe<Scalars['Bytes']>;
  molochAddress_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  proposal: InputMaybe<Scalars['String']>;
  proposal_: InputMaybe<DaoHausProposal_Filter>;
  proposal_contains: InputMaybe<Scalars['String']>;
  proposal_contains_nocase: InputMaybe<Scalars['String']>;
  proposal_ends_with: InputMaybe<Scalars['String']>;
  proposal_ends_with_nocase: InputMaybe<Scalars['String']>;
  proposal_gt: InputMaybe<Scalars['String']>;
  proposal_gte: InputMaybe<Scalars['String']>;
  proposal_in: InputMaybe<Array<Scalars['String']>>;
  proposal_lt: InputMaybe<Scalars['String']>;
  proposal_lte: InputMaybe<Scalars['String']>;
  proposal_not: InputMaybe<Scalars['String']>;
  proposal_not_contains: InputMaybe<Scalars['String']>;
  proposal_not_contains_nocase: InputMaybe<Scalars['String']>;
  proposal_not_ends_with: InputMaybe<Scalars['String']>;
  proposal_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  proposal_not_in: InputMaybe<Array<Scalars['String']>>;
  proposal_not_starts_with: InputMaybe<Scalars['String']>;
  proposal_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  proposal_starts_with: InputMaybe<Scalars['String']>;
  proposal_starts_with_nocase: InputMaybe<Scalars['String']>;
  proposer: InputMaybe<Scalars['Bytes']>;
  proposer_contains: InputMaybe<Scalars['Bytes']>;
  proposer_in: InputMaybe<Array<Scalars['Bytes']>>;
  proposer_not: InputMaybe<Scalars['Bytes']>;
  proposer_not_contains: InputMaybe<Scalars['Bytes']>;
  proposer_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  tokenAddresses: InputMaybe<Array<Scalars['Bytes']>>;
  tokenAddresses_contains: InputMaybe<Array<Scalars['Bytes']>>;
  tokenAddresses_contains_nocase: InputMaybe<Array<Scalars['Bytes']>>;
  tokenAddresses_not: InputMaybe<Array<Scalars['Bytes']>>;
  tokenAddresses_not_contains: InputMaybe<Array<Scalars['Bytes']>>;
  tokenAddresses_not_contains_nocase: InputMaybe<Array<Scalars['Bytes']>>;
  tokenIds: InputMaybe<Array<Scalars['BigInt']>>;
  tokenIds_contains: InputMaybe<Array<Scalars['BigInt']>>;
  tokenIds_contains_nocase: InputMaybe<Array<Scalars['BigInt']>>;
  tokenIds_not: InputMaybe<Array<Scalars['BigInt']>>;
  tokenIds_not_contains: InputMaybe<Array<Scalars['BigInt']>>;
  tokenIds_not_contains_nocase: InputMaybe<Array<Scalars['BigInt']>>;
  tokenTypes: InputMaybe<Array<Scalars['BigInt']>>;
  tokenTypes_contains: InputMaybe<Array<Scalars['BigInt']>>;
  tokenTypes_contains_nocase: InputMaybe<Array<Scalars['BigInt']>>;
  tokenTypes_not: InputMaybe<Array<Scalars['BigInt']>>;
  tokenTypes_not_contains: InputMaybe<Array<Scalars['BigInt']>>;
  tokenTypes_not_contains_nocase: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum DaoHausProposalEscrow_OrderBy {
  Amounts = 'amounts',
  Id = 'id',
  MinionAddress = 'minionAddress',
  MolochAddress = 'molochAddress',
  Proposal = 'proposal',
  Proposer = 'proposer',
  TokenAddresses = 'tokenAddresses',
  TokenIds = 'tokenIds',
  TokenTypes = 'tokenTypes',
}

export type DaoHausProposal_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<DaoHausBlockChangedFilter>;
  aborted: InputMaybe<Scalars['Boolean']>;
  aborted_in: InputMaybe<Array<Scalars['Boolean']>>;
  aborted_not: InputMaybe<Scalars['Boolean']>;
  aborted_not_in: InputMaybe<Array<Scalars['Boolean']>>;
  actions_: InputMaybe<DaoHausMinionAction_Filter>;
  applicant: InputMaybe<Scalars['Bytes']>;
  applicant_contains: InputMaybe<Scalars['Bytes']>;
  applicant_in: InputMaybe<Array<Scalars['Bytes']>>;
  applicant_not: InputMaybe<Scalars['Bytes']>;
  applicant_not_contains: InputMaybe<Scalars['Bytes']>;
  applicant_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  cancelled: InputMaybe<Scalars['Boolean']>;
  cancelledAt: InputMaybe<Scalars['String']>;
  cancelledAt_contains: InputMaybe<Scalars['String']>;
  cancelledAt_contains_nocase: InputMaybe<Scalars['String']>;
  cancelledAt_ends_with: InputMaybe<Scalars['String']>;
  cancelledAt_ends_with_nocase: InputMaybe<Scalars['String']>;
  cancelledAt_gt: InputMaybe<Scalars['String']>;
  cancelledAt_gte: InputMaybe<Scalars['String']>;
  cancelledAt_in: InputMaybe<Array<Scalars['String']>>;
  cancelledAt_lt: InputMaybe<Scalars['String']>;
  cancelledAt_lte: InputMaybe<Scalars['String']>;
  cancelledAt_not: InputMaybe<Scalars['String']>;
  cancelledAt_not_contains: InputMaybe<Scalars['String']>;
  cancelledAt_not_contains_nocase: InputMaybe<Scalars['String']>;
  cancelledAt_not_ends_with: InputMaybe<Scalars['String']>;
  cancelledAt_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  cancelledAt_not_in: InputMaybe<Array<Scalars['String']>>;
  cancelledAt_not_starts_with: InputMaybe<Scalars['String']>;
  cancelledAt_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  cancelledAt_starts_with: InputMaybe<Scalars['String']>;
  cancelledAt_starts_with_nocase: InputMaybe<Scalars['String']>;
  cancelled_in: InputMaybe<Array<Scalars['Boolean']>>;
  cancelled_not: InputMaybe<Scalars['Boolean']>;
  cancelled_not_in: InputMaybe<Array<Scalars['Boolean']>>;
  createdAt: InputMaybe<Scalars['String']>;
  createdAt_contains: InputMaybe<Scalars['String']>;
  createdAt_contains_nocase: InputMaybe<Scalars['String']>;
  createdAt_ends_with: InputMaybe<Scalars['String']>;
  createdAt_ends_with_nocase: InputMaybe<Scalars['String']>;
  createdAt_gt: InputMaybe<Scalars['String']>;
  createdAt_gte: InputMaybe<Scalars['String']>;
  createdAt_in: InputMaybe<Array<Scalars['String']>>;
  createdAt_lt: InputMaybe<Scalars['String']>;
  createdAt_lte: InputMaybe<Scalars['String']>;
  createdAt_not: InputMaybe<Scalars['String']>;
  createdAt_not_contains: InputMaybe<Scalars['String']>;
  createdAt_not_contains_nocase: InputMaybe<Scalars['String']>;
  createdAt_not_ends_with: InputMaybe<Scalars['String']>;
  createdAt_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  createdAt_not_in: InputMaybe<Array<Scalars['String']>>;
  createdAt_not_starts_with: InputMaybe<Scalars['String']>;
  createdAt_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  createdAt_starts_with: InputMaybe<Scalars['String']>;
  createdAt_starts_with_nocase: InputMaybe<Scalars['String']>;
  createdBy: InputMaybe<Scalars['Bytes']>;
  createdBy_contains: InputMaybe<Scalars['Bytes']>;
  createdBy_in: InputMaybe<Array<Scalars['Bytes']>>;
  createdBy_not: InputMaybe<Scalars['Bytes']>;
  createdBy_not_contains: InputMaybe<Scalars['Bytes']>;
  createdBy_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  delegateKey: InputMaybe<Scalars['Bytes']>;
  delegateKey_contains: InputMaybe<Scalars['Bytes']>;
  delegateKey_in: InputMaybe<Array<Scalars['Bytes']>>;
  delegateKey_not: InputMaybe<Scalars['Bytes']>;
  delegateKey_not_contains: InputMaybe<Scalars['Bytes']>;
  delegateKey_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  details: InputMaybe<Scalars['String']>;
  details_contains: InputMaybe<Scalars['String']>;
  details_contains_nocase: InputMaybe<Scalars['String']>;
  details_ends_with: InputMaybe<Scalars['String']>;
  details_ends_with_nocase: InputMaybe<Scalars['String']>;
  details_gt: InputMaybe<Scalars['String']>;
  details_gte: InputMaybe<Scalars['String']>;
  details_in: InputMaybe<Array<Scalars['String']>>;
  details_lt: InputMaybe<Scalars['String']>;
  details_lte: InputMaybe<Scalars['String']>;
  details_not: InputMaybe<Scalars['String']>;
  details_not_contains: InputMaybe<Scalars['String']>;
  details_not_contains_nocase: InputMaybe<Scalars['String']>;
  details_not_ends_with: InputMaybe<Scalars['String']>;
  details_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  details_not_in: InputMaybe<Array<Scalars['String']>>;
  details_not_starts_with: InputMaybe<Scalars['String']>;
  details_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  details_starts_with: InputMaybe<Scalars['String']>;
  details_starts_with_nocase: InputMaybe<Scalars['String']>;
  didPass: InputMaybe<Scalars['Boolean']>;
  didPass_in: InputMaybe<Array<Scalars['Boolean']>>;
  didPass_not: InputMaybe<Scalars['Boolean']>;
  didPass_not_in: InputMaybe<Array<Scalars['Boolean']>>;
  escrow_: InputMaybe<DaoHausProposalEscrow_Filter>;
  executed: InputMaybe<Scalars['Boolean']>;
  executed_in: InputMaybe<Array<Scalars['Boolean']>>;
  executed_not: InputMaybe<Scalars['Boolean']>;
  executed_not_in: InputMaybe<Array<Scalars['Boolean']>>;
  gracePeriodEnds: InputMaybe<Scalars['BigInt']>;
  gracePeriodEnds_gt: InputMaybe<Scalars['BigInt']>;
  gracePeriodEnds_gte: InputMaybe<Scalars['BigInt']>;
  gracePeriodEnds_in: InputMaybe<Array<Scalars['BigInt']>>;
  gracePeriodEnds_lt: InputMaybe<Scalars['BigInt']>;
  gracePeriodEnds_lte: InputMaybe<Scalars['BigInt']>;
  gracePeriodEnds_not: InputMaybe<Scalars['BigInt']>;
  gracePeriodEnds_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  guildkick: InputMaybe<Scalars['Boolean']>;
  guildkickOrWhitelistOrMinion: InputMaybe<Scalars['Boolean']>;
  guildkickOrWhitelistOrMinion_in: InputMaybe<Array<Scalars['Boolean']>>;
  guildkickOrWhitelistOrMinion_not: InputMaybe<Scalars['Boolean']>;
  guildkickOrWhitelistOrMinion_not_in: InputMaybe<Array<Scalars['Boolean']>>;
  guildkick_in: InputMaybe<Array<Scalars['Boolean']>>;
  guildkick_not: InputMaybe<Scalars['Boolean']>;
  guildkick_not_in: InputMaybe<Array<Scalars['Boolean']>>;
  id: InputMaybe<Scalars['ID']>;
  id_gt: InputMaybe<Scalars['ID']>;
  id_gte: InputMaybe<Scalars['ID']>;
  id_in: InputMaybe<Array<Scalars['ID']>>;
  id_lt: InputMaybe<Scalars['ID']>;
  id_lte: InputMaybe<Scalars['ID']>;
  id_not: InputMaybe<Scalars['ID']>;
  id_not_in: InputMaybe<Array<Scalars['ID']>>;
  isMinion: InputMaybe<Scalars['Boolean']>;
  isMinion_in: InputMaybe<Array<Scalars['Boolean']>>;
  isMinion_not: InputMaybe<Scalars['Boolean']>;
  isMinion_not_in: InputMaybe<Array<Scalars['Boolean']>>;
  lootRequested: InputMaybe<Scalars['BigInt']>;
  lootRequested_gt: InputMaybe<Scalars['BigInt']>;
  lootRequested_gte: InputMaybe<Scalars['BigInt']>;
  lootRequested_in: InputMaybe<Array<Scalars['BigInt']>>;
  lootRequested_lt: InputMaybe<Scalars['BigInt']>;
  lootRequested_lte: InputMaybe<Scalars['BigInt']>;
  lootRequested_not: InputMaybe<Scalars['BigInt']>;
  lootRequested_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  maxTotalSharesAndLootAtYesVote: InputMaybe<Scalars['BigInt']>;
  maxTotalSharesAndLootAtYesVote_gt: InputMaybe<Scalars['BigInt']>;
  maxTotalSharesAndLootAtYesVote_gte: InputMaybe<Scalars['BigInt']>;
  maxTotalSharesAndLootAtYesVote_in: InputMaybe<Array<Scalars['BigInt']>>;
  maxTotalSharesAndLootAtYesVote_lt: InputMaybe<Scalars['BigInt']>;
  maxTotalSharesAndLootAtYesVote_lte: InputMaybe<Scalars['BigInt']>;
  maxTotalSharesAndLootAtYesVote_not: InputMaybe<Scalars['BigInt']>;
  maxTotalSharesAndLootAtYesVote_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  member: InputMaybe<Scalars['String']>;
  memberAddress: InputMaybe<Scalars['Bytes']>;
  memberAddress_contains: InputMaybe<Scalars['Bytes']>;
  memberAddress_in: InputMaybe<Array<Scalars['Bytes']>>;
  memberAddress_not: InputMaybe<Scalars['Bytes']>;
  memberAddress_not_contains: InputMaybe<Scalars['Bytes']>;
  memberAddress_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  member_: InputMaybe<DaoHausMember_Filter>;
  member_contains: InputMaybe<Scalars['String']>;
  member_contains_nocase: InputMaybe<Scalars['String']>;
  member_ends_with: InputMaybe<Scalars['String']>;
  member_ends_with_nocase: InputMaybe<Scalars['String']>;
  member_gt: InputMaybe<Scalars['String']>;
  member_gte: InputMaybe<Scalars['String']>;
  member_in: InputMaybe<Array<Scalars['String']>>;
  member_lt: InputMaybe<Scalars['String']>;
  member_lte: InputMaybe<Scalars['String']>;
  member_not: InputMaybe<Scalars['String']>;
  member_not_contains: InputMaybe<Scalars['String']>;
  member_not_contains_nocase: InputMaybe<Scalars['String']>;
  member_not_ends_with: InputMaybe<Scalars['String']>;
  member_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  member_not_in: InputMaybe<Array<Scalars['String']>>;
  member_not_starts_with: InputMaybe<Scalars['String']>;
  member_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  member_starts_with: InputMaybe<Scalars['String']>;
  member_starts_with_nocase: InputMaybe<Scalars['String']>;
  minion: InputMaybe<Scalars['String']>;
  minionAddress: InputMaybe<Scalars['Bytes']>;
  minionAddress_contains: InputMaybe<Scalars['Bytes']>;
  minionAddress_in: InputMaybe<Array<Scalars['Bytes']>>;
  minionAddress_not: InputMaybe<Scalars['Bytes']>;
  minionAddress_not_contains: InputMaybe<Scalars['Bytes']>;
  minionAddress_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  minionExecuteActionTx: InputMaybe<Scalars['String']>;
  minionExecuteActionTx_: InputMaybe<DaoHausMolochTransaction_Filter>;
  minionExecuteActionTx_contains: InputMaybe<Scalars['String']>;
  minionExecuteActionTx_contains_nocase: InputMaybe<Scalars['String']>;
  minionExecuteActionTx_ends_with: InputMaybe<Scalars['String']>;
  minionExecuteActionTx_ends_with_nocase: InputMaybe<Scalars['String']>;
  minionExecuteActionTx_gt: InputMaybe<Scalars['String']>;
  minionExecuteActionTx_gte: InputMaybe<Scalars['String']>;
  minionExecuteActionTx_in: InputMaybe<Array<Scalars['String']>>;
  minionExecuteActionTx_lt: InputMaybe<Scalars['String']>;
  minionExecuteActionTx_lte: InputMaybe<Scalars['String']>;
  minionExecuteActionTx_not: InputMaybe<Scalars['String']>;
  minionExecuteActionTx_not_contains: InputMaybe<Scalars['String']>;
  minionExecuteActionTx_not_contains_nocase: InputMaybe<Scalars['String']>;
  minionExecuteActionTx_not_ends_with: InputMaybe<Scalars['String']>;
  minionExecuteActionTx_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  minionExecuteActionTx_not_in: InputMaybe<Array<Scalars['String']>>;
  minionExecuteActionTx_not_starts_with: InputMaybe<Scalars['String']>;
  minionExecuteActionTx_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  minionExecuteActionTx_starts_with: InputMaybe<Scalars['String']>;
  minionExecuteActionTx_starts_with_nocase: InputMaybe<Scalars['String']>;
  minion_: InputMaybe<DaoHausMinion_Filter>;
  minion_contains: InputMaybe<Scalars['String']>;
  minion_contains_nocase: InputMaybe<Scalars['String']>;
  minion_ends_with: InputMaybe<Scalars['String']>;
  minion_ends_with_nocase: InputMaybe<Scalars['String']>;
  minion_gt: InputMaybe<Scalars['String']>;
  minion_gte: InputMaybe<Scalars['String']>;
  minion_in: InputMaybe<Array<Scalars['String']>>;
  minion_lt: InputMaybe<Scalars['String']>;
  minion_lte: InputMaybe<Scalars['String']>;
  minion_not: InputMaybe<Scalars['String']>;
  minion_not_contains: InputMaybe<Scalars['String']>;
  minion_not_contains_nocase: InputMaybe<Scalars['String']>;
  minion_not_ends_with: InputMaybe<Scalars['String']>;
  minion_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  minion_not_in: InputMaybe<Array<Scalars['String']>>;
  minion_not_starts_with: InputMaybe<Scalars['String']>;
  minion_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  minion_starts_with: InputMaybe<Scalars['String']>;
  minion_starts_with_nocase: InputMaybe<Scalars['String']>;
  moloch: InputMaybe<Scalars['String']>;
  molochAddress: InputMaybe<Scalars['Bytes']>;
  molochAddress_contains: InputMaybe<Scalars['Bytes']>;
  molochAddress_in: InputMaybe<Array<Scalars['Bytes']>>;
  molochAddress_not: InputMaybe<Scalars['Bytes']>;
  molochAddress_not_contains: InputMaybe<Scalars['Bytes']>;
  molochAddress_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  molochVersion: InputMaybe<Scalars['String']>;
  molochVersion_contains: InputMaybe<Scalars['String']>;
  molochVersion_contains_nocase: InputMaybe<Scalars['String']>;
  molochVersion_ends_with: InputMaybe<Scalars['String']>;
  molochVersion_ends_with_nocase: InputMaybe<Scalars['String']>;
  molochVersion_gt: InputMaybe<Scalars['String']>;
  molochVersion_gte: InputMaybe<Scalars['String']>;
  molochVersion_in: InputMaybe<Array<Scalars['String']>>;
  molochVersion_lt: InputMaybe<Scalars['String']>;
  molochVersion_lte: InputMaybe<Scalars['String']>;
  molochVersion_not: InputMaybe<Scalars['String']>;
  molochVersion_not_contains: InputMaybe<Scalars['String']>;
  molochVersion_not_contains_nocase: InputMaybe<Scalars['String']>;
  molochVersion_not_ends_with: InputMaybe<Scalars['String']>;
  molochVersion_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  molochVersion_not_in: InputMaybe<Array<Scalars['String']>>;
  molochVersion_not_starts_with: InputMaybe<Scalars['String']>;
  molochVersion_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  molochVersion_starts_with: InputMaybe<Scalars['String']>;
  molochVersion_starts_with_nocase: InputMaybe<Scalars['String']>;
  moloch_: InputMaybe<DaoHausMoloch_Filter>;
  moloch_contains: InputMaybe<Scalars['String']>;
  moloch_contains_nocase: InputMaybe<Scalars['String']>;
  moloch_ends_with: InputMaybe<Scalars['String']>;
  moloch_ends_with_nocase: InputMaybe<Scalars['String']>;
  moloch_gt: InputMaybe<Scalars['String']>;
  moloch_gte: InputMaybe<Scalars['String']>;
  moloch_in: InputMaybe<Array<Scalars['String']>>;
  moloch_lt: InputMaybe<Scalars['String']>;
  moloch_lte: InputMaybe<Scalars['String']>;
  moloch_not: InputMaybe<Scalars['String']>;
  moloch_not_contains: InputMaybe<Scalars['String']>;
  moloch_not_contains_nocase: InputMaybe<Scalars['String']>;
  moloch_not_ends_with: InputMaybe<Scalars['String']>;
  moloch_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  moloch_not_in: InputMaybe<Array<Scalars['String']>>;
  moloch_not_starts_with: InputMaybe<Scalars['String']>;
  moloch_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  moloch_starts_with: InputMaybe<Scalars['String']>;
  moloch_starts_with_nocase: InputMaybe<Scalars['String']>;
  newMember: InputMaybe<Scalars['Boolean']>;
  newMember_in: InputMaybe<Array<Scalars['Boolean']>>;
  newMember_not: InputMaybe<Scalars['Boolean']>;
  newMember_not_in: InputMaybe<Array<Scalars['Boolean']>>;
  noShares: InputMaybe<Scalars['BigInt']>;
  noShares_gt: InputMaybe<Scalars['BigInt']>;
  noShares_gte: InputMaybe<Scalars['BigInt']>;
  noShares_in: InputMaybe<Array<Scalars['BigInt']>>;
  noShares_lt: InputMaybe<Scalars['BigInt']>;
  noShares_lte: InputMaybe<Scalars['BigInt']>;
  noShares_not: InputMaybe<Scalars['BigInt']>;
  noShares_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  noVotes: InputMaybe<Scalars['BigInt']>;
  noVotes_gt: InputMaybe<Scalars['BigInt']>;
  noVotes_gte: InputMaybe<Scalars['BigInt']>;
  noVotes_in: InputMaybe<Array<Scalars['BigInt']>>;
  noVotes_lt: InputMaybe<Scalars['BigInt']>;
  noVotes_lte: InputMaybe<Scalars['BigInt']>;
  noVotes_not: InputMaybe<Scalars['BigInt']>;
  noVotes_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  paymentRequested: InputMaybe<Scalars['BigInt']>;
  paymentRequested_gt: InputMaybe<Scalars['BigInt']>;
  paymentRequested_gte: InputMaybe<Scalars['BigInt']>;
  paymentRequested_in: InputMaybe<Array<Scalars['BigInt']>>;
  paymentRequested_lt: InputMaybe<Scalars['BigInt']>;
  paymentRequested_lte: InputMaybe<Scalars['BigInt']>;
  paymentRequested_not: InputMaybe<Scalars['BigInt']>;
  paymentRequested_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  paymentToken: InputMaybe<Scalars['Bytes']>;
  paymentTokenDecimals: InputMaybe<Scalars['BigInt']>;
  paymentTokenDecimals_gt: InputMaybe<Scalars['BigInt']>;
  paymentTokenDecimals_gte: InputMaybe<Scalars['BigInt']>;
  paymentTokenDecimals_in: InputMaybe<Array<Scalars['BigInt']>>;
  paymentTokenDecimals_lt: InputMaybe<Scalars['BigInt']>;
  paymentTokenDecimals_lte: InputMaybe<Scalars['BigInt']>;
  paymentTokenDecimals_not: InputMaybe<Scalars['BigInt']>;
  paymentTokenDecimals_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  paymentTokenSymbol: InputMaybe<Scalars['String']>;
  paymentTokenSymbol_contains: InputMaybe<Scalars['String']>;
  paymentTokenSymbol_contains_nocase: InputMaybe<Scalars['String']>;
  paymentTokenSymbol_ends_with: InputMaybe<Scalars['String']>;
  paymentTokenSymbol_ends_with_nocase: InputMaybe<Scalars['String']>;
  paymentTokenSymbol_gt: InputMaybe<Scalars['String']>;
  paymentTokenSymbol_gte: InputMaybe<Scalars['String']>;
  paymentTokenSymbol_in: InputMaybe<Array<Scalars['String']>>;
  paymentTokenSymbol_lt: InputMaybe<Scalars['String']>;
  paymentTokenSymbol_lte: InputMaybe<Scalars['String']>;
  paymentTokenSymbol_not: InputMaybe<Scalars['String']>;
  paymentTokenSymbol_not_contains: InputMaybe<Scalars['String']>;
  paymentTokenSymbol_not_contains_nocase: InputMaybe<Scalars['String']>;
  paymentTokenSymbol_not_ends_with: InputMaybe<Scalars['String']>;
  paymentTokenSymbol_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  paymentTokenSymbol_not_in: InputMaybe<Array<Scalars['String']>>;
  paymentTokenSymbol_not_starts_with: InputMaybe<Scalars['String']>;
  paymentTokenSymbol_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  paymentTokenSymbol_starts_with: InputMaybe<Scalars['String']>;
  paymentTokenSymbol_starts_with_nocase: InputMaybe<Scalars['String']>;
  paymentToken_contains: InputMaybe<Scalars['Bytes']>;
  paymentToken_in: InputMaybe<Array<Scalars['Bytes']>>;
  paymentToken_not: InputMaybe<Scalars['Bytes']>;
  paymentToken_not_contains: InputMaybe<Scalars['Bytes']>;
  paymentToken_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  processed: InputMaybe<Scalars['Boolean']>;
  processedAt: InputMaybe<Scalars['String']>;
  processedAt_contains: InputMaybe<Scalars['String']>;
  processedAt_contains_nocase: InputMaybe<Scalars['String']>;
  processedAt_ends_with: InputMaybe<Scalars['String']>;
  processedAt_ends_with_nocase: InputMaybe<Scalars['String']>;
  processedAt_gt: InputMaybe<Scalars['String']>;
  processedAt_gte: InputMaybe<Scalars['String']>;
  processedAt_in: InputMaybe<Array<Scalars['String']>>;
  processedAt_lt: InputMaybe<Scalars['String']>;
  processedAt_lte: InputMaybe<Scalars['String']>;
  processedAt_not: InputMaybe<Scalars['String']>;
  processedAt_not_contains: InputMaybe<Scalars['String']>;
  processedAt_not_contains_nocase: InputMaybe<Scalars['String']>;
  processedAt_not_ends_with: InputMaybe<Scalars['String']>;
  processedAt_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  processedAt_not_in: InputMaybe<Array<Scalars['String']>>;
  processedAt_not_starts_with: InputMaybe<Scalars['String']>;
  processedAt_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  processedAt_starts_with: InputMaybe<Scalars['String']>;
  processedAt_starts_with_nocase: InputMaybe<Scalars['String']>;
  processed_in: InputMaybe<Array<Scalars['Boolean']>>;
  processed_not: InputMaybe<Scalars['Boolean']>;
  processed_not_in: InputMaybe<Array<Scalars['Boolean']>>;
  processor: InputMaybe<Scalars['Bytes']>;
  processor_contains: InputMaybe<Scalars['Bytes']>;
  processor_in: InputMaybe<Array<Scalars['Bytes']>>;
  processor_not: InputMaybe<Scalars['Bytes']>;
  processor_not_contains: InputMaybe<Scalars['Bytes']>;
  processor_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  proposalId: InputMaybe<Scalars['BigInt']>;
  proposalId_gt: InputMaybe<Scalars['BigInt']>;
  proposalId_gte: InputMaybe<Scalars['BigInt']>;
  proposalId_in: InputMaybe<Array<Scalars['BigInt']>>;
  proposalId_lt: InputMaybe<Scalars['BigInt']>;
  proposalId_lte: InputMaybe<Scalars['BigInt']>;
  proposalId_not: InputMaybe<Scalars['BigInt']>;
  proposalId_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  proposalIndex: InputMaybe<Scalars['BigInt']>;
  proposalIndex_gt: InputMaybe<Scalars['BigInt']>;
  proposalIndex_gte: InputMaybe<Scalars['BigInt']>;
  proposalIndex_in: InputMaybe<Array<Scalars['BigInt']>>;
  proposalIndex_lt: InputMaybe<Scalars['BigInt']>;
  proposalIndex_lte: InputMaybe<Scalars['BigInt']>;
  proposalIndex_not: InputMaybe<Scalars['BigInt']>;
  proposalIndex_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  proposer: InputMaybe<Scalars['Bytes']>;
  proposer_contains: InputMaybe<Scalars['Bytes']>;
  proposer_in: InputMaybe<Array<Scalars['Bytes']>>;
  proposer_not: InputMaybe<Scalars['Bytes']>;
  proposer_not_contains: InputMaybe<Scalars['Bytes']>;
  proposer_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  sharesRequested: InputMaybe<Scalars['BigInt']>;
  sharesRequested_gt: InputMaybe<Scalars['BigInt']>;
  sharesRequested_gte: InputMaybe<Scalars['BigInt']>;
  sharesRequested_in: InputMaybe<Array<Scalars['BigInt']>>;
  sharesRequested_lt: InputMaybe<Scalars['BigInt']>;
  sharesRequested_lte: InputMaybe<Scalars['BigInt']>;
  sharesRequested_not: InputMaybe<Scalars['BigInt']>;
  sharesRequested_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  sponsor: InputMaybe<Scalars['Bytes']>;
  sponsor_contains: InputMaybe<Scalars['Bytes']>;
  sponsor_in: InputMaybe<Array<Scalars['Bytes']>>;
  sponsor_not: InputMaybe<Scalars['Bytes']>;
  sponsor_not_contains: InputMaybe<Scalars['Bytes']>;
  sponsor_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  sponsored: InputMaybe<Scalars['Boolean']>;
  sponsoredAt: InputMaybe<Scalars['String']>;
  sponsoredAt_contains: InputMaybe<Scalars['String']>;
  sponsoredAt_contains_nocase: InputMaybe<Scalars['String']>;
  sponsoredAt_ends_with: InputMaybe<Scalars['String']>;
  sponsoredAt_ends_with_nocase: InputMaybe<Scalars['String']>;
  sponsoredAt_gt: InputMaybe<Scalars['String']>;
  sponsoredAt_gte: InputMaybe<Scalars['String']>;
  sponsoredAt_in: InputMaybe<Array<Scalars['String']>>;
  sponsoredAt_lt: InputMaybe<Scalars['String']>;
  sponsoredAt_lte: InputMaybe<Scalars['String']>;
  sponsoredAt_not: InputMaybe<Scalars['String']>;
  sponsoredAt_not_contains: InputMaybe<Scalars['String']>;
  sponsoredAt_not_contains_nocase: InputMaybe<Scalars['String']>;
  sponsoredAt_not_ends_with: InputMaybe<Scalars['String']>;
  sponsoredAt_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  sponsoredAt_not_in: InputMaybe<Array<Scalars['String']>>;
  sponsoredAt_not_starts_with: InputMaybe<Scalars['String']>;
  sponsoredAt_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  sponsoredAt_starts_with: InputMaybe<Scalars['String']>;
  sponsoredAt_starts_with_nocase: InputMaybe<Scalars['String']>;
  sponsored_in: InputMaybe<Array<Scalars['Boolean']>>;
  sponsored_not: InputMaybe<Scalars['Boolean']>;
  sponsored_not_in: InputMaybe<Array<Scalars['Boolean']>>;
  startingPeriod: InputMaybe<Scalars['BigInt']>;
  startingPeriod_gt: InputMaybe<Scalars['BigInt']>;
  startingPeriod_gte: InputMaybe<Scalars['BigInt']>;
  startingPeriod_in: InputMaybe<Array<Scalars['BigInt']>>;
  startingPeriod_lt: InputMaybe<Scalars['BigInt']>;
  startingPeriod_lte: InputMaybe<Scalars['BigInt']>;
  startingPeriod_not: InputMaybe<Scalars['BigInt']>;
  startingPeriod_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  trade: InputMaybe<Scalars['Boolean']>;
  trade_in: InputMaybe<Array<Scalars['Boolean']>>;
  trade_not: InputMaybe<Scalars['Boolean']>;
  trade_not_in: InputMaybe<Array<Scalars['Boolean']>>;
  tributeOffered: InputMaybe<Scalars['BigInt']>;
  tributeOffered_gt: InputMaybe<Scalars['BigInt']>;
  tributeOffered_gte: InputMaybe<Scalars['BigInt']>;
  tributeOffered_in: InputMaybe<Array<Scalars['BigInt']>>;
  tributeOffered_lt: InputMaybe<Scalars['BigInt']>;
  tributeOffered_lte: InputMaybe<Scalars['BigInt']>;
  tributeOffered_not: InputMaybe<Scalars['BigInt']>;
  tributeOffered_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  tributeToken: InputMaybe<Scalars['Bytes']>;
  tributeTokenDecimals: InputMaybe<Scalars['BigInt']>;
  tributeTokenDecimals_gt: InputMaybe<Scalars['BigInt']>;
  tributeTokenDecimals_gte: InputMaybe<Scalars['BigInt']>;
  tributeTokenDecimals_in: InputMaybe<Array<Scalars['BigInt']>>;
  tributeTokenDecimals_lt: InputMaybe<Scalars['BigInt']>;
  tributeTokenDecimals_lte: InputMaybe<Scalars['BigInt']>;
  tributeTokenDecimals_not: InputMaybe<Scalars['BigInt']>;
  tributeTokenDecimals_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  tributeTokenSymbol: InputMaybe<Scalars['String']>;
  tributeTokenSymbol_contains: InputMaybe<Scalars['String']>;
  tributeTokenSymbol_contains_nocase: InputMaybe<Scalars['String']>;
  tributeTokenSymbol_ends_with: InputMaybe<Scalars['String']>;
  tributeTokenSymbol_ends_with_nocase: InputMaybe<Scalars['String']>;
  tributeTokenSymbol_gt: InputMaybe<Scalars['String']>;
  tributeTokenSymbol_gte: InputMaybe<Scalars['String']>;
  tributeTokenSymbol_in: InputMaybe<Array<Scalars['String']>>;
  tributeTokenSymbol_lt: InputMaybe<Scalars['String']>;
  tributeTokenSymbol_lte: InputMaybe<Scalars['String']>;
  tributeTokenSymbol_not: InputMaybe<Scalars['String']>;
  tributeTokenSymbol_not_contains: InputMaybe<Scalars['String']>;
  tributeTokenSymbol_not_contains_nocase: InputMaybe<Scalars['String']>;
  tributeTokenSymbol_not_ends_with: InputMaybe<Scalars['String']>;
  tributeTokenSymbol_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  tributeTokenSymbol_not_in: InputMaybe<Array<Scalars['String']>>;
  tributeTokenSymbol_not_starts_with: InputMaybe<Scalars['String']>;
  tributeTokenSymbol_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  tributeTokenSymbol_starts_with: InputMaybe<Scalars['String']>;
  tributeTokenSymbol_starts_with_nocase: InputMaybe<Scalars['String']>;
  tributeToken_contains: InputMaybe<Scalars['Bytes']>;
  tributeToken_in: InputMaybe<Array<Scalars['Bytes']>>;
  tributeToken_not: InputMaybe<Scalars['Bytes']>;
  tributeToken_not_contains: InputMaybe<Scalars['Bytes']>;
  tributeToken_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  uberHausMinionExecuted: InputMaybe<Scalars['Boolean']>;
  uberHausMinionExecuted_in: InputMaybe<Array<Scalars['Boolean']>>;
  uberHausMinionExecuted_not: InputMaybe<Scalars['Boolean']>;
  uberHausMinionExecuted_not_in: InputMaybe<Array<Scalars['Boolean']>>;
  votes_: InputMaybe<DaoHausVote_Filter>;
  votingPeriodEnds: InputMaybe<Scalars['BigInt']>;
  votingPeriodEnds_gt: InputMaybe<Scalars['BigInt']>;
  votingPeriodEnds_gte: InputMaybe<Scalars['BigInt']>;
  votingPeriodEnds_in: InputMaybe<Array<Scalars['BigInt']>>;
  votingPeriodEnds_lt: InputMaybe<Scalars['BigInt']>;
  votingPeriodEnds_lte: InputMaybe<Scalars['BigInt']>;
  votingPeriodEnds_not: InputMaybe<Scalars['BigInt']>;
  votingPeriodEnds_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  votingPeriodStarts: InputMaybe<Scalars['BigInt']>;
  votingPeriodStarts_gt: InputMaybe<Scalars['BigInt']>;
  votingPeriodStarts_gte: InputMaybe<Scalars['BigInt']>;
  votingPeriodStarts_in: InputMaybe<Array<Scalars['BigInt']>>;
  votingPeriodStarts_lt: InputMaybe<Scalars['BigInt']>;
  votingPeriodStarts_lte: InputMaybe<Scalars['BigInt']>;
  votingPeriodStarts_not: InputMaybe<Scalars['BigInt']>;
  votingPeriodStarts_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  whitelist: InputMaybe<Scalars['Boolean']>;
  whitelist_in: InputMaybe<Array<Scalars['Boolean']>>;
  whitelist_not: InputMaybe<Scalars['Boolean']>;
  whitelist_not_in: InputMaybe<Array<Scalars['Boolean']>>;
  yesShares: InputMaybe<Scalars['BigInt']>;
  yesShares_gt: InputMaybe<Scalars['BigInt']>;
  yesShares_gte: InputMaybe<Scalars['BigInt']>;
  yesShares_in: InputMaybe<Array<Scalars['BigInt']>>;
  yesShares_lt: InputMaybe<Scalars['BigInt']>;
  yesShares_lte: InputMaybe<Scalars['BigInt']>;
  yesShares_not: InputMaybe<Scalars['BigInt']>;
  yesShares_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  yesVotes: InputMaybe<Scalars['BigInt']>;
  yesVotes_gt: InputMaybe<Scalars['BigInt']>;
  yesVotes_gte: InputMaybe<Scalars['BigInt']>;
  yesVotes_in: InputMaybe<Array<Scalars['BigInt']>>;
  yesVotes_lt: InputMaybe<Scalars['BigInt']>;
  yesVotes_lte: InputMaybe<Scalars['BigInt']>;
  yesVotes_not: InputMaybe<Scalars['BigInt']>;
  yesVotes_not_in: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum DaoHausProposal_OrderBy {
  Aborted = 'aborted',
  Actions = 'actions',
  Applicant = 'applicant',
  Cancelled = 'cancelled',
  CancelledAt = 'cancelledAt',
  CreatedAt = 'createdAt',
  CreatedBy = 'createdBy',
  DelegateKey = 'delegateKey',
  Details = 'details',
  DidPass = 'didPass',
  Escrow = 'escrow',
  Executed = 'executed',
  GracePeriodEnds = 'gracePeriodEnds',
  Guildkick = 'guildkick',
  GuildkickOrWhitelistOrMinion = 'guildkickOrWhitelistOrMinion',
  Id = 'id',
  IsMinion = 'isMinion',
  LootRequested = 'lootRequested',
  MaxTotalSharesAndLootAtYesVote = 'maxTotalSharesAndLootAtYesVote',
  Member = 'member',
  MemberAddress = 'memberAddress',
  Minion = 'minion',
  MinionAddress = 'minionAddress',
  MinionExecuteActionTx = 'minionExecuteActionTx',
  Moloch = 'moloch',
  MolochAddress = 'molochAddress',
  NewMember = 'newMember',
  NoShares = 'noShares',
  NoVotes = 'noVotes',
  PaymentRequested = 'paymentRequested',
  PaymentToken = 'paymentToken',
  PaymentTokenDecimals = 'paymentTokenDecimals',
  PaymentTokenSymbol = 'paymentTokenSymbol',
  Processed = 'processed',
  ProcessedAt = 'processedAt',
  Processor = 'processor',
  ProposalId = 'proposalId',
  ProposalIndex = 'proposalIndex',
  Proposer = 'proposer',
  SharesRequested = 'sharesRequested',
  Sponsor = 'sponsor',
  Sponsored = 'sponsored',
  SponsoredAt = 'sponsoredAt',
  StartingPeriod = 'startingPeriod',
  Trade = 'trade',
  TributeOffered = 'tributeOffered',
  TributeToken = 'tributeToken',
  TributeTokenDecimals = 'tributeTokenDecimals',
  TributeTokenSymbol = 'tributeTokenSymbol',
  UberHausMinionExecuted = 'uberHausMinionExecuted',
  Votes = 'votes',
  VotingPeriodEnds = 'votingPeriodEnds',
  VotingPeriodStarts = 'votingPeriodStarts',
  Whitelist = 'whitelist',
  YesShares = 'yesShares',
  YesVotes = 'yesVotes',
}

export type DaoHausQuery = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta: Maybe<DaoHaus_Meta_>;
  content: Maybe<DaoHausContent>;
  contents: Array<DaoHausContent>;
  daoMeta: Maybe<DaoHausDaoMeta>;
  daoMetas: Array<DaoHausDaoMeta>;
  member: Maybe<DaoHausMember>;
  members: Array<DaoHausMember>;
  minion: Maybe<DaoHausMinion>;
  minionAction: Maybe<DaoHausMinionAction>;
  minionActions: Array<DaoHausMinionAction>;
  minionStream: Maybe<DaoHausMinionStream>;
  minionStreams: Array<DaoHausMinionStream>;
  minions: Array<DaoHausMinion>;
  moloch: Maybe<DaoHausMoloch>;
  molochTransaction: Maybe<DaoHausMolochTransaction>;
  molochTransactions: Array<DaoHausMolochTransaction>;
  moloches: Array<DaoHausMoloch>;
  proposal: Maybe<DaoHausProposal>;
  proposalEscrow: Maybe<DaoHausProposalEscrow>;
  proposalEscrows: Array<DaoHausProposalEscrow>;
  proposals: Array<DaoHausProposal>;
  rageQuit: Maybe<DaoHausRageQuit>;
  rageQuits: Array<DaoHausRageQuit>;
  record: Maybe<DaoHausRecord>;
  records: Array<DaoHausRecord>;
  safeMinion: Maybe<DaoHausSafeMinion>;
  safeMinions: Array<DaoHausSafeMinion>;
  shaman: Maybe<DaoHausShaman>;
  shamans: Array<DaoHausShaman>;
  token: Maybe<DaoHausToken>;
  tokenBalance: Maybe<DaoHausTokenBalance>;
  tokenBalances: Array<DaoHausTokenBalance>;
  tokens: Array<DaoHausToken>;
  vote: Maybe<DaoHausVote>;
  votes: Array<DaoHausVote>;
};

export type DaoHausQuery_MetaArgs = {
  block: InputMaybe<DaoHausBlock_Height>;
};

export type DaoHausQueryContentArgs = {
  block: InputMaybe<DaoHausBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: DaoHaus_SubgraphErrorPolicy_;
};

export type DaoHausQueryContentsArgs = {
  block: InputMaybe<DaoHausBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DaoHausContent_OrderBy>;
  orderDirection: InputMaybe<DaoHausOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: DaoHaus_SubgraphErrorPolicy_;
  where: InputMaybe<DaoHausContent_Filter>;
};

export type DaoHausQueryDaoMetaArgs = {
  block: InputMaybe<DaoHausBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: DaoHaus_SubgraphErrorPolicy_;
};

export type DaoHausQueryDaoMetasArgs = {
  block: InputMaybe<DaoHausBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DaoHausDaoMeta_OrderBy>;
  orderDirection: InputMaybe<DaoHausOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: DaoHaus_SubgraphErrorPolicy_;
  where: InputMaybe<DaoHausDaoMeta_Filter>;
};

export type DaoHausQueryMemberArgs = {
  block: InputMaybe<DaoHausBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: DaoHaus_SubgraphErrorPolicy_;
};

export type DaoHausQueryMembersArgs = {
  block: InputMaybe<DaoHausBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DaoHausMember_OrderBy>;
  orderDirection: InputMaybe<DaoHausOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: DaoHaus_SubgraphErrorPolicy_;
  where: InputMaybe<DaoHausMember_Filter>;
};

export type DaoHausQueryMinionArgs = {
  block: InputMaybe<DaoHausBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: DaoHaus_SubgraphErrorPolicy_;
};

export type DaoHausQueryMinionActionArgs = {
  block: InputMaybe<DaoHausBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: DaoHaus_SubgraphErrorPolicy_;
};

export type DaoHausQueryMinionActionsArgs = {
  block: InputMaybe<DaoHausBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DaoHausMinionAction_OrderBy>;
  orderDirection: InputMaybe<DaoHausOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: DaoHaus_SubgraphErrorPolicy_;
  where: InputMaybe<DaoHausMinionAction_Filter>;
};

export type DaoHausQueryMinionStreamArgs = {
  block: InputMaybe<DaoHausBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: DaoHaus_SubgraphErrorPolicy_;
};

export type DaoHausQueryMinionStreamsArgs = {
  block: InputMaybe<DaoHausBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DaoHausMinionStream_OrderBy>;
  orderDirection: InputMaybe<DaoHausOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: DaoHaus_SubgraphErrorPolicy_;
  where: InputMaybe<DaoHausMinionStream_Filter>;
};

export type DaoHausQueryMinionsArgs = {
  block: InputMaybe<DaoHausBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DaoHausMinion_OrderBy>;
  orderDirection: InputMaybe<DaoHausOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: DaoHaus_SubgraphErrorPolicy_;
  where: InputMaybe<DaoHausMinion_Filter>;
};

export type DaoHausQueryMolochArgs = {
  block: InputMaybe<DaoHausBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: DaoHaus_SubgraphErrorPolicy_;
};

export type DaoHausQueryMolochTransactionArgs = {
  block: InputMaybe<DaoHausBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: DaoHaus_SubgraphErrorPolicy_;
};

export type DaoHausQueryMolochTransactionsArgs = {
  block: InputMaybe<DaoHausBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DaoHausMolochTransaction_OrderBy>;
  orderDirection: InputMaybe<DaoHausOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: DaoHaus_SubgraphErrorPolicy_;
  where: InputMaybe<DaoHausMolochTransaction_Filter>;
};

export type DaoHausQueryMolochesArgs = {
  block: InputMaybe<DaoHausBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DaoHausMoloch_OrderBy>;
  orderDirection: InputMaybe<DaoHausOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: DaoHaus_SubgraphErrorPolicy_;
  where: InputMaybe<DaoHausMoloch_Filter>;
};

export type DaoHausQueryProposalArgs = {
  block: InputMaybe<DaoHausBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: DaoHaus_SubgraphErrorPolicy_;
};

export type DaoHausQueryProposalEscrowArgs = {
  block: InputMaybe<DaoHausBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: DaoHaus_SubgraphErrorPolicy_;
};

export type DaoHausQueryProposalEscrowsArgs = {
  block: InputMaybe<DaoHausBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DaoHausProposalEscrow_OrderBy>;
  orderDirection: InputMaybe<DaoHausOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: DaoHaus_SubgraphErrorPolicy_;
  where: InputMaybe<DaoHausProposalEscrow_Filter>;
};

export type DaoHausQueryProposalsArgs = {
  block: InputMaybe<DaoHausBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DaoHausProposal_OrderBy>;
  orderDirection: InputMaybe<DaoHausOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: DaoHaus_SubgraphErrorPolicy_;
  where: InputMaybe<DaoHausProposal_Filter>;
};

export type DaoHausQueryRageQuitArgs = {
  block: InputMaybe<DaoHausBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: DaoHaus_SubgraphErrorPolicy_;
};

export type DaoHausQueryRageQuitsArgs = {
  block: InputMaybe<DaoHausBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DaoHausRageQuit_OrderBy>;
  orderDirection: InputMaybe<DaoHausOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: DaoHaus_SubgraphErrorPolicy_;
  where: InputMaybe<DaoHausRageQuit_Filter>;
};

export type DaoHausQueryRecordArgs = {
  block: InputMaybe<DaoHausBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: DaoHaus_SubgraphErrorPolicy_;
};

export type DaoHausQueryRecordsArgs = {
  block: InputMaybe<DaoHausBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DaoHausRecord_OrderBy>;
  orderDirection: InputMaybe<DaoHausOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: DaoHaus_SubgraphErrorPolicy_;
  where: InputMaybe<DaoHausRecord_Filter>;
};

export type DaoHausQuerySafeMinionArgs = {
  block: InputMaybe<DaoHausBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: DaoHaus_SubgraphErrorPolicy_;
};

export type DaoHausQuerySafeMinionsArgs = {
  block: InputMaybe<DaoHausBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DaoHausSafeMinion_OrderBy>;
  orderDirection: InputMaybe<DaoHausOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: DaoHaus_SubgraphErrorPolicy_;
  where: InputMaybe<DaoHausSafeMinion_Filter>;
};

export type DaoHausQueryShamanArgs = {
  block: InputMaybe<DaoHausBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: DaoHaus_SubgraphErrorPolicy_;
};

export type DaoHausQueryShamansArgs = {
  block: InputMaybe<DaoHausBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DaoHausShaman_OrderBy>;
  orderDirection: InputMaybe<DaoHausOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: DaoHaus_SubgraphErrorPolicy_;
  where: InputMaybe<DaoHausShaman_Filter>;
};

export type DaoHausQueryTokenArgs = {
  block: InputMaybe<DaoHausBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: DaoHaus_SubgraphErrorPolicy_;
};

export type DaoHausQueryTokenBalanceArgs = {
  block: InputMaybe<DaoHausBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: DaoHaus_SubgraphErrorPolicy_;
};

export type DaoHausQueryTokenBalancesArgs = {
  block: InputMaybe<DaoHausBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DaoHausTokenBalance_OrderBy>;
  orderDirection: InputMaybe<DaoHausOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: DaoHaus_SubgraphErrorPolicy_;
  where: InputMaybe<DaoHausTokenBalance_Filter>;
};

export type DaoHausQueryTokensArgs = {
  block: InputMaybe<DaoHausBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DaoHausToken_OrderBy>;
  orderDirection: InputMaybe<DaoHausOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: DaoHaus_SubgraphErrorPolicy_;
  where: InputMaybe<DaoHausToken_Filter>;
};

export type DaoHausQueryVoteArgs = {
  block: InputMaybe<DaoHausBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: DaoHaus_SubgraphErrorPolicy_;
};

export type DaoHausQueryVotesArgs = {
  block: InputMaybe<DaoHausBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DaoHausVote_OrderBy>;
  orderDirection: InputMaybe<DaoHausOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: DaoHaus_SubgraphErrorPolicy_;
  where: InputMaybe<DaoHausVote_Filter>;
};

export type DaoHausRageQuit = {
  __typename?: 'RageQuit';
  /** block timestamp when the member rage quit */
  createdAt: Scalars['String'];
  /** unique identifier and primary key of the entity */
  id: Scalars['ID'];
  /** number of loot ragequit */
  loot: Scalars['BigInt'];
  /** member scoped to this ragequit */
  member: DaoHausMember;
  /** related member address */
  memberAddress: Scalars['Bytes'];
  /** moloch dao scoped to this ragequit */
  moloch: DaoHausMoloch;
  /** related dao address */
  molochAddress: Scalars['Bytes'];
  /** number of shares ragequit */
  shares: Scalars['BigInt'];
};

export type DaoHausRageQuit_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<DaoHausBlockChangedFilter>;
  createdAt: InputMaybe<Scalars['String']>;
  createdAt_contains: InputMaybe<Scalars['String']>;
  createdAt_contains_nocase: InputMaybe<Scalars['String']>;
  createdAt_ends_with: InputMaybe<Scalars['String']>;
  createdAt_ends_with_nocase: InputMaybe<Scalars['String']>;
  createdAt_gt: InputMaybe<Scalars['String']>;
  createdAt_gte: InputMaybe<Scalars['String']>;
  createdAt_in: InputMaybe<Array<Scalars['String']>>;
  createdAt_lt: InputMaybe<Scalars['String']>;
  createdAt_lte: InputMaybe<Scalars['String']>;
  createdAt_not: InputMaybe<Scalars['String']>;
  createdAt_not_contains: InputMaybe<Scalars['String']>;
  createdAt_not_contains_nocase: InputMaybe<Scalars['String']>;
  createdAt_not_ends_with: InputMaybe<Scalars['String']>;
  createdAt_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  createdAt_not_in: InputMaybe<Array<Scalars['String']>>;
  createdAt_not_starts_with: InputMaybe<Scalars['String']>;
  createdAt_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  createdAt_starts_with: InputMaybe<Scalars['String']>;
  createdAt_starts_with_nocase: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['ID']>;
  id_gt: InputMaybe<Scalars['ID']>;
  id_gte: InputMaybe<Scalars['ID']>;
  id_in: InputMaybe<Array<Scalars['ID']>>;
  id_lt: InputMaybe<Scalars['ID']>;
  id_lte: InputMaybe<Scalars['ID']>;
  id_not: InputMaybe<Scalars['ID']>;
  id_not_in: InputMaybe<Array<Scalars['ID']>>;
  loot: InputMaybe<Scalars['BigInt']>;
  loot_gt: InputMaybe<Scalars['BigInt']>;
  loot_gte: InputMaybe<Scalars['BigInt']>;
  loot_in: InputMaybe<Array<Scalars['BigInt']>>;
  loot_lt: InputMaybe<Scalars['BigInt']>;
  loot_lte: InputMaybe<Scalars['BigInt']>;
  loot_not: InputMaybe<Scalars['BigInt']>;
  loot_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  member: InputMaybe<Scalars['String']>;
  memberAddress: InputMaybe<Scalars['Bytes']>;
  memberAddress_contains: InputMaybe<Scalars['Bytes']>;
  memberAddress_in: InputMaybe<Array<Scalars['Bytes']>>;
  memberAddress_not: InputMaybe<Scalars['Bytes']>;
  memberAddress_not_contains: InputMaybe<Scalars['Bytes']>;
  memberAddress_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  member_: InputMaybe<DaoHausMember_Filter>;
  member_contains: InputMaybe<Scalars['String']>;
  member_contains_nocase: InputMaybe<Scalars['String']>;
  member_ends_with: InputMaybe<Scalars['String']>;
  member_ends_with_nocase: InputMaybe<Scalars['String']>;
  member_gt: InputMaybe<Scalars['String']>;
  member_gte: InputMaybe<Scalars['String']>;
  member_in: InputMaybe<Array<Scalars['String']>>;
  member_lt: InputMaybe<Scalars['String']>;
  member_lte: InputMaybe<Scalars['String']>;
  member_not: InputMaybe<Scalars['String']>;
  member_not_contains: InputMaybe<Scalars['String']>;
  member_not_contains_nocase: InputMaybe<Scalars['String']>;
  member_not_ends_with: InputMaybe<Scalars['String']>;
  member_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  member_not_in: InputMaybe<Array<Scalars['String']>>;
  member_not_starts_with: InputMaybe<Scalars['String']>;
  member_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  member_starts_with: InputMaybe<Scalars['String']>;
  member_starts_with_nocase: InputMaybe<Scalars['String']>;
  moloch: InputMaybe<Scalars['String']>;
  molochAddress: InputMaybe<Scalars['Bytes']>;
  molochAddress_contains: InputMaybe<Scalars['Bytes']>;
  molochAddress_in: InputMaybe<Array<Scalars['Bytes']>>;
  molochAddress_not: InputMaybe<Scalars['Bytes']>;
  molochAddress_not_contains: InputMaybe<Scalars['Bytes']>;
  molochAddress_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  moloch_: InputMaybe<DaoHausMoloch_Filter>;
  moloch_contains: InputMaybe<Scalars['String']>;
  moloch_contains_nocase: InputMaybe<Scalars['String']>;
  moloch_ends_with: InputMaybe<Scalars['String']>;
  moloch_ends_with_nocase: InputMaybe<Scalars['String']>;
  moloch_gt: InputMaybe<Scalars['String']>;
  moloch_gte: InputMaybe<Scalars['String']>;
  moloch_in: InputMaybe<Array<Scalars['String']>>;
  moloch_lt: InputMaybe<Scalars['String']>;
  moloch_lte: InputMaybe<Scalars['String']>;
  moloch_not: InputMaybe<Scalars['String']>;
  moloch_not_contains: InputMaybe<Scalars['String']>;
  moloch_not_contains_nocase: InputMaybe<Scalars['String']>;
  moloch_not_ends_with: InputMaybe<Scalars['String']>;
  moloch_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  moloch_not_in: InputMaybe<Array<Scalars['String']>>;
  moloch_not_starts_with: InputMaybe<Scalars['String']>;
  moloch_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  moloch_starts_with: InputMaybe<Scalars['String']>;
  moloch_starts_with_nocase: InputMaybe<Scalars['String']>;
  shares: InputMaybe<Scalars['BigInt']>;
  shares_gt: InputMaybe<Scalars['BigInt']>;
  shares_gte: InputMaybe<Scalars['BigInt']>;
  shares_in: InputMaybe<Array<Scalars['BigInt']>>;
  shares_lt: InputMaybe<Scalars['BigInt']>;
  shares_lte: InputMaybe<Scalars['BigInt']>;
  shares_not: InputMaybe<Scalars['BigInt']>;
  shares_not_in: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum DaoHausRageQuit_OrderBy {
  CreatedAt = 'createdAt',
  Id = 'id',
  Loot = 'loot',
  Member = 'member',
  MemberAddress = 'memberAddress',
  Moloch = 'moloch',
  MolochAddress = 'molochAddress',
  Shares = 'shares',
}

export type DaoHausRecord = {
  __typename?: 'Record';
  content: Scalars['String'];
  contentType: Scalars['String'];
  createdAt: Scalars['String'];
  createdBy: Scalars['Bytes'];
  id: Scalars['ID'];
  moloch: DaoHausMoloch;
  table: Scalars['String'];
  tag: Scalars['Bytes'];
};

export type DaoHausRecord_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<DaoHausBlockChangedFilter>;
  content: InputMaybe<Scalars['String']>;
  contentType: InputMaybe<Scalars['String']>;
  contentType_contains: InputMaybe<Scalars['String']>;
  contentType_contains_nocase: InputMaybe<Scalars['String']>;
  contentType_ends_with: InputMaybe<Scalars['String']>;
  contentType_ends_with_nocase: InputMaybe<Scalars['String']>;
  contentType_gt: InputMaybe<Scalars['String']>;
  contentType_gte: InputMaybe<Scalars['String']>;
  contentType_in: InputMaybe<Array<Scalars['String']>>;
  contentType_lt: InputMaybe<Scalars['String']>;
  contentType_lte: InputMaybe<Scalars['String']>;
  contentType_not: InputMaybe<Scalars['String']>;
  contentType_not_contains: InputMaybe<Scalars['String']>;
  contentType_not_contains_nocase: InputMaybe<Scalars['String']>;
  contentType_not_ends_with: InputMaybe<Scalars['String']>;
  contentType_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  contentType_not_in: InputMaybe<Array<Scalars['String']>>;
  contentType_not_starts_with: InputMaybe<Scalars['String']>;
  contentType_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  contentType_starts_with: InputMaybe<Scalars['String']>;
  contentType_starts_with_nocase: InputMaybe<Scalars['String']>;
  content_contains: InputMaybe<Scalars['String']>;
  content_contains_nocase: InputMaybe<Scalars['String']>;
  content_ends_with: InputMaybe<Scalars['String']>;
  content_ends_with_nocase: InputMaybe<Scalars['String']>;
  content_gt: InputMaybe<Scalars['String']>;
  content_gte: InputMaybe<Scalars['String']>;
  content_in: InputMaybe<Array<Scalars['String']>>;
  content_lt: InputMaybe<Scalars['String']>;
  content_lte: InputMaybe<Scalars['String']>;
  content_not: InputMaybe<Scalars['String']>;
  content_not_contains: InputMaybe<Scalars['String']>;
  content_not_contains_nocase: InputMaybe<Scalars['String']>;
  content_not_ends_with: InputMaybe<Scalars['String']>;
  content_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  content_not_in: InputMaybe<Array<Scalars['String']>>;
  content_not_starts_with: InputMaybe<Scalars['String']>;
  content_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  content_starts_with: InputMaybe<Scalars['String']>;
  content_starts_with_nocase: InputMaybe<Scalars['String']>;
  createdAt: InputMaybe<Scalars['String']>;
  createdAt_contains: InputMaybe<Scalars['String']>;
  createdAt_contains_nocase: InputMaybe<Scalars['String']>;
  createdAt_ends_with: InputMaybe<Scalars['String']>;
  createdAt_ends_with_nocase: InputMaybe<Scalars['String']>;
  createdAt_gt: InputMaybe<Scalars['String']>;
  createdAt_gte: InputMaybe<Scalars['String']>;
  createdAt_in: InputMaybe<Array<Scalars['String']>>;
  createdAt_lt: InputMaybe<Scalars['String']>;
  createdAt_lte: InputMaybe<Scalars['String']>;
  createdAt_not: InputMaybe<Scalars['String']>;
  createdAt_not_contains: InputMaybe<Scalars['String']>;
  createdAt_not_contains_nocase: InputMaybe<Scalars['String']>;
  createdAt_not_ends_with: InputMaybe<Scalars['String']>;
  createdAt_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  createdAt_not_in: InputMaybe<Array<Scalars['String']>>;
  createdAt_not_starts_with: InputMaybe<Scalars['String']>;
  createdAt_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  createdAt_starts_with: InputMaybe<Scalars['String']>;
  createdAt_starts_with_nocase: InputMaybe<Scalars['String']>;
  createdBy: InputMaybe<Scalars['Bytes']>;
  createdBy_contains: InputMaybe<Scalars['Bytes']>;
  createdBy_in: InputMaybe<Array<Scalars['Bytes']>>;
  createdBy_not: InputMaybe<Scalars['Bytes']>;
  createdBy_not_contains: InputMaybe<Scalars['Bytes']>;
  createdBy_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  id: InputMaybe<Scalars['ID']>;
  id_gt: InputMaybe<Scalars['ID']>;
  id_gte: InputMaybe<Scalars['ID']>;
  id_in: InputMaybe<Array<Scalars['ID']>>;
  id_lt: InputMaybe<Scalars['ID']>;
  id_lte: InputMaybe<Scalars['ID']>;
  id_not: InputMaybe<Scalars['ID']>;
  id_not_in: InputMaybe<Array<Scalars['ID']>>;
  moloch: InputMaybe<Scalars['String']>;
  moloch_: InputMaybe<DaoHausMoloch_Filter>;
  moloch_contains: InputMaybe<Scalars['String']>;
  moloch_contains_nocase: InputMaybe<Scalars['String']>;
  moloch_ends_with: InputMaybe<Scalars['String']>;
  moloch_ends_with_nocase: InputMaybe<Scalars['String']>;
  moloch_gt: InputMaybe<Scalars['String']>;
  moloch_gte: InputMaybe<Scalars['String']>;
  moloch_in: InputMaybe<Array<Scalars['String']>>;
  moloch_lt: InputMaybe<Scalars['String']>;
  moloch_lte: InputMaybe<Scalars['String']>;
  moloch_not: InputMaybe<Scalars['String']>;
  moloch_not_contains: InputMaybe<Scalars['String']>;
  moloch_not_contains_nocase: InputMaybe<Scalars['String']>;
  moloch_not_ends_with: InputMaybe<Scalars['String']>;
  moloch_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  moloch_not_in: InputMaybe<Array<Scalars['String']>>;
  moloch_not_starts_with: InputMaybe<Scalars['String']>;
  moloch_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  moloch_starts_with: InputMaybe<Scalars['String']>;
  moloch_starts_with_nocase: InputMaybe<Scalars['String']>;
  table: InputMaybe<Scalars['String']>;
  table_contains: InputMaybe<Scalars['String']>;
  table_contains_nocase: InputMaybe<Scalars['String']>;
  table_ends_with: InputMaybe<Scalars['String']>;
  table_ends_with_nocase: InputMaybe<Scalars['String']>;
  table_gt: InputMaybe<Scalars['String']>;
  table_gte: InputMaybe<Scalars['String']>;
  table_in: InputMaybe<Array<Scalars['String']>>;
  table_lt: InputMaybe<Scalars['String']>;
  table_lte: InputMaybe<Scalars['String']>;
  table_not: InputMaybe<Scalars['String']>;
  table_not_contains: InputMaybe<Scalars['String']>;
  table_not_contains_nocase: InputMaybe<Scalars['String']>;
  table_not_ends_with: InputMaybe<Scalars['String']>;
  table_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  table_not_in: InputMaybe<Array<Scalars['String']>>;
  table_not_starts_with: InputMaybe<Scalars['String']>;
  table_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  table_starts_with: InputMaybe<Scalars['String']>;
  table_starts_with_nocase: InputMaybe<Scalars['String']>;
  tag: InputMaybe<Scalars['Bytes']>;
  tag_contains: InputMaybe<Scalars['Bytes']>;
  tag_in: InputMaybe<Array<Scalars['Bytes']>>;
  tag_not: InputMaybe<Scalars['Bytes']>;
  tag_not_contains: InputMaybe<Scalars['Bytes']>;
  tag_not_in: InputMaybe<Array<Scalars['Bytes']>>;
};

export enum DaoHausRecord_OrderBy {
  Content = 'content',
  ContentType = 'contentType',
  CreatedAt = 'createdAt',
  CreatedBy = 'createdBy',
  Id = 'id',
  Moloch = 'moloch',
  Table = 'table',
  Tag = 'tag',
}

export type DaoHausSafeMinion = {
  __typename?: 'SafeMinion';
  /** unique identifier and primary key of the entity */
  id: Scalars['ID'];
  /** minion scoped to this safe minion */
  minions: Array<DaoHausMinion>;
};

export type DaoHausSafeMinionMinionsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DaoHausMinion_OrderBy>;
  orderDirection: InputMaybe<DaoHausOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where: InputMaybe<DaoHausMinion_Filter>;
};

export type DaoHausSafeMinion_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<DaoHausBlockChangedFilter>;
  id: InputMaybe<Scalars['ID']>;
  id_gt: InputMaybe<Scalars['ID']>;
  id_gte: InputMaybe<Scalars['ID']>;
  id_in: InputMaybe<Array<Scalars['ID']>>;
  id_lt: InputMaybe<Scalars['ID']>;
  id_lte: InputMaybe<Scalars['ID']>;
  id_not: InputMaybe<Scalars['ID']>;
  id_not_in: InputMaybe<Array<Scalars['ID']>>;
  minions: InputMaybe<Array<Scalars['String']>>;
  minions_: InputMaybe<DaoHausMinion_Filter>;
  minions_contains: InputMaybe<Array<Scalars['String']>>;
  minions_contains_nocase: InputMaybe<Array<Scalars['String']>>;
  minions_not: InputMaybe<Array<Scalars['String']>>;
  minions_not_contains: InputMaybe<Array<Scalars['String']>>;
  minions_not_contains_nocase: InputMaybe<Array<Scalars['String']>>;
};

export enum DaoHausSafeMinion_OrderBy {
  Id = 'id',
  Minions = 'minions',
}

export type DaoHausShaman = {
  __typename?: 'Shaman';
  /** block timestamp when the shaman was added */
  createdAt: Scalars['String'];
  /** boolean value of whether this shaman is enabled */
  enabled: Scalars['Boolean'];
  /** unique identifier and primary key of the entity */
  id: Scalars['ID'];
  /** moloch dao scoped to this shaman */
  moloch: DaoHausMoloch;
  /** related dao address */
  molochAddress: Scalars['Bytes'];
  /** address of the shaman */
  shamanAddress: Scalars['Bytes'];
};

export type DaoHausShaman_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<DaoHausBlockChangedFilter>;
  createdAt: InputMaybe<Scalars['String']>;
  createdAt_contains: InputMaybe<Scalars['String']>;
  createdAt_contains_nocase: InputMaybe<Scalars['String']>;
  createdAt_ends_with: InputMaybe<Scalars['String']>;
  createdAt_ends_with_nocase: InputMaybe<Scalars['String']>;
  createdAt_gt: InputMaybe<Scalars['String']>;
  createdAt_gte: InputMaybe<Scalars['String']>;
  createdAt_in: InputMaybe<Array<Scalars['String']>>;
  createdAt_lt: InputMaybe<Scalars['String']>;
  createdAt_lte: InputMaybe<Scalars['String']>;
  createdAt_not: InputMaybe<Scalars['String']>;
  createdAt_not_contains: InputMaybe<Scalars['String']>;
  createdAt_not_contains_nocase: InputMaybe<Scalars['String']>;
  createdAt_not_ends_with: InputMaybe<Scalars['String']>;
  createdAt_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  createdAt_not_in: InputMaybe<Array<Scalars['String']>>;
  createdAt_not_starts_with: InputMaybe<Scalars['String']>;
  createdAt_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  createdAt_starts_with: InputMaybe<Scalars['String']>;
  createdAt_starts_with_nocase: InputMaybe<Scalars['String']>;
  enabled: InputMaybe<Scalars['Boolean']>;
  enabled_in: InputMaybe<Array<Scalars['Boolean']>>;
  enabled_not: InputMaybe<Scalars['Boolean']>;
  enabled_not_in: InputMaybe<Array<Scalars['Boolean']>>;
  id: InputMaybe<Scalars['ID']>;
  id_gt: InputMaybe<Scalars['ID']>;
  id_gte: InputMaybe<Scalars['ID']>;
  id_in: InputMaybe<Array<Scalars['ID']>>;
  id_lt: InputMaybe<Scalars['ID']>;
  id_lte: InputMaybe<Scalars['ID']>;
  id_not: InputMaybe<Scalars['ID']>;
  id_not_in: InputMaybe<Array<Scalars['ID']>>;
  moloch: InputMaybe<Scalars['String']>;
  molochAddress: InputMaybe<Scalars['Bytes']>;
  molochAddress_contains: InputMaybe<Scalars['Bytes']>;
  molochAddress_in: InputMaybe<Array<Scalars['Bytes']>>;
  molochAddress_not: InputMaybe<Scalars['Bytes']>;
  molochAddress_not_contains: InputMaybe<Scalars['Bytes']>;
  molochAddress_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  moloch_: InputMaybe<DaoHausMoloch_Filter>;
  moloch_contains: InputMaybe<Scalars['String']>;
  moloch_contains_nocase: InputMaybe<Scalars['String']>;
  moloch_ends_with: InputMaybe<Scalars['String']>;
  moloch_ends_with_nocase: InputMaybe<Scalars['String']>;
  moloch_gt: InputMaybe<Scalars['String']>;
  moloch_gte: InputMaybe<Scalars['String']>;
  moloch_in: InputMaybe<Array<Scalars['String']>>;
  moloch_lt: InputMaybe<Scalars['String']>;
  moloch_lte: InputMaybe<Scalars['String']>;
  moloch_not: InputMaybe<Scalars['String']>;
  moloch_not_contains: InputMaybe<Scalars['String']>;
  moloch_not_contains_nocase: InputMaybe<Scalars['String']>;
  moloch_not_ends_with: InputMaybe<Scalars['String']>;
  moloch_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  moloch_not_in: InputMaybe<Array<Scalars['String']>>;
  moloch_not_starts_with: InputMaybe<Scalars['String']>;
  moloch_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  moloch_starts_with: InputMaybe<Scalars['String']>;
  moloch_starts_with_nocase: InputMaybe<Scalars['String']>;
  shamanAddress: InputMaybe<Scalars['Bytes']>;
  shamanAddress_contains: InputMaybe<Scalars['Bytes']>;
  shamanAddress_in: InputMaybe<Array<Scalars['Bytes']>>;
  shamanAddress_not: InputMaybe<Scalars['Bytes']>;
  shamanAddress_not_contains: InputMaybe<Scalars['Bytes']>;
  shamanAddress_not_in: InputMaybe<Array<Scalars['Bytes']>>;
};

export enum DaoHausShaman_OrderBy {
  CreatedAt = 'createdAt',
  Enabled = 'enabled',
  Id = 'id',
  Moloch = 'moloch',
  MolochAddress = 'molochAddress',
  ShamanAddress = 'shamanAddress',
}

export type DaoHausSubscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta: Maybe<DaoHaus_Meta_>;
  content: Maybe<DaoHausContent>;
  contents: Array<DaoHausContent>;
  daoMeta: Maybe<DaoHausDaoMeta>;
  daoMetas: Array<DaoHausDaoMeta>;
  member: Maybe<DaoHausMember>;
  members: Array<DaoHausMember>;
  minion: Maybe<DaoHausMinion>;
  minionAction: Maybe<DaoHausMinionAction>;
  minionActions: Array<DaoHausMinionAction>;
  minionStream: Maybe<DaoHausMinionStream>;
  minionStreams: Array<DaoHausMinionStream>;
  minions: Array<DaoHausMinion>;
  moloch: Maybe<DaoHausMoloch>;
  molochTransaction: Maybe<DaoHausMolochTransaction>;
  molochTransactions: Array<DaoHausMolochTransaction>;
  moloches: Array<DaoHausMoloch>;
  proposal: Maybe<DaoHausProposal>;
  proposalEscrow: Maybe<DaoHausProposalEscrow>;
  proposalEscrows: Array<DaoHausProposalEscrow>;
  proposals: Array<DaoHausProposal>;
  rageQuit: Maybe<DaoHausRageQuit>;
  rageQuits: Array<DaoHausRageQuit>;
  record: Maybe<DaoHausRecord>;
  records: Array<DaoHausRecord>;
  safeMinion: Maybe<DaoHausSafeMinion>;
  safeMinions: Array<DaoHausSafeMinion>;
  shaman: Maybe<DaoHausShaman>;
  shamans: Array<DaoHausShaman>;
  token: Maybe<DaoHausToken>;
  tokenBalance: Maybe<DaoHausTokenBalance>;
  tokenBalances: Array<DaoHausTokenBalance>;
  tokens: Array<DaoHausToken>;
  vote: Maybe<DaoHausVote>;
  votes: Array<DaoHausVote>;
};

export type DaoHausSubscription_MetaArgs = {
  block: InputMaybe<DaoHausBlock_Height>;
};

export type DaoHausSubscriptionContentArgs = {
  block: InputMaybe<DaoHausBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: DaoHaus_SubgraphErrorPolicy_;
};

export type DaoHausSubscriptionContentsArgs = {
  block: InputMaybe<DaoHausBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DaoHausContent_OrderBy>;
  orderDirection: InputMaybe<DaoHausOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: DaoHaus_SubgraphErrorPolicy_;
  where: InputMaybe<DaoHausContent_Filter>;
};

export type DaoHausSubscriptionDaoMetaArgs = {
  block: InputMaybe<DaoHausBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: DaoHaus_SubgraphErrorPolicy_;
};

export type DaoHausSubscriptionDaoMetasArgs = {
  block: InputMaybe<DaoHausBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DaoHausDaoMeta_OrderBy>;
  orderDirection: InputMaybe<DaoHausOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: DaoHaus_SubgraphErrorPolicy_;
  where: InputMaybe<DaoHausDaoMeta_Filter>;
};

export type DaoHausSubscriptionMemberArgs = {
  block: InputMaybe<DaoHausBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: DaoHaus_SubgraphErrorPolicy_;
};

export type DaoHausSubscriptionMembersArgs = {
  block: InputMaybe<DaoHausBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DaoHausMember_OrderBy>;
  orderDirection: InputMaybe<DaoHausOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: DaoHaus_SubgraphErrorPolicy_;
  where: InputMaybe<DaoHausMember_Filter>;
};

export type DaoHausSubscriptionMinionArgs = {
  block: InputMaybe<DaoHausBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: DaoHaus_SubgraphErrorPolicy_;
};

export type DaoHausSubscriptionMinionActionArgs = {
  block: InputMaybe<DaoHausBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: DaoHaus_SubgraphErrorPolicy_;
};

export type DaoHausSubscriptionMinionActionsArgs = {
  block: InputMaybe<DaoHausBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DaoHausMinionAction_OrderBy>;
  orderDirection: InputMaybe<DaoHausOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: DaoHaus_SubgraphErrorPolicy_;
  where: InputMaybe<DaoHausMinionAction_Filter>;
};

export type DaoHausSubscriptionMinionStreamArgs = {
  block: InputMaybe<DaoHausBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: DaoHaus_SubgraphErrorPolicy_;
};

export type DaoHausSubscriptionMinionStreamsArgs = {
  block: InputMaybe<DaoHausBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DaoHausMinionStream_OrderBy>;
  orderDirection: InputMaybe<DaoHausOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: DaoHaus_SubgraphErrorPolicy_;
  where: InputMaybe<DaoHausMinionStream_Filter>;
};

export type DaoHausSubscriptionMinionsArgs = {
  block: InputMaybe<DaoHausBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DaoHausMinion_OrderBy>;
  orderDirection: InputMaybe<DaoHausOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: DaoHaus_SubgraphErrorPolicy_;
  where: InputMaybe<DaoHausMinion_Filter>;
};

export type DaoHausSubscriptionMolochArgs = {
  block: InputMaybe<DaoHausBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: DaoHaus_SubgraphErrorPolicy_;
};

export type DaoHausSubscriptionMolochTransactionArgs = {
  block: InputMaybe<DaoHausBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: DaoHaus_SubgraphErrorPolicy_;
};

export type DaoHausSubscriptionMolochTransactionsArgs = {
  block: InputMaybe<DaoHausBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DaoHausMolochTransaction_OrderBy>;
  orderDirection: InputMaybe<DaoHausOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: DaoHaus_SubgraphErrorPolicy_;
  where: InputMaybe<DaoHausMolochTransaction_Filter>;
};

export type DaoHausSubscriptionMolochesArgs = {
  block: InputMaybe<DaoHausBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DaoHausMoloch_OrderBy>;
  orderDirection: InputMaybe<DaoHausOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: DaoHaus_SubgraphErrorPolicy_;
  where: InputMaybe<DaoHausMoloch_Filter>;
};

export type DaoHausSubscriptionProposalArgs = {
  block: InputMaybe<DaoHausBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: DaoHaus_SubgraphErrorPolicy_;
};

export type DaoHausSubscriptionProposalEscrowArgs = {
  block: InputMaybe<DaoHausBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: DaoHaus_SubgraphErrorPolicy_;
};

export type DaoHausSubscriptionProposalEscrowsArgs = {
  block: InputMaybe<DaoHausBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DaoHausProposalEscrow_OrderBy>;
  orderDirection: InputMaybe<DaoHausOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: DaoHaus_SubgraphErrorPolicy_;
  where: InputMaybe<DaoHausProposalEscrow_Filter>;
};

export type DaoHausSubscriptionProposalsArgs = {
  block: InputMaybe<DaoHausBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DaoHausProposal_OrderBy>;
  orderDirection: InputMaybe<DaoHausOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: DaoHaus_SubgraphErrorPolicy_;
  where: InputMaybe<DaoHausProposal_Filter>;
};

export type DaoHausSubscriptionRageQuitArgs = {
  block: InputMaybe<DaoHausBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: DaoHaus_SubgraphErrorPolicy_;
};

export type DaoHausSubscriptionRageQuitsArgs = {
  block: InputMaybe<DaoHausBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DaoHausRageQuit_OrderBy>;
  orderDirection: InputMaybe<DaoHausOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: DaoHaus_SubgraphErrorPolicy_;
  where: InputMaybe<DaoHausRageQuit_Filter>;
};

export type DaoHausSubscriptionRecordArgs = {
  block: InputMaybe<DaoHausBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: DaoHaus_SubgraphErrorPolicy_;
};

export type DaoHausSubscriptionRecordsArgs = {
  block: InputMaybe<DaoHausBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DaoHausRecord_OrderBy>;
  orderDirection: InputMaybe<DaoHausOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: DaoHaus_SubgraphErrorPolicy_;
  where: InputMaybe<DaoHausRecord_Filter>;
};

export type DaoHausSubscriptionSafeMinionArgs = {
  block: InputMaybe<DaoHausBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: DaoHaus_SubgraphErrorPolicy_;
};

export type DaoHausSubscriptionSafeMinionsArgs = {
  block: InputMaybe<DaoHausBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DaoHausSafeMinion_OrderBy>;
  orderDirection: InputMaybe<DaoHausOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: DaoHaus_SubgraphErrorPolicy_;
  where: InputMaybe<DaoHausSafeMinion_Filter>;
};

export type DaoHausSubscriptionShamanArgs = {
  block: InputMaybe<DaoHausBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: DaoHaus_SubgraphErrorPolicy_;
};

export type DaoHausSubscriptionShamansArgs = {
  block: InputMaybe<DaoHausBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DaoHausShaman_OrderBy>;
  orderDirection: InputMaybe<DaoHausOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: DaoHaus_SubgraphErrorPolicy_;
  where: InputMaybe<DaoHausShaman_Filter>;
};

export type DaoHausSubscriptionTokenArgs = {
  block: InputMaybe<DaoHausBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: DaoHaus_SubgraphErrorPolicy_;
};

export type DaoHausSubscriptionTokenBalanceArgs = {
  block: InputMaybe<DaoHausBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: DaoHaus_SubgraphErrorPolicy_;
};

export type DaoHausSubscriptionTokenBalancesArgs = {
  block: InputMaybe<DaoHausBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DaoHausTokenBalance_OrderBy>;
  orderDirection: InputMaybe<DaoHausOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: DaoHaus_SubgraphErrorPolicy_;
  where: InputMaybe<DaoHausTokenBalance_Filter>;
};

export type DaoHausSubscriptionTokensArgs = {
  block: InputMaybe<DaoHausBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DaoHausToken_OrderBy>;
  orderDirection: InputMaybe<DaoHausOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: DaoHaus_SubgraphErrorPolicy_;
  where: InputMaybe<DaoHausToken_Filter>;
};

export type DaoHausSubscriptionVoteArgs = {
  block: InputMaybe<DaoHausBlock_Height>;
  id: Scalars['ID'];
  subgraphError?: DaoHaus_SubgraphErrorPolicy_;
};

export type DaoHausSubscriptionVotesArgs = {
  block: InputMaybe<DaoHausBlock_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<DaoHausVote_OrderBy>;
  orderDirection: InputMaybe<DaoHausOrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: DaoHaus_SubgraphErrorPolicy_;
  where: InputMaybe<DaoHausVote_Filter>;
};

export type DaoHausToken = {
  __typename?: 'Token';
  /** token decimals */
  decimals: Maybe<Scalars['BigInt']>;
  /** unique identifier and primary key of the entity */
  id: Scalars['ID'];
  /** moloch dao scoped to this token */
  moloch: DaoHausMoloch;
  /** token symbol */
  symbol: Maybe<Scalars['String']>;
  /** token address */
  tokenAddress: Scalars['Bytes'];
  /** boolean value of whether token is whitelisted */
  whitelisted: Scalars['Boolean'];
};

export type DaoHausTokenBalance = {
  __typename?: 'TokenBalance';
  /** boolean value of whether the token balance belongs in the escrow */
  ecrowBank: Scalars['Boolean'];
  /** boolean value of whether the token balance belongs to the moloch dao */
  guildBank: Scalars['Boolean'];
  /** unique identifier and primary key of the entity */
  id: Scalars['ID'];
  /** address of the associated member */
  member: Maybe<DaoHausMember>;
  /** boolean value of whether the token balance belongs to the member */
  memberBank: Scalars['Boolean'];
  /** moloch dao scoped to this token balance */
  moloch: DaoHausMoloch;
  /** token scoped to this token balance */
  token: DaoHausToken;
  /** amount of tokens in balance */
  tokenBalance: Scalars['BigInt'];
};

export type DaoHausTokenBalance_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<DaoHausBlockChangedFilter>;
  ecrowBank: InputMaybe<Scalars['Boolean']>;
  ecrowBank_in: InputMaybe<Array<Scalars['Boolean']>>;
  ecrowBank_not: InputMaybe<Scalars['Boolean']>;
  ecrowBank_not_in: InputMaybe<Array<Scalars['Boolean']>>;
  guildBank: InputMaybe<Scalars['Boolean']>;
  guildBank_in: InputMaybe<Array<Scalars['Boolean']>>;
  guildBank_not: InputMaybe<Scalars['Boolean']>;
  guildBank_not_in: InputMaybe<Array<Scalars['Boolean']>>;
  id: InputMaybe<Scalars['ID']>;
  id_gt: InputMaybe<Scalars['ID']>;
  id_gte: InputMaybe<Scalars['ID']>;
  id_in: InputMaybe<Array<Scalars['ID']>>;
  id_lt: InputMaybe<Scalars['ID']>;
  id_lte: InputMaybe<Scalars['ID']>;
  id_not: InputMaybe<Scalars['ID']>;
  id_not_in: InputMaybe<Array<Scalars['ID']>>;
  member: InputMaybe<Scalars['String']>;
  memberBank: InputMaybe<Scalars['Boolean']>;
  memberBank_in: InputMaybe<Array<Scalars['Boolean']>>;
  memberBank_not: InputMaybe<Scalars['Boolean']>;
  memberBank_not_in: InputMaybe<Array<Scalars['Boolean']>>;
  member_: InputMaybe<DaoHausMember_Filter>;
  member_contains: InputMaybe<Scalars['String']>;
  member_contains_nocase: InputMaybe<Scalars['String']>;
  member_ends_with: InputMaybe<Scalars['String']>;
  member_ends_with_nocase: InputMaybe<Scalars['String']>;
  member_gt: InputMaybe<Scalars['String']>;
  member_gte: InputMaybe<Scalars['String']>;
  member_in: InputMaybe<Array<Scalars['String']>>;
  member_lt: InputMaybe<Scalars['String']>;
  member_lte: InputMaybe<Scalars['String']>;
  member_not: InputMaybe<Scalars['String']>;
  member_not_contains: InputMaybe<Scalars['String']>;
  member_not_contains_nocase: InputMaybe<Scalars['String']>;
  member_not_ends_with: InputMaybe<Scalars['String']>;
  member_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  member_not_in: InputMaybe<Array<Scalars['String']>>;
  member_not_starts_with: InputMaybe<Scalars['String']>;
  member_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  member_starts_with: InputMaybe<Scalars['String']>;
  member_starts_with_nocase: InputMaybe<Scalars['String']>;
  moloch: InputMaybe<Scalars['String']>;
  moloch_: InputMaybe<DaoHausMoloch_Filter>;
  moloch_contains: InputMaybe<Scalars['String']>;
  moloch_contains_nocase: InputMaybe<Scalars['String']>;
  moloch_ends_with: InputMaybe<Scalars['String']>;
  moloch_ends_with_nocase: InputMaybe<Scalars['String']>;
  moloch_gt: InputMaybe<Scalars['String']>;
  moloch_gte: InputMaybe<Scalars['String']>;
  moloch_in: InputMaybe<Array<Scalars['String']>>;
  moloch_lt: InputMaybe<Scalars['String']>;
  moloch_lte: InputMaybe<Scalars['String']>;
  moloch_not: InputMaybe<Scalars['String']>;
  moloch_not_contains: InputMaybe<Scalars['String']>;
  moloch_not_contains_nocase: InputMaybe<Scalars['String']>;
  moloch_not_ends_with: InputMaybe<Scalars['String']>;
  moloch_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  moloch_not_in: InputMaybe<Array<Scalars['String']>>;
  moloch_not_starts_with: InputMaybe<Scalars['String']>;
  moloch_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  moloch_starts_with: InputMaybe<Scalars['String']>;
  moloch_starts_with_nocase: InputMaybe<Scalars['String']>;
  token: InputMaybe<Scalars['String']>;
  tokenBalance: InputMaybe<Scalars['BigInt']>;
  tokenBalance_gt: InputMaybe<Scalars['BigInt']>;
  tokenBalance_gte: InputMaybe<Scalars['BigInt']>;
  tokenBalance_in: InputMaybe<Array<Scalars['BigInt']>>;
  tokenBalance_lt: InputMaybe<Scalars['BigInt']>;
  tokenBalance_lte: InputMaybe<Scalars['BigInt']>;
  tokenBalance_not: InputMaybe<Scalars['BigInt']>;
  tokenBalance_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  token_: InputMaybe<DaoHausToken_Filter>;
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

export enum DaoHausTokenBalance_OrderBy {
  EcrowBank = 'ecrowBank',
  GuildBank = 'guildBank',
  Id = 'id',
  Member = 'member',
  MemberBank = 'memberBank',
  Moloch = 'moloch',
  Token = 'token',
  TokenBalance = 'tokenBalance',
}

export type DaoHausToken_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<DaoHausBlockChangedFilter>;
  decimals: InputMaybe<Scalars['BigInt']>;
  decimals_gt: InputMaybe<Scalars['BigInt']>;
  decimals_gte: InputMaybe<Scalars['BigInt']>;
  decimals_in: InputMaybe<Array<Scalars['BigInt']>>;
  decimals_lt: InputMaybe<Scalars['BigInt']>;
  decimals_lte: InputMaybe<Scalars['BigInt']>;
  decimals_not: InputMaybe<Scalars['BigInt']>;
  decimals_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  id: InputMaybe<Scalars['ID']>;
  id_gt: InputMaybe<Scalars['ID']>;
  id_gte: InputMaybe<Scalars['ID']>;
  id_in: InputMaybe<Array<Scalars['ID']>>;
  id_lt: InputMaybe<Scalars['ID']>;
  id_lte: InputMaybe<Scalars['ID']>;
  id_not: InputMaybe<Scalars['ID']>;
  id_not_in: InputMaybe<Array<Scalars['ID']>>;
  moloch: InputMaybe<Scalars['String']>;
  moloch_: InputMaybe<DaoHausMoloch_Filter>;
  moloch_contains: InputMaybe<Scalars['String']>;
  moloch_contains_nocase: InputMaybe<Scalars['String']>;
  moloch_ends_with: InputMaybe<Scalars['String']>;
  moloch_ends_with_nocase: InputMaybe<Scalars['String']>;
  moloch_gt: InputMaybe<Scalars['String']>;
  moloch_gte: InputMaybe<Scalars['String']>;
  moloch_in: InputMaybe<Array<Scalars['String']>>;
  moloch_lt: InputMaybe<Scalars['String']>;
  moloch_lte: InputMaybe<Scalars['String']>;
  moloch_not: InputMaybe<Scalars['String']>;
  moloch_not_contains: InputMaybe<Scalars['String']>;
  moloch_not_contains_nocase: InputMaybe<Scalars['String']>;
  moloch_not_ends_with: InputMaybe<Scalars['String']>;
  moloch_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  moloch_not_in: InputMaybe<Array<Scalars['String']>>;
  moloch_not_starts_with: InputMaybe<Scalars['String']>;
  moloch_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  moloch_starts_with: InputMaybe<Scalars['String']>;
  moloch_starts_with_nocase: InputMaybe<Scalars['String']>;
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
  tokenAddress: InputMaybe<Scalars['Bytes']>;
  tokenAddress_contains: InputMaybe<Scalars['Bytes']>;
  tokenAddress_in: InputMaybe<Array<Scalars['Bytes']>>;
  tokenAddress_not: InputMaybe<Scalars['Bytes']>;
  tokenAddress_not_contains: InputMaybe<Scalars['Bytes']>;
  tokenAddress_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  whitelisted: InputMaybe<Scalars['Boolean']>;
  whitelisted_in: InputMaybe<Array<Scalars['Boolean']>>;
  whitelisted_not: InputMaybe<Scalars['Boolean']>;
  whitelisted_not_in: InputMaybe<Array<Scalars['Boolean']>>;
};

export enum DaoHausToken_OrderBy {
  Decimals = 'decimals',
  Id = 'id',
  Moloch = 'moloch',
  Symbol = 'symbol',
  TokenAddress = 'tokenAddress',
  Whitelisted = 'whitelisted',
}

export type DaoHausVote = {
  __typename?: 'Vote';
  /** block timestamp when the vote was submitted */
  createdAt: Scalars['String'];
  /** address that has received delegated shares from the member (most often, the member's own address) */
  delegateKey: Maybe<Scalars['Bytes']>;
  /** unique identifier and primary key of the entity */
  id: Scalars['ID'];
  /** related/voting member */
  member: DaoHausMember;
  /** related/voting member address */
  memberAddress: Maybe<Scalars['Bytes']>;
  /** member's proportional share of all dao shares at time of vote */
  memberPower: Maybe<Scalars['BigInt']>;
  /** contract address of the DAO related to this vote */
  molochAddress: Scalars['Bytes'];
  /** related proposal */
  proposal: DaoHausProposal;
  /** order that the proposal went through sponsorship process */
  proposalIndex: Maybe<Scalars['BigInt']>;
  /** whether the dao member has voted yes or no (1 for yes, 2 for no) */
  uintVote: Scalars['Int'];
};

export type DaoHausVote_Filter = {
  /** Filter for the block changed event. */
  _change_block: InputMaybe<DaoHausBlockChangedFilter>;
  createdAt: InputMaybe<Scalars['String']>;
  createdAt_contains: InputMaybe<Scalars['String']>;
  createdAt_contains_nocase: InputMaybe<Scalars['String']>;
  createdAt_ends_with: InputMaybe<Scalars['String']>;
  createdAt_ends_with_nocase: InputMaybe<Scalars['String']>;
  createdAt_gt: InputMaybe<Scalars['String']>;
  createdAt_gte: InputMaybe<Scalars['String']>;
  createdAt_in: InputMaybe<Array<Scalars['String']>>;
  createdAt_lt: InputMaybe<Scalars['String']>;
  createdAt_lte: InputMaybe<Scalars['String']>;
  createdAt_not: InputMaybe<Scalars['String']>;
  createdAt_not_contains: InputMaybe<Scalars['String']>;
  createdAt_not_contains_nocase: InputMaybe<Scalars['String']>;
  createdAt_not_ends_with: InputMaybe<Scalars['String']>;
  createdAt_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  createdAt_not_in: InputMaybe<Array<Scalars['String']>>;
  createdAt_not_starts_with: InputMaybe<Scalars['String']>;
  createdAt_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  createdAt_starts_with: InputMaybe<Scalars['String']>;
  createdAt_starts_with_nocase: InputMaybe<Scalars['String']>;
  delegateKey: InputMaybe<Scalars['Bytes']>;
  delegateKey_contains: InputMaybe<Scalars['Bytes']>;
  delegateKey_in: InputMaybe<Array<Scalars['Bytes']>>;
  delegateKey_not: InputMaybe<Scalars['Bytes']>;
  delegateKey_not_contains: InputMaybe<Scalars['Bytes']>;
  delegateKey_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  id: InputMaybe<Scalars['ID']>;
  id_gt: InputMaybe<Scalars['ID']>;
  id_gte: InputMaybe<Scalars['ID']>;
  id_in: InputMaybe<Array<Scalars['ID']>>;
  id_lt: InputMaybe<Scalars['ID']>;
  id_lte: InputMaybe<Scalars['ID']>;
  id_not: InputMaybe<Scalars['ID']>;
  id_not_in: InputMaybe<Array<Scalars['ID']>>;
  member: InputMaybe<Scalars['String']>;
  memberAddress: InputMaybe<Scalars['Bytes']>;
  memberAddress_contains: InputMaybe<Scalars['Bytes']>;
  memberAddress_in: InputMaybe<Array<Scalars['Bytes']>>;
  memberAddress_not: InputMaybe<Scalars['Bytes']>;
  memberAddress_not_contains: InputMaybe<Scalars['Bytes']>;
  memberAddress_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  memberPower: InputMaybe<Scalars['BigInt']>;
  memberPower_gt: InputMaybe<Scalars['BigInt']>;
  memberPower_gte: InputMaybe<Scalars['BigInt']>;
  memberPower_in: InputMaybe<Array<Scalars['BigInt']>>;
  memberPower_lt: InputMaybe<Scalars['BigInt']>;
  memberPower_lte: InputMaybe<Scalars['BigInt']>;
  memberPower_not: InputMaybe<Scalars['BigInt']>;
  memberPower_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  member_: InputMaybe<DaoHausMember_Filter>;
  member_contains: InputMaybe<Scalars['String']>;
  member_contains_nocase: InputMaybe<Scalars['String']>;
  member_ends_with: InputMaybe<Scalars['String']>;
  member_ends_with_nocase: InputMaybe<Scalars['String']>;
  member_gt: InputMaybe<Scalars['String']>;
  member_gte: InputMaybe<Scalars['String']>;
  member_in: InputMaybe<Array<Scalars['String']>>;
  member_lt: InputMaybe<Scalars['String']>;
  member_lte: InputMaybe<Scalars['String']>;
  member_not: InputMaybe<Scalars['String']>;
  member_not_contains: InputMaybe<Scalars['String']>;
  member_not_contains_nocase: InputMaybe<Scalars['String']>;
  member_not_ends_with: InputMaybe<Scalars['String']>;
  member_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  member_not_in: InputMaybe<Array<Scalars['String']>>;
  member_not_starts_with: InputMaybe<Scalars['String']>;
  member_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  member_starts_with: InputMaybe<Scalars['String']>;
  member_starts_with_nocase: InputMaybe<Scalars['String']>;
  molochAddress: InputMaybe<Scalars['Bytes']>;
  molochAddress_contains: InputMaybe<Scalars['Bytes']>;
  molochAddress_in: InputMaybe<Array<Scalars['Bytes']>>;
  molochAddress_not: InputMaybe<Scalars['Bytes']>;
  molochAddress_not_contains: InputMaybe<Scalars['Bytes']>;
  molochAddress_not_in: InputMaybe<Array<Scalars['Bytes']>>;
  proposal: InputMaybe<Scalars['String']>;
  proposalIndex: InputMaybe<Scalars['BigInt']>;
  proposalIndex_gt: InputMaybe<Scalars['BigInt']>;
  proposalIndex_gte: InputMaybe<Scalars['BigInt']>;
  proposalIndex_in: InputMaybe<Array<Scalars['BigInt']>>;
  proposalIndex_lt: InputMaybe<Scalars['BigInt']>;
  proposalIndex_lte: InputMaybe<Scalars['BigInt']>;
  proposalIndex_not: InputMaybe<Scalars['BigInt']>;
  proposalIndex_not_in: InputMaybe<Array<Scalars['BigInt']>>;
  proposal_: InputMaybe<DaoHausProposal_Filter>;
  proposal_contains: InputMaybe<Scalars['String']>;
  proposal_contains_nocase: InputMaybe<Scalars['String']>;
  proposal_ends_with: InputMaybe<Scalars['String']>;
  proposal_ends_with_nocase: InputMaybe<Scalars['String']>;
  proposal_gt: InputMaybe<Scalars['String']>;
  proposal_gte: InputMaybe<Scalars['String']>;
  proposal_in: InputMaybe<Array<Scalars['String']>>;
  proposal_lt: InputMaybe<Scalars['String']>;
  proposal_lte: InputMaybe<Scalars['String']>;
  proposal_not: InputMaybe<Scalars['String']>;
  proposal_not_contains: InputMaybe<Scalars['String']>;
  proposal_not_contains_nocase: InputMaybe<Scalars['String']>;
  proposal_not_ends_with: InputMaybe<Scalars['String']>;
  proposal_not_ends_with_nocase: InputMaybe<Scalars['String']>;
  proposal_not_in: InputMaybe<Array<Scalars['String']>>;
  proposal_not_starts_with: InputMaybe<Scalars['String']>;
  proposal_not_starts_with_nocase: InputMaybe<Scalars['String']>;
  proposal_starts_with: InputMaybe<Scalars['String']>;
  proposal_starts_with_nocase: InputMaybe<Scalars['String']>;
  uintVote: InputMaybe<Scalars['Int']>;
  uintVote_gt: InputMaybe<Scalars['Int']>;
  uintVote_gte: InputMaybe<Scalars['Int']>;
  uintVote_in: InputMaybe<Array<Scalars['Int']>>;
  uintVote_lt: InputMaybe<Scalars['Int']>;
  uintVote_lte: InputMaybe<Scalars['Int']>;
  uintVote_not: InputMaybe<Scalars['Int']>;
  uintVote_not_in: InputMaybe<Array<Scalars['Int']>>;
};

export enum DaoHausVote_OrderBy {
  CreatedAt = 'createdAt',
  DelegateKey = 'delegateKey',
  Id = 'id',
  Member = 'member',
  MemberAddress = 'memberAddress',
  MemberPower = 'memberPower',
  MolochAddress = 'molochAddress',
  Proposal = 'proposal',
  ProposalIndex = 'proposalIndex',
  UintVote = 'uintVote',
}

export type DaoHaus_Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type DaoHaus_Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: DaoHaus_Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export enum DaoHaus_SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny',
}

export type DaoHausGetDaoHausMembershipsQueryVariables = Exact<{
  memberAddress: Scalars['Bytes'];
}>;

export type DaoHausGetDaoHausMembershipsQuery = {
  __typename?: 'Query';
  members: Array<{
    __typename?: 'Member';
    id: string;
    shares: any;
    molochAddress: any;
    createdAt: string;
    memberAddress: any;
    loot: any;
    exists: boolean;
    kicked: boolean | null;
    delegateKey: any;
    moloch: {
      __typename?: 'Moloch';
      id: string;
      version: string | null;
      summoner: any;
      totalShares: any;
      totalLoot: any;
    };
  }>;
};

export const GetDaoHausMembershipsDocument = gql`
  query GetDaoHausMemberships($memberAddress: Bytes!) {
    members(
      where: { memberAddress: $memberAddress, didRagequit: false, exists: true }
    ) {
      id
      shares
      molochAddress
      createdAt
      memberAddress
      loot
      exists
      kicked
      moloch {
        id
        version
        summoner
        totalShares
        totalLoot
      }
      delegateKey
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
    GetDaoHausMemberships(
      variables: DaoHausGetDaoHausMembershipsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<DaoHausGetDaoHausMembershipsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DaoHausGetDaoHausMembershipsQuery>(
            GetDaoHausMembershipsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'GetDaoHausMemberships',
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {},
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {},
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type DaoHausResolversTypes = {
  BigDecimal: ResolverTypeWrapper<Scalars['BigDecimal']>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']>;
  BlockChangedFilter: DaoHausBlockChangedFilter;
  Block_height: DaoHausBlock_Height;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Bytes: ResolverTypeWrapper<Scalars['Bytes']>;
  Content: ResolverTypeWrapper<DaoHausContent>;
  Content_filter: DaoHausContent_Filter;
  Content_orderBy: DaoHausContent_OrderBy;
  DaoMeta: ResolverTypeWrapper<DaoHausDaoMeta>;
  DaoMeta_filter: DaoHausDaoMeta_Filter;
  DaoMeta_orderBy: DaoHausDaoMeta_OrderBy;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Member: ResolverTypeWrapper<DaoHausMember>;
  Member_filter: DaoHausMember_Filter;
  Member_orderBy: DaoHausMember_OrderBy;
  Minion: ResolverTypeWrapper<DaoHausMinion>;
  MinionAction: ResolverTypeWrapper<DaoHausMinionAction>;
  MinionAction_filter: DaoHausMinionAction_Filter;
  MinionAction_orderBy: DaoHausMinionAction_OrderBy;
  MinionStream: ResolverTypeWrapper<DaoHausMinionStream>;
  MinionStream_filter: DaoHausMinionStream_Filter;
  MinionStream_orderBy: DaoHausMinionStream_OrderBy;
  Minion_filter: DaoHausMinion_Filter;
  Minion_orderBy: DaoHausMinion_OrderBy;
  Moloch: ResolverTypeWrapper<DaoHausMoloch>;
  MolochTransaction: ResolverTypeWrapper<DaoHausMolochTransaction>;
  MolochTransaction_filter: DaoHausMolochTransaction_Filter;
  MolochTransaction_orderBy: DaoHausMolochTransaction_OrderBy;
  Moloch_filter: DaoHausMoloch_Filter;
  Moloch_orderBy: DaoHausMoloch_OrderBy;
  OrderDirection: DaoHausOrderDirection;
  Proposal: ResolverTypeWrapper<DaoHausProposal>;
  ProposalEscrow: ResolverTypeWrapper<DaoHausProposalEscrow>;
  ProposalEscrow_filter: DaoHausProposalEscrow_Filter;
  ProposalEscrow_orderBy: DaoHausProposalEscrow_OrderBy;
  Proposal_filter: DaoHausProposal_Filter;
  Proposal_orderBy: DaoHausProposal_OrderBy;
  Query: ResolverTypeWrapper<{}>;
  RageQuit: ResolverTypeWrapper<DaoHausRageQuit>;
  RageQuit_filter: DaoHausRageQuit_Filter;
  RageQuit_orderBy: DaoHausRageQuit_OrderBy;
  Record: ResolverTypeWrapper<DaoHausRecord>;
  Record_filter: DaoHausRecord_Filter;
  Record_orderBy: DaoHausRecord_OrderBy;
  SafeMinion: ResolverTypeWrapper<DaoHausSafeMinion>;
  SafeMinion_filter: DaoHausSafeMinion_Filter;
  SafeMinion_orderBy: DaoHausSafeMinion_OrderBy;
  Shaman: ResolverTypeWrapper<DaoHausShaman>;
  Shaman_filter: DaoHausShaman_Filter;
  Shaman_orderBy: DaoHausShaman_OrderBy;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
  Token: ResolverTypeWrapper<DaoHausToken>;
  TokenBalance: ResolverTypeWrapper<DaoHausTokenBalance>;
  TokenBalance_filter: DaoHausTokenBalance_Filter;
  TokenBalance_orderBy: DaoHausTokenBalance_OrderBy;
  Token_filter: DaoHausToken_Filter;
  Token_orderBy: DaoHausToken_OrderBy;
  Vote: ResolverTypeWrapper<DaoHausVote>;
  Vote_filter: DaoHausVote_Filter;
  Vote_orderBy: DaoHausVote_OrderBy;
  _Block_: ResolverTypeWrapper<DaoHaus_Block_>;
  _Meta_: ResolverTypeWrapper<DaoHaus_Meta_>;
  _SubgraphErrorPolicy_: DaoHaus_SubgraphErrorPolicy_;
};

/** Mapping between all available schema types and the resolvers parents */
export type DaoHausResolversParentTypes = {
  BigDecimal: Scalars['BigDecimal'];
  BigInt: Scalars['BigInt'];
  BlockChangedFilter: DaoHausBlockChangedFilter;
  Block_height: DaoHausBlock_Height;
  Boolean: Scalars['Boolean'];
  Bytes: Scalars['Bytes'];
  Content: DaoHausContent;
  Content_filter: DaoHausContent_Filter;
  DaoMeta: DaoHausDaoMeta;
  DaoMeta_filter: DaoHausDaoMeta_Filter;
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Member: DaoHausMember;
  Member_filter: DaoHausMember_Filter;
  Minion: DaoHausMinion;
  MinionAction: DaoHausMinionAction;
  MinionAction_filter: DaoHausMinionAction_Filter;
  MinionStream: DaoHausMinionStream;
  MinionStream_filter: DaoHausMinionStream_Filter;
  Minion_filter: DaoHausMinion_Filter;
  Moloch: DaoHausMoloch;
  MolochTransaction: DaoHausMolochTransaction;
  MolochTransaction_filter: DaoHausMolochTransaction_Filter;
  Moloch_filter: DaoHausMoloch_Filter;
  Proposal: DaoHausProposal;
  ProposalEscrow: DaoHausProposalEscrow;
  ProposalEscrow_filter: DaoHausProposalEscrow_Filter;
  Proposal_filter: DaoHausProposal_Filter;
  Query: {};
  RageQuit: DaoHausRageQuit;
  RageQuit_filter: DaoHausRageQuit_Filter;
  Record: DaoHausRecord;
  Record_filter: DaoHausRecord_Filter;
  SafeMinion: DaoHausSafeMinion;
  SafeMinion_filter: DaoHausSafeMinion_Filter;
  Shaman: DaoHausShaman;
  Shaman_filter: DaoHausShaman_Filter;
  String: Scalars['String'];
  Subscription: {};
  Token: DaoHausToken;
  TokenBalance: DaoHausTokenBalance;
  TokenBalance_filter: DaoHausTokenBalance_Filter;
  Token_filter: DaoHausToken_Filter;
  Vote: DaoHausVote;
  Vote_filter: DaoHausVote_Filter;
  _Block_: DaoHaus_Block_;
  _Meta_: DaoHaus_Meta_;
};

export type DaoHausDerivedFromDirectiveArgs = {
  field: Scalars['String'];
};

export type DaoHausDerivedFromDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = DaoHausDerivedFromDirectiveArgs,
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type DaoHausEntityDirectiveArgs = {};

export type DaoHausEntityDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = DaoHausEntityDirectiveArgs,
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type DaoHausSubgraphIdDirectiveArgs = {
  id: Scalars['String'];
};

export type DaoHausSubgraphIdDirectiveResolver<
  Result,
  Parent,
  ContextType = any,
  Args = DaoHausSubgraphIdDirectiveArgs,
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface DaoHausBigDecimalScalarConfig
  extends GraphQLScalarTypeConfig<DaoHausResolversTypes['BigDecimal'], any> {
  name: 'BigDecimal';
}

export interface DaoHausBigIntScalarConfig
  extends GraphQLScalarTypeConfig<DaoHausResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export interface DaoHausBytesScalarConfig
  extends GraphQLScalarTypeConfig<DaoHausResolversTypes['Bytes'], any> {
  name: 'Bytes';
}

export type DaoHausContentResolvers<
  ContextType = any,
  ParentType extends DaoHausResolversParentTypes['Content'] = DaoHausResolversParentTypes['Content'],
> = {
  content: Resolver<DaoHausResolversTypes['String'], ParentType, ContextType>;
  contentType: Resolver<
    DaoHausResolversTypes['String'],
    ParentType,
    ContextType
  >;
  createdAt: Resolver<DaoHausResolversTypes['String'], ParentType, ContextType>;
  description: Resolver<
    Maybe<DaoHausResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  id: Resolver<DaoHausResolversTypes['ID'], ParentType, ContextType>;
  location: Resolver<DaoHausResolversTypes['String'], ParentType, ContextType>;
  memberAddress: Resolver<
    DaoHausResolversTypes['Bytes'],
    ParentType,
    ContextType
  >;
  moloch: Resolver<
    Maybe<DaoHausResolversTypes['Moloch']>,
    ParentType,
    ContextType
  >;
  molochAddress: Resolver<
    Maybe<DaoHausResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  ratified: Resolver<DaoHausResolversTypes['Boolean'], ParentType, ContextType>;
  rawData: Resolver<DaoHausResolversTypes['String'], ParentType, ContextType>;
  title: Resolver<
    Maybe<DaoHausResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  transactionHash: Resolver<
    DaoHausResolversTypes['Bytes'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DaoHausDaoMetaResolvers<
  ContextType = any,
  ParentType extends DaoHausResolversParentTypes['DaoMeta'] = DaoHausResolversParentTypes['DaoMeta'],
> = {
  http: Resolver<
    Maybe<DaoHausResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  id: Resolver<DaoHausResolversTypes['ID'], ParentType, ContextType>;
  newContract: Resolver<
    Maybe<DaoHausResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  title: Resolver<
    Maybe<DaoHausResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  version: Resolver<
    Maybe<DaoHausResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DaoHausMemberResolvers<
  ContextType = any,
  ParentType extends DaoHausResolversParentTypes['Member'] = DaoHausResolversParentTypes['Member'],
> = {
  createdAt: Resolver<DaoHausResolversTypes['String'], ParentType, ContextType>;
  delegateKey: Resolver<
    DaoHausResolversTypes['Bytes'],
    ParentType,
    ContextType
  >;
  didRagequit: Resolver<
    DaoHausResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  exists: Resolver<DaoHausResolversTypes['Boolean'], ParentType, ContextType>;
  highestIndexYesVote: Resolver<
    Maybe<DaoHausResolversTypes['Proposal']>,
    ParentType,
    ContextType
  >;
  id: Resolver<DaoHausResolversTypes['ID'], ParentType, ContextType>;
  isDao: Resolver<
    Maybe<DaoHausResolversTypes['Moloch']>,
    ParentType,
    ContextType
  >;
  isSafeMinion: Resolver<
    Maybe<DaoHausResolversTypes['SafeMinion']>,
    ParentType,
    ContextType
  >;
  jailed: Resolver<
    Maybe<DaoHausResolversTypes['BigInt']>,
    ParentType,
    ContextType
  >;
  kicked: Resolver<
    Maybe<DaoHausResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >;
  loot: Resolver<DaoHausResolversTypes['BigInt'], ParentType, ContextType>;
  memberAddress: Resolver<
    DaoHausResolversTypes['Bytes'],
    ParentType,
    ContextType
  >;
  moloch: Resolver<DaoHausResolversTypes['Moloch'], ParentType, ContextType>;
  molochAddress: Resolver<
    DaoHausResolversTypes['Bytes'],
    ParentType,
    ContextType
  >;
  proposedToKick: Resolver<
    Maybe<DaoHausResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >;
  rageQuits: Resolver<
    Maybe<Array<DaoHausResolversTypes['RageQuit']>>,
    ParentType,
    ContextType,
    RequireFields<DaoHausMemberRageQuitsArgs, 'first' | 'skip'>
  >;
  shares: Resolver<DaoHausResolversTypes['BigInt'], ParentType, ContextType>;
  submissions: Resolver<
    Maybe<Array<DaoHausResolversTypes['Proposal']>>,
    ParentType,
    ContextType,
    RequireFields<DaoHausMemberSubmissionsArgs, 'first' | 'skip'>
  >;
  tokenBalances: Resolver<
    Maybe<Array<DaoHausResolversTypes['TokenBalance']>>,
    ParentType,
    ContextType,
    RequireFields<DaoHausMemberTokenBalancesArgs, 'first' | 'skip'>
  >;
  tokenTribute: Resolver<
    DaoHausResolversTypes['BigInt'],
    ParentType,
    ContextType
  >;
  votes: Resolver<
    Maybe<Array<DaoHausResolversTypes['Vote']>>,
    ParentType,
    ContextType,
    RequireFields<DaoHausMemberVotesArgs, 'first' | 'skip'>
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DaoHausMinionResolvers<
  ContextType = any,
  ParentType extends DaoHausResolversParentTypes['Minion'] = DaoHausResolversParentTypes['Minion'],
> = {
  bridgeModule: Resolver<
    Maybe<DaoHausResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  createdAt: Resolver<DaoHausResolversTypes['String'], ParentType, ContextType>;
  crossChainMinion: Resolver<
    DaoHausResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  details: Resolver<DaoHausResolversTypes['String'], ParentType, ContextType>;
  foreignChainId: Resolver<
    Maybe<DaoHausResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  foreignSafeAddress: Resolver<
    Maybe<DaoHausResolversTypes['Bytes']>,
    ParentType,
    ContextType
  >;
  id: Resolver<DaoHausResolversTypes['ID'], ParentType, ContextType>;
  minQuorum: Resolver<
    Maybe<DaoHausResolversTypes['BigInt']>,
    ParentType,
    ContextType
  >;
  minionAddress: Resolver<
    DaoHausResolversTypes['Bytes'],
    ParentType,
    ContextType
  >;
  minionType: Resolver<
    DaoHausResolversTypes['String'],
    ParentType,
    ContextType
  >;
  moloch: Resolver<DaoHausResolversTypes['Moloch'], ParentType, ContextType>;
  molochAddress: Resolver<
    DaoHausResolversTypes['Bytes'],
    ParentType,
    ContextType
  >;
  proposals: Resolver<
    Maybe<Array<DaoHausResolversTypes['Proposal']>>,
    ParentType,
    ContextType,
    RequireFields<DaoHausMinionProposalsArgs, 'first' | 'skip'>
  >;
  safeAddress: Resolver<
    Maybe<DaoHausResolversTypes['Bytes']>,
    ParentType,
    ContextType
  >;
  safeMinionVersion: Resolver<
    Maybe<DaoHausResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  streams: Resolver<
    Maybe<Array<DaoHausResolversTypes['MinionStream']>>,
    ParentType,
    ContextType,
    RequireFields<DaoHausMinionStreamsArgs, 'first' | 'skip'>
  >;
  uberHaus: Resolver<
    Maybe<DaoHausResolversTypes['Moloch']>,
    ParentType,
    ContextType
  >;
  uberHausAddress: Resolver<
    Maybe<DaoHausResolversTypes['Bytes']>,
    ParentType,
    ContextType
  >;
  uberHausDelegate: Resolver<
    Maybe<DaoHausResolversTypes['Bytes']>,
    ParentType,
    ContextType
  >;
  uberHausDelegateRewardFactor: Resolver<
    Maybe<DaoHausResolversTypes['BigInt']>,
    ParentType,
    ContextType
  >;
  version: Resolver<
    Maybe<DaoHausResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DaoHausMinionActionResolvers<
  ContextType = any,
  ParentType extends DaoHausResolversParentTypes['MinionAction'] = DaoHausResolversParentTypes['MinionAction'],
> = {
  data: Resolver<DaoHausResolversTypes['String'], ParentType, ContextType>;
  id: Resolver<DaoHausResolversTypes['ID'], ParentType, ContextType>;
  index: Resolver<DaoHausResolversTypes['BigInt'], ParentType, ContextType>;
  memberOnly: Resolver<
    DaoHausResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  minionAddress: Resolver<
    DaoHausResolversTypes['Bytes'],
    ParentType,
    ContextType
  >;
  molochAddress: Resolver<
    DaoHausResolversTypes['Bytes'],
    ParentType,
    ContextType
  >;
  proposal: Resolver<
    DaoHausResolversTypes['Proposal'],
    ParentType,
    ContextType
  >;
  target: Resolver<DaoHausResolversTypes['Bytes'], ParentType, ContextType>;
  withdrawToken: Resolver<
    DaoHausResolversTypes['Bytes'],
    ParentType,
    ContextType
  >;
  withdrawValue: Resolver<
    DaoHausResolversTypes['BigInt'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DaoHausMinionStreamResolvers<
  ContextType = any,
  ParentType extends DaoHausResolversParentTypes['MinionStream'] = DaoHausResolversParentTypes['MinionStream'],
> = {
  active: Resolver<DaoHausResolversTypes['Boolean'], ParentType, ContextType>;
  canceledAt: Resolver<
    Maybe<DaoHausResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  canceledBy: Resolver<
    Maybe<DaoHausResolversTypes['Bytes']>,
    ParentType,
    ContextType
  >;
  createdAt: Resolver<DaoHausResolversTypes['String'], ParentType, ContextType>;
  ctx: Resolver<DaoHausResolversTypes['Bytes'], ParentType, ContextType>;
  execTxHash: Resolver<
    Maybe<DaoHausResolversTypes['Bytes']>,
    ParentType,
    ContextType
  >;
  executed: Resolver<DaoHausResolversTypes['Boolean'], ParentType, ContextType>;
  executedAt: Resolver<
    Maybe<DaoHausResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  executedBlock: Resolver<
    Maybe<DaoHausResolversTypes['BigInt']>,
    ParentType,
    ContextType
  >;
  id: Resolver<DaoHausResolversTypes['ID'], ParentType, ContextType>;
  minDeposit: Resolver<
    DaoHausResolversTypes['BigInt'],
    ParentType,
    ContextType
  >;
  minion: Resolver<DaoHausResolversTypes['Minion'], ParentType, ContextType>;
  proposalId: Resolver<
    DaoHausResolversTypes['String'],
    ParentType,
    ContextType
  >;
  proposer: Resolver<DaoHausResolversTypes['Bytes'], ParentType, ContextType>;
  rate: Resolver<DaoHausResolversTypes['BigInt'], ParentType, ContextType>;
  superTokenAddress: Resolver<
    DaoHausResolversTypes['Bytes'],
    ParentType,
    ContextType
  >;
  to: Resolver<DaoHausResolversTypes['Bytes'], ParentType, ContextType>;
  tokenAddress: Resolver<
    DaoHausResolversTypes['Bytes'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DaoHausMolochResolvers<
  ContextType = any,
  ParentType extends DaoHausResolversParentTypes['Moloch'] = DaoHausResolversParentTypes['Moloch'],
> = {
  approvedTokens: Resolver<
    Array<DaoHausResolversTypes['Token']>,
    ParentType,
    ContextType,
    RequireFields<DaoHausMolochApprovedTokensArgs, 'first' | 'skip'>
  >;
  createdAt: Resolver<DaoHausResolversTypes['String'], ParentType, ContextType>;
  deleted: Resolver<
    Maybe<DaoHausResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >;
  depositToken: Resolver<
    DaoHausResolversTypes['Token'],
    ParentType,
    ContextType
  >;
  dilutionBound: Resolver<
    DaoHausResolversTypes['BigInt'],
    ParentType,
    ContextType
  >;
  documents: Resolver<
    Maybe<Array<DaoHausResolversTypes['Content']>>,
    ParentType,
    ContextType,
    RequireFields<DaoHausMolochDocumentsArgs, 'first' | 'skip'>
  >;
  gracePeriodLength: Resolver<
    DaoHausResolversTypes['BigInt'],
    ParentType,
    ContextType
  >;
  guildBankAddress: Resolver<
    Maybe<DaoHausResolversTypes['Bytes']>,
    ParentType,
    ContextType
  >;
  guildBankBalanceV1: Resolver<
    Maybe<DaoHausResolversTypes['BigInt']>,
    ParentType,
    ContextType
  >;
  id: Resolver<DaoHausResolversTypes['ID'], ParentType, ContextType>;
  members: Resolver<
    Maybe<Array<DaoHausResolversTypes['Member']>>,
    ParentType,
    ContextType,
    RequireFields<DaoHausMolochMembersArgs, 'first' | 'skip'>
  >;
  minions: Resolver<
    Maybe<Array<DaoHausResolversTypes['Minion']>>,
    ParentType,
    ContextType,
    RequireFields<DaoHausMolochMinionsArgs, 'first' | 'skip'>
  >;
  newContract: Resolver<
    Maybe<DaoHausResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  periodDuration: Resolver<
    DaoHausResolversTypes['BigInt'],
    ParentType,
    ContextType
  >;
  processingReward: Resolver<
    DaoHausResolversTypes['BigInt'],
    ParentType,
    ContextType
  >;
  proposalDeposit: Resolver<
    DaoHausResolversTypes['BigInt'],
    ParentType,
    ContextType
  >;
  proposals: Resolver<
    Maybe<Array<DaoHausResolversTypes['Proposal']>>,
    ParentType,
    ContextType,
    RequireFields<DaoHausMolochProposalsArgs, 'first' | 'skip'>
  >;
  rageQuits: Resolver<
    Maybe<Array<DaoHausResolversTypes['RageQuit']>>,
    ParentType,
    ContextType,
    RequireFields<DaoHausMolochRageQuitsArgs, 'first' | 'skip'>
  >;
  records: Resolver<
    Maybe<Array<DaoHausResolversTypes['Record']>>,
    ParentType,
    ContextType,
    RequireFields<DaoHausMolochRecordsArgs, 'first' | 'skip'>
  >;
  shamans: Resolver<
    Maybe<Array<DaoHausResolversTypes['Shaman']>>,
    ParentType,
    ContextType,
    RequireFields<DaoHausMolochShamansArgs, 'first' | 'skip'>
  >;
  spamPreventionAddress: Resolver<
    Maybe<DaoHausResolversTypes['Bytes']>,
    ParentType,
    ContextType
  >;
  spamPreventionAmount: Resolver<
    Maybe<DaoHausResolversTypes['BigInt']>,
    ParentType,
    ContextType
  >;
  summoner: Resolver<DaoHausResolversTypes['Bytes'], ParentType, ContextType>;
  summoningTime: Resolver<
    DaoHausResolversTypes['BigInt'],
    ParentType,
    ContextType
  >;
  tokenBalances: Resolver<
    Maybe<Array<DaoHausResolversTypes['TokenBalance']>>,
    ParentType,
    ContextType,
    RequireFields<DaoHausMolochTokenBalancesArgs, 'first' | 'skip'>
  >;
  tokens: Resolver<
    Array<DaoHausResolversTypes['Token']>,
    ParentType,
    ContextType,
    RequireFields<DaoHausMolochTokensArgs, 'first' | 'skip'>
  >;
  totalLoot: Resolver<DaoHausResolversTypes['BigInt'], ParentType, ContextType>;
  totalShares: Resolver<
    DaoHausResolversTypes['BigInt'],
    ParentType,
    ContextType
  >;
  v22Setup: Resolver<
    Maybe<DaoHausResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >;
  version: Resolver<
    Maybe<DaoHausResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  votingPeriodLength: Resolver<
    DaoHausResolversTypes['BigInt'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DaoHausMolochTransactionResolvers<
  ContextType = any,
  ParentType extends DaoHausResolversParentTypes['MolochTransaction'] = DaoHausResolversParentTypes['MolochTransaction'],
> = {
  createdAt: Resolver<DaoHausResolversTypes['String'], ParentType, ContextType>;
  id: Resolver<DaoHausResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DaoHausProposalResolvers<
  ContextType = any,
  ParentType extends DaoHausResolversParentTypes['Proposal'] = DaoHausResolversParentTypes['Proposal'],
> = {
  aborted: Resolver<
    Maybe<DaoHausResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >;
  actions: Resolver<
    Maybe<Array<DaoHausResolversTypes['MinionAction']>>,
    ParentType,
    ContextType,
    RequireFields<DaoHausProposalActionsArgs, 'first' | 'skip'>
  >;
  applicant: Resolver<DaoHausResolversTypes['Bytes'], ParentType, ContextType>;
  cancelled: Resolver<
    Maybe<DaoHausResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >;
  cancelledAt: Resolver<
    Maybe<DaoHausResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  createdAt: Resolver<DaoHausResolversTypes['String'], ParentType, ContextType>;
  createdBy: Resolver<DaoHausResolversTypes['Bytes'], ParentType, ContextType>;
  delegateKey: Resolver<
    DaoHausResolversTypes['Bytes'],
    ParentType,
    ContextType
  >;
  details: Resolver<
    Maybe<DaoHausResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  didPass: Resolver<DaoHausResolversTypes['Boolean'], ParentType, ContextType>;
  escrow: Resolver<
    Maybe<DaoHausResolversTypes['ProposalEscrow']>,
    ParentType,
    ContextType
  >;
  executed: Resolver<
    Maybe<DaoHausResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >;
  gracePeriodEnds: Resolver<
    DaoHausResolversTypes['BigInt'],
    ParentType,
    ContextType
  >;
  guildkick: Resolver<
    Maybe<DaoHausResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >;
  guildkickOrWhitelistOrMinion: Resolver<
    Maybe<DaoHausResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >;
  id: Resolver<DaoHausResolversTypes['ID'], ParentType, ContextType>;
  isMinion: Resolver<DaoHausResolversTypes['Boolean'], ParentType, ContextType>;
  lootRequested: Resolver<
    DaoHausResolversTypes['BigInt'],
    ParentType,
    ContextType
  >;
  maxTotalSharesAndLootAtYesVote: Resolver<
    Maybe<DaoHausResolversTypes['BigInt']>,
    ParentType,
    ContextType
  >;
  member: Resolver<DaoHausResolversTypes['Member'], ParentType, ContextType>;
  memberAddress: Resolver<
    DaoHausResolversTypes['Bytes'],
    ParentType,
    ContextType
  >;
  minion: Resolver<
    Maybe<DaoHausResolversTypes['Minion']>,
    ParentType,
    ContextType
  >;
  minionAddress: Resolver<
    Maybe<DaoHausResolversTypes['Bytes']>,
    ParentType,
    ContextType
  >;
  minionExecuteActionTx: Resolver<
    Maybe<DaoHausResolversTypes['MolochTransaction']>,
    ParentType,
    ContextType
  >;
  moloch: Resolver<DaoHausResolversTypes['Moloch'], ParentType, ContextType>;
  molochAddress: Resolver<
    DaoHausResolversTypes['Bytes'],
    ParentType,
    ContextType
  >;
  molochVersion: Resolver<
    DaoHausResolversTypes['String'],
    ParentType,
    ContextType
  >;
  newMember: Resolver<
    Maybe<DaoHausResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >;
  noShares: Resolver<DaoHausResolversTypes['BigInt'], ParentType, ContextType>;
  noVotes: Resolver<DaoHausResolversTypes['BigInt'], ParentType, ContextType>;
  paymentRequested: Resolver<
    DaoHausResolversTypes['BigInt'],
    ParentType,
    ContextType
  >;
  paymentToken: Resolver<
    DaoHausResolversTypes['Bytes'],
    ParentType,
    ContextType
  >;
  paymentTokenDecimals: Resolver<
    Maybe<DaoHausResolversTypes['BigInt']>,
    ParentType,
    ContextType
  >;
  paymentTokenSymbol: Resolver<
    Maybe<DaoHausResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  processed: Resolver<
    DaoHausResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  processedAt: Resolver<
    Maybe<DaoHausResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  processor: Resolver<
    Maybe<DaoHausResolversTypes['Bytes']>,
    ParentType,
    ContextType
  >;
  proposalId: Resolver<
    DaoHausResolversTypes['BigInt'],
    ParentType,
    ContextType
  >;
  proposalIndex: Resolver<
    Maybe<DaoHausResolversTypes['BigInt']>,
    ParentType,
    ContextType
  >;
  proposer: Resolver<
    Maybe<DaoHausResolversTypes['Bytes']>,
    ParentType,
    ContextType
  >;
  sharesRequested: Resolver<
    DaoHausResolversTypes['BigInt'],
    ParentType,
    ContextType
  >;
  sponsor: Resolver<DaoHausResolversTypes['Bytes'], ParentType, ContextType>;
  sponsored: Resolver<
    DaoHausResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  sponsoredAt: Resolver<
    Maybe<DaoHausResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  startingPeriod: Resolver<
    Maybe<DaoHausResolversTypes['BigInt']>,
    ParentType,
    ContextType
  >;
  trade: Resolver<
    Maybe<DaoHausResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >;
  tributeOffered: Resolver<
    DaoHausResolversTypes['BigInt'],
    ParentType,
    ContextType
  >;
  tributeToken: Resolver<
    DaoHausResolversTypes['Bytes'],
    ParentType,
    ContextType
  >;
  tributeTokenDecimals: Resolver<
    Maybe<DaoHausResolversTypes['BigInt']>,
    ParentType,
    ContextType
  >;
  tributeTokenSymbol: Resolver<
    Maybe<DaoHausResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  uberHausMinionExecuted: Resolver<
    Maybe<DaoHausResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >;
  votes: Resolver<
    Maybe<Array<DaoHausResolversTypes['Vote']>>,
    ParentType,
    ContextType,
    RequireFields<DaoHausProposalVotesArgs, 'first' | 'skip'>
  >;
  votingPeriodEnds: Resolver<
    DaoHausResolversTypes['BigInt'],
    ParentType,
    ContextType
  >;
  votingPeriodStarts: Resolver<
    DaoHausResolversTypes['BigInt'],
    ParentType,
    ContextType
  >;
  whitelist: Resolver<
    Maybe<DaoHausResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >;
  yesShares: Resolver<DaoHausResolversTypes['BigInt'], ParentType, ContextType>;
  yesVotes: Resolver<DaoHausResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DaoHausProposalEscrowResolvers<
  ContextType = any,
  ParentType extends DaoHausResolversParentTypes['ProposalEscrow'] = DaoHausResolversParentTypes['ProposalEscrow'],
> = {
  amounts: Resolver<
    Maybe<Array<DaoHausResolversTypes['BigInt']>>,
    ParentType,
    ContextType
  >;
  id: Resolver<DaoHausResolversTypes['ID'], ParentType, ContextType>;
  minionAddress: Resolver<
    DaoHausResolversTypes['Bytes'],
    ParentType,
    ContextType
  >;
  molochAddress: Resolver<
    DaoHausResolversTypes['Bytes'],
    ParentType,
    ContextType
  >;
  proposal: Resolver<
    DaoHausResolversTypes['Proposal'],
    ParentType,
    ContextType
  >;
  proposer: Resolver<DaoHausResolversTypes['Bytes'], ParentType, ContextType>;
  tokenAddresses: Resolver<
    Maybe<Array<DaoHausResolversTypes['Bytes']>>,
    ParentType,
    ContextType
  >;
  tokenIds: Resolver<
    Maybe<Array<DaoHausResolversTypes['BigInt']>>,
    ParentType,
    ContextType
  >;
  tokenTypes: Resolver<
    Maybe<Array<DaoHausResolversTypes['BigInt']>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DaoHausQueryResolvers<
  ContextType = any,
  ParentType extends DaoHausResolversParentTypes['Query'] = DaoHausResolversParentTypes['Query'],
> = {
  _meta: Resolver<
    Maybe<DaoHausResolversTypes['_Meta_']>,
    ParentType,
    ContextType,
    Partial<DaoHausQuery_MetaArgs>
  >;
  content: Resolver<
    Maybe<DaoHausResolversTypes['Content']>,
    ParentType,
    ContextType,
    RequireFields<DaoHausQueryContentArgs, 'id' | 'subgraphError'>
  >;
  contents: Resolver<
    Array<DaoHausResolversTypes['Content']>,
    ParentType,
    ContextType,
    RequireFields<DaoHausQueryContentsArgs, 'first' | 'skip' | 'subgraphError'>
  >;
  daoMeta: Resolver<
    Maybe<DaoHausResolversTypes['DaoMeta']>,
    ParentType,
    ContextType,
    RequireFields<DaoHausQueryDaoMetaArgs, 'id' | 'subgraphError'>
  >;
  daoMetas: Resolver<
    Array<DaoHausResolversTypes['DaoMeta']>,
    ParentType,
    ContextType,
    RequireFields<DaoHausQueryDaoMetasArgs, 'first' | 'skip' | 'subgraphError'>
  >;
  member: Resolver<
    Maybe<DaoHausResolversTypes['Member']>,
    ParentType,
    ContextType,
    RequireFields<DaoHausQueryMemberArgs, 'id' | 'subgraphError'>
  >;
  members: Resolver<
    Array<DaoHausResolversTypes['Member']>,
    ParentType,
    ContextType,
    RequireFields<DaoHausQueryMembersArgs, 'first' | 'skip' | 'subgraphError'>
  >;
  minion: Resolver<
    Maybe<DaoHausResolversTypes['Minion']>,
    ParentType,
    ContextType,
    RequireFields<DaoHausQueryMinionArgs, 'id' | 'subgraphError'>
  >;
  minionAction: Resolver<
    Maybe<DaoHausResolversTypes['MinionAction']>,
    ParentType,
    ContextType,
    RequireFields<DaoHausQueryMinionActionArgs, 'id' | 'subgraphError'>
  >;
  minionActions: Resolver<
    Array<DaoHausResolversTypes['MinionAction']>,
    ParentType,
    ContextType,
    RequireFields<
      DaoHausQueryMinionActionsArgs,
      'first' | 'skip' | 'subgraphError'
    >
  >;
  minionStream: Resolver<
    Maybe<DaoHausResolversTypes['MinionStream']>,
    ParentType,
    ContextType,
    RequireFields<DaoHausQueryMinionStreamArgs, 'id' | 'subgraphError'>
  >;
  minionStreams: Resolver<
    Array<DaoHausResolversTypes['MinionStream']>,
    ParentType,
    ContextType,
    RequireFields<
      DaoHausQueryMinionStreamsArgs,
      'first' | 'skip' | 'subgraphError'
    >
  >;
  minions: Resolver<
    Array<DaoHausResolversTypes['Minion']>,
    ParentType,
    ContextType,
    RequireFields<DaoHausQueryMinionsArgs, 'first' | 'skip' | 'subgraphError'>
  >;
  moloch: Resolver<
    Maybe<DaoHausResolversTypes['Moloch']>,
    ParentType,
    ContextType,
    RequireFields<DaoHausQueryMolochArgs, 'id' | 'subgraphError'>
  >;
  molochTransaction: Resolver<
    Maybe<DaoHausResolversTypes['MolochTransaction']>,
    ParentType,
    ContextType,
    RequireFields<DaoHausQueryMolochTransactionArgs, 'id' | 'subgraphError'>
  >;
  molochTransactions: Resolver<
    Array<DaoHausResolversTypes['MolochTransaction']>,
    ParentType,
    ContextType,
    RequireFields<
      DaoHausQueryMolochTransactionsArgs,
      'first' | 'skip' | 'subgraphError'
    >
  >;
  moloches: Resolver<
    Array<DaoHausResolversTypes['Moloch']>,
    ParentType,
    ContextType,
    RequireFields<DaoHausQueryMolochesArgs, 'first' | 'skip' | 'subgraphError'>
  >;
  proposal: Resolver<
    Maybe<DaoHausResolversTypes['Proposal']>,
    ParentType,
    ContextType,
    RequireFields<DaoHausQueryProposalArgs, 'id' | 'subgraphError'>
  >;
  proposalEscrow: Resolver<
    Maybe<DaoHausResolversTypes['ProposalEscrow']>,
    ParentType,
    ContextType,
    RequireFields<DaoHausQueryProposalEscrowArgs, 'id' | 'subgraphError'>
  >;
  proposalEscrows: Resolver<
    Array<DaoHausResolversTypes['ProposalEscrow']>,
    ParentType,
    ContextType,
    RequireFields<
      DaoHausQueryProposalEscrowsArgs,
      'first' | 'skip' | 'subgraphError'
    >
  >;
  proposals: Resolver<
    Array<DaoHausResolversTypes['Proposal']>,
    ParentType,
    ContextType,
    RequireFields<DaoHausQueryProposalsArgs, 'first' | 'skip' | 'subgraphError'>
  >;
  rageQuit: Resolver<
    Maybe<DaoHausResolversTypes['RageQuit']>,
    ParentType,
    ContextType,
    RequireFields<DaoHausQueryRageQuitArgs, 'id' | 'subgraphError'>
  >;
  rageQuits: Resolver<
    Array<DaoHausResolversTypes['RageQuit']>,
    ParentType,
    ContextType,
    RequireFields<DaoHausQueryRageQuitsArgs, 'first' | 'skip' | 'subgraphError'>
  >;
  record: Resolver<
    Maybe<DaoHausResolversTypes['Record']>,
    ParentType,
    ContextType,
    RequireFields<DaoHausQueryRecordArgs, 'id' | 'subgraphError'>
  >;
  records: Resolver<
    Array<DaoHausResolversTypes['Record']>,
    ParentType,
    ContextType,
    RequireFields<DaoHausQueryRecordsArgs, 'first' | 'skip' | 'subgraphError'>
  >;
  safeMinion: Resolver<
    Maybe<DaoHausResolversTypes['SafeMinion']>,
    ParentType,
    ContextType,
    RequireFields<DaoHausQuerySafeMinionArgs, 'id' | 'subgraphError'>
  >;
  safeMinions: Resolver<
    Array<DaoHausResolversTypes['SafeMinion']>,
    ParentType,
    ContextType,
    RequireFields<
      DaoHausQuerySafeMinionsArgs,
      'first' | 'skip' | 'subgraphError'
    >
  >;
  shaman: Resolver<
    Maybe<DaoHausResolversTypes['Shaman']>,
    ParentType,
    ContextType,
    RequireFields<DaoHausQueryShamanArgs, 'id' | 'subgraphError'>
  >;
  shamans: Resolver<
    Array<DaoHausResolversTypes['Shaman']>,
    ParentType,
    ContextType,
    RequireFields<DaoHausQueryShamansArgs, 'first' | 'skip' | 'subgraphError'>
  >;
  token: Resolver<
    Maybe<DaoHausResolversTypes['Token']>,
    ParentType,
    ContextType,
    RequireFields<DaoHausQueryTokenArgs, 'id' | 'subgraphError'>
  >;
  tokenBalance: Resolver<
    Maybe<DaoHausResolversTypes['TokenBalance']>,
    ParentType,
    ContextType,
    RequireFields<DaoHausQueryTokenBalanceArgs, 'id' | 'subgraphError'>
  >;
  tokenBalances: Resolver<
    Array<DaoHausResolversTypes['TokenBalance']>,
    ParentType,
    ContextType,
    RequireFields<
      DaoHausQueryTokenBalancesArgs,
      'first' | 'skip' | 'subgraphError'
    >
  >;
  tokens: Resolver<
    Array<DaoHausResolversTypes['Token']>,
    ParentType,
    ContextType,
    RequireFields<DaoHausQueryTokensArgs, 'first' | 'skip' | 'subgraphError'>
  >;
  vote: Resolver<
    Maybe<DaoHausResolversTypes['Vote']>,
    ParentType,
    ContextType,
    RequireFields<DaoHausQueryVoteArgs, 'id' | 'subgraphError'>
  >;
  votes: Resolver<
    Array<DaoHausResolversTypes['Vote']>,
    ParentType,
    ContextType,
    RequireFields<DaoHausQueryVotesArgs, 'first' | 'skip' | 'subgraphError'>
  >;
};

export type DaoHausRageQuitResolvers<
  ContextType = any,
  ParentType extends DaoHausResolversParentTypes['RageQuit'] = DaoHausResolversParentTypes['RageQuit'],
> = {
  createdAt: Resolver<DaoHausResolversTypes['String'], ParentType, ContextType>;
  id: Resolver<DaoHausResolversTypes['ID'], ParentType, ContextType>;
  loot: Resolver<DaoHausResolversTypes['BigInt'], ParentType, ContextType>;
  member: Resolver<DaoHausResolversTypes['Member'], ParentType, ContextType>;
  memberAddress: Resolver<
    DaoHausResolversTypes['Bytes'],
    ParentType,
    ContextType
  >;
  moloch: Resolver<DaoHausResolversTypes['Moloch'], ParentType, ContextType>;
  molochAddress: Resolver<
    DaoHausResolversTypes['Bytes'],
    ParentType,
    ContextType
  >;
  shares: Resolver<DaoHausResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DaoHausRecordResolvers<
  ContextType = any,
  ParentType extends DaoHausResolversParentTypes['Record'] = DaoHausResolversParentTypes['Record'],
> = {
  content: Resolver<DaoHausResolversTypes['String'], ParentType, ContextType>;
  contentType: Resolver<
    DaoHausResolversTypes['String'],
    ParentType,
    ContextType
  >;
  createdAt: Resolver<DaoHausResolversTypes['String'], ParentType, ContextType>;
  createdBy: Resolver<DaoHausResolversTypes['Bytes'], ParentType, ContextType>;
  id: Resolver<DaoHausResolversTypes['ID'], ParentType, ContextType>;
  moloch: Resolver<DaoHausResolversTypes['Moloch'], ParentType, ContextType>;
  table: Resolver<DaoHausResolversTypes['String'], ParentType, ContextType>;
  tag: Resolver<DaoHausResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DaoHausSafeMinionResolvers<
  ContextType = any,
  ParentType extends DaoHausResolversParentTypes['SafeMinion'] = DaoHausResolversParentTypes['SafeMinion'],
> = {
  id: Resolver<DaoHausResolversTypes['ID'], ParentType, ContextType>;
  minions: Resolver<
    Array<DaoHausResolversTypes['Minion']>,
    ParentType,
    ContextType,
    RequireFields<DaoHausSafeMinionMinionsArgs, 'first' | 'skip'>
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DaoHausShamanResolvers<
  ContextType = any,
  ParentType extends DaoHausResolversParentTypes['Shaman'] = DaoHausResolversParentTypes['Shaman'],
> = {
  createdAt: Resolver<DaoHausResolversTypes['String'], ParentType, ContextType>;
  enabled: Resolver<DaoHausResolversTypes['Boolean'], ParentType, ContextType>;
  id: Resolver<DaoHausResolversTypes['ID'], ParentType, ContextType>;
  moloch: Resolver<DaoHausResolversTypes['Moloch'], ParentType, ContextType>;
  molochAddress: Resolver<
    DaoHausResolversTypes['Bytes'],
    ParentType,
    ContextType
  >;
  shamanAddress: Resolver<
    DaoHausResolversTypes['Bytes'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DaoHausSubscriptionResolvers<
  ContextType = any,
  ParentType extends DaoHausResolversParentTypes['Subscription'] = DaoHausResolversParentTypes['Subscription'],
> = {
  _meta: SubscriptionResolver<
    Maybe<DaoHausResolversTypes['_Meta_']>,
    '_meta',
    ParentType,
    ContextType,
    Partial<DaoHausSubscription_MetaArgs>
  >;
  content: SubscriptionResolver<
    Maybe<DaoHausResolversTypes['Content']>,
    'content',
    ParentType,
    ContextType,
    RequireFields<DaoHausSubscriptionContentArgs, 'id' | 'subgraphError'>
  >;
  contents: SubscriptionResolver<
    Array<DaoHausResolversTypes['Content']>,
    'contents',
    ParentType,
    ContextType,
    RequireFields<
      DaoHausSubscriptionContentsArgs,
      'first' | 'skip' | 'subgraphError'
    >
  >;
  daoMeta: SubscriptionResolver<
    Maybe<DaoHausResolversTypes['DaoMeta']>,
    'daoMeta',
    ParentType,
    ContextType,
    RequireFields<DaoHausSubscriptionDaoMetaArgs, 'id' | 'subgraphError'>
  >;
  daoMetas: SubscriptionResolver<
    Array<DaoHausResolversTypes['DaoMeta']>,
    'daoMetas',
    ParentType,
    ContextType,
    RequireFields<
      DaoHausSubscriptionDaoMetasArgs,
      'first' | 'skip' | 'subgraphError'
    >
  >;
  member: SubscriptionResolver<
    Maybe<DaoHausResolversTypes['Member']>,
    'member',
    ParentType,
    ContextType,
    RequireFields<DaoHausSubscriptionMemberArgs, 'id' | 'subgraphError'>
  >;
  members: SubscriptionResolver<
    Array<DaoHausResolversTypes['Member']>,
    'members',
    ParentType,
    ContextType,
    RequireFields<
      DaoHausSubscriptionMembersArgs,
      'first' | 'skip' | 'subgraphError'
    >
  >;
  minion: SubscriptionResolver<
    Maybe<DaoHausResolversTypes['Minion']>,
    'minion',
    ParentType,
    ContextType,
    RequireFields<DaoHausSubscriptionMinionArgs, 'id' | 'subgraphError'>
  >;
  minionAction: SubscriptionResolver<
    Maybe<DaoHausResolversTypes['MinionAction']>,
    'minionAction',
    ParentType,
    ContextType,
    RequireFields<DaoHausSubscriptionMinionActionArgs, 'id' | 'subgraphError'>
  >;
  minionActions: SubscriptionResolver<
    Array<DaoHausResolversTypes['MinionAction']>,
    'minionActions',
    ParentType,
    ContextType,
    RequireFields<
      DaoHausSubscriptionMinionActionsArgs,
      'first' | 'skip' | 'subgraphError'
    >
  >;
  minionStream: SubscriptionResolver<
    Maybe<DaoHausResolversTypes['MinionStream']>,
    'minionStream',
    ParentType,
    ContextType,
    RequireFields<DaoHausSubscriptionMinionStreamArgs, 'id' | 'subgraphError'>
  >;
  minionStreams: SubscriptionResolver<
    Array<DaoHausResolversTypes['MinionStream']>,
    'minionStreams',
    ParentType,
    ContextType,
    RequireFields<
      DaoHausSubscriptionMinionStreamsArgs,
      'first' | 'skip' | 'subgraphError'
    >
  >;
  minions: SubscriptionResolver<
    Array<DaoHausResolversTypes['Minion']>,
    'minions',
    ParentType,
    ContextType,
    RequireFields<
      DaoHausSubscriptionMinionsArgs,
      'first' | 'skip' | 'subgraphError'
    >
  >;
  moloch: SubscriptionResolver<
    Maybe<DaoHausResolversTypes['Moloch']>,
    'moloch',
    ParentType,
    ContextType,
    RequireFields<DaoHausSubscriptionMolochArgs, 'id' | 'subgraphError'>
  >;
  molochTransaction: SubscriptionResolver<
    Maybe<DaoHausResolversTypes['MolochTransaction']>,
    'molochTransaction',
    ParentType,
    ContextType,
    RequireFields<
      DaoHausSubscriptionMolochTransactionArgs,
      'id' | 'subgraphError'
    >
  >;
  molochTransactions: SubscriptionResolver<
    Array<DaoHausResolversTypes['MolochTransaction']>,
    'molochTransactions',
    ParentType,
    ContextType,
    RequireFields<
      DaoHausSubscriptionMolochTransactionsArgs,
      'first' | 'skip' | 'subgraphError'
    >
  >;
  moloches: SubscriptionResolver<
    Array<DaoHausResolversTypes['Moloch']>,
    'moloches',
    ParentType,
    ContextType,
    RequireFields<
      DaoHausSubscriptionMolochesArgs,
      'first' | 'skip' | 'subgraphError'
    >
  >;
  proposal: SubscriptionResolver<
    Maybe<DaoHausResolversTypes['Proposal']>,
    'proposal',
    ParentType,
    ContextType,
    RequireFields<DaoHausSubscriptionProposalArgs, 'id' | 'subgraphError'>
  >;
  proposalEscrow: SubscriptionResolver<
    Maybe<DaoHausResolversTypes['ProposalEscrow']>,
    'proposalEscrow',
    ParentType,
    ContextType,
    RequireFields<DaoHausSubscriptionProposalEscrowArgs, 'id' | 'subgraphError'>
  >;
  proposalEscrows: SubscriptionResolver<
    Array<DaoHausResolversTypes['ProposalEscrow']>,
    'proposalEscrows',
    ParentType,
    ContextType,
    RequireFields<
      DaoHausSubscriptionProposalEscrowsArgs,
      'first' | 'skip' | 'subgraphError'
    >
  >;
  proposals: SubscriptionResolver<
    Array<DaoHausResolversTypes['Proposal']>,
    'proposals',
    ParentType,
    ContextType,
    RequireFields<
      DaoHausSubscriptionProposalsArgs,
      'first' | 'skip' | 'subgraphError'
    >
  >;
  rageQuit: SubscriptionResolver<
    Maybe<DaoHausResolversTypes['RageQuit']>,
    'rageQuit',
    ParentType,
    ContextType,
    RequireFields<DaoHausSubscriptionRageQuitArgs, 'id' | 'subgraphError'>
  >;
  rageQuits: SubscriptionResolver<
    Array<DaoHausResolversTypes['RageQuit']>,
    'rageQuits',
    ParentType,
    ContextType,
    RequireFields<
      DaoHausSubscriptionRageQuitsArgs,
      'first' | 'skip' | 'subgraphError'
    >
  >;
  record: SubscriptionResolver<
    Maybe<DaoHausResolversTypes['Record']>,
    'record',
    ParentType,
    ContextType,
    RequireFields<DaoHausSubscriptionRecordArgs, 'id' | 'subgraphError'>
  >;
  records: SubscriptionResolver<
    Array<DaoHausResolversTypes['Record']>,
    'records',
    ParentType,
    ContextType,
    RequireFields<
      DaoHausSubscriptionRecordsArgs,
      'first' | 'skip' | 'subgraphError'
    >
  >;
  safeMinion: SubscriptionResolver<
    Maybe<DaoHausResolversTypes['SafeMinion']>,
    'safeMinion',
    ParentType,
    ContextType,
    RequireFields<DaoHausSubscriptionSafeMinionArgs, 'id' | 'subgraphError'>
  >;
  safeMinions: SubscriptionResolver<
    Array<DaoHausResolversTypes['SafeMinion']>,
    'safeMinions',
    ParentType,
    ContextType,
    RequireFields<
      DaoHausSubscriptionSafeMinionsArgs,
      'first' | 'skip' | 'subgraphError'
    >
  >;
  shaman: SubscriptionResolver<
    Maybe<DaoHausResolversTypes['Shaman']>,
    'shaman',
    ParentType,
    ContextType,
    RequireFields<DaoHausSubscriptionShamanArgs, 'id' | 'subgraphError'>
  >;
  shamans: SubscriptionResolver<
    Array<DaoHausResolversTypes['Shaman']>,
    'shamans',
    ParentType,
    ContextType,
    RequireFields<
      DaoHausSubscriptionShamansArgs,
      'first' | 'skip' | 'subgraphError'
    >
  >;
  token: SubscriptionResolver<
    Maybe<DaoHausResolversTypes['Token']>,
    'token',
    ParentType,
    ContextType,
    RequireFields<DaoHausSubscriptionTokenArgs, 'id' | 'subgraphError'>
  >;
  tokenBalance: SubscriptionResolver<
    Maybe<DaoHausResolversTypes['TokenBalance']>,
    'tokenBalance',
    ParentType,
    ContextType,
    RequireFields<DaoHausSubscriptionTokenBalanceArgs, 'id' | 'subgraphError'>
  >;
  tokenBalances: SubscriptionResolver<
    Array<DaoHausResolversTypes['TokenBalance']>,
    'tokenBalances',
    ParentType,
    ContextType,
    RequireFields<
      DaoHausSubscriptionTokenBalancesArgs,
      'first' | 'skip' | 'subgraphError'
    >
  >;
  tokens: SubscriptionResolver<
    Array<DaoHausResolversTypes['Token']>,
    'tokens',
    ParentType,
    ContextType,
    RequireFields<
      DaoHausSubscriptionTokensArgs,
      'first' | 'skip' | 'subgraphError'
    >
  >;
  vote: SubscriptionResolver<
    Maybe<DaoHausResolversTypes['Vote']>,
    'vote',
    ParentType,
    ContextType,
    RequireFields<DaoHausSubscriptionVoteArgs, 'id' | 'subgraphError'>
  >;
  votes: SubscriptionResolver<
    Array<DaoHausResolversTypes['Vote']>,
    'votes',
    ParentType,
    ContextType,
    RequireFields<
      DaoHausSubscriptionVotesArgs,
      'first' | 'skip' | 'subgraphError'
    >
  >;
};

export type DaoHausTokenResolvers<
  ContextType = any,
  ParentType extends DaoHausResolversParentTypes['Token'] = DaoHausResolversParentTypes['Token'],
> = {
  decimals: Resolver<
    Maybe<DaoHausResolversTypes['BigInt']>,
    ParentType,
    ContextType
  >;
  id: Resolver<DaoHausResolversTypes['ID'], ParentType, ContextType>;
  moloch: Resolver<DaoHausResolversTypes['Moloch'], ParentType, ContextType>;
  symbol: Resolver<
    Maybe<DaoHausResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  tokenAddress: Resolver<
    DaoHausResolversTypes['Bytes'],
    ParentType,
    ContextType
  >;
  whitelisted: Resolver<
    DaoHausResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DaoHausTokenBalanceResolvers<
  ContextType = any,
  ParentType extends DaoHausResolversParentTypes['TokenBalance'] = DaoHausResolversParentTypes['TokenBalance'],
> = {
  ecrowBank: Resolver<
    DaoHausResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  guildBank: Resolver<
    DaoHausResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  id: Resolver<DaoHausResolversTypes['ID'], ParentType, ContextType>;
  member: Resolver<
    Maybe<DaoHausResolversTypes['Member']>,
    ParentType,
    ContextType
  >;
  memberBank: Resolver<
    DaoHausResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  moloch: Resolver<DaoHausResolversTypes['Moloch'], ParentType, ContextType>;
  token: Resolver<DaoHausResolversTypes['Token'], ParentType, ContextType>;
  tokenBalance: Resolver<
    DaoHausResolversTypes['BigInt'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DaoHausVoteResolvers<
  ContextType = any,
  ParentType extends DaoHausResolversParentTypes['Vote'] = DaoHausResolversParentTypes['Vote'],
> = {
  createdAt: Resolver<DaoHausResolversTypes['String'], ParentType, ContextType>;
  delegateKey: Resolver<
    Maybe<DaoHausResolversTypes['Bytes']>,
    ParentType,
    ContextType
  >;
  id: Resolver<DaoHausResolversTypes['ID'], ParentType, ContextType>;
  member: Resolver<DaoHausResolversTypes['Member'], ParentType, ContextType>;
  memberAddress: Resolver<
    Maybe<DaoHausResolversTypes['Bytes']>,
    ParentType,
    ContextType
  >;
  memberPower: Resolver<
    Maybe<DaoHausResolversTypes['BigInt']>,
    ParentType,
    ContextType
  >;
  molochAddress: Resolver<
    DaoHausResolversTypes['Bytes'],
    ParentType,
    ContextType
  >;
  proposal: Resolver<
    DaoHausResolversTypes['Proposal'],
    ParentType,
    ContextType
  >;
  proposalIndex: Resolver<
    Maybe<DaoHausResolversTypes['BigInt']>,
    ParentType,
    ContextType
  >;
  uintVote: Resolver<DaoHausResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DaoHaus_Block_Resolvers<
  ContextType = any,
  ParentType extends DaoHausResolversParentTypes['_Block_'] = DaoHausResolversParentTypes['_Block_'],
> = {
  hash: Resolver<
    Maybe<DaoHausResolversTypes['Bytes']>,
    ParentType,
    ContextType
  >;
  number: Resolver<DaoHausResolversTypes['Int'], ParentType, ContextType>;
  timestamp: Resolver<
    Maybe<DaoHausResolversTypes['Int']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DaoHaus_Meta_Resolvers<
  ContextType = any,
  ParentType extends DaoHausResolversParentTypes['_Meta_'] = DaoHausResolversParentTypes['_Meta_'],
> = {
  block: Resolver<DaoHausResolversTypes['_Block_'], ParentType, ContextType>;
  deployment: Resolver<
    DaoHausResolversTypes['String'],
    ParentType,
    ContextType
  >;
  hasIndexingErrors: Resolver<
    DaoHausResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DaoHausResolvers<ContextType = any> = {
  BigDecimal: GraphQLScalarType;
  BigInt: GraphQLScalarType;
  Bytes: GraphQLScalarType;
  Content: DaoHausContentResolvers<ContextType>;
  DaoMeta: DaoHausDaoMetaResolvers<ContextType>;
  Member: DaoHausMemberResolvers<ContextType>;
  Minion: DaoHausMinionResolvers<ContextType>;
  MinionAction: DaoHausMinionActionResolvers<ContextType>;
  MinionStream: DaoHausMinionStreamResolvers<ContextType>;
  Moloch: DaoHausMolochResolvers<ContextType>;
  MolochTransaction: DaoHausMolochTransactionResolvers<ContextType>;
  Proposal: DaoHausProposalResolvers<ContextType>;
  ProposalEscrow: DaoHausProposalEscrowResolvers<ContextType>;
  Query: DaoHausQueryResolvers<ContextType>;
  RageQuit: DaoHausRageQuitResolvers<ContextType>;
  Record: DaoHausRecordResolvers<ContextType>;
  SafeMinion: DaoHausSafeMinionResolvers<ContextType>;
  Shaman: DaoHausShamanResolvers<ContextType>;
  Subscription: DaoHausSubscriptionResolvers<ContextType>;
  Token: DaoHausTokenResolvers<ContextType>;
  TokenBalance: DaoHausTokenBalanceResolvers<ContextType>;
  Vote: DaoHausVoteResolvers<ContextType>;
  _Block_: DaoHaus_Block_Resolvers<ContextType>;
  _Meta_: DaoHaus_Meta_Resolvers<ContextType>;
};

export type DaoHausDirectiveResolvers<ContextType = any> = {
  derivedFrom: DaoHausDerivedFromDirectiveResolver<any, any, ContextType>;
  entity: DaoHausEntityDirectiveResolver<any, any, ContextType>;
  subgraphId: DaoHausSubgraphIdDirectiveResolver<any, any, ContextType>;
};
