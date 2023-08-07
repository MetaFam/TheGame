/* eslint-disable */
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T extends PromiseLike<infer U> ? Promise<U | null> : T | null | undefined;
export type InputMaybe<T> = T extends PromiseLike<infer U> ? Promise<U | null> : T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  uuid: any;
};

export type BrightIdStatus = {
  __typename?: 'BrightIdStatus';
  app: Scalars['String'];
  context: Scalars['String'];
  contextIds: Array<Scalars['String']>;
  unique: Scalars['Boolean'];
};

export type CollectiblesFavorites = {
  __typename?: 'CollectiblesFavorites';
  address: Maybe<Scalars['String']>;
  tokenId: Maybe<Scalars['String']>;
};

export type DaoMetadata = {
  __typename?: 'DaoMetadata';
  avatarImg: Maybe<Scalars['String']>;
  contractAddress: Scalars['String'];
  description: Scalars['String'];
  name: Scalars['String'];
  network: Scalars['String'];
};

export type DiscordRole = {
  __typename?: 'DiscordRole';
  id: Scalars['String'];
  name: Scalars['String'];
  position: Scalars['Int'];
};

export type Member = {
  __typename?: 'Member';
  createdAt: Scalars['String'];
  delegateKey: Scalars['String'];
  exists: Scalars['Boolean'];
  id: Scalars['ID'];
  kicked: Maybe<Scalars['Boolean']>;
  loot: Maybe<Scalars['String']>;
  memberAddress: Scalars['String'];
  moloch: Moloch;
  molochAddress: Scalars['String'];
  shares: Scalars['String'];
};

export type Moloch = {
  __typename?: 'Moloch';
  avatarURL: Maybe<Scalars['String']>;
  chain: Scalars['String'];
  id: Scalars['ID'];
  summoner: Scalars['String'];
  title: Maybe<Scalars['String']>;
  totalLoot: Scalars['String'];
  totalShares: Scalars['String'];
  version: Maybe<Scalars['String']>;
};

export type PSeedInfo = {
  __typename?: 'PSeedInfo';
  priceUsd: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  getBrightIdStatus: Maybe<BrightIdStatus>;
  getDaoHausMemberships: Array<Member>;
  getDiscordServerMemberRoles: Array<DiscordRole>;
  getGuildDiscordAnnouncements: Maybe<Array<Scalars['String']>>;
  getGuildDiscordRoles: Array<DiscordRole>;
  getPSeedInfo: Maybe<PSeedInfo>;
  getTokenBalances: Maybe<TokenBalances>;
  getTopPSeedHolders: Maybe<Array<TokenBalances>>;
};


export type QueryGetBrightIdStatusArgs = {
  contextId: InputMaybe<Scalars['uuid']>;
};


export type QueryGetDaoHausMembershipsArgs = {
  memberAddress: InputMaybe<Scalars['String']>;
};


export type QueryGetDiscordServerMemberRolesArgs = {
  guildId: Scalars['uuid'];
  playerId: Scalars['uuid'];
};


export type QueryGetGuildDiscordAnnouncementsArgs = {
  guildDiscordId: InputMaybe<Scalars['String']>;
};


export type QueryGetGuildDiscordRolesArgs = {
  guildDiscordId: InputMaybe<Scalars['String']>;
};


export type QueryGetTokenBalancesArgs = {
  address: InputMaybe<Scalars['String']>;
};


export type QueryGetTopPSeedHoldersArgs = {
  limit: InputMaybe<Scalars['Int']>;
};

export type TokenBalances = {
  __typename?: 'TokenBalances';
  id: Scalars['ID'];
  pSeedBalance: Scalars['String'];
  seedBalance: Scalars['String'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  BrightIdStatus: ResolverTypeWrapper<BrightIdStatus>;
  CollectiblesFavorites: ResolverTypeWrapper<CollectiblesFavorites>;
  DaoMetadata: ResolverTypeWrapper<DaoMetadata>;
  DiscordRole: ResolverTypeWrapper<DiscordRole>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Member: ResolverTypeWrapper<Member>;
  Moloch: ResolverTypeWrapper<Moloch>;
  PSeedInfo: ResolverTypeWrapper<PSeedInfo>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  TokenBalances: ResolverTypeWrapper<TokenBalances>;
  uuid: ResolverTypeWrapper<Scalars['uuid']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  BrightIdStatus: BrightIdStatus;
  CollectiblesFavorites: CollectiblesFavorites;
  DaoMetadata: DaoMetadata;
  DiscordRole: DiscordRole;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Member: Member;
  Moloch: Moloch;
  PSeedInfo: PSeedInfo;
  Query: {};
  String: Scalars['String'];
  TokenBalances: TokenBalances;
  uuid: Scalars['uuid'];
};

export type BrightIdStatusResolvers<ContextType = any, ParentType extends ResolversParentTypes['BrightIdStatus'] = ResolversParentTypes['BrightIdStatus']> = {
  app: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  context: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  contextIds: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  unique: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CollectiblesFavoritesResolvers<ContextType = any, ParentType extends ResolversParentTypes['CollectiblesFavorites'] = ResolversParentTypes['CollectiblesFavorites']> = {
  address: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tokenId: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DaoMetadataResolvers<ContextType = any, ParentType extends ResolversParentTypes['DaoMetadata'] = ResolversParentTypes['DaoMetadata']> = {
  avatarImg: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  contractAddress: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  network: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DiscordRoleResolvers<ContextType = any, ParentType extends ResolversParentTypes['DiscordRole'] = ResolversParentTypes['DiscordRole']> = {
  id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  position: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MemberResolvers<ContextType = any, ParentType extends ResolversParentTypes['Member'] = ResolversParentTypes['Member']> = {
  createdAt: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  delegateKey: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  exists: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  kicked: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  loot: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  memberAddress: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  moloch: Resolver<ResolversTypes['Moloch'], ParentType, ContextType>;
  molochAddress: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  shares: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MolochResolvers<ContextType = any, ParentType extends ResolversParentTypes['Moloch'] = ResolversParentTypes['Moloch']> = {
  avatarURL: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  chain: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  summoner: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  totalLoot: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  totalShares: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  version: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PSeedInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PSeedInfo'] = ResolversParentTypes['PSeedInfo']> = {
  priceUsd: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getBrightIdStatus: Resolver<Maybe<ResolversTypes['BrightIdStatus']>, ParentType, ContextType, Partial<QueryGetBrightIdStatusArgs>>;
  getDaoHausMemberships: Resolver<Array<ResolversTypes['Member']>, ParentType, ContextType, Partial<QueryGetDaoHausMembershipsArgs>>;
  getDiscordServerMemberRoles: Resolver<Array<ResolversTypes['DiscordRole']>, ParentType, ContextType, RequireFields<QueryGetDiscordServerMemberRolesArgs, 'guildId' | 'playerId'>>;
  getGuildDiscordAnnouncements: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType, Partial<QueryGetGuildDiscordAnnouncementsArgs>>;
  getGuildDiscordRoles: Resolver<Array<ResolversTypes['DiscordRole']>, ParentType, ContextType, Partial<QueryGetGuildDiscordRolesArgs>>;
  getPSeedInfo: Resolver<Maybe<ResolversTypes['PSeedInfo']>, ParentType, ContextType>;
  getTokenBalances: Resolver<Maybe<ResolversTypes['TokenBalances']>, ParentType, ContextType, Partial<QueryGetTokenBalancesArgs>>;
  getTopPSeedHolders: Resolver<Maybe<Array<ResolversTypes['TokenBalances']>>, ParentType, ContextType, Partial<QueryGetTopPSeedHoldersArgs>>;
};

export type TokenBalancesResolvers<ContextType = any, ParentType extends ResolversParentTypes['TokenBalances'] = ResolversParentTypes['TokenBalances']> = {
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  pSeedBalance: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  seedBalance: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UuidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['uuid'], any> {
  name: 'uuid';
}

export type Resolvers<ContextType = any> = {
  BrightIdStatus: BrightIdStatusResolvers<ContextType>;
  CollectiblesFavorites: CollectiblesFavoritesResolvers<ContextType>;
  DaoMetadata: DaoMetadataResolvers<ContextType>;
  DiscordRole: DiscordRoleResolvers<ContextType>;
  Member: MemberResolvers<ContextType>;
  Moloch: MolochResolvers<ContextType>;
  PSeedInfo: PSeedInfoResolvers<ContextType>;
  Query: QueryResolvers<ContextType>;
  TokenBalances: TokenBalancesResolvers<ContextType>;
  uuid: GraphQLScalarType;
};

