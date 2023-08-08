/* eslint-disable */
import { DocumentNode } from 'graphql';
import * as Urql from 'urql';
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
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  float8: any;
  json: any;
  jsonb: any;
  numeric: any;
  timestamptz: any;
  uuid: any;
};

/** columns and relationships of "AccountType" */
export type AccountType = {
  type: Scalars['String'];
};

/** aggregated selection of "AccountType" */
export type AccountType_Aggregate = {
  aggregate?: Maybe<AccountType_Aggregate_Fields>;
  nodes: Array<AccountType>;
};

/** aggregate fields of "AccountType" */
export type AccountType_Aggregate_Fields = {
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<AccountType_Max_Fields>;
  min?: Maybe<AccountType_Min_Fields>;
};

/** aggregate fields of "AccountType" */
export type AccountType_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<AccountType_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "AccountType" */
export type AccountType_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<AccountType_Max_Order_By>;
  min?: InputMaybe<AccountType_Min_Order_By>;
};

/** input type for inserting array relation for remote table "AccountType" */
export type AccountType_Arr_Rel_Insert_Input = {
  data: Array<AccountType_Insert_Input>;
  on_conflict?: InputMaybe<AccountType_On_Conflict>;
};

/** Boolean expression to filter rows from the table "AccountType". All fields are combined with a logical 'AND'. */
export type AccountType_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<AccountType_Bool_Exp>>>;
  _not?: InputMaybe<AccountType_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<AccountType_Bool_Exp>>>;
  type?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "AccountType" */
export enum AccountType_Constraint {
  /** unique or primary key constraint */
  AccountTypePkey = 'AccountType_pkey',
}

export enum AccountType_Enum {
  Discord = 'DISCORD',
  Discourse = 'DISCOURSE',
  Ethereum = 'ETHEREUM',
  Github = 'GITHUB',
  Meetwithwallet = 'MEETWITHWALLET',
  Twitter = 'TWITTER',
}

/** expression to compare columns of type AccountType_enum. All fields are combined with logical 'AND'. */
export type AccountType_Enum_Comparison_Exp = {
  _eq?: InputMaybe<AccountType_Enum>;
  _in?: InputMaybe<Array<AccountType_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<AccountType_Enum>;
  _nin?: InputMaybe<Array<AccountType_Enum>>;
};

/** input type for inserting data into table "AccountType" */
export type AccountType_Insert_Input = {
  type?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type AccountType_Max_Fields = {
  type?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "AccountType" */
export type AccountType_Max_Order_By = {
  type?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type AccountType_Min_Fields = {
  type?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "AccountType" */
export type AccountType_Min_Order_By = {
  type?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "AccountType" */
export type AccountType_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<AccountType>;
};

/** input type for inserting object relation for remote table "AccountType" */
export type AccountType_Obj_Rel_Insert_Input = {
  data: AccountType_Insert_Input;
  on_conflict?: InputMaybe<AccountType_On_Conflict>;
};

/** on conflict condition type for table "AccountType" */
export type AccountType_On_Conflict = {
  constraint: AccountType_Constraint;
  update_columns: Array<AccountType_Update_Column>;
  where?: InputMaybe<AccountType_Bool_Exp>;
};

/** ordering options when selecting data from "AccountType" */
export type AccountType_Order_By = {
  type?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "AccountType" */
export type AccountType_Pk_Columns_Input = {
  type: Scalars['String'];
};

/** select columns of table "AccountType" */
export enum AccountType_Select_Column {
  /** column name */
  Type = 'type',
}

/** input type for updating data in table "AccountType" */
export type AccountType_Set_Input = {
  type?: InputMaybe<Scalars['String']>;
};

/** update columns of table "AccountType" */
export enum AccountType_Update_Column {
  /** column name */
  Type = 'type',
}

/** expression to compare columns of type Boolean. All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']>;
  _gt?: InputMaybe<Scalars['Boolean']>;
  _gte?: InputMaybe<Scalars['Boolean']>;
  _in?: InputMaybe<Array<Scalars['Boolean']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Boolean']>;
  _lte?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Scalars['Boolean']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']>>;
};

export type BrightIdStatus = {
  app: Scalars['String'];
  context: Scalars['String'];
  contextIds: Array<Scalars['String']>;
  unique: Scalars['Boolean'];
};

export type CacheProcessOutput = {
  error?: Maybe<Scalars['String']>;
  queued: Scalars['Boolean'];
  success: Scalars['Boolean'];
};

export type CollectiblesFavorites = {
  address?: Maybe<Scalars['String']>;
  tokenId?: Maybe<Scalars['String']>;
};

/** columns and relationships of "ColorAspect" */
export type ColorAspect = {
  description?: Maybe<Scalars['String']>;
  mask: Scalars['Int'];
  name: Scalars['String'];
  /** An array relationship */
  profiles: Array<Profile>;
  /** An aggregated array relationship */
  profiles_aggregate: Profile_Aggregate;
};

/** columns and relationships of "ColorAspect" */
export type ColorAspectProfilesArgs = {
  distinct_on?: InputMaybe<Array<Profile_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Profile_Order_By>>;
  where?: InputMaybe<Profile_Bool_Exp>;
};

/** columns and relationships of "ColorAspect" */
export type ColorAspectProfiles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Profile_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Profile_Order_By>>;
  where?: InputMaybe<Profile_Bool_Exp>;
};

/** aggregated selection of "ColorAspect" */
export type ColorAspect_Aggregate = {
  aggregate?: Maybe<ColorAspect_Aggregate_Fields>;
  nodes: Array<ColorAspect>;
};

/** aggregate fields of "ColorAspect" */
export type ColorAspect_Aggregate_Fields = {
  avg?: Maybe<ColorAspect_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<ColorAspect_Max_Fields>;
  min?: Maybe<ColorAspect_Min_Fields>;
  stddev?: Maybe<ColorAspect_Stddev_Fields>;
  stddev_pop?: Maybe<ColorAspect_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<ColorAspect_Stddev_Samp_Fields>;
  sum?: Maybe<ColorAspect_Sum_Fields>;
  var_pop?: Maybe<ColorAspect_Var_Pop_Fields>;
  var_samp?: Maybe<ColorAspect_Var_Samp_Fields>;
  variance?: Maybe<ColorAspect_Variance_Fields>;
};

/** aggregate fields of "ColorAspect" */
export type ColorAspect_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<ColorAspect_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "ColorAspect" */
export type ColorAspect_Aggregate_Order_By = {
  avg?: InputMaybe<ColorAspect_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<ColorAspect_Max_Order_By>;
  min?: InputMaybe<ColorAspect_Min_Order_By>;
  stddev?: InputMaybe<ColorAspect_Stddev_Order_By>;
  stddev_pop?: InputMaybe<ColorAspect_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<ColorAspect_Stddev_Samp_Order_By>;
  sum?: InputMaybe<ColorAspect_Sum_Order_By>;
  var_pop?: InputMaybe<ColorAspect_Var_Pop_Order_By>;
  var_samp?: InputMaybe<ColorAspect_Var_Samp_Order_By>;
  variance?: InputMaybe<ColorAspect_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "ColorAspect" */
export type ColorAspect_Arr_Rel_Insert_Input = {
  data: Array<ColorAspect_Insert_Input>;
  on_conflict?: InputMaybe<ColorAspect_On_Conflict>;
};

/** aggregate avg on columns */
export type ColorAspect_Avg_Fields = {
  mask?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "ColorAspect" */
export type ColorAspect_Avg_Order_By = {
  mask?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "ColorAspect". All fields are combined with a logical 'AND'. */
export type ColorAspect_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<ColorAspect_Bool_Exp>>>;
  _not?: InputMaybe<ColorAspect_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<ColorAspect_Bool_Exp>>>;
  description?: InputMaybe<String_Comparison_Exp>;
  mask?: InputMaybe<Int_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  profiles?: InputMaybe<Profile_Bool_Exp>;
};

/** unique or primary key constraints on table "ColorAspect" */
export enum ColorAspect_Constraint {
  /** unique or primary key constraint */
  ColorAspectNameKey = 'ColorAspect_name_key',
  /** unique or primary key constraint */
  ColorAspectPkey = 'ColorAspect_pkey',
}

/** input type for incrementing integer column in table "ColorAspect" */
export type ColorAspect_Inc_Input = {
  mask?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "ColorAspect" */
export type ColorAspect_Insert_Input = {
  description?: InputMaybe<Scalars['String']>;
  mask?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  profiles?: InputMaybe<Profile_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type ColorAspect_Max_Fields = {
  description?: Maybe<Scalars['String']>;
  mask?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "ColorAspect" */
export type ColorAspect_Max_Order_By = {
  description?: InputMaybe<Order_By>;
  mask?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type ColorAspect_Min_Fields = {
  description?: Maybe<Scalars['String']>;
  mask?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "ColorAspect" */
export type ColorAspect_Min_Order_By = {
  description?: InputMaybe<Order_By>;
  mask?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "ColorAspect" */
export type ColorAspect_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<ColorAspect>;
};

/** input type for inserting object relation for remote table "ColorAspect" */
export type ColorAspect_Obj_Rel_Insert_Input = {
  data: ColorAspect_Insert_Input;
  on_conflict?: InputMaybe<ColorAspect_On_Conflict>;
};

/** on conflict condition type for table "ColorAspect" */
export type ColorAspect_On_Conflict = {
  constraint: ColorAspect_Constraint;
  update_columns: Array<ColorAspect_Update_Column>;
  where?: InputMaybe<ColorAspect_Bool_Exp>;
};

/** ordering options when selecting data from "ColorAspect" */
export type ColorAspect_Order_By = {
  description?: InputMaybe<Order_By>;
  mask?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  profiles_aggregate?: InputMaybe<Profile_Aggregate_Order_By>;
};

/** primary key columns input for table: "ColorAspect" */
export type ColorAspect_Pk_Columns_Input = {
  mask: Scalars['Int'];
};

/** select columns of table "ColorAspect" */
export enum ColorAspect_Select_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Mask = 'mask',
  /** column name */
  Name = 'name',
}

/** input type for updating data in table "ColorAspect" */
export type ColorAspect_Set_Input = {
  description?: InputMaybe<Scalars['String']>;
  mask?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type ColorAspect_Stddev_Fields = {
  mask?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "ColorAspect" */
export type ColorAspect_Stddev_Order_By = {
  mask?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type ColorAspect_Stddev_Pop_Fields = {
  mask?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "ColorAspect" */
export type ColorAspect_Stddev_Pop_Order_By = {
  mask?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type ColorAspect_Stddev_Samp_Fields = {
  mask?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "ColorAspect" */
export type ColorAspect_Stddev_Samp_Order_By = {
  mask?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type ColorAspect_Sum_Fields = {
  mask?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "ColorAspect" */
export type ColorAspect_Sum_Order_By = {
  mask?: InputMaybe<Order_By>;
};

/** update columns of table "ColorAspect" */
export enum ColorAspect_Update_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Mask = 'mask',
  /** column name */
  Name = 'name',
}

/** aggregate var_pop on columns */
export type ColorAspect_Var_Pop_Fields = {
  mask?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "ColorAspect" */
export type ColorAspect_Var_Pop_Order_By = {
  mask?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type ColorAspect_Var_Samp_Fields = {
  mask?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "ColorAspect" */
export type ColorAspect_Var_Samp_Order_By = {
  mask?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type ColorAspect_Variance_Fields = {
  mask?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "ColorAspect" */
export type ColorAspect_Variance_Order_By = {
  mask?: InputMaybe<Order_By>;
};

export type CreateQuestCompletionInput = {
  questId: Scalars['String'];
  submissionLink?: InputMaybe<Scalars['String']>;
  submissionText?: InputMaybe<Scalars['String']>;
};

export type CreateQuestCompletionOutput = {
  error?: Maybe<Scalars['String']>;
  quest_completion?: Maybe<Quest_Completion>;
  quest_completion_id?: Maybe<Scalars['uuid']>;
  success: Scalars['Boolean'];
};

export type CreateQuestInput = {
  cooldown?: InputMaybe<Scalars['Int']>;
  description?: InputMaybe<Scalars['String']>;
  externalLink?: InputMaybe<Scalars['String']>;
  guildId: Scalars['uuid'];
  image?: InputMaybe<Scalars['String']>;
  repetition?: InputMaybe<QuestRepetition_ActionEnum>;
  roleIds: Array<InputMaybe<Scalars['uuid']>>;
  skillIds: Array<InputMaybe<Scalars['uuid']>>;
  title: Scalars['String'];
};

export type CreateQuestOutput = {
  error?: Maybe<Scalars['String']>;
  quest?: Maybe<Quest>;
  quest_id?: Maybe<Scalars['uuid']>;
  success: Scalars['Boolean'];
};

export type DaoMetadata = {
  avatarImg?: Maybe<Scalars['String']>;
  contractAddress: Scalars['String'];
  description: Scalars['String'];
  name: Scalars['String'];
  network: Scalars['String'];
};

export type DiscordGuildAuthResponse = {
  error?: Maybe<Scalars['String']>;
  exists?: Maybe<Scalars['Boolean']>;
  guildname?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type DiscordGuildsSyncOutput = {
  name: Scalars['String'];
  numDeleted?: Maybe<Scalars['Int']>;
  numInserted?: Maybe<Scalars['Int']>;
  numSkipped?: Maybe<Scalars['Int']>;
  username: Scalars['String'];
};

export type DiscordRole = {
  id: Scalars['String'];
  name: Scalars['String'];
  position: Scalars['Int'];
};

export type ExpiredPlayerProfiles = {
  ids: Array<Maybe<Scalars['String']>>;
};

/** columns and relationships of "ExplorerType" */
export type ExplorerType = {
  description: Scalars['String'];
  id: Scalars['Int'];
  imageURL?: Maybe<Scalars['String']>;
  /** An array relationship */
  profiles: Array<Profile>;
  /** An aggregated array relationship */
  profiles_aggregate: Profile_Aggregate;
  title: Scalars['String'];
};

/** columns and relationships of "ExplorerType" */
export type ExplorerTypeProfilesArgs = {
  distinct_on?: InputMaybe<Array<Profile_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Profile_Order_By>>;
  where?: InputMaybe<Profile_Bool_Exp>;
};

/** columns and relationships of "ExplorerType" */
export type ExplorerTypeProfiles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Profile_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Profile_Order_By>>;
  where?: InputMaybe<Profile_Bool_Exp>;
};

/** aggregated selection of "ExplorerType" */
export type ExplorerType_Aggregate = {
  aggregate?: Maybe<ExplorerType_Aggregate_Fields>;
  nodes: Array<ExplorerType>;
};

/** aggregate fields of "ExplorerType" */
export type ExplorerType_Aggregate_Fields = {
  avg?: Maybe<ExplorerType_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<ExplorerType_Max_Fields>;
  min?: Maybe<ExplorerType_Min_Fields>;
  stddev?: Maybe<ExplorerType_Stddev_Fields>;
  stddev_pop?: Maybe<ExplorerType_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<ExplorerType_Stddev_Samp_Fields>;
  sum?: Maybe<ExplorerType_Sum_Fields>;
  var_pop?: Maybe<ExplorerType_Var_Pop_Fields>;
  var_samp?: Maybe<ExplorerType_Var_Samp_Fields>;
  variance?: Maybe<ExplorerType_Variance_Fields>;
};

/** aggregate fields of "ExplorerType" */
export type ExplorerType_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<ExplorerType_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "ExplorerType" */
export type ExplorerType_Aggregate_Order_By = {
  avg?: InputMaybe<ExplorerType_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<ExplorerType_Max_Order_By>;
  min?: InputMaybe<ExplorerType_Min_Order_By>;
  stddev?: InputMaybe<ExplorerType_Stddev_Order_By>;
  stddev_pop?: InputMaybe<ExplorerType_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<ExplorerType_Stddev_Samp_Order_By>;
  sum?: InputMaybe<ExplorerType_Sum_Order_By>;
  var_pop?: InputMaybe<ExplorerType_Var_Pop_Order_By>;
  var_samp?: InputMaybe<ExplorerType_Var_Samp_Order_By>;
  variance?: InputMaybe<ExplorerType_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "ExplorerType" */
export type ExplorerType_Arr_Rel_Insert_Input = {
  data: Array<ExplorerType_Insert_Input>;
  on_conflict?: InputMaybe<ExplorerType_On_Conflict>;
};

/** aggregate avg on columns */
export type ExplorerType_Avg_Fields = {
  id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "ExplorerType" */
export type ExplorerType_Avg_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "ExplorerType". All fields are combined with a logical 'AND'. */
export type ExplorerType_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<ExplorerType_Bool_Exp>>>;
  _not?: InputMaybe<ExplorerType_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<ExplorerType_Bool_Exp>>>;
  description?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  imageURL?: InputMaybe<String_Comparison_Exp>;
  profiles?: InputMaybe<Profile_Bool_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "ExplorerType" */
export enum ExplorerType_Constraint {
  /** unique or primary key constraint */
  PlayerTypePkey = 'PlayerType_pkey',
  /** unique or primary key constraint */
  PlayerTypeTitleKey = 'PlayerType_title_key',
}

/** input type for incrementing integer column in table "ExplorerType" */
export type ExplorerType_Inc_Input = {
  id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "ExplorerType" */
export type ExplorerType_Insert_Input = {
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  imageURL?: InputMaybe<Scalars['String']>;
  profiles?: InputMaybe<Profile_Arr_Rel_Insert_Input>;
  title?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type ExplorerType_Max_Fields = {
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  imageURL?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "ExplorerType" */
export type ExplorerType_Max_Order_By = {
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  imageURL?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type ExplorerType_Min_Fields = {
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  imageURL?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "ExplorerType" */
export type ExplorerType_Min_Order_By = {
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  imageURL?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "ExplorerType" */
export type ExplorerType_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<ExplorerType>;
};

/** input type for inserting object relation for remote table "ExplorerType" */
export type ExplorerType_Obj_Rel_Insert_Input = {
  data: ExplorerType_Insert_Input;
  on_conflict?: InputMaybe<ExplorerType_On_Conflict>;
};

/** on conflict condition type for table "ExplorerType" */
export type ExplorerType_On_Conflict = {
  constraint: ExplorerType_Constraint;
  update_columns: Array<ExplorerType_Update_Column>;
  where?: InputMaybe<ExplorerType_Bool_Exp>;
};

/** ordering options when selecting data from "ExplorerType" */
export type ExplorerType_Order_By = {
  description?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  imageURL?: InputMaybe<Order_By>;
  profiles_aggregate?: InputMaybe<Profile_Aggregate_Order_By>;
  title?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "ExplorerType" */
export type ExplorerType_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "ExplorerType" */
export enum ExplorerType_Select_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  ImageUrl = 'imageURL',
  /** column name */
  Title = 'title',
}

/** input type for updating data in table "ExplorerType" */
export type ExplorerType_Set_Input = {
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  imageURL?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type ExplorerType_Stddev_Fields = {
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "ExplorerType" */
export type ExplorerType_Stddev_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type ExplorerType_Stddev_Pop_Fields = {
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "ExplorerType" */
export type ExplorerType_Stddev_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type ExplorerType_Stddev_Samp_Fields = {
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "ExplorerType" */
export type ExplorerType_Stddev_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type ExplorerType_Sum_Fields = {
  id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "ExplorerType" */
export type ExplorerType_Sum_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** update columns of table "ExplorerType" */
export enum ExplorerType_Update_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Id = 'id',
  /** column name */
  ImageUrl = 'imageURL',
  /** column name */
  Title = 'title',
}

/** aggregate var_pop on columns */
export type ExplorerType_Var_Pop_Fields = {
  id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "ExplorerType" */
export type ExplorerType_Var_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type ExplorerType_Var_Samp_Fields = {
  id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "ExplorerType" */
export type ExplorerType_Var_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type ExplorerType_Variance_Fields = {
  id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "ExplorerType" */
export type ExplorerType_Variance_Order_By = {
  id?: InputMaybe<Order_By>;
};

export type GuildDaoInput = {
  contractAddress: Scalars['String'];
  label?: InputMaybe<Scalars['String']>;
  network: Scalars['String'];
  url?: InputMaybe<Scalars['String']>;
};

export type GuildInfoInput = {
  daos?: InputMaybe<Array<GuildDaoInput>>;
  description?: InputMaybe<Scalars['String']>;
  discordAdminRoles: Array<InputMaybe<Scalars['String']>>;
  discordInviteUrl?: InputMaybe<Scalars['String']>;
  discordMembershipRoles: Array<InputMaybe<Scalars['String']>>;
  githubUrl?: InputMaybe<Scalars['String']>;
  guildname: Scalars['String'];
  joinUrl?: InputMaybe<Scalars['String']>;
  logoUrl?: InputMaybe<Scalars['String']>;
  membershipThroughDiscord?: InputMaybe<Scalars['Boolean']>;
  name: Scalars['String'];
  twitterUrl?: InputMaybe<Scalars['String']>;
  type: GuildType_ActionEnum;
  uuid: Scalars['String'];
  websiteUrl?: InputMaybe<Scalars['String']>;
};

export type GuildLayoutInfoInput = {
  profileLayout: Scalars['String'];
  uuid: Scalars['String'];
};

/** columns and relationships of "GuildStatus" */
export type GuildStatus = {
  status: Scalars['String'];
};

/** aggregated selection of "GuildStatus" */
export type GuildStatus_Aggregate = {
  aggregate?: Maybe<GuildStatus_Aggregate_Fields>;
  nodes: Array<GuildStatus>;
};

/** aggregate fields of "GuildStatus" */
export type GuildStatus_Aggregate_Fields = {
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<GuildStatus_Max_Fields>;
  min?: Maybe<GuildStatus_Min_Fields>;
};

/** aggregate fields of "GuildStatus" */
export type GuildStatus_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<GuildStatus_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "GuildStatus" */
export type GuildStatus_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<GuildStatus_Max_Order_By>;
  min?: InputMaybe<GuildStatus_Min_Order_By>;
};

/** input type for inserting array relation for remote table "GuildStatus" */
export type GuildStatus_Arr_Rel_Insert_Input = {
  data: Array<GuildStatus_Insert_Input>;
  on_conflict?: InputMaybe<GuildStatus_On_Conflict>;
};

/** Boolean expression to filter rows from the table "GuildStatus". All fields are combined with a logical 'AND'. */
export type GuildStatus_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<GuildStatus_Bool_Exp>>>;
  _not?: InputMaybe<GuildStatus_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<GuildStatus_Bool_Exp>>>;
  status?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "GuildStatus" */
export enum GuildStatus_Constraint {
  /** unique or primary key constraint */
  GuildStatusPkey = 'GuildStatus_pkey',
}

export enum GuildStatus_Enum {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  Pending = 'PENDING',
}

/** expression to compare columns of type GuildStatus_enum. All fields are combined with logical 'AND'. */
export type GuildStatus_Enum_Comparison_Exp = {
  _eq?: InputMaybe<GuildStatus_Enum>;
  _in?: InputMaybe<Array<GuildStatus_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<GuildStatus_Enum>;
  _nin?: InputMaybe<Array<GuildStatus_Enum>>;
};

/** input type for inserting data into table "GuildStatus" */
export type GuildStatus_Insert_Input = {
  status?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type GuildStatus_Max_Fields = {
  status?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "GuildStatus" */
export type GuildStatus_Max_Order_By = {
  status?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type GuildStatus_Min_Fields = {
  status?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "GuildStatus" */
export type GuildStatus_Min_Order_By = {
  status?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "GuildStatus" */
export type GuildStatus_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<GuildStatus>;
};

/** input type for inserting object relation for remote table "GuildStatus" */
export type GuildStatus_Obj_Rel_Insert_Input = {
  data: GuildStatus_Insert_Input;
  on_conflict?: InputMaybe<GuildStatus_On_Conflict>;
};

/** on conflict condition type for table "GuildStatus" */
export type GuildStatus_On_Conflict = {
  constraint: GuildStatus_Constraint;
  update_columns: Array<GuildStatus_Update_Column>;
  where?: InputMaybe<GuildStatus_Bool_Exp>;
};

/** ordering options when selecting data from "GuildStatus" */
export type GuildStatus_Order_By = {
  status?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "GuildStatus" */
export type GuildStatus_Pk_Columns_Input = {
  status: Scalars['String'];
};

/** select columns of table "GuildStatus" */
export enum GuildStatus_Select_Column {
  /** column name */
  Status = 'status',
}

/** input type for updating data in table "GuildStatus" */
export type GuildStatus_Set_Input = {
  status?: InputMaybe<Scalars['String']>;
};

/** update columns of table "GuildStatus" */
export enum GuildStatus_Update_Column {
  /** column name */
  Status = 'status',
}

/** columns and relationships of "GuildType" */
export type GuildType = {
  /** An array relationship */
  Guilds: Array<Guild>;
  /** An aggregated array relationship */
  Guilds_aggregate: Guild_Aggregate;
  name: Scalars['String'];
};

/** columns and relationships of "GuildType" */
export type GuildTypeGuildsArgs = {
  distinct_on?: InputMaybe<Array<Guild_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Guild_Order_By>>;
  where?: InputMaybe<Guild_Bool_Exp>;
};

/** columns and relationships of "GuildType" */
export type GuildTypeGuilds_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Guild_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Guild_Order_By>>;
  where?: InputMaybe<Guild_Bool_Exp>;
};

export enum GuildType_ActionEnum {
  Funding = 'FUNDING',
  Project = 'PROJECT',
  Research = 'RESEARCH',
  Service = 'SERVICE',
  Social = 'SOCIAL',
}

/** aggregated selection of "GuildType" */
export type GuildType_Aggregate = {
  aggregate?: Maybe<GuildType_Aggregate_Fields>;
  nodes: Array<GuildType>;
};

/** aggregate fields of "GuildType" */
export type GuildType_Aggregate_Fields = {
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<GuildType_Max_Fields>;
  min?: Maybe<GuildType_Min_Fields>;
};

/** aggregate fields of "GuildType" */
export type GuildType_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<GuildType_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "GuildType" */
export type GuildType_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<GuildType_Max_Order_By>;
  min?: InputMaybe<GuildType_Min_Order_By>;
};

/** input type for inserting array relation for remote table "GuildType" */
export type GuildType_Arr_Rel_Insert_Input = {
  data: Array<GuildType_Insert_Input>;
  on_conflict?: InputMaybe<GuildType_On_Conflict>;
};

/** Boolean expression to filter rows from the table "GuildType". All fields are combined with a logical 'AND'. */
export type GuildType_Bool_Exp = {
  Guilds?: InputMaybe<Guild_Bool_Exp>;
  _and?: InputMaybe<Array<InputMaybe<GuildType_Bool_Exp>>>;
  _not?: InputMaybe<GuildType_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<GuildType_Bool_Exp>>>;
  name?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "GuildType" */
export enum GuildType_Constraint {
  /** unique or primary key constraint */
  GuildTypePkey = 'GuildType_pkey',
}

export enum GuildType_Enum {
  Funding = 'FUNDING',
  Project = 'PROJECT',
  Research = 'RESEARCH',
  Service = 'SERVICE',
  Social = 'SOCIAL',
}

/** expression to compare columns of type GuildType_enum. All fields are combined with logical 'AND'. */
export type GuildType_Enum_Comparison_Exp = {
  _eq?: InputMaybe<GuildType_Enum>;
  _in?: InputMaybe<Array<GuildType_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<GuildType_Enum>;
  _nin?: InputMaybe<Array<GuildType_Enum>>;
};

/** input type for inserting data into table "GuildType" */
export type GuildType_Insert_Input = {
  Guilds?: InputMaybe<Guild_Arr_Rel_Insert_Input>;
  name?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type GuildType_Max_Fields = {
  name?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "GuildType" */
export type GuildType_Max_Order_By = {
  name?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type GuildType_Min_Fields = {
  name?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "GuildType" */
export type GuildType_Min_Order_By = {
  name?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "GuildType" */
export type GuildType_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<GuildType>;
};

/** input type for inserting object relation for remote table "GuildType" */
export type GuildType_Obj_Rel_Insert_Input = {
  data: GuildType_Insert_Input;
  on_conflict?: InputMaybe<GuildType_On_Conflict>;
};

/** on conflict condition type for table "GuildType" */
export type GuildType_On_Conflict = {
  constraint: GuildType_Constraint;
  update_columns: Array<GuildType_Update_Column>;
  where?: InputMaybe<GuildType_Bool_Exp>;
};

/** ordering options when selecting data from "GuildType" */
export type GuildType_Order_By = {
  Guilds_aggregate?: InputMaybe<Guild_Aggregate_Order_By>;
  name?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "GuildType" */
export type GuildType_Pk_Columns_Input = {
  name: Scalars['String'];
};

/** select columns of table "GuildType" */
export enum GuildType_Select_Column {
  /** column name */
  Name = 'name',
}

/** input type for updating data in table "GuildType" */
export type GuildType_Set_Input = {
  name?: InputMaybe<Scalars['String']>;
};

/** update columns of table "GuildType" */
export enum GuildType_Update_Column {
  /** column name */
  Name = 'name',
}

/** expression to compare columns of type Int. All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']>;
  _gt?: InputMaybe<Scalars['Int']>;
  _gte?: InputMaybe<Scalars['Int']>;
  _in?: InputMaybe<Array<Scalars['Int']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Int']>;
  _lte?: InputMaybe<Scalars['Int']>;
  _neq?: InputMaybe<Scalars['Int']>;
  _nin?: InputMaybe<Array<Scalars['Int']>>;
};

export type Member = {
  createdAt: Scalars['String'];
  delegateKey: Scalars['String'];
  exists: Scalars['Boolean'];
  id: Scalars['ID'];
  kicked?: Maybe<Scalars['Boolean']>;
  loot?: Maybe<Scalars['String']>;
  memberAddress: Scalars['String'];
  moloch: Moloch;
  molochAddress: Scalars['String'];
  shares: Scalars['String'];
};

export type Moloch = {
  avatarURL?: Maybe<Scalars['String']>;
  chain: Scalars['String'];
  id: Scalars['ID'];
  summoner: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  totalLoot: Scalars['String'];
  totalShares: Scalars['String'];
  version?: Maybe<Scalars['String']>;
};

export type PSeedInfo = {
  priceUsd?: Maybe<Scalars['String']>;
};

/** columns and relationships of "PlayerRank" */
export type PlayerRank = {
  rank: Scalars['String'];
};

/** aggregated selection of "PlayerRank" */
export type PlayerRank_Aggregate = {
  aggregate?: Maybe<PlayerRank_Aggregate_Fields>;
  nodes: Array<PlayerRank>;
};

/** aggregate fields of "PlayerRank" */
export type PlayerRank_Aggregate_Fields = {
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<PlayerRank_Max_Fields>;
  min?: Maybe<PlayerRank_Min_Fields>;
};

/** aggregate fields of "PlayerRank" */
export type PlayerRank_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<PlayerRank_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "PlayerRank" */
export type PlayerRank_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<PlayerRank_Max_Order_By>;
  min?: InputMaybe<PlayerRank_Min_Order_By>;
};

/** input type for inserting array relation for remote table "PlayerRank" */
export type PlayerRank_Arr_Rel_Insert_Input = {
  data: Array<PlayerRank_Insert_Input>;
  on_conflict?: InputMaybe<PlayerRank_On_Conflict>;
};

/** Boolean expression to filter rows from the table "PlayerRank". All fields are combined with a logical 'AND'. */
export type PlayerRank_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<PlayerRank_Bool_Exp>>>;
  _not?: InputMaybe<PlayerRank_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<PlayerRank_Bool_Exp>>>;
  rank?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "PlayerRank" */
export enum PlayerRank_Constraint {
  /** unique or primary key constraint */
  PlayerRankPkey = 'Player_Rank_pkey',
}

export enum PlayerRank_Enum {
  Bronze = 'BRONZE',
  Diamond = 'DIAMOND',
  Gold = 'GOLD',
  Platinum = 'PLATINUM',
  Silver = 'SILVER',
}

/** expression to compare columns of type PlayerRank_enum. All fields are combined with logical 'AND'. */
export type PlayerRank_Enum_Comparison_Exp = {
  _eq?: InputMaybe<PlayerRank_Enum>;
  _in?: InputMaybe<Array<PlayerRank_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<PlayerRank_Enum>;
  _nin?: InputMaybe<Array<PlayerRank_Enum>>;
};

/** input type for inserting data into table "PlayerRank" */
export type PlayerRank_Insert_Input = {
  rank?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type PlayerRank_Max_Fields = {
  rank?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "PlayerRank" */
export type PlayerRank_Max_Order_By = {
  rank?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type PlayerRank_Min_Fields = {
  rank?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "PlayerRank" */
export type PlayerRank_Min_Order_By = {
  rank?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "PlayerRank" */
export type PlayerRank_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<PlayerRank>;
};

/** input type for inserting object relation for remote table "PlayerRank" */
export type PlayerRank_Obj_Rel_Insert_Input = {
  data: PlayerRank_Insert_Input;
  on_conflict?: InputMaybe<PlayerRank_On_Conflict>;
};

/** on conflict condition type for table "PlayerRank" */
export type PlayerRank_On_Conflict = {
  constraint: PlayerRank_Constraint;
  update_columns: Array<PlayerRank_Update_Column>;
  where?: InputMaybe<PlayerRank_Bool_Exp>;
};

/** ordering options when selecting data from "PlayerRank" */
export type PlayerRank_Order_By = {
  rank?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "PlayerRank" */
export type PlayerRank_Pk_Columns_Input = {
  rank: Scalars['String'];
};

/** select columns of table "PlayerRank" */
export enum PlayerRank_Select_Column {
  /** column name */
  Rank = 'rank',
}

/** input type for updating data in table "PlayerRank" */
export type PlayerRank_Set_Input = {
  rank?: InputMaybe<Scalars['String']>;
};

/** update columns of table "PlayerRank" */
export enum PlayerRank_Update_Column {
  /** column name */
  Rank = 'rank',
}

/** columns and relationships of "PlayerRole" */
export type PlayerRole = {
  basic?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  label: Scalars['String'];
  role: Scalars['String'];
};

/** aggregated selection of "PlayerRole" */
export type PlayerRole_Aggregate = {
  aggregate?: Maybe<PlayerRole_Aggregate_Fields>;
  nodes: Array<PlayerRole>;
};

/** aggregate fields of "PlayerRole" */
export type PlayerRole_Aggregate_Fields = {
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<PlayerRole_Max_Fields>;
  min?: Maybe<PlayerRole_Min_Fields>;
};

/** aggregate fields of "PlayerRole" */
export type PlayerRole_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<PlayerRole_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "PlayerRole" */
export type PlayerRole_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<PlayerRole_Max_Order_By>;
  min?: InputMaybe<PlayerRole_Min_Order_By>;
};

/** input type for inserting array relation for remote table "PlayerRole" */
export type PlayerRole_Arr_Rel_Insert_Input = {
  data: Array<PlayerRole_Insert_Input>;
  on_conflict?: InputMaybe<PlayerRole_On_Conflict>;
};

/** Boolean expression to filter rows from the table "PlayerRole". All fields are combined with a logical 'AND'. */
export type PlayerRole_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<PlayerRole_Bool_Exp>>>;
  _not?: InputMaybe<PlayerRole_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<PlayerRole_Bool_Exp>>>;
  basic?: InputMaybe<Boolean_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  label?: InputMaybe<String_Comparison_Exp>;
  role?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "PlayerRole" */
export enum PlayerRole_Constraint {
  /** unique or primary key constraint */
  PlayerRolePkey = 'PlayerRole_pkey',
}

/** input type for inserting data into table "PlayerRole" */
export type PlayerRole_Insert_Input = {
  basic?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  label?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type PlayerRole_Max_Fields = {
  description?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "PlayerRole" */
export type PlayerRole_Max_Order_By = {
  description?: InputMaybe<Order_By>;
  label?: InputMaybe<Order_By>;
  role?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type PlayerRole_Min_Fields = {
  description?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "PlayerRole" */
export type PlayerRole_Min_Order_By = {
  description?: InputMaybe<Order_By>;
  label?: InputMaybe<Order_By>;
  role?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "PlayerRole" */
export type PlayerRole_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<PlayerRole>;
};

/** input type for inserting object relation for remote table "PlayerRole" */
export type PlayerRole_Obj_Rel_Insert_Input = {
  data: PlayerRole_Insert_Input;
  on_conflict?: InputMaybe<PlayerRole_On_Conflict>;
};

/** on conflict condition type for table "PlayerRole" */
export type PlayerRole_On_Conflict = {
  constraint: PlayerRole_Constraint;
  update_columns: Array<PlayerRole_Update_Column>;
  where?: InputMaybe<PlayerRole_Bool_Exp>;
};

/** ordering options when selecting data from "PlayerRole" */
export type PlayerRole_Order_By = {
  basic?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  label?: InputMaybe<Order_By>;
  role?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "PlayerRole" */
export type PlayerRole_Pk_Columns_Input = {
  role: Scalars['String'];
};

/** select columns of table "PlayerRole" */
export enum PlayerRole_Select_Column {
  /** column name */
  Basic = 'basic',
  /** column name */
  Description = 'description',
  /** column name */
  Label = 'label',
  /** column name */
  Role = 'role',
}

/** input type for updating data in table "PlayerRole" */
export type PlayerRole_Set_Input = {
  basic?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  label?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['String']>;
};

/** update columns of table "PlayerRole" */
export enum PlayerRole_Update_Column {
  /** column name */
  Basic = 'basic',
  /** column name */
  Description = 'description',
  /** column name */
  Label = 'label',
  /** column name */
  Role = 'role',
}

export type Query = {
  getBrightIdStatus?: Maybe<BrightIdStatus>;
  getDaoHausMemberships: Array<Member>;
  getDiscordServerMemberRoles: Array<DiscordRole>;
  getGuildDiscordAnnouncements?: Maybe<Array<Scalars['String']>>;
  getGuildDiscordRoles: Array<DiscordRole>;
  getPSeedInfo?: Maybe<PSeedInfo>;
  getTokenBalances?: Maybe<TokenBalances>;
  getTopPSeedHolders?: Maybe<Array<TokenBalances>>;
};

export type QueryGetBrightIdStatusArgs = {
  contextId?: InputMaybe<Scalars['uuid']>;
};

export type QueryGetDaoHausMembershipsArgs = {
  memberAddress?: InputMaybe<Scalars['String']>;
};

export type QueryGetDiscordServerMemberRolesArgs = {
  guildId: Scalars['uuid'];
  playerId: Scalars['uuid'];
};

export type QueryGetGuildDiscordAnnouncementsArgs = {
  guildDiscordId?: InputMaybe<Scalars['String']>;
};

export type QueryGetGuildDiscordRolesArgs = {
  guildDiscordId?: InputMaybe<Scalars['String']>;
};

export type QueryGetTokenBalancesArgs = {
  address?: InputMaybe<Scalars['String']>;
};

export type QueryGetTopPSeedHoldersArgs = {
  limit?: InputMaybe<Scalars['Int']>;
};

/** columns and relationships of "QuestCompletionStatus" */
export type QuestCompletionStatus = {
  /** An array relationship */
  quest_completions: Array<Quest_Completion>;
  /** An aggregated array relationship */
  quest_completions_aggregate: Quest_Completion_Aggregate;
  status: Scalars['String'];
};

/** columns and relationships of "QuestCompletionStatus" */
export type QuestCompletionStatusQuest_CompletionsArgs = {
  distinct_on?: InputMaybe<Array<Quest_Completion_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quest_Completion_Order_By>>;
  where?: InputMaybe<Quest_Completion_Bool_Exp>;
};

/** columns and relationships of "QuestCompletionStatus" */
export type QuestCompletionStatusQuest_Completions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Quest_Completion_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quest_Completion_Order_By>>;
  where?: InputMaybe<Quest_Completion_Bool_Exp>;
};

export enum QuestCompletionStatus_ActionEnum {
  Accepted = 'ACCEPTED',
  Rejected = 'REJECTED',
}

/** aggregated selection of "QuestCompletionStatus" */
export type QuestCompletionStatus_Aggregate = {
  aggregate?: Maybe<QuestCompletionStatus_Aggregate_Fields>;
  nodes: Array<QuestCompletionStatus>;
};

/** aggregate fields of "QuestCompletionStatus" */
export type QuestCompletionStatus_Aggregate_Fields = {
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<QuestCompletionStatus_Max_Fields>;
  min?: Maybe<QuestCompletionStatus_Min_Fields>;
};

/** aggregate fields of "QuestCompletionStatus" */
export type QuestCompletionStatus_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<QuestCompletionStatus_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "QuestCompletionStatus" */
export type QuestCompletionStatus_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<QuestCompletionStatus_Max_Order_By>;
  min?: InputMaybe<QuestCompletionStatus_Min_Order_By>;
};

/** input type for inserting array relation for remote table "QuestCompletionStatus" */
export type QuestCompletionStatus_Arr_Rel_Insert_Input = {
  data: Array<QuestCompletionStatus_Insert_Input>;
  on_conflict?: InputMaybe<QuestCompletionStatus_On_Conflict>;
};

/** Boolean expression to filter rows from the table "QuestCompletionStatus". All fields are combined with a logical 'AND'. */
export type QuestCompletionStatus_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<QuestCompletionStatus_Bool_Exp>>>;
  _not?: InputMaybe<QuestCompletionStatus_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<QuestCompletionStatus_Bool_Exp>>>;
  quest_completions?: InputMaybe<Quest_Completion_Bool_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "QuestCompletionStatus" */
export enum QuestCompletionStatus_Constraint {
  /** unique or primary key constraint */
  QuestCompletionStatusPkey = 'QuestCompletionStatus_pkey',
}

export enum QuestCompletionStatus_Enum {
  Accepted = 'ACCEPTED',
  Pending = 'PENDING',
  Rejected = 'REJECTED',
}

/** expression to compare columns of type QuestCompletionStatus_enum. All fields are combined with logical 'AND'. */
export type QuestCompletionStatus_Enum_Comparison_Exp = {
  _eq?: InputMaybe<QuestCompletionStatus_Enum>;
  _in?: InputMaybe<Array<QuestCompletionStatus_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<QuestCompletionStatus_Enum>;
  _nin?: InputMaybe<Array<QuestCompletionStatus_Enum>>;
};

/** input type for inserting data into table "QuestCompletionStatus" */
export type QuestCompletionStatus_Insert_Input = {
  quest_completions?: InputMaybe<Quest_Completion_Arr_Rel_Insert_Input>;
  status?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type QuestCompletionStatus_Max_Fields = {
  status?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "QuestCompletionStatus" */
export type QuestCompletionStatus_Max_Order_By = {
  status?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type QuestCompletionStatus_Min_Fields = {
  status?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "QuestCompletionStatus" */
export type QuestCompletionStatus_Min_Order_By = {
  status?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "QuestCompletionStatus" */
export type QuestCompletionStatus_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<QuestCompletionStatus>;
};

/** input type for inserting object relation for remote table "QuestCompletionStatus" */
export type QuestCompletionStatus_Obj_Rel_Insert_Input = {
  data: QuestCompletionStatus_Insert_Input;
  on_conflict?: InputMaybe<QuestCompletionStatus_On_Conflict>;
};

/** on conflict condition type for table "QuestCompletionStatus" */
export type QuestCompletionStatus_On_Conflict = {
  constraint: QuestCompletionStatus_Constraint;
  update_columns: Array<QuestCompletionStatus_Update_Column>;
  where?: InputMaybe<QuestCompletionStatus_Bool_Exp>;
};

/** ordering options when selecting data from "QuestCompletionStatus" */
export type QuestCompletionStatus_Order_By = {
  quest_completions_aggregate?: InputMaybe<Quest_Completion_Aggregate_Order_By>;
  status?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "QuestCompletionStatus" */
export type QuestCompletionStatus_Pk_Columns_Input = {
  status: Scalars['String'];
};

/** select columns of table "QuestCompletionStatus" */
export enum QuestCompletionStatus_Select_Column {
  /** column name */
  Status = 'status',
}

/** input type for updating data in table "QuestCompletionStatus" */
export type QuestCompletionStatus_Set_Input = {
  status?: InputMaybe<Scalars['String']>;
};

/** update columns of table "QuestCompletionStatus" */
export enum QuestCompletionStatus_Update_Column {
  /** column name */
  Status = 'status',
}

/** columns and relationships of "QuestRepetition" */
export type QuestRepetition = {
  /** An array relationship */
  quests: Array<Quest>;
  /** An aggregated array relationship */
  quests_aggregate: Quest_Aggregate;
  repetition: Scalars['String'];
};

/** columns and relationships of "QuestRepetition" */
export type QuestRepetitionQuestsArgs = {
  distinct_on?: InputMaybe<Array<Quest_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quest_Order_By>>;
  where?: InputMaybe<Quest_Bool_Exp>;
};

/** columns and relationships of "QuestRepetition" */
export type QuestRepetitionQuests_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Quest_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quest_Order_By>>;
  where?: InputMaybe<Quest_Bool_Exp>;
};

export enum QuestRepetition_ActionEnum {
  Personal = 'PERSONAL',
  Recurring = 'RECURRING',
  Unique = 'UNIQUE',
}

/** aggregated selection of "QuestRepetition" */
export type QuestRepetition_Aggregate = {
  aggregate?: Maybe<QuestRepetition_Aggregate_Fields>;
  nodes: Array<QuestRepetition>;
};

/** aggregate fields of "QuestRepetition" */
export type QuestRepetition_Aggregate_Fields = {
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<QuestRepetition_Max_Fields>;
  min?: Maybe<QuestRepetition_Min_Fields>;
};

/** aggregate fields of "QuestRepetition" */
export type QuestRepetition_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<QuestRepetition_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "QuestRepetition" */
export type QuestRepetition_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<QuestRepetition_Max_Order_By>;
  min?: InputMaybe<QuestRepetition_Min_Order_By>;
};

/** input type for inserting array relation for remote table "QuestRepetition" */
export type QuestRepetition_Arr_Rel_Insert_Input = {
  data: Array<QuestRepetition_Insert_Input>;
  on_conflict?: InputMaybe<QuestRepetition_On_Conflict>;
};

/** Boolean expression to filter rows from the table "QuestRepetition". All fields are combined with a logical 'AND'. */
export type QuestRepetition_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<QuestRepetition_Bool_Exp>>>;
  _not?: InputMaybe<QuestRepetition_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<QuestRepetition_Bool_Exp>>>;
  quests?: InputMaybe<Quest_Bool_Exp>;
  repetition?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "QuestRepetition" */
export enum QuestRepetition_Constraint {
  /** unique or primary key constraint */
  QuestRepetitionPkey = 'QuestRepetition_pkey',
}

export enum QuestRepetition_Enum {
  Personal = 'PERSONAL',
  Recurring = 'RECURRING',
  Unique = 'UNIQUE',
}

/** expression to compare columns of type QuestRepetition_enum. All fields are combined with logical 'AND'. */
export type QuestRepetition_Enum_Comparison_Exp = {
  _eq?: InputMaybe<QuestRepetition_Enum>;
  _in?: InputMaybe<Array<QuestRepetition_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<QuestRepetition_Enum>;
  _nin?: InputMaybe<Array<QuestRepetition_Enum>>;
};

/** input type for inserting data into table "QuestRepetition" */
export type QuestRepetition_Insert_Input = {
  quests?: InputMaybe<Quest_Arr_Rel_Insert_Input>;
  repetition?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type QuestRepetition_Max_Fields = {
  repetition?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "QuestRepetition" */
export type QuestRepetition_Max_Order_By = {
  repetition?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type QuestRepetition_Min_Fields = {
  repetition?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "QuestRepetition" */
export type QuestRepetition_Min_Order_By = {
  repetition?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "QuestRepetition" */
export type QuestRepetition_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<QuestRepetition>;
};

/** input type for inserting object relation for remote table "QuestRepetition" */
export type QuestRepetition_Obj_Rel_Insert_Input = {
  data: QuestRepetition_Insert_Input;
  on_conflict?: InputMaybe<QuestRepetition_On_Conflict>;
};

/** on conflict condition type for table "QuestRepetition" */
export type QuestRepetition_On_Conflict = {
  constraint: QuestRepetition_Constraint;
  update_columns: Array<QuestRepetition_Update_Column>;
  where?: InputMaybe<QuestRepetition_Bool_Exp>;
};

/** ordering options when selecting data from "QuestRepetition" */
export type QuestRepetition_Order_By = {
  quests_aggregate?: InputMaybe<Quest_Aggregate_Order_By>;
  repetition?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "QuestRepetition" */
export type QuestRepetition_Pk_Columns_Input = {
  repetition: Scalars['String'];
};

/** select columns of table "QuestRepetition" */
export enum QuestRepetition_Select_Column {
  /** column name */
  Repetition = 'repetition',
}

/** input type for updating data in table "QuestRepetition" */
export type QuestRepetition_Set_Input = {
  repetition?: InputMaybe<Scalars['String']>;
};

/** update columns of table "QuestRepetition" */
export enum QuestRepetition_Update_Column {
  /** column name */
  Repetition = 'repetition',
}

/** columns and relationships of "QuestStatus" */
export type QuestStatus = {
  /** An array relationship */
  quests: Array<Quest>;
  /** An aggregated array relationship */
  quests_aggregate: Quest_Aggregate;
  status: Scalars['String'];
};

/** columns and relationships of "QuestStatus" */
export type QuestStatusQuestsArgs = {
  distinct_on?: InputMaybe<Array<Quest_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quest_Order_By>>;
  where?: InputMaybe<Quest_Bool_Exp>;
};

/** columns and relationships of "QuestStatus" */
export type QuestStatusQuests_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Quest_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quest_Order_By>>;
  where?: InputMaybe<Quest_Bool_Exp>;
};

/** aggregated selection of "QuestStatus" */
export type QuestStatus_Aggregate = {
  aggregate?: Maybe<QuestStatus_Aggregate_Fields>;
  nodes: Array<QuestStatus>;
};

/** aggregate fields of "QuestStatus" */
export type QuestStatus_Aggregate_Fields = {
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<QuestStatus_Max_Fields>;
  min?: Maybe<QuestStatus_Min_Fields>;
};

/** aggregate fields of "QuestStatus" */
export type QuestStatus_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<QuestStatus_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "QuestStatus" */
export type QuestStatus_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<QuestStatus_Max_Order_By>;
  min?: InputMaybe<QuestStatus_Min_Order_By>;
};

/** input type for inserting array relation for remote table "QuestStatus" */
export type QuestStatus_Arr_Rel_Insert_Input = {
  data: Array<QuestStatus_Insert_Input>;
  on_conflict?: InputMaybe<QuestStatus_On_Conflict>;
};

/** Boolean expression to filter rows from the table "QuestStatus". All fields are combined with a logical 'AND'. */
export type QuestStatus_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<QuestStatus_Bool_Exp>>>;
  _not?: InputMaybe<QuestStatus_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<QuestStatus_Bool_Exp>>>;
  quests?: InputMaybe<Quest_Bool_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "QuestStatus" */
export enum QuestStatus_Constraint {
  /** unique or primary key constraint */
  QuestStatusPkey = 'QuestStatus_pkey',
}

export enum QuestStatus_Enum {
  Closed = 'CLOSED',
  Open = 'OPEN',
}

/** expression to compare columns of type QuestStatus_enum. All fields are combined with logical 'AND'. */
export type QuestStatus_Enum_Comparison_Exp = {
  _eq?: InputMaybe<QuestStatus_Enum>;
  _in?: InputMaybe<Array<QuestStatus_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<QuestStatus_Enum>;
  _nin?: InputMaybe<Array<QuestStatus_Enum>>;
};

/** input type for inserting data into table "QuestStatus" */
export type QuestStatus_Insert_Input = {
  quests?: InputMaybe<Quest_Arr_Rel_Insert_Input>;
  status?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type QuestStatus_Max_Fields = {
  status?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "QuestStatus" */
export type QuestStatus_Max_Order_By = {
  status?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type QuestStatus_Min_Fields = {
  status?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "QuestStatus" */
export type QuestStatus_Min_Order_By = {
  status?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "QuestStatus" */
export type QuestStatus_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<QuestStatus>;
};

/** input type for inserting object relation for remote table "QuestStatus" */
export type QuestStatus_Obj_Rel_Insert_Input = {
  data: QuestStatus_Insert_Input;
  on_conflict?: InputMaybe<QuestStatus_On_Conflict>;
};

/** on conflict condition type for table "QuestStatus" */
export type QuestStatus_On_Conflict = {
  constraint: QuestStatus_Constraint;
  update_columns: Array<QuestStatus_Update_Column>;
  where?: InputMaybe<QuestStatus_Bool_Exp>;
};

/** ordering options when selecting data from "QuestStatus" */
export type QuestStatus_Order_By = {
  quests_aggregate?: InputMaybe<Quest_Aggregate_Order_By>;
  status?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "QuestStatus" */
export type QuestStatus_Pk_Columns_Input = {
  status: Scalars['String'];
};

/** select columns of table "QuestStatus" */
export enum QuestStatus_Select_Column {
  /** column name */
  Status = 'status',
}

/** input type for updating data in table "QuestStatus" */
export type QuestStatus_Set_Input = {
  status?: InputMaybe<Scalars['String']>;
};

/** update columns of table "QuestStatus" */
export enum QuestStatus_Update_Column {
  /** column name */
  Status = 'status',
}

export type SaveGuildLayoutResponse = {
  error?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type SaveGuildResponse = {
  error?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};

/** columns and relationships of "SkillCategory" */
export type SkillCategory = {
  name: Scalars['String'];
};

/** aggregated selection of "SkillCategory" */
export type SkillCategory_Aggregate = {
  aggregate?: Maybe<SkillCategory_Aggregate_Fields>;
  nodes: Array<SkillCategory>;
};

/** aggregate fields of "SkillCategory" */
export type SkillCategory_Aggregate_Fields = {
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<SkillCategory_Max_Fields>;
  min?: Maybe<SkillCategory_Min_Fields>;
};

/** aggregate fields of "SkillCategory" */
export type SkillCategory_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<SkillCategory_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "SkillCategory" */
export type SkillCategory_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<SkillCategory_Max_Order_By>;
  min?: InputMaybe<SkillCategory_Min_Order_By>;
};

/** input type for inserting array relation for remote table "SkillCategory" */
export type SkillCategory_Arr_Rel_Insert_Input = {
  data: Array<SkillCategory_Insert_Input>;
  on_conflict?: InputMaybe<SkillCategory_On_Conflict>;
};

/** Boolean expression to filter rows from the table "SkillCategory". All fields are combined with a logical 'AND'. */
export type SkillCategory_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<SkillCategory_Bool_Exp>>>;
  _not?: InputMaybe<SkillCategory_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<SkillCategory_Bool_Exp>>>;
  name?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "SkillCategory" */
export enum SkillCategory_Constraint {
  /** unique or primary key constraint */
  SkillCategoryPkey = 'SkillCategory_pkey',
}

export enum SkillCategory_Enum {
  Community = 'COMMUNITY',
  Design = 'DESIGN',
  Dev = 'DEV',
  Engineering = 'ENGINEERING',
  Strategy = 'STRATEGY',
  Technologies = 'TECHNOLOGIES',
}

/** expression to compare columns of type SkillCategory_enum. All fields are combined with logical 'AND'. */
export type SkillCategory_Enum_Comparison_Exp = {
  _eq?: InputMaybe<SkillCategory_Enum>;
  _in?: InputMaybe<Array<SkillCategory_Enum>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<SkillCategory_Enum>;
  _nin?: InputMaybe<Array<SkillCategory_Enum>>;
};

/** input type for inserting data into table "SkillCategory" */
export type SkillCategory_Insert_Input = {
  name?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type SkillCategory_Max_Fields = {
  name?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "SkillCategory" */
export type SkillCategory_Max_Order_By = {
  name?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type SkillCategory_Min_Fields = {
  name?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "SkillCategory" */
export type SkillCategory_Min_Order_By = {
  name?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "SkillCategory" */
export type SkillCategory_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<SkillCategory>;
};

/** input type for inserting object relation for remote table "SkillCategory" */
export type SkillCategory_Obj_Rel_Insert_Input = {
  data: SkillCategory_Insert_Input;
  on_conflict?: InputMaybe<SkillCategory_On_Conflict>;
};

/** on conflict condition type for table "SkillCategory" */
export type SkillCategory_On_Conflict = {
  constraint: SkillCategory_Constraint;
  update_columns: Array<SkillCategory_Update_Column>;
  where?: InputMaybe<SkillCategory_Bool_Exp>;
};

/** ordering options when selecting data from "SkillCategory" */
export type SkillCategory_Order_By = {
  name?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "SkillCategory" */
export type SkillCategory_Pk_Columns_Input = {
  name: Scalars['String'];
};

/** select columns of table "SkillCategory" */
export enum SkillCategory_Select_Column {
  /** column name */
  Name = 'name',
}

/** input type for updating data in table "SkillCategory" */
export type SkillCategory_Set_Input = {
  name?: InputMaybe<Scalars['String']>;
};

/** update columns of table "SkillCategory" */
export enum SkillCategory_Update_Column {
  /** column name */
  Name = 'name',
}

export type SourceCredSyncOutput = {
  numInserted: Scalars['Int'];
  numSkipped: Scalars['Int'];
  numUnclaimed: Scalars['Int'];
  numUpdated: Scalars['Int'];
};

/** expression to compare columns of type String. All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  _ilike?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _like?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  _nilike?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
  _nlike?: InputMaybe<Scalars['String']>;
  _nsimilar?: InputMaybe<Scalars['String']>;
  _similar?: InputMaybe<Scalars['String']>;
};

export type TokenBalances = {
  id: Scalars['ID'];
  pSeedBalance: Scalars['String'];
  seedBalance: Scalars['String'];
};

export type UpdateIdxProfileResponse = {
  accountLinks?: Maybe<Array<Maybe<Scalars['String']>>>;
  ceramic: Scalars['String'];
  did?: Maybe<Scalars['String']>;
  ethereumAddress?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<Maybe<Scalars['String']>>>;
  success: Scalars['Boolean'];
};

export type UpdateQuestCompletionInput = {
  questCompletionId: Scalars['String'];
  status: QuestCompletionStatus_ActionEnum;
};

export type UpdateQuestCompletionOutput = {
  error?: Maybe<Scalars['String']>;
  quest_completion?: Maybe<Quest_Completion>;
  quest_completion_id?: Maybe<Scalars['uuid']>;
  success: Scalars['Boolean'];
};

/** columns and relationships of "balance" */
export type Balance = {
  amount: Scalars['float8'];
  blockHeight: Scalars['Int'];
  id: Scalars['uuid'];
  playerAddress: Scalars['String'];
  /** An object relationship */
  token: Token;
  tokenAddress: Scalars['String'];
};

/** aggregated selection of "balance" */
export type Balance_Aggregate = {
  aggregate?: Maybe<Balance_Aggregate_Fields>;
  nodes: Array<Balance>;
};

/** aggregate fields of "balance" */
export type Balance_Aggregate_Fields = {
  avg?: Maybe<Balance_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Balance_Max_Fields>;
  min?: Maybe<Balance_Min_Fields>;
  stddev?: Maybe<Balance_Stddev_Fields>;
  stddev_pop?: Maybe<Balance_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Balance_Stddev_Samp_Fields>;
  sum?: Maybe<Balance_Sum_Fields>;
  var_pop?: Maybe<Balance_Var_Pop_Fields>;
  var_samp?: Maybe<Balance_Var_Samp_Fields>;
  variance?: Maybe<Balance_Variance_Fields>;
};

/** aggregate fields of "balance" */
export type Balance_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Balance_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "balance" */
export type Balance_Aggregate_Order_By = {
  avg?: InputMaybe<Balance_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Balance_Max_Order_By>;
  min?: InputMaybe<Balance_Min_Order_By>;
  stddev?: InputMaybe<Balance_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Balance_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Balance_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Balance_Sum_Order_By>;
  var_pop?: InputMaybe<Balance_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Balance_Var_Samp_Order_By>;
  variance?: InputMaybe<Balance_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "balance" */
export type Balance_Arr_Rel_Insert_Input = {
  data: Array<Balance_Insert_Input>;
  on_conflict?: InputMaybe<Balance_On_Conflict>;
};

/** aggregate avg on columns */
export type Balance_Avg_Fields = {
  amount?: Maybe<Scalars['Float']>;
  blockHeight?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "balance" */
export type Balance_Avg_Order_By = {
  amount?: InputMaybe<Order_By>;
  blockHeight?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "balance". All fields are combined with a logical 'AND'. */
export type Balance_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Balance_Bool_Exp>>>;
  _not?: InputMaybe<Balance_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Balance_Bool_Exp>>>;
  amount?: InputMaybe<Float8_Comparison_Exp>;
  blockHeight?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  playerAddress?: InputMaybe<String_Comparison_Exp>;
  token?: InputMaybe<Token_Bool_Exp>;
  tokenAddress?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "balance" */
export enum Balance_Constraint {
  /** unique or primary key constraint */
  BalancePkey = 'balance_pkey',
  /** unique or primary key constraint */
  BalanceTokenAddressPlayerAddressBlockHeightKey = 'balance_token_address_player_address_block_height_key',
}

/** input type for incrementing integer column in table "balance" */
export type Balance_Inc_Input = {
  amount?: InputMaybe<Scalars['float8']>;
  blockHeight?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "balance" */
export type Balance_Insert_Input = {
  amount?: InputMaybe<Scalars['float8']>;
  blockHeight?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['uuid']>;
  playerAddress?: InputMaybe<Scalars['String']>;
  token?: InputMaybe<Token_Obj_Rel_Insert_Input>;
  tokenAddress?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Balance_Max_Fields = {
  amount?: Maybe<Scalars['float8']>;
  blockHeight?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['uuid']>;
  playerAddress?: Maybe<Scalars['String']>;
  tokenAddress?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "balance" */
export type Balance_Max_Order_By = {
  amount?: InputMaybe<Order_By>;
  blockHeight?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  playerAddress?: InputMaybe<Order_By>;
  tokenAddress?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Balance_Min_Fields = {
  amount?: Maybe<Scalars['float8']>;
  blockHeight?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['uuid']>;
  playerAddress?: Maybe<Scalars['String']>;
  tokenAddress?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "balance" */
export type Balance_Min_Order_By = {
  amount?: InputMaybe<Order_By>;
  blockHeight?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  playerAddress?: InputMaybe<Order_By>;
  tokenAddress?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "balance" */
export type Balance_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Balance>;
};

/** input type for inserting object relation for remote table "balance" */
export type Balance_Obj_Rel_Insert_Input = {
  data: Balance_Insert_Input;
  on_conflict?: InputMaybe<Balance_On_Conflict>;
};

/** on conflict condition type for table "balance" */
export type Balance_On_Conflict = {
  constraint: Balance_Constraint;
  update_columns: Array<Balance_Update_Column>;
  where?: InputMaybe<Balance_Bool_Exp>;
};

/** ordering options when selecting data from "balance" */
export type Balance_Order_By = {
  amount?: InputMaybe<Order_By>;
  blockHeight?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  playerAddress?: InputMaybe<Order_By>;
  token?: InputMaybe<Token_Order_By>;
  tokenAddress?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "balance" */
export type Balance_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "balance" */
export enum Balance_Select_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  BlockHeight = 'blockHeight',
  /** column name */
  Id = 'id',
  /** column name */
  PlayerAddress = 'playerAddress',
  /** column name */
  TokenAddress = 'tokenAddress',
}

/** input type for updating data in table "balance" */
export type Balance_Set_Input = {
  amount?: InputMaybe<Scalars['float8']>;
  blockHeight?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['uuid']>;
  playerAddress?: InputMaybe<Scalars['String']>;
  tokenAddress?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Balance_Stddev_Fields = {
  amount?: Maybe<Scalars['Float']>;
  blockHeight?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "balance" */
export type Balance_Stddev_Order_By = {
  amount?: InputMaybe<Order_By>;
  blockHeight?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Balance_Stddev_Pop_Fields = {
  amount?: Maybe<Scalars['Float']>;
  blockHeight?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "balance" */
export type Balance_Stddev_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  blockHeight?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Balance_Stddev_Samp_Fields = {
  amount?: Maybe<Scalars['Float']>;
  blockHeight?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "balance" */
export type Balance_Stddev_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  blockHeight?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Balance_Sum_Fields = {
  amount?: Maybe<Scalars['float8']>;
  blockHeight?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "balance" */
export type Balance_Sum_Order_By = {
  amount?: InputMaybe<Order_By>;
  blockHeight?: InputMaybe<Order_By>;
};

/** update columns of table "balance" */
export enum Balance_Update_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  BlockHeight = 'blockHeight',
  /** column name */
  Id = 'id',
  /** column name */
  PlayerAddress = 'playerAddress',
  /** column name */
  TokenAddress = 'tokenAddress',
}

/** aggregate var_pop on columns */
export type Balance_Var_Pop_Fields = {
  amount?: Maybe<Scalars['Float']>;
  blockHeight?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "balance" */
export type Balance_Var_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  blockHeight?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Balance_Var_Samp_Fields = {
  amount?: Maybe<Scalars['Float']>;
  blockHeight?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "balance" */
export type Balance_Var_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  blockHeight?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Balance_Variance_Fields = {
  amount?: Maybe<Scalars['Float']>;
  blockHeight?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "balance" */
export type Balance_Variance_Order_By = {
  amount?: InputMaybe<Order_By>;
  blockHeight?: InputMaybe<Order_By>;
};

/** columns and relationships of "dao" */
export type Dao = {
  contractAddress: Scalars['String'];
  /** An object relationship */
  guild?: Maybe<Guild>;
  guildId?: Maybe<Scalars['uuid']>;
  id: Scalars['uuid'];
  label?: Maybe<Scalars['String']>;
  network: Scalars['String'];
  /** An array relationship */
  players: Array<Dao_Player>;
  /** An aggregated array relationship */
  players_aggregate: Dao_Player_Aggregate;
  url?: Maybe<Scalars['String']>;
};

/** columns and relationships of "dao" */
export type DaoPlayersArgs = {
  distinct_on?: InputMaybe<Array<Dao_Player_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Dao_Player_Order_By>>;
  where?: InputMaybe<Dao_Player_Bool_Exp>;
};

/** columns and relationships of "dao" */
export type DaoPlayers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Dao_Player_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Dao_Player_Order_By>>;
  where?: InputMaybe<Dao_Player_Bool_Exp>;
};

/** aggregated selection of "dao" */
export type Dao_Aggregate = {
  aggregate?: Maybe<Dao_Aggregate_Fields>;
  nodes: Array<Dao>;
};

/** aggregate fields of "dao" */
export type Dao_Aggregate_Fields = {
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Dao_Max_Fields>;
  min?: Maybe<Dao_Min_Fields>;
};

/** aggregate fields of "dao" */
export type Dao_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Dao_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "dao" */
export type Dao_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Dao_Max_Order_By>;
  min?: InputMaybe<Dao_Min_Order_By>;
};

/** input type for inserting array relation for remote table "dao" */
export type Dao_Arr_Rel_Insert_Input = {
  data: Array<Dao_Insert_Input>;
  on_conflict?: InputMaybe<Dao_On_Conflict>;
};

/** Boolean expression to filter rows from the table "dao". All fields are combined with a logical 'AND'. */
export type Dao_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Dao_Bool_Exp>>>;
  _not?: InputMaybe<Dao_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Dao_Bool_Exp>>>;
  contractAddress?: InputMaybe<String_Comparison_Exp>;
  guild?: InputMaybe<Guild_Bool_Exp>;
  guildId?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  label?: InputMaybe<String_Comparison_Exp>;
  network?: InputMaybe<String_Comparison_Exp>;
  players?: InputMaybe<Dao_Player_Bool_Exp>;
  url?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "dao" */
export enum Dao_Constraint {
  /** unique or primary key constraint */
  DaoContractAddressNetworkKey = 'dao_contract_address_network_key',
  /** unique or primary key constraint */
  DaoPkey = 'dao_pkey',
}

/** input type for inserting data into table "dao" */
export type Dao_Insert_Input = {
  contractAddress?: InputMaybe<Scalars['String']>;
  guild?: InputMaybe<Guild_Obj_Rel_Insert_Input>;
  guildId?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  label?: InputMaybe<Scalars['String']>;
  network?: InputMaybe<Scalars['String']>;
  players?: InputMaybe<Dao_Player_Arr_Rel_Insert_Input>;
  url?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Dao_Max_Fields = {
  contractAddress?: Maybe<Scalars['String']>;
  guildId?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  label?: Maybe<Scalars['String']>;
  network?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "dao" */
export type Dao_Max_Order_By = {
  contractAddress?: InputMaybe<Order_By>;
  guildId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  label?: InputMaybe<Order_By>;
  network?: InputMaybe<Order_By>;
  url?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Dao_Min_Fields = {
  contractAddress?: Maybe<Scalars['String']>;
  guildId?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  label?: Maybe<Scalars['String']>;
  network?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "dao" */
export type Dao_Min_Order_By = {
  contractAddress?: InputMaybe<Order_By>;
  guildId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  label?: InputMaybe<Order_By>;
  network?: InputMaybe<Order_By>;
  url?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "dao" */
export type Dao_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Dao>;
};

/** input type for inserting object relation for remote table "dao" */
export type Dao_Obj_Rel_Insert_Input = {
  data: Dao_Insert_Input;
  on_conflict?: InputMaybe<Dao_On_Conflict>;
};

/** on conflict condition type for table "dao" */
export type Dao_On_Conflict = {
  constraint: Dao_Constraint;
  update_columns: Array<Dao_Update_Column>;
  where?: InputMaybe<Dao_Bool_Exp>;
};

/** ordering options when selecting data from "dao" */
export type Dao_Order_By = {
  contractAddress?: InputMaybe<Order_By>;
  guild?: InputMaybe<Guild_Order_By>;
  guildId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  label?: InputMaybe<Order_By>;
  network?: InputMaybe<Order_By>;
  players_aggregate?: InputMaybe<Dao_Player_Aggregate_Order_By>;
  url?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "dao" */
export type Dao_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** columns and relationships of "dao_player" */
export type Dao_Player = {
  /** An object relationship */
  Dao: Dao;
  /** An object relationship */
  Player: Player;
  daoId: Scalars['uuid'];
  playerId: Scalars['uuid'];
  visible?: Maybe<Scalars['Boolean']>;
};

/** aggregated selection of "dao_player" */
export type Dao_Player_Aggregate = {
  aggregate?: Maybe<Dao_Player_Aggregate_Fields>;
  nodes: Array<Dao_Player>;
};

/** aggregate fields of "dao_player" */
export type Dao_Player_Aggregate_Fields = {
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Dao_Player_Max_Fields>;
  min?: Maybe<Dao_Player_Min_Fields>;
};

/** aggregate fields of "dao_player" */
export type Dao_Player_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Dao_Player_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "dao_player" */
export type Dao_Player_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Dao_Player_Max_Order_By>;
  min?: InputMaybe<Dao_Player_Min_Order_By>;
};

/** input type for inserting array relation for remote table "dao_player" */
export type Dao_Player_Arr_Rel_Insert_Input = {
  data: Array<Dao_Player_Insert_Input>;
  on_conflict?: InputMaybe<Dao_Player_On_Conflict>;
};

/** Boolean expression to filter rows from the table "dao_player". All fields are combined with a logical 'AND'. */
export type Dao_Player_Bool_Exp = {
  Dao?: InputMaybe<Dao_Bool_Exp>;
  Player?: InputMaybe<Player_Bool_Exp>;
  _and?: InputMaybe<Array<InputMaybe<Dao_Player_Bool_Exp>>>;
  _not?: InputMaybe<Dao_Player_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Dao_Player_Bool_Exp>>>;
  daoId?: InputMaybe<Uuid_Comparison_Exp>;
  playerId?: InputMaybe<Uuid_Comparison_Exp>;
  visible?: InputMaybe<Boolean_Comparison_Exp>;
};

/** unique or primary key constraints on table "dao_player" */
export enum Dao_Player_Constraint {
  /** unique or primary key constraint */
  DaoPlayerPkey = 'dao_player_pkey',
}

/** input type for inserting data into table "dao_player" */
export type Dao_Player_Insert_Input = {
  Dao?: InputMaybe<Dao_Obj_Rel_Insert_Input>;
  Player?: InputMaybe<Player_Obj_Rel_Insert_Input>;
  daoId?: InputMaybe<Scalars['uuid']>;
  playerId?: InputMaybe<Scalars['uuid']>;
  visible?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate max on columns */
export type Dao_Player_Max_Fields = {
  daoId?: Maybe<Scalars['uuid']>;
  playerId?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "dao_player" */
export type Dao_Player_Max_Order_By = {
  daoId?: InputMaybe<Order_By>;
  playerId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Dao_Player_Min_Fields = {
  daoId?: Maybe<Scalars['uuid']>;
  playerId?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "dao_player" */
export type Dao_Player_Min_Order_By = {
  daoId?: InputMaybe<Order_By>;
  playerId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "dao_player" */
export type Dao_Player_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Dao_Player>;
};

/** input type for inserting object relation for remote table "dao_player" */
export type Dao_Player_Obj_Rel_Insert_Input = {
  data: Dao_Player_Insert_Input;
  on_conflict?: InputMaybe<Dao_Player_On_Conflict>;
};

/** on conflict condition type for table "dao_player" */
export type Dao_Player_On_Conflict = {
  constraint: Dao_Player_Constraint;
  update_columns: Array<Dao_Player_Update_Column>;
  where?: InputMaybe<Dao_Player_Bool_Exp>;
};

/** ordering options when selecting data from "dao_player" */
export type Dao_Player_Order_By = {
  Dao?: InputMaybe<Dao_Order_By>;
  Player?: InputMaybe<Player_Order_By>;
  daoId?: InputMaybe<Order_By>;
  playerId?: InputMaybe<Order_By>;
  visible?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "dao_player" */
export type Dao_Player_Pk_Columns_Input = {
  daoId: Scalars['uuid'];
  playerId: Scalars['uuid'];
};

/** select columns of table "dao_player" */
export enum Dao_Player_Select_Column {
  /** column name */
  DaoId = 'daoId',
  /** column name */
  PlayerId = 'playerId',
  /** column name */
  Visible = 'visible',
}

/** input type for updating data in table "dao_player" */
export type Dao_Player_Set_Input = {
  daoId?: InputMaybe<Scalars['uuid']>;
  playerId?: InputMaybe<Scalars['uuid']>;
  visible?: InputMaybe<Scalars['Boolean']>;
};

/** update columns of table "dao_player" */
export enum Dao_Player_Update_Column {
  /** column name */
  DaoId = 'daoId',
  /** column name */
  PlayerId = 'playerId',
  /** column name */
  Visible = 'visible',
}

/** select columns of table "dao" */
export enum Dao_Select_Column {
  /** column name */
  ContractAddress = 'contractAddress',
  /** column name */
  GuildId = 'guildId',
  /** column name */
  Id = 'id',
  /** column name */
  Label = 'label',
  /** column name */
  Network = 'network',
  /** column name */
  Url = 'url',
}

/** input type for updating data in table "dao" */
export type Dao_Set_Input = {
  contractAddress?: InputMaybe<Scalars['String']>;
  guildId?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  label?: InputMaybe<Scalars['String']>;
  network?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
};

/** update columns of table "dao" */
export enum Dao_Update_Column {
  /** column name */
  ContractAddress = 'contractAddress',
  /** column name */
  GuildId = 'guildId',
  /** column name */
  Id = 'id',
  /** column name */
  Label = 'label',
  /** column name */
  Network = 'network',
  /** column name */
  Url = 'url',
}

/** expression to compare columns of type float8. All fields are combined with logical 'AND'. */
export type Float8_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['float8']>;
  _gt?: InputMaybe<Scalars['float8']>;
  _gte?: InputMaybe<Scalars['float8']>;
  _in?: InputMaybe<Array<Scalars['float8']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['float8']>;
  _lte?: InputMaybe<Scalars['float8']>;
  _neq?: InputMaybe<Scalars['float8']>;
  _nin?: InputMaybe<Array<Scalars['float8']>>;
};

/** columns and relationships of "guild" */
export type Guild = {
  /** An object relationship */
  GuildType: GuildType;
  /** An array relationship */
  daos: Array<Dao>;
  /** An aggregated array relationship */
  daos_aggregate: Dao_Aggregate;
  description?: Maybe<Scalars['String']>;
  /** Remote relationship field */
  discordAnnouncements?: Maybe<Array<Scalars['String']>>;
  discordId?: Maybe<Scalars['String']>;
  discordInviteUrl?: Maybe<Scalars['String']>;
  githubUrl?: Maybe<Scalars['String']>;
  /** An array relationship */
  guild_players: Array<Guild_Player>;
  /** An aggregated array relationship */
  guild_players_aggregate: Guild_Player_Aggregate;
  /** Unique friendly identifier for the Guild (used in URL) */
  guildname: Scalars['String'];
  id: Scalars['uuid'];
  joinButtonUrl?: Maybe<Scalars['String']>;
  logo?: Maybe<Scalars['String']>;
  membershipThroughDiscord: Scalars['Boolean'];
  /** An object relationship */
  metadata?: Maybe<Guild_Metadata>;
  name: Scalars['String'];
  profileLayout?: Maybe<Scalars['String']>;
  /** An array relationship */
  quests: Array<Quest>;
  /** An aggregated array relationship */
  quests_aggregate: Quest_Aggregate;
  showDiscordAnnouncements: Scalars['Boolean'];
  sortPosition?: Maybe<Scalars['Int']>;
  status: GuildStatus_Enum;
  twitterUrl?: Maybe<Scalars['String']>;
  /** The area of focus for the guild (e.g. funding, project, etc) */
  type: GuildType_Enum;
  websiteUrl?: Maybe<Scalars['String']>;
};

/** columns and relationships of "guild" */
export type GuildDaosArgs = {
  distinct_on?: InputMaybe<Array<Dao_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Dao_Order_By>>;
  where?: InputMaybe<Dao_Bool_Exp>;
};

/** columns and relationships of "guild" */
export type GuildDaos_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Dao_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Dao_Order_By>>;
  where?: InputMaybe<Dao_Bool_Exp>;
};

/** columns and relationships of "guild" */
export type GuildGuild_PlayersArgs = {
  distinct_on?: InputMaybe<Array<Guild_Player_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Guild_Player_Order_By>>;
  where?: InputMaybe<Guild_Player_Bool_Exp>;
};

/** columns and relationships of "guild" */
export type GuildGuild_Players_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Guild_Player_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Guild_Player_Order_By>>;
  where?: InputMaybe<Guild_Player_Bool_Exp>;
};

/** columns and relationships of "guild" */
export type GuildQuestsArgs = {
  distinct_on?: InputMaybe<Array<Quest_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quest_Order_By>>;
  where?: InputMaybe<Quest_Bool_Exp>;
};

/** columns and relationships of "guild" */
export type GuildQuests_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Quest_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quest_Order_By>>;
  where?: InputMaybe<Quest_Bool_Exp>;
};

/** aggregated selection of "guild" */
export type Guild_Aggregate = {
  aggregate?: Maybe<Guild_Aggregate_Fields>;
  nodes: Array<Guild>;
};

/** aggregate fields of "guild" */
export type Guild_Aggregate_Fields = {
  avg?: Maybe<Guild_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Guild_Max_Fields>;
  min?: Maybe<Guild_Min_Fields>;
  stddev?: Maybe<Guild_Stddev_Fields>;
  stddev_pop?: Maybe<Guild_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Guild_Stddev_Samp_Fields>;
  sum?: Maybe<Guild_Sum_Fields>;
  var_pop?: Maybe<Guild_Var_Pop_Fields>;
  var_samp?: Maybe<Guild_Var_Samp_Fields>;
  variance?: Maybe<Guild_Variance_Fields>;
};

/** aggregate fields of "guild" */
export type Guild_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Guild_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "guild" */
export type Guild_Aggregate_Order_By = {
  avg?: InputMaybe<Guild_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Guild_Max_Order_By>;
  min?: InputMaybe<Guild_Min_Order_By>;
  stddev?: InputMaybe<Guild_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Guild_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Guild_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Guild_Sum_Order_By>;
  var_pop?: InputMaybe<Guild_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Guild_Var_Samp_Order_By>;
  variance?: InputMaybe<Guild_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "guild" */
export type Guild_Arr_Rel_Insert_Input = {
  data: Array<Guild_Insert_Input>;
  on_conflict?: InputMaybe<Guild_On_Conflict>;
};

/** aggregate avg on columns */
export type Guild_Avg_Fields = {
  sortPosition?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "guild" */
export type Guild_Avg_Order_By = {
  sortPosition?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "guild". All fields are combined with a logical 'AND'. */
export type Guild_Bool_Exp = {
  GuildType?: InputMaybe<GuildType_Bool_Exp>;
  _and?: InputMaybe<Array<InputMaybe<Guild_Bool_Exp>>>;
  _not?: InputMaybe<Guild_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Guild_Bool_Exp>>>;
  daos?: InputMaybe<Dao_Bool_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  discordId?: InputMaybe<String_Comparison_Exp>;
  discordInviteUrl?: InputMaybe<String_Comparison_Exp>;
  githubUrl?: InputMaybe<String_Comparison_Exp>;
  guild_players?: InputMaybe<Guild_Player_Bool_Exp>;
  guildname?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  joinButtonUrl?: InputMaybe<String_Comparison_Exp>;
  logo?: InputMaybe<String_Comparison_Exp>;
  membershipThroughDiscord?: InputMaybe<Boolean_Comparison_Exp>;
  metadata?: InputMaybe<Guild_Metadata_Bool_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  profileLayout?: InputMaybe<String_Comparison_Exp>;
  quests?: InputMaybe<Quest_Bool_Exp>;
  showDiscordAnnouncements?: InputMaybe<Boolean_Comparison_Exp>;
  sortPosition?: InputMaybe<Int_Comparison_Exp>;
  status?: InputMaybe<GuildStatus_Enum_Comparison_Exp>;
  twitterUrl?: InputMaybe<String_Comparison_Exp>;
  type?: InputMaybe<GuildType_Enum_Comparison_Exp>;
  websiteUrl?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "guild" */
export enum Guild_Constraint {
  /** unique or primary key constraint */
  GuildGuildnameKey = 'Guild_guildname_key',
  /** unique or primary key constraint */
  GuildPkey = 'Guild_pkey',
  /** unique or primary key constraint */
  GuildDiscordIdKey = 'guild_discord_id_key',
  /** unique or primary key constraint */
  GuildSortPositionKey = 'guild_sort_position_key',
}

/** input type for incrementing integer column in table "guild" */
export type Guild_Inc_Input = {
  sortPosition?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "guild" */
export type Guild_Insert_Input = {
  GuildType?: InputMaybe<GuildType_Obj_Rel_Insert_Input>;
  daos?: InputMaybe<Dao_Arr_Rel_Insert_Input>;
  description?: InputMaybe<Scalars['String']>;
  discordId?: InputMaybe<Scalars['String']>;
  discordInviteUrl?: InputMaybe<Scalars['String']>;
  githubUrl?: InputMaybe<Scalars['String']>;
  guild_players?: InputMaybe<Guild_Player_Arr_Rel_Insert_Input>;
  guildname?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  joinButtonUrl?: InputMaybe<Scalars['String']>;
  logo?: InputMaybe<Scalars['String']>;
  membershipThroughDiscord?: InputMaybe<Scalars['Boolean']>;
  metadata?: InputMaybe<Guild_Metadata_Obj_Rel_Insert_Input>;
  name?: InputMaybe<Scalars['String']>;
  profileLayout?: InputMaybe<Scalars['String']>;
  quests?: InputMaybe<Quest_Arr_Rel_Insert_Input>;
  showDiscordAnnouncements?: InputMaybe<Scalars['Boolean']>;
  sortPosition?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<GuildStatus_Enum>;
  twitterUrl?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<GuildType_Enum>;
  websiteUrl?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Guild_Max_Fields = {
  description?: Maybe<Scalars['String']>;
  discordId?: Maybe<Scalars['String']>;
  discordInviteUrl?: Maybe<Scalars['String']>;
  githubUrl?: Maybe<Scalars['String']>;
  guildname?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  joinButtonUrl?: Maybe<Scalars['String']>;
  logo?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  profileLayout?: Maybe<Scalars['String']>;
  sortPosition?: Maybe<Scalars['Int']>;
  twitterUrl?: Maybe<Scalars['String']>;
  websiteUrl?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "guild" */
export type Guild_Max_Order_By = {
  description?: InputMaybe<Order_By>;
  discordId?: InputMaybe<Order_By>;
  discordInviteUrl?: InputMaybe<Order_By>;
  githubUrl?: InputMaybe<Order_By>;
  guildname?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  joinButtonUrl?: InputMaybe<Order_By>;
  logo?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  profileLayout?: InputMaybe<Order_By>;
  sortPosition?: InputMaybe<Order_By>;
  twitterUrl?: InputMaybe<Order_By>;
  websiteUrl?: InputMaybe<Order_By>;
};

/**
 * Used to hold private information for guilds
 *
 *
 * columns and relationships of "guild_metadata"
 */
export type Guild_Metadata = {
  creatorId?: Maybe<Scalars['uuid']>;
  discordId: Scalars['String'];
  discordMetadata?: Maybe<Scalars['jsonb']>;
  /** Remote relationship field */
  discordRoles: Array<DiscordRole>;
  /** An object relationship */
  guild: Guild;
  guildId: Scalars['uuid'];
  /** An object relationship */
  player?: Maybe<Player>;
};

/**
 * Used to hold private information for guilds
 *
 *
 * columns and relationships of "guild_metadata"
 */
export type Guild_MetadataDiscordMetadataArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "guild_metadata" */
export type Guild_Metadata_Aggregate = {
  aggregate?: Maybe<Guild_Metadata_Aggregate_Fields>;
  nodes: Array<Guild_Metadata>;
};

/** aggregate fields of "guild_metadata" */
export type Guild_Metadata_Aggregate_Fields = {
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Guild_Metadata_Max_Fields>;
  min?: Maybe<Guild_Metadata_Min_Fields>;
};

/** aggregate fields of "guild_metadata" */
export type Guild_Metadata_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Guild_Metadata_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "guild_metadata" */
export type Guild_Metadata_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Guild_Metadata_Max_Order_By>;
  min?: InputMaybe<Guild_Metadata_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Guild_Metadata_Append_Input = {
  discordMetadata?: InputMaybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "guild_metadata" */
export type Guild_Metadata_Arr_Rel_Insert_Input = {
  data: Array<Guild_Metadata_Insert_Input>;
  on_conflict?: InputMaybe<Guild_Metadata_On_Conflict>;
};

/** Boolean expression to filter rows from the table "guild_metadata". All fields are combined with a logical 'AND'. */
export type Guild_Metadata_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Guild_Metadata_Bool_Exp>>>;
  _not?: InputMaybe<Guild_Metadata_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Guild_Metadata_Bool_Exp>>>;
  creatorId?: InputMaybe<Uuid_Comparison_Exp>;
  discordId?: InputMaybe<String_Comparison_Exp>;
  discordMetadata?: InputMaybe<Jsonb_Comparison_Exp>;
  guild?: InputMaybe<Guild_Bool_Exp>;
  guildId?: InputMaybe<Uuid_Comparison_Exp>;
  player?: InputMaybe<Player_Bool_Exp>;
};

/** unique or primary key constraints on table "guild_metadata" */
export enum Guild_Metadata_Constraint {
  /** unique or primary key constraint */
  GuildMetadataPkey = 'guild_metadata_pkey',
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Guild_Metadata_Delete_At_Path_Input = {
  discordMetadata?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

/**
 * delete the array element with specified index (negative integers count from the
 * end). throws an error if top level container is not an array
 */
export type Guild_Metadata_Delete_Elem_Input = {
  discordMetadata?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Guild_Metadata_Delete_Key_Input = {
  discordMetadata?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "guild_metadata" */
export type Guild_Metadata_Insert_Input = {
  creatorId?: InputMaybe<Scalars['uuid']>;
  discordId?: InputMaybe<Scalars['String']>;
  discordMetadata?: InputMaybe<Scalars['jsonb']>;
  guild?: InputMaybe<Guild_Obj_Rel_Insert_Input>;
  guildId?: InputMaybe<Scalars['uuid']>;
  player?: InputMaybe<Player_Obj_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Guild_Metadata_Max_Fields = {
  creatorId?: Maybe<Scalars['uuid']>;
  discordId?: Maybe<Scalars['String']>;
  guildId?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "guild_metadata" */
export type Guild_Metadata_Max_Order_By = {
  creatorId?: InputMaybe<Order_By>;
  discordId?: InputMaybe<Order_By>;
  guildId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Guild_Metadata_Min_Fields = {
  creatorId?: Maybe<Scalars['uuid']>;
  discordId?: Maybe<Scalars['String']>;
  guildId?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "guild_metadata" */
export type Guild_Metadata_Min_Order_By = {
  creatorId?: InputMaybe<Order_By>;
  discordId?: InputMaybe<Order_By>;
  guildId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "guild_metadata" */
export type Guild_Metadata_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Guild_Metadata>;
};

/** input type for inserting object relation for remote table "guild_metadata" */
export type Guild_Metadata_Obj_Rel_Insert_Input = {
  data: Guild_Metadata_Insert_Input;
  on_conflict?: InputMaybe<Guild_Metadata_On_Conflict>;
};

/** on conflict condition type for table "guild_metadata" */
export type Guild_Metadata_On_Conflict = {
  constraint: Guild_Metadata_Constraint;
  update_columns: Array<Guild_Metadata_Update_Column>;
  where?: InputMaybe<Guild_Metadata_Bool_Exp>;
};

/** ordering options when selecting data from "guild_metadata" */
export type Guild_Metadata_Order_By = {
  creatorId?: InputMaybe<Order_By>;
  discordId?: InputMaybe<Order_By>;
  discordMetadata?: InputMaybe<Order_By>;
  guild?: InputMaybe<Guild_Order_By>;
  guildId?: InputMaybe<Order_By>;
  player?: InputMaybe<Player_Order_By>;
};

/** primary key columns input for table: "guild_metadata" */
export type Guild_Metadata_Pk_Columns_Input = {
  guildId: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Guild_Metadata_Prepend_Input = {
  discordMetadata?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "guild_metadata" */
export enum Guild_Metadata_Select_Column {
  /** column name */
  CreatorId = 'creatorId',
  /** column name */
  DiscordId = 'discordId',
  /** column name */
  DiscordMetadata = 'discordMetadata',
  /** column name */
  GuildId = 'guildId',
}

/** input type for updating data in table "guild_metadata" */
export type Guild_Metadata_Set_Input = {
  creatorId?: InputMaybe<Scalars['uuid']>;
  discordId?: InputMaybe<Scalars['String']>;
  discordMetadata?: InputMaybe<Scalars['jsonb']>;
  guildId?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "guild_metadata" */
export enum Guild_Metadata_Update_Column {
  /** column name */
  CreatorId = 'creatorId',
  /** column name */
  DiscordId = 'discordId',
  /** column name */
  DiscordMetadata = 'discordMetadata',
  /** column name */
  GuildId = 'guildId',
}

/** aggregate min on columns */
export type Guild_Min_Fields = {
  description?: Maybe<Scalars['String']>;
  discordId?: Maybe<Scalars['String']>;
  discordInviteUrl?: Maybe<Scalars['String']>;
  githubUrl?: Maybe<Scalars['String']>;
  guildname?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  joinButtonUrl?: Maybe<Scalars['String']>;
  logo?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  profileLayout?: Maybe<Scalars['String']>;
  sortPosition?: Maybe<Scalars['Int']>;
  twitterUrl?: Maybe<Scalars['String']>;
  websiteUrl?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "guild" */
export type Guild_Min_Order_By = {
  description?: InputMaybe<Order_By>;
  discordId?: InputMaybe<Order_By>;
  discordInviteUrl?: InputMaybe<Order_By>;
  githubUrl?: InputMaybe<Order_By>;
  guildname?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  joinButtonUrl?: InputMaybe<Order_By>;
  logo?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  profileLayout?: InputMaybe<Order_By>;
  sortPosition?: InputMaybe<Order_By>;
  twitterUrl?: InputMaybe<Order_By>;
  websiteUrl?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "guild" */
export type Guild_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Guild>;
};

/** input type for inserting object relation for remote table "guild" */
export type Guild_Obj_Rel_Insert_Input = {
  data: Guild_Insert_Input;
  on_conflict?: InputMaybe<Guild_On_Conflict>;
};

/** on conflict condition type for table "guild" */
export type Guild_On_Conflict = {
  constraint: Guild_Constraint;
  update_columns: Array<Guild_Update_Column>;
  where?: InputMaybe<Guild_Bool_Exp>;
};

/** ordering options when selecting data from "guild" */
export type Guild_Order_By = {
  GuildType?: InputMaybe<GuildType_Order_By>;
  daos_aggregate?: InputMaybe<Dao_Aggregate_Order_By>;
  description?: InputMaybe<Order_By>;
  discordId?: InputMaybe<Order_By>;
  discordInviteUrl?: InputMaybe<Order_By>;
  githubUrl?: InputMaybe<Order_By>;
  guild_players_aggregate?: InputMaybe<Guild_Player_Aggregate_Order_By>;
  guildname?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  joinButtonUrl?: InputMaybe<Order_By>;
  logo?: InputMaybe<Order_By>;
  membershipThroughDiscord?: InputMaybe<Order_By>;
  metadata?: InputMaybe<Guild_Metadata_Order_By>;
  name?: InputMaybe<Order_By>;
  profileLayout?: InputMaybe<Order_By>;
  quests_aggregate?: InputMaybe<Quest_Aggregate_Order_By>;
  showDiscordAnnouncements?: InputMaybe<Order_By>;
  sortPosition?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  twitterUrl?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  websiteUrl?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "guild" */
export type Guild_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** columns and relationships of "guild_player" */
export type Guild_Player = {
  /** An object relationship */
  Guild: Guild;
  /** An object relationship */
  Player: Player;
  /** Remote relationship field */
  discordRoles: Array<DiscordRole>;
  guildId: Scalars['uuid'];
  playerId: Scalars['uuid'];
};

/** aggregated selection of "guild_player" */
export type Guild_Player_Aggregate = {
  aggregate?: Maybe<Guild_Player_Aggregate_Fields>;
  nodes: Array<Guild_Player>;
};

/** aggregate fields of "guild_player" */
export type Guild_Player_Aggregate_Fields = {
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Guild_Player_Max_Fields>;
  min?: Maybe<Guild_Player_Min_Fields>;
};

/** aggregate fields of "guild_player" */
export type Guild_Player_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Guild_Player_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "guild_player" */
export type Guild_Player_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Guild_Player_Max_Order_By>;
  min?: InputMaybe<Guild_Player_Min_Order_By>;
};

/** input type for inserting array relation for remote table "guild_player" */
export type Guild_Player_Arr_Rel_Insert_Input = {
  data: Array<Guild_Player_Insert_Input>;
  on_conflict?: InputMaybe<Guild_Player_On_Conflict>;
};

/** Boolean expression to filter rows from the table "guild_player". All fields are combined with a logical 'AND'. */
export type Guild_Player_Bool_Exp = {
  Guild?: InputMaybe<Guild_Bool_Exp>;
  Player?: InputMaybe<Player_Bool_Exp>;
  _and?: InputMaybe<Array<InputMaybe<Guild_Player_Bool_Exp>>>;
  _not?: InputMaybe<Guild_Player_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Guild_Player_Bool_Exp>>>;
  guildId?: InputMaybe<Uuid_Comparison_Exp>;
  playerId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "guild_player" */
export enum Guild_Player_Constraint {
  /** unique or primary key constraint */
  GuildPlayerPkey = 'guild_player_pkey',
}

/** input type for inserting data into table "guild_player" */
export type Guild_Player_Insert_Input = {
  Guild?: InputMaybe<Guild_Obj_Rel_Insert_Input>;
  Player?: InputMaybe<Player_Obj_Rel_Insert_Input>;
  guildId?: InputMaybe<Scalars['uuid']>;
  playerId?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Guild_Player_Max_Fields = {
  guildId?: Maybe<Scalars['uuid']>;
  playerId?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "guild_player" */
export type Guild_Player_Max_Order_By = {
  guildId?: InputMaybe<Order_By>;
  playerId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Guild_Player_Min_Fields = {
  guildId?: Maybe<Scalars['uuid']>;
  playerId?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "guild_player" */
export type Guild_Player_Min_Order_By = {
  guildId?: InputMaybe<Order_By>;
  playerId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "guild_player" */
export type Guild_Player_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Guild_Player>;
};

/** input type for inserting object relation for remote table "guild_player" */
export type Guild_Player_Obj_Rel_Insert_Input = {
  data: Guild_Player_Insert_Input;
  on_conflict?: InputMaybe<Guild_Player_On_Conflict>;
};

/** on conflict condition type for table "guild_player" */
export type Guild_Player_On_Conflict = {
  constraint: Guild_Player_Constraint;
  update_columns: Array<Guild_Player_Update_Column>;
  where?: InputMaybe<Guild_Player_Bool_Exp>;
};

/** ordering options when selecting data from "guild_player" */
export type Guild_Player_Order_By = {
  Guild?: InputMaybe<Guild_Order_By>;
  Player?: InputMaybe<Player_Order_By>;
  guildId?: InputMaybe<Order_By>;
  playerId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "guild_player" */
export type Guild_Player_Pk_Columns_Input = {
  guildId: Scalars['uuid'];
  playerId: Scalars['uuid'];
};

/** select columns of table "guild_player" */
export enum Guild_Player_Select_Column {
  /** column name */
  GuildId = 'guildId',
  /** column name */
  PlayerId = 'playerId',
}

/** input type for updating data in table "guild_player" */
export type Guild_Player_Set_Input = {
  guildId?: InputMaybe<Scalars['uuid']>;
  playerId?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "guild_player" */
export enum Guild_Player_Update_Column {
  /** column name */
  GuildId = 'guildId',
  /** column name */
  PlayerId = 'playerId',
}

/** select columns of table "guild" */
export enum Guild_Select_Column {
  /** column name */
  Description = 'description',
  /** column name */
  DiscordId = 'discordId',
  /** column name */
  DiscordInviteUrl = 'discordInviteUrl',
  /** column name */
  GithubUrl = 'githubUrl',
  /** column name */
  Guildname = 'guildname',
  /** column name */
  Id = 'id',
  /** column name */
  JoinButtonUrl = 'joinButtonUrl',
  /** column name */
  Logo = 'logo',
  /** column name */
  MembershipThroughDiscord = 'membershipThroughDiscord',
  /** column name */
  Name = 'name',
  /** column name */
  ProfileLayout = 'profileLayout',
  /** column name */
  ShowDiscordAnnouncements = 'showDiscordAnnouncements',
  /** column name */
  SortPosition = 'sortPosition',
  /** column name */
  Status = 'status',
  /** column name */
  TwitterUrl = 'twitterUrl',
  /** column name */
  Type = 'type',
  /** column name */
  WebsiteUrl = 'websiteUrl',
}

/** input type for updating data in table "guild" */
export type Guild_Set_Input = {
  description?: InputMaybe<Scalars['String']>;
  discordId?: InputMaybe<Scalars['String']>;
  discordInviteUrl?: InputMaybe<Scalars['String']>;
  githubUrl?: InputMaybe<Scalars['String']>;
  guildname?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  joinButtonUrl?: InputMaybe<Scalars['String']>;
  logo?: InputMaybe<Scalars['String']>;
  membershipThroughDiscord?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  profileLayout?: InputMaybe<Scalars['String']>;
  showDiscordAnnouncements?: InputMaybe<Scalars['Boolean']>;
  sortPosition?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<GuildStatus_Enum>;
  twitterUrl?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<GuildType_Enum>;
  websiteUrl?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Guild_Stddev_Fields = {
  sortPosition?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "guild" */
export type Guild_Stddev_Order_By = {
  sortPosition?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Guild_Stddev_Pop_Fields = {
  sortPosition?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "guild" */
export type Guild_Stddev_Pop_Order_By = {
  sortPosition?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Guild_Stddev_Samp_Fields = {
  sortPosition?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "guild" */
export type Guild_Stddev_Samp_Order_By = {
  sortPosition?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Guild_Sum_Fields = {
  sortPosition?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "guild" */
export type Guild_Sum_Order_By = {
  sortPosition?: InputMaybe<Order_By>;
};

/** update columns of table "guild" */
export enum Guild_Update_Column {
  /** column name */
  Description = 'description',
  /** column name */
  DiscordId = 'discordId',
  /** column name */
  DiscordInviteUrl = 'discordInviteUrl',
  /** column name */
  GithubUrl = 'githubUrl',
  /** column name */
  Guildname = 'guildname',
  /** column name */
  Id = 'id',
  /** column name */
  JoinButtonUrl = 'joinButtonUrl',
  /** column name */
  Logo = 'logo',
  /** column name */
  MembershipThroughDiscord = 'membershipThroughDiscord',
  /** column name */
  Name = 'name',
  /** column name */
  ProfileLayout = 'profileLayout',
  /** column name */
  ShowDiscordAnnouncements = 'showDiscordAnnouncements',
  /** column name */
  SortPosition = 'sortPosition',
  /** column name */
  Status = 'status',
  /** column name */
  TwitterUrl = 'twitterUrl',
  /** column name */
  Type = 'type',
  /** column name */
  WebsiteUrl = 'websiteUrl',
}

/** aggregate var_pop on columns */
export type Guild_Var_Pop_Fields = {
  sortPosition?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "guild" */
export type Guild_Var_Pop_Order_By = {
  sortPosition?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Guild_Var_Samp_Fields = {
  sortPosition?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "guild" */
export type Guild_Var_Samp_Order_By = {
  sortPosition?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Guild_Variance_Fields = {
  sortPosition?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "guild" */
export type Guild_Variance_Order_By = {
  sortPosition?: InputMaybe<Order_By>;
};

/** expression to compare columns of type json. All fields are combined with logical 'AND'. */
export type Json_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['json']>;
  _gt?: InputMaybe<Scalars['json']>;
  _gte?: InputMaybe<Scalars['json']>;
  _in?: InputMaybe<Array<Scalars['json']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['json']>;
  _lte?: InputMaybe<Scalars['json']>;
  _neq?: InputMaybe<Scalars['json']>;
  _nin?: InputMaybe<Array<Scalars['json']>>;
};

/** expression to compare columns of type jsonb. All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
  /** is the column contained in the given json value */
  _contained_in?: InputMaybe<Scalars['jsonb']>;
  /** does the column contain the given json value at the top level */
  _contains?: InputMaybe<Scalars['jsonb']>;
  _eq?: InputMaybe<Scalars['jsonb']>;
  _gt?: InputMaybe<Scalars['jsonb']>;
  _gte?: InputMaybe<Scalars['jsonb']>;
  /** does the string exist as a top-level key in the column */
  _has_key?: InputMaybe<Scalars['String']>;
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: InputMaybe<Array<Scalars['String']>>;
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: InputMaybe<Array<Scalars['String']>>;
  _in?: InputMaybe<Array<Scalars['jsonb']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['jsonb']>;
  _lte?: InputMaybe<Scalars['jsonb']>;
  _neq?: InputMaybe<Scalars['jsonb']>;
  _nin?: InputMaybe<Array<Scalars['jsonb']>>;
};

/** columns and relationships of "me" */
export type Me = {
  ethereumAddress?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  /** An object relationship */
  player?: Maybe<Player>;
  username?: Maybe<Scalars['String']>;
};

/** aggregated selection of "me" */
export type Me_Aggregate = {
  aggregate?: Maybe<Me_Aggregate_Fields>;
  nodes: Array<Me>;
};

/** aggregate fields of "me" */
export type Me_Aggregate_Fields = {
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Me_Max_Fields>;
  min?: Maybe<Me_Min_Fields>;
};

/** aggregate fields of "me" */
export type Me_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Me_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "me" */
export type Me_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Me_Max_Order_By>;
  min?: InputMaybe<Me_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "me". All fields are combined with a logical 'AND'. */
export type Me_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Me_Bool_Exp>>>;
  _not?: InputMaybe<Me_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Me_Bool_Exp>>>;
  ethereumAddress?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  player?: InputMaybe<Player_Bool_Exp>;
  username?: InputMaybe<String_Comparison_Exp>;
};

/** aggregate max on columns */
export type Me_Max_Fields = {
  ethereumAddress?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  username?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "me" */
export type Me_Max_Order_By = {
  ethereumAddress?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  username?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Me_Min_Fields = {
  ethereumAddress?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  username?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "me" */
export type Me_Min_Order_By = {
  ethereumAddress?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  username?: InputMaybe<Order_By>;
};

/** ordering options when selecting data from "me" */
export type Me_Order_By = {
  ethereumAddress?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  player?: InputMaybe<Player_Order_By>;
  username?: InputMaybe<Order_By>;
};

/** select columns of table "me" */
export enum Me_Select_Column {
  /** column name */
  EthereumAddress = 'ethereumAddress',
  /** column name */
  Id = 'id',
  /** column name */
  Username = 'username',
}

/** mutation root */
export type Mutation_Root = {
  /** perform the action: "authenticateDiscordGuild" */
  authenticateDiscordGuild?: Maybe<DiscordGuildAuthResponse>;
  /** perform the action: "createQuest" */
  createQuest?: Maybe<CreateQuestOutput>;
  /** perform the action: "createQuestCompletion" */
  createQuestCompletion?: Maybe<CreateQuestCompletionOutput>;
  /** delete data from the table: "AccountType" */
  delete_AccountType?: Maybe<AccountType_Mutation_Response>;
  /** delete single row from the table: "AccountType" */
  delete_AccountType_by_pk?: Maybe<AccountType>;
  /** delete data from the table: "ColorAspect" */
  delete_ColorAspect?: Maybe<ColorAspect_Mutation_Response>;
  /** delete single row from the table: "ColorAspect" */
  delete_ColorAspect_by_pk?: Maybe<ColorAspect>;
  /** delete data from the table: "ExplorerType" */
  delete_ExplorerType?: Maybe<ExplorerType_Mutation_Response>;
  /** delete single row from the table: "ExplorerType" */
  delete_ExplorerType_by_pk?: Maybe<ExplorerType>;
  /** delete data from the table: "GuildStatus" */
  delete_GuildStatus?: Maybe<GuildStatus_Mutation_Response>;
  /** delete single row from the table: "GuildStatus" */
  delete_GuildStatus_by_pk?: Maybe<GuildStatus>;
  /** delete data from the table: "GuildType" */
  delete_GuildType?: Maybe<GuildType_Mutation_Response>;
  /** delete single row from the table: "GuildType" */
  delete_GuildType_by_pk?: Maybe<GuildType>;
  /** delete data from the table: "PlayerRank" */
  delete_PlayerRank?: Maybe<PlayerRank_Mutation_Response>;
  /** delete single row from the table: "PlayerRank" */
  delete_PlayerRank_by_pk?: Maybe<PlayerRank>;
  /** delete data from the table: "PlayerRole" */
  delete_PlayerRole?: Maybe<PlayerRole_Mutation_Response>;
  /** delete single row from the table: "PlayerRole" */
  delete_PlayerRole_by_pk?: Maybe<PlayerRole>;
  /** delete data from the table: "QuestCompletionStatus" */
  delete_QuestCompletionStatus?: Maybe<QuestCompletionStatus_Mutation_Response>;
  /** delete single row from the table: "QuestCompletionStatus" */
  delete_QuestCompletionStatus_by_pk?: Maybe<QuestCompletionStatus>;
  /** delete data from the table: "QuestRepetition" */
  delete_QuestRepetition?: Maybe<QuestRepetition_Mutation_Response>;
  /** delete single row from the table: "QuestRepetition" */
  delete_QuestRepetition_by_pk?: Maybe<QuestRepetition>;
  /** delete data from the table: "QuestStatus" */
  delete_QuestStatus?: Maybe<QuestStatus_Mutation_Response>;
  /** delete single row from the table: "QuestStatus" */
  delete_QuestStatus_by_pk?: Maybe<QuestStatus>;
  /** delete data from the table: "SkillCategory" */
  delete_SkillCategory?: Maybe<SkillCategory_Mutation_Response>;
  /** delete single row from the table: "SkillCategory" */
  delete_SkillCategory_by_pk?: Maybe<SkillCategory>;
  /** delete data from the table: "balance" */
  delete_balance?: Maybe<Balance_Mutation_Response>;
  /** delete single row from the table: "balance" */
  delete_balance_by_pk?: Maybe<Balance>;
  /** delete data from the table: "dao" */
  delete_dao?: Maybe<Dao_Mutation_Response>;
  /** delete single row from the table: "dao" */
  delete_dao_by_pk?: Maybe<Dao>;
  /** delete data from the table: "dao_player" */
  delete_dao_player?: Maybe<Dao_Player_Mutation_Response>;
  /** delete single row from the table: "dao_player" */
  delete_dao_player_by_pk?: Maybe<Dao_Player>;
  /** delete data from the table: "guild" */
  delete_guild?: Maybe<Guild_Mutation_Response>;
  /** delete single row from the table: "guild" */
  delete_guild_by_pk?: Maybe<Guild>;
  /** delete data from the table: "guild_metadata" */
  delete_guild_metadata?: Maybe<Guild_Metadata_Mutation_Response>;
  /** delete single row from the table: "guild_metadata" */
  delete_guild_metadata_by_pk?: Maybe<Guild_Metadata>;
  /** delete data from the table: "guild_player" */
  delete_guild_player?: Maybe<Guild_Player_Mutation_Response>;
  /** delete single row from the table: "guild_player" */
  delete_guild_player_by_pk?: Maybe<Guild_Player>;
  /** delete data from the table: "player" */
  delete_player?: Maybe<Player_Mutation_Response>;
  /** delete data from the table: "player_account" */
  delete_player_account?: Maybe<Player_Account_Mutation_Response>;
  /** delete single row from the table: "player" */
  delete_player_by_pk?: Maybe<Player>;
  /** delete data from the table: "player_role" */
  delete_player_role?: Maybe<Player_Role_Mutation_Response>;
  /** delete single row from the table: "player_role" */
  delete_player_role_by_pk?: Maybe<Player_Role>;
  /** delete data from the table: "player_skill" */
  delete_player_skill?: Maybe<Player_Skill_Mutation_Response>;
  /** delete single row from the table: "player_skill" */
  delete_player_skill_by_pk?: Maybe<Player_Skill>;
  /** delete data from the table: "profile" */
  delete_profile?: Maybe<Profile_Mutation_Response>;
  /** delete single row from the table: "profile" */
  delete_profile_by_pk?: Maybe<Profile>;
  /** delete data from the table: "quest" */
  delete_quest?: Maybe<Quest_Mutation_Response>;
  /** delete single row from the table: "quest" */
  delete_quest_by_pk?: Maybe<Quest>;
  /** delete data from the table: "quest_completion" */
  delete_quest_completion?: Maybe<Quest_Completion_Mutation_Response>;
  /** delete single row from the table: "quest_completion" */
  delete_quest_completion_by_pk?: Maybe<Quest_Completion>;
  /** delete data from the table: "quest_role" */
  delete_quest_role?: Maybe<Quest_Role_Mutation_Response>;
  /** delete single row from the table: "quest_role" */
  delete_quest_role_by_pk?: Maybe<Quest_Role>;
  /** delete data from the table: "quest_skill" */
  delete_quest_skill?: Maybe<Quest_Skill_Mutation_Response>;
  /** delete single row from the table: "quest_skill" */
  delete_quest_skill_by_pk?: Maybe<Quest_Skill>;
  /** delete data from the table: "skill" */
  delete_skill?: Maybe<Skill_Mutation_Response>;
  /** delete single row from the table: "skill" */
  delete_skill_by_pk?: Maybe<Skill>;
  /** delete data from the table: "token" */
  delete_token?: Maybe<Token_Mutation_Response>;
  /** delete single row from the table: "token" */
  delete_token_by_pk?: Maybe<Token>;
  /** delete data from the table: "xp" */
  delete_xp?: Maybe<Xp_Mutation_Response>;
  /** delete single row from the table: "xp" */
  delete_xp_by_pk?: Maybe<Xp>;
  /** insert data into the table: "AccountType" */
  insert_AccountType?: Maybe<AccountType_Mutation_Response>;
  /** insert a single row into the table: "AccountType" */
  insert_AccountType_one?: Maybe<AccountType>;
  /** insert data into the table: "ColorAspect" */
  insert_ColorAspect?: Maybe<ColorAspect_Mutation_Response>;
  /** insert a single row into the table: "ColorAspect" */
  insert_ColorAspect_one?: Maybe<ColorAspect>;
  /** insert data into the table: "ExplorerType" */
  insert_ExplorerType?: Maybe<ExplorerType_Mutation_Response>;
  /** insert a single row into the table: "ExplorerType" */
  insert_ExplorerType_one?: Maybe<ExplorerType>;
  /** insert data into the table: "GuildStatus" */
  insert_GuildStatus?: Maybe<GuildStatus_Mutation_Response>;
  /** insert a single row into the table: "GuildStatus" */
  insert_GuildStatus_one?: Maybe<GuildStatus>;
  /** insert data into the table: "GuildType" */
  insert_GuildType?: Maybe<GuildType_Mutation_Response>;
  /** insert a single row into the table: "GuildType" */
  insert_GuildType_one?: Maybe<GuildType>;
  /** insert data into the table: "PlayerRank" */
  insert_PlayerRank?: Maybe<PlayerRank_Mutation_Response>;
  /** insert a single row into the table: "PlayerRank" */
  insert_PlayerRank_one?: Maybe<PlayerRank>;
  /** insert data into the table: "PlayerRole" */
  insert_PlayerRole?: Maybe<PlayerRole_Mutation_Response>;
  /** insert a single row into the table: "PlayerRole" */
  insert_PlayerRole_one?: Maybe<PlayerRole>;
  /** insert data into the table: "QuestCompletionStatus" */
  insert_QuestCompletionStatus?: Maybe<QuestCompletionStatus_Mutation_Response>;
  /** insert a single row into the table: "QuestCompletionStatus" */
  insert_QuestCompletionStatus_one?: Maybe<QuestCompletionStatus>;
  /** insert data into the table: "QuestRepetition" */
  insert_QuestRepetition?: Maybe<QuestRepetition_Mutation_Response>;
  /** insert a single row into the table: "QuestRepetition" */
  insert_QuestRepetition_one?: Maybe<QuestRepetition>;
  /** insert data into the table: "QuestStatus" */
  insert_QuestStatus?: Maybe<QuestStatus_Mutation_Response>;
  /** insert a single row into the table: "QuestStatus" */
  insert_QuestStatus_one?: Maybe<QuestStatus>;
  /** insert data into the table: "SkillCategory" */
  insert_SkillCategory?: Maybe<SkillCategory_Mutation_Response>;
  /** insert a single row into the table: "SkillCategory" */
  insert_SkillCategory_one?: Maybe<SkillCategory>;
  /** insert data into the table: "balance" */
  insert_balance?: Maybe<Balance_Mutation_Response>;
  /** insert a single row into the table: "balance" */
  insert_balance_one?: Maybe<Balance>;
  /** insert data into the table: "dao" */
  insert_dao?: Maybe<Dao_Mutation_Response>;
  /** insert a single row into the table: "dao" */
  insert_dao_one?: Maybe<Dao>;
  /** insert data into the table: "dao_player" */
  insert_dao_player?: Maybe<Dao_Player_Mutation_Response>;
  /** insert a single row into the table: "dao_player" */
  insert_dao_player_one?: Maybe<Dao_Player>;
  /** insert data into the table: "guild" */
  insert_guild?: Maybe<Guild_Mutation_Response>;
  /** insert data into the table: "guild_metadata" */
  insert_guild_metadata?: Maybe<Guild_Metadata_Mutation_Response>;
  /** insert a single row into the table: "guild_metadata" */
  insert_guild_metadata_one?: Maybe<Guild_Metadata>;
  /** insert a single row into the table: "guild" */
  insert_guild_one?: Maybe<Guild>;
  /** insert data into the table: "guild_player" */
  insert_guild_player?: Maybe<Guild_Player_Mutation_Response>;
  /** insert a single row into the table: "guild_player" */
  insert_guild_player_one?: Maybe<Guild_Player>;
  /** insert data into the table: "player" */
  insert_player?: Maybe<Player_Mutation_Response>;
  /** insert data into the table: "player_account" */
  insert_player_account?: Maybe<Player_Account_Mutation_Response>;
  /** insert a single row into the table: "player_account" */
  insert_player_account_one?: Maybe<Player_Account>;
  /** insert a single row into the table: "player" */
  insert_player_one?: Maybe<Player>;
  /** insert data into the table: "player_role" */
  insert_player_role?: Maybe<Player_Role_Mutation_Response>;
  /** insert a single row into the table: "player_role" */
  insert_player_role_one?: Maybe<Player_Role>;
  /** insert data into the table: "player_skill" */
  insert_player_skill?: Maybe<Player_Skill_Mutation_Response>;
  /** insert a single row into the table: "player_skill" */
  insert_player_skill_one?: Maybe<Player_Skill>;
  /** insert data into the table: "profile" */
  insert_profile?: Maybe<Profile_Mutation_Response>;
  /** insert a single row into the table: "profile" */
  insert_profile_one?: Maybe<Profile>;
  /** insert data into the table: "quest" */
  insert_quest?: Maybe<Quest_Mutation_Response>;
  /** insert data into the table: "quest_completion" */
  insert_quest_completion?: Maybe<Quest_Completion_Mutation_Response>;
  /** insert a single row into the table: "quest_completion" */
  insert_quest_completion_one?: Maybe<Quest_Completion>;
  /** insert a single row into the table: "quest" */
  insert_quest_one?: Maybe<Quest>;
  /** insert data into the table: "quest_role" */
  insert_quest_role?: Maybe<Quest_Role_Mutation_Response>;
  /** insert a single row into the table: "quest_role" */
  insert_quest_role_one?: Maybe<Quest_Role>;
  /** insert data into the table: "quest_skill" */
  insert_quest_skill?: Maybe<Quest_Skill_Mutation_Response>;
  /** insert a single row into the table: "quest_skill" */
  insert_quest_skill_one?: Maybe<Quest_Skill>;
  /** insert data into the table: "skill" */
  insert_skill?: Maybe<Skill_Mutation_Response>;
  /** insert a single row into the table: "skill" */
  insert_skill_one?: Maybe<Skill>;
  /** insert data into the table: "token" */
  insert_token?: Maybe<Token_Mutation_Response>;
  /** insert a single row into the table: "token" */
  insert_token_one?: Maybe<Token>;
  /** insert data into the table: "xp" */
  insert_xp?: Maybe<Xp_Mutation_Response>;
  /** insert a single row into the table: "xp" */
  insert_xp_one?: Maybe<Xp>;
  /** perform the action: "saveGuildInformation" */
  saveGuildInformation?: Maybe<SaveGuildResponse>;
  /** perform the action: "saveGuildLayout" */
  saveGuildLayout?: Maybe<SaveGuildLayoutResponse>;
  /** perform the action: "syncAllGuildDiscordMembers" */
  syncAllGuildDiscordMembers?: Maybe<Array<Maybe<DiscordGuildsSyncOutput>>>;
  /** perform the action: "syncSourceCredAccounts" */
  syncSourceCredAccounts?: Maybe<SourceCredSyncOutput>;
  /** perform the action: "updateExpiredIDXProfiles" */
  updateExpiredIDXProfiles?: Maybe<ExpiredPlayerProfiles>;
  /** perform the action: "updateIDXProfile" */
  updateIDXProfile: Scalars['uuid'];
  /** perform the action: "updateQuestCompletion" */
  updateQuestCompletion?: Maybe<UpdateQuestCompletionOutput>;
  /** update data of the table: "AccountType" */
  update_AccountType?: Maybe<AccountType_Mutation_Response>;
  /** update single row of the table: "AccountType" */
  update_AccountType_by_pk?: Maybe<AccountType>;
  /** update data of the table: "ColorAspect" */
  update_ColorAspect?: Maybe<ColorAspect_Mutation_Response>;
  /** update single row of the table: "ColorAspect" */
  update_ColorAspect_by_pk?: Maybe<ColorAspect>;
  /** update data of the table: "ExplorerType" */
  update_ExplorerType?: Maybe<ExplorerType_Mutation_Response>;
  /** update single row of the table: "ExplorerType" */
  update_ExplorerType_by_pk?: Maybe<ExplorerType>;
  /** update data of the table: "GuildStatus" */
  update_GuildStatus?: Maybe<GuildStatus_Mutation_Response>;
  /** update single row of the table: "GuildStatus" */
  update_GuildStatus_by_pk?: Maybe<GuildStatus>;
  /** update data of the table: "GuildType" */
  update_GuildType?: Maybe<GuildType_Mutation_Response>;
  /** update single row of the table: "GuildType" */
  update_GuildType_by_pk?: Maybe<GuildType>;
  /** update data of the table: "PlayerRank" */
  update_PlayerRank?: Maybe<PlayerRank_Mutation_Response>;
  /** update single row of the table: "PlayerRank" */
  update_PlayerRank_by_pk?: Maybe<PlayerRank>;
  /** update data of the table: "PlayerRole" */
  update_PlayerRole?: Maybe<PlayerRole_Mutation_Response>;
  /** update single row of the table: "PlayerRole" */
  update_PlayerRole_by_pk?: Maybe<PlayerRole>;
  /** update data of the table: "QuestCompletionStatus" */
  update_QuestCompletionStatus?: Maybe<QuestCompletionStatus_Mutation_Response>;
  /** update single row of the table: "QuestCompletionStatus" */
  update_QuestCompletionStatus_by_pk?: Maybe<QuestCompletionStatus>;
  /** update data of the table: "QuestRepetition" */
  update_QuestRepetition?: Maybe<QuestRepetition_Mutation_Response>;
  /** update single row of the table: "QuestRepetition" */
  update_QuestRepetition_by_pk?: Maybe<QuestRepetition>;
  /** update data of the table: "QuestStatus" */
  update_QuestStatus?: Maybe<QuestStatus_Mutation_Response>;
  /** update single row of the table: "QuestStatus" */
  update_QuestStatus_by_pk?: Maybe<QuestStatus>;
  /** update data of the table: "SkillCategory" */
  update_SkillCategory?: Maybe<SkillCategory_Mutation_Response>;
  /** update single row of the table: "SkillCategory" */
  update_SkillCategory_by_pk?: Maybe<SkillCategory>;
  /** update data of the table: "balance" */
  update_balance?: Maybe<Balance_Mutation_Response>;
  /** update single row of the table: "balance" */
  update_balance_by_pk?: Maybe<Balance>;
  /** update data of the table: "dao" */
  update_dao?: Maybe<Dao_Mutation_Response>;
  /** update single row of the table: "dao" */
  update_dao_by_pk?: Maybe<Dao>;
  /** update data of the table: "dao_player" */
  update_dao_player?: Maybe<Dao_Player_Mutation_Response>;
  /** update single row of the table: "dao_player" */
  update_dao_player_by_pk?: Maybe<Dao_Player>;
  /** update data of the table: "guild" */
  update_guild?: Maybe<Guild_Mutation_Response>;
  /** update single row of the table: "guild" */
  update_guild_by_pk?: Maybe<Guild>;
  /** update data of the table: "guild_metadata" */
  update_guild_metadata?: Maybe<Guild_Metadata_Mutation_Response>;
  /** update single row of the table: "guild_metadata" */
  update_guild_metadata_by_pk?: Maybe<Guild_Metadata>;
  /** update data of the table: "guild_player" */
  update_guild_player?: Maybe<Guild_Player_Mutation_Response>;
  /** update single row of the table: "guild_player" */
  update_guild_player_by_pk?: Maybe<Guild_Player>;
  /** update data of the table: "player" */
  update_player?: Maybe<Player_Mutation_Response>;
  /** update data of the table: "player_account" */
  update_player_account?: Maybe<Player_Account_Mutation_Response>;
  /** update single row of the table: "player" */
  update_player_by_pk?: Maybe<Player>;
  /** update data of the table: "player_role" */
  update_player_role?: Maybe<Player_Role_Mutation_Response>;
  /** update single row of the table: "player_role" */
  update_player_role_by_pk?: Maybe<Player_Role>;
  /** update data of the table: "player_skill" */
  update_player_skill?: Maybe<Player_Skill_Mutation_Response>;
  /** update single row of the table: "player_skill" */
  update_player_skill_by_pk?: Maybe<Player_Skill>;
  /** update data of the table: "profile" */
  update_profile?: Maybe<Profile_Mutation_Response>;
  /** update single row of the table: "profile" */
  update_profile_by_pk?: Maybe<Profile>;
  /** update data of the table: "quest" */
  update_quest?: Maybe<Quest_Mutation_Response>;
  /** update single row of the table: "quest" */
  update_quest_by_pk?: Maybe<Quest>;
  /** update data of the table: "quest_completion" */
  update_quest_completion?: Maybe<Quest_Completion_Mutation_Response>;
  /** update single row of the table: "quest_completion" */
  update_quest_completion_by_pk?: Maybe<Quest_Completion>;
  /** update data of the table: "quest_role" */
  update_quest_role?: Maybe<Quest_Role_Mutation_Response>;
  /** update single row of the table: "quest_role" */
  update_quest_role_by_pk?: Maybe<Quest_Role>;
  /** update data of the table: "quest_skill" */
  update_quest_skill?: Maybe<Quest_Skill_Mutation_Response>;
  /** update single row of the table: "quest_skill" */
  update_quest_skill_by_pk?: Maybe<Quest_Skill>;
  /** update data of the table: "skill" */
  update_skill?: Maybe<Skill_Mutation_Response>;
  /** update single row of the table: "skill" */
  update_skill_by_pk?: Maybe<Skill>;
  /** update data of the table: "token" */
  update_token?: Maybe<Token_Mutation_Response>;
  /** update single row of the table: "token" */
  update_token_by_pk?: Maybe<Token>;
  /** update data of the table: "xp" */
  update_xp?: Maybe<Xp_Mutation_Response>;
  /** update single row of the table: "xp" */
  update_xp_by_pk?: Maybe<Xp>;
};

/** mutation root */
export type Mutation_RootAuthenticateDiscordGuildArgs = {
  code: Scalars['String'];
};

/** mutation root */
export type Mutation_RootCreateQuestArgs = {
  quest: CreateQuestInput;
};

/** mutation root */
export type Mutation_RootCreateQuestCompletionArgs = {
  questCompletion: CreateQuestCompletionInput;
};

/** mutation root */
export type Mutation_RootDelete_AccountTypeArgs = {
  where: AccountType_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_AccountType_By_PkArgs = {
  type: Scalars['String'];
};

/** mutation root */
export type Mutation_RootDelete_ColorAspectArgs = {
  where: ColorAspect_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_ColorAspect_By_PkArgs = {
  mask: Scalars['Int'];
};

/** mutation root */
export type Mutation_RootDelete_ExplorerTypeArgs = {
  where: ExplorerType_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_ExplorerType_By_PkArgs = {
  id: Scalars['Int'];
};

/** mutation root */
export type Mutation_RootDelete_GuildStatusArgs = {
  where: GuildStatus_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_GuildStatus_By_PkArgs = {
  status: Scalars['String'];
};

/** mutation root */
export type Mutation_RootDelete_GuildTypeArgs = {
  where: GuildType_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_GuildType_By_PkArgs = {
  name: Scalars['String'];
};

/** mutation root */
export type Mutation_RootDelete_PlayerRankArgs = {
  where: PlayerRank_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_PlayerRank_By_PkArgs = {
  rank: Scalars['String'];
};

/** mutation root */
export type Mutation_RootDelete_PlayerRoleArgs = {
  where: PlayerRole_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_PlayerRole_By_PkArgs = {
  role: Scalars['String'];
};

/** mutation root */
export type Mutation_RootDelete_QuestCompletionStatusArgs = {
  where: QuestCompletionStatus_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_QuestCompletionStatus_By_PkArgs = {
  status: Scalars['String'];
};

/** mutation root */
export type Mutation_RootDelete_QuestRepetitionArgs = {
  where: QuestRepetition_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_QuestRepetition_By_PkArgs = {
  repetition: Scalars['String'];
};

/** mutation root */
export type Mutation_RootDelete_QuestStatusArgs = {
  where: QuestStatus_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_QuestStatus_By_PkArgs = {
  status: Scalars['String'];
};

/** mutation root */
export type Mutation_RootDelete_SkillCategoryArgs = {
  where: SkillCategory_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_SkillCategory_By_PkArgs = {
  name: Scalars['String'];
};

/** mutation root */
export type Mutation_RootDelete_BalanceArgs = {
  where: Balance_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Balance_By_PkArgs = {
  id: Scalars['uuid'];
};

/** mutation root */
export type Mutation_RootDelete_DaoArgs = {
  where: Dao_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Dao_By_PkArgs = {
  id: Scalars['uuid'];
};

/** mutation root */
export type Mutation_RootDelete_Dao_PlayerArgs = {
  where: Dao_Player_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Dao_Player_By_PkArgs = {
  daoId: Scalars['uuid'];
  playerId: Scalars['uuid'];
};

/** mutation root */
export type Mutation_RootDelete_GuildArgs = {
  where: Guild_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Guild_By_PkArgs = {
  id: Scalars['uuid'];
};

/** mutation root */
export type Mutation_RootDelete_Guild_MetadataArgs = {
  where: Guild_Metadata_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Guild_Metadata_By_PkArgs = {
  guildId: Scalars['uuid'];
};

/** mutation root */
export type Mutation_RootDelete_Guild_PlayerArgs = {
  where: Guild_Player_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Guild_Player_By_PkArgs = {
  guildId: Scalars['uuid'];
  playerId: Scalars['uuid'];
};

/** mutation root */
export type Mutation_RootDelete_PlayerArgs = {
  where: Player_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Player_AccountArgs = {
  where: Player_Account_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Player_By_PkArgs = {
  id: Scalars['uuid'];
};

/** mutation root */
export type Mutation_RootDelete_Player_RoleArgs = {
  where: Player_Role_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Player_Role_By_PkArgs = {
  player_id: Scalars['uuid'];
  role: Scalars['String'];
};

/** mutation root */
export type Mutation_RootDelete_Player_SkillArgs = {
  where: Player_Skill_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Player_Skill_By_PkArgs = {
  id: Scalars['uuid'];
};

/** mutation root */
export type Mutation_RootDelete_ProfileArgs = {
  where: Profile_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Profile_By_PkArgs = {
  id: Scalars['uuid'];
};

/** mutation root */
export type Mutation_RootDelete_QuestArgs = {
  where: Quest_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Quest_By_PkArgs = {
  id: Scalars['uuid'];
};

/** mutation root */
export type Mutation_RootDelete_Quest_CompletionArgs = {
  where: Quest_Completion_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Quest_Completion_By_PkArgs = {
  id: Scalars['uuid'];
};

/** mutation root */
export type Mutation_RootDelete_Quest_RoleArgs = {
  where: Quest_Role_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Quest_Role_By_PkArgs = {
  questId: Scalars['uuid'];
  role: Scalars['String'];
};

/** mutation root */
export type Mutation_RootDelete_Quest_SkillArgs = {
  where: Quest_Skill_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Quest_Skill_By_PkArgs = {
  questId: Scalars['uuid'];
  skillId: Scalars['uuid'];
};

/** mutation root */
export type Mutation_RootDelete_SkillArgs = {
  where: Skill_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Skill_By_PkArgs = {
  id: Scalars['uuid'];
};

/** mutation root */
export type Mutation_RootDelete_TokenArgs = {
  where: Token_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Token_By_PkArgs = {
  address: Scalars['String'];
};

/** mutation root */
export type Mutation_RootDelete_XpArgs = {
  where: Xp_Bool_Exp;
};

/** mutation root */
export type Mutation_RootDelete_Xp_By_PkArgs = {
  id: Scalars['uuid'];
};

/** mutation root */
export type Mutation_RootInsert_AccountTypeArgs = {
  objects: Array<AccountType_Insert_Input>;
  on_conflict?: InputMaybe<AccountType_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_AccountType_OneArgs = {
  object: AccountType_Insert_Input;
  on_conflict?: InputMaybe<AccountType_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_ColorAspectArgs = {
  objects: Array<ColorAspect_Insert_Input>;
  on_conflict?: InputMaybe<ColorAspect_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_ColorAspect_OneArgs = {
  object: ColorAspect_Insert_Input;
  on_conflict?: InputMaybe<ColorAspect_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_ExplorerTypeArgs = {
  objects: Array<ExplorerType_Insert_Input>;
  on_conflict?: InputMaybe<ExplorerType_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_ExplorerType_OneArgs = {
  object: ExplorerType_Insert_Input;
  on_conflict?: InputMaybe<ExplorerType_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_GuildStatusArgs = {
  objects: Array<GuildStatus_Insert_Input>;
  on_conflict?: InputMaybe<GuildStatus_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_GuildStatus_OneArgs = {
  object: GuildStatus_Insert_Input;
  on_conflict?: InputMaybe<GuildStatus_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_GuildTypeArgs = {
  objects: Array<GuildType_Insert_Input>;
  on_conflict?: InputMaybe<GuildType_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_GuildType_OneArgs = {
  object: GuildType_Insert_Input;
  on_conflict?: InputMaybe<GuildType_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_PlayerRankArgs = {
  objects: Array<PlayerRank_Insert_Input>;
  on_conflict?: InputMaybe<PlayerRank_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_PlayerRank_OneArgs = {
  object: PlayerRank_Insert_Input;
  on_conflict?: InputMaybe<PlayerRank_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_PlayerRoleArgs = {
  objects: Array<PlayerRole_Insert_Input>;
  on_conflict?: InputMaybe<PlayerRole_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_PlayerRole_OneArgs = {
  object: PlayerRole_Insert_Input;
  on_conflict?: InputMaybe<PlayerRole_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_QuestCompletionStatusArgs = {
  objects: Array<QuestCompletionStatus_Insert_Input>;
  on_conflict?: InputMaybe<QuestCompletionStatus_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_QuestCompletionStatus_OneArgs = {
  object: QuestCompletionStatus_Insert_Input;
  on_conflict?: InputMaybe<QuestCompletionStatus_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_QuestRepetitionArgs = {
  objects: Array<QuestRepetition_Insert_Input>;
  on_conflict?: InputMaybe<QuestRepetition_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_QuestRepetition_OneArgs = {
  object: QuestRepetition_Insert_Input;
  on_conflict?: InputMaybe<QuestRepetition_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_QuestStatusArgs = {
  objects: Array<QuestStatus_Insert_Input>;
  on_conflict?: InputMaybe<QuestStatus_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_QuestStatus_OneArgs = {
  object: QuestStatus_Insert_Input;
  on_conflict?: InputMaybe<QuestStatus_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_SkillCategoryArgs = {
  objects: Array<SkillCategory_Insert_Input>;
  on_conflict?: InputMaybe<SkillCategory_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_SkillCategory_OneArgs = {
  object: SkillCategory_Insert_Input;
  on_conflict?: InputMaybe<SkillCategory_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_BalanceArgs = {
  objects: Array<Balance_Insert_Input>;
  on_conflict?: InputMaybe<Balance_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Balance_OneArgs = {
  object: Balance_Insert_Input;
  on_conflict?: InputMaybe<Balance_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_DaoArgs = {
  objects: Array<Dao_Insert_Input>;
  on_conflict?: InputMaybe<Dao_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Dao_OneArgs = {
  object: Dao_Insert_Input;
  on_conflict?: InputMaybe<Dao_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Dao_PlayerArgs = {
  objects: Array<Dao_Player_Insert_Input>;
  on_conflict?: InputMaybe<Dao_Player_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Dao_Player_OneArgs = {
  object: Dao_Player_Insert_Input;
  on_conflict?: InputMaybe<Dao_Player_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_GuildArgs = {
  objects: Array<Guild_Insert_Input>;
  on_conflict?: InputMaybe<Guild_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Guild_MetadataArgs = {
  objects: Array<Guild_Metadata_Insert_Input>;
  on_conflict?: InputMaybe<Guild_Metadata_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Guild_Metadata_OneArgs = {
  object: Guild_Metadata_Insert_Input;
  on_conflict?: InputMaybe<Guild_Metadata_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Guild_OneArgs = {
  object: Guild_Insert_Input;
  on_conflict?: InputMaybe<Guild_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Guild_PlayerArgs = {
  objects: Array<Guild_Player_Insert_Input>;
  on_conflict?: InputMaybe<Guild_Player_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Guild_Player_OneArgs = {
  object: Guild_Player_Insert_Input;
  on_conflict?: InputMaybe<Guild_Player_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_PlayerArgs = {
  objects: Array<Player_Insert_Input>;
  on_conflict?: InputMaybe<Player_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Player_AccountArgs = {
  objects: Array<Player_Account_Insert_Input>;
  on_conflict?: InputMaybe<Player_Account_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Player_Account_OneArgs = {
  object: Player_Account_Insert_Input;
  on_conflict?: InputMaybe<Player_Account_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Player_OneArgs = {
  object: Player_Insert_Input;
  on_conflict?: InputMaybe<Player_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Player_RoleArgs = {
  objects: Array<Player_Role_Insert_Input>;
  on_conflict?: InputMaybe<Player_Role_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Player_Role_OneArgs = {
  object: Player_Role_Insert_Input;
  on_conflict?: InputMaybe<Player_Role_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Player_SkillArgs = {
  objects: Array<Player_Skill_Insert_Input>;
  on_conflict?: InputMaybe<Player_Skill_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Player_Skill_OneArgs = {
  object: Player_Skill_Insert_Input;
  on_conflict?: InputMaybe<Player_Skill_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_ProfileArgs = {
  objects: Array<Profile_Insert_Input>;
  on_conflict?: InputMaybe<Profile_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Profile_OneArgs = {
  object: Profile_Insert_Input;
  on_conflict?: InputMaybe<Profile_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_QuestArgs = {
  objects: Array<Quest_Insert_Input>;
  on_conflict?: InputMaybe<Quest_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Quest_CompletionArgs = {
  objects: Array<Quest_Completion_Insert_Input>;
  on_conflict?: InputMaybe<Quest_Completion_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Quest_Completion_OneArgs = {
  object: Quest_Completion_Insert_Input;
  on_conflict?: InputMaybe<Quest_Completion_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Quest_OneArgs = {
  object: Quest_Insert_Input;
  on_conflict?: InputMaybe<Quest_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Quest_RoleArgs = {
  objects: Array<Quest_Role_Insert_Input>;
  on_conflict?: InputMaybe<Quest_Role_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Quest_Role_OneArgs = {
  object: Quest_Role_Insert_Input;
  on_conflict?: InputMaybe<Quest_Role_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Quest_SkillArgs = {
  objects: Array<Quest_Skill_Insert_Input>;
  on_conflict?: InputMaybe<Quest_Skill_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Quest_Skill_OneArgs = {
  object: Quest_Skill_Insert_Input;
  on_conflict?: InputMaybe<Quest_Skill_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_SkillArgs = {
  objects: Array<Skill_Insert_Input>;
  on_conflict?: InputMaybe<Skill_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Skill_OneArgs = {
  object: Skill_Insert_Input;
  on_conflict?: InputMaybe<Skill_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_TokenArgs = {
  objects: Array<Token_Insert_Input>;
  on_conflict?: InputMaybe<Token_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Token_OneArgs = {
  object: Token_Insert_Input;
  on_conflict?: InputMaybe<Token_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_XpArgs = {
  objects: Array<Xp_Insert_Input>;
  on_conflict?: InputMaybe<Xp_On_Conflict>;
};

/** mutation root */
export type Mutation_RootInsert_Xp_OneArgs = {
  object: Xp_Insert_Input;
  on_conflict?: InputMaybe<Xp_On_Conflict>;
};

/** mutation root */
export type Mutation_RootSaveGuildInformationArgs = {
  guildInformation: GuildInfoInput;
};

/** mutation root */
export type Mutation_RootSaveGuildLayoutArgs = {
  guildLayoutInfo: GuildLayoutInfoInput;
};

/** mutation root */
export type Mutation_RootUpdateIdxProfileArgs = {
  playerId?: InputMaybe<Scalars['uuid']>;
};

/** mutation root */
export type Mutation_RootUpdateQuestCompletionArgs = {
  updateData: UpdateQuestCompletionInput;
};

/** mutation root */
export type Mutation_RootUpdate_AccountTypeArgs = {
  _set?: InputMaybe<AccountType_Set_Input>;
  where: AccountType_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_AccountType_By_PkArgs = {
  _set?: InputMaybe<AccountType_Set_Input>;
  pk_columns: AccountType_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_ColorAspectArgs = {
  _inc?: InputMaybe<ColorAspect_Inc_Input>;
  _set?: InputMaybe<ColorAspect_Set_Input>;
  where: ColorAspect_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_ColorAspect_By_PkArgs = {
  _inc?: InputMaybe<ColorAspect_Inc_Input>;
  _set?: InputMaybe<ColorAspect_Set_Input>;
  pk_columns: ColorAspect_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_ExplorerTypeArgs = {
  _inc?: InputMaybe<ExplorerType_Inc_Input>;
  _set?: InputMaybe<ExplorerType_Set_Input>;
  where: ExplorerType_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_ExplorerType_By_PkArgs = {
  _inc?: InputMaybe<ExplorerType_Inc_Input>;
  _set?: InputMaybe<ExplorerType_Set_Input>;
  pk_columns: ExplorerType_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_GuildStatusArgs = {
  _set?: InputMaybe<GuildStatus_Set_Input>;
  where: GuildStatus_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_GuildStatus_By_PkArgs = {
  _set?: InputMaybe<GuildStatus_Set_Input>;
  pk_columns: GuildStatus_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_GuildTypeArgs = {
  _set?: InputMaybe<GuildType_Set_Input>;
  where: GuildType_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_GuildType_By_PkArgs = {
  _set?: InputMaybe<GuildType_Set_Input>;
  pk_columns: GuildType_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_PlayerRankArgs = {
  _set?: InputMaybe<PlayerRank_Set_Input>;
  where: PlayerRank_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_PlayerRank_By_PkArgs = {
  _set?: InputMaybe<PlayerRank_Set_Input>;
  pk_columns: PlayerRank_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_PlayerRoleArgs = {
  _set?: InputMaybe<PlayerRole_Set_Input>;
  where: PlayerRole_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_PlayerRole_By_PkArgs = {
  _set?: InputMaybe<PlayerRole_Set_Input>;
  pk_columns: PlayerRole_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_QuestCompletionStatusArgs = {
  _set?: InputMaybe<QuestCompletionStatus_Set_Input>;
  where: QuestCompletionStatus_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_QuestCompletionStatus_By_PkArgs = {
  _set?: InputMaybe<QuestCompletionStatus_Set_Input>;
  pk_columns: QuestCompletionStatus_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_QuestRepetitionArgs = {
  _set?: InputMaybe<QuestRepetition_Set_Input>;
  where: QuestRepetition_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_QuestRepetition_By_PkArgs = {
  _set?: InputMaybe<QuestRepetition_Set_Input>;
  pk_columns: QuestRepetition_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_QuestStatusArgs = {
  _set?: InputMaybe<QuestStatus_Set_Input>;
  where: QuestStatus_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_QuestStatus_By_PkArgs = {
  _set?: InputMaybe<QuestStatus_Set_Input>;
  pk_columns: QuestStatus_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_SkillCategoryArgs = {
  _set?: InputMaybe<SkillCategory_Set_Input>;
  where: SkillCategory_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_SkillCategory_By_PkArgs = {
  _set?: InputMaybe<SkillCategory_Set_Input>;
  pk_columns: SkillCategory_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_BalanceArgs = {
  _inc?: InputMaybe<Balance_Inc_Input>;
  _set?: InputMaybe<Balance_Set_Input>;
  where: Balance_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Balance_By_PkArgs = {
  _inc?: InputMaybe<Balance_Inc_Input>;
  _set?: InputMaybe<Balance_Set_Input>;
  pk_columns: Balance_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_DaoArgs = {
  _set?: InputMaybe<Dao_Set_Input>;
  where: Dao_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Dao_By_PkArgs = {
  _set?: InputMaybe<Dao_Set_Input>;
  pk_columns: Dao_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Dao_PlayerArgs = {
  _set?: InputMaybe<Dao_Player_Set_Input>;
  where: Dao_Player_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Dao_Player_By_PkArgs = {
  _set?: InputMaybe<Dao_Player_Set_Input>;
  pk_columns: Dao_Player_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_GuildArgs = {
  _inc?: InputMaybe<Guild_Inc_Input>;
  _set?: InputMaybe<Guild_Set_Input>;
  where: Guild_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Guild_By_PkArgs = {
  _inc?: InputMaybe<Guild_Inc_Input>;
  _set?: InputMaybe<Guild_Set_Input>;
  pk_columns: Guild_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Guild_MetadataArgs = {
  _append?: InputMaybe<Guild_Metadata_Append_Input>;
  _delete_at_path?: InputMaybe<Guild_Metadata_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Guild_Metadata_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Guild_Metadata_Delete_Key_Input>;
  _prepend?: InputMaybe<Guild_Metadata_Prepend_Input>;
  _set?: InputMaybe<Guild_Metadata_Set_Input>;
  where: Guild_Metadata_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Guild_Metadata_By_PkArgs = {
  _append?: InputMaybe<Guild_Metadata_Append_Input>;
  _delete_at_path?: InputMaybe<Guild_Metadata_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Guild_Metadata_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Guild_Metadata_Delete_Key_Input>;
  _prepend?: InputMaybe<Guild_Metadata_Prepend_Input>;
  _set?: InputMaybe<Guild_Metadata_Set_Input>;
  pk_columns: Guild_Metadata_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Guild_PlayerArgs = {
  _set?: InputMaybe<Guild_Player_Set_Input>;
  where: Guild_Player_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Guild_Player_By_PkArgs = {
  _set?: InputMaybe<Guild_Player_Set_Input>;
  pk_columns: Guild_Player_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_PlayerArgs = {
  _inc?: InputMaybe<Player_Inc_Input>;
  _set?: InputMaybe<Player_Set_Input>;
  where: Player_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Player_AccountArgs = {
  _set?: InputMaybe<Player_Account_Set_Input>;
  where: Player_Account_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Player_By_PkArgs = {
  _inc?: InputMaybe<Player_Inc_Input>;
  _set?: InputMaybe<Player_Set_Input>;
  pk_columns: Player_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Player_RoleArgs = {
  _inc?: InputMaybe<Player_Role_Inc_Input>;
  _set?: InputMaybe<Player_Role_Set_Input>;
  where: Player_Role_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Player_Role_By_PkArgs = {
  _inc?: InputMaybe<Player_Role_Inc_Input>;
  _set?: InputMaybe<Player_Role_Set_Input>;
  pk_columns: Player_Role_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Player_SkillArgs = {
  _inc?: InputMaybe<Player_Skill_Inc_Input>;
  _set?: InputMaybe<Player_Skill_Set_Input>;
  where: Player_Skill_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Player_Skill_By_PkArgs = {
  _inc?: InputMaybe<Player_Skill_Inc_Input>;
  _set?: InputMaybe<Player_Skill_Set_Input>;
  pk_columns: Player_Skill_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_ProfileArgs = {
  _inc?: InputMaybe<Profile_Inc_Input>;
  _set?: InputMaybe<Profile_Set_Input>;
  where: Profile_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Profile_By_PkArgs = {
  _inc?: InputMaybe<Profile_Inc_Input>;
  _set?: InputMaybe<Profile_Set_Input>;
  pk_columns: Profile_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_QuestArgs = {
  _inc?: InputMaybe<Quest_Inc_Input>;
  _set?: InputMaybe<Quest_Set_Input>;
  where: Quest_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Quest_By_PkArgs = {
  _inc?: InputMaybe<Quest_Inc_Input>;
  _set?: InputMaybe<Quest_Set_Input>;
  pk_columns: Quest_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Quest_CompletionArgs = {
  _set?: InputMaybe<Quest_Completion_Set_Input>;
  where: Quest_Completion_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Quest_Completion_By_PkArgs = {
  _set?: InputMaybe<Quest_Completion_Set_Input>;
  pk_columns: Quest_Completion_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Quest_RoleArgs = {
  _inc?: InputMaybe<Quest_Role_Inc_Input>;
  _set?: InputMaybe<Quest_Role_Set_Input>;
  where: Quest_Role_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Quest_Role_By_PkArgs = {
  _inc?: InputMaybe<Quest_Role_Inc_Input>;
  _set?: InputMaybe<Quest_Role_Set_Input>;
  pk_columns: Quest_Role_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_Quest_SkillArgs = {
  _set?: InputMaybe<Quest_Skill_Set_Input>;
  where: Quest_Skill_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Quest_Skill_By_PkArgs = {
  _set?: InputMaybe<Quest_Skill_Set_Input>;
  pk_columns: Quest_Skill_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_SkillArgs = {
  _set?: InputMaybe<Skill_Set_Input>;
  where: Skill_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Skill_By_PkArgs = {
  _set?: InputMaybe<Skill_Set_Input>;
  pk_columns: Skill_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_TokenArgs = {
  _inc?: InputMaybe<Token_Inc_Input>;
  _set?: InputMaybe<Token_Set_Input>;
  where: Token_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Token_By_PkArgs = {
  _inc?: InputMaybe<Token_Inc_Input>;
  _set?: InputMaybe<Token_Set_Input>;
  pk_columns: Token_Pk_Columns_Input;
};

/** mutation root */
export type Mutation_RootUpdate_XpArgs = {
  _inc?: InputMaybe<Xp_Inc_Input>;
  _set?: InputMaybe<Xp_Set_Input>;
  where: Xp_Bool_Exp;
};

/** mutation root */
export type Mutation_RootUpdate_Xp_By_PkArgs = {
  _inc?: InputMaybe<Xp_Inc_Input>;
  _set?: InputMaybe<Xp_Set_Input>;
  pk_columns: Xp_Pk_Columns_Input;
};

/** expression to compare columns of type numeric. All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['numeric']>;
  _gt?: InputMaybe<Scalars['numeric']>;
  _gte?: InputMaybe<Scalars['numeric']>;
  _in?: InputMaybe<Array<Scalars['numeric']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['numeric']>;
  _lte?: InputMaybe<Scalars['numeric']>;
  _neq?: InputMaybe<Scalars['numeric']>;
  _nin?: InputMaybe<Array<Scalars['numeric']>>;
};

/** column ordering options */
export enum Order_By {
  /** in the ascending order, nulls last */
  Asc = 'asc',
  /** in the ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in the ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in the descending order, nulls first */
  Desc = 'desc',
  /** in the descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in the descending order, nulls last */
  DescNullsLast = 'desc_nulls_last',
}

/** columns and relationships of "player" */
export type Player = {
  /** An array relationship */
  accounts: Array<Player_Account>;
  /** An aggregated array relationship */
  accounts_aggregate: Player_Account_Aggregate;
  /** Remote relationship field */
  brightid_status?: Maybe<BrightIdStatus>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  /** Remote relationship field */
  daohausMemberships: Array<Member>;
  /** An array relationship */
  daos: Array<Dao_Player>;
  /** An aggregated array relationship */
  daos_aggregate: Dao_Player_Aggregate;
  dashboardLayout?: Maybe<Scalars['String']>;
  discordId?: Maybe<Scalars['String']>;
  ethereumAddress: Scalars['String'];
  /** An array relationship */
  guilds: Array<Guild_Player>;
  /** An aggregated array relationship */
  guilds_aggregate: Guild_Player_Aggregate;
  id: Scalars['uuid'];
  /** An object relationship */
  profile?: Maybe<Profile>;
  profileLayout?: Maybe<Scalars['String']>;
  /** An array relationship */
  quest_completions: Array<Quest_Completion>;
  /** An aggregated array relationship */
  quest_completions_aggregate: Quest_Completion_Aggregate;
  /** An array relationship */
  quests: Array<Quest>;
  /** An aggregated array relationship */
  quests_aggregate: Quest_Aggregate;
  rank?: Maybe<PlayerRank_Enum>;
  role?: Maybe<Scalars['String']>;
  /** An array relationship */
  roles: Array<Player_Role>;
  /** An aggregated array relationship */
  roles_aggregate: Player_Role_Aggregate;
  seasonXP: Scalars['numeric'];
  /** An array relationship */
  skills: Array<Player_Skill>;
  /** An aggregated array relationship */
  skills_aggregate: Player_Skill_Aggregate;
  /** Remote relationship field */
  token_balances?: Maybe<TokenBalances>;
  totalXP?: Maybe<Scalars['numeric']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  /** An array relationship */
  xps: Array<Xp>;
  /** An aggregated array relationship */
  xps_aggregate: Xp_Aggregate;
};

/** columns and relationships of "player" */
export type PlayerAccountsArgs = {
  distinct_on?: InputMaybe<Array<Player_Account_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Player_Account_Order_By>>;
  where?: InputMaybe<Player_Account_Bool_Exp>;
};

/** columns and relationships of "player" */
export type PlayerAccounts_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Player_Account_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Player_Account_Order_By>>;
  where?: InputMaybe<Player_Account_Bool_Exp>;
};

/** columns and relationships of "player" */
export type PlayerDaosArgs = {
  distinct_on?: InputMaybe<Array<Dao_Player_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Dao_Player_Order_By>>;
  where?: InputMaybe<Dao_Player_Bool_Exp>;
};

/** columns and relationships of "player" */
export type PlayerDaos_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Dao_Player_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Dao_Player_Order_By>>;
  where?: InputMaybe<Dao_Player_Bool_Exp>;
};

/** columns and relationships of "player" */
export type PlayerGuildsArgs = {
  distinct_on?: InputMaybe<Array<Guild_Player_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Guild_Player_Order_By>>;
  where?: InputMaybe<Guild_Player_Bool_Exp>;
};

/** columns and relationships of "player" */
export type PlayerGuilds_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Guild_Player_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Guild_Player_Order_By>>;
  where?: InputMaybe<Guild_Player_Bool_Exp>;
};

/** columns and relationships of "player" */
export type PlayerQuest_CompletionsArgs = {
  distinct_on?: InputMaybe<Array<Quest_Completion_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quest_Completion_Order_By>>;
  where?: InputMaybe<Quest_Completion_Bool_Exp>;
};

/** columns and relationships of "player" */
export type PlayerQuest_Completions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Quest_Completion_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quest_Completion_Order_By>>;
  where?: InputMaybe<Quest_Completion_Bool_Exp>;
};

/** columns and relationships of "player" */
export type PlayerQuestsArgs = {
  distinct_on?: InputMaybe<Array<Quest_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quest_Order_By>>;
  where?: InputMaybe<Quest_Bool_Exp>;
};

/** columns and relationships of "player" */
export type PlayerQuests_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Quest_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quest_Order_By>>;
  where?: InputMaybe<Quest_Bool_Exp>;
};

/** columns and relationships of "player" */
export type PlayerRolesArgs = {
  distinct_on?: InputMaybe<Array<Player_Role_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Player_Role_Order_By>>;
  where?: InputMaybe<Player_Role_Bool_Exp>;
};

/** columns and relationships of "player" */
export type PlayerRoles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Player_Role_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Player_Role_Order_By>>;
  where?: InputMaybe<Player_Role_Bool_Exp>;
};

/** columns and relationships of "player" */
export type PlayerSkillsArgs = {
  distinct_on?: InputMaybe<Array<Player_Skill_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Player_Skill_Order_By>>;
  where?: InputMaybe<Player_Skill_Bool_Exp>;
};

/** columns and relationships of "player" */
export type PlayerSkills_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Player_Skill_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Player_Skill_Order_By>>;
  where?: InputMaybe<Player_Skill_Bool_Exp>;
};

/** columns and relationships of "player" */
export type PlayerXpsArgs = {
  distinct_on?: InputMaybe<Array<Xp_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Xp_Order_By>>;
  where?: InputMaybe<Xp_Bool_Exp>;
};

/** columns and relationships of "player" */
export type PlayerXps_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Xp_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Xp_Order_By>>;
  where?: InputMaybe<Xp_Bool_Exp>;
};

/** columns and relationships of "player_account" */
export type Player_Account = {
  /** An object relationship */
  Player: Player;
  identifier: Scalars['String'];
  playerId: Scalars['uuid'];
  type: AccountType_Enum;
};

/** aggregated selection of "player_account" */
export type Player_Account_Aggregate = {
  aggregate?: Maybe<Player_Account_Aggregate_Fields>;
  nodes: Array<Player_Account>;
};

/** aggregate fields of "player_account" */
export type Player_Account_Aggregate_Fields = {
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Player_Account_Max_Fields>;
  min?: Maybe<Player_Account_Min_Fields>;
};

/** aggregate fields of "player_account" */
export type Player_Account_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Player_Account_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "player_account" */
export type Player_Account_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Player_Account_Max_Order_By>;
  min?: InputMaybe<Player_Account_Min_Order_By>;
};

/** input type for inserting array relation for remote table "player_account" */
export type Player_Account_Arr_Rel_Insert_Input = {
  data: Array<Player_Account_Insert_Input>;
  on_conflict?: InputMaybe<Player_Account_On_Conflict>;
};

/** Boolean expression to filter rows from the table "player_account". All fields are combined with a logical 'AND'. */
export type Player_Account_Bool_Exp = {
  Player?: InputMaybe<Player_Bool_Exp>;
  _and?: InputMaybe<Array<InputMaybe<Player_Account_Bool_Exp>>>;
  _not?: InputMaybe<Player_Account_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Player_Account_Bool_Exp>>>;
  identifier?: InputMaybe<String_Comparison_Exp>;
  playerId?: InputMaybe<Uuid_Comparison_Exp>;
  type?: InputMaybe<AccountType_Enum_Comparison_Exp>;
};

/** unique or primary key constraints on table "player_account" */
export enum Player_Account_Constraint {
  /** unique or primary key constraint */
  AccountIdentifierTypeKey = 'Account_identifier_type_key',
}

/** input type for inserting data into table "player_account" */
export type Player_Account_Insert_Input = {
  Player?: InputMaybe<Player_Obj_Rel_Insert_Input>;
  identifier?: InputMaybe<Scalars['String']>;
  playerId?: InputMaybe<Scalars['uuid']>;
  type?: InputMaybe<AccountType_Enum>;
};

/** aggregate max on columns */
export type Player_Account_Max_Fields = {
  identifier?: Maybe<Scalars['String']>;
  playerId?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "player_account" */
export type Player_Account_Max_Order_By = {
  identifier?: InputMaybe<Order_By>;
  playerId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Player_Account_Min_Fields = {
  identifier?: Maybe<Scalars['String']>;
  playerId?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "player_account" */
export type Player_Account_Min_Order_By = {
  identifier?: InputMaybe<Order_By>;
  playerId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "player_account" */
export type Player_Account_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Player_Account>;
};

/** input type for inserting object relation for remote table "player_account" */
export type Player_Account_Obj_Rel_Insert_Input = {
  data: Player_Account_Insert_Input;
  on_conflict?: InputMaybe<Player_Account_On_Conflict>;
};

/** on conflict condition type for table "player_account" */
export type Player_Account_On_Conflict = {
  constraint: Player_Account_Constraint;
  update_columns: Array<Player_Account_Update_Column>;
  where?: InputMaybe<Player_Account_Bool_Exp>;
};

/** ordering options when selecting data from "player_account" */
export type Player_Account_Order_By = {
  Player?: InputMaybe<Player_Order_By>;
  identifier?: InputMaybe<Order_By>;
  playerId?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
};

/** select columns of table "player_account" */
export enum Player_Account_Select_Column {
  /** column name */
  Identifier = 'identifier',
  /** column name */
  PlayerId = 'playerId',
  /** column name */
  Type = 'type',
}

/** input type for updating data in table "player_account" */
export type Player_Account_Set_Input = {
  identifier?: InputMaybe<Scalars['String']>;
  playerId?: InputMaybe<Scalars['uuid']>;
  type?: InputMaybe<AccountType_Enum>;
};

/** update columns of table "player_account" */
export enum Player_Account_Update_Column {
  /** column name */
  Identifier = 'identifier',
  /** column name */
  PlayerId = 'playerId',
  /** column name */
  Type = 'type',
}

/** aggregated selection of "player" */
export type Player_Aggregate = {
  aggregate?: Maybe<Player_Aggregate_Fields>;
  nodes: Array<Player>;
};

/** aggregate fields of "player" */
export type Player_Aggregate_Fields = {
  avg?: Maybe<Player_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Player_Max_Fields>;
  min?: Maybe<Player_Min_Fields>;
  stddev?: Maybe<Player_Stddev_Fields>;
  stddev_pop?: Maybe<Player_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Player_Stddev_Samp_Fields>;
  sum?: Maybe<Player_Sum_Fields>;
  var_pop?: Maybe<Player_Var_Pop_Fields>;
  var_samp?: Maybe<Player_Var_Samp_Fields>;
  variance?: Maybe<Player_Variance_Fields>;
};

/** aggregate fields of "player" */
export type Player_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Player_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "player" */
export type Player_Aggregate_Order_By = {
  avg?: InputMaybe<Player_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Player_Max_Order_By>;
  min?: InputMaybe<Player_Min_Order_By>;
  stddev?: InputMaybe<Player_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Player_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Player_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Player_Sum_Order_By>;
  var_pop?: InputMaybe<Player_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Player_Var_Samp_Order_By>;
  variance?: InputMaybe<Player_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "player" */
export type Player_Arr_Rel_Insert_Input = {
  data: Array<Player_Insert_Input>;
  on_conflict?: InputMaybe<Player_On_Conflict>;
};

/** aggregate avg on columns */
export type Player_Avg_Fields = {
  seasonXP?: Maybe<Scalars['Float']>;
  totalXP?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "player" */
export type Player_Avg_Order_By = {
  seasonXP?: InputMaybe<Order_By>;
  totalXP?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "player". All fields are combined with a logical 'AND'. */
export type Player_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Player_Bool_Exp>>>;
  _not?: InputMaybe<Player_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Player_Bool_Exp>>>;
  accounts?: InputMaybe<Player_Account_Bool_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  daos?: InputMaybe<Dao_Player_Bool_Exp>;
  dashboardLayout?: InputMaybe<String_Comparison_Exp>;
  discordId?: InputMaybe<String_Comparison_Exp>;
  ethereumAddress?: InputMaybe<String_Comparison_Exp>;
  guilds?: InputMaybe<Guild_Player_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  profile?: InputMaybe<Profile_Bool_Exp>;
  profileLayout?: InputMaybe<String_Comparison_Exp>;
  quest_completions?: InputMaybe<Quest_Completion_Bool_Exp>;
  quests?: InputMaybe<Quest_Bool_Exp>;
  rank?: InputMaybe<PlayerRank_Enum_Comparison_Exp>;
  role?: InputMaybe<String_Comparison_Exp>;
  roles?: InputMaybe<Player_Role_Bool_Exp>;
  seasonXP?: InputMaybe<Numeric_Comparison_Exp>;
  skills?: InputMaybe<Player_Skill_Bool_Exp>;
  totalXP?: InputMaybe<Numeric_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  xps?: InputMaybe<Xp_Bool_Exp>;
};

/** unique or primary key constraints on table "player" */
export enum Player_Constraint {
  /** unique or primary key constraint */
  PlayerEthereumAddressUniqueKey = 'Player_ethereum_address_unique_key',
  /** unique or primary key constraint */
  PlayerPkey = 'Player_pkey',
  /** unique or primary key constraint */
  PlayerDiscordIdKey = 'player_discord_id_key',
}

/** input type for incrementing integer column in table "player" */
export type Player_Inc_Input = {
  seasonXP?: InputMaybe<Scalars['numeric']>;
  totalXP?: InputMaybe<Scalars['numeric']>;
};

/** input type for inserting data into table "player" */
export type Player_Insert_Input = {
  accounts?: InputMaybe<Player_Account_Arr_Rel_Insert_Input>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  daos?: InputMaybe<Dao_Player_Arr_Rel_Insert_Input>;
  dashboardLayout?: InputMaybe<Scalars['String']>;
  discordId?: InputMaybe<Scalars['String']>;
  ethereumAddress?: InputMaybe<Scalars['String']>;
  guilds?: InputMaybe<Guild_Player_Arr_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['uuid']>;
  profile?: InputMaybe<Profile_Obj_Rel_Insert_Input>;
  profileLayout?: InputMaybe<Scalars['String']>;
  quest_completions?: InputMaybe<Quest_Completion_Arr_Rel_Insert_Input>;
  quests?: InputMaybe<Quest_Arr_Rel_Insert_Input>;
  rank?: InputMaybe<PlayerRank_Enum>;
  role?: InputMaybe<Scalars['String']>;
  roles?: InputMaybe<Player_Role_Arr_Rel_Insert_Input>;
  seasonXP?: InputMaybe<Scalars['numeric']>;
  skills?: InputMaybe<Player_Skill_Arr_Rel_Insert_Input>;
  totalXP?: InputMaybe<Scalars['numeric']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  xps?: InputMaybe<Xp_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Player_Max_Fields = {
  createdAt?: Maybe<Scalars['timestamptz']>;
  dashboardLayout?: Maybe<Scalars['String']>;
  discordId?: Maybe<Scalars['String']>;
  ethereumAddress?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  profileLayout?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
  seasonXP?: Maybe<Scalars['numeric']>;
  totalXP?: Maybe<Scalars['numeric']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "player" */
export type Player_Max_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  dashboardLayout?: InputMaybe<Order_By>;
  discordId?: InputMaybe<Order_By>;
  ethereumAddress?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  profileLayout?: InputMaybe<Order_By>;
  role?: InputMaybe<Order_By>;
  seasonXP?: InputMaybe<Order_By>;
  totalXP?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Player_Min_Fields = {
  createdAt?: Maybe<Scalars['timestamptz']>;
  dashboardLayout?: Maybe<Scalars['String']>;
  discordId?: Maybe<Scalars['String']>;
  ethereumAddress?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  profileLayout?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
  seasonXP?: Maybe<Scalars['numeric']>;
  totalXP?: Maybe<Scalars['numeric']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "player" */
export type Player_Min_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  dashboardLayout?: InputMaybe<Order_By>;
  discordId?: InputMaybe<Order_By>;
  ethereumAddress?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  profileLayout?: InputMaybe<Order_By>;
  role?: InputMaybe<Order_By>;
  seasonXP?: InputMaybe<Order_By>;
  totalXP?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "player" */
export type Player_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Player>;
};

/** input type for inserting object relation for remote table "player" */
export type Player_Obj_Rel_Insert_Input = {
  data: Player_Insert_Input;
  on_conflict?: InputMaybe<Player_On_Conflict>;
};

/** on conflict condition type for table "player" */
export type Player_On_Conflict = {
  constraint: Player_Constraint;
  update_columns: Array<Player_Update_Column>;
  where?: InputMaybe<Player_Bool_Exp>;
};

/** ordering options when selecting data from "player" */
export type Player_Order_By = {
  accounts_aggregate?: InputMaybe<Player_Account_Aggregate_Order_By>;
  createdAt?: InputMaybe<Order_By>;
  daos_aggregate?: InputMaybe<Dao_Player_Aggregate_Order_By>;
  dashboardLayout?: InputMaybe<Order_By>;
  discordId?: InputMaybe<Order_By>;
  ethereumAddress?: InputMaybe<Order_By>;
  guilds_aggregate?: InputMaybe<Guild_Player_Aggregate_Order_By>;
  id?: InputMaybe<Order_By>;
  profile?: InputMaybe<Profile_Order_By>;
  profileLayout?: InputMaybe<Order_By>;
  quest_completions_aggregate?: InputMaybe<Quest_Completion_Aggregate_Order_By>;
  quests_aggregate?: InputMaybe<Quest_Aggregate_Order_By>;
  rank?: InputMaybe<Order_By>;
  role?: InputMaybe<Order_By>;
  roles_aggregate?: InputMaybe<Player_Role_Aggregate_Order_By>;
  seasonXP?: InputMaybe<Order_By>;
  skills_aggregate?: InputMaybe<Player_Skill_Aggregate_Order_By>;
  totalXP?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  xps_aggregate?: InputMaybe<Xp_Aggregate_Order_By>;
};

/** primary key columns input for table: "player" */
export type Player_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** columns and relationships of "player_role" */
export type Player_Role = {
  /** An object relationship */
  PlayerRole: PlayerRole;
  player_id: Scalars['uuid'];
  rank: Scalars['Int'];
  role: Scalars['String'];
};

/** aggregated selection of "player_role" */
export type Player_Role_Aggregate = {
  aggregate?: Maybe<Player_Role_Aggregate_Fields>;
  nodes: Array<Player_Role>;
};

/** aggregate fields of "player_role" */
export type Player_Role_Aggregate_Fields = {
  avg?: Maybe<Player_Role_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Player_Role_Max_Fields>;
  min?: Maybe<Player_Role_Min_Fields>;
  stddev?: Maybe<Player_Role_Stddev_Fields>;
  stddev_pop?: Maybe<Player_Role_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Player_Role_Stddev_Samp_Fields>;
  sum?: Maybe<Player_Role_Sum_Fields>;
  var_pop?: Maybe<Player_Role_Var_Pop_Fields>;
  var_samp?: Maybe<Player_Role_Var_Samp_Fields>;
  variance?: Maybe<Player_Role_Variance_Fields>;
};

/** aggregate fields of "player_role" */
export type Player_Role_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Player_Role_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "player_role" */
export type Player_Role_Aggregate_Order_By = {
  avg?: InputMaybe<Player_Role_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Player_Role_Max_Order_By>;
  min?: InputMaybe<Player_Role_Min_Order_By>;
  stddev?: InputMaybe<Player_Role_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Player_Role_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Player_Role_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Player_Role_Sum_Order_By>;
  var_pop?: InputMaybe<Player_Role_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Player_Role_Var_Samp_Order_By>;
  variance?: InputMaybe<Player_Role_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "player_role" */
export type Player_Role_Arr_Rel_Insert_Input = {
  data: Array<Player_Role_Insert_Input>;
  on_conflict?: InputMaybe<Player_Role_On_Conflict>;
};

/** aggregate avg on columns */
export type Player_Role_Avg_Fields = {
  rank?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "player_role" */
export type Player_Role_Avg_Order_By = {
  rank?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "player_role". All fields are combined with a logical 'AND'. */
export type Player_Role_Bool_Exp = {
  PlayerRole?: InputMaybe<PlayerRole_Bool_Exp>;
  _and?: InputMaybe<Array<InputMaybe<Player_Role_Bool_Exp>>>;
  _not?: InputMaybe<Player_Role_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Player_Role_Bool_Exp>>>;
  player_id?: InputMaybe<Uuid_Comparison_Exp>;
  rank?: InputMaybe<Int_Comparison_Exp>;
  role?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "player_role" */
export enum Player_Role_Constraint {
  /** unique or primary key constraint */
  PlayerRolePkey = 'player_role_pkey',
}

/** input type for incrementing integer column in table "player_role" */
export type Player_Role_Inc_Input = {
  rank?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "player_role" */
export type Player_Role_Insert_Input = {
  PlayerRole?: InputMaybe<PlayerRole_Obj_Rel_Insert_Input>;
  player_id?: InputMaybe<Scalars['uuid']>;
  rank?: InputMaybe<Scalars['Int']>;
  role?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Player_Role_Max_Fields = {
  player_id?: Maybe<Scalars['uuid']>;
  rank?: Maybe<Scalars['Int']>;
  role?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "player_role" */
export type Player_Role_Max_Order_By = {
  player_id?: InputMaybe<Order_By>;
  rank?: InputMaybe<Order_By>;
  role?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Player_Role_Min_Fields = {
  player_id?: Maybe<Scalars['uuid']>;
  rank?: Maybe<Scalars['Int']>;
  role?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "player_role" */
export type Player_Role_Min_Order_By = {
  player_id?: InputMaybe<Order_By>;
  rank?: InputMaybe<Order_By>;
  role?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "player_role" */
export type Player_Role_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Player_Role>;
};

/** input type for inserting object relation for remote table "player_role" */
export type Player_Role_Obj_Rel_Insert_Input = {
  data: Player_Role_Insert_Input;
  on_conflict?: InputMaybe<Player_Role_On_Conflict>;
};

/** on conflict condition type for table "player_role" */
export type Player_Role_On_Conflict = {
  constraint: Player_Role_Constraint;
  update_columns: Array<Player_Role_Update_Column>;
  where?: InputMaybe<Player_Role_Bool_Exp>;
};

/** ordering options when selecting data from "player_role" */
export type Player_Role_Order_By = {
  PlayerRole?: InputMaybe<PlayerRole_Order_By>;
  player_id?: InputMaybe<Order_By>;
  rank?: InputMaybe<Order_By>;
  role?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "player_role" */
export type Player_Role_Pk_Columns_Input = {
  player_id: Scalars['uuid'];
  role: Scalars['String'];
};

/** select columns of table "player_role" */
export enum Player_Role_Select_Column {
  /** column name */
  PlayerId = 'player_id',
  /** column name */
  Rank = 'rank',
  /** column name */
  Role = 'role',
}

/** input type for updating data in table "player_role" */
export type Player_Role_Set_Input = {
  player_id?: InputMaybe<Scalars['uuid']>;
  rank?: InputMaybe<Scalars['Int']>;
  role?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Player_Role_Stddev_Fields = {
  rank?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "player_role" */
export type Player_Role_Stddev_Order_By = {
  rank?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Player_Role_Stddev_Pop_Fields = {
  rank?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "player_role" */
export type Player_Role_Stddev_Pop_Order_By = {
  rank?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Player_Role_Stddev_Samp_Fields = {
  rank?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "player_role" */
export type Player_Role_Stddev_Samp_Order_By = {
  rank?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Player_Role_Sum_Fields = {
  rank?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "player_role" */
export type Player_Role_Sum_Order_By = {
  rank?: InputMaybe<Order_By>;
};

/** update columns of table "player_role" */
export enum Player_Role_Update_Column {
  /** column name */
  PlayerId = 'player_id',
  /** column name */
  Rank = 'rank',
  /** column name */
  Role = 'role',
}

/** aggregate var_pop on columns */
export type Player_Role_Var_Pop_Fields = {
  rank?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "player_role" */
export type Player_Role_Var_Pop_Order_By = {
  rank?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Player_Role_Var_Samp_Fields = {
  rank?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "player_role" */
export type Player_Role_Var_Samp_Order_By = {
  rank?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Player_Role_Variance_Fields = {
  rank?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "player_role" */
export type Player_Role_Variance_Order_By = {
  rank?: InputMaybe<Order_By>;
};

/** select columns of table "player" */
export enum Player_Select_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  DashboardLayout = 'dashboardLayout',
  /** column name */
  DiscordId = 'discordId',
  /** column name */
  EthereumAddress = 'ethereumAddress',
  /** column name */
  Id = 'id',
  /** column name */
  ProfileLayout = 'profileLayout',
  /** column name */
  Rank = 'rank',
  /** column name */
  Role = 'role',
  /** column name */
  SeasonXp = 'seasonXP',
  /** column name */
  TotalXp = 'totalXP',
  /** column name */
  UpdatedAt = 'updatedAt',
}

/** input type for updating data in table "player" */
export type Player_Set_Input = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  dashboardLayout?: InputMaybe<Scalars['String']>;
  discordId?: InputMaybe<Scalars['String']>;
  ethereumAddress?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  profileLayout?: InputMaybe<Scalars['String']>;
  rank?: InputMaybe<PlayerRank_Enum>;
  role?: InputMaybe<Scalars['String']>;
  seasonXP?: InputMaybe<Scalars['numeric']>;
  totalXP?: InputMaybe<Scalars['numeric']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** columns and relationships of "player_skill" */
export type Player_Skill = {
  /** An object relationship */
  Skill: Skill;
  id: Scalars['uuid'];
  player_id: Scalars['uuid'];
  rank?: Maybe<Scalars['Int']>;
  skill_id: Scalars['uuid'];
};

/** aggregated selection of "player_skill" */
export type Player_Skill_Aggregate = {
  aggregate?: Maybe<Player_Skill_Aggregate_Fields>;
  nodes: Array<Player_Skill>;
};

/** aggregate fields of "player_skill" */
export type Player_Skill_Aggregate_Fields = {
  avg?: Maybe<Player_Skill_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Player_Skill_Max_Fields>;
  min?: Maybe<Player_Skill_Min_Fields>;
  stddev?: Maybe<Player_Skill_Stddev_Fields>;
  stddev_pop?: Maybe<Player_Skill_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Player_Skill_Stddev_Samp_Fields>;
  sum?: Maybe<Player_Skill_Sum_Fields>;
  var_pop?: Maybe<Player_Skill_Var_Pop_Fields>;
  var_samp?: Maybe<Player_Skill_Var_Samp_Fields>;
  variance?: Maybe<Player_Skill_Variance_Fields>;
};

/** aggregate fields of "player_skill" */
export type Player_Skill_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Player_Skill_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "player_skill" */
export type Player_Skill_Aggregate_Order_By = {
  avg?: InputMaybe<Player_Skill_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Player_Skill_Max_Order_By>;
  min?: InputMaybe<Player_Skill_Min_Order_By>;
  stddev?: InputMaybe<Player_Skill_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Player_Skill_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Player_Skill_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Player_Skill_Sum_Order_By>;
  var_pop?: InputMaybe<Player_Skill_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Player_Skill_Var_Samp_Order_By>;
  variance?: InputMaybe<Player_Skill_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "player_skill" */
export type Player_Skill_Arr_Rel_Insert_Input = {
  data: Array<Player_Skill_Insert_Input>;
  on_conflict?: InputMaybe<Player_Skill_On_Conflict>;
};

/** aggregate avg on columns */
export type Player_Skill_Avg_Fields = {
  rank?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "player_skill" */
export type Player_Skill_Avg_Order_By = {
  rank?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "player_skill". All fields are combined with a logical 'AND'. */
export type Player_Skill_Bool_Exp = {
  Skill?: InputMaybe<Skill_Bool_Exp>;
  _and?: InputMaybe<Array<InputMaybe<Player_Skill_Bool_Exp>>>;
  _not?: InputMaybe<Player_Skill_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Player_Skill_Bool_Exp>>>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  player_id?: InputMaybe<Uuid_Comparison_Exp>;
  rank?: InputMaybe<Int_Comparison_Exp>;
  skill_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "player_skill" */
export enum Player_Skill_Constraint {
  /** unique or primary key constraint */
  PlayerSkillPkey = 'player_skill_pkey',
  /** unique or primary key constraint */
  PlayerSkillPlayerIdSkillIdKey = 'player_skill_player_id_skill_id_key',
}

/** input type for incrementing integer column in table "player_skill" */
export type Player_Skill_Inc_Input = {
  rank?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "player_skill" */
export type Player_Skill_Insert_Input = {
  Skill?: InputMaybe<Skill_Obj_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['uuid']>;
  player_id?: InputMaybe<Scalars['uuid']>;
  rank?: InputMaybe<Scalars['Int']>;
  skill_id?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Player_Skill_Max_Fields = {
  id?: Maybe<Scalars['uuid']>;
  player_id?: Maybe<Scalars['uuid']>;
  rank?: Maybe<Scalars['Int']>;
  skill_id?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "player_skill" */
export type Player_Skill_Max_Order_By = {
  id?: InputMaybe<Order_By>;
  player_id?: InputMaybe<Order_By>;
  rank?: InputMaybe<Order_By>;
  skill_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Player_Skill_Min_Fields = {
  id?: Maybe<Scalars['uuid']>;
  player_id?: Maybe<Scalars['uuid']>;
  rank?: Maybe<Scalars['Int']>;
  skill_id?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "player_skill" */
export type Player_Skill_Min_Order_By = {
  id?: InputMaybe<Order_By>;
  player_id?: InputMaybe<Order_By>;
  rank?: InputMaybe<Order_By>;
  skill_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "player_skill" */
export type Player_Skill_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Player_Skill>;
};

/** input type for inserting object relation for remote table "player_skill" */
export type Player_Skill_Obj_Rel_Insert_Input = {
  data: Player_Skill_Insert_Input;
  on_conflict?: InputMaybe<Player_Skill_On_Conflict>;
};

/** on conflict condition type for table "player_skill" */
export type Player_Skill_On_Conflict = {
  constraint: Player_Skill_Constraint;
  update_columns: Array<Player_Skill_Update_Column>;
  where?: InputMaybe<Player_Skill_Bool_Exp>;
};

/** ordering options when selecting data from "player_skill" */
export type Player_Skill_Order_By = {
  Skill?: InputMaybe<Skill_Order_By>;
  id?: InputMaybe<Order_By>;
  player_id?: InputMaybe<Order_By>;
  rank?: InputMaybe<Order_By>;
  skill_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "player_skill" */
export type Player_Skill_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "player_skill" */
export enum Player_Skill_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  PlayerId = 'player_id',
  /** column name */
  Rank = 'rank',
  /** column name */
  SkillId = 'skill_id',
}

/** input type for updating data in table "player_skill" */
export type Player_Skill_Set_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  player_id?: InputMaybe<Scalars['uuid']>;
  rank?: InputMaybe<Scalars['Int']>;
  skill_id?: InputMaybe<Scalars['uuid']>;
};

/** aggregate stddev on columns */
export type Player_Skill_Stddev_Fields = {
  rank?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "player_skill" */
export type Player_Skill_Stddev_Order_By = {
  rank?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Player_Skill_Stddev_Pop_Fields = {
  rank?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "player_skill" */
export type Player_Skill_Stddev_Pop_Order_By = {
  rank?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Player_Skill_Stddev_Samp_Fields = {
  rank?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "player_skill" */
export type Player_Skill_Stddev_Samp_Order_By = {
  rank?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Player_Skill_Sum_Fields = {
  rank?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "player_skill" */
export type Player_Skill_Sum_Order_By = {
  rank?: InputMaybe<Order_By>;
};

/** update columns of table "player_skill" */
export enum Player_Skill_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  PlayerId = 'player_id',
  /** column name */
  Rank = 'rank',
  /** column name */
  SkillId = 'skill_id',
}

/** aggregate var_pop on columns */
export type Player_Skill_Var_Pop_Fields = {
  rank?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "player_skill" */
export type Player_Skill_Var_Pop_Order_By = {
  rank?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Player_Skill_Var_Samp_Fields = {
  rank?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "player_skill" */
export type Player_Skill_Var_Samp_Order_By = {
  rank?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Player_Skill_Variance_Fields = {
  rank?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "player_skill" */
export type Player_Skill_Variance_Order_By = {
  rank?: InputMaybe<Order_By>;
};

/** aggregate stddev on columns */
export type Player_Stddev_Fields = {
  seasonXP?: Maybe<Scalars['Float']>;
  totalXP?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "player" */
export type Player_Stddev_Order_By = {
  seasonXP?: InputMaybe<Order_By>;
  totalXP?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Player_Stddev_Pop_Fields = {
  seasonXP?: Maybe<Scalars['Float']>;
  totalXP?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "player" */
export type Player_Stddev_Pop_Order_By = {
  seasonXP?: InputMaybe<Order_By>;
  totalXP?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Player_Stddev_Samp_Fields = {
  seasonXP?: Maybe<Scalars['Float']>;
  totalXP?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "player" */
export type Player_Stddev_Samp_Order_By = {
  seasonXP?: InputMaybe<Order_By>;
  totalXP?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Player_Sum_Fields = {
  seasonXP?: Maybe<Scalars['numeric']>;
  totalXP?: Maybe<Scalars['numeric']>;
};

/** order by sum() on columns of table "player" */
export type Player_Sum_Order_By = {
  seasonXP?: InputMaybe<Order_By>;
  totalXP?: InputMaybe<Order_By>;
};

/** update columns of table "player" */
export enum Player_Update_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  DashboardLayout = 'dashboardLayout',
  /** column name */
  DiscordId = 'discordId',
  /** column name */
  EthereumAddress = 'ethereumAddress',
  /** column name */
  Id = 'id',
  /** column name */
  ProfileLayout = 'profileLayout',
  /** column name */
  Rank = 'rank',
  /** column name */
  Role = 'role',
  /** column name */
  SeasonXp = 'seasonXP',
  /** column name */
  TotalXp = 'totalXP',
  /** column name */
  UpdatedAt = 'updatedAt',
}

/** aggregate var_pop on columns */
export type Player_Var_Pop_Fields = {
  seasonXP?: Maybe<Scalars['Float']>;
  totalXP?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "player" */
export type Player_Var_Pop_Order_By = {
  seasonXP?: InputMaybe<Order_By>;
  totalXP?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Player_Var_Samp_Fields = {
  seasonXP?: Maybe<Scalars['Float']>;
  totalXP?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "player" */
export type Player_Var_Samp_Order_By = {
  seasonXP?: InputMaybe<Order_By>;
  totalXP?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Player_Variance_Fields = {
  seasonXP?: Maybe<Scalars['Float']>;
  totalXP?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "player" */
export type Player_Variance_Order_By = {
  seasonXP?: InputMaybe<Order_By>;
  totalXP?: InputMaybe<Order_By>;
};

/** columns and relationships of "profile" */
export type Profile = {
  availableHours?: Maybe<Scalars['Int']>;
  backgroundImageURL?: Maybe<Scalars['String']>;
  bannerImageURL?: Maybe<Scalars['String']>;
  /** An object relationship */
  colorAspect?: Maybe<ColorAspect>;
  colorMask?: Maybe<Scalars['Int']>;
  countryCode?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  emoji?: Maybe<Scalars['String']>;
  /** An object relationship */
  explorerType?: Maybe<ExplorerType>;
  explorerTypeTitle?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  id: Scalars['uuid'];
  lastCheckedAt?: Maybe<Scalars['timestamptz']>;
  location?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  /** An object relationship */
  player: Player;
  playerId: Scalars['uuid'];
  profileImageURL?: Maybe<Scalars['String']>;
  pronouns?: Maybe<Scalars['String']>;
  timeZone?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
};

/** aggregated selection of "profile" */
export type Profile_Aggregate = {
  aggregate?: Maybe<Profile_Aggregate_Fields>;
  nodes: Array<Profile>;
};

/** aggregate fields of "profile" */
export type Profile_Aggregate_Fields = {
  avg?: Maybe<Profile_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Profile_Max_Fields>;
  min?: Maybe<Profile_Min_Fields>;
  stddev?: Maybe<Profile_Stddev_Fields>;
  stddev_pop?: Maybe<Profile_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Profile_Stddev_Samp_Fields>;
  sum?: Maybe<Profile_Sum_Fields>;
  var_pop?: Maybe<Profile_Var_Pop_Fields>;
  var_samp?: Maybe<Profile_Var_Samp_Fields>;
  variance?: Maybe<Profile_Variance_Fields>;
};

/** aggregate fields of "profile" */
export type Profile_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Profile_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "profile" */
export type Profile_Aggregate_Order_By = {
  avg?: InputMaybe<Profile_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Profile_Max_Order_By>;
  min?: InputMaybe<Profile_Min_Order_By>;
  stddev?: InputMaybe<Profile_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Profile_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Profile_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Profile_Sum_Order_By>;
  var_pop?: InputMaybe<Profile_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Profile_Var_Samp_Order_By>;
  variance?: InputMaybe<Profile_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "profile" */
export type Profile_Arr_Rel_Insert_Input = {
  data: Array<Profile_Insert_Input>;
  on_conflict?: InputMaybe<Profile_On_Conflict>;
};

/** aggregate avg on columns */
export type Profile_Avg_Fields = {
  availableHours?: Maybe<Scalars['Float']>;
  colorMask?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "profile" */
export type Profile_Avg_Order_By = {
  availableHours?: InputMaybe<Order_By>;
  colorMask?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "profile". All fields are combined with a logical 'AND'. */
export type Profile_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Profile_Bool_Exp>>>;
  _not?: InputMaybe<Profile_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Profile_Bool_Exp>>>;
  availableHours?: InputMaybe<Int_Comparison_Exp>;
  backgroundImageURL?: InputMaybe<String_Comparison_Exp>;
  bannerImageURL?: InputMaybe<String_Comparison_Exp>;
  colorAspect?: InputMaybe<ColorAspect_Bool_Exp>;
  colorMask?: InputMaybe<Int_Comparison_Exp>;
  countryCode?: InputMaybe<String_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  emoji?: InputMaybe<String_Comparison_Exp>;
  explorerType?: InputMaybe<ExplorerType_Bool_Exp>;
  explorerTypeTitle?: InputMaybe<String_Comparison_Exp>;
  gender?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  lastCheckedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  location?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  player?: InputMaybe<Player_Bool_Exp>;
  playerId?: InputMaybe<Uuid_Comparison_Exp>;
  profileImageURL?: InputMaybe<String_Comparison_Exp>;
  pronouns?: InputMaybe<String_Comparison_Exp>;
  timeZone?: InputMaybe<String_Comparison_Exp>;
  username?: InputMaybe<String_Comparison_Exp>;
  website?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "profile" */
export enum Profile_Constraint {
  /** unique or primary key constraint */
  ProfileCachePkey = 'profile_cache_pkey',
  /** unique or primary key constraint */
  ProfileIdKey = 'profile_id_key',
  /** unique or primary key constraint */
  ProfilePlayerIdKey = 'profile_player_id_key',
  /** unique or primary key constraint */
  ProfileUsernameKey = 'profile_username_key',
  /** unique or primary key constraint */
  UsernameInsensitiveUniqueIdx = 'username_insensitive_unique_idx',
}

/** input type for incrementing integer column in table "profile" */
export type Profile_Inc_Input = {
  availableHours?: InputMaybe<Scalars['Int']>;
  colorMask?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "profile" */
export type Profile_Insert_Input = {
  availableHours?: InputMaybe<Scalars['Int']>;
  backgroundImageURL?: InputMaybe<Scalars['String']>;
  bannerImageURL?: InputMaybe<Scalars['String']>;
  colorAspect?: InputMaybe<ColorAspect_Obj_Rel_Insert_Input>;
  colorMask?: InputMaybe<Scalars['Int']>;
  countryCode?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  emoji?: InputMaybe<Scalars['String']>;
  explorerType?: InputMaybe<ExplorerType_Obj_Rel_Insert_Input>;
  explorerTypeTitle?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  lastCheckedAt?: InputMaybe<Scalars['timestamptz']>;
  location?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  player?: InputMaybe<Player_Obj_Rel_Insert_Input>;
  playerId?: InputMaybe<Scalars['uuid']>;
  profileImageURL?: InputMaybe<Scalars['String']>;
  pronouns?: InputMaybe<Scalars['String']>;
  timeZone?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
  website?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Profile_Max_Fields = {
  availableHours?: Maybe<Scalars['Int']>;
  backgroundImageURL?: Maybe<Scalars['String']>;
  bannerImageURL?: Maybe<Scalars['String']>;
  colorMask?: Maybe<Scalars['Int']>;
  countryCode?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  emoji?: Maybe<Scalars['String']>;
  explorerTypeTitle?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  lastCheckedAt?: Maybe<Scalars['timestamptz']>;
  location?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  playerId?: Maybe<Scalars['uuid']>;
  profileImageURL?: Maybe<Scalars['String']>;
  pronouns?: Maybe<Scalars['String']>;
  timeZone?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "profile" */
export type Profile_Max_Order_By = {
  availableHours?: InputMaybe<Order_By>;
  backgroundImageURL?: InputMaybe<Order_By>;
  bannerImageURL?: InputMaybe<Order_By>;
  colorMask?: InputMaybe<Order_By>;
  countryCode?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  emoji?: InputMaybe<Order_By>;
  explorerTypeTitle?: InputMaybe<Order_By>;
  gender?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  lastCheckedAt?: InputMaybe<Order_By>;
  location?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  playerId?: InputMaybe<Order_By>;
  profileImageURL?: InputMaybe<Order_By>;
  pronouns?: InputMaybe<Order_By>;
  timeZone?: InputMaybe<Order_By>;
  username?: InputMaybe<Order_By>;
  website?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Profile_Min_Fields = {
  availableHours?: Maybe<Scalars['Int']>;
  backgroundImageURL?: Maybe<Scalars['String']>;
  bannerImageURL?: Maybe<Scalars['String']>;
  colorMask?: Maybe<Scalars['Int']>;
  countryCode?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  emoji?: Maybe<Scalars['String']>;
  explorerTypeTitle?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  lastCheckedAt?: Maybe<Scalars['timestamptz']>;
  location?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  playerId?: Maybe<Scalars['uuid']>;
  profileImageURL?: Maybe<Scalars['String']>;
  pronouns?: Maybe<Scalars['String']>;
  timeZone?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "profile" */
export type Profile_Min_Order_By = {
  availableHours?: InputMaybe<Order_By>;
  backgroundImageURL?: InputMaybe<Order_By>;
  bannerImageURL?: InputMaybe<Order_By>;
  colorMask?: InputMaybe<Order_By>;
  countryCode?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  emoji?: InputMaybe<Order_By>;
  explorerTypeTitle?: InputMaybe<Order_By>;
  gender?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  lastCheckedAt?: InputMaybe<Order_By>;
  location?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  playerId?: InputMaybe<Order_By>;
  profileImageURL?: InputMaybe<Order_By>;
  pronouns?: InputMaybe<Order_By>;
  timeZone?: InputMaybe<Order_By>;
  username?: InputMaybe<Order_By>;
  website?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "profile" */
export type Profile_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Profile>;
};

/** input type for inserting object relation for remote table "profile" */
export type Profile_Obj_Rel_Insert_Input = {
  data: Profile_Insert_Input;
  on_conflict?: InputMaybe<Profile_On_Conflict>;
};

/** on conflict condition type for table "profile" */
export type Profile_On_Conflict = {
  constraint: Profile_Constraint;
  update_columns: Array<Profile_Update_Column>;
  where?: InputMaybe<Profile_Bool_Exp>;
};

/** ordering options when selecting data from "profile" */
export type Profile_Order_By = {
  availableHours?: InputMaybe<Order_By>;
  backgroundImageURL?: InputMaybe<Order_By>;
  bannerImageURL?: InputMaybe<Order_By>;
  colorAspect?: InputMaybe<ColorAspect_Order_By>;
  colorMask?: InputMaybe<Order_By>;
  countryCode?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  emoji?: InputMaybe<Order_By>;
  explorerType?: InputMaybe<ExplorerType_Order_By>;
  explorerTypeTitle?: InputMaybe<Order_By>;
  gender?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  lastCheckedAt?: InputMaybe<Order_By>;
  location?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  player?: InputMaybe<Player_Order_By>;
  playerId?: InputMaybe<Order_By>;
  profileImageURL?: InputMaybe<Order_By>;
  pronouns?: InputMaybe<Order_By>;
  timeZone?: InputMaybe<Order_By>;
  username?: InputMaybe<Order_By>;
  website?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "profile" */
export type Profile_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "profile" */
export enum Profile_Select_Column {
  /** column name */
  AvailableHours = 'availableHours',
  /** column name */
  BackgroundImageUrl = 'backgroundImageURL',
  /** column name */
  BannerImageUrl = 'bannerImageURL',
  /** column name */
  ColorMask = 'colorMask',
  /** column name */
  CountryCode = 'countryCode',
  /** column name */
  Description = 'description',
  /** column name */
  Emoji = 'emoji',
  /** column name */
  ExplorerTypeTitle = 'explorerTypeTitle',
  /** column name */
  Gender = 'gender',
  /** column name */
  Id = 'id',
  /** column name */
  LastCheckedAt = 'lastCheckedAt',
  /** column name */
  Location = 'location',
  /** column name */
  Name = 'name',
  /** column name */
  PlayerId = 'playerId',
  /** column name */
  ProfileImageUrl = 'profileImageURL',
  /** column name */
  Pronouns = 'pronouns',
  /** column name */
  TimeZone = 'timeZone',
  /** column name */
  Username = 'username',
  /** column name */
  Website = 'website',
}

/** input type for updating data in table "profile" */
export type Profile_Set_Input = {
  availableHours?: InputMaybe<Scalars['Int']>;
  backgroundImageURL?: InputMaybe<Scalars['String']>;
  bannerImageURL?: InputMaybe<Scalars['String']>;
  colorMask?: InputMaybe<Scalars['Int']>;
  countryCode?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  emoji?: InputMaybe<Scalars['String']>;
  explorerTypeTitle?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  lastCheckedAt?: InputMaybe<Scalars['timestamptz']>;
  location?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  playerId?: InputMaybe<Scalars['uuid']>;
  profileImageURL?: InputMaybe<Scalars['String']>;
  pronouns?: InputMaybe<Scalars['String']>;
  timeZone?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
  website?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Profile_Stddev_Fields = {
  availableHours?: Maybe<Scalars['Float']>;
  colorMask?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "profile" */
export type Profile_Stddev_Order_By = {
  availableHours?: InputMaybe<Order_By>;
  colorMask?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Profile_Stddev_Pop_Fields = {
  availableHours?: Maybe<Scalars['Float']>;
  colorMask?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "profile" */
export type Profile_Stddev_Pop_Order_By = {
  availableHours?: InputMaybe<Order_By>;
  colorMask?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Profile_Stddev_Samp_Fields = {
  availableHours?: Maybe<Scalars['Float']>;
  colorMask?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "profile" */
export type Profile_Stddev_Samp_Order_By = {
  availableHours?: InputMaybe<Order_By>;
  colorMask?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Profile_Sum_Fields = {
  availableHours?: Maybe<Scalars['Int']>;
  colorMask?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "profile" */
export type Profile_Sum_Order_By = {
  availableHours?: InputMaybe<Order_By>;
  colorMask?: InputMaybe<Order_By>;
};

/** update columns of table "profile" */
export enum Profile_Update_Column {
  /** column name */
  AvailableHours = 'availableHours',
  /** column name */
  BackgroundImageUrl = 'backgroundImageURL',
  /** column name */
  BannerImageUrl = 'bannerImageURL',
  /** column name */
  ColorMask = 'colorMask',
  /** column name */
  CountryCode = 'countryCode',
  /** column name */
  Description = 'description',
  /** column name */
  Emoji = 'emoji',
  /** column name */
  ExplorerTypeTitle = 'explorerTypeTitle',
  /** column name */
  Gender = 'gender',
  /** column name */
  Id = 'id',
  /** column name */
  LastCheckedAt = 'lastCheckedAt',
  /** column name */
  Location = 'location',
  /** column name */
  Name = 'name',
  /** column name */
  PlayerId = 'playerId',
  /** column name */
  ProfileImageUrl = 'profileImageURL',
  /** column name */
  Pronouns = 'pronouns',
  /** column name */
  TimeZone = 'timeZone',
  /** column name */
  Username = 'username',
  /** column name */
  Website = 'website',
}

/** aggregate var_pop on columns */
export type Profile_Var_Pop_Fields = {
  availableHours?: Maybe<Scalars['Float']>;
  colorMask?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "profile" */
export type Profile_Var_Pop_Order_By = {
  availableHours?: InputMaybe<Order_By>;
  colorMask?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Profile_Var_Samp_Fields = {
  availableHours?: Maybe<Scalars['Float']>;
  colorMask?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "profile" */
export type Profile_Var_Samp_Order_By = {
  availableHours?: InputMaybe<Order_By>;
  colorMask?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Profile_Variance_Fields = {
  availableHours?: Maybe<Scalars['Float']>;
  colorMask?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "profile" */
export type Profile_Variance_Order_By = {
  availableHours?: InputMaybe<Order_By>;
  colorMask?: InputMaybe<Order_By>;
};

/** query root */
export type Query_Root = {
  /** fetch data from the table: "AccountType" */
  AccountType: Array<AccountType>;
  /** fetch aggregated fields from the table: "AccountType" */
  AccountType_aggregate: AccountType_Aggregate;
  /** fetch data from the table: "AccountType" using primary key columns */
  AccountType_by_pk?: Maybe<AccountType>;
  /** fetch data from the table: "ColorAspect" */
  ColorAspect: Array<ColorAspect>;
  /** fetch aggregated fields from the table: "ColorAspect" */
  ColorAspect_aggregate: ColorAspect_Aggregate;
  /** fetch data from the table: "ColorAspect" using primary key columns */
  ColorAspect_by_pk?: Maybe<ColorAspect>;
  /** fetch data from the table: "ExplorerType" */
  ExplorerType: Array<ExplorerType>;
  /** fetch aggregated fields from the table: "ExplorerType" */
  ExplorerType_aggregate: ExplorerType_Aggregate;
  /** fetch data from the table: "ExplorerType" using primary key columns */
  ExplorerType_by_pk?: Maybe<ExplorerType>;
  /** fetch data from the table: "GuildStatus" */
  GuildStatus: Array<GuildStatus>;
  /** fetch aggregated fields from the table: "GuildStatus" */
  GuildStatus_aggregate: GuildStatus_Aggregate;
  /** fetch data from the table: "GuildStatus" using primary key columns */
  GuildStatus_by_pk?: Maybe<GuildStatus>;
  /** fetch data from the table: "GuildType" */
  GuildType: Array<GuildType>;
  /** fetch aggregated fields from the table: "GuildType" */
  GuildType_aggregate: GuildType_Aggregate;
  /** fetch data from the table: "GuildType" using primary key columns */
  GuildType_by_pk?: Maybe<GuildType>;
  /** fetch data from the table: "PlayerRank" */
  PlayerRank: Array<PlayerRank>;
  /** fetch aggregated fields from the table: "PlayerRank" */
  PlayerRank_aggregate: PlayerRank_Aggregate;
  /** fetch data from the table: "PlayerRank" using primary key columns */
  PlayerRank_by_pk?: Maybe<PlayerRank>;
  /** fetch data from the table: "PlayerRole" */
  PlayerRole: Array<PlayerRole>;
  /** fetch aggregated fields from the table: "PlayerRole" */
  PlayerRole_aggregate: PlayerRole_Aggregate;
  /** fetch data from the table: "PlayerRole" using primary key columns */
  PlayerRole_by_pk?: Maybe<PlayerRole>;
  /** fetch data from the table: "QuestCompletionStatus" */
  QuestCompletionStatus: Array<QuestCompletionStatus>;
  /** fetch aggregated fields from the table: "QuestCompletionStatus" */
  QuestCompletionStatus_aggregate: QuestCompletionStatus_Aggregate;
  /** fetch data from the table: "QuestCompletionStatus" using primary key columns */
  QuestCompletionStatus_by_pk?: Maybe<QuestCompletionStatus>;
  /** fetch data from the table: "QuestRepetition" */
  QuestRepetition: Array<QuestRepetition>;
  /** fetch aggregated fields from the table: "QuestRepetition" */
  QuestRepetition_aggregate: QuestRepetition_Aggregate;
  /** fetch data from the table: "QuestRepetition" using primary key columns */
  QuestRepetition_by_pk?: Maybe<QuestRepetition>;
  /** fetch data from the table: "QuestStatus" */
  QuestStatus: Array<QuestStatus>;
  /** fetch aggregated fields from the table: "QuestStatus" */
  QuestStatus_aggregate: QuestStatus_Aggregate;
  /** fetch data from the table: "QuestStatus" using primary key columns */
  QuestStatus_by_pk?: Maybe<QuestStatus>;
  /** fetch data from the table: "SkillCategory" */
  SkillCategory: Array<SkillCategory>;
  /** fetch aggregated fields from the table: "SkillCategory" */
  SkillCategory_aggregate: SkillCategory_Aggregate;
  /** fetch data from the table: "SkillCategory" using primary key columns */
  SkillCategory_by_pk?: Maybe<SkillCategory>;
  /** fetch data from the table: "balance" */
  balance: Array<Balance>;
  /** fetch aggregated fields from the table: "balance" */
  balance_aggregate: Balance_Aggregate;
  /** fetch data from the table: "balance" using primary key columns */
  balance_by_pk?: Maybe<Balance>;
  /** fetch data from the table: "dao" */
  dao: Array<Dao>;
  /** fetch aggregated fields from the table: "dao" */
  dao_aggregate: Dao_Aggregate;
  /** fetch data from the table: "dao" using primary key columns */
  dao_by_pk?: Maybe<Dao>;
  /** fetch data from the table: "dao_player" */
  dao_player: Array<Dao_Player>;
  /** fetch aggregated fields from the table: "dao_player" */
  dao_player_aggregate: Dao_Player_Aggregate;
  /** fetch data from the table: "dao_player" using primary key columns */
  dao_player_by_pk?: Maybe<Dao_Player>;
  getBrightIdStatus?: Maybe<BrightIdStatus>;
  getDaoHausMemberships: Array<Member>;
  getDiscordServerMemberRoles: Array<DiscordRole>;
  getGuildDiscordAnnouncements?: Maybe<Array<Scalars['String']>>;
  getGuildDiscordRoles: Array<DiscordRole>;
  getPSeedInfo?: Maybe<PSeedInfo>;
  getTokenBalances?: Maybe<TokenBalances>;
  getTopPSeedHolders?: Maybe<Array<TokenBalances>>;
  /** fetch data from the table: "guild" */
  guild: Array<Guild>;
  /** fetch aggregated fields from the table: "guild" */
  guild_aggregate: Guild_Aggregate;
  /** fetch data from the table: "guild" using primary key columns */
  guild_by_pk?: Maybe<Guild>;
  /** fetch data from the table: "guild_metadata" */
  guild_metadata: Array<Guild_Metadata>;
  /** fetch aggregated fields from the table: "guild_metadata" */
  guild_metadata_aggregate: Guild_Metadata_Aggregate;
  /** fetch data from the table: "guild_metadata" using primary key columns */
  guild_metadata_by_pk?: Maybe<Guild_Metadata>;
  /** fetch data from the table: "guild_player" */
  guild_player: Array<Guild_Player>;
  /** fetch aggregated fields from the table: "guild_player" */
  guild_player_aggregate: Guild_Player_Aggregate;
  /** fetch data from the table: "guild_player" using primary key columns */
  guild_player_by_pk?: Maybe<Guild_Player>;
  /** fetch data from the table: "me" */
  me: Array<Me>;
  /** fetch aggregated fields from the table: "me" */
  me_aggregate: Me_Aggregate;
  /** fetch data from the table: "player" */
  player: Array<Player>;
  /** fetch data from the table: "player_account" */
  player_account: Array<Player_Account>;
  /** fetch aggregated fields from the table: "player_account" */
  player_account_aggregate: Player_Account_Aggregate;
  /** fetch aggregated fields from the table: "player" */
  player_aggregate: Player_Aggregate;
  /** fetch data from the table: "player" using primary key columns */
  player_by_pk?: Maybe<Player>;
  /** fetch data from the table: "player_role" */
  player_role: Array<Player_Role>;
  /** fetch aggregated fields from the table: "player_role" */
  player_role_aggregate: Player_Role_Aggregate;
  /** fetch data from the table: "player_role" using primary key columns */
  player_role_by_pk?: Maybe<Player_Role>;
  /** fetch data from the table: "player_skill" */
  player_skill: Array<Player_Skill>;
  /** fetch aggregated fields from the table: "player_skill" */
  player_skill_aggregate: Player_Skill_Aggregate;
  /** fetch data from the table: "player_skill" using primary key columns */
  player_skill_by_pk?: Maybe<Player_Skill>;
  /** fetch data from the table: "profile" */
  profile: Array<Profile>;
  /** fetch aggregated fields from the table: "profile" */
  profile_aggregate: Profile_Aggregate;
  /** fetch data from the table: "profile" using primary key columns */
  profile_by_pk?: Maybe<Profile>;
  /** fetch data from the table: "quest" */
  quest: Array<Quest>;
  /** fetch aggregated fields from the table: "quest" */
  quest_aggregate: Quest_Aggregate;
  /** fetch data from the table: "quest" using primary key columns */
  quest_by_pk?: Maybe<Quest>;
  /** fetch data from the table: "quest_completion" */
  quest_completion: Array<Quest_Completion>;
  /** fetch aggregated fields from the table: "quest_completion" */
  quest_completion_aggregate: Quest_Completion_Aggregate;
  /** fetch data from the table: "quest_completion" using primary key columns */
  quest_completion_by_pk?: Maybe<Quest_Completion>;
  /** fetch data from the table: "quest_role" */
  quest_role: Array<Quest_Role>;
  /** fetch aggregated fields from the table: "quest_role" */
  quest_role_aggregate: Quest_Role_Aggregate;
  /** fetch data from the table: "quest_role" using primary key columns */
  quest_role_by_pk?: Maybe<Quest_Role>;
  /** fetch data from the table: "quest_skill" */
  quest_skill: Array<Quest_Skill>;
  /** fetch aggregated fields from the table: "quest_skill" */
  quest_skill_aggregate: Quest_Skill_Aggregate;
  /** fetch data from the table: "quest_skill" using primary key columns */
  quest_skill_by_pk?: Maybe<Quest_Skill>;
  /** fetch data from the table: "skill" */
  skill: Array<Skill>;
  /** fetch aggregated fields from the table: "skill" */
  skill_aggregate: Skill_Aggregate;
  /** fetch data from the table: "skill" using primary key columns */
  skill_by_pk?: Maybe<Skill>;
  /** fetch data from the table: "token" */
  token: Array<Token>;
  /** fetch aggregated fields from the table: "token" */
  token_aggregate: Token_Aggregate;
  /** fetch data from the table: "token" using primary key columns */
  token_by_pk?: Maybe<Token>;
  /** retrieve the result of action: "updateIDXProfile" */
  updateIDXProfile?: Maybe<UpdateIdxProfile>;
  /** fetch data from the table: "xp" */
  xp: Array<Xp>;
  /** fetch aggregated fields from the table: "xp" */
  xp_aggregate: Xp_Aggregate;
  /** fetch data from the table: "xp" using primary key columns */
  xp_by_pk?: Maybe<Xp>;
};

/** query root */
export type Query_RootAccountTypeArgs = {
  distinct_on?: InputMaybe<Array<AccountType_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AccountType_Order_By>>;
  where?: InputMaybe<AccountType_Bool_Exp>;
};

/** query root */
export type Query_RootAccountType_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AccountType_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AccountType_Order_By>>;
  where?: InputMaybe<AccountType_Bool_Exp>;
};

/** query root */
export type Query_RootAccountType_By_PkArgs = {
  type: Scalars['String'];
};

/** query root */
export type Query_RootColorAspectArgs = {
  distinct_on?: InputMaybe<Array<ColorAspect_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ColorAspect_Order_By>>;
  where?: InputMaybe<ColorAspect_Bool_Exp>;
};

/** query root */
export type Query_RootColorAspect_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ColorAspect_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ColorAspect_Order_By>>;
  where?: InputMaybe<ColorAspect_Bool_Exp>;
};

/** query root */
export type Query_RootColorAspect_By_PkArgs = {
  mask: Scalars['Int'];
};

/** query root */
export type Query_RootExplorerTypeArgs = {
  distinct_on?: InputMaybe<Array<ExplorerType_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ExplorerType_Order_By>>;
  where?: InputMaybe<ExplorerType_Bool_Exp>;
};

/** query root */
export type Query_RootExplorerType_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ExplorerType_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ExplorerType_Order_By>>;
  where?: InputMaybe<ExplorerType_Bool_Exp>;
};

/** query root */
export type Query_RootExplorerType_By_PkArgs = {
  id: Scalars['Int'];
};

/** query root */
export type Query_RootGuildStatusArgs = {
  distinct_on?: InputMaybe<Array<GuildStatus_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GuildStatus_Order_By>>;
  where?: InputMaybe<GuildStatus_Bool_Exp>;
};

/** query root */
export type Query_RootGuildStatus_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GuildStatus_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GuildStatus_Order_By>>;
  where?: InputMaybe<GuildStatus_Bool_Exp>;
};

/** query root */
export type Query_RootGuildStatus_By_PkArgs = {
  status: Scalars['String'];
};

/** query root */
export type Query_RootGuildTypeArgs = {
  distinct_on?: InputMaybe<Array<GuildType_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GuildType_Order_By>>;
  where?: InputMaybe<GuildType_Bool_Exp>;
};

/** query root */
export type Query_RootGuildType_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GuildType_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GuildType_Order_By>>;
  where?: InputMaybe<GuildType_Bool_Exp>;
};

/** query root */
export type Query_RootGuildType_By_PkArgs = {
  name: Scalars['String'];
};

/** query root */
export type Query_RootPlayerRankArgs = {
  distinct_on?: InputMaybe<Array<PlayerRank_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<PlayerRank_Order_By>>;
  where?: InputMaybe<PlayerRank_Bool_Exp>;
};

/** query root */
export type Query_RootPlayerRank_AggregateArgs = {
  distinct_on?: InputMaybe<Array<PlayerRank_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<PlayerRank_Order_By>>;
  where?: InputMaybe<PlayerRank_Bool_Exp>;
};

/** query root */
export type Query_RootPlayerRank_By_PkArgs = {
  rank: Scalars['String'];
};

/** query root */
export type Query_RootPlayerRoleArgs = {
  distinct_on?: InputMaybe<Array<PlayerRole_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<PlayerRole_Order_By>>;
  where?: InputMaybe<PlayerRole_Bool_Exp>;
};

/** query root */
export type Query_RootPlayerRole_AggregateArgs = {
  distinct_on?: InputMaybe<Array<PlayerRole_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<PlayerRole_Order_By>>;
  where?: InputMaybe<PlayerRole_Bool_Exp>;
};

/** query root */
export type Query_RootPlayerRole_By_PkArgs = {
  role: Scalars['String'];
};

/** query root */
export type Query_RootQuestCompletionStatusArgs = {
  distinct_on?: InputMaybe<Array<QuestCompletionStatus_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<QuestCompletionStatus_Order_By>>;
  where?: InputMaybe<QuestCompletionStatus_Bool_Exp>;
};

/** query root */
export type Query_RootQuestCompletionStatus_AggregateArgs = {
  distinct_on?: InputMaybe<Array<QuestCompletionStatus_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<QuestCompletionStatus_Order_By>>;
  where?: InputMaybe<QuestCompletionStatus_Bool_Exp>;
};

/** query root */
export type Query_RootQuestCompletionStatus_By_PkArgs = {
  status: Scalars['String'];
};

/** query root */
export type Query_RootQuestRepetitionArgs = {
  distinct_on?: InputMaybe<Array<QuestRepetition_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<QuestRepetition_Order_By>>;
  where?: InputMaybe<QuestRepetition_Bool_Exp>;
};

/** query root */
export type Query_RootQuestRepetition_AggregateArgs = {
  distinct_on?: InputMaybe<Array<QuestRepetition_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<QuestRepetition_Order_By>>;
  where?: InputMaybe<QuestRepetition_Bool_Exp>;
};

/** query root */
export type Query_RootQuestRepetition_By_PkArgs = {
  repetition: Scalars['String'];
};

/** query root */
export type Query_RootQuestStatusArgs = {
  distinct_on?: InputMaybe<Array<QuestStatus_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<QuestStatus_Order_By>>;
  where?: InputMaybe<QuestStatus_Bool_Exp>;
};

/** query root */
export type Query_RootQuestStatus_AggregateArgs = {
  distinct_on?: InputMaybe<Array<QuestStatus_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<QuestStatus_Order_By>>;
  where?: InputMaybe<QuestStatus_Bool_Exp>;
};

/** query root */
export type Query_RootQuestStatus_By_PkArgs = {
  status: Scalars['String'];
};

/** query root */
export type Query_RootSkillCategoryArgs = {
  distinct_on?: InputMaybe<Array<SkillCategory_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SkillCategory_Order_By>>;
  where?: InputMaybe<SkillCategory_Bool_Exp>;
};

/** query root */
export type Query_RootSkillCategory_AggregateArgs = {
  distinct_on?: InputMaybe<Array<SkillCategory_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SkillCategory_Order_By>>;
  where?: InputMaybe<SkillCategory_Bool_Exp>;
};

/** query root */
export type Query_RootSkillCategory_By_PkArgs = {
  name: Scalars['String'];
};

/** query root */
export type Query_RootBalanceArgs = {
  distinct_on?: InputMaybe<Array<Balance_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Balance_Order_By>>;
  where?: InputMaybe<Balance_Bool_Exp>;
};

/** query root */
export type Query_RootBalance_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Balance_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Balance_Order_By>>;
  where?: InputMaybe<Balance_Bool_Exp>;
};

/** query root */
export type Query_RootBalance_By_PkArgs = {
  id: Scalars['uuid'];
};

/** query root */
export type Query_RootDaoArgs = {
  distinct_on?: InputMaybe<Array<Dao_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Dao_Order_By>>;
  where?: InputMaybe<Dao_Bool_Exp>;
};

/** query root */
export type Query_RootDao_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Dao_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Dao_Order_By>>;
  where?: InputMaybe<Dao_Bool_Exp>;
};

/** query root */
export type Query_RootDao_By_PkArgs = {
  id: Scalars['uuid'];
};

/** query root */
export type Query_RootDao_PlayerArgs = {
  distinct_on?: InputMaybe<Array<Dao_Player_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Dao_Player_Order_By>>;
  where?: InputMaybe<Dao_Player_Bool_Exp>;
};

/** query root */
export type Query_RootDao_Player_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Dao_Player_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Dao_Player_Order_By>>;
  where?: InputMaybe<Dao_Player_Bool_Exp>;
};

/** query root */
export type Query_RootDao_Player_By_PkArgs = {
  daoId: Scalars['uuid'];
  playerId: Scalars['uuid'];
};

/** query root */
export type Query_RootGetBrightIdStatusArgs = {
  contextId?: InputMaybe<Scalars['uuid']>;
};

/** query root */
export type Query_RootGetDaoHausMembershipsArgs = {
  memberAddress?: InputMaybe<Scalars['String']>;
};

/** query root */
export type Query_RootGetDiscordServerMemberRolesArgs = {
  guildId: Scalars['uuid'];
  playerId: Scalars['uuid'];
};

/** query root */
export type Query_RootGetGuildDiscordAnnouncementsArgs = {
  guildDiscordId?: InputMaybe<Scalars['String']>;
};

/** query root */
export type Query_RootGetGuildDiscordRolesArgs = {
  guildDiscordId?: InputMaybe<Scalars['String']>;
};

/** query root */
export type Query_RootGetTokenBalancesArgs = {
  address?: InputMaybe<Scalars['String']>;
};

/** query root */
export type Query_RootGetTopPSeedHoldersArgs = {
  limit?: InputMaybe<Scalars['Int']>;
};

/** query root */
export type Query_RootGuildArgs = {
  distinct_on?: InputMaybe<Array<Guild_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Guild_Order_By>>;
  where?: InputMaybe<Guild_Bool_Exp>;
};

/** query root */
export type Query_RootGuild_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Guild_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Guild_Order_By>>;
  where?: InputMaybe<Guild_Bool_Exp>;
};

/** query root */
export type Query_RootGuild_By_PkArgs = {
  id: Scalars['uuid'];
};

/** query root */
export type Query_RootGuild_MetadataArgs = {
  distinct_on?: InputMaybe<Array<Guild_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Guild_Metadata_Order_By>>;
  where?: InputMaybe<Guild_Metadata_Bool_Exp>;
};

/** query root */
export type Query_RootGuild_Metadata_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Guild_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Guild_Metadata_Order_By>>;
  where?: InputMaybe<Guild_Metadata_Bool_Exp>;
};

/** query root */
export type Query_RootGuild_Metadata_By_PkArgs = {
  guildId: Scalars['uuid'];
};

/** query root */
export type Query_RootGuild_PlayerArgs = {
  distinct_on?: InputMaybe<Array<Guild_Player_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Guild_Player_Order_By>>;
  where?: InputMaybe<Guild_Player_Bool_Exp>;
};

/** query root */
export type Query_RootGuild_Player_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Guild_Player_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Guild_Player_Order_By>>;
  where?: InputMaybe<Guild_Player_Bool_Exp>;
};

/** query root */
export type Query_RootGuild_Player_By_PkArgs = {
  guildId: Scalars['uuid'];
  playerId: Scalars['uuid'];
};

/** query root */
export type Query_RootMeArgs = {
  distinct_on?: InputMaybe<Array<Me_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Me_Order_By>>;
  where?: InputMaybe<Me_Bool_Exp>;
};

/** query root */
export type Query_RootMe_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Me_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Me_Order_By>>;
  where?: InputMaybe<Me_Bool_Exp>;
};

/** query root */
export type Query_RootPlayerArgs = {
  distinct_on?: InputMaybe<Array<Player_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Player_Order_By>>;
  where?: InputMaybe<Player_Bool_Exp>;
};

/** query root */
export type Query_RootPlayer_AccountArgs = {
  distinct_on?: InputMaybe<Array<Player_Account_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Player_Account_Order_By>>;
  where?: InputMaybe<Player_Account_Bool_Exp>;
};

/** query root */
export type Query_RootPlayer_Account_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Player_Account_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Player_Account_Order_By>>;
  where?: InputMaybe<Player_Account_Bool_Exp>;
};

/** query root */
export type Query_RootPlayer_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Player_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Player_Order_By>>;
  where?: InputMaybe<Player_Bool_Exp>;
};

/** query root */
export type Query_RootPlayer_By_PkArgs = {
  id: Scalars['uuid'];
};

/** query root */
export type Query_RootPlayer_RoleArgs = {
  distinct_on?: InputMaybe<Array<Player_Role_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Player_Role_Order_By>>;
  where?: InputMaybe<Player_Role_Bool_Exp>;
};

/** query root */
export type Query_RootPlayer_Role_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Player_Role_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Player_Role_Order_By>>;
  where?: InputMaybe<Player_Role_Bool_Exp>;
};

/** query root */
export type Query_RootPlayer_Role_By_PkArgs = {
  player_id: Scalars['uuid'];
  role: Scalars['String'];
};

/** query root */
export type Query_RootPlayer_SkillArgs = {
  distinct_on?: InputMaybe<Array<Player_Skill_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Player_Skill_Order_By>>;
  where?: InputMaybe<Player_Skill_Bool_Exp>;
};

/** query root */
export type Query_RootPlayer_Skill_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Player_Skill_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Player_Skill_Order_By>>;
  where?: InputMaybe<Player_Skill_Bool_Exp>;
};

/** query root */
export type Query_RootPlayer_Skill_By_PkArgs = {
  id: Scalars['uuid'];
};

/** query root */
export type Query_RootProfileArgs = {
  distinct_on?: InputMaybe<Array<Profile_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Profile_Order_By>>;
  where?: InputMaybe<Profile_Bool_Exp>;
};

/** query root */
export type Query_RootProfile_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Profile_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Profile_Order_By>>;
  where?: InputMaybe<Profile_Bool_Exp>;
};

/** query root */
export type Query_RootProfile_By_PkArgs = {
  id: Scalars['uuid'];
};

/** query root */
export type Query_RootQuestArgs = {
  distinct_on?: InputMaybe<Array<Quest_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quest_Order_By>>;
  where?: InputMaybe<Quest_Bool_Exp>;
};

/** query root */
export type Query_RootQuest_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Quest_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quest_Order_By>>;
  where?: InputMaybe<Quest_Bool_Exp>;
};

/** query root */
export type Query_RootQuest_By_PkArgs = {
  id: Scalars['uuid'];
};

/** query root */
export type Query_RootQuest_CompletionArgs = {
  distinct_on?: InputMaybe<Array<Quest_Completion_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quest_Completion_Order_By>>;
  where?: InputMaybe<Quest_Completion_Bool_Exp>;
};

/** query root */
export type Query_RootQuest_Completion_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Quest_Completion_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quest_Completion_Order_By>>;
  where?: InputMaybe<Quest_Completion_Bool_Exp>;
};

/** query root */
export type Query_RootQuest_Completion_By_PkArgs = {
  id: Scalars['uuid'];
};

/** query root */
export type Query_RootQuest_RoleArgs = {
  distinct_on?: InputMaybe<Array<Quest_Role_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quest_Role_Order_By>>;
  where?: InputMaybe<Quest_Role_Bool_Exp>;
};

/** query root */
export type Query_RootQuest_Role_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Quest_Role_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quest_Role_Order_By>>;
  where?: InputMaybe<Quest_Role_Bool_Exp>;
};

/** query root */
export type Query_RootQuest_Role_By_PkArgs = {
  questId: Scalars['uuid'];
  role: Scalars['String'];
};

/** query root */
export type Query_RootQuest_SkillArgs = {
  distinct_on?: InputMaybe<Array<Quest_Skill_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quest_Skill_Order_By>>;
  where?: InputMaybe<Quest_Skill_Bool_Exp>;
};

/** query root */
export type Query_RootQuest_Skill_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Quest_Skill_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quest_Skill_Order_By>>;
  where?: InputMaybe<Quest_Skill_Bool_Exp>;
};

/** query root */
export type Query_RootQuest_Skill_By_PkArgs = {
  questId: Scalars['uuid'];
  skillId: Scalars['uuid'];
};

/** query root */
export type Query_RootSkillArgs = {
  distinct_on?: InputMaybe<Array<Skill_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Skill_Order_By>>;
  where?: InputMaybe<Skill_Bool_Exp>;
};

/** query root */
export type Query_RootSkill_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Skill_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Skill_Order_By>>;
  where?: InputMaybe<Skill_Bool_Exp>;
};

/** query root */
export type Query_RootSkill_By_PkArgs = {
  id: Scalars['uuid'];
};

/** query root */
export type Query_RootTokenArgs = {
  distinct_on?: InputMaybe<Array<Token_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Token_Order_By>>;
  where?: InputMaybe<Token_Bool_Exp>;
};

/** query root */
export type Query_RootToken_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Token_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Token_Order_By>>;
  where?: InputMaybe<Token_Bool_Exp>;
};

/** query root */
export type Query_RootToken_By_PkArgs = {
  address: Scalars['String'];
};

/** query root */
export type Query_RootUpdateIdxProfileArgs = {
  id: Scalars['uuid'];
};

/** query root */
export type Query_RootXpArgs = {
  distinct_on?: InputMaybe<Array<Xp_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Xp_Order_By>>;
  where?: InputMaybe<Xp_Bool_Exp>;
};

/** query root */
export type Query_RootXp_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Xp_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Xp_Order_By>>;
  where?: InputMaybe<Xp_Bool_Exp>;
};

/** query root */
export type Query_RootXp_By_PkArgs = {
  id: Scalars['uuid'];
};

/** columns and relationships of "quest" */
export type Quest = {
  /** An object relationship */
  QuestRepetition: QuestRepetition;
  /** An object relationship */
  QuestStatus: QuestStatus;
  cooldown?: Maybe<Scalars['Int']>;
  createdAt: Scalars['timestamptz'];
  createdByPlayerId: Scalars['uuid'];
  description?: Maybe<Scalars['String']>;
  externalLink?: Maybe<Scalars['String']>;
  /** An object relationship */
  guild: Guild;
  guildId: Scalars['uuid'];
  id: Scalars['uuid'];
  image?: Maybe<Scalars['String']>;
  /** An object relationship */
  player: Player;
  /** An array relationship */
  quest_completions: Array<Quest_Completion>;
  /** An aggregated array relationship */
  quest_completions_aggregate: Quest_Completion_Aggregate;
  /** An array relationship */
  quest_roles: Array<Quest_Role>;
  /** An aggregated array relationship */
  quest_roles_aggregate: Quest_Role_Aggregate;
  /** An array relationship */
  quest_skills: Array<Quest_Skill>;
  /** An aggregated array relationship */
  quest_skills_aggregate: Quest_Skill_Aggregate;
  repetition: QuestRepetition_Enum;
  status: QuestStatus_Enum;
  title: Scalars['String'];
};

/** columns and relationships of "quest" */
export type QuestQuest_CompletionsArgs = {
  distinct_on?: InputMaybe<Array<Quest_Completion_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quest_Completion_Order_By>>;
  where?: InputMaybe<Quest_Completion_Bool_Exp>;
};

/** columns and relationships of "quest" */
export type QuestQuest_Completions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Quest_Completion_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quest_Completion_Order_By>>;
  where?: InputMaybe<Quest_Completion_Bool_Exp>;
};

/** columns and relationships of "quest" */
export type QuestQuest_RolesArgs = {
  distinct_on?: InputMaybe<Array<Quest_Role_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quest_Role_Order_By>>;
  where?: InputMaybe<Quest_Role_Bool_Exp>;
};

/** columns and relationships of "quest" */
export type QuestQuest_Roles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Quest_Role_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quest_Role_Order_By>>;
  where?: InputMaybe<Quest_Role_Bool_Exp>;
};

/** columns and relationships of "quest" */
export type QuestQuest_SkillsArgs = {
  distinct_on?: InputMaybe<Array<Quest_Skill_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quest_Skill_Order_By>>;
  where?: InputMaybe<Quest_Skill_Bool_Exp>;
};

/** columns and relationships of "quest" */
export type QuestQuest_Skills_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Quest_Skill_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quest_Skill_Order_By>>;
  where?: InputMaybe<Quest_Skill_Bool_Exp>;
};

/** aggregated selection of "quest" */
export type Quest_Aggregate = {
  aggregate?: Maybe<Quest_Aggregate_Fields>;
  nodes: Array<Quest>;
};

/** aggregate fields of "quest" */
export type Quest_Aggregate_Fields = {
  avg?: Maybe<Quest_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Quest_Max_Fields>;
  min?: Maybe<Quest_Min_Fields>;
  stddev?: Maybe<Quest_Stddev_Fields>;
  stddev_pop?: Maybe<Quest_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Quest_Stddev_Samp_Fields>;
  sum?: Maybe<Quest_Sum_Fields>;
  var_pop?: Maybe<Quest_Var_Pop_Fields>;
  var_samp?: Maybe<Quest_Var_Samp_Fields>;
  variance?: Maybe<Quest_Variance_Fields>;
};

/** aggregate fields of "quest" */
export type Quest_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Quest_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "quest" */
export type Quest_Aggregate_Order_By = {
  avg?: InputMaybe<Quest_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Quest_Max_Order_By>;
  min?: InputMaybe<Quest_Min_Order_By>;
  stddev?: InputMaybe<Quest_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Quest_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Quest_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Quest_Sum_Order_By>;
  var_pop?: InputMaybe<Quest_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Quest_Var_Samp_Order_By>;
  variance?: InputMaybe<Quest_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "quest" */
export type Quest_Arr_Rel_Insert_Input = {
  data: Array<Quest_Insert_Input>;
  on_conflict?: InputMaybe<Quest_On_Conflict>;
};

/** aggregate avg on columns */
export type Quest_Avg_Fields = {
  cooldown?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "quest" */
export type Quest_Avg_Order_By = {
  cooldown?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "quest". All fields are combined with a logical 'AND'. */
export type Quest_Bool_Exp = {
  QuestRepetition?: InputMaybe<QuestRepetition_Bool_Exp>;
  QuestStatus?: InputMaybe<QuestStatus_Bool_Exp>;
  _and?: InputMaybe<Array<InputMaybe<Quest_Bool_Exp>>>;
  _not?: InputMaybe<Quest_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Quest_Bool_Exp>>>;
  cooldown?: InputMaybe<Int_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdByPlayerId?: InputMaybe<Uuid_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  externalLink?: InputMaybe<String_Comparison_Exp>;
  guild?: InputMaybe<Guild_Bool_Exp>;
  guildId?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  image?: InputMaybe<String_Comparison_Exp>;
  player?: InputMaybe<Player_Bool_Exp>;
  quest_completions?: InputMaybe<Quest_Completion_Bool_Exp>;
  quest_roles?: InputMaybe<Quest_Role_Bool_Exp>;
  quest_skills?: InputMaybe<Quest_Skill_Bool_Exp>;
  repetition?: InputMaybe<QuestRepetition_Enum_Comparison_Exp>;
  status?: InputMaybe<QuestStatus_Enum_Comparison_Exp>;
  title?: InputMaybe<String_Comparison_Exp>;
};

/** columns and relationships of "quest_completion" */
export type Quest_Completion = {
  /** An object relationship */
  QuestCompletionStatus: QuestCompletionStatus;
  /** An object relationship */
  completed?: Maybe<Quest>;
  completedByPlayerId: Scalars['uuid'];
  id: Scalars['uuid'];
  /** An object relationship */
  player: Player;
  /** An object relationship */
  quest: Quest;
  questId: Scalars['uuid'];
  status: QuestCompletionStatus_Enum;
  submissionLink?: Maybe<Scalars['String']>;
  submissionText?: Maybe<Scalars['String']>;
  submittedAt: Scalars['timestamptz'];
};

/** aggregated selection of "quest_completion" */
export type Quest_Completion_Aggregate = {
  aggregate?: Maybe<Quest_Completion_Aggregate_Fields>;
  nodes: Array<Quest_Completion>;
};

/** aggregate fields of "quest_completion" */
export type Quest_Completion_Aggregate_Fields = {
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Quest_Completion_Max_Fields>;
  min?: Maybe<Quest_Completion_Min_Fields>;
};

/** aggregate fields of "quest_completion" */
export type Quest_Completion_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Quest_Completion_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "quest_completion" */
export type Quest_Completion_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Quest_Completion_Max_Order_By>;
  min?: InputMaybe<Quest_Completion_Min_Order_By>;
};

/** input type for inserting array relation for remote table "quest_completion" */
export type Quest_Completion_Arr_Rel_Insert_Input = {
  data: Array<Quest_Completion_Insert_Input>;
  on_conflict?: InputMaybe<Quest_Completion_On_Conflict>;
};

/** Boolean expression to filter rows from the table "quest_completion". All fields are combined with a logical 'AND'. */
export type Quest_Completion_Bool_Exp = {
  QuestCompletionStatus?: InputMaybe<QuestCompletionStatus_Bool_Exp>;
  _and?: InputMaybe<Array<InputMaybe<Quest_Completion_Bool_Exp>>>;
  _not?: InputMaybe<Quest_Completion_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Quest_Completion_Bool_Exp>>>;
  completed?: InputMaybe<Quest_Bool_Exp>;
  completedByPlayerId?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  player?: InputMaybe<Player_Bool_Exp>;
  quest?: InputMaybe<Quest_Bool_Exp>;
  questId?: InputMaybe<Uuid_Comparison_Exp>;
  status?: InputMaybe<QuestCompletionStatus_Enum_Comparison_Exp>;
  submissionLink?: InputMaybe<String_Comparison_Exp>;
  submissionText?: InputMaybe<String_Comparison_Exp>;
  submittedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "quest_completion" */
export enum Quest_Completion_Constraint {
  /** unique or primary key constraint */
  QuestCompletionPkey = 'quest_completion_pkey',
}

/** input type for inserting data into table "quest_completion" */
export type Quest_Completion_Insert_Input = {
  QuestCompletionStatus?: InputMaybe<QuestCompletionStatus_Obj_Rel_Insert_Input>;
  completed?: InputMaybe<Quest_Obj_Rel_Insert_Input>;
  completedByPlayerId?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  player?: InputMaybe<Player_Obj_Rel_Insert_Input>;
  quest?: InputMaybe<Quest_Obj_Rel_Insert_Input>;
  questId?: InputMaybe<Scalars['uuid']>;
  status?: InputMaybe<QuestCompletionStatus_Enum>;
  submissionLink?: InputMaybe<Scalars['String']>;
  submissionText?: InputMaybe<Scalars['String']>;
  submittedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Quest_Completion_Max_Fields = {
  completedByPlayerId?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  questId?: Maybe<Scalars['uuid']>;
  submissionLink?: Maybe<Scalars['String']>;
  submissionText?: Maybe<Scalars['String']>;
  submittedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "quest_completion" */
export type Quest_Completion_Max_Order_By = {
  completedByPlayerId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  questId?: InputMaybe<Order_By>;
  submissionLink?: InputMaybe<Order_By>;
  submissionText?: InputMaybe<Order_By>;
  submittedAt?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Quest_Completion_Min_Fields = {
  completedByPlayerId?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  questId?: Maybe<Scalars['uuid']>;
  submissionLink?: Maybe<Scalars['String']>;
  submissionText?: Maybe<Scalars['String']>;
  submittedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "quest_completion" */
export type Quest_Completion_Min_Order_By = {
  completedByPlayerId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  questId?: InputMaybe<Order_By>;
  submissionLink?: InputMaybe<Order_By>;
  submissionText?: InputMaybe<Order_By>;
  submittedAt?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "quest_completion" */
export type Quest_Completion_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Quest_Completion>;
};

/** input type for inserting object relation for remote table "quest_completion" */
export type Quest_Completion_Obj_Rel_Insert_Input = {
  data: Quest_Completion_Insert_Input;
  on_conflict?: InputMaybe<Quest_Completion_On_Conflict>;
};

/** on conflict condition type for table "quest_completion" */
export type Quest_Completion_On_Conflict = {
  constraint: Quest_Completion_Constraint;
  update_columns: Array<Quest_Completion_Update_Column>;
  where?: InputMaybe<Quest_Completion_Bool_Exp>;
};

/** ordering options when selecting data from "quest_completion" */
export type Quest_Completion_Order_By = {
  QuestCompletionStatus?: InputMaybe<QuestCompletionStatus_Order_By>;
  completed?: InputMaybe<Quest_Order_By>;
  completedByPlayerId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  player?: InputMaybe<Player_Order_By>;
  quest?: InputMaybe<Quest_Order_By>;
  questId?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  submissionLink?: InputMaybe<Order_By>;
  submissionText?: InputMaybe<Order_By>;
  submittedAt?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "quest_completion" */
export type Quest_Completion_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "quest_completion" */
export enum Quest_Completion_Select_Column {
  /** column name */
  CompletedByPlayerId = 'completedByPlayerId',
  /** column name */
  Id = 'id',
  /** column name */
  QuestId = 'questId',
  /** column name */
  Status = 'status',
  /** column name */
  SubmissionLink = 'submissionLink',
  /** column name */
  SubmissionText = 'submissionText',
  /** column name */
  SubmittedAt = 'submittedAt',
}

/** input type for updating data in table "quest_completion" */
export type Quest_Completion_Set_Input = {
  completedByPlayerId?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  questId?: InputMaybe<Scalars['uuid']>;
  status?: InputMaybe<QuestCompletionStatus_Enum>;
  submissionLink?: InputMaybe<Scalars['String']>;
  submissionText?: InputMaybe<Scalars['String']>;
  submittedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "quest_completion" */
export enum Quest_Completion_Update_Column {
  /** column name */
  CompletedByPlayerId = 'completedByPlayerId',
  /** column name */
  Id = 'id',
  /** column name */
  QuestId = 'questId',
  /** column name */
  Status = 'status',
  /** column name */
  SubmissionLink = 'submissionLink',
  /** column name */
  SubmissionText = 'submissionText',
  /** column name */
  SubmittedAt = 'submittedAt',
}

/** unique or primary key constraints on table "quest" */
export enum Quest_Constraint {
  /** unique or primary key constraint */
  QuestPkey = 'quest_pkey',
}

/** input type for incrementing integer column in table "quest" */
export type Quest_Inc_Input = {
  cooldown?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "quest" */
export type Quest_Insert_Input = {
  QuestRepetition?: InputMaybe<QuestRepetition_Obj_Rel_Insert_Input>;
  QuestStatus?: InputMaybe<QuestStatus_Obj_Rel_Insert_Input>;
  cooldown?: InputMaybe<Scalars['Int']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  createdByPlayerId?: InputMaybe<Scalars['uuid']>;
  description?: InputMaybe<Scalars['String']>;
  externalLink?: InputMaybe<Scalars['String']>;
  guild?: InputMaybe<Guild_Obj_Rel_Insert_Input>;
  guildId?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  image?: InputMaybe<Scalars['String']>;
  player?: InputMaybe<Player_Obj_Rel_Insert_Input>;
  quest_completions?: InputMaybe<Quest_Completion_Arr_Rel_Insert_Input>;
  quest_roles?: InputMaybe<Quest_Role_Arr_Rel_Insert_Input>;
  quest_skills?: InputMaybe<Quest_Skill_Arr_Rel_Insert_Input>;
  repetition?: InputMaybe<QuestRepetition_Enum>;
  status?: InputMaybe<QuestStatus_Enum>;
  title?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Quest_Max_Fields = {
  cooldown?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  createdByPlayerId?: Maybe<Scalars['uuid']>;
  description?: Maybe<Scalars['String']>;
  externalLink?: Maybe<Scalars['String']>;
  guildId?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  image?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "quest" */
export type Quest_Max_Order_By = {
  cooldown?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdByPlayerId?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  externalLink?: InputMaybe<Order_By>;
  guildId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Quest_Min_Fields = {
  cooldown?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  createdByPlayerId?: Maybe<Scalars['uuid']>;
  description?: Maybe<Scalars['String']>;
  externalLink?: Maybe<Scalars['String']>;
  guildId?: Maybe<Scalars['uuid']>;
  id?: Maybe<Scalars['uuid']>;
  image?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "quest" */
export type Quest_Min_Order_By = {
  cooldown?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdByPlayerId?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  externalLink?: InputMaybe<Order_By>;
  guildId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "quest" */
export type Quest_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Quest>;
};

/** input type for inserting object relation for remote table "quest" */
export type Quest_Obj_Rel_Insert_Input = {
  data: Quest_Insert_Input;
  on_conflict?: InputMaybe<Quest_On_Conflict>;
};

/** on conflict condition type for table "quest" */
export type Quest_On_Conflict = {
  constraint: Quest_Constraint;
  update_columns: Array<Quest_Update_Column>;
  where?: InputMaybe<Quest_Bool_Exp>;
};

/** ordering options when selecting data from "quest" */
export type Quest_Order_By = {
  QuestRepetition?: InputMaybe<QuestRepetition_Order_By>;
  QuestStatus?: InputMaybe<QuestStatus_Order_By>;
  cooldown?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdByPlayerId?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  externalLink?: InputMaybe<Order_By>;
  guild?: InputMaybe<Guild_Order_By>;
  guildId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image?: InputMaybe<Order_By>;
  player?: InputMaybe<Player_Order_By>;
  quest_completions_aggregate?: InputMaybe<Quest_Completion_Aggregate_Order_By>;
  quest_roles_aggregate?: InputMaybe<Quest_Role_Aggregate_Order_By>;
  quest_skills_aggregate?: InputMaybe<Quest_Skill_Aggregate_Order_By>;
  repetition?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  title?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "quest" */
export type Quest_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** columns and relationships of "quest_role" */
export type Quest_Role = {
  /** An object relationship */
  PlayerRole: PlayerRole;
  /** An object relationship */
  quest: Quest;
  questId: Scalars['uuid'];
  rank?: Maybe<Scalars['Int']>;
  role: Scalars['String'];
};

/** aggregated selection of "quest_role" */
export type Quest_Role_Aggregate = {
  aggregate?: Maybe<Quest_Role_Aggregate_Fields>;
  nodes: Array<Quest_Role>;
};

/** aggregate fields of "quest_role" */
export type Quest_Role_Aggregate_Fields = {
  avg?: Maybe<Quest_Role_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Quest_Role_Max_Fields>;
  min?: Maybe<Quest_Role_Min_Fields>;
  stddev?: Maybe<Quest_Role_Stddev_Fields>;
  stddev_pop?: Maybe<Quest_Role_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Quest_Role_Stddev_Samp_Fields>;
  sum?: Maybe<Quest_Role_Sum_Fields>;
  var_pop?: Maybe<Quest_Role_Var_Pop_Fields>;
  var_samp?: Maybe<Quest_Role_Var_Samp_Fields>;
  variance?: Maybe<Quest_Role_Variance_Fields>;
};

/** aggregate fields of "quest_role" */
export type Quest_Role_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Quest_Role_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "quest_role" */
export type Quest_Role_Aggregate_Order_By = {
  avg?: InputMaybe<Quest_Role_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Quest_Role_Max_Order_By>;
  min?: InputMaybe<Quest_Role_Min_Order_By>;
  stddev?: InputMaybe<Quest_Role_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Quest_Role_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Quest_Role_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Quest_Role_Sum_Order_By>;
  var_pop?: InputMaybe<Quest_Role_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Quest_Role_Var_Samp_Order_By>;
  variance?: InputMaybe<Quest_Role_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "quest_role" */
export type Quest_Role_Arr_Rel_Insert_Input = {
  data: Array<Quest_Role_Insert_Input>;
  on_conflict?: InputMaybe<Quest_Role_On_Conflict>;
};

/** aggregate avg on columns */
export type Quest_Role_Avg_Fields = {
  rank?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "quest_role" */
export type Quest_Role_Avg_Order_By = {
  rank?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "quest_role". All fields are combined with a logical 'AND'. */
export type Quest_Role_Bool_Exp = {
  PlayerRole?: InputMaybe<PlayerRole_Bool_Exp>;
  _and?: InputMaybe<Array<InputMaybe<Quest_Role_Bool_Exp>>>;
  _not?: InputMaybe<Quest_Role_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Quest_Role_Bool_Exp>>>;
  quest?: InputMaybe<Quest_Bool_Exp>;
  questId?: InputMaybe<Uuid_Comparison_Exp>;
  rank?: InputMaybe<Int_Comparison_Exp>;
  role?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "quest_role" */
export enum Quest_Role_Constraint {
  /** unique or primary key constraint */
  QuestRolePkey = 'quest_role_pkey',
}

/** input type for incrementing integer column in table "quest_role" */
export type Quest_Role_Inc_Input = {
  rank?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "quest_role" */
export type Quest_Role_Insert_Input = {
  PlayerRole?: InputMaybe<PlayerRole_Obj_Rel_Insert_Input>;
  quest?: InputMaybe<Quest_Obj_Rel_Insert_Input>;
  questId?: InputMaybe<Scalars['uuid']>;
  rank?: InputMaybe<Scalars['Int']>;
  role?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Quest_Role_Max_Fields = {
  questId?: Maybe<Scalars['uuid']>;
  rank?: Maybe<Scalars['Int']>;
  role?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "quest_role" */
export type Quest_Role_Max_Order_By = {
  questId?: InputMaybe<Order_By>;
  rank?: InputMaybe<Order_By>;
  role?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Quest_Role_Min_Fields = {
  questId?: Maybe<Scalars['uuid']>;
  rank?: Maybe<Scalars['Int']>;
  role?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "quest_role" */
export type Quest_Role_Min_Order_By = {
  questId?: InputMaybe<Order_By>;
  rank?: InputMaybe<Order_By>;
  role?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "quest_role" */
export type Quest_Role_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Quest_Role>;
};

/** input type for inserting object relation for remote table "quest_role" */
export type Quest_Role_Obj_Rel_Insert_Input = {
  data: Quest_Role_Insert_Input;
  on_conflict?: InputMaybe<Quest_Role_On_Conflict>;
};

/** on conflict condition type for table "quest_role" */
export type Quest_Role_On_Conflict = {
  constraint: Quest_Role_Constraint;
  update_columns: Array<Quest_Role_Update_Column>;
  where?: InputMaybe<Quest_Role_Bool_Exp>;
};

/** ordering options when selecting data from "quest_role" */
export type Quest_Role_Order_By = {
  PlayerRole?: InputMaybe<PlayerRole_Order_By>;
  quest?: InputMaybe<Quest_Order_By>;
  questId?: InputMaybe<Order_By>;
  rank?: InputMaybe<Order_By>;
  role?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "quest_role" */
export type Quest_Role_Pk_Columns_Input = {
  questId: Scalars['uuid'];
  role: Scalars['String'];
};

/** select columns of table "quest_role" */
export enum Quest_Role_Select_Column {
  /** column name */
  QuestId = 'questId',
  /** column name */
  Rank = 'rank',
  /** column name */
  Role = 'role',
}

/** input type for updating data in table "quest_role" */
export type Quest_Role_Set_Input = {
  questId?: InputMaybe<Scalars['uuid']>;
  rank?: InputMaybe<Scalars['Int']>;
  role?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Quest_Role_Stddev_Fields = {
  rank?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "quest_role" */
export type Quest_Role_Stddev_Order_By = {
  rank?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Quest_Role_Stddev_Pop_Fields = {
  rank?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "quest_role" */
export type Quest_Role_Stddev_Pop_Order_By = {
  rank?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Quest_Role_Stddev_Samp_Fields = {
  rank?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "quest_role" */
export type Quest_Role_Stddev_Samp_Order_By = {
  rank?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Quest_Role_Sum_Fields = {
  rank?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "quest_role" */
export type Quest_Role_Sum_Order_By = {
  rank?: InputMaybe<Order_By>;
};

/** update columns of table "quest_role" */
export enum Quest_Role_Update_Column {
  /** column name */
  QuestId = 'questId',
  /** column name */
  Rank = 'rank',
  /** column name */
  Role = 'role',
}

/** aggregate var_pop on columns */
export type Quest_Role_Var_Pop_Fields = {
  rank?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "quest_role" */
export type Quest_Role_Var_Pop_Order_By = {
  rank?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Quest_Role_Var_Samp_Fields = {
  rank?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "quest_role" */
export type Quest_Role_Var_Samp_Order_By = {
  rank?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Quest_Role_Variance_Fields = {
  rank?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "quest_role" */
export type Quest_Role_Variance_Order_By = {
  rank?: InputMaybe<Order_By>;
};

/** select columns of table "quest" */
export enum Quest_Select_Column {
  /** column name */
  Cooldown = 'cooldown',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedByPlayerId = 'createdByPlayerId',
  /** column name */
  Description = 'description',
  /** column name */
  ExternalLink = 'externalLink',
  /** column name */
  GuildId = 'guildId',
  /** column name */
  Id = 'id',
  /** column name */
  Image = 'image',
  /** column name */
  Repetition = 'repetition',
  /** column name */
  Status = 'status',
  /** column name */
  Title = 'title',
}

/** input type for updating data in table "quest" */
export type Quest_Set_Input = {
  cooldown?: InputMaybe<Scalars['Int']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  createdByPlayerId?: InputMaybe<Scalars['uuid']>;
  description?: InputMaybe<Scalars['String']>;
  externalLink?: InputMaybe<Scalars['String']>;
  guildId?: InputMaybe<Scalars['uuid']>;
  id?: InputMaybe<Scalars['uuid']>;
  image?: InputMaybe<Scalars['String']>;
  repetition?: InputMaybe<QuestRepetition_Enum>;
  status?: InputMaybe<QuestStatus_Enum>;
  title?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "quest_skill" */
export type Quest_Skill = {
  /** An object relationship */
  quest: Quest;
  questId: Scalars['uuid'];
  /** An object relationship */
  skill: Skill;
  skillId: Scalars['uuid'];
};

/** aggregated selection of "quest_skill" */
export type Quest_Skill_Aggregate = {
  aggregate?: Maybe<Quest_Skill_Aggregate_Fields>;
  nodes: Array<Quest_Skill>;
};

/** aggregate fields of "quest_skill" */
export type Quest_Skill_Aggregate_Fields = {
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Quest_Skill_Max_Fields>;
  min?: Maybe<Quest_Skill_Min_Fields>;
};

/** aggregate fields of "quest_skill" */
export type Quest_Skill_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Quest_Skill_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "quest_skill" */
export type Quest_Skill_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Quest_Skill_Max_Order_By>;
  min?: InputMaybe<Quest_Skill_Min_Order_By>;
};

/** input type for inserting array relation for remote table "quest_skill" */
export type Quest_Skill_Arr_Rel_Insert_Input = {
  data: Array<Quest_Skill_Insert_Input>;
  on_conflict?: InputMaybe<Quest_Skill_On_Conflict>;
};

/** Boolean expression to filter rows from the table "quest_skill". All fields are combined with a logical 'AND'. */
export type Quest_Skill_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Quest_Skill_Bool_Exp>>>;
  _not?: InputMaybe<Quest_Skill_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Quest_Skill_Bool_Exp>>>;
  quest?: InputMaybe<Quest_Bool_Exp>;
  questId?: InputMaybe<Uuid_Comparison_Exp>;
  skill?: InputMaybe<Skill_Bool_Exp>;
  skillId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "quest_skill" */
export enum Quest_Skill_Constraint {
  /** unique or primary key constraint */
  QuestSkillPkey = 'quest_skill_pkey',
}

/** input type for inserting data into table "quest_skill" */
export type Quest_Skill_Insert_Input = {
  quest?: InputMaybe<Quest_Obj_Rel_Insert_Input>;
  questId?: InputMaybe<Scalars['uuid']>;
  skill?: InputMaybe<Skill_Obj_Rel_Insert_Input>;
  skillId?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Quest_Skill_Max_Fields = {
  questId?: Maybe<Scalars['uuid']>;
  skillId?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "quest_skill" */
export type Quest_Skill_Max_Order_By = {
  questId?: InputMaybe<Order_By>;
  skillId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Quest_Skill_Min_Fields = {
  questId?: Maybe<Scalars['uuid']>;
  skillId?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "quest_skill" */
export type Quest_Skill_Min_Order_By = {
  questId?: InputMaybe<Order_By>;
  skillId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "quest_skill" */
export type Quest_Skill_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Quest_Skill>;
};

/** input type for inserting object relation for remote table "quest_skill" */
export type Quest_Skill_Obj_Rel_Insert_Input = {
  data: Quest_Skill_Insert_Input;
  on_conflict?: InputMaybe<Quest_Skill_On_Conflict>;
};

/** on conflict condition type for table "quest_skill" */
export type Quest_Skill_On_Conflict = {
  constraint: Quest_Skill_Constraint;
  update_columns: Array<Quest_Skill_Update_Column>;
  where?: InputMaybe<Quest_Skill_Bool_Exp>;
};

/** ordering options when selecting data from "quest_skill" */
export type Quest_Skill_Order_By = {
  quest?: InputMaybe<Quest_Order_By>;
  questId?: InputMaybe<Order_By>;
  skill?: InputMaybe<Skill_Order_By>;
  skillId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "quest_skill" */
export type Quest_Skill_Pk_Columns_Input = {
  questId: Scalars['uuid'];
  skillId: Scalars['uuid'];
};

/** select columns of table "quest_skill" */
export enum Quest_Skill_Select_Column {
  /** column name */
  QuestId = 'questId',
  /** column name */
  SkillId = 'skillId',
}

/** input type for updating data in table "quest_skill" */
export type Quest_Skill_Set_Input = {
  questId?: InputMaybe<Scalars['uuid']>;
  skillId?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "quest_skill" */
export enum Quest_Skill_Update_Column {
  /** column name */
  QuestId = 'questId',
  /** column name */
  SkillId = 'skillId',
}

/** aggregate stddev on columns */
export type Quest_Stddev_Fields = {
  cooldown?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "quest" */
export type Quest_Stddev_Order_By = {
  cooldown?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Quest_Stddev_Pop_Fields = {
  cooldown?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "quest" */
export type Quest_Stddev_Pop_Order_By = {
  cooldown?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Quest_Stddev_Samp_Fields = {
  cooldown?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "quest" */
export type Quest_Stddev_Samp_Order_By = {
  cooldown?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Quest_Sum_Fields = {
  cooldown?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "quest" */
export type Quest_Sum_Order_By = {
  cooldown?: InputMaybe<Order_By>;
};

/** update columns of table "quest" */
export enum Quest_Update_Column {
  /** column name */
  Cooldown = 'cooldown',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedByPlayerId = 'createdByPlayerId',
  /** column name */
  Description = 'description',
  /** column name */
  ExternalLink = 'externalLink',
  /** column name */
  GuildId = 'guildId',
  /** column name */
  Id = 'id',
  /** column name */
  Image = 'image',
  /** column name */
  Repetition = 'repetition',
  /** column name */
  Status = 'status',
  /** column name */
  Title = 'title',
}

/** aggregate var_pop on columns */
export type Quest_Var_Pop_Fields = {
  cooldown?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "quest" */
export type Quest_Var_Pop_Order_By = {
  cooldown?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Quest_Var_Samp_Fields = {
  cooldown?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "quest" */
export type Quest_Var_Samp_Order_By = {
  cooldown?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Quest_Variance_Fields = {
  cooldown?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "quest" */
export type Quest_Variance_Order_By = {
  cooldown?: InputMaybe<Order_By>;
};

/** columns and relationships of "skill" */
export type Skill = {
  /** An array relationship */
  Player_Skills: Array<Player_Skill>;
  /** An aggregated array relationship */
  Player_Skills_aggregate: Player_Skill_Aggregate;
  category: SkillCategory_Enum;
  id: Scalars['uuid'];
  name: Scalars['String'];
  /** An array relationship */
  quest_skills: Array<Quest_Skill>;
  /** An aggregated array relationship */
  quest_skills_aggregate: Quest_Skill_Aggregate;
};

/** columns and relationships of "skill" */
export type SkillPlayer_SkillsArgs = {
  distinct_on?: InputMaybe<Array<Player_Skill_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Player_Skill_Order_By>>;
  where?: InputMaybe<Player_Skill_Bool_Exp>;
};

/** columns and relationships of "skill" */
export type SkillPlayer_Skills_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Player_Skill_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Player_Skill_Order_By>>;
  where?: InputMaybe<Player_Skill_Bool_Exp>;
};

/** columns and relationships of "skill" */
export type SkillQuest_SkillsArgs = {
  distinct_on?: InputMaybe<Array<Quest_Skill_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quest_Skill_Order_By>>;
  where?: InputMaybe<Quest_Skill_Bool_Exp>;
};

/** columns and relationships of "skill" */
export type SkillQuest_Skills_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Quest_Skill_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quest_Skill_Order_By>>;
  where?: InputMaybe<Quest_Skill_Bool_Exp>;
};

/** aggregated selection of "skill" */
export type Skill_Aggregate = {
  aggregate?: Maybe<Skill_Aggregate_Fields>;
  nodes: Array<Skill>;
};

/** aggregate fields of "skill" */
export type Skill_Aggregate_Fields = {
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Skill_Max_Fields>;
  min?: Maybe<Skill_Min_Fields>;
};

/** aggregate fields of "skill" */
export type Skill_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Skill_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "skill" */
export type Skill_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Skill_Max_Order_By>;
  min?: InputMaybe<Skill_Min_Order_By>;
};

/** input type for inserting array relation for remote table "skill" */
export type Skill_Arr_Rel_Insert_Input = {
  data: Array<Skill_Insert_Input>;
  on_conflict?: InputMaybe<Skill_On_Conflict>;
};

/** Boolean expression to filter rows from the table "skill". All fields are combined with a logical 'AND'. */
export type Skill_Bool_Exp = {
  Player_Skills?: InputMaybe<Player_Skill_Bool_Exp>;
  _and?: InputMaybe<Array<InputMaybe<Skill_Bool_Exp>>>;
  _not?: InputMaybe<Skill_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Skill_Bool_Exp>>>;
  category?: InputMaybe<SkillCategory_Enum_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  quest_skills?: InputMaybe<Quest_Skill_Bool_Exp>;
};

/** unique or primary key constraints on table "skill" */
export enum Skill_Constraint {
  /** unique or primary key constraint */
  SkillPkey = 'Skill_pkey',
}

/** input type for inserting data into table "skill" */
export type Skill_Insert_Input = {
  Player_Skills?: InputMaybe<Player_Skill_Arr_Rel_Insert_Input>;
  category?: InputMaybe<SkillCategory_Enum>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  quest_skills?: InputMaybe<Quest_Skill_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Skill_Max_Fields = {
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "skill" */
export type Skill_Max_Order_By = {
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Skill_Min_Fields = {
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "skill" */
export type Skill_Min_Order_By = {
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "skill" */
export type Skill_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Skill>;
};

/** input type for inserting object relation for remote table "skill" */
export type Skill_Obj_Rel_Insert_Input = {
  data: Skill_Insert_Input;
  on_conflict?: InputMaybe<Skill_On_Conflict>;
};

/** on conflict condition type for table "skill" */
export type Skill_On_Conflict = {
  constraint: Skill_Constraint;
  update_columns: Array<Skill_Update_Column>;
  where?: InputMaybe<Skill_Bool_Exp>;
};

/** ordering options when selecting data from "skill" */
export type Skill_Order_By = {
  Player_Skills_aggregate?: InputMaybe<Player_Skill_Aggregate_Order_By>;
  category?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  quest_skills_aggregate?: InputMaybe<Quest_Skill_Aggregate_Order_By>;
};

/** primary key columns input for table: "skill" */
export type Skill_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "skill" */
export enum Skill_Select_Column {
  /** column name */
  Category = 'category',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
}

/** input type for updating data in table "skill" */
export type Skill_Set_Input = {
  category?: InputMaybe<SkillCategory_Enum>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
};

/** update columns of table "skill" */
export enum Skill_Update_Column {
  /** column name */
  Category = 'category',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
}

/** subscription root */
export type Subscription_Root = {
  /** fetch data from the table: "AccountType" */
  AccountType: Array<AccountType>;
  /** fetch aggregated fields from the table: "AccountType" */
  AccountType_aggregate: AccountType_Aggregate;
  /** fetch data from the table: "AccountType" using primary key columns */
  AccountType_by_pk?: Maybe<AccountType>;
  /** fetch data from the table: "ColorAspect" */
  ColorAspect: Array<ColorAspect>;
  /** fetch aggregated fields from the table: "ColorAspect" */
  ColorAspect_aggregate: ColorAspect_Aggregate;
  /** fetch data from the table: "ColorAspect" using primary key columns */
  ColorAspect_by_pk?: Maybe<ColorAspect>;
  /** fetch data from the table: "ExplorerType" */
  ExplorerType: Array<ExplorerType>;
  /** fetch aggregated fields from the table: "ExplorerType" */
  ExplorerType_aggregate: ExplorerType_Aggregate;
  /** fetch data from the table: "ExplorerType" using primary key columns */
  ExplorerType_by_pk?: Maybe<ExplorerType>;
  /** fetch data from the table: "GuildStatus" */
  GuildStatus: Array<GuildStatus>;
  /** fetch aggregated fields from the table: "GuildStatus" */
  GuildStatus_aggregate: GuildStatus_Aggregate;
  /** fetch data from the table: "GuildStatus" using primary key columns */
  GuildStatus_by_pk?: Maybe<GuildStatus>;
  /** fetch data from the table: "GuildType" */
  GuildType: Array<GuildType>;
  /** fetch aggregated fields from the table: "GuildType" */
  GuildType_aggregate: GuildType_Aggregate;
  /** fetch data from the table: "GuildType" using primary key columns */
  GuildType_by_pk?: Maybe<GuildType>;
  /** fetch data from the table: "PlayerRank" */
  PlayerRank: Array<PlayerRank>;
  /** fetch aggregated fields from the table: "PlayerRank" */
  PlayerRank_aggregate: PlayerRank_Aggregate;
  /** fetch data from the table: "PlayerRank" using primary key columns */
  PlayerRank_by_pk?: Maybe<PlayerRank>;
  /** fetch data from the table: "PlayerRole" */
  PlayerRole: Array<PlayerRole>;
  /** fetch aggregated fields from the table: "PlayerRole" */
  PlayerRole_aggregate: PlayerRole_Aggregate;
  /** fetch data from the table: "PlayerRole" using primary key columns */
  PlayerRole_by_pk?: Maybe<PlayerRole>;
  /** fetch data from the table: "QuestCompletionStatus" */
  QuestCompletionStatus: Array<QuestCompletionStatus>;
  /** fetch aggregated fields from the table: "QuestCompletionStatus" */
  QuestCompletionStatus_aggregate: QuestCompletionStatus_Aggregate;
  /** fetch data from the table: "QuestCompletionStatus" using primary key columns */
  QuestCompletionStatus_by_pk?: Maybe<QuestCompletionStatus>;
  /** fetch data from the table: "QuestRepetition" */
  QuestRepetition: Array<QuestRepetition>;
  /** fetch aggregated fields from the table: "QuestRepetition" */
  QuestRepetition_aggregate: QuestRepetition_Aggregate;
  /** fetch data from the table: "QuestRepetition" using primary key columns */
  QuestRepetition_by_pk?: Maybe<QuestRepetition>;
  /** fetch data from the table: "QuestStatus" */
  QuestStatus: Array<QuestStatus>;
  /** fetch aggregated fields from the table: "QuestStatus" */
  QuestStatus_aggregate: QuestStatus_Aggregate;
  /** fetch data from the table: "QuestStatus" using primary key columns */
  QuestStatus_by_pk?: Maybe<QuestStatus>;
  /** fetch data from the table: "SkillCategory" */
  SkillCategory: Array<SkillCategory>;
  /** fetch aggregated fields from the table: "SkillCategory" */
  SkillCategory_aggregate: SkillCategory_Aggregate;
  /** fetch data from the table: "SkillCategory" using primary key columns */
  SkillCategory_by_pk?: Maybe<SkillCategory>;
  /** fetch data from the table: "balance" */
  balance: Array<Balance>;
  /** fetch aggregated fields from the table: "balance" */
  balance_aggregate: Balance_Aggregate;
  /** fetch data from the table: "balance" using primary key columns */
  balance_by_pk?: Maybe<Balance>;
  /** fetch data from the table: "dao" */
  dao: Array<Dao>;
  /** fetch aggregated fields from the table: "dao" */
  dao_aggregate: Dao_Aggregate;
  /** fetch data from the table: "dao" using primary key columns */
  dao_by_pk?: Maybe<Dao>;
  /** fetch data from the table: "dao_player" */
  dao_player: Array<Dao_Player>;
  /** fetch aggregated fields from the table: "dao_player" */
  dao_player_aggregate: Dao_Player_Aggregate;
  /** fetch data from the table: "dao_player" using primary key columns */
  dao_player_by_pk?: Maybe<Dao_Player>;
  /** fetch data from the table: "guild" */
  guild: Array<Guild>;
  /** fetch aggregated fields from the table: "guild" */
  guild_aggregate: Guild_Aggregate;
  /** fetch data from the table: "guild" using primary key columns */
  guild_by_pk?: Maybe<Guild>;
  /** fetch data from the table: "guild_metadata" */
  guild_metadata: Array<Guild_Metadata>;
  /** fetch aggregated fields from the table: "guild_metadata" */
  guild_metadata_aggregate: Guild_Metadata_Aggregate;
  /** fetch data from the table: "guild_metadata" using primary key columns */
  guild_metadata_by_pk?: Maybe<Guild_Metadata>;
  /** fetch data from the table: "guild_player" */
  guild_player: Array<Guild_Player>;
  /** fetch aggregated fields from the table: "guild_player" */
  guild_player_aggregate: Guild_Player_Aggregate;
  /** fetch data from the table: "guild_player" using primary key columns */
  guild_player_by_pk?: Maybe<Guild_Player>;
  /** fetch data from the table: "me" */
  me: Array<Me>;
  /** fetch aggregated fields from the table: "me" */
  me_aggregate: Me_Aggregate;
  /** fetch data from the table: "player" */
  player: Array<Player>;
  /** fetch data from the table: "player_account" */
  player_account: Array<Player_Account>;
  /** fetch aggregated fields from the table: "player_account" */
  player_account_aggregate: Player_Account_Aggregate;
  /** fetch aggregated fields from the table: "player" */
  player_aggregate: Player_Aggregate;
  /** fetch data from the table: "player" using primary key columns */
  player_by_pk?: Maybe<Player>;
  /** fetch data from the table: "player_role" */
  player_role: Array<Player_Role>;
  /** fetch aggregated fields from the table: "player_role" */
  player_role_aggregate: Player_Role_Aggregate;
  /** fetch data from the table: "player_role" using primary key columns */
  player_role_by_pk?: Maybe<Player_Role>;
  /** fetch data from the table: "player_skill" */
  player_skill: Array<Player_Skill>;
  /** fetch aggregated fields from the table: "player_skill" */
  player_skill_aggregate: Player_Skill_Aggregate;
  /** fetch data from the table: "player_skill" using primary key columns */
  player_skill_by_pk?: Maybe<Player_Skill>;
  /** fetch data from the table: "profile" */
  profile: Array<Profile>;
  /** fetch aggregated fields from the table: "profile" */
  profile_aggregate: Profile_Aggregate;
  /** fetch data from the table: "profile" using primary key columns */
  profile_by_pk?: Maybe<Profile>;
  /** fetch data from the table: "quest" */
  quest: Array<Quest>;
  /** fetch aggregated fields from the table: "quest" */
  quest_aggregate: Quest_Aggregate;
  /** fetch data from the table: "quest" using primary key columns */
  quest_by_pk?: Maybe<Quest>;
  /** fetch data from the table: "quest_completion" */
  quest_completion: Array<Quest_Completion>;
  /** fetch aggregated fields from the table: "quest_completion" */
  quest_completion_aggregate: Quest_Completion_Aggregate;
  /** fetch data from the table: "quest_completion" using primary key columns */
  quest_completion_by_pk?: Maybe<Quest_Completion>;
  /** fetch data from the table: "quest_role" */
  quest_role: Array<Quest_Role>;
  /** fetch aggregated fields from the table: "quest_role" */
  quest_role_aggregate: Quest_Role_Aggregate;
  /** fetch data from the table: "quest_role" using primary key columns */
  quest_role_by_pk?: Maybe<Quest_Role>;
  /** fetch data from the table: "quest_skill" */
  quest_skill: Array<Quest_Skill>;
  /** fetch aggregated fields from the table: "quest_skill" */
  quest_skill_aggregate: Quest_Skill_Aggregate;
  /** fetch data from the table: "quest_skill" using primary key columns */
  quest_skill_by_pk?: Maybe<Quest_Skill>;
  /** fetch data from the table: "skill" */
  skill: Array<Skill>;
  /** fetch aggregated fields from the table: "skill" */
  skill_aggregate: Skill_Aggregate;
  /** fetch data from the table: "skill" using primary key columns */
  skill_by_pk?: Maybe<Skill>;
  /** fetch data from the table: "token" */
  token: Array<Token>;
  /** fetch aggregated fields from the table: "token" */
  token_aggregate: Token_Aggregate;
  /** fetch data from the table: "token" using primary key columns */
  token_by_pk?: Maybe<Token>;
  /** retrieve the result of action: "updateIDXProfile" */
  updateIDXProfile?: Maybe<UpdateIdxProfile>;
  /** fetch data from the table: "xp" */
  xp: Array<Xp>;
  /** fetch aggregated fields from the table: "xp" */
  xp_aggregate: Xp_Aggregate;
  /** fetch data from the table: "xp" using primary key columns */
  xp_by_pk?: Maybe<Xp>;
};

/** subscription root */
export type Subscription_RootAccountTypeArgs = {
  distinct_on?: InputMaybe<Array<AccountType_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AccountType_Order_By>>;
  where?: InputMaybe<AccountType_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootAccountType_AggregateArgs = {
  distinct_on?: InputMaybe<Array<AccountType_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<AccountType_Order_By>>;
  where?: InputMaybe<AccountType_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootAccountType_By_PkArgs = {
  type: Scalars['String'];
};

/** subscription root */
export type Subscription_RootColorAspectArgs = {
  distinct_on?: InputMaybe<Array<ColorAspect_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ColorAspect_Order_By>>;
  where?: InputMaybe<ColorAspect_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootColorAspect_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ColorAspect_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ColorAspect_Order_By>>;
  where?: InputMaybe<ColorAspect_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootColorAspect_By_PkArgs = {
  mask: Scalars['Int'];
};

/** subscription root */
export type Subscription_RootExplorerTypeArgs = {
  distinct_on?: InputMaybe<Array<ExplorerType_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ExplorerType_Order_By>>;
  where?: InputMaybe<ExplorerType_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootExplorerType_AggregateArgs = {
  distinct_on?: InputMaybe<Array<ExplorerType_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<ExplorerType_Order_By>>;
  where?: InputMaybe<ExplorerType_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootExplorerType_By_PkArgs = {
  id: Scalars['Int'];
};

/** subscription root */
export type Subscription_RootGuildStatusArgs = {
  distinct_on?: InputMaybe<Array<GuildStatus_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GuildStatus_Order_By>>;
  where?: InputMaybe<GuildStatus_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootGuildStatus_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GuildStatus_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GuildStatus_Order_By>>;
  where?: InputMaybe<GuildStatus_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootGuildStatus_By_PkArgs = {
  status: Scalars['String'];
};

/** subscription root */
export type Subscription_RootGuildTypeArgs = {
  distinct_on?: InputMaybe<Array<GuildType_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GuildType_Order_By>>;
  where?: InputMaybe<GuildType_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootGuildType_AggregateArgs = {
  distinct_on?: InputMaybe<Array<GuildType_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<GuildType_Order_By>>;
  where?: InputMaybe<GuildType_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootGuildType_By_PkArgs = {
  name: Scalars['String'];
};

/** subscription root */
export type Subscription_RootPlayerRankArgs = {
  distinct_on?: InputMaybe<Array<PlayerRank_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<PlayerRank_Order_By>>;
  where?: InputMaybe<PlayerRank_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootPlayerRank_AggregateArgs = {
  distinct_on?: InputMaybe<Array<PlayerRank_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<PlayerRank_Order_By>>;
  where?: InputMaybe<PlayerRank_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootPlayerRank_By_PkArgs = {
  rank: Scalars['String'];
};

/** subscription root */
export type Subscription_RootPlayerRoleArgs = {
  distinct_on?: InputMaybe<Array<PlayerRole_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<PlayerRole_Order_By>>;
  where?: InputMaybe<PlayerRole_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootPlayerRole_AggregateArgs = {
  distinct_on?: InputMaybe<Array<PlayerRole_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<PlayerRole_Order_By>>;
  where?: InputMaybe<PlayerRole_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootPlayerRole_By_PkArgs = {
  role: Scalars['String'];
};

/** subscription root */
export type Subscription_RootQuestCompletionStatusArgs = {
  distinct_on?: InputMaybe<Array<QuestCompletionStatus_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<QuestCompletionStatus_Order_By>>;
  where?: InputMaybe<QuestCompletionStatus_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootQuestCompletionStatus_AggregateArgs = {
  distinct_on?: InputMaybe<Array<QuestCompletionStatus_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<QuestCompletionStatus_Order_By>>;
  where?: InputMaybe<QuestCompletionStatus_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootQuestCompletionStatus_By_PkArgs = {
  status: Scalars['String'];
};

/** subscription root */
export type Subscription_RootQuestRepetitionArgs = {
  distinct_on?: InputMaybe<Array<QuestRepetition_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<QuestRepetition_Order_By>>;
  where?: InputMaybe<QuestRepetition_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootQuestRepetition_AggregateArgs = {
  distinct_on?: InputMaybe<Array<QuestRepetition_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<QuestRepetition_Order_By>>;
  where?: InputMaybe<QuestRepetition_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootQuestRepetition_By_PkArgs = {
  repetition: Scalars['String'];
};

/** subscription root */
export type Subscription_RootQuestStatusArgs = {
  distinct_on?: InputMaybe<Array<QuestStatus_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<QuestStatus_Order_By>>;
  where?: InputMaybe<QuestStatus_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootQuestStatus_AggregateArgs = {
  distinct_on?: InputMaybe<Array<QuestStatus_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<QuestStatus_Order_By>>;
  where?: InputMaybe<QuestStatus_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootQuestStatus_By_PkArgs = {
  status: Scalars['String'];
};

/** subscription root */
export type Subscription_RootSkillCategoryArgs = {
  distinct_on?: InputMaybe<Array<SkillCategory_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SkillCategory_Order_By>>;
  where?: InputMaybe<SkillCategory_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootSkillCategory_AggregateArgs = {
  distinct_on?: InputMaybe<Array<SkillCategory_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<SkillCategory_Order_By>>;
  where?: InputMaybe<SkillCategory_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootSkillCategory_By_PkArgs = {
  name: Scalars['String'];
};

/** subscription root */
export type Subscription_RootBalanceArgs = {
  distinct_on?: InputMaybe<Array<Balance_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Balance_Order_By>>;
  where?: InputMaybe<Balance_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootBalance_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Balance_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Balance_Order_By>>;
  where?: InputMaybe<Balance_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootBalance_By_PkArgs = {
  id: Scalars['uuid'];
};

/** subscription root */
export type Subscription_RootDaoArgs = {
  distinct_on?: InputMaybe<Array<Dao_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Dao_Order_By>>;
  where?: InputMaybe<Dao_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootDao_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Dao_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Dao_Order_By>>;
  where?: InputMaybe<Dao_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootDao_By_PkArgs = {
  id: Scalars['uuid'];
};

/** subscription root */
export type Subscription_RootDao_PlayerArgs = {
  distinct_on?: InputMaybe<Array<Dao_Player_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Dao_Player_Order_By>>;
  where?: InputMaybe<Dao_Player_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootDao_Player_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Dao_Player_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Dao_Player_Order_By>>;
  where?: InputMaybe<Dao_Player_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootDao_Player_By_PkArgs = {
  daoId: Scalars['uuid'];
  playerId: Scalars['uuid'];
};

/** subscription root */
export type Subscription_RootGuildArgs = {
  distinct_on?: InputMaybe<Array<Guild_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Guild_Order_By>>;
  where?: InputMaybe<Guild_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootGuild_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Guild_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Guild_Order_By>>;
  where?: InputMaybe<Guild_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootGuild_By_PkArgs = {
  id: Scalars['uuid'];
};

/** subscription root */
export type Subscription_RootGuild_MetadataArgs = {
  distinct_on?: InputMaybe<Array<Guild_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Guild_Metadata_Order_By>>;
  where?: InputMaybe<Guild_Metadata_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootGuild_Metadata_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Guild_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Guild_Metadata_Order_By>>;
  where?: InputMaybe<Guild_Metadata_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootGuild_Metadata_By_PkArgs = {
  guildId: Scalars['uuid'];
};

/** subscription root */
export type Subscription_RootGuild_PlayerArgs = {
  distinct_on?: InputMaybe<Array<Guild_Player_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Guild_Player_Order_By>>;
  where?: InputMaybe<Guild_Player_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootGuild_Player_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Guild_Player_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Guild_Player_Order_By>>;
  where?: InputMaybe<Guild_Player_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootGuild_Player_By_PkArgs = {
  guildId: Scalars['uuid'];
  playerId: Scalars['uuid'];
};

/** subscription root */
export type Subscription_RootMeArgs = {
  distinct_on?: InputMaybe<Array<Me_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Me_Order_By>>;
  where?: InputMaybe<Me_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootMe_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Me_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Me_Order_By>>;
  where?: InputMaybe<Me_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootPlayerArgs = {
  distinct_on?: InputMaybe<Array<Player_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Player_Order_By>>;
  where?: InputMaybe<Player_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootPlayer_AccountArgs = {
  distinct_on?: InputMaybe<Array<Player_Account_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Player_Account_Order_By>>;
  where?: InputMaybe<Player_Account_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootPlayer_Account_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Player_Account_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Player_Account_Order_By>>;
  where?: InputMaybe<Player_Account_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootPlayer_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Player_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Player_Order_By>>;
  where?: InputMaybe<Player_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootPlayer_By_PkArgs = {
  id: Scalars['uuid'];
};

/** subscription root */
export type Subscription_RootPlayer_RoleArgs = {
  distinct_on?: InputMaybe<Array<Player_Role_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Player_Role_Order_By>>;
  where?: InputMaybe<Player_Role_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootPlayer_Role_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Player_Role_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Player_Role_Order_By>>;
  where?: InputMaybe<Player_Role_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootPlayer_Role_By_PkArgs = {
  player_id: Scalars['uuid'];
  role: Scalars['String'];
};

/** subscription root */
export type Subscription_RootPlayer_SkillArgs = {
  distinct_on?: InputMaybe<Array<Player_Skill_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Player_Skill_Order_By>>;
  where?: InputMaybe<Player_Skill_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootPlayer_Skill_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Player_Skill_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Player_Skill_Order_By>>;
  where?: InputMaybe<Player_Skill_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootPlayer_Skill_By_PkArgs = {
  id: Scalars['uuid'];
};

/** subscription root */
export type Subscription_RootProfileArgs = {
  distinct_on?: InputMaybe<Array<Profile_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Profile_Order_By>>;
  where?: InputMaybe<Profile_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootProfile_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Profile_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Profile_Order_By>>;
  where?: InputMaybe<Profile_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootProfile_By_PkArgs = {
  id: Scalars['uuid'];
};

/** subscription root */
export type Subscription_RootQuestArgs = {
  distinct_on?: InputMaybe<Array<Quest_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quest_Order_By>>;
  where?: InputMaybe<Quest_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootQuest_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Quest_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quest_Order_By>>;
  where?: InputMaybe<Quest_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootQuest_By_PkArgs = {
  id: Scalars['uuid'];
};

/** subscription root */
export type Subscription_RootQuest_CompletionArgs = {
  distinct_on?: InputMaybe<Array<Quest_Completion_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quest_Completion_Order_By>>;
  where?: InputMaybe<Quest_Completion_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootQuest_Completion_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Quest_Completion_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quest_Completion_Order_By>>;
  where?: InputMaybe<Quest_Completion_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootQuest_Completion_By_PkArgs = {
  id: Scalars['uuid'];
};

/** subscription root */
export type Subscription_RootQuest_RoleArgs = {
  distinct_on?: InputMaybe<Array<Quest_Role_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quest_Role_Order_By>>;
  where?: InputMaybe<Quest_Role_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootQuest_Role_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Quest_Role_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quest_Role_Order_By>>;
  where?: InputMaybe<Quest_Role_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootQuest_Role_By_PkArgs = {
  questId: Scalars['uuid'];
  role: Scalars['String'];
};

/** subscription root */
export type Subscription_RootQuest_SkillArgs = {
  distinct_on?: InputMaybe<Array<Quest_Skill_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quest_Skill_Order_By>>;
  where?: InputMaybe<Quest_Skill_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootQuest_Skill_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Quest_Skill_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Quest_Skill_Order_By>>;
  where?: InputMaybe<Quest_Skill_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootQuest_Skill_By_PkArgs = {
  questId: Scalars['uuid'];
  skillId: Scalars['uuid'];
};

/** subscription root */
export type Subscription_RootSkillArgs = {
  distinct_on?: InputMaybe<Array<Skill_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Skill_Order_By>>;
  where?: InputMaybe<Skill_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootSkill_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Skill_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Skill_Order_By>>;
  where?: InputMaybe<Skill_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootSkill_By_PkArgs = {
  id: Scalars['uuid'];
};

/** subscription root */
export type Subscription_RootTokenArgs = {
  distinct_on?: InputMaybe<Array<Token_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Token_Order_By>>;
  where?: InputMaybe<Token_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootToken_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Token_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Token_Order_By>>;
  where?: InputMaybe<Token_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootToken_By_PkArgs = {
  address: Scalars['String'];
};

/** subscription root */
export type Subscription_RootUpdateIdxProfileArgs = {
  id: Scalars['uuid'];
};

/** subscription root */
export type Subscription_RootXpArgs = {
  distinct_on?: InputMaybe<Array<Xp_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Xp_Order_By>>;
  where?: InputMaybe<Xp_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootXp_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Xp_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Xp_Order_By>>;
  where?: InputMaybe<Xp_Bool_Exp>;
};

/** subscription root */
export type Subscription_RootXp_By_PkArgs = {
  id: Scalars['uuid'];
};

/** expression to compare columns of type timestamptz. All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']>;
  _gt?: InputMaybe<Scalars['timestamptz']>;
  _gte?: InputMaybe<Scalars['timestamptz']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamptz']>;
  _lte?: InputMaybe<Scalars['timestamptz']>;
  _neq?: InputMaybe<Scalars['timestamptz']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']>>;
};

/** columns and relationships of "token" */
export type Token = {
  address: Scalars['String'];
  /** An array relationship */
  balances: Array<Balance>;
  /** An aggregated array relationship */
  balances_aggregate: Balance_Aggregate;
  chainId: Scalars['Int'];
  /** An object relationship */
  guild: Guild;
  guildId: Scalars['uuid'];
  lastOffset: Scalars['Int'];
  safeAddress: Scalars['String'];
  /** An array relationship */
  xps: Array<Xp>;
  /** An aggregated array relationship */
  xps_aggregate: Xp_Aggregate;
};

/** columns and relationships of "token" */
export type TokenBalancesArgs = {
  distinct_on?: InputMaybe<Array<Balance_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Balance_Order_By>>;
  where?: InputMaybe<Balance_Bool_Exp>;
};

/** columns and relationships of "token" */
export type TokenBalances_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Balance_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Balance_Order_By>>;
  where?: InputMaybe<Balance_Bool_Exp>;
};

/** columns and relationships of "token" */
export type TokenXpsArgs = {
  distinct_on?: InputMaybe<Array<Xp_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Xp_Order_By>>;
  where?: InputMaybe<Xp_Bool_Exp>;
};

/** columns and relationships of "token" */
export type TokenXps_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Xp_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Xp_Order_By>>;
  where?: InputMaybe<Xp_Bool_Exp>;
};

/** aggregated selection of "token" */
export type Token_Aggregate = {
  aggregate?: Maybe<Token_Aggregate_Fields>;
  nodes: Array<Token>;
};

/** aggregate fields of "token" */
export type Token_Aggregate_Fields = {
  avg?: Maybe<Token_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Token_Max_Fields>;
  min?: Maybe<Token_Min_Fields>;
  stddev?: Maybe<Token_Stddev_Fields>;
  stddev_pop?: Maybe<Token_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Token_Stddev_Samp_Fields>;
  sum?: Maybe<Token_Sum_Fields>;
  var_pop?: Maybe<Token_Var_Pop_Fields>;
  var_samp?: Maybe<Token_Var_Samp_Fields>;
  variance?: Maybe<Token_Variance_Fields>;
};

/** aggregate fields of "token" */
export type Token_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Token_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "token" */
export type Token_Aggregate_Order_By = {
  avg?: InputMaybe<Token_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Token_Max_Order_By>;
  min?: InputMaybe<Token_Min_Order_By>;
  stddev?: InputMaybe<Token_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Token_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Token_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Token_Sum_Order_By>;
  var_pop?: InputMaybe<Token_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Token_Var_Samp_Order_By>;
  variance?: InputMaybe<Token_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "token" */
export type Token_Arr_Rel_Insert_Input = {
  data: Array<Token_Insert_Input>;
  on_conflict?: InputMaybe<Token_On_Conflict>;
};

/** aggregate avg on columns */
export type Token_Avg_Fields = {
  chainId?: Maybe<Scalars['Float']>;
  lastOffset?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "token" */
export type Token_Avg_Order_By = {
  chainId?: InputMaybe<Order_By>;
  lastOffset?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "token". All fields are combined with a logical 'AND'. */
export type Token_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Token_Bool_Exp>>>;
  _not?: InputMaybe<Token_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Token_Bool_Exp>>>;
  address?: InputMaybe<String_Comparison_Exp>;
  balances?: InputMaybe<Balance_Bool_Exp>;
  chainId?: InputMaybe<Int_Comparison_Exp>;
  guild?: InputMaybe<Guild_Bool_Exp>;
  guildId?: InputMaybe<Uuid_Comparison_Exp>;
  lastOffset?: InputMaybe<Int_Comparison_Exp>;
  safeAddress?: InputMaybe<String_Comparison_Exp>;
  xps?: InputMaybe<Xp_Bool_Exp>;
};

/** unique or primary key constraints on table "token" */
export enum Token_Constraint {
  /** unique or primary key constraint */
  TokenAddressKey = 'token_address_key',
  /** unique or primary key constraint */
  TokenGuildIdKey = 'token_guild_id_key',
  /** unique or primary key constraint */
  TokenPkey = 'token_pkey',
  /** unique or primary key constraint */
  TokenSafeAddressKey = 'token_safe_address_key',
}

/** input type for incrementing integer column in table "token" */
export type Token_Inc_Input = {
  chainId?: InputMaybe<Scalars['Int']>;
  lastOffset?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "token" */
export type Token_Insert_Input = {
  address?: InputMaybe<Scalars['String']>;
  balances?: InputMaybe<Balance_Arr_Rel_Insert_Input>;
  chainId?: InputMaybe<Scalars['Int']>;
  guild?: InputMaybe<Guild_Obj_Rel_Insert_Input>;
  guildId?: InputMaybe<Scalars['uuid']>;
  lastOffset?: InputMaybe<Scalars['Int']>;
  safeAddress?: InputMaybe<Scalars['String']>;
  xps?: InputMaybe<Xp_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Token_Max_Fields = {
  address?: Maybe<Scalars['String']>;
  chainId?: Maybe<Scalars['Int']>;
  guildId?: Maybe<Scalars['uuid']>;
  lastOffset?: Maybe<Scalars['Int']>;
  safeAddress?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "token" */
export type Token_Max_Order_By = {
  address?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  guildId?: InputMaybe<Order_By>;
  lastOffset?: InputMaybe<Order_By>;
  safeAddress?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Token_Min_Fields = {
  address?: Maybe<Scalars['String']>;
  chainId?: Maybe<Scalars['Int']>;
  guildId?: Maybe<Scalars['uuid']>;
  lastOffset?: Maybe<Scalars['Int']>;
  safeAddress?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "token" */
export type Token_Min_Order_By = {
  address?: InputMaybe<Order_By>;
  chainId?: InputMaybe<Order_By>;
  guildId?: InputMaybe<Order_By>;
  lastOffset?: InputMaybe<Order_By>;
  safeAddress?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "token" */
export type Token_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Token>;
};

/** input type for inserting object relation for remote table "token" */
export type Token_Obj_Rel_Insert_Input = {
  data: Token_Insert_Input;
  on_conflict?: InputMaybe<Token_On_Conflict>;
};

/** on conflict condition type for table "token" */
export type Token_On_Conflict = {
  constraint: Token_Constraint;
  update_columns: Array<Token_Update_Column>;
  where?: InputMaybe<Token_Bool_Exp>;
};

/** ordering options when selecting data from "token" */
export type Token_Order_By = {
  address?: InputMaybe<Order_By>;
  balances_aggregate?: InputMaybe<Balance_Aggregate_Order_By>;
  chainId?: InputMaybe<Order_By>;
  guild?: InputMaybe<Guild_Order_By>;
  guildId?: InputMaybe<Order_By>;
  lastOffset?: InputMaybe<Order_By>;
  safeAddress?: InputMaybe<Order_By>;
  xps_aggregate?: InputMaybe<Xp_Aggregate_Order_By>;
};

/** primary key columns input for table: "token" */
export type Token_Pk_Columns_Input = {
  address: Scalars['String'];
};

/** select columns of table "token" */
export enum Token_Select_Column {
  /** column name */
  Address = 'address',
  /** column name */
  ChainId = 'chainId',
  /** column name */
  GuildId = 'guildId',
  /** column name */
  LastOffset = 'lastOffset',
  /** column name */
  SafeAddress = 'safeAddress',
}

/** input type for updating data in table "token" */
export type Token_Set_Input = {
  address?: InputMaybe<Scalars['String']>;
  chainId?: InputMaybe<Scalars['Int']>;
  guildId?: InputMaybe<Scalars['uuid']>;
  lastOffset?: InputMaybe<Scalars['Int']>;
  safeAddress?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Token_Stddev_Fields = {
  chainId?: Maybe<Scalars['Float']>;
  lastOffset?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "token" */
export type Token_Stddev_Order_By = {
  chainId?: InputMaybe<Order_By>;
  lastOffset?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Token_Stddev_Pop_Fields = {
  chainId?: Maybe<Scalars['Float']>;
  lastOffset?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "token" */
export type Token_Stddev_Pop_Order_By = {
  chainId?: InputMaybe<Order_By>;
  lastOffset?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Token_Stddev_Samp_Fields = {
  chainId?: Maybe<Scalars['Float']>;
  lastOffset?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "token" */
export type Token_Stddev_Samp_Order_By = {
  chainId?: InputMaybe<Order_By>;
  lastOffset?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Token_Sum_Fields = {
  chainId?: Maybe<Scalars['Int']>;
  lastOffset?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "token" */
export type Token_Sum_Order_By = {
  chainId?: InputMaybe<Order_By>;
  lastOffset?: InputMaybe<Order_By>;
};

/** update columns of table "token" */
export enum Token_Update_Column {
  /** column name */
  Address = 'address',
  /** column name */
  ChainId = 'chainId',
  /** column name */
  GuildId = 'guildId',
  /** column name */
  LastOffset = 'lastOffset',
  /** column name */
  SafeAddress = 'safeAddress',
}

/** aggregate var_pop on columns */
export type Token_Var_Pop_Fields = {
  chainId?: Maybe<Scalars['Float']>;
  lastOffset?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "token" */
export type Token_Var_Pop_Order_By = {
  chainId?: InputMaybe<Order_By>;
  lastOffset?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Token_Var_Samp_Fields = {
  chainId?: Maybe<Scalars['Float']>;
  lastOffset?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "token" */
export type Token_Var_Samp_Order_By = {
  chainId?: InputMaybe<Order_By>;
  lastOffset?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Token_Variance_Fields = {
  chainId?: Maybe<Scalars['Float']>;
  lastOffset?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "token" */
export type Token_Variance_Order_By = {
  chainId?: InputMaybe<Order_By>;
  lastOffset?: InputMaybe<Order_By>;
};

/** fields of action: "updateIDXProfile" */
export type UpdateIdxProfile = {
  /** the time at which this action was created */
  created_at?: Maybe<Scalars['timestamptz']>;
  /** errors related to the invocation */
  errors?: Maybe<Scalars['json']>;
  /** the unique id of an action */
  id?: Maybe<Scalars['uuid']>;
  /** the output fields of this action */
  output?: Maybe<CacheProcessOutput>;
};

/** expression to compare columns of type uuid. All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['uuid']>;
  _gt?: InputMaybe<Scalars['uuid']>;
  _gte?: InputMaybe<Scalars['uuid']>;
  _in?: InputMaybe<Array<Scalars['uuid']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['uuid']>;
  _lte?: InputMaybe<Scalars['uuid']>;
  _neq?: InputMaybe<Scalars['uuid']>;
  _nin?: InputMaybe<Array<Scalars['uuid']>>;
};

/** columns and relationships of "xp" */
export type Xp = {
  balance: Scalars['float8'];
  id: Scalars['uuid'];
  /** An object relationship */
  player: Player;
  playerId: Scalars['uuid'];
  /** An object relationship */
  token: Token;
  tokenAddress: Scalars['String'];
};

/** aggregated selection of "xp" */
export type Xp_Aggregate = {
  aggregate?: Maybe<Xp_Aggregate_Fields>;
  nodes: Array<Xp>;
};

/** aggregate fields of "xp" */
export type Xp_Aggregate_Fields = {
  avg?: Maybe<Xp_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Xp_Max_Fields>;
  min?: Maybe<Xp_Min_Fields>;
  stddev?: Maybe<Xp_Stddev_Fields>;
  stddev_pop?: Maybe<Xp_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Xp_Stddev_Samp_Fields>;
  sum?: Maybe<Xp_Sum_Fields>;
  var_pop?: Maybe<Xp_Var_Pop_Fields>;
  var_samp?: Maybe<Xp_Var_Samp_Fields>;
  variance?: Maybe<Xp_Variance_Fields>;
};

/** aggregate fields of "xp" */
export type Xp_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Xp_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "xp" */
export type Xp_Aggregate_Order_By = {
  avg?: InputMaybe<Xp_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Xp_Max_Order_By>;
  min?: InputMaybe<Xp_Min_Order_By>;
  stddev?: InputMaybe<Xp_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Xp_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Xp_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Xp_Sum_Order_By>;
  var_pop?: InputMaybe<Xp_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Xp_Var_Samp_Order_By>;
  variance?: InputMaybe<Xp_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "xp" */
export type Xp_Arr_Rel_Insert_Input = {
  data: Array<Xp_Insert_Input>;
  on_conflict?: InputMaybe<Xp_On_Conflict>;
};

/** aggregate avg on columns */
export type Xp_Avg_Fields = {
  balance?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "xp" */
export type Xp_Avg_Order_By = {
  balance?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "xp". All fields are combined with a logical 'AND'. */
export type Xp_Bool_Exp = {
  _and?: InputMaybe<Array<InputMaybe<Xp_Bool_Exp>>>;
  _not?: InputMaybe<Xp_Bool_Exp>;
  _or?: InputMaybe<Array<InputMaybe<Xp_Bool_Exp>>>;
  balance?: InputMaybe<Float8_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  player?: InputMaybe<Player_Bool_Exp>;
  playerId?: InputMaybe<Uuid_Comparison_Exp>;
  token?: InputMaybe<Token_Bool_Exp>;
  tokenAddress?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "xp" */
export enum Xp_Constraint {
  /** unique or primary key constraint */
  XpPkey = 'xp_pkey',
  /** unique or primary key constraint */
  XpPlayerIdTokenAddressKey = 'xp_player_id_token_address_key',
}

/** input type for incrementing integer column in table "xp" */
export type Xp_Inc_Input = {
  balance?: InputMaybe<Scalars['float8']>;
};

/** input type for inserting data into table "xp" */
export type Xp_Insert_Input = {
  balance?: InputMaybe<Scalars['float8']>;
  id?: InputMaybe<Scalars['uuid']>;
  player?: InputMaybe<Player_Obj_Rel_Insert_Input>;
  playerId?: InputMaybe<Scalars['uuid']>;
  token?: InputMaybe<Token_Obj_Rel_Insert_Input>;
  tokenAddress?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Xp_Max_Fields = {
  balance?: Maybe<Scalars['float8']>;
  id?: Maybe<Scalars['uuid']>;
  playerId?: Maybe<Scalars['uuid']>;
  tokenAddress?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "xp" */
export type Xp_Max_Order_By = {
  balance?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  playerId?: InputMaybe<Order_By>;
  tokenAddress?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Xp_Min_Fields = {
  balance?: Maybe<Scalars['float8']>;
  id?: Maybe<Scalars['uuid']>;
  playerId?: Maybe<Scalars['uuid']>;
  tokenAddress?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "xp" */
export type Xp_Min_Order_By = {
  balance?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  playerId?: InputMaybe<Order_By>;
  tokenAddress?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "xp" */
export type Xp_Mutation_Response = {
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Xp>;
};

/** input type for inserting object relation for remote table "xp" */
export type Xp_Obj_Rel_Insert_Input = {
  data: Xp_Insert_Input;
  on_conflict?: InputMaybe<Xp_On_Conflict>;
};

/** on conflict condition type for table "xp" */
export type Xp_On_Conflict = {
  constraint: Xp_Constraint;
  update_columns: Array<Xp_Update_Column>;
  where?: InputMaybe<Xp_Bool_Exp>;
};

/** ordering options when selecting data from "xp" */
export type Xp_Order_By = {
  balance?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  player?: InputMaybe<Player_Order_By>;
  playerId?: InputMaybe<Order_By>;
  token?: InputMaybe<Token_Order_By>;
  tokenAddress?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "xp" */
export type Xp_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "xp" */
export enum Xp_Select_Column {
  /** column name */
  Balance = 'balance',
  /** column name */
  Id = 'id',
  /** column name */
  PlayerId = 'playerId',
  /** column name */
  TokenAddress = 'tokenAddress',
}

/** input type for updating data in table "xp" */
export type Xp_Set_Input = {
  balance?: InputMaybe<Scalars['float8']>;
  id?: InputMaybe<Scalars['uuid']>;
  playerId?: InputMaybe<Scalars['uuid']>;
  tokenAddress?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Xp_Stddev_Fields = {
  balance?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "xp" */
export type Xp_Stddev_Order_By = {
  balance?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Xp_Stddev_Pop_Fields = {
  balance?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "xp" */
export type Xp_Stddev_Pop_Order_By = {
  balance?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Xp_Stddev_Samp_Fields = {
  balance?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "xp" */
export type Xp_Stddev_Samp_Order_By = {
  balance?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Xp_Sum_Fields = {
  balance?: Maybe<Scalars['float8']>;
};

/** order by sum() on columns of table "xp" */
export type Xp_Sum_Order_By = {
  balance?: InputMaybe<Order_By>;
};

/** update columns of table "xp" */
export enum Xp_Update_Column {
  /** column name */
  Balance = 'balance',
  /** column name */
  Id = 'id',
  /** column name */
  PlayerId = 'playerId',
  /** column name */
  TokenAddress = 'tokenAddress',
}

/** aggregate var_pop on columns */
export type Xp_Var_Pop_Fields = {
  balance?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "xp" */
export type Xp_Var_Pop_Order_By = {
  balance?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Xp_Var_Samp_Fields = {
  balance?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "xp" */
export type Xp_Var_Samp_Order_By = {
  balance?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Xp_Variance_Fields = {
  balance?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "xp" */
export type Xp_Variance_Order_By = {
  balance?: InputMaybe<Order_By>;
};

export type PlayerFragment = {
  id: any;
  totalXP?: any | null;
  seasonXP: any;
  rank?: PlayerRank_Enum | null;
  ethereumAddress: string;
  profileLayout?: string | null;
  profile?: {
    name?: string | null;
    username?: string | null;
    description?: string | null;
    emoji?: string | null;
    profileImageURL?: string | null;
    bannerImageURL?: string | null;
    backgroundImageURL?: string | null;
    location?: string | null;
    countryCode?: string | null;
    website?: string | null;
    pronouns?: string | null;
    availableHours?: number | null;
    timeZone?: string | null;
    colorMask?: number | null;
    explorerTypeTitle?: string | null;
  } | null;
  skills: Array<{
    Skill: { category: SkillCategory_Enum; id: any; name: string };
  }>;
  roles: Array<{ role: string; rank: number; PlayerRole: { label: string } }>;
  accounts: Array<{ identifier: string; type: AccountType_Enum }>;
  guilds: Array<{ Guild: { guildname: string } }>;
};

export type GuildFragment = {
  id: any;
  guildname: string;
  profileLayout?: string | null;
  description?: string | null;
  discordInviteUrl?: string | null;
  joinButtonUrl?: string | null;
  logo?: string | null;
  name: string;
  type: GuildType_Enum;
  websiteUrl?: string | null;
  githubUrl?: string | null;
  twitterUrl?: string | null;
  showDiscordAnnouncements: boolean;
  daos: Array<{
    contractAddress: string;
    network: string;
    label?: string | null;
    url?: string | null;
  }>;
};

export type QuestFragment = {
  id: any;
  createdAt: any;
  cooldown?: number | null;
  description?: string | null;
  externalLink?: string | null;
  guildId: any;
  status: QuestStatus_Enum;
  title: string;
  repetition: QuestRepetition_Enum;
  image?: string | null;
  guild: { name: string; logo?: string | null };
  player: { id: any; ethereumAddress: string };
  quest_skills: Array<{
    skill: { id: any; name: string; category: SkillCategory_Enum };
  }>;
  quest_roles: Array<{
    PlayerRole: {
      basic?: boolean | null;
      role: string;
      label: string;
      description?: string | null;
    };
  }>;
};

export type QuestCompletionFragment = {
  id: any;
  completedByPlayerId: any;
  status: QuestCompletionStatus_Enum;
  submissionLink?: string | null;
  submissionText?: string | null;
  submittedAt: any;
  questId: any;
  completed?: { title: string } | null;
};

export type TokenBalancesFragment = { pSeedBalance: string; address: string };

export type PlayerSkillFragment = {
  id: any;
  name: string;
  category: SkillCategory_Enum;
};

export type QuestWithCompletionFragment = {
  id: any;
  createdAt: any;
  cooldown?: number | null;
  description?: string | null;
  externalLink?: string | null;
  guildId: any;
  status: QuestStatus_Enum;
  title: string;
  repetition: QuestRepetition_Enum;
  image?: string | null;
  guild: { name: string; logo?: string | null };
  quest_skills: Array<{
    skill: { id: any; name: string; category: SkillCategory_Enum };
  }>;
  quest_roles: Array<{
    PlayerRole: {
      basic?: boolean | null;
      role: string;
      label: string;
      description?: string | null;
    };
  }>;
  quest_completions: Array<{
    id: any;
    completedByPlayerId: any;
    status: QuestCompletionStatus_Enum;
    submissionLink?: string | null;
    submissionText?: string | null;
    submittedAt: any;
    questId: any;
    player: {
      id: any;
      ethereumAddress: string;
      profile?: { username?: string | null } | null;
    };
    completed?: { title: string } | null;
  }>;
};

export type PlayerDaoMembershipFragment = {
  daohausMemberships: Array<{
    id: string;
    shares: string;
    molochAddress: string;
    moloch: {
      id: string;
      title?: string | null;
      version?: string | null;
      totalShares: string;
      chain: string;
      avatarURL?: string | null;
    };
  }>;
};

export type GetMeQueryVariables = Exact<{ [key: string]: never }>;

export type GetMeQuery = {
  me: Array<{
    record?: {
      dashboardLayout?: string | null;
      createdAt?: any | null;
      id: any;
      totalXP?: any | null;
      seasonXP: any;
      rank?: PlayerRank_Enum | null;
      ethereumAddress: string;
      profileLayout?: string | null;
      profile?: {
        name?: string | null;
        username?: string | null;
        description?: string | null;
        emoji?: string | null;
        profileImageURL?: string | null;
        bannerImageURL?: string | null;
        backgroundImageURL?: string | null;
        location?: string | null;
        countryCode?: string | null;
        website?: string | null;
        pronouns?: string | null;
        availableHours?: number | null;
        timeZone?: string | null;
        colorMask?: number | null;
        explorerTypeTitle?: string | null;
      } | null;
      skills: Array<{
        Skill: { category: SkillCategory_Enum; id: any; name: string };
      }>;
      roles: Array<{
        role: string;
        rank: number;
        PlayerRole: { label: string };
      }>;
      accounts: Array<{ identifier: string; type: AccountType_Enum }>;
      guilds: Array<{ Guild: { guildname: string } }>;
    } | null;
  }>;
};

export type GetDaoMembershipsQueryVariables = Exact<{
  address?: InputMaybe<Scalars['String']>;
}>;

export type GetDaoMembershipsQuery = {
  getDaoHausMemberships: Array<{
    id: string;
    molochAddress: string;
    moloch: {
      id: string;
      title?: string | null;
      version?: string | null;
      chain: string;
      avatarURL?: string | null;
    };
  }>;
};

export type GetPlayerGuildsQueryVariables = Exact<{
  playerId: Scalars['uuid'];
}>;

export type GetPlayerGuildsQuery = {
  guild_player: Array<{
    guildId: any;
    Guild: {
      id: any;
      logo?: string | null;
      name: string;
      guildname: string;
      membershipThroughDiscord: boolean;
      daos: Array<{ id: any; contractAddress: string }>;
    };
    discordRoles: Array<{ id: string; name: string; position: number }>;
  }>;
};

export type GetpSeedBalanceQueryVariables = Exact<{
  address: Scalars['String'];
}>;

export type GetpSeedBalanceQuery = {
  getTokenBalances?: { pSeedBalance: string; address: string } | null;
};

export type GetPatronsQueryVariables = Exact<{
  addresses?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
}>;

export type GetPatronsQuery = {
  player: Array<{
    id: any;
    totalXP?: any | null;
    seasonXP: any;
    rank?: PlayerRank_Enum | null;
    ethereumAddress: string;
    profileLayout?: string | null;
    profile?: {
      name?: string | null;
      username?: string | null;
      description?: string | null;
      emoji?: string | null;
      profileImageURL?: string | null;
      bannerImageURL?: string | null;
      backgroundImageURL?: string | null;
      location?: string | null;
      countryCode?: string | null;
      website?: string | null;
      pronouns?: string | null;
      availableHours?: number | null;
      timeZone?: string | null;
      colorMask?: number | null;
      explorerTypeTitle?: string | null;
    } | null;
    skills: Array<{
      Skill: { category: SkillCategory_Enum; id: any; name: string };
    }>;
    roles: Array<{ role: string; rank: number; PlayerRole: { label: string } }>;
    accounts: Array<{ identifier: string; type: AccountType_Enum }>;
    guilds: Array<{ Guild: { guildname: string } }>;
  }>;
};

export type GetpSeedHoldersQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
}>;

export type GetpSeedHoldersQuery = {
  pSeedHolders?: Array<{ pSeedBalance: string; address: string }> | null;
};

export type GetPSeedPriceQueryVariables = Exact<{ [key: string]: never }>;

export type GetPSeedPriceQuery = {
  getPSeedInfo?: { priceUsd?: string | null } | null;
};

export type GetPlayerForUsernameQueryVariables = Exact<{
  username: Scalars['String'];
}>;

export type GetPlayerForUsernameQuery = {
  player: Array<{
    id: any;
    totalXP?: any | null;
    seasonXP: any;
    rank?: PlayerRank_Enum | null;
    ethereumAddress: string;
    profileLayout?: string | null;
    profile?: {
      name?: string | null;
      username?: string | null;
      description?: string | null;
      emoji?: string | null;
      profileImageURL?: string | null;
      bannerImageURL?: string | null;
      backgroundImageURL?: string | null;
      location?: string | null;
      countryCode?: string | null;
      website?: string | null;
      pronouns?: string | null;
      availableHours?: number | null;
      timeZone?: string | null;
      colorMask?: number | null;
      explorerTypeTitle?: string | null;
    } | null;
    skills: Array<{
      Skill: { category: SkillCategory_Enum; id: any; name: string };
    }>;
    roles: Array<{ role: string; rank: number; PlayerRole: { label: string } }>;
    accounts: Array<{ identifier: string; type: AccountType_Enum }>;
    guilds: Array<{ Guild: { guildname: string } }>;
    daohausMemberships: Array<{
      id: string;
      shares: string;
      molochAddress: string;
      moloch: {
        id: string;
        title?: string | null;
        version?: string | null;
        totalShares: string;
        chain: string;
        avatarURL?: string | null;
      };
    }>;
  }>;
};

export type GetPlayerForAddressQueryVariables = Exact<{
  address: Scalars['String'];
}>;

export type GetPlayerForAddressQuery = {
  player: Array<{
    id: any;
    totalXP?: any | null;
    seasonXP: any;
    rank?: PlayerRank_Enum | null;
    ethereumAddress: string;
    profileLayout?: string | null;
    profile?: {
      name?: string | null;
      username?: string | null;
      description?: string | null;
      emoji?: string | null;
      profileImageURL?: string | null;
      bannerImageURL?: string | null;
      backgroundImageURL?: string | null;
      location?: string | null;
      countryCode?: string | null;
      website?: string | null;
      pronouns?: string | null;
      availableHours?: number | null;
      timeZone?: string | null;
      colorMask?: number | null;
      explorerTypeTitle?: string | null;
    } | null;
    skills: Array<{
      Skill: { category: SkillCategory_Enum; id: any; name: string };
    }>;
    roles: Array<{ role: string; rank: number; PlayerRole: { label: string } }>;
    accounts: Array<{ identifier: string; type: AccountType_Enum }>;
    guilds: Array<{ Guild: { guildname: string } }>;
    daohausMemberships: Array<{
      id: string;
      shares: string;
      molochAddress: string;
      moloch: {
        id: string;
        title?: string | null;
        version?: string | null;
        totalShares: string;
        chain: string;
        avatarURL?: string | null;
      };
    }>;
  }>;
};

export type GetPlayersQueryVariables = Exact<{
  orderBy: Player_Order_By;
  offset?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Player_Bool_Exp>;
}>;

export type GetPlayersQuery = {
  player: Array<{
    id: any;
    totalXP?: any | null;
    seasonXP: any;
    rank?: PlayerRank_Enum | null;
    ethereumAddress: string;
    profileLayout?: string | null;
    profile?: {
      name?: string | null;
      username?: string | null;
      description?: string | null;
      emoji?: string | null;
      profileImageURL?: string | null;
      bannerImageURL?: string | null;
      backgroundImageURL?: string | null;
      location?: string | null;
      countryCode?: string | null;
      website?: string | null;
      pronouns?: string | null;
      availableHours?: number | null;
      timeZone?: string | null;
      colorMask?: number | null;
      explorerTypeTitle?: string | null;
    } | null;
    skills: Array<{
      Skill: { category: SkillCategory_Enum; id: any; name: string };
    }>;
    roles: Array<{ role: string; rank: number; PlayerRole: { label: string } }>;
    accounts: Array<{ identifier: string; type: AccountType_Enum }>;
    guilds: Array<{ Guild: { guildname: string } }>;
  }>;
  player_aggregate: { aggregate?: { count?: number | null } | null };
};

export type GetPlayerUsernamesQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
}>;

export type GetPlayerUsernamesQuery = {
  player: Array<{
    ethereumAddress: string;
    profile?: { username?: string | null } | null;
  }>;
};

export type GetPlayerFiltersQueryVariables = Exact<{ [key: string]: never }>;

export type GetPlayerFiltersQuery = {
  skill_aggregate: { nodes: Array<{ name: SkillCategory_Enum }> };
  skill: Array<{ id: any; name: string; category: SkillCategory_Enum }>;
  ExplorerType: Array<{ value: number; label: string }>;
};

export type GetQuestQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;

export type GetQuestQuery = {
  quest_by_pk?: {
    id: any;
    createdAt: any;
    cooldown?: number | null;
    description?: string | null;
    externalLink?: string | null;
    guildId: any;
    status: QuestStatus_Enum;
    title: string;
    repetition: QuestRepetition_Enum;
    image?: string | null;
    guild: { name: string; logo?: string | null };
    player: { id: any; ethereumAddress: string };
    quest_skills: Array<{
      skill: { id: any; name: string; category: SkillCategory_Enum };
    }>;
    quest_roles: Array<{
      PlayerRole: {
        basic?: boolean | null;
        role: string;
        label: string;
        description?: string | null;
      };
    }>;
  } | null;
};

export type GetQuestWithCompletionsQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;

export type GetQuestWithCompletionsQuery = {
  quest_by_pk?: {
    id: any;
    createdAt: any;
    cooldown?: number | null;
    description?: string | null;
    externalLink?: string | null;
    guildId: any;
    status: QuestStatus_Enum;
    title: string;
    repetition: QuestRepetition_Enum;
    image?: string | null;
    player: {
      id: any;
      totalXP?: any | null;
      seasonXP: any;
      rank?: PlayerRank_Enum | null;
      ethereumAddress: string;
      profileLayout?: string | null;
      profile?: {
        name?: string | null;
        username?: string | null;
        description?: string | null;
        emoji?: string | null;
        profileImageURL?: string | null;
        bannerImageURL?: string | null;
        backgroundImageURL?: string | null;
        location?: string | null;
        countryCode?: string | null;
        website?: string | null;
        pronouns?: string | null;
        availableHours?: number | null;
        timeZone?: string | null;
        colorMask?: number | null;
        explorerTypeTitle?: string | null;
      } | null;
      skills: Array<{
        Skill: { category: SkillCategory_Enum; id: any; name: string };
      }>;
      roles: Array<{
        role: string;
        rank: number;
        PlayerRole: { label: string };
      }>;
      accounts: Array<{ identifier: string; type: AccountType_Enum }>;
      guilds: Array<{ Guild: { guildname: string } }>;
    };
    guild: { name: string; logo?: string | null };
    quest_skills: Array<{
      skill: { id: any; name: string; category: SkillCategory_Enum };
    }>;
    quest_roles: Array<{
      PlayerRole: {
        basic?: boolean | null;
        role: string;
        label: string;
        description?: string | null;
      };
    }>;
    quest_completions: Array<{
      id: any;
      completedByPlayerId: any;
      status: QuestCompletionStatus_Enum;
      submissionLink?: string | null;
      submissionText?: string | null;
      submittedAt: any;
      questId: any;
      player: {
        id: any;
        ethereumAddress: string;
        profile?: { username?: string | null } | null;
      };
      completed?: { title: string } | null;
    }>;
  } | null;
};

export type GetQuestIdsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
}>;

export type GetQuestIdsQuery = { quest: Array<{ id: any }> };

export type GetQuestsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<QuestStatus_Enum>;
  guildId?: InputMaybe<Scalars['uuid']>;
  order?: InputMaybe<Order_By>;
  createdByPlayerId?: InputMaybe<Scalars['uuid']>;
  questRoles?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
}>;

export type GetQuestsQuery = {
  quest: Array<{
    id: any;
    createdAt: any;
    cooldown?: number | null;
    description?: string | null;
    externalLink?: string | null;
    guildId: any;
    status: QuestStatus_Enum;
    title: string;
    repetition: QuestRepetition_Enum;
    image?: string | null;
    guild: { name: string; logo?: string | null };
    player: { id: any; ethereumAddress: string };
    quest_skills: Array<{
      skill: { id: any; name: string; category: SkillCategory_Enum };
    }>;
    quest_roles: Array<{
      PlayerRole: {
        basic?: boolean | null;
        role: string;
        label: string;
        description?: string | null;
      };
    }>;
  }>;
};

export type GetCompletedQuestsByPlayerQueryVariables = Exact<{
  completedByPlayerId?: InputMaybe<Scalars['uuid']>;
  order?: InputMaybe<Order_By>;
}>;

export type GetCompletedQuestsByPlayerQuery = {
  quest_completion: Array<{
    id: any;
    completedByPlayerId: any;
    status: QuestCompletionStatus_Enum;
    submissionLink?: string | null;
    submissionText?: string | null;
    submittedAt: any;
    questId: any;
    completed?: { title: string } | null;
  }>;
};

export type GetQuestGuildsQueryVariables = Exact<{ [key: string]: never }>;

export type GetQuestGuildsQuery = {
  quest_aggregate: { nodes: Array<{ guildId: any; guild: { name: string } }> };
};

export type GetQuestsWithCompletionsQueryVariables = Exact<{
  createdByPlayerId: Scalars['uuid'];
  completionStatus?: InputMaybe<QuestCompletionStatus_Enum>;
}>;

export type GetQuestsWithCompletionsQuery = {
  quest: Array<{
    id: any;
    title: string;
    quest_completions: Array<{
      id: any;
      submittedAt: any;
      submissionLink?: string | null;
      submissionText?: string | null;
      player: {
        ethereumAddress: string;
        profile?: { name?: string | null; username?: string | null } | null;
      };
    }>;
  }>;
};

export type CreateQuestMutationVariables = Exact<{
  input: CreateQuestInput;
}>;

export type CreateQuestMutation = {
  createQuest?: {
    success: boolean;
    error?: string | null;
    quest_id?: any | null;
    quest?: { id: any } | null;
  } | null;
};

export type CreateQuestCompletionMutationVariables = Exact<{
  input: CreateQuestCompletionInput;
}>;

export type CreateQuestCompletionMutation = {
  createQuestCompletion?: {
    success: boolean;
    error?: string | null;
    quest_completion_id?: any | null;
    quest_completion?: { id: any; quest: { id: any } } | null;
  } | null;
};

export type AuthenticateDiscordGuildMutationVariables = Exact<{
  code: Scalars['String'];
}>;

export type AuthenticateDiscordGuildMutation = {
  authenticateDiscordGuild?: {
    success: boolean;
    guildname?: string | null;
    error?: string | null;
    exists?: boolean | null;
  } | null;
};

export type UpdateGuildMutationVariables = Exact<{
  guildInfo: GuildInfoInput;
}>;

export type UpdateGuildMutation = {
  saveGuildInformation?: {
    success?: boolean | null;
    error?: string | null;
  } | null;
};

export type UpdateGuildLayoutMutationVariables = Exact<{
  guildLayoutInfo: GuildLayoutInfoInput;
}>;

export type UpdateGuildLayoutMutation = {
  saveGuildLayout?: { success?: boolean | null; error?: string | null } | null;
};

export type InsertCacheInvalidationMutationVariables = Exact<{
  playerId: Scalars['uuid'];
}>;

export type InsertCacheInvalidationMutation = { updateIDXProfile: any };

export type UpdatePlayerUsernameMutationVariables = Exact<{
  playerId: Scalars['uuid'];
  username: Scalars['String'];
}>;

export type UpdatePlayerUsernameMutation = {
  update_profile?: {
    affected_rows: number;
    returning: Array<{ playerId: any; username?: string | null }>;
  } | null;
};

export type UpdateProfileMutationVariables = Exact<{
  playerId: Scalars['uuid'];
  input: Profile_Set_Input;
}>;

export type UpdateProfileMutation = {
  update_profile?: {
    affected_rows: number;
    returning: Array<{ playerId: any; username?: string | null }>;
  } | null;
};

export type UpdateAboutYouMutationVariables = Exact<{
  playerId: Scalars['uuid'];
  input: Player_Set_Input;
}>;

export type UpdateAboutYouMutation = {
  update_player_by_pk?: {
    id: any;
    profile?: {
      explorerType?: {
        id: number;
        description: string;
        imageURL?: string | null;
        title: string;
      } | null;
    } | null;
  } | null;
};

export type UpdatePlayerSkillsMutationVariables = Exact<{
  skills: Array<Player_Skill_Insert_Input> | Player_Skill_Insert_Input;
}>;

export type UpdatePlayerSkillsMutation = {
  delete_player_skill?: { affected_rows: number } | null;
  insert_player_skill?: { affected_rows: number } | null;
};

export type UpdatePlayerRolesMutationVariables = Exact<{
  roles: Array<Player_Role_Insert_Input> | Player_Role_Insert_Input;
}>;

export type UpdatePlayerRolesMutation = {
  delete_player_role?: { affected_rows: number } | null;
  insert_player_role?: { affected_rows: number } | null;
};

export type UpdatePlayerProfileLayoutMutationVariables = Exact<{
  playerId: Scalars['uuid'];
  profileLayout: Scalars['String'];
}>;

export type UpdatePlayerProfileLayoutMutation = {
  update_player_by_pk?: { id: any; profileLayout?: string | null } | null;
};

export type UpdatePlayerDashboardLayoutMutationVariables = Exact<{
  playerId: Scalars['uuid'];
  dashboardLayout: Scalars['String'];
}>;

export type UpdatePlayerDashboardLayoutMutation = {
  update_player_by_pk?: { id: any; dashboardLayout?: string | null } | null;
};

export type UpdateProfilePronounsMutationVariables = Exact<{
  playerId: Scalars['uuid'];
  input: Profile_Set_Input;
}>;

export type UpdateProfilePronounsMutation = {
  update_profile?: {
    affected_rows: number;
    returning: Array<{ playerId: any }>;
  } | null;
};

export type UpdateQuestMutationVariables = Exact<{
  id: Scalars['uuid'];
  input: Quest_Set_Input;
  skills: Array<Quest_Skill_Insert_Input> | Quest_Skill_Insert_Input;
  roles: Array<Quest_Role_Insert_Input> | Quest_Role_Insert_Input;
}>;

export type UpdateQuestMutation = {
  update_quest_by_pk?: { id: any } | null;
  delete_quest_skill?: { affected_rows: number } | null;
  insert_quest_skill?: {
    affected_rows: number;
    returning: Array<{ questId: any; skillId: any }>;
  } | null;
  delete_quest_role?: { affected_rows: number } | null;
  insert_quest_role?: {
    affected_rows: number;
    returning: Array<{ questId: any; role: string }>;
  } | null;
};

export type UpdateQuestCompletionMutationVariables = Exact<{
  questCompletionId: Scalars['String'];
  status: QuestCompletionStatus_ActionEnum;
}>;

export type UpdateQuestCompletionMutation = {
  updateQuestCompletion?: {
    error?: string | null;
    success: boolean;
    quest_completion_id?: any | null;
    quest_completion?: { id: any } | null;
  } | null;
};

export type GetExplorerTypesQueryVariables = Exact<{ [key: string]: never }>;

export type GetExplorerTypesQuery = {
  ExplorerType: Array<{
    id: number;
    title: string;
    description: string;
    imageURL?: string | null;
  }>;
};

export type GetAspectsQueryVariables = Exact<{ [key: string]: never }>;

export type GetAspectsQuery = {
  ColorAspect: Array<{
    mask: number;
    name: string;
    description?: string | null;
  }>;
};

export type GetPlayerRolesQueryVariables = Exact<{ [key: string]: never }>;

export type GetPlayerRolesQuery = {
  PlayerRole: Array<{
    role: string;
    label: string;
    description?: string | null;
    basic?: boolean | null;
  }>;
};

export type GetSkillsQueryVariables = Exact<{ [key: string]: never }>;

export type GetSkillsQuery = {
  skill: Array<{ id: any; name: string; category: SkillCategory_Enum }>;
};

export type GetGuildQueryVariables = Exact<{
  guildname: Scalars['String'];
}>;

export type GetGuildQuery = {
  guild: Array<{
    id: any;
    guildname: string;
    profileLayout?: string | null;
    description?: string | null;
    discordInviteUrl?: string | null;
    joinButtonUrl?: string | null;
    logo?: string | null;
    name: string;
    type: GuildType_Enum;
    websiteUrl?: string | null;
    githubUrl?: string | null;
    twitterUrl?: string | null;
    showDiscordAnnouncements: boolean;
    daos: Array<{
      contractAddress: string;
      network: string;
      label?: string | null;
      url?: string | null;
    }>;
  }>;
};

export type GetGuildMetadataQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;

export type GetGuildMetadataQuery = {
  guild_metadata: Array<{
    guildId: any;
    discordMetadata?: any | null;
    discordRoles: Array<{ id: string; name: string; position: number }>;
  }>;
};

export type GetAdministeredGuildsQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;

export type GetAdministeredGuildsQuery = {
  guild_metadata: Array<{ guildId: any }>;
};

export type GetGuildsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
}>;

export type GetGuildsQuery = {
  guild: Array<{
    id: any;
    guildname: string;
    profileLayout?: string | null;
    description?: string | null;
    discordInviteUrl?: string | null;
    joinButtonUrl?: string | null;
    logo?: string | null;
    name: string;
    type: GuildType_Enum;
    websiteUrl?: string | null;
    githubUrl?: string | null;
    twitterUrl?: string | null;
    showDiscordAnnouncements: boolean;
    daos: Array<{
      contractAddress: string;
      network: string;
      label?: string | null;
      url?: string | null;
    }>;
  }>;
};

export type GetGuildnamesQueryVariables = Exact<{
  status?: InputMaybe<GuildStatus_Enum>;
  limit?: InputMaybe<Scalars['Int']>;
}>;

export type GetGuildnamesQuery = {
  guild: Array<{ id: any; guildname: string }>;
};

export type GetGuildPlayersQueryVariables = Exact<{
  guildId: Scalars['uuid'];
}>;

export type GetGuildPlayersQuery = {
  guild_player: Array<{
    Player: {
      id: any;
      totalXP?: any | null;
      rank?: PlayerRank_Enum | null;
      ethereumAddress: string;
      profile?: {
        username?: string | null;
        profileImageURL?: string | null;
        name?: string | null;
      } | null;
    };
  }>;
};

export type GetGuildAnnouncementsQueryVariables = Exact<{
  guildId: Scalars['uuid'];
}>;

export type GetGuildAnnouncementsQuery = {
  guild: Array<{ id: any; discordAnnouncements?: Array<string> | null }>;
};

export const PlayerFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PlayerFragment' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'player' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'totalXP' } },
          { kind: 'Field', name: { kind: 'Name', value: 'seasonXP' } },
          { kind: 'Field', name: { kind: 'Name', value: 'rank' } },
          { kind: 'Field', name: { kind: 'Name', value: 'ethereumAddress' } },
          { kind: 'Field', name: { kind: 'Name', value: 'profileLayout' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'profile' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'username' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'emoji' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'profileImageURL' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'bannerImageURL' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'backgroundImageURL' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'location' } },
                { kind: 'Field', name: { kind: 'Name', value: 'countryCode' } },
                { kind: 'Field', name: { kind: 'Name', value: 'website' } },
                { kind: 'Field', name: { kind: 'Name', value: 'pronouns' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'availableHours' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'timeZone' } },
                { kind: 'Field', name: { kind: 'Name', value: 'colorMask' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'explorerTypeTitle' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'skills' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'Skill' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'category' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'roles' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'rank' },
                      value: { kind: 'EnumValue', value: 'asc' },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'role' } },
                { kind: 'Field', name: { kind: 'Name', value: 'rank' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'PlayerRole' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'accounts' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'type' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_in' },
                            value: {
                              kind: 'ListValue',
                              values: [
                                { kind: 'EnumValue', value: 'TWITTER' },
                                { kind: 'EnumValue', value: 'GITHUB' },
                                { kind: 'EnumValue', value: 'MEETWITHWALLET' },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'identifier' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'guilds' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'Guild' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'guildname' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;
export const GuildFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'GuildFragment' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'guild' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'guildname' } },
          { kind: 'Field', name: { kind: 'Name', value: 'profileLayout' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'discordInviteUrl' } },
          { kind: 'Field', name: { kind: 'Name', value: 'joinButtonUrl' } },
          { kind: 'Field', name: { kind: 'Name', value: 'logo' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
          { kind: 'Field', name: { kind: 'Name', value: 'websiteUrl' } },
          { kind: 'Field', name: { kind: 'Name', value: 'githubUrl' } },
          { kind: 'Field', name: { kind: 'Name', value: 'twitterUrl' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'showDiscordAnnouncements' },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'daos' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'contractAddress' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'network' } },
                { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                { kind: 'Field', name: { kind: 'Name', value: 'url' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;
export const QuestFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'QuestFragment' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'quest' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'cooldown' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'externalLink' } },
          { kind: 'Field', name: { kind: 'Name', value: 'guildId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'repetition' } },
          { kind: 'Field', name: { kind: 'Name', value: 'image' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'guild' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'logo' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'player' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'ethereumAddress' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'quest_skills' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'skill' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'category' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'quest_roles' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'PlayerRole' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'basic' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'role' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'description' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;
export const TokenBalancesFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'TokenBalancesFragment' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'TokenBalances' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'address' },
            name: { kind: 'Name', value: 'id' },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'pSeedBalance' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode;
export const PlayerSkillFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PlayerSkillFragment' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'skill' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'category' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode;
export const QuestCompletionFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'QuestCompletionFragment' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'quest_completion' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'completedByPlayerId' },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          { kind: 'Field', name: { kind: 'Name', value: 'submissionLink' } },
          { kind: 'Field', name: { kind: 'Name', value: 'submissionText' } },
          { kind: 'Field', name: { kind: 'Name', value: 'submittedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'questId' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'completed' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;
export const QuestWithCompletionFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'QuestWithCompletionFragment' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'quest' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'cooldown' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'externalLink' } },
          { kind: 'Field', name: { kind: 'Name', value: 'guildId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'repetition' } },
          { kind: 'Field', name: { kind: 'Name', value: 'image' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'guild' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'logo' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'quest_skills' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'skill' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'category' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'quest_roles' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'PlayerRole' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'basic' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'role' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'description' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'quest_completions' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ListValue',
                  values: [
                    {
                      kind: 'ObjectValue',
                      fields: [
                        {
                          kind: 'ObjectField',
                          name: { kind: 'Name', value: 'submittedAt' },
                          value: { kind: 'EnumValue', value: 'desc' },
                        },
                      ],
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'QuestCompletionFragment' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'player' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'ethereumAddress' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'profile' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'username' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'QuestCompletionFragment' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'quest_completion' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'completedByPlayerId' },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          { kind: 'Field', name: { kind: 'Name', value: 'submissionLink' } },
          { kind: 'Field', name: { kind: 'Name', value: 'submissionText' } },
          { kind: 'Field', name: { kind: 'Name', value: 'submittedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'questId' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'completed' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;
export const PlayerDaoMembershipFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PlayerDaoMembershipFragment' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'player' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'daohausMemberships' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'shares' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'molochAddress' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'moloch' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'version' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'totalShares' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'chain' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'avatarURL' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;
export const GetMeDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetMe' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'me' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  alias: { kind: 'Name', value: 'record' },
                  name: { kind: 'Name', value: 'player' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'PlayerFragment' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'dashboardLayout' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'createdAt' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PlayerFragment' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'player' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'totalXP' } },
          { kind: 'Field', name: { kind: 'Name', value: 'seasonXP' } },
          { kind: 'Field', name: { kind: 'Name', value: 'rank' } },
          { kind: 'Field', name: { kind: 'Name', value: 'ethereumAddress' } },
          { kind: 'Field', name: { kind: 'Name', value: 'profileLayout' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'profile' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'username' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'emoji' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'profileImageURL' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'bannerImageURL' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'backgroundImageURL' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'location' } },
                { kind: 'Field', name: { kind: 'Name', value: 'countryCode' } },
                { kind: 'Field', name: { kind: 'Name', value: 'website' } },
                { kind: 'Field', name: { kind: 'Name', value: 'pronouns' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'availableHours' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'timeZone' } },
                { kind: 'Field', name: { kind: 'Name', value: 'colorMask' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'explorerTypeTitle' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'skills' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'Skill' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'category' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'roles' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'rank' },
                      value: { kind: 'EnumValue', value: 'asc' },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'role' } },
                { kind: 'Field', name: { kind: 'Name', value: 'rank' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'PlayerRole' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'accounts' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'type' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_in' },
                            value: {
                              kind: 'ListValue',
                              values: [
                                { kind: 'EnumValue', value: 'TWITTER' },
                                { kind: 'EnumValue', value: 'GITHUB' },
                                { kind: 'EnumValue', value: 'MEETWITHWALLET' },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'identifier' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'guilds' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'Guild' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'guildname' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

export function useGetMeQuery(
  options?: Omit<Urql.UseQueryArgs<GetMeQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetMeQuery>({ query: GetMeDocument, ...options });
}
export const GetDaoMembershipsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetDaoMemberships' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'address' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getDaoHausMemberships' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'memberAddress' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'address' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'molochAddress' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'moloch' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'version' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'chain' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'avatarURL' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

export function useGetDaoMembershipsQuery(
  options?: Omit<Urql.UseQueryArgs<GetDaoMembershipsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetDaoMembershipsQuery>({
    query: GetDaoMembershipsDocument,
    ...options,
  });
}
export const GetPlayerGuildsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetPlayerGuilds' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'playerId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'uuid' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'guild_player' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'playerId' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'playerId' },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'guildId' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'Guild' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'logo' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'guildname' },
                      },
                      {
                        kind: 'Field',
                        name: {
                          kind: 'Name',
                          value: 'membershipThroughDiscord',
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'daos' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'contractAddress' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'discordRoles' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'position' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

export function useGetPlayerGuildsQuery(
  options: Omit<Urql.UseQueryArgs<GetPlayerGuildsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetPlayerGuildsQuery>({
    query: GetPlayerGuildsDocument,
    ...options,
  });
}
export const GetpSeedBalanceDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetpSeedBalance' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'address' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getTokenBalances' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'address' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'address' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'TokenBalancesFragment' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'TokenBalancesFragment' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'TokenBalances' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'address' },
            name: { kind: 'Name', value: 'id' },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'pSeedBalance' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

export function useGetpSeedBalanceQuery(
  options: Omit<Urql.UseQueryArgs<GetpSeedBalanceQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetpSeedBalanceQuery>({
    query: GetpSeedBalanceDocument,
    ...options,
  });
}
export const GetPatronsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetPatrons' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'addresses' },
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: { kind: 'Name', value: 'String' },
              },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'limit' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'player' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'ethereumAddress' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_in' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'addresses' },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'limit' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'PlayerFragment' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PlayerFragment' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'player' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'totalXP' } },
          { kind: 'Field', name: { kind: 'Name', value: 'seasonXP' } },
          { kind: 'Field', name: { kind: 'Name', value: 'rank' } },
          { kind: 'Field', name: { kind: 'Name', value: 'ethereumAddress' } },
          { kind: 'Field', name: { kind: 'Name', value: 'profileLayout' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'profile' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'username' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'emoji' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'profileImageURL' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'bannerImageURL' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'backgroundImageURL' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'location' } },
                { kind: 'Field', name: { kind: 'Name', value: 'countryCode' } },
                { kind: 'Field', name: { kind: 'Name', value: 'website' } },
                { kind: 'Field', name: { kind: 'Name', value: 'pronouns' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'availableHours' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'timeZone' } },
                { kind: 'Field', name: { kind: 'Name', value: 'colorMask' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'explorerTypeTitle' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'skills' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'Skill' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'category' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'roles' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'rank' },
                      value: { kind: 'EnumValue', value: 'asc' },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'role' } },
                { kind: 'Field', name: { kind: 'Name', value: 'rank' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'PlayerRole' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'accounts' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'type' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_in' },
                            value: {
                              kind: 'ListValue',
                              values: [
                                { kind: 'EnumValue', value: 'TWITTER' },
                                { kind: 'EnumValue', value: 'GITHUB' },
                                { kind: 'EnumValue', value: 'MEETWITHWALLET' },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'identifier' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'guilds' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'Guild' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'guildname' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

export function useGetPatronsQuery(
  options?: Omit<Urql.UseQueryArgs<GetPatronsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetPatronsQuery>({
    query: GetPatronsDocument,
    ...options,
  });
}
export const GetpSeedHoldersDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetpSeedHolders' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'limit' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'pSeedHolders' },
            name: { kind: 'Name', value: 'getTopPSeedHolders' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'limit' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'TokenBalancesFragment' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'TokenBalancesFragment' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'TokenBalances' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'address' },
            name: { kind: 'Name', value: 'id' },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'pSeedBalance' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

export function useGetpSeedHoldersQuery(
  options?: Omit<Urql.UseQueryArgs<GetpSeedHoldersQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetpSeedHoldersQuery>({
    query: GetpSeedHoldersDocument,
    ...options,
  });
}
export const GetPSeedPriceDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetPSeedPrice' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getPSeedInfo' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'priceUsd' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

export function useGetPSeedPriceQuery(
  options?: Omit<Urql.UseQueryArgs<GetPSeedPriceQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetPSeedPriceQuery>({
    query: GetPSeedPriceDocument,
    ...options,
  });
}
export const GetPlayerForUsernameDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetPlayerForUsername' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'username' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'player' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'profile' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'username' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: '_ilike' },
                                  value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'username' },
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'PlayerFragment' },
                },
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'PlayerDaoMembershipFragment' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PlayerFragment' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'player' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'totalXP' } },
          { kind: 'Field', name: { kind: 'Name', value: 'seasonXP' } },
          { kind: 'Field', name: { kind: 'Name', value: 'rank' } },
          { kind: 'Field', name: { kind: 'Name', value: 'ethereumAddress' } },
          { kind: 'Field', name: { kind: 'Name', value: 'profileLayout' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'profile' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'username' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'emoji' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'profileImageURL' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'bannerImageURL' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'backgroundImageURL' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'location' } },
                { kind: 'Field', name: { kind: 'Name', value: 'countryCode' } },
                { kind: 'Field', name: { kind: 'Name', value: 'website' } },
                { kind: 'Field', name: { kind: 'Name', value: 'pronouns' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'availableHours' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'timeZone' } },
                { kind: 'Field', name: { kind: 'Name', value: 'colorMask' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'explorerTypeTitle' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'skills' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'Skill' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'category' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'roles' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'rank' },
                      value: { kind: 'EnumValue', value: 'asc' },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'role' } },
                { kind: 'Field', name: { kind: 'Name', value: 'rank' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'PlayerRole' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'accounts' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'type' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_in' },
                            value: {
                              kind: 'ListValue',
                              values: [
                                { kind: 'EnumValue', value: 'TWITTER' },
                                { kind: 'EnumValue', value: 'GITHUB' },
                                { kind: 'EnumValue', value: 'MEETWITHWALLET' },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'identifier' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'guilds' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'Guild' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'guildname' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PlayerDaoMembershipFragment' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'player' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'daohausMemberships' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'shares' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'molochAddress' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'moloch' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'version' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'totalShares' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'chain' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'avatarURL' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

export function useGetPlayerForUsernameQuery(
  options: Omit<Urql.UseQueryArgs<GetPlayerForUsernameQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetPlayerForUsernameQuery>({
    query: GetPlayerForUsernameDocument,
    ...options,
  });
}
export const GetPlayerForAddressDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetPlayerForAddress' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'address' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'player' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'ethereumAddress' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_ilike' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'address' },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'PlayerFragment' },
                },
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'PlayerDaoMembershipFragment' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PlayerFragment' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'player' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'totalXP' } },
          { kind: 'Field', name: { kind: 'Name', value: 'seasonXP' } },
          { kind: 'Field', name: { kind: 'Name', value: 'rank' } },
          { kind: 'Field', name: { kind: 'Name', value: 'ethereumAddress' } },
          { kind: 'Field', name: { kind: 'Name', value: 'profileLayout' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'profile' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'username' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'emoji' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'profileImageURL' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'bannerImageURL' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'backgroundImageURL' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'location' } },
                { kind: 'Field', name: { kind: 'Name', value: 'countryCode' } },
                { kind: 'Field', name: { kind: 'Name', value: 'website' } },
                { kind: 'Field', name: { kind: 'Name', value: 'pronouns' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'availableHours' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'timeZone' } },
                { kind: 'Field', name: { kind: 'Name', value: 'colorMask' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'explorerTypeTitle' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'skills' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'Skill' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'category' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'roles' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'rank' },
                      value: { kind: 'EnumValue', value: 'asc' },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'role' } },
                { kind: 'Field', name: { kind: 'Name', value: 'rank' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'PlayerRole' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'accounts' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'type' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_in' },
                            value: {
                              kind: 'ListValue',
                              values: [
                                { kind: 'EnumValue', value: 'TWITTER' },
                                { kind: 'EnumValue', value: 'GITHUB' },
                                { kind: 'EnumValue', value: 'MEETWITHWALLET' },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'identifier' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'guilds' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'Guild' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'guildname' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PlayerDaoMembershipFragment' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'player' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'daohausMemberships' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'shares' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'molochAddress' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'moloch' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'version' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'totalShares' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'chain' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'avatarURL' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

export function useGetPlayerForAddressQuery(
  options: Omit<Urql.UseQueryArgs<GetPlayerForAddressQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetPlayerForAddressQuery>({
    query: GetPlayerForAddressDocument,
    ...options,
  });
}
export const GetPlayersDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetPlayers' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'orderBy' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'player_order_by' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'offset' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'limit' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'where' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'player_bool_exp' },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'player' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ListValue',
                  values: [
                    {
                      kind: 'Variable',
                      name: { kind: 'Name', value: 'orderBy' },
                    },
                    {
                      kind: 'ObjectValue',
                      fields: [
                        {
                          kind: 'ObjectField',
                          name: { kind: 'Name', value: 'ethereumAddress' },
                          value: { kind: 'EnumValue', value: 'desc' },
                        },
                      ],
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'offset' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'offset' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'limit' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'where' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'PlayerFragment' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'player_aggregate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'where' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'aggregate' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'count' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PlayerFragment' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'player' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'totalXP' } },
          { kind: 'Field', name: { kind: 'Name', value: 'seasonXP' } },
          { kind: 'Field', name: { kind: 'Name', value: 'rank' } },
          { kind: 'Field', name: { kind: 'Name', value: 'ethereumAddress' } },
          { kind: 'Field', name: { kind: 'Name', value: 'profileLayout' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'profile' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'username' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'emoji' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'profileImageURL' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'bannerImageURL' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'backgroundImageURL' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'location' } },
                { kind: 'Field', name: { kind: 'Name', value: 'countryCode' } },
                { kind: 'Field', name: { kind: 'Name', value: 'website' } },
                { kind: 'Field', name: { kind: 'Name', value: 'pronouns' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'availableHours' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'timeZone' } },
                { kind: 'Field', name: { kind: 'Name', value: 'colorMask' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'explorerTypeTitle' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'skills' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'Skill' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'category' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'roles' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'rank' },
                      value: { kind: 'EnumValue', value: 'asc' },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'role' } },
                { kind: 'Field', name: { kind: 'Name', value: 'rank' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'PlayerRole' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'accounts' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'type' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_in' },
                            value: {
                              kind: 'ListValue',
                              values: [
                                { kind: 'EnumValue', value: 'TWITTER' },
                                { kind: 'EnumValue', value: 'GITHUB' },
                                { kind: 'EnumValue', value: 'MEETWITHWALLET' },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'identifier' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'guilds' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'Guild' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'guildname' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

export function useGetPlayersQuery(
  options: Omit<Urql.UseQueryArgs<GetPlayersQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetPlayersQuery>({
    query: GetPlayersDocument,
    ...options,
  });
}
export const GetPlayerUsernamesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetPlayerUsernames' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'limit' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'player' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'totalXP' },
                      value: { kind: 'EnumValue', value: 'desc' },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'limit' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'ethereumAddress' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'profile' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'username' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

export function useGetPlayerUsernamesQuery(
  options?: Omit<Urql.UseQueryArgs<GetPlayerUsernamesQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetPlayerUsernamesQuery>({
    query: GetPlayerUsernamesDocument,
    ...options,
  });
}
export const GetPlayerFiltersDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetPlayerFilters' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'skill_aggregate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'distinct_on' },
                value: { kind: 'EnumValue', value: 'category' },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'nodes' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        alias: { kind: 'Name', value: 'name' },
                        name: { kind: 'Name', value: 'category' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'skill' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'Player_Skills_aggregate' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'count' },
                            value: { kind: 'EnumValue', value: 'desc' },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'category' },
                      value: { kind: 'EnumValue', value: 'asc' },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'PlayerSkillFragment' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ExplorerType' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'distinct_on' },
                value: { kind: 'EnumValue', value: 'id' },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  alias: { kind: 'Name', value: 'value' },
                  name: { kind: 'Name', value: 'id' },
                },
                {
                  kind: 'Field',
                  alias: { kind: 'Name', value: 'label' },
                  name: { kind: 'Name', value: 'title' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PlayerSkillFragment' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'skill' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'category' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

export function useGetPlayerFiltersQuery(
  options?: Omit<Urql.UseQueryArgs<GetPlayerFiltersQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetPlayerFiltersQuery>({
    query: GetPlayerFiltersDocument,
    ...options,
  });
}
export const GetQuestDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetQuest' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'uuid' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'quest_by_pk' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'QuestFragment' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'QuestFragment' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'quest' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'cooldown' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'externalLink' } },
          { kind: 'Field', name: { kind: 'Name', value: 'guildId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'repetition' } },
          { kind: 'Field', name: { kind: 'Name', value: 'image' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'guild' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'logo' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'player' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'ethereumAddress' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'quest_skills' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'skill' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'category' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'quest_roles' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'PlayerRole' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'basic' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'role' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'description' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

export function useGetQuestQuery(
  options: Omit<Urql.UseQueryArgs<GetQuestQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetQuestQuery>({ query: GetQuestDocument, ...options });
}
export const GetQuestWithCompletionsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetQuestWithCompletions' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'uuid' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'quest_by_pk' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'QuestWithCompletionFragment' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'player' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'PlayerFragment' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PlayerFragment' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'player' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'totalXP' } },
          { kind: 'Field', name: { kind: 'Name', value: 'seasonXP' } },
          { kind: 'Field', name: { kind: 'Name', value: 'rank' } },
          { kind: 'Field', name: { kind: 'Name', value: 'ethereumAddress' } },
          { kind: 'Field', name: { kind: 'Name', value: 'profileLayout' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'profile' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'username' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'emoji' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'profileImageURL' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'bannerImageURL' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'backgroundImageURL' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'location' } },
                { kind: 'Field', name: { kind: 'Name', value: 'countryCode' } },
                { kind: 'Field', name: { kind: 'Name', value: 'website' } },
                { kind: 'Field', name: { kind: 'Name', value: 'pronouns' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'availableHours' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'timeZone' } },
                { kind: 'Field', name: { kind: 'Name', value: 'colorMask' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'explorerTypeTitle' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'skills' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'Skill' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'category' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'roles' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'rank' },
                      value: { kind: 'EnumValue', value: 'asc' },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'role' } },
                { kind: 'Field', name: { kind: 'Name', value: 'rank' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'PlayerRole' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'accounts' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'type' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_in' },
                            value: {
                              kind: 'ListValue',
                              values: [
                                { kind: 'EnumValue', value: 'TWITTER' },
                                { kind: 'EnumValue', value: 'GITHUB' },
                                { kind: 'EnumValue', value: 'MEETWITHWALLET' },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'identifier' } },
                { kind: 'Field', name: { kind: 'Name', value: 'type' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'guilds' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'Guild' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'guildname' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'QuestCompletionFragment' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'quest_completion' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'completedByPlayerId' },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          { kind: 'Field', name: { kind: 'Name', value: 'submissionLink' } },
          { kind: 'Field', name: { kind: 'Name', value: 'submissionText' } },
          { kind: 'Field', name: { kind: 'Name', value: 'submittedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'questId' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'completed' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'QuestWithCompletionFragment' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'quest' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'cooldown' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'externalLink' } },
          { kind: 'Field', name: { kind: 'Name', value: 'guildId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'repetition' } },
          { kind: 'Field', name: { kind: 'Name', value: 'image' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'guild' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'logo' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'quest_skills' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'skill' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'category' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'quest_roles' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'PlayerRole' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'basic' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'role' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'description' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'quest_completions' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ListValue',
                  values: [
                    {
                      kind: 'ObjectValue',
                      fields: [
                        {
                          kind: 'ObjectField',
                          name: { kind: 'Name', value: 'submittedAt' },
                          value: { kind: 'EnumValue', value: 'desc' },
                        },
                      ],
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'QuestCompletionFragment' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'player' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'ethereumAddress' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'profile' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'username' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

export function useGetQuestWithCompletionsQuery(
  options: Omit<
    Urql.UseQueryArgs<GetQuestWithCompletionsQueryVariables>,
    'query'
  >,
) {
  return Urql.useQuery<GetQuestWithCompletionsQuery>({
    query: GetQuestWithCompletionsDocument,
    ...options,
  });
}
export const GetQuestIdsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetQuestIds' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'limit' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'quest' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'limit' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'createdAt' },
                      value: { kind: 'EnumValue', value: 'desc' },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

export function useGetQuestIdsQuery(
  options?: Omit<Urql.UseQueryArgs<GetQuestIdsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetQuestIdsQuery>({
    query: GetQuestIdsDocument,
    ...options,
  });
}
export const GetQuestsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetQuests' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'limit' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'status' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'QuestStatus_enum' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'guildId' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'uuid' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'order' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'order_by' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'createdByPlayerId' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'uuid' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'questRoles' },
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: { kind: 'Name', value: 'String' },
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'quest' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'limit' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'createdAt' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'order' },
                      },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'status' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'status' },
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'guildId' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'guildId' },
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'createdByPlayerId' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: {
                              kind: 'Variable',
                              name: {
                                kind: 'Name',
                                value: 'createdByPlayerId',
                              },
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'quest_roles' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'role' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: '_in' },
                                  value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'questRoles' },
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'QuestFragment' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'QuestFragment' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'quest' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'cooldown' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'externalLink' } },
          { kind: 'Field', name: { kind: 'Name', value: 'guildId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'repetition' } },
          { kind: 'Field', name: { kind: 'Name', value: 'image' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'guild' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'logo' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'player' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'ethereumAddress' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'quest_skills' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'skill' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'category' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'quest_roles' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'PlayerRole' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'basic' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'role' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'description' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

export function useGetQuestsQuery(
  options?: Omit<Urql.UseQueryArgs<GetQuestsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetQuestsQuery>({
    query: GetQuestsDocument,
    ...options,
  });
}
export const GetCompletedQuestsByPlayerDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetCompletedQuestsByPlayer' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'completedByPlayerId' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'uuid' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'order' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'order_by' },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'quest_completion' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'submittedAt' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'order' },
                      },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'completedByPlayerId' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: {
                              kind: 'Variable',
                              name: {
                                kind: 'Name',
                                value: 'completedByPlayerId',
                              },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'QuestCompletionFragment' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'QuestCompletionFragment' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'quest_completion' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'completedByPlayerId' },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          { kind: 'Field', name: { kind: 'Name', value: 'submissionLink' } },
          { kind: 'Field', name: { kind: 'Name', value: 'submissionText' } },
          { kind: 'Field', name: { kind: 'Name', value: 'submittedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'questId' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'completed' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

export function useGetCompletedQuestsByPlayerQuery(
  options?: Omit<
    Urql.UseQueryArgs<GetCompletedQuestsByPlayerQueryVariables>,
    'query'
  >,
) {
  return Urql.useQuery<GetCompletedQuestsByPlayerQuery>({
    query: GetCompletedQuestsByPlayerDocument,
    ...options,
  });
}
export const GetQuestGuildsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetQuestGuilds' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'quest_aggregate' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'distinct_on' },
                value: { kind: 'EnumValue', value: 'guildId' },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'nodes' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'guildId' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'guild' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

export function useGetQuestGuildsQuery(
  options?: Omit<Urql.UseQueryArgs<GetQuestGuildsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetQuestGuildsQuery>({
    query: GetQuestGuildsDocument,
    ...options,
  });
}
export const GetQuestsWithCompletionsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetQuestsWithCompletions' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'createdByPlayerId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'uuid' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'completionStatus' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'QuestCompletionStatus_enum' },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'quest' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'createdAt' },
                      value: { kind: 'EnumValue', value: 'desc' },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'status' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: { kind: 'EnumValue', value: 'OPEN' },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'createdByPlayerId' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: {
                              kind: 'Variable',
                              name: {
                                kind: 'Name',
                                value: 'createdByPlayerId',
                              },
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'quest_completions' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'status' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: '_eq' },
                                  value: {
                                    kind: 'Variable',
                                    name: {
                                      kind: 'Name',
                                      value: 'completionStatus',
                                    },
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'quest_completions' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'player' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'profile' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'name' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'username' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'ethereumAddress' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'submittedAt' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'submissionLink' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'submissionText' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

export function useGetQuestsWithCompletionsQuery(
  options: Omit<
    Urql.UseQueryArgs<GetQuestsWithCompletionsQueryVariables>,
    'query'
  >,
) {
  return Urql.useQuery<GetQuestsWithCompletionsQuery>({
    query: GetQuestsWithCompletionsDocument,
    ...options,
  });
}
export const CreateQuestDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateQuest' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CreateQuestInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createQuest' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'quest' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'success' } },
                { kind: 'Field', name: { kind: 'Name', value: 'error' } },
                { kind: 'Field', name: { kind: 'Name', value: 'quest_id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'quest' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

export function useCreateQuestMutation() {
  return Urql.useMutation<CreateQuestMutation, CreateQuestMutationVariables>(
    CreateQuestDocument,
  );
}
export const CreateQuestCompletionDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateQuestCompletion' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CreateQuestCompletionInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createQuestCompletion' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'questCompletion' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'success' } },
                { kind: 'Field', name: { kind: 'Name', value: 'error' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'quest_completion_id' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'quest_completion' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'quest' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

export function useCreateQuestCompletionMutation() {
  return Urql.useMutation<
    CreateQuestCompletionMutation,
    CreateQuestCompletionMutationVariables
  >(CreateQuestCompletionDocument);
}
export const AuthenticateDiscordGuildDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'AuthenticateDiscordGuild' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'code' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'authenticateDiscordGuild' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'code' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'code' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'success' } },
                { kind: 'Field', name: { kind: 'Name', value: 'guildname' } },
                { kind: 'Field', name: { kind: 'Name', value: 'error' } },
                { kind: 'Field', name: { kind: 'Name', value: 'exists' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

export function useAuthenticateDiscordGuildMutation() {
  return Urql.useMutation<
    AuthenticateDiscordGuildMutation,
    AuthenticateDiscordGuildMutationVariables
  >(AuthenticateDiscordGuildDocument);
}
export const UpdateGuildDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateGuild' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'guildInfo' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'GuildInfoInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'saveGuildInformation' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'guildInformation' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'guildInfo' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'success' } },
                { kind: 'Field', name: { kind: 'Name', value: 'error' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

export function useUpdateGuildMutation() {
  return Urql.useMutation<UpdateGuildMutation, UpdateGuildMutationVariables>(
    UpdateGuildDocument,
  );
}
export const UpdateGuildLayoutDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateGuildLayout' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'guildLayoutInfo' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'GuildLayoutInfoInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'saveGuildLayout' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'guildLayoutInfo' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'guildLayoutInfo' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'success' } },
                { kind: 'Field', name: { kind: 'Name', value: 'error' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

export function useUpdateGuildLayoutMutation() {
  return Urql.useMutation<
    UpdateGuildLayoutMutation,
    UpdateGuildLayoutMutationVariables
  >(UpdateGuildLayoutDocument);
}
export const InsertCacheInvalidationDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'InsertCacheInvalidation' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'playerId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'uuid' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateIDXProfile' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'playerId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'playerId' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

export function useInsertCacheInvalidationMutation() {
  return Urql.useMutation<
    InsertCacheInvalidationMutation,
    InsertCacheInvalidationMutationVariables
  >(InsertCacheInvalidationDocument);
}
export const UpdatePlayerUsernameDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdatePlayerUsername' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'playerId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'uuid' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'username' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'update_profile' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'playerId' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'playerId' },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: '_set' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'username' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'username' },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'affected_rows' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'returning' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'playerId' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'username' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

export function useUpdatePlayerUsernameMutation() {
  return Urql.useMutation<
    UpdatePlayerUsernameMutation,
    UpdatePlayerUsernameMutationVariables
  >(UpdatePlayerUsernameDocument);
}
export const UpdateProfileDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateProfile' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'playerId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'uuid' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'profile_set_input' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'update_profile' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'playerId' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'playerId' },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: '_set' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'affected_rows' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'returning' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'playerId' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'username' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

export function useUpdateProfileMutation() {
  return Urql.useMutation<
    UpdateProfileMutation,
    UpdateProfileMutationVariables
  >(UpdateProfileDocument);
}
export const UpdateAboutYouDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateAboutYou' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'playerId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'uuid' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'player_set_input' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'update_player_by_pk' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'pk_columns' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'playerId' },
                      },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: '_set' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'profile' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'explorerType' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'description' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'imageURL' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'title' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

export function useUpdateAboutYouMutation() {
  return Urql.useMutation<
    UpdateAboutYouMutation,
    UpdateAboutYouMutationVariables
  >(UpdateAboutYouDocument);
}
export const UpdatePlayerSkillsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdatePlayerSkills' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'skills' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: { kind: 'Name', value: 'player_skill_insert_input' },
                },
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'delete_player_skill' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: { kind: 'ObjectValue', fields: [] },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'affected_rows' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'insert_player_skill' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'objects' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'skills' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'affected_rows' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

export function useUpdatePlayerSkillsMutation() {
  return Urql.useMutation<
    UpdatePlayerSkillsMutation,
    UpdatePlayerSkillsMutationVariables
  >(UpdatePlayerSkillsDocument);
}
export const UpdatePlayerRolesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdatePlayerRoles' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'roles' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: { kind: 'Name', value: 'player_role_insert_input' },
                },
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'delete_player_role' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: { kind: 'ObjectValue', fields: [] },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'affected_rows' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'insert_player_role' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'objects' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'roles' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'affected_rows' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

export function useUpdatePlayerRolesMutation() {
  return Urql.useMutation<
    UpdatePlayerRolesMutation,
    UpdatePlayerRolesMutationVariables
  >(UpdatePlayerRolesDocument);
}
export const UpdatePlayerProfileLayoutDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdatePlayerProfileLayout' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'playerId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'uuid' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'profileLayout' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'update_player_by_pk' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'pk_columns' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'playerId' },
                      },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: '_set' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'profileLayout' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'profileLayout' },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'profileLayout' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

export function useUpdatePlayerProfileLayoutMutation() {
  return Urql.useMutation<
    UpdatePlayerProfileLayoutMutation,
    UpdatePlayerProfileLayoutMutationVariables
  >(UpdatePlayerProfileLayoutDocument);
}
export const UpdatePlayerDashboardLayoutDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdatePlayerDashboardLayout' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'playerId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'uuid' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'dashboardLayout' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'update_player_by_pk' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'pk_columns' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'playerId' },
                      },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: '_set' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'dashboardLayout' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'dashboardLayout' },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'dashboardLayout' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

export function useUpdatePlayerDashboardLayoutMutation() {
  return Urql.useMutation<
    UpdatePlayerDashboardLayoutMutation,
    UpdatePlayerDashboardLayoutMutationVariables
  >(UpdatePlayerDashboardLayoutDocument);
}
export const UpdateProfilePronounsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updateProfilePronouns' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'playerId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'uuid' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'profile_set_input' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'update_profile' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'playerId' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'playerId' },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: '_set' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'affected_rows' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'returning' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'playerId' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

export function useUpdateProfilePronounsMutation() {
  return Urql.useMutation<
    UpdateProfilePronounsMutation,
    UpdateProfilePronounsMutationVariables
  >(UpdateProfilePronounsDocument);
}
export const UpdateQuestDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateQuest' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'uuid' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'quest_set_input' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'skills' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: { kind: 'Name', value: 'quest_skill_insert_input' },
                },
              },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'roles' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'ListType',
              type: {
                kind: 'NonNullType',
                type: {
                  kind: 'NamedType',
                  name: { kind: 'Name', value: 'quest_role_insert_input' },
                },
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'update_quest_by_pk' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'pk_columns' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'id' },
                      },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: '_set' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'delete_quest_skill' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'questId' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'id' },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'affected_rows' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'insert_quest_skill' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'objects' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'skills' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'affected_rows' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'returning' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'questId' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'skillId' },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'delete_quest_role' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'questId' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'id' },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'affected_rows' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'insert_quest_role' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'objects' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'roles' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'affected_rows' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'returning' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'questId' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'role' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

export function useUpdateQuestMutation() {
  return Urql.useMutation<UpdateQuestMutation, UpdateQuestMutationVariables>(
    UpdateQuestDocument,
  );
}
export const UpdateQuestCompletionDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateQuestCompletion' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'questCompletionId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'status' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'QuestCompletionStatus_ActionEnum' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateQuestCompletion' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'updateData' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'questCompletionId' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'questCompletionId' },
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'status' },
                      value: {
                        kind: 'Variable',
                        name: { kind: 'Name', value: 'status' },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'error' } },
                { kind: 'Field', name: { kind: 'Name', value: 'success' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'quest_completion_id' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'quest_completion' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

export function useUpdateQuestCompletionMutation() {
  return Urql.useMutation<
    UpdateQuestCompletionMutation,
    UpdateQuestCompletionMutationVariables
  >(UpdateQuestCompletionDocument);
}
export const GetExplorerTypesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetExplorerTypes' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ExplorerType' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'imageURL' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

export function useGetExplorerTypesQuery(
  options?: Omit<Urql.UseQueryArgs<GetExplorerTypesQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetExplorerTypesQuery>({
    query: GetExplorerTypesDocument,
    ...options,
  });
}
export const GetAspectsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetAspects' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ColorAspect' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'mask' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

export function useGetAspectsQuery(
  options?: Omit<Urql.UseQueryArgs<GetAspectsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetAspectsQuery>({
    query: GetAspectsDocument,
    ...options,
  });
}
export const GetPlayerRolesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetPlayerRoles' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'PlayerRole' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'role' } },
                { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'basic' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

export function useGetPlayerRolesQuery(
  options?: Omit<Urql.UseQueryArgs<GetPlayerRolesQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetPlayerRolesQuery>({
    query: GetPlayerRolesDocument,
    ...options,
  });
}
export const GetSkillsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetSkills' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'skill' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'Player_Skills_aggregate' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'count' },
                            value: { kind: 'EnumValue', value: 'desc' },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'category' },
                      value: { kind: 'EnumValue', value: 'asc' },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'PlayerSkillFragment' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PlayerSkillFragment' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'skill' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'category' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

export function useGetSkillsQuery(
  options?: Omit<Urql.UseQueryArgs<GetSkillsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetSkillsQuery>({
    query: GetSkillsDocument,
    ...options,
  });
}
export const GetGuildDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetGuild' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'guildname' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'guild' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'guildname' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'guildname' },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'GuildFragment' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'GuildFragment' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'guild' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'guildname' } },
          { kind: 'Field', name: { kind: 'Name', value: 'profileLayout' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'discordInviteUrl' } },
          { kind: 'Field', name: { kind: 'Name', value: 'joinButtonUrl' } },
          { kind: 'Field', name: { kind: 'Name', value: 'logo' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
          { kind: 'Field', name: { kind: 'Name', value: 'websiteUrl' } },
          { kind: 'Field', name: { kind: 'Name', value: 'githubUrl' } },
          { kind: 'Field', name: { kind: 'Name', value: 'twitterUrl' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'showDiscordAnnouncements' },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'daos' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'contractAddress' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'network' } },
                { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                { kind: 'Field', name: { kind: 'Name', value: 'url' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

export function useGetGuildQuery(
  options: Omit<Urql.UseQueryArgs<GetGuildQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetGuildQuery>({ query: GetGuildDocument, ...options });
}
export const GetGuildMetadataDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetGuildMetadata' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'uuid' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'guild_metadata' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'guildId' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'id' },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'guildId' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'discordMetadata' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'discordRoles' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'position' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

export function useGetGuildMetadataQuery(
  options: Omit<Urql.UseQueryArgs<GetGuildMetadataQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetGuildMetadataQuery>({
    query: GetGuildMetadataDocument,
    ...options,
  });
}
export const GetAdministeredGuildsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetAdministeredGuilds' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'uuid' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'guild_metadata' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'creatorId' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'id' },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'guildId' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

export function useGetAdministeredGuildsQuery(
  options: Omit<
    Urql.UseQueryArgs<GetAdministeredGuildsQueryVariables>,
    'query'
  >,
) {
  return Urql.useQuery<GetAdministeredGuildsQuery>({
    query: GetAdministeredGuildsDocument,
    ...options,
  });
}
export const GetGuildsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetGuilds' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'limit' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'guild' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'status' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: { kind: 'EnumValue', value: 'ACTIVE' },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'limit' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'order_by' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'sortPosition' },
                      value: { kind: 'EnumValue', value: 'asc_nulls_last' },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'GuildFragment' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'GuildFragment' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'guild' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'guildname' } },
          { kind: 'Field', name: { kind: 'Name', value: 'profileLayout' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'discordInviteUrl' } },
          { kind: 'Field', name: { kind: 'Name', value: 'joinButtonUrl' } },
          { kind: 'Field', name: { kind: 'Name', value: 'logo' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
          { kind: 'Field', name: { kind: 'Name', value: 'websiteUrl' } },
          { kind: 'Field', name: { kind: 'Name', value: 'githubUrl' } },
          { kind: 'Field', name: { kind: 'Name', value: 'twitterUrl' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'showDiscordAnnouncements' },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'daos' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'contractAddress' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'network' } },
                { kind: 'Field', name: { kind: 'Name', value: 'label' } },
                { kind: 'Field', name: { kind: 'Name', value: 'url' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

export function useGetGuildsQuery(
  options?: Omit<Urql.UseQueryArgs<GetGuildsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetGuildsQuery>({
    query: GetGuildsDocument,
    ...options,
  });
}
export const GetGuildnamesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetGuildnames' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'status' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'GuildStatus_enum' },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'limit' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'guild' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'status' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'status' },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'limit' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'guildname' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

export function useGetGuildnamesQuery(
  options?: Omit<Urql.UseQueryArgs<GetGuildnamesQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetGuildnamesQuery>({
    query: GetGuildnamesDocument,
    ...options,
  });
}
export const GetGuildPlayersDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetGuildPlayers' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'guildId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'uuid' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'guild_player' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'guildId' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'guildId' },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'Player' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'totalXP' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'rank' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'ethereumAddress' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'profile' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'username' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'profileImageURL' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

export function useGetGuildPlayersQuery(
  options: Omit<Urql.UseQueryArgs<GetGuildPlayersQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetGuildPlayersQuery>({
    query: GetGuildPlayersDocument,
    ...options,
  });
}
export const GetGuildAnnouncementsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetGuildAnnouncements' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'guildId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'uuid' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'guild' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: '_eq' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'guildId' },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'discordAnnouncements' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode;

export function useGetGuildAnnouncementsQuery(
  options: Omit<
    Urql.UseQueryArgs<GetGuildAnnouncementsQueryVariables>,
    'query'
  >,
) {
  return Urql.useQuery<GetGuildAnnouncementsQuery>({
    query: GetGuildAnnouncementsDocument,
    ...options,
  });
}
