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
  float8: any;
  json: any;
  jsonb: any;
  numeric: any;
  timestamptz: any;
  uuid: any;
};

/** columns and relationships of "AccountType" */
export type AccountType = {
  readonly __typename?: 'AccountType';
  readonly type: Scalars['String'];
};

/** aggregated selection of "AccountType" */
export type AccountType_Aggregate = {
  readonly __typename?: 'AccountType_aggregate';
  readonly aggregate?: Maybe<AccountType_Aggregate_Fields>;
  readonly nodes: ReadonlyArray<AccountType>;
};

/** aggregate fields of "AccountType" */
export type AccountType_Aggregate_Fields = {
  readonly __typename?: 'AccountType_aggregate_fields';
  readonly count?: Maybe<Scalars['Int']>;
  readonly max?: Maybe<AccountType_Max_Fields>;
  readonly min?: Maybe<AccountType_Min_Fields>;
};


/** aggregate fields of "AccountType" */
export type AccountType_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<ReadonlyArray<AccountType_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "AccountType" */
export type AccountType_Aggregate_Order_By = {
  readonly count?: InputMaybe<Order_By>;
  readonly max?: InputMaybe<AccountType_Max_Order_By>;
  readonly min?: InputMaybe<AccountType_Min_Order_By>;
};

/** input type for inserting array relation for remote table "AccountType" */
export type AccountType_Arr_Rel_Insert_Input = {
  readonly data: ReadonlyArray<AccountType_Insert_Input>;
  readonly on_conflict?: InputMaybe<AccountType_On_Conflict>;
};

/** Boolean expression to filter rows from the table "AccountType". All fields are combined with a logical 'AND'. */
export type AccountType_Bool_Exp = {
  readonly _and?: InputMaybe<ReadonlyArray<InputMaybe<AccountType_Bool_Exp>>>;
  readonly _not?: InputMaybe<AccountType_Bool_Exp>;
  readonly _or?: InputMaybe<ReadonlyArray<InputMaybe<AccountType_Bool_Exp>>>;
  readonly type?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "AccountType" */
export enum AccountType_Constraint {
  /** unique or primary key constraint */
  AccountTypePkey = 'AccountType_pkey'
}

export enum AccountType_Enum {
  Discord = 'DISCORD',
  Discourse = 'DISCOURSE',
  Ethereum = 'ETHEREUM',
  Github = 'GITHUB',
  Meetwithwallet = 'MEETWITHWALLET',
  Twitter = 'TWITTER'
}

/** expression to compare columns of type AccountType_enum. All fields are combined with logical 'AND'. */
export type AccountType_Enum_Comparison_Exp = {
  readonly _eq?: InputMaybe<AccountType_Enum>;
  readonly _in?: InputMaybe<ReadonlyArray<AccountType_Enum>>;
  readonly _is_null?: InputMaybe<Scalars['Boolean']>;
  readonly _neq?: InputMaybe<AccountType_Enum>;
  readonly _nin?: InputMaybe<ReadonlyArray<AccountType_Enum>>;
};

/** input type for inserting data into table "AccountType" */
export type AccountType_Insert_Input = {
  readonly type?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type AccountType_Max_Fields = {
  readonly __typename?: 'AccountType_max_fields';
  readonly type?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "AccountType" */
export type AccountType_Max_Order_By = {
  readonly type?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type AccountType_Min_Fields = {
  readonly __typename?: 'AccountType_min_fields';
  readonly type?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "AccountType" */
export type AccountType_Min_Order_By = {
  readonly type?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "AccountType" */
export type AccountType_Mutation_Response = {
  readonly __typename?: 'AccountType_mutation_response';
  /** number of affected rows by the mutation */
  readonly affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  readonly returning: ReadonlyArray<AccountType>;
};

/** input type for inserting object relation for remote table "AccountType" */
export type AccountType_Obj_Rel_Insert_Input = {
  readonly data: AccountType_Insert_Input;
  readonly on_conflict?: InputMaybe<AccountType_On_Conflict>;
};

/** on conflict condition type for table "AccountType" */
export type AccountType_On_Conflict = {
  readonly constraint: AccountType_Constraint;
  readonly update_columns: ReadonlyArray<AccountType_Update_Column>;
  readonly where?: InputMaybe<AccountType_Bool_Exp>;
};

/** ordering options when selecting data from "AccountType" */
export type AccountType_Order_By = {
  readonly type?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "AccountType" */
export type AccountType_Pk_Columns_Input = {
  readonly type: Scalars['String'];
};

/** select columns of table "AccountType" */
export enum AccountType_Select_Column {
  /** column name */
  Type = 'type'
}

/** input type for updating data in table "AccountType" */
export type AccountType_Set_Input = {
  readonly type?: InputMaybe<Scalars['String']>;
};

/** update columns of table "AccountType" */
export enum AccountType_Update_Column {
  /** column name */
  Type = 'type'
}

/** expression to compare columns of type Boolean. All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  readonly _eq?: InputMaybe<Scalars['Boolean']>;
  readonly _gt?: InputMaybe<Scalars['Boolean']>;
  readonly _gte?: InputMaybe<Scalars['Boolean']>;
  readonly _in?: InputMaybe<ReadonlyArray<Scalars['Boolean']>>;
  readonly _is_null?: InputMaybe<Scalars['Boolean']>;
  readonly _lt?: InputMaybe<Scalars['Boolean']>;
  readonly _lte?: InputMaybe<Scalars['Boolean']>;
  readonly _neq?: InputMaybe<Scalars['Boolean']>;
  readonly _nin?: InputMaybe<ReadonlyArray<Scalars['Boolean']>>;
};

export type BrightIdStatus = {
  readonly __typename?: 'BrightIdStatus';
  readonly app: Scalars['String'];
  readonly context: Scalars['String'];
  readonly contextIds: ReadonlyArray<Scalars['String']>;
  readonly unique: Scalars['Boolean'];
};

export type CacheProcessOutput = {
  readonly __typename?: 'CacheProcessOutput';
  readonly error?: Maybe<Scalars['String']>;
  readonly queued: Scalars['Boolean'];
  readonly success: Scalars['Boolean'];
};

export type CollectiblesFavorites = {
  readonly __typename?: 'CollectiblesFavorites';
  readonly address?: Maybe<Scalars['String']>;
  readonly tokenId?: Maybe<Scalars['String']>;
};

/** columns and relationships of "ColorAspect" */
export type ColorAspect = {
  readonly __typename?: 'ColorAspect';
  readonly description?: Maybe<Scalars['String']>;
  readonly mask: Scalars['Int'];
  readonly name: Scalars['String'];
  /** An array relationship */
  readonly profiles: ReadonlyArray<Profile>;
  /** An aggregated array relationship */
  readonly profiles_aggregate: Profile_Aggregate;
};


/** columns and relationships of "ColorAspect" */
export type ColorAspectProfilesArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Profile_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Profile_Order_By>>;
  where?: InputMaybe<Profile_Bool_Exp>;
};


/** columns and relationships of "ColorAspect" */
export type ColorAspectProfiles_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Profile_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Profile_Order_By>>;
  where?: InputMaybe<Profile_Bool_Exp>;
};

/** aggregated selection of "ColorAspect" */
export type ColorAspect_Aggregate = {
  readonly __typename?: 'ColorAspect_aggregate';
  readonly aggregate?: Maybe<ColorAspect_Aggregate_Fields>;
  readonly nodes: ReadonlyArray<ColorAspect>;
};

/** aggregate fields of "ColorAspect" */
export type ColorAspect_Aggregate_Fields = {
  readonly __typename?: 'ColorAspect_aggregate_fields';
  readonly avg?: Maybe<ColorAspect_Avg_Fields>;
  readonly count?: Maybe<Scalars['Int']>;
  readonly max?: Maybe<ColorAspect_Max_Fields>;
  readonly min?: Maybe<ColorAspect_Min_Fields>;
  readonly stddev?: Maybe<ColorAspect_Stddev_Fields>;
  readonly stddev_pop?: Maybe<ColorAspect_Stddev_Pop_Fields>;
  readonly stddev_samp?: Maybe<ColorAspect_Stddev_Samp_Fields>;
  readonly sum?: Maybe<ColorAspect_Sum_Fields>;
  readonly var_pop?: Maybe<ColorAspect_Var_Pop_Fields>;
  readonly var_samp?: Maybe<ColorAspect_Var_Samp_Fields>;
  readonly variance?: Maybe<ColorAspect_Variance_Fields>;
};


/** aggregate fields of "ColorAspect" */
export type ColorAspect_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<ReadonlyArray<ColorAspect_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "ColorAspect" */
export type ColorAspect_Aggregate_Order_By = {
  readonly avg?: InputMaybe<ColorAspect_Avg_Order_By>;
  readonly count?: InputMaybe<Order_By>;
  readonly max?: InputMaybe<ColorAspect_Max_Order_By>;
  readonly min?: InputMaybe<ColorAspect_Min_Order_By>;
  readonly stddev?: InputMaybe<ColorAspect_Stddev_Order_By>;
  readonly stddev_pop?: InputMaybe<ColorAspect_Stddev_Pop_Order_By>;
  readonly stddev_samp?: InputMaybe<ColorAspect_Stddev_Samp_Order_By>;
  readonly sum?: InputMaybe<ColorAspect_Sum_Order_By>;
  readonly var_pop?: InputMaybe<ColorAspect_Var_Pop_Order_By>;
  readonly var_samp?: InputMaybe<ColorAspect_Var_Samp_Order_By>;
  readonly variance?: InputMaybe<ColorAspect_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "ColorAspect" */
export type ColorAspect_Arr_Rel_Insert_Input = {
  readonly data: ReadonlyArray<ColorAspect_Insert_Input>;
  readonly on_conflict?: InputMaybe<ColorAspect_On_Conflict>;
};

/** aggregate avg on columns */
export type ColorAspect_Avg_Fields = {
  readonly __typename?: 'ColorAspect_avg_fields';
  readonly mask?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "ColorAspect" */
export type ColorAspect_Avg_Order_By = {
  readonly mask?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "ColorAspect". All fields are combined with a logical 'AND'. */
export type ColorAspect_Bool_Exp = {
  readonly _and?: InputMaybe<ReadonlyArray<InputMaybe<ColorAspect_Bool_Exp>>>;
  readonly _not?: InputMaybe<ColorAspect_Bool_Exp>;
  readonly _or?: InputMaybe<ReadonlyArray<InputMaybe<ColorAspect_Bool_Exp>>>;
  readonly description?: InputMaybe<String_Comparison_Exp>;
  readonly mask?: InputMaybe<Int_Comparison_Exp>;
  readonly name?: InputMaybe<String_Comparison_Exp>;
  readonly profiles?: InputMaybe<Profile_Bool_Exp>;
};

/** unique or primary key constraints on table "ColorAspect" */
export enum ColorAspect_Constraint {
  /** unique or primary key constraint */
  ColorAspectNameKey = 'ColorAspect_name_key',
  /** unique or primary key constraint */
  ColorAspectPkey = 'ColorAspect_pkey'
}

/** input type for incrementing integer column in table "ColorAspect" */
export type ColorAspect_Inc_Input = {
  readonly mask?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "ColorAspect" */
export type ColorAspect_Insert_Input = {
  readonly description?: InputMaybe<Scalars['String']>;
  readonly mask?: InputMaybe<Scalars['Int']>;
  readonly name?: InputMaybe<Scalars['String']>;
  readonly profiles?: InputMaybe<Profile_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type ColorAspect_Max_Fields = {
  readonly __typename?: 'ColorAspect_max_fields';
  readonly description?: Maybe<Scalars['String']>;
  readonly mask?: Maybe<Scalars['Int']>;
  readonly name?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "ColorAspect" */
export type ColorAspect_Max_Order_By = {
  readonly description?: InputMaybe<Order_By>;
  readonly mask?: InputMaybe<Order_By>;
  readonly name?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type ColorAspect_Min_Fields = {
  readonly __typename?: 'ColorAspect_min_fields';
  readonly description?: Maybe<Scalars['String']>;
  readonly mask?: Maybe<Scalars['Int']>;
  readonly name?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "ColorAspect" */
export type ColorAspect_Min_Order_By = {
  readonly description?: InputMaybe<Order_By>;
  readonly mask?: InputMaybe<Order_By>;
  readonly name?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "ColorAspect" */
export type ColorAspect_Mutation_Response = {
  readonly __typename?: 'ColorAspect_mutation_response';
  /** number of affected rows by the mutation */
  readonly affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  readonly returning: ReadonlyArray<ColorAspect>;
};

/** input type for inserting object relation for remote table "ColorAspect" */
export type ColorAspect_Obj_Rel_Insert_Input = {
  readonly data: ColorAspect_Insert_Input;
  readonly on_conflict?: InputMaybe<ColorAspect_On_Conflict>;
};

/** on conflict condition type for table "ColorAspect" */
export type ColorAspect_On_Conflict = {
  readonly constraint: ColorAspect_Constraint;
  readonly update_columns: ReadonlyArray<ColorAspect_Update_Column>;
  readonly where?: InputMaybe<ColorAspect_Bool_Exp>;
};

/** ordering options when selecting data from "ColorAspect" */
export type ColorAspect_Order_By = {
  readonly description?: InputMaybe<Order_By>;
  readonly mask?: InputMaybe<Order_By>;
  readonly name?: InputMaybe<Order_By>;
  readonly profiles_aggregate?: InputMaybe<Profile_Aggregate_Order_By>;
};

/** primary key columns input for table: "ColorAspect" */
export type ColorAspect_Pk_Columns_Input = {
  readonly mask: Scalars['Int'];
};

/** select columns of table "ColorAspect" */
export enum ColorAspect_Select_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Mask = 'mask',
  /** column name */
  Name = 'name'
}

/** input type for updating data in table "ColorAspect" */
export type ColorAspect_Set_Input = {
  readonly description?: InputMaybe<Scalars['String']>;
  readonly mask?: InputMaybe<Scalars['Int']>;
  readonly name?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type ColorAspect_Stddev_Fields = {
  readonly __typename?: 'ColorAspect_stddev_fields';
  readonly mask?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "ColorAspect" */
export type ColorAspect_Stddev_Order_By = {
  readonly mask?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type ColorAspect_Stddev_Pop_Fields = {
  readonly __typename?: 'ColorAspect_stddev_pop_fields';
  readonly mask?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "ColorAspect" */
export type ColorAspect_Stddev_Pop_Order_By = {
  readonly mask?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type ColorAspect_Stddev_Samp_Fields = {
  readonly __typename?: 'ColorAspect_stddev_samp_fields';
  readonly mask?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "ColorAspect" */
export type ColorAspect_Stddev_Samp_Order_By = {
  readonly mask?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type ColorAspect_Sum_Fields = {
  readonly __typename?: 'ColorAspect_sum_fields';
  readonly mask?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "ColorAspect" */
export type ColorAspect_Sum_Order_By = {
  readonly mask?: InputMaybe<Order_By>;
};

/** update columns of table "ColorAspect" */
export enum ColorAspect_Update_Column {
  /** column name */
  Description = 'description',
  /** column name */
  Mask = 'mask',
  /** column name */
  Name = 'name'
}

/** aggregate var_pop on columns */
export type ColorAspect_Var_Pop_Fields = {
  readonly __typename?: 'ColorAspect_var_pop_fields';
  readonly mask?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "ColorAspect" */
export type ColorAspect_Var_Pop_Order_By = {
  readonly mask?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type ColorAspect_Var_Samp_Fields = {
  readonly __typename?: 'ColorAspect_var_samp_fields';
  readonly mask?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "ColorAspect" */
export type ColorAspect_Var_Samp_Order_By = {
  readonly mask?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type ColorAspect_Variance_Fields = {
  readonly __typename?: 'ColorAspect_variance_fields';
  readonly mask?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "ColorAspect" */
export type ColorAspect_Variance_Order_By = {
  readonly mask?: InputMaybe<Order_By>;
};

export type CreateQuestCompletionInput = {
  readonly questId: Scalars['String'];
  readonly submissionLink?: InputMaybe<Scalars['String']>;
  readonly submissionText?: InputMaybe<Scalars['String']>;
};

export type CreateQuestCompletionOutput = {
  readonly __typename?: 'CreateQuestCompletionOutput';
  readonly error?: Maybe<Scalars['String']>;
  readonly quest_completion?: Maybe<Quest_Completion>;
  readonly quest_completion_id?: Maybe<Scalars['uuid']>;
  readonly success: Scalars['Boolean'];
};

export type CreateQuestInput = {
  readonly cooldown?: InputMaybe<Scalars['Int']>;
  readonly description?: InputMaybe<Scalars['String']>;
  readonly externalLink?: InputMaybe<Scalars['String']>;
  readonly guildId: Scalars['uuid'];
  readonly image?: InputMaybe<Scalars['String']>;
  readonly repetition?: InputMaybe<QuestRepetition_ActionEnum>;
  readonly roleIds: ReadonlyArray<InputMaybe<Scalars['uuid']>>;
  readonly skillIds: ReadonlyArray<InputMaybe<Scalars['uuid']>>;
  readonly title: Scalars['String'];
};

export type CreateQuestOutput = {
  readonly __typename?: 'CreateQuestOutput';
  readonly error?: Maybe<Scalars['String']>;
  readonly quest?: Maybe<Quest>;
  readonly quest_id?: Maybe<Scalars['uuid']>;
  readonly success: Scalars['Boolean'];
};

export type DaoMetadata = {
  readonly __typename?: 'DaoMetadata';
  readonly avatarImg?: Maybe<Scalars['String']>;
  readonly contractAddress: Scalars['String'];
  readonly description: Scalars['String'];
  readonly name: Scalars['String'];
  readonly network: Scalars['String'];
};

export type DiscordGuildAuthResponse = {
  readonly __typename?: 'DiscordGuildAuthResponse';
  readonly error?: Maybe<Scalars['String']>;
  readonly exists?: Maybe<Scalars['Boolean']>;
  readonly guildname?: Maybe<Scalars['String']>;
  readonly success: Scalars['Boolean'];
};

export type DiscordGuildsSyncOutput = {
  readonly __typename?: 'DiscordGuildsSyncOutput';
  readonly name: Scalars['String'];
  readonly numDeleted?: Maybe<Scalars['Int']>;
  readonly numInserted?: Maybe<Scalars['Int']>;
  readonly numSkipped?: Maybe<Scalars['Int']>;
  readonly username: Scalars['String'];
};

export type DiscordRole = {
  readonly __typename?: 'DiscordRole';
  readonly id: Scalars['String'];
  readonly name: Scalars['String'];
  readonly position: Scalars['Int'];
};

export type ExpiredPlayerProfiles = {
  readonly __typename?: 'ExpiredPlayerProfiles';
  readonly ids: ReadonlyArray<Maybe<Scalars['String']>>;
};

/** columns and relationships of "ExplorerType" */
export type ExplorerType = {
  readonly __typename?: 'ExplorerType';
  readonly description: Scalars['String'];
  readonly id: Scalars['Int'];
  readonly imageURL?: Maybe<Scalars['String']>;
  /** An array relationship */
  readonly profiles: ReadonlyArray<Profile>;
  /** An aggregated array relationship */
  readonly profiles_aggregate: Profile_Aggregate;
  readonly title: Scalars['String'];
};


/** columns and relationships of "ExplorerType" */
export type ExplorerTypeProfilesArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Profile_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Profile_Order_By>>;
  where?: InputMaybe<Profile_Bool_Exp>;
};


/** columns and relationships of "ExplorerType" */
export type ExplorerTypeProfiles_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Profile_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Profile_Order_By>>;
  where?: InputMaybe<Profile_Bool_Exp>;
};

/** aggregated selection of "ExplorerType" */
export type ExplorerType_Aggregate = {
  readonly __typename?: 'ExplorerType_aggregate';
  readonly aggregate?: Maybe<ExplorerType_Aggregate_Fields>;
  readonly nodes: ReadonlyArray<ExplorerType>;
};

/** aggregate fields of "ExplorerType" */
export type ExplorerType_Aggregate_Fields = {
  readonly __typename?: 'ExplorerType_aggregate_fields';
  readonly avg?: Maybe<ExplorerType_Avg_Fields>;
  readonly count?: Maybe<Scalars['Int']>;
  readonly max?: Maybe<ExplorerType_Max_Fields>;
  readonly min?: Maybe<ExplorerType_Min_Fields>;
  readonly stddev?: Maybe<ExplorerType_Stddev_Fields>;
  readonly stddev_pop?: Maybe<ExplorerType_Stddev_Pop_Fields>;
  readonly stddev_samp?: Maybe<ExplorerType_Stddev_Samp_Fields>;
  readonly sum?: Maybe<ExplorerType_Sum_Fields>;
  readonly var_pop?: Maybe<ExplorerType_Var_Pop_Fields>;
  readonly var_samp?: Maybe<ExplorerType_Var_Samp_Fields>;
  readonly variance?: Maybe<ExplorerType_Variance_Fields>;
};


/** aggregate fields of "ExplorerType" */
export type ExplorerType_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<ReadonlyArray<ExplorerType_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "ExplorerType" */
export type ExplorerType_Aggregate_Order_By = {
  readonly avg?: InputMaybe<ExplorerType_Avg_Order_By>;
  readonly count?: InputMaybe<Order_By>;
  readonly max?: InputMaybe<ExplorerType_Max_Order_By>;
  readonly min?: InputMaybe<ExplorerType_Min_Order_By>;
  readonly stddev?: InputMaybe<ExplorerType_Stddev_Order_By>;
  readonly stddev_pop?: InputMaybe<ExplorerType_Stddev_Pop_Order_By>;
  readonly stddev_samp?: InputMaybe<ExplorerType_Stddev_Samp_Order_By>;
  readonly sum?: InputMaybe<ExplorerType_Sum_Order_By>;
  readonly var_pop?: InputMaybe<ExplorerType_Var_Pop_Order_By>;
  readonly var_samp?: InputMaybe<ExplorerType_Var_Samp_Order_By>;
  readonly variance?: InputMaybe<ExplorerType_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "ExplorerType" */
export type ExplorerType_Arr_Rel_Insert_Input = {
  readonly data: ReadonlyArray<ExplorerType_Insert_Input>;
  readonly on_conflict?: InputMaybe<ExplorerType_On_Conflict>;
};

/** aggregate avg on columns */
export type ExplorerType_Avg_Fields = {
  readonly __typename?: 'ExplorerType_avg_fields';
  readonly id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "ExplorerType" */
export type ExplorerType_Avg_Order_By = {
  readonly id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "ExplorerType". All fields are combined with a logical 'AND'. */
export type ExplorerType_Bool_Exp = {
  readonly _and?: InputMaybe<ReadonlyArray<InputMaybe<ExplorerType_Bool_Exp>>>;
  readonly _not?: InputMaybe<ExplorerType_Bool_Exp>;
  readonly _or?: InputMaybe<ReadonlyArray<InputMaybe<ExplorerType_Bool_Exp>>>;
  readonly description?: InputMaybe<String_Comparison_Exp>;
  readonly id?: InputMaybe<Int_Comparison_Exp>;
  readonly imageURL?: InputMaybe<String_Comparison_Exp>;
  readonly profiles?: InputMaybe<Profile_Bool_Exp>;
  readonly title?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "ExplorerType" */
export enum ExplorerType_Constraint {
  /** unique or primary key constraint */
  PlayerTypePkey = 'PlayerType_pkey',
  /** unique or primary key constraint */
  PlayerTypeTitleKey = 'PlayerType_title_key'
}

/** input type for incrementing integer column in table "ExplorerType" */
export type ExplorerType_Inc_Input = {
  readonly id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "ExplorerType" */
export type ExplorerType_Insert_Input = {
  readonly description?: InputMaybe<Scalars['String']>;
  readonly id?: InputMaybe<Scalars['Int']>;
  readonly imageURL?: InputMaybe<Scalars['String']>;
  readonly profiles?: InputMaybe<Profile_Arr_Rel_Insert_Input>;
  readonly title?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type ExplorerType_Max_Fields = {
  readonly __typename?: 'ExplorerType_max_fields';
  readonly description?: Maybe<Scalars['String']>;
  readonly id?: Maybe<Scalars['Int']>;
  readonly imageURL?: Maybe<Scalars['String']>;
  readonly title?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "ExplorerType" */
export type ExplorerType_Max_Order_By = {
  readonly description?: InputMaybe<Order_By>;
  readonly id?: InputMaybe<Order_By>;
  readonly imageURL?: InputMaybe<Order_By>;
  readonly title?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type ExplorerType_Min_Fields = {
  readonly __typename?: 'ExplorerType_min_fields';
  readonly description?: Maybe<Scalars['String']>;
  readonly id?: Maybe<Scalars['Int']>;
  readonly imageURL?: Maybe<Scalars['String']>;
  readonly title?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "ExplorerType" */
export type ExplorerType_Min_Order_By = {
  readonly description?: InputMaybe<Order_By>;
  readonly id?: InputMaybe<Order_By>;
  readonly imageURL?: InputMaybe<Order_By>;
  readonly title?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "ExplorerType" */
export type ExplorerType_Mutation_Response = {
  readonly __typename?: 'ExplorerType_mutation_response';
  /** number of affected rows by the mutation */
  readonly affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  readonly returning: ReadonlyArray<ExplorerType>;
};

/** input type for inserting object relation for remote table "ExplorerType" */
export type ExplorerType_Obj_Rel_Insert_Input = {
  readonly data: ExplorerType_Insert_Input;
  readonly on_conflict?: InputMaybe<ExplorerType_On_Conflict>;
};

/** on conflict condition type for table "ExplorerType" */
export type ExplorerType_On_Conflict = {
  readonly constraint: ExplorerType_Constraint;
  readonly update_columns: ReadonlyArray<ExplorerType_Update_Column>;
  readonly where?: InputMaybe<ExplorerType_Bool_Exp>;
};

/** ordering options when selecting data from "ExplorerType" */
export type ExplorerType_Order_By = {
  readonly description?: InputMaybe<Order_By>;
  readonly id?: InputMaybe<Order_By>;
  readonly imageURL?: InputMaybe<Order_By>;
  readonly profiles_aggregate?: InputMaybe<Profile_Aggregate_Order_By>;
  readonly title?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "ExplorerType" */
export type ExplorerType_Pk_Columns_Input = {
  readonly id: Scalars['Int'];
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
  Title = 'title'
}

/** input type for updating data in table "ExplorerType" */
export type ExplorerType_Set_Input = {
  readonly description?: InputMaybe<Scalars['String']>;
  readonly id?: InputMaybe<Scalars['Int']>;
  readonly imageURL?: InputMaybe<Scalars['String']>;
  readonly title?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type ExplorerType_Stddev_Fields = {
  readonly __typename?: 'ExplorerType_stddev_fields';
  readonly id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "ExplorerType" */
export type ExplorerType_Stddev_Order_By = {
  readonly id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type ExplorerType_Stddev_Pop_Fields = {
  readonly __typename?: 'ExplorerType_stddev_pop_fields';
  readonly id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "ExplorerType" */
export type ExplorerType_Stddev_Pop_Order_By = {
  readonly id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type ExplorerType_Stddev_Samp_Fields = {
  readonly __typename?: 'ExplorerType_stddev_samp_fields';
  readonly id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "ExplorerType" */
export type ExplorerType_Stddev_Samp_Order_By = {
  readonly id?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type ExplorerType_Sum_Fields = {
  readonly __typename?: 'ExplorerType_sum_fields';
  readonly id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "ExplorerType" */
export type ExplorerType_Sum_Order_By = {
  readonly id?: InputMaybe<Order_By>;
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
  Title = 'title'
}

/** aggregate var_pop on columns */
export type ExplorerType_Var_Pop_Fields = {
  readonly __typename?: 'ExplorerType_var_pop_fields';
  readonly id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "ExplorerType" */
export type ExplorerType_Var_Pop_Order_By = {
  readonly id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type ExplorerType_Var_Samp_Fields = {
  readonly __typename?: 'ExplorerType_var_samp_fields';
  readonly id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "ExplorerType" */
export type ExplorerType_Var_Samp_Order_By = {
  readonly id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type ExplorerType_Variance_Fields = {
  readonly __typename?: 'ExplorerType_variance_fields';
  readonly id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "ExplorerType" */
export type ExplorerType_Variance_Order_By = {
  readonly id?: InputMaybe<Order_By>;
};

export type GuildDaoInput = {
  readonly contractAddress: Scalars['String'];
  readonly label?: InputMaybe<Scalars['String']>;
  readonly network: Scalars['String'];
  readonly url?: InputMaybe<Scalars['String']>;
};

export type GuildInfoInput = {
  readonly daos?: InputMaybe<ReadonlyArray<GuildDaoInput>>;
  readonly description?: InputMaybe<Scalars['String']>;
  readonly discordAdminRoles: ReadonlyArray<InputMaybe<Scalars['String']>>;
  readonly discordInviteUrl?: InputMaybe<Scalars['String']>;
  readonly discordMembershipRoles: ReadonlyArray<InputMaybe<Scalars['String']>>;
  readonly githubUrl?: InputMaybe<Scalars['String']>;
  readonly guildname: Scalars['String'];
  readonly joinUrl?: InputMaybe<Scalars['String']>;
  readonly logoUrl?: InputMaybe<Scalars['String']>;
  readonly membershipThroughDiscord?: InputMaybe<Scalars['Boolean']>;
  readonly name: Scalars['String'];
  readonly twitterUrl?: InputMaybe<Scalars['String']>;
  readonly type: GuildType_ActionEnum;
  readonly uuid: Scalars['String'];
  readonly websiteUrl?: InputMaybe<Scalars['String']>;
};

export type GuildLayoutInfoInput = {
  readonly profileLayout: Scalars['String'];
  readonly uuid: Scalars['String'];
};

/** columns and relationships of "GuildStatus" */
export type GuildStatus = {
  readonly __typename?: 'GuildStatus';
  readonly status: Scalars['String'];
};

/** aggregated selection of "GuildStatus" */
export type GuildStatus_Aggregate = {
  readonly __typename?: 'GuildStatus_aggregate';
  readonly aggregate?: Maybe<GuildStatus_Aggregate_Fields>;
  readonly nodes: ReadonlyArray<GuildStatus>;
};

/** aggregate fields of "GuildStatus" */
export type GuildStatus_Aggregate_Fields = {
  readonly __typename?: 'GuildStatus_aggregate_fields';
  readonly count?: Maybe<Scalars['Int']>;
  readonly max?: Maybe<GuildStatus_Max_Fields>;
  readonly min?: Maybe<GuildStatus_Min_Fields>;
};


/** aggregate fields of "GuildStatus" */
export type GuildStatus_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<ReadonlyArray<GuildStatus_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "GuildStatus" */
export type GuildStatus_Aggregate_Order_By = {
  readonly count?: InputMaybe<Order_By>;
  readonly max?: InputMaybe<GuildStatus_Max_Order_By>;
  readonly min?: InputMaybe<GuildStatus_Min_Order_By>;
};

/** input type for inserting array relation for remote table "GuildStatus" */
export type GuildStatus_Arr_Rel_Insert_Input = {
  readonly data: ReadonlyArray<GuildStatus_Insert_Input>;
  readonly on_conflict?: InputMaybe<GuildStatus_On_Conflict>;
};

/** Boolean expression to filter rows from the table "GuildStatus". All fields are combined with a logical 'AND'. */
export type GuildStatus_Bool_Exp = {
  readonly _and?: InputMaybe<ReadonlyArray<InputMaybe<GuildStatus_Bool_Exp>>>;
  readonly _not?: InputMaybe<GuildStatus_Bool_Exp>;
  readonly _or?: InputMaybe<ReadonlyArray<InputMaybe<GuildStatus_Bool_Exp>>>;
  readonly status?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "GuildStatus" */
export enum GuildStatus_Constraint {
  /** unique or primary key constraint */
  GuildStatusPkey = 'GuildStatus_pkey'
}

export enum GuildStatus_Enum {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  Pending = 'PENDING'
}

/** expression to compare columns of type GuildStatus_enum. All fields are combined with logical 'AND'. */
export type GuildStatus_Enum_Comparison_Exp = {
  readonly _eq?: InputMaybe<GuildStatus_Enum>;
  readonly _in?: InputMaybe<ReadonlyArray<GuildStatus_Enum>>;
  readonly _is_null?: InputMaybe<Scalars['Boolean']>;
  readonly _neq?: InputMaybe<GuildStatus_Enum>;
  readonly _nin?: InputMaybe<ReadonlyArray<GuildStatus_Enum>>;
};

/** input type for inserting data into table "GuildStatus" */
export type GuildStatus_Insert_Input = {
  readonly status?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type GuildStatus_Max_Fields = {
  readonly __typename?: 'GuildStatus_max_fields';
  readonly status?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "GuildStatus" */
export type GuildStatus_Max_Order_By = {
  readonly status?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type GuildStatus_Min_Fields = {
  readonly __typename?: 'GuildStatus_min_fields';
  readonly status?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "GuildStatus" */
export type GuildStatus_Min_Order_By = {
  readonly status?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "GuildStatus" */
export type GuildStatus_Mutation_Response = {
  readonly __typename?: 'GuildStatus_mutation_response';
  /** number of affected rows by the mutation */
  readonly affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  readonly returning: ReadonlyArray<GuildStatus>;
};

/** input type for inserting object relation for remote table "GuildStatus" */
export type GuildStatus_Obj_Rel_Insert_Input = {
  readonly data: GuildStatus_Insert_Input;
  readonly on_conflict?: InputMaybe<GuildStatus_On_Conflict>;
};

/** on conflict condition type for table "GuildStatus" */
export type GuildStatus_On_Conflict = {
  readonly constraint: GuildStatus_Constraint;
  readonly update_columns: ReadonlyArray<GuildStatus_Update_Column>;
  readonly where?: InputMaybe<GuildStatus_Bool_Exp>;
};

/** ordering options when selecting data from "GuildStatus" */
export type GuildStatus_Order_By = {
  readonly status?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "GuildStatus" */
export type GuildStatus_Pk_Columns_Input = {
  readonly status: Scalars['String'];
};

/** select columns of table "GuildStatus" */
export enum GuildStatus_Select_Column {
  /** column name */
  Status = 'status'
}

/** input type for updating data in table "GuildStatus" */
export type GuildStatus_Set_Input = {
  readonly status?: InputMaybe<Scalars['String']>;
};

/** update columns of table "GuildStatus" */
export enum GuildStatus_Update_Column {
  /** column name */
  Status = 'status'
}

/** columns and relationships of "GuildType" */
export type GuildType = {
  readonly __typename?: 'GuildType';
  /** An array relationship */
  readonly Guilds: ReadonlyArray<Guild>;
  /** An aggregated array relationship */
  readonly Guilds_aggregate: Guild_Aggregate;
  readonly name: Scalars['String'];
};


/** columns and relationships of "GuildType" */
export type GuildTypeGuildsArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Guild_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Guild_Order_By>>;
  where?: InputMaybe<Guild_Bool_Exp>;
};


/** columns and relationships of "GuildType" */
export type GuildTypeGuilds_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Guild_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Guild_Order_By>>;
  where?: InputMaybe<Guild_Bool_Exp>;
};

export enum GuildType_ActionEnum {
  Funding = 'FUNDING',
  Project = 'PROJECT',
  Research = 'RESEARCH',
  Service = 'SERVICE',
  Social = 'SOCIAL'
}

/** aggregated selection of "GuildType" */
export type GuildType_Aggregate = {
  readonly __typename?: 'GuildType_aggregate';
  readonly aggregate?: Maybe<GuildType_Aggregate_Fields>;
  readonly nodes: ReadonlyArray<GuildType>;
};

/** aggregate fields of "GuildType" */
export type GuildType_Aggregate_Fields = {
  readonly __typename?: 'GuildType_aggregate_fields';
  readonly count?: Maybe<Scalars['Int']>;
  readonly max?: Maybe<GuildType_Max_Fields>;
  readonly min?: Maybe<GuildType_Min_Fields>;
};


/** aggregate fields of "GuildType" */
export type GuildType_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<ReadonlyArray<GuildType_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "GuildType" */
export type GuildType_Aggregate_Order_By = {
  readonly count?: InputMaybe<Order_By>;
  readonly max?: InputMaybe<GuildType_Max_Order_By>;
  readonly min?: InputMaybe<GuildType_Min_Order_By>;
};

/** input type for inserting array relation for remote table "GuildType" */
export type GuildType_Arr_Rel_Insert_Input = {
  readonly data: ReadonlyArray<GuildType_Insert_Input>;
  readonly on_conflict?: InputMaybe<GuildType_On_Conflict>;
};

/** Boolean expression to filter rows from the table "GuildType". All fields are combined with a logical 'AND'. */
export type GuildType_Bool_Exp = {
  readonly Guilds?: InputMaybe<Guild_Bool_Exp>;
  readonly _and?: InputMaybe<ReadonlyArray<InputMaybe<GuildType_Bool_Exp>>>;
  readonly _not?: InputMaybe<GuildType_Bool_Exp>;
  readonly _or?: InputMaybe<ReadonlyArray<InputMaybe<GuildType_Bool_Exp>>>;
  readonly name?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "GuildType" */
export enum GuildType_Constraint {
  /** unique or primary key constraint */
  GuildTypePkey = 'GuildType_pkey'
}

export enum GuildType_Enum {
  Funding = 'FUNDING',
  Project = 'PROJECT',
  Research = 'RESEARCH',
  Service = 'SERVICE',
  Social = 'SOCIAL'
}

/** expression to compare columns of type GuildType_enum. All fields are combined with logical 'AND'. */
export type GuildType_Enum_Comparison_Exp = {
  readonly _eq?: InputMaybe<GuildType_Enum>;
  readonly _in?: InputMaybe<ReadonlyArray<GuildType_Enum>>;
  readonly _is_null?: InputMaybe<Scalars['Boolean']>;
  readonly _neq?: InputMaybe<GuildType_Enum>;
  readonly _nin?: InputMaybe<ReadonlyArray<GuildType_Enum>>;
};

/** input type for inserting data into table "GuildType" */
export type GuildType_Insert_Input = {
  readonly Guilds?: InputMaybe<Guild_Arr_Rel_Insert_Input>;
  readonly name?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type GuildType_Max_Fields = {
  readonly __typename?: 'GuildType_max_fields';
  readonly name?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "GuildType" */
export type GuildType_Max_Order_By = {
  readonly name?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type GuildType_Min_Fields = {
  readonly __typename?: 'GuildType_min_fields';
  readonly name?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "GuildType" */
export type GuildType_Min_Order_By = {
  readonly name?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "GuildType" */
export type GuildType_Mutation_Response = {
  readonly __typename?: 'GuildType_mutation_response';
  /** number of affected rows by the mutation */
  readonly affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  readonly returning: ReadonlyArray<GuildType>;
};

/** input type for inserting object relation for remote table "GuildType" */
export type GuildType_Obj_Rel_Insert_Input = {
  readonly data: GuildType_Insert_Input;
  readonly on_conflict?: InputMaybe<GuildType_On_Conflict>;
};

/** on conflict condition type for table "GuildType" */
export type GuildType_On_Conflict = {
  readonly constraint: GuildType_Constraint;
  readonly update_columns: ReadonlyArray<GuildType_Update_Column>;
  readonly where?: InputMaybe<GuildType_Bool_Exp>;
};

/** ordering options when selecting data from "GuildType" */
export type GuildType_Order_By = {
  readonly Guilds_aggregate?: InputMaybe<Guild_Aggregate_Order_By>;
  readonly name?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "GuildType" */
export type GuildType_Pk_Columns_Input = {
  readonly name: Scalars['String'];
};

/** select columns of table "GuildType" */
export enum GuildType_Select_Column {
  /** column name */
  Name = 'name'
}

/** input type for updating data in table "GuildType" */
export type GuildType_Set_Input = {
  readonly name?: InputMaybe<Scalars['String']>;
};

/** update columns of table "GuildType" */
export enum GuildType_Update_Column {
  /** column name */
  Name = 'name'
}

/** expression to compare columns of type Int. All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  readonly _eq?: InputMaybe<Scalars['Int']>;
  readonly _gt?: InputMaybe<Scalars['Int']>;
  readonly _gte?: InputMaybe<Scalars['Int']>;
  readonly _in?: InputMaybe<ReadonlyArray<Scalars['Int']>>;
  readonly _is_null?: InputMaybe<Scalars['Boolean']>;
  readonly _lt?: InputMaybe<Scalars['Int']>;
  readonly _lte?: InputMaybe<Scalars['Int']>;
  readonly _neq?: InputMaybe<Scalars['Int']>;
  readonly _nin?: InputMaybe<ReadonlyArray<Scalars['Int']>>;
};

export type Member = {
  readonly __typename?: 'Member';
  readonly createdAt: Scalars['String'];
  readonly delegateKey: Scalars['String'];
  readonly exists: Scalars['Boolean'];
  readonly id: Scalars['ID'];
  readonly kicked?: Maybe<Scalars['Boolean']>;
  readonly loot?: Maybe<Scalars['String']>;
  readonly memberAddress: Scalars['String'];
  readonly moloch: Moloch;
  readonly molochAddress: Scalars['String'];
  readonly shares: Scalars['String'];
};

export type Moloch = {
  readonly __typename?: 'Moloch';
  readonly avatarURL?: Maybe<Scalars['String']>;
  readonly chain: Scalars['String'];
  readonly id: Scalars['ID'];
  readonly summoner: Scalars['String'];
  readonly title?: Maybe<Scalars['String']>;
  readonly totalLoot: Scalars['String'];
  readonly totalShares: Scalars['String'];
  readonly version?: Maybe<Scalars['String']>;
};

export type PSeedInfo = {
  readonly __typename?: 'PSeedInfo';
  readonly priceUsd?: Maybe<Scalars['String']>;
};

/** columns and relationships of "PlayerRank" */
export type PlayerRank = {
  readonly __typename?: 'PlayerRank';
  readonly rank: Scalars['String'];
};

/** aggregated selection of "PlayerRank" */
export type PlayerRank_Aggregate = {
  readonly __typename?: 'PlayerRank_aggregate';
  readonly aggregate?: Maybe<PlayerRank_Aggregate_Fields>;
  readonly nodes: ReadonlyArray<PlayerRank>;
};

/** aggregate fields of "PlayerRank" */
export type PlayerRank_Aggregate_Fields = {
  readonly __typename?: 'PlayerRank_aggregate_fields';
  readonly count?: Maybe<Scalars['Int']>;
  readonly max?: Maybe<PlayerRank_Max_Fields>;
  readonly min?: Maybe<PlayerRank_Min_Fields>;
};


/** aggregate fields of "PlayerRank" */
export type PlayerRank_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<ReadonlyArray<PlayerRank_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "PlayerRank" */
export type PlayerRank_Aggregate_Order_By = {
  readonly count?: InputMaybe<Order_By>;
  readonly max?: InputMaybe<PlayerRank_Max_Order_By>;
  readonly min?: InputMaybe<PlayerRank_Min_Order_By>;
};

/** input type for inserting array relation for remote table "PlayerRank" */
export type PlayerRank_Arr_Rel_Insert_Input = {
  readonly data: ReadonlyArray<PlayerRank_Insert_Input>;
  readonly on_conflict?: InputMaybe<PlayerRank_On_Conflict>;
};

/** Boolean expression to filter rows from the table "PlayerRank". All fields are combined with a logical 'AND'. */
export type PlayerRank_Bool_Exp = {
  readonly _and?: InputMaybe<ReadonlyArray<InputMaybe<PlayerRank_Bool_Exp>>>;
  readonly _not?: InputMaybe<PlayerRank_Bool_Exp>;
  readonly _or?: InputMaybe<ReadonlyArray<InputMaybe<PlayerRank_Bool_Exp>>>;
  readonly rank?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "PlayerRank" */
export enum PlayerRank_Constraint {
  /** unique or primary key constraint */
  PlayerRankPkey = 'Player_Rank_pkey'
}

export enum PlayerRank_Enum {
  Bronze = 'BRONZE',
  Diamond = 'DIAMOND',
  Gold = 'GOLD',
  Platinum = 'PLATINUM',
  Silver = 'SILVER'
}

/** expression to compare columns of type PlayerRank_enum. All fields are combined with logical 'AND'. */
export type PlayerRank_Enum_Comparison_Exp = {
  readonly _eq?: InputMaybe<PlayerRank_Enum>;
  readonly _in?: InputMaybe<ReadonlyArray<PlayerRank_Enum>>;
  readonly _is_null?: InputMaybe<Scalars['Boolean']>;
  readonly _neq?: InputMaybe<PlayerRank_Enum>;
  readonly _nin?: InputMaybe<ReadonlyArray<PlayerRank_Enum>>;
};

/** input type for inserting data into table "PlayerRank" */
export type PlayerRank_Insert_Input = {
  readonly rank?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type PlayerRank_Max_Fields = {
  readonly __typename?: 'PlayerRank_max_fields';
  readonly rank?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "PlayerRank" */
export type PlayerRank_Max_Order_By = {
  readonly rank?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type PlayerRank_Min_Fields = {
  readonly __typename?: 'PlayerRank_min_fields';
  readonly rank?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "PlayerRank" */
export type PlayerRank_Min_Order_By = {
  readonly rank?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "PlayerRank" */
export type PlayerRank_Mutation_Response = {
  readonly __typename?: 'PlayerRank_mutation_response';
  /** number of affected rows by the mutation */
  readonly affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  readonly returning: ReadonlyArray<PlayerRank>;
};

/** input type for inserting object relation for remote table "PlayerRank" */
export type PlayerRank_Obj_Rel_Insert_Input = {
  readonly data: PlayerRank_Insert_Input;
  readonly on_conflict?: InputMaybe<PlayerRank_On_Conflict>;
};

/** on conflict condition type for table "PlayerRank" */
export type PlayerRank_On_Conflict = {
  readonly constraint: PlayerRank_Constraint;
  readonly update_columns: ReadonlyArray<PlayerRank_Update_Column>;
  readonly where?: InputMaybe<PlayerRank_Bool_Exp>;
};

/** ordering options when selecting data from "PlayerRank" */
export type PlayerRank_Order_By = {
  readonly rank?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "PlayerRank" */
export type PlayerRank_Pk_Columns_Input = {
  readonly rank: Scalars['String'];
};

/** select columns of table "PlayerRank" */
export enum PlayerRank_Select_Column {
  /** column name */
  Rank = 'rank'
}

/** input type for updating data in table "PlayerRank" */
export type PlayerRank_Set_Input = {
  readonly rank?: InputMaybe<Scalars['String']>;
};

/** update columns of table "PlayerRank" */
export enum PlayerRank_Update_Column {
  /** column name */
  Rank = 'rank'
}

/** columns and relationships of "PlayerRole" */
export type PlayerRole = {
  readonly __typename?: 'PlayerRole';
  readonly basic?: Maybe<Scalars['Boolean']>;
  readonly description?: Maybe<Scalars['String']>;
  readonly label: Scalars['String'];
  readonly role: Scalars['String'];
};

/** aggregated selection of "PlayerRole" */
export type PlayerRole_Aggregate = {
  readonly __typename?: 'PlayerRole_aggregate';
  readonly aggregate?: Maybe<PlayerRole_Aggregate_Fields>;
  readonly nodes: ReadonlyArray<PlayerRole>;
};

/** aggregate fields of "PlayerRole" */
export type PlayerRole_Aggregate_Fields = {
  readonly __typename?: 'PlayerRole_aggregate_fields';
  readonly count?: Maybe<Scalars['Int']>;
  readonly max?: Maybe<PlayerRole_Max_Fields>;
  readonly min?: Maybe<PlayerRole_Min_Fields>;
};


/** aggregate fields of "PlayerRole" */
export type PlayerRole_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<ReadonlyArray<PlayerRole_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "PlayerRole" */
export type PlayerRole_Aggregate_Order_By = {
  readonly count?: InputMaybe<Order_By>;
  readonly max?: InputMaybe<PlayerRole_Max_Order_By>;
  readonly min?: InputMaybe<PlayerRole_Min_Order_By>;
};

/** input type for inserting array relation for remote table "PlayerRole" */
export type PlayerRole_Arr_Rel_Insert_Input = {
  readonly data: ReadonlyArray<PlayerRole_Insert_Input>;
  readonly on_conflict?: InputMaybe<PlayerRole_On_Conflict>;
};

/** Boolean expression to filter rows from the table "PlayerRole". All fields are combined with a logical 'AND'. */
export type PlayerRole_Bool_Exp = {
  readonly _and?: InputMaybe<ReadonlyArray<InputMaybe<PlayerRole_Bool_Exp>>>;
  readonly _not?: InputMaybe<PlayerRole_Bool_Exp>;
  readonly _or?: InputMaybe<ReadonlyArray<InputMaybe<PlayerRole_Bool_Exp>>>;
  readonly basic?: InputMaybe<Boolean_Comparison_Exp>;
  readonly description?: InputMaybe<String_Comparison_Exp>;
  readonly label?: InputMaybe<String_Comparison_Exp>;
  readonly role?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "PlayerRole" */
export enum PlayerRole_Constraint {
  /** unique or primary key constraint */
  PlayerRolePkey = 'PlayerRole_pkey'
}

/** input type for inserting data into table "PlayerRole" */
export type PlayerRole_Insert_Input = {
  readonly basic?: InputMaybe<Scalars['Boolean']>;
  readonly description?: InputMaybe<Scalars['String']>;
  readonly label?: InputMaybe<Scalars['String']>;
  readonly role?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type PlayerRole_Max_Fields = {
  readonly __typename?: 'PlayerRole_max_fields';
  readonly description?: Maybe<Scalars['String']>;
  readonly label?: Maybe<Scalars['String']>;
  readonly role?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "PlayerRole" */
export type PlayerRole_Max_Order_By = {
  readonly description?: InputMaybe<Order_By>;
  readonly label?: InputMaybe<Order_By>;
  readonly role?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type PlayerRole_Min_Fields = {
  readonly __typename?: 'PlayerRole_min_fields';
  readonly description?: Maybe<Scalars['String']>;
  readonly label?: Maybe<Scalars['String']>;
  readonly role?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "PlayerRole" */
export type PlayerRole_Min_Order_By = {
  readonly description?: InputMaybe<Order_By>;
  readonly label?: InputMaybe<Order_By>;
  readonly role?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "PlayerRole" */
export type PlayerRole_Mutation_Response = {
  readonly __typename?: 'PlayerRole_mutation_response';
  /** number of affected rows by the mutation */
  readonly affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  readonly returning: ReadonlyArray<PlayerRole>;
};

/** input type for inserting object relation for remote table "PlayerRole" */
export type PlayerRole_Obj_Rel_Insert_Input = {
  readonly data: PlayerRole_Insert_Input;
  readonly on_conflict?: InputMaybe<PlayerRole_On_Conflict>;
};

/** on conflict condition type for table "PlayerRole" */
export type PlayerRole_On_Conflict = {
  readonly constraint: PlayerRole_Constraint;
  readonly update_columns: ReadonlyArray<PlayerRole_Update_Column>;
  readonly where?: InputMaybe<PlayerRole_Bool_Exp>;
};

/** ordering options when selecting data from "PlayerRole" */
export type PlayerRole_Order_By = {
  readonly basic?: InputMaybe<Order_By>;
  readonly description?: InputMaybe<Order_By>;
  readonly label?: InputMaybe<Order_By>;
  readonly role?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "PlayerRole" */
export type PlayerRole_Pk_Columns_Input = {
  readonly role: Scalars['String'];
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
  Role = 'role'
}

/** input type for updating data in table "PlayerRole" */
export type PlayerRole_Set_Input = {
  readonly basic?: InputMaybe<Scalars['Boolean']>;
  readonly description?: InputMaybe<Scalars['String']>;
  readonly label?: InputMaybe<Scalars['String']>;
  readonly role?: InputMaybe<Scalars['String']>;
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
  Role = 'role'
}

export type Query = {
  readonly __typename?: 'Query';
  readonly getBrightIdStatus?: Maybe<BrightIdStatus>;
  readonly getDaoHausMemberships: ReadonlyArray<Member>;
  readonly getDiscordServerMemberRoles: ReadonlyArray<DiscordRole>;
  readonly getGuildDiscordAnnouncements?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly getGuildDiscordRoles: ReadonlyArray<DiscordRole>;
  readonly getPSeedInfo?: Maybe<PSeedInfo>;
  readonly getTokenBalances?: Maybe<TokenBalances>;
  readonly getTopPSeedHolders?: Maybe<ReadonlyArray<TokenBalances>>;
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
  readonly __typename?: 'QuestCompletionStatus';
  /** An array relationship */
  readonly quest_completions: ReadonlyArray<Quest_Completion>;
  /** An aggregated array relationship */
  readonly quest_completions_aggregate: Quest_Completion_Aggregate;
  readonly status: Scalars['String'];
};


/** columns and relationships of "QuestCompletionStatus" */
export type QuestCompletionStatusQuest_CompletionsArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Quest_Completion_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Quest_Completion_Order_By>>;
  where?: InputMaybe<Quest_Completion_Bool_Exp>;
};


/** columns and relationships of "QuestCompletionStatus" */
export type QuestCompletionStatusQuest_Completions_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Quest_Completion_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Quest_Completion_Order_By>>;
  where?: InputMaybe<Quest_Completion_Bool_Exp>;
};

export enum QuestCompletionStatus_ActionEnum {
  Accepted = 'ACCEPTED',
  Rejected = 'REJECTED'
}

/** aggregated selection of "QuestCompletionStatus" */
export type QuestCompletionStatus_Aggregate = {
  readonly __typename?: 'QuestCompletionStatus_aggregate';
  readonly aggregate?: Maybe<QuestCompletionStatus_Aggregate_Fields>;
  readonly nodes: ReadonlyArray<QuestCompletionStatus>;
};

/** aggregate fields of "QuestCompletionStatus" */
export type QuestCompletionStatus_Aggregate_Fields = {
  readonly __typename?: 'QuestCompletionStatus_aggregate_fields';
  readonly count?: Maybe<Scalars['Int']>;
  readonly max?: Maybe<QuestCompletionStatus_Max_Fields>;
  readonly min?: Maybe<QuestCompletionStatus_Min_Fields>;
};


/** aggregate fields of "QuestCompletionStatus" */
export type QuestCompletionStatus_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<ReadonlyArray<QuestCompletionStatus_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "QuestCompletionStatus" */
export type QuestCompletionStatus_Aggregate_Order_By = {
  readonly count?: InputMaybe<Order_By>;
  readonly max?: InputMaybe<QuestCompletionStatus_Max_Order_By>;
  readonly min?: InputMaybe<QuestCompletionStatus_Min_Order_By>;
};

/** input type for inserting array relation for remote table "QuestCompletionStatus" */
export type QuestCompletionStatus_Arr_Rel_Insert_Input = {
  readonly data: ReadonlyArray<QuestCompletionStatus_Insert_Input>;
  readonly on_conflict?: InputMaybe<QuestCompletionStatus_On_Conflict>;
};

/** Boolean expression to filter rows from the table "QuestCompletionStatus". All fields are combined with a logical 'AND'. */
export type QuestCompletionStatus_Bool_Exp = {
  readonly _and?: InputMaybe<ReadonlyArray<InputMaybe<QuestCompletionStatus_Bool_Exp>>>;
  readonly _not?: InputMaybe<QuestCompletionStatus_Bool_Exp>;
  readonly _or?: InputMaybe<ReadonlyArray<InputMaybe<QuestCompletionStatus_Bool_Exp>>>;
  readonly quest_completions?: InputMaybe<Quest_Completion_Bool_Exp>;
  readonly status?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "QuestCompletionStatus" */
export enum QuestCompletionStatus_Constraint {
  /** unique or primary key constraint */
  QuestCompletionStatusPkey = 'QuestCompletionStatus_pkey'
}

export enum QuestCompletionStatus_Enum {
  Accepted = 'ACCEPTED',
  Pending = 'PENDING',
  Rejected = 'REJECTED'
}

/** expression to compare columns of type QuestCompletionStatus_enum. All fields are combined with logical 'AND'. */
export type QuestCompletionStatus_Enum_Comparison_Exp = {
  readonly _eq?: InputMaybe<QuestCompletionStatus_Enum>;
  readonly _in?: InputMaybe<ReadonlyArray<QuestCompletionStatus_Enum>>;
  readonly _is_null?: InputMaybe<Scalars['Boolean']>;
  readonly _neq?: InputMaybe<QuestCompletionStatus_Enum>;
  readonly _nin?: InputMaybe<ReadonlyArray<QuestCompletionStatus_Enum>>;
};

/** input type for inserting data into table "QuestCompletionStatus" */
export type QuestCompletionStatus_Insert_Input = {
  readonly quest_completions?: InputMaybe<Quest_Completion_Arr_Rel_Insert_Input>;
  readonly status?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type QuestCompletionStatus_Max_Fields = {
  readonly __typename?: 'QuestCompletionStatus_max_fields';
  readonly status?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "QuestCompletionStatus" */
export type QuestCompletionStatus_Max_Order_By = {
  readonly status?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type QuestCompletionStatus_Min_Fields = {
  readonly __typename?: 'QuestCompletionStatus_min_fields';
  readonly status?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "QuestCompletionStatus" */
export type QuestCompletionStatus_Min_Order_By = {
  readonly status?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "QuestCompletionStatus" */
export type QuestCompletionStatus_Mutation_Response = {
  readonly __typename?: 'QuestCompletionStatus_mutation_response';
  /** number of affected rows by the mutation */
  readonly affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  readonly returning: ReadonlyArray<QuestCompletionStatus>;
};

/** input type for inserting object relation for remote table "QuestCompletionStatus" */
export type QuestCompletionStatus_Obj_Rel_Insert_Input = {
  readonly data: QuestCompletionStatus_Insert_Input;
  readonly on_conflict?: InputMaybe<QuestCompletionStatus_On_Conflict>;
};

/** on conflict condition type for table "QuestCompletionStatus" */
export type QuestCompletionStatus_On_Conflict = {
  readonly constraint: QuestCompletionStatus_Constraint;
  readonly update_columns: ReadonlyArray<QuestCompletionStatus_Update_Column>;
  readonly where?: InputMaybe<QuestCompletionStatus_Bool_Exp>;
};

/** ordering options when selecting data from "QuestCompletionStatus" */
export type QuestCompletionStatus_Order_By = {
  readonly quest_completions_aggregate?: InputMaybe<Quest_Completion_Aggregate_Order_By>;
  readonly status?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "QuestCompletionStatus" */
export type QuestCompletionStatus_Pk_Columns_Input = {
  readonly status: Scalars['String'];
};

/** select columns of table "QuestCompletionStatus" */
export enum QuestCompletionStatus_Select_Column {
  /** column name */
  Status = 'status'
}

/** input type for updating data in table "QuestCompletionStatus" */
export type QuestCompletionStatus_Set_Input = {
  readonly status?: InputMaybe<Scalars['String']>;
};

/** update columns of table "QuestCompletionStatus" */
export enum QuestCompletionStatus_Update_Column {
  /** column name */
  Status = 'status'
}

/** columns and relationships of "QuestRepetition" */
export type QuestRepetition = {
  readonly __typename?: 'QuestRepetition';
  /** An array relationship */
  readonly quests: ReadonlyArray<Quest>;
  /** An aggregated array relationship */
  readonly quests_aggregate: Quest_Aggregate;
  readonly repetition: Scalars['String'];
};


/** columns and relationships of "QuestRepetition" */
export type QuestRepetitionQuestsArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Quest_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Quest_Order_By>>;
  where?: InputMaybe<Quest_Bool_Exp>;
};


/** columns and relationships of "QuestRepetition" */
export type QuestRepetitionQuests_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Quest_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Quest_Order_By>>;
  where?: InputMaybe<Quest_Bool_Exp>;
};

export enum QuestRepetition_ActionEnum {
  Personal = 'PERSONAL',
  Recurring = 'RECURRING',
  Unique = 'UNIQUE'
}

/** aggregated selection of "QuestRepetition" */
export type QuestRepetition_Aggregate = {
  readonly __typename?: 'QuestRepetition_aggregate';
  readonly aggregate?: Maybe<QuestRepetition_Aggregate_Fields>;
  readonly nodes: ReadonlyArray<QuestRepetition>;
};

/** aggregate fields of "QuestRepetition" */
export type QuestRepetition_Aggregate_Fields = {
  readonly __typename?: 'QuestRepetition_aggregate_fields';
  readonly count?: Maybe<Scalars['Int']>;
  readonly max?: Maybe<QuestRepetition_Max_Fields>;
  readonly min?: Maybe<QuestRepetition_Min_Fields>;
};


/** aggregate fields of "QuestRepetition" */
export type QuestRepetition_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<ReadonlyArray<QuestRepetition_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "QuestRepetition" */
export type QuestRepetition_Aggregate_Order_By = {
  readonly count?: InputMaybe<Order_By>;
  readonly max?: InputMaybe<QuestRepetition_Max_Order_By>;
  readonly min?: InputMaybe<QuestRepetition_Min_Order_By>;
};

/** input type for inserting array relation for remote table "QuestRepetition" */
export type QuestRepetition_Arr_Rel_Insert_Input = {
  readonly data: ReadonlyArray<QuestRepetition_Insert_Input>;
  readonly on_conflict?: InputMaybe<QuestRepetition_On_Conflict>;
};

/** Boolean expression to filter rows from the table "QuestRepetition". All fields are combined with a logical 'AND'. */
export type QuestRepetition_Bool_Exp = {
  readonly _and?: InputMaybe<ReadonlyArray<InputMaybe<QuestRepetition_Bool_Exp>>>;
  readonly _not?: InputMaybe<QuestRepetition_Bool_Exp>;
  readonly _or?: InputMaybe<ReadonlyArray<InputMaybe<QuestRepetition_Bool_Exp>>>;
  readonly quests?: InputMaybe<Quest_Bool_Exp>;
  readonly repetition?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "QuestRepetition" */
export enum QuestRepetition_Constraint {
  /** unique or primary key constraint */
  QuestRepetitionPkey = 'QuestRepetition_pkey'
}

export enum QuestRepetition_Enum {
  Personal = 'PERSONAL',
  Recurring = 'RECURRING',
  Unique = 'UNIQUE'
}

/** expression to compare columns of type QuestRepetition_enum. All fields are combined with logical 'AND'. */
export type QuestRepetition_Enum_Comparison_Exp = {
  readonly _eq?: InputMaybe<QuestRepetition_Enum>;
  readonly _in?: InputMaybe<ReadonlyArray<QuestRepetition_Enum>>;
  readonly _is_null?: InputMaybe<Scalars['Boolean']>;
  readonly _neq?: InputMaybe<QuestRepetition_Enum>;
  readonly _nin?: InputMaybe<ReadonlyArray<QuestRepetition_Enum>>;
};

/** input type for inserting data into table "QuestRepetition" */
export type QuestRepetition_Insert_Input = {
  readonly quests?: InputMaybe<Quest_Arr_Rel_Insert_Input>;
  readonly repetition?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type QuestRepetition_Max_Fields = {
  readonly __typename?: 'QuestRepetition_max_fields';
  readonly repetition?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "QuestRepetition" */
export type QuestRepetition_Max_Order_By = {
  readonly repetition?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type QuestRepetition_Min_Fields = {
  readonly __typename?: 'QuestRepetition_min_fields';
  readonly repetition?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "QuestRepetition" */
export type QuestRepetition_Min_Order_By = {
  readonly repetition?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "QuestRepetition" */
export type QuestRepetition_Mutation_Response = {
  readonly __typename?: 'QuestRepetition_mutation_response';
  /** number of affected rows by the mutation */
  readonly affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  readonly returning: ReadonlyArray<QuestRepetition>;
};

/** input type for inserting object relation for remote table "QuestRepetition" */
export type QuestRepetition_Obj_Rel_Insert_Input = {
  readonly data: QuestRepetition_Insert_Input;
  readonly on_conflict?: InputMaybe<QuestRepetition_On_Conflict>;
};

/** on conflict condition type for table "QuestRepetition" */
export type QuestRepetition_On_Conflict = {
  readonly constraint: QuestRepetition_Constraint;
  readonly update_columns: ReadonlyArray<QuestRepetition_Update_Column>;
  readonly where?: InputMaybe<QuestRepetition_Bool_Exp>;
};

/** ordering options when selecting data from "QuestRepetition" */
export type QuestRepetition_Order_By = {
  readonly quests_aggregate?: InputMaybe<Quest_Aggregate_Order_By>;
  readonly repetition?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "QuestRepetition" */
export type QuestRepetition_Pk_Columns_Input = {
  readonly repetition: Scalars['String'];
};

/** select columns of table "QuestRepetition" */
export enum QuestRepetition_Select_Column {
  /** column name */
  Repetition = 'repetition'
}

/** input type for updating data in table "QuestRepetition" */
export type QuestRepetition_Set_Input = {
  readonly repetition?: InputMaybe<Scalars['String']>;
};

/** update columns of table "QuestRepetition" */
export enum QuestRepetition_Update_Column {
  /** column name */
  Repetition = 'repetition'
}

/** columns and relationships of "QuestStatus" */
export type QuestStatus = {
  readonly __typename?: 'QuestStatus';
  /** An array relationship */
  readonly quests: ReadonlyArray<Quest>;
  /** An aggregated array relationship */
  readonly quests_aggregate: Quest_Aggregate;
  readonly status: Scalars['String'];
};


/** columns and relationships of "QuestStatus" */
export type QuestStatusQuestsArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Quest_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Quest_Order_By>>;
  where?: InputMaybe<Quest_Bool_Exp>;
};


/** columns and relationships of "QuestStatus" */
export type QuestStatusQuests_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Quest_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Quest_Order_By>>;
  where?: InputMaybe<Quest_Bool_Exp>;
};

/** aggregated selection of "QuestStatus" */
export type QuestStatus_Aggregate = {
  readonly __typename?: 'QuestStatus_aggregate';
  readonly aggregate?: Maybe<QuestStatus_Aggregate_Fields>;
  readonly nodes: ReadonlyArray<QuestStatus>;
};

/** aggregate fields of "QuestStatus" */
export type QuestStatus_Aggregate_Fields = {
  readonly __typename?: 'QuestStatus_aggregate_fields';
  readonly count?: Maybe<Scalars['Int']>;
  readonly max?: Maybe<QuestStatus_Max_Fields>;
  readonly min?: Maybe<QuestStatus_Min_Fields>;
};


/** aggregate fields of "QuestStatus" */
export type QuestStatus_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<ReadonlyArray<QuestStatus_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "QuestStatus" */
export type QuestStatus_Aggregate_Order_By = {
  readonly count?: InputMaybe<Order_By>;
  readonly max?: InputMaybe<QuestStatus_Max_Order_By>;
  readonly min?: InputMaybe<QuestStatus_Min_Order_By>;
};

/** input type for inserting array relation for remote table "QuestStatus" */
export type QuestStatus_Arr_Rel_Insert_Input = {
  readonly data: ReadonlyArray<QuestStatus_Insert_Input>;
  readonly on_conflict?: InputMaybe<QuestStatus_On_Conflict>;
};

/** Boolean expression to filter rows from the table "QuestStatus". All fields are combined with a logical 'AND'. */
export type QuestStatus_Bool_Exp = {
  readonly _and?: InputMaybe<ReadonlyArray<InputMaybe<QuestStatus_Bool_Exp>>>;
  readonly _not?: InputMaybe<QuestStatus_Bool_Exp>;
  readonly _or?: InputMaybe<ReadonlyArray<InputMaybe<QuestStatus_Bool_Exp>>>;
  readonly quests?: InputMaybe<Quest_Bool_Exp>;
  readonly status?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "QuestStatus" */
export enum QuestStatus_Constraint {
  /** unique or primary key constraint */
  QuestStatusPkey = 'QuestStatus_pkey'
}

export enum QuestStatus_Enum {
  Closed = 'CLOSED',
  Open = 'OPEN'
}

/** expression to compare columns of type QuestStatus_enum. All fields are combined with logical 'AND'. */
export type QuestStatus_Enum_Comparison_Exp = {
  readonly _eq?: InputMaybe<QuestStatus_Enum>;
  readonly _in?: InputMaybe<ReadonlyArray<QuestStatus_Enum>>;
  readonly _is_null?: InputMaybe<Scalars['Boolean']>;
  readonly _neq?: InputMaybe<QuestStatus_Enum>;
  readonly _nin?: InputMaybe<ReadonlyArray<QuestStatus_Enum>>;
};

/** input type for inserting data into table "QuestStatus" */
export type QuestStatus_Insert_Input = {
  readonly quests?: InputMaybe<Quest_Arr_Rel_Insert_Input>;
  readonly status?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type QuestStatus_Max_Fields = {
  readonly __typename?: 'QuestStatus_max_fields';
  readonly status?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "QuestStatus" */
export type QuestStatus_Max_Order_By = {
  readonly status?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type QuestStatus_Min_Fields = {
  readonly __typename?: 'QuestStatus_min_fields';
  readonly status?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "QuestStatus" */
export type QuestStatus_Min_Order_By = {
  readonly status?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "QuestStatus" */
export type QuestStatus_Mutation_Response = {
  readonly __typename?: 'QuestStatus_mutation_response';
  /** number of affected rows by the mutation */
  readonly affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  readonly returning: ReadonlyArray<QuestStatus>;
};

/** input type for inserting object relation for remote table "QuestStatus" */
export type QuestStatus_Obj_Rel_Insert_Input = {
  readonly data: QuestStatus_Insert_Input;
  readonly on_conflict?: InputMaybe<QuestStatus_On_Conflict>;
};

/** on conflict condition type for table "QuestStatus" */
export type QuestStatus_On_Conflict = {
  readonly constraint: QuestStatus_Constraint;
  readonly update_columns: ReadonlyArray<QuestStatus_Update_Column>;
  readonly where?: InputMaybe<QuestStatus_Bool_Exp>;
};

/** ordering options when selecting data from "QuestStatus" */
export type QuestStatus_Order_By = {
  readonly quests_aggregate?: InputMaybe<Quest_Aggregate_Order_By>;
  readonly status?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "QuestStatus" */
export type QuestStatus_Pk_Columns_Input = {
  readonly status: Scalars['String'];
};

/** select columns of table "QuestStatus" */
export enum QuestStatus_Select_Column {
  /** column name */
  Status = 'status'
}

/** input type for updating data in table "QuestStatus" */
export type QuestStatus_Set_Input = {
  readonly status?: InputMaybe<Scalars['String']>;
};

/** update columns of table "QuestStatus" */
export enum QuestStatus_Update_Column {
  /** column name */
  Status = 'status'
}

export type SaveGuildLayoutResponse = {
  readonly __typename?: 'SaveGuildLayoutResponse';
  readonly error?: Maybe<Scalars['String']>;
  readonly success?: Maybe<Scalars['Boolean']>;
};

export type SaveGuildResponse = {
  readonly __typename?: 'SaveGuildResponse';
  readonly error?: Maybe<Scalars['String']>;
  readonly success?: Maybe<Scalars['Boolean']>;
};

/** columns and relationships of "SkillCategory" */
export type SkillCategory = {
  readonly __typename?: 'SkillCategory';
  readonly name: Scalars['String'];
};

/** aggregated selection of "SkillCategory" */
export type SkillCategory_Aggregate = {
  readonly __typename?: 'SkillCategory_aggregate';
  readonly aggregate?: Maybe<SkillCategory_Aggregate_Fields>;
  readonly nodes: ReadonlyArray<SkillCategory>;
};

/** aggregate fields of "SkillCategory" */
export type SkillCategory_Aggregate_Fields = {
  readonly __typename?: 'SkillCategory_aggregate_fields';
  readonly count?: Maybe<Scalars['Int']>;
  readonly max?: Maybe<SkillCategory_Max_Fields>;
  readonly min?: Maybe<SkillCategory_Min_Fields>;
};


/** aggregate fields of "SkillCategory" */
export type SkillCategory_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<ReadonlyArray<SkillCategory_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "SkillCategory" */
export type SkillCategory_Aggregate_Order_By = {
  readonly count?: InputMaybe<Order_By>;
  readonly max?: InputMaybe<SkillCategory_Max_Order_By>;
  readonly min?: InputMaybe<SkillCategory_Min_Order_By>;
};

/** input type for inserting array relation for remote table "SkillCategory" */
export type SkillCategory_Arr_Rel_Insert_Input = {
  readonly data: ReadonlyArray<SkillCategory_Insert_Input>;
  readonly on_conflict?: InputMaybe<SkillCategory_On_Conflict>;
};

/** Boolean expression to filter rows from the table "SkillCategory". All fields are combined with a logical 'AND'. */
export type SkillCategory_Bool_Exp = {
  readonly _and?: InputMaybe<ReadonlyArray<InputMaybe<SkillCategory_Bool_Exp>>>;
  readonly _not?: InputMaybe<SkillCategory_Bool_Exp>;
  readonly _or?: InputMaybe<ReadonlyArray<InputMaybe<SkillCategory_Bool_Exp>>>;
  readonly name?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "SkillCategory" */
export enum SkillCategory_Constraint {
  /** unique or primary key constraint */
  SkillCategoryPkey = 'SkillCategory_pkey'
}

export enum SkillCategory_Enum {
  Community = 'COMMUNITY',
  Design = 'DESIGN',
  Dev = 'DEV',
  Engineering = 'ENGINEERING',
  Strategy = 'STRATEGY',
  Technologies = 'TECHNOLOGIES'
}

/** expression to compare columns of type SkillCategory_enum. All fields are combined with logical 'AND'. */
export type SkillCategory_Enum_Comparison_Exp = {
  readonly _eq?: InputMaybe<SkillCategory_Enum>;
  readonly _in?: InputMaybe<ReadonlyArray<SkillCategory_Enum>>;
  readonly _is_null?: InputMaybe<Scalars['Boolean']>;
  readonly _neq?: InputMaybe<SkillCategory_Enum>;
  readonly _nin?: InputMaybe<ReadonlyArray<SkillCategory_Enum>>;
};

/** input type for inserting data into table "SkillCategory" */
export type SkillCategory_Insert_Input = {
  readonly name?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type SkillCategory_Max_Fields = {
  readonly __typename?: 'SkillCategory_max_fields';
  readonly name?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "SkillCategory" */
export type SkillCategory_Max_Order_By = {
  readonly name?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type SkillCategory_Min_Fields = {
  readonly __typename?: 'SkillCategory_min_fields';
  readonly name?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "SkillCategory" */
export type SkillCategory_Min_Order_By = {
  readonly name?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "SkillCategory" */
export type SkillCategory_Mutation_Response = {
  readonly __typename?: 'SkillCategory_mutation_response';
  /** number of affected rows by the mutation */
  readonly affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  readonly returning: ReadonlyArray<SkillCategory>;
};

/** input type for inserting object relation for remote table "SkillCategory" */
export type SkillCategory_Obj_Rel_Insert_Input = {
  readonly data: SkillCategory_Insert_Input;
  readonly on_conflict?: InputMaybe<SkillCategory_On_Conflict>;
};

/** on conflict condition type for table "SkillCategory" */
export type SkillCategory_On_Conflict = {
  readonly constraint: SkillCategory_Constraint;
  readonly update_columns: ReadonlyArray<SkillCategory_Update_Column>;
  readonly where?: InputMaybe<SkillCategory_Bool_Exp>;
};

/** ordering options when selecting data from "SkillCategory" */
export type SkillCategory_Order_By = {
  readonly name?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "SkillCategory" */
export type SkillCategory_Pk_Columns_Input = {
  readonly name: Scalars['String'];
};

/** select columns of table "SkillCategory" */
export enum SkillCategory_Select_Column {
  /** column name */
  Name = 'name'
}

/** input type for updating data in table "SkillCategory" */
export type SkillCategory_Set_Input = {
  readonly name?: InputMaybe<Scalars['String']>;
};

/** update columns of table "SkillCategory" */
export enum SkillCategory_Update_Column {
  /** column name */
  Name = 'name'
}

export type SourceCredSyncOutput = {
  readonly __typename?: 'SourceCredSyncOutput';
  readonly numInserted: Scalars['Int'];
  readonly numSkipped: Scalars['Int'];
  readonly numUnclaimed: Scalars['Int'];
  readonly numUpdated: Scalars['Int'];
};

/** expression to compare columns of type String. All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  readonly _eq?: InputMaybe<Scalars['String']>;
  readonly _gt?: InputMaybe<Scalars['String']>;
  readonly _gte?: InputMaybe<Scalars['String']>;
  readonly _ilike?: InputMaybe<Scalars['String']>;
  readonly _in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly _is_null?: InputMaybe<Scalars['Boolean']>;
  readonly _like?: InputMaybe<Scalars['String']>;
  readonly _lt?: InputMaybe<Scalars['String']>;
  readonly _lte?: InputMaybe<Scalars['String']>;
  readonly _neq?: InputMaybe<Scalars['String']>;
  readonly _nilike?: InputMaybe<Scalars['String']>;
  readonly _nin?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly _nlike?: InputMaybe<Scalars['String']>;
  readonly _nsimilar?: InputMaybe<Scalars['String']>;
  readonly _similar?: InputMaybe<Scalars['String']>;
};

export type TokenBalances = {
  readonly __typename?: 'TokenBalances';
  readonly id: Scalars['ID'];
  readonly pSeedBalance: Scalars['String'];
  readonly seedBalance: Scalars['String'];
};

export type UpdateIdxProfileResponse = {
  readonly __typename?: 'UpdateIDXProfileResponse';
  readonly accountLinks?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly ceramic: Scalars['String'];
  readonly did?: Maybe<Scalars['String']>;
  readonly ethereumAddress?: Maybe<Scalars['String']>;
  readonly fields?: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly success: Scalars['Boolean'];
};

export type UpdateQuestCompletionInput = {
  readonly questCompletionId: Scalars['String'];
  readonly status: QuestCompletionStatus_ActionEnum;
};

export type UpdateQuestCompletionOutput = {
  readonly __typename?: 'UpdateQuestCompletionOutput';
  readonly error?: Maybe<Scalars['String']>;
  readonly quest_completion?: Maybe<Quest_Completion>;
  readonly quest_completion_id?: Maybe<Scalars['uuid']>;
  readonly success: Scalars['Boolean'];
};

/** columns and relationships of "balance" */
export type Balance = {
  readonly __typename?: 'balance';
  readonly amount: Scalars['float8'];
  readonly blockHeight: Scalars['Int'];
  readonly id: Scalars['uuid'];
  readonly playerAddress: Scalars['String'];
  readonly tokenAddress: Scalars['String'];
};

/** aggregated selection of "balance" */
export type Balance_Aggregate = {
  readonly __typename?: 'balance_aggregate';
  readonly aggregate?: Maybe<Balance_Aggregate_Fields>;
  readonly nodes: ReadonlyArray<Balance>;
};

/** aggregate fields of "balance" */
export type Balance_Aggregate_Fields = {
  readonly __typename?: 'balance_aggregate_fields';
  readonly avg?: Maybe<Balance_Avg_Fields>;
  readonly count?: Maybe<Scalars['Int']>;
  readonly max?: Maybe<Balance_Max_Fields>;
  readonly min?: Maybe<Balance_Min_Fields>;
  readonly stddev?: Maybe<Balance_Stddev_Fields>;
  readonly stddev_pop?: Maybe<Balance_Stddev_Pop_Fields>;
  readonly stddev_samp?: Maybe<Balance_Stddev_Samp_Fields>;
  readonly sum?: Maybe<Balance_Sum_Fields>;
  readonly var_pop?: Maybe<Balance_Var_Pop_Fields>;
  readonly var_samp?: Maybe<Balance_Var_Samp_Fields>;
  readonly variance?: Maybe<Balance_Variance_Fields>;
};


/** aggregate fields of "balance" */
export type Balance_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<ReadonlyArray<Balance_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "balance" */
export type Balance_Aggregate_Order_By = {
  readonly avg?: InputMaybe<Balance_Avg_Order_By>;
  readonly count?: InputMaybe<Order_By>;
  readonly max?: InputMaybe<Balance_Max_Order_By>;
  readonly min?: InputMaybe<Balance_Min_Order_By>;
  readonly stddev?: InputMaybe<Balance_Stddev_Order_By>;
  readonly stddev_pop?: InputMaybe<Balance_Stddev_Pop_Order_By>;
  readonly stddev_samp?: InputMaybe<Balance_Stddev_Samp_Order_By>;
  readonly sum?: InputMaybe<Balance_Sum_Order_By>;
  readonly var_pop?: InputMaybe<Balance_Var_Pop_Order_By>;
  readonly var_samp?: InputMaybe<Balance_Var_Samp_Order_By>;
  readonly variance?: InputMaybe<Balance_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "balance" */
export type Balance_Arr_Rel_Insert_Input = {
  readonly data: ReadonlyArray<Balance_Insert_Input>;
  readonly on_conflict?: InputMaybe<Balance_On_Conflict>;
};

/** aggregate avg on columns */
export type Balance_Avg_Fields = {
  readonly __typename?: 'balance_avg_fields';
  readonly amount?: Maybe<Scalars['Float']>;
  readonly blockHeight?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "balance" */
export type Balance_Avg_Order_By = {
  readonly amount?: InputMaybe<Order_By>;
  readonly blockHeight?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "balance". All fields are combined with a logical 'AND'. */
export type Balance_Bool_Exp = {
  readonly _and?: InputMaybe<ReadonlyArray<InputMaybe<Balance_Bool_Exp>>>;
  readonly _not?: InputMaybe<Balance_Bool_Exp>;
  readonly _or?: InputMaybe<ReadonlyArray<InputMaybe<Balance_Bool_Exp>>>;
  readonly amount?: InputMaybe<Float8_Comparison_Exp>;
  readonly blockHeight?: InputMaybe<Int_Comparison_Exp>;
  readonly id?: InputMaybe<Uuid_Comparison_Exp>;
  readonly playerAddress?: InputMaybe<String_Comparison_Exp>;
  readonly tokenAddress?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "balance" */
export enum Balance_Constraint {
  /** unique or primary key constraint */
  BalancePkey = 'balance_pkey',
  /** unique or primary key constraint */
  BalanceTokenAddressPlayerAddressBlockHeightKey = 'balance_token_address_player_address_block_height_key'
}

/** input type for incrementing integer column in table "balance" */
export type Balance_Inc_Input = {
  readonly amount?: InputMaybe<Scalars['float8']>;
  readonly blockHeight?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "balance" */
export type Balance_Insert_Input = {
  readonly amount?: InputMaybe<Scalars['float8']>;
  readonly blockHeight?: InputMaybe<Scalars['Int']>;
  readonly id?: InputMaybe<Scalars['uuid']>;
  readonly playerAddress?: InputMaybe<Scalars['String']>;
  readonly tokenAddress?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Balance_Max_Fields = {
  readonly __typename?: 'balance_max_fields';
  readonly amount?: Maybe<Scalars['float8']>;
  readonly blockHeight?: Maybe<Scalars['Int']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly playerAddress?: Maybe<Scalars['String']>;
  readonly tokenAddress?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "balance" */
export type Balance_Max_Order_By = {
  readonly amount?: InputMaybe<Order_By>;
  readonly blockHeight?: InputMaybe<Order_By>;
  readonly id?: InputMaybe<Order_By>;
  readonly playerAddress?: InputMaybe<Order_By>;
  readonly tokenAddress?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Balance_Min_Fields = {
  readonly __typename?: 'balance_min_fields';
  readonly amount?: Maybe<Scalars['float8']>;
  readonly blockHeight?: Maybe<Scalars['Int']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly playerAddress?: Maybe<Scalars['String']>;
  readonly tokenAddress?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "balance" */
export type Balance_Min_Order_By = {
  readonly amount?: InputMaybe<Order_By>;
  readonly blockHeight?: InputMaybe<Order_By>;
  readonly id?: InputMaybe<Order_By>;
  readonly playerAddress?: InputMaybe<Order_By>;
  readonly tokenAddress?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "balance" */
export type Balance_Mutation_Response = {
  readonly __typename?: 'balance_mutation_response';
  /** number of affected rows by the mutation */
  readonly affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  readonly returning: ReadonlyArray<Balance>;
};

/** input type for inserting object relation for remote table "balance" */
export type Balance_Obj_Rel_Insert_Input = {
  readonly data: Balance_Insert_Input;
  readonly on_conflict?: InputMaybe<Balance_On_Conflict>;
};

/** on conflict condition type for table "balance" */
export type Balance_On_Conflict = {
  readonly constraint: Balance_Constraint;
  readonly update_columns: ReadonlyArray<Balance_Update_Column>;
  readonly where?: InputMaybe<Balance_Bool_Exp>;
};

/** ordering options when selecting data from "balance" */
export type Balance_Order_By = {
  readonly amount?: InputMaybe<Order_By>;
  readonly blockHeight?: InputMaybe<Order_By>;
  readonly id?: InputMaybe<Order_By>;
  readonly playerAddress?: InputMaybe<Order_By>;
  readonly tokenAddress?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "balance" */
export type Balance_Pk_Columns_Input = {
  readonly id: Scalars['uuid'];
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
  TokenAddress = 'tokenAddress'
}

/** input type for updating data in table "balance" */
export type Balance_Set_Input = {
  readonly amount?: InputMaybe<Scalars['float8']>;
  readonly blockHeight?: InputMaybe<Scalars['Int']>;
  readonly id?: InputMaybe<Scalars['uuid']>;
  readonly playerAddress?: InputMaybe<Scalars['String']>;
  readonly tokenAddress?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Balance_Stddev_Fields = {
  readonly __typename?: 'balance_stddev_fields';
  readonly amount?: Maybe<Scalars['Float']>;
  readonly blockHeight?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "balance" */
export type Balance_Stddev_Order_By = {
  readonly amount?: InputMaybe<Order_By>;
  readonly blockHeight?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Balance_Stddev_Pop_Fields = {
  readonly __typename?: 'balance_stddev_pop_fields';
  readonly amount?: Maybe<Scalars['Float']>;
  readonly blockHeight?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "balance" */
export type Balance_Stddev_Pop_Order_By = {
  readonly amount?: InputMaybe<Order_By>;
  readonly blockHeight?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Balance_Stddev_Samp_Fields = {
  readonly __typename?: 'balance_stddev_samp_fields';
  readonly amount?: Maybe<Scalars['Float']>;
  readonly blockHeight?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "balance" */
export type Balance_Stddev_Samp_Order_By = {
  readonly amount?: InputMaybe<Order_By>;
  readonly blockHeight?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Balance_Sum_Fields = {
  readonly __typename?: 'balance_sum_fields';
  readonly amount?: Maybe<Scalars['float8']>;
  readonly blockHeight?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "balance" */
export type Balance_Sum_Order_By = {
  readonly amount?: InputMaybe<Order_By>;
  readonly blockHeight?: InputMaybe<Order_By>;
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
  TokenAddress = 'tokenAddress'
}

/** aggregate var_pop on columns */
export type Balance_Var_Pop_Fields = {
  readonly __typename?: 'balance_var_pop_fields';
  readonly amount?: Maybe<Scalars['Float']>;
  readonly blockHeight?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "balance" */
export type Balance_Var_Pop_Order_By = {
  readonly amount?: InputMaybe<Order_By>;
  readonly blockHeight?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Balance_Var_Samp_Fields = {
  readonly __typename?: 'balance_var_samp_fields';
  readonly amount?: Maybe<Scalars['Float']>;
  readonly blockHeight?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "balance" */
export type Balance_Var_Samp_Order_By = {
  readonly amount?: InputMaybe<Order_By>;
  readonly blockHeight?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Balance_Variance_Fields = {
  readonly __typename?: 'balance_variance_fields';
  readonly amount?: Maybe<Scalars['Float']>;
  readonly blockHeight?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "balance" */
export type Balance_Variance_Order_By = {
  readonly amount?: InputMaybe<Order_By>;
  readonly blockHeight?: InputMaybe<Order_By>;
};

/** columns and relationships of "dao" */
export type Dao = {
  readonly __typename?: 'dao';
  readonly contractAddress: Scalars['String'];
  /** An object relationship */
  readonly guild?: Maybe<Guild>;
  readonly guildId?: Maybe<Scalars['uuid']>;
  readonly id: Scalars['uuid'];
  readonly label?: Maybe<Scalars['String']>;
  readonly network: Scalars['String'];
  /** An array relationship */
  readonly players: ReadonlyArray<Dao_Player>;
  /** An aggregated array relationship */
  readonly players_aggregate: Dao_Player_Aggregate;
  readonly url?: Maybe<Scalars['String']>;
};


/** columns and relationships of "dao" */
export type DaoPlayersArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Dao_Player_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Dao_Player_Order_By>>;
  where?: InputMaybe<Dao_Player_Bool_Exp>;
};


/** columns and relationships of "dao" */
export type DaoPlayers_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Dao_Player_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Dao_Player_Order_By>>;
  where?: InputMaybe<Dao_Player_Bool_Exp>;
};

/** aggregated selection of "dao" */
export type Dao_Aggregate = {
  readonly __typename?: 'dao_aggregate';
  readonly aggregate?: Maybe<Dao_Aggregate_Fields>;
  readonly nodes: ReadonlyArray<Dao>;
};

/** aggregate fields of "dao" */
export type Dao_Aggregate_Fields = {
  readonly __typename?: 'dao_aggregate_fields';
  readonly count?: Maybe<Scalars['Int']>;
  readonly max?: Maybe<Dao_Max_Fields>;
  readonly min?: Maybe<Dao_Min_Fields>;
};


/** aggregate fields of "dao" */
export type Dao_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<ReadonlyArray<Dao_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "dao" */
export type Dao_Aggregate_Order_By = {
  readonly count?: InputMaybe<Order_By>;
  readonly max?: InputMaybe<Dao_Max_Order_By>;
  readonly min?: InputMaybe<Dao_Min_Order_By>;
};

/** input type for inserting array relation for remote table "dao" */
export type Dao_Arr_Rel_Insert_Input = {
  readonly data: ReadonlyArray<Dao_Insert_Input>;
  readonly on_conflict?: InputMaybe<Dao_On_Conflict>;
};

/** Boolean expression to filter rows from the table "dao". All fields are combined with a logical 'AND'. */
export type Dao_Bool_Exp = {
  readonly _and?: InputMaybe<ReadonlyArray<InputMaybe<Dao_Bool_Exp>>>;
  readonly _not?: InputMaybe<Dao_Bool_Exp>;
  readonly _or?: InputMaybe<ReadonlyArray<InputMaybe<Dao_Bool_Exp>>>;
  readonly contractAddress?: InputMaybe<String_Comparison_Exp>;
  readonly guild?: InputMaybe<Guild_Bool_Exp>;
  readonly guildId?: InputMaybe<Uuid_Comparison_Exp>;
  readonly id?: InputMaybe<Uuid_Comparison_Exp>;
  readonly label?: InputMaybe<String_Comparison_Exp>;
  readonly network?: InputMaybe<String_Comparison_Exp>;
  readonly players?: InputMaybe<Dao_Player_Bool_Exp>;
  readonly url?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "dao" */
export enum Dao_Constraint {
  /** unique or primary key constraint */
  DaoContractAddressNetworkKey = 'dao_contract_address_network_key',
  /** unique or primary key constraint */
  DaoPkey = 'dao_pkey'
}

/** input type for inserting data into table "dao" */
export type Dao_Insert_Input = {
  readonly contractAddress?: InputMaybe<Scalars['String']>;
  readonly guild?: InputMaybe<Guild_Obj_Rel_Insert_Input>;
  readonly guildId?: InputMaybe<Scalars['uuid']>;
  readonly id?: InputMaybe<Scalars['uuid']>;
  readonly label?: InputMaybe<Scalars['String']>;
  readonly network?: InputMaybe<Scalars['String']>;
  readonly players?: InputMaybe<Dao_Player_Arr_Rel_Insert_Input>;
  readonly url?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Dao_Max_Fields = {
  readonly __typename?: 'dao_max_fields';
  readonly contractAddress?: Maybe<Scalars['String']>;
  readonly guildId?: Maybe<Scalars['uuid']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly label?: Maybe<Scalars['String']>;
  readonly network?: Maybe<Scalars['String']>;
  readonly url?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "dao" */
export type Dao_Max_Order_By = {
  readonly contractAddress?: InputMaybe<Order_By>;
  readonly guildId?: InputMaybe<Order_By>;
  readonly id?: InputMaybe<Order_By>;
  readonly label?: InputMaybe<Order_By>;
  readonly network?: InputMaybe<Order_By>;
  readonly url?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Dao_Min_Fields = {
  readonly __typename?: 'dao_min_fields';
  readonly contractAddress?: Maybe<Scalars['String']>;
  readonly guildId?: Maybe<Scalars['uuid']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly label?: Maybe<Scalars['String']>;
  readonly network?: Maybe<Scalars['String']>;
  readonly url?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "dao" */
export type Dao_Min_Order_By = {
  readonly contractAddress?: InputMaybe<Order_By>;
  readonly guildId?: InputMaybe<Order_By>;
  readonly id?: InputMaybe<Order_By>;
  readonly label?: InputMaybe<Order_By>;
  readonly network?: InputMaybe<Order_By>;
  readonly url?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "dao" */
export type Dao_Mutation_Response = {
  readonly __typename?: 'dao_mutation_response';
  /** number of affected rows by the mutation */
  readonly affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  readonly returning: ReadonlyArray<Dao>;
};

/** input type for inserting object relation for remote table "dao" */
export type Dao_Obj_Rel_Insert_Input = {
  readonly data: Dao_Insert_Input;
  readonly on_conflict?: InputMaybe<Dao_On_Conflict>;
};

/** on conflict condition type for table "dao" */
export type Dao_On_Conflict = {
  readonly constraint: Dao_Constraint;
  readonly update_columns: ReadonlyArray<Dao_Update_Column>;
  readonly where?: InputMaybe<Dao_Bool_Exp>;
};

/** ordering options when selecting data from "dao" */
export type Dao_Order_By = {
  readonly contractAddress?: InputMaybe<Order_By>;
  readonly guild?: InputMaybe<Guild_Order_By>;
  readonly guildId?: InputMaybe<Order_By>;
  readonly id?: InputMaybe<Order_By>;
  readonly label?: InputMaybe<Order_By>;
  readonly network?: InputMaybe<Order_By>;
  readonly players_aggregate?: InputMaybe<Dao_Player_Aggregate_Order_By>;
  readonly url?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "dao" */
export type Dao_Pk_Columns_Input = {
  readonly id: Scalars['uuid'];
};

/** columns and relationships of "dao_player" */
export type Dao_Player = {
  readonly __typename?: 'dao_player';
  /** An object relationship */
  readonly Dao: Dao;
  /** An object relationship */
  readonly Player: Player;
  readonly daoId: Scalars['uuid'];
  readonly playerId: Scalars['uuid'];
  readonly visible?: Maybe<Scalars['Boolean']>;
};

/** aggregated selection of "dao_player" */
export type Dao_Player_Aggregate = {
  readonly __typename?: 'dao_player_aggregate';
  readonly aggregate?: Maybe<Dao_Player_Aggregate_Fields>;
  readonly nodes: ReadonlyArray<Dao_Player>;
};

/** aggregate fields of "dao_player" */
export type Dao_Player_Aggregate_Fields = {
  readonly __typename?: 'dao_player_aggregate_fields';
  readonly count?: Maybe<Scalars['Int']>;
  readonly max?: Maybe<Dao_Player_Max_Fields>;
  readonly min?: Maybe<Dao_Player_Min_Fields>;
};


/** aggregate fields of "dao_player" */
export type Dao_Player_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<ReadonlyArray<Dao_Player_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "dao_player" */
export type Dao_Player_Aggregate_Order_By = {
  readonly count?: InputMaybe<Order_By>;
  readonly max?: InputMaybe<Dao_Player_Max_Order_By>;
  readonly min?: InputMaybe<Dao_Player_Min_Order_By>;
};

/** input type for inserting array relation for remote table "dao_player" */
export type Dao_Player_Arr_Rel_Insert_Input = {
  readonly data: ReadonlyArray<Dao_Player_Insert_Input>;
  readonly on_conflict?: InputMaybe<Dao_Player_On_Conflict>;
};

/** Boolean expression to filter rows from the table "dao_player". All fields are combined with a logical 'AND'. */
export type Dao_Player_Bool_Exp = {
  readonly Dao?: InputMaybe<Dao_Bool_Exp>;
  readonly Player?: InputMaybe<Player_Bool_Exp>;
  readonly _and?: InputMaybe<ReadonlyArray<InputMaybe<Dao_Player_Bool_Exp>>>;
  readonly _not?: InputMaybe<Dao_Player_Bool_Exp>;
  readonly _or?: InputMaybe<ReadonlyArray<InputMaybe<Dao_Player_Bool_Exp>>>;
  readonly daoId?: InputMaybe<Uuid_Comparison_Exp>;
  readonly playerId?: InputMaybe<Uuid_Comparison_Exp>;
  readonly visible?: InputMaybe<Boolean_Comparison_Exp>;
};

/** unique or primary key constraints on table "dao_player" */
export enum Dao_Player_Constraint {
  /** unique or primary key constraint */
  DaoPlayerPkey = 'dao_player_pkey'
}

/** input type for inserting data into table "dao_player" */
export type Dao_Player_Insert_Input = {
  readonly Dao?: InputMaybe<Dao_Obj_Rel_Insert_Input>;
  readonly Player?: InputMaybe<Player_Obj_Rel_Insert_Input>;
  readonly daoId?: InputMaybe<Scalars['uuid']>;
  readonly playerId?: InputMaybe<Scalars['uuid']>;
  readonly visible?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate max on columns */
export type Dao_Player_Max_Fields = {
  readonly __typename?: 'dao_player_max_fields';
  readonly daoId?: Maybe<Scalars['uuid']>;
  readonly playerId?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "dao_player" */
export type Dao_Player_Max_Order_By = {
  readonly daoId?: InputMaybe<Order_By>;
  readonly playerId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Dao_Player_Min_Fields = {
  readonly __typename?: 'dao_player_min_fields';
  readonly daoId?: Maybe<Scalars['uuid']>;
  readonly playerId?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "dao_player" */
export type Dao_Player_Min_Order_By = {
  readonly daoId?: InputMaybe<Order_By>;
  readonly playerId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "dao_player" */
export type Dao_Player_Mutation_Response = {
  readonly __typename?: 'dao_player_mutation_response';
  /** number of affected rows by the mutation */
  readonly affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  readonly returning: ReadonlyArray<Dao_Player>;
};

/** input type for inserting object relation for remote table "dao_player" */
export type Dao_Player_Obj_Rel_Insert_Input = {
  readonly data: Dao_Player_Insert_Input;
  readonly on_conflict?: InputMaybe<Dao_Player_On_Conflict>;
};

/** on conflict condition type for table "dao_player" */
export type Dao_Player_On_Conflict = {
  readonly constraint: Dao_Player_Constraint;
  readonly update_columns: ReadonlyArray<Dao_Player_Update_Column>;
  readonly where?: InputMaybe<Dao_Player_Bool_Exp>;
};

/** ordering options when selecting data from "dao_player" */
export type Dao_Player_Order_By = {
  readonly Dao?: InputMaybe<Dao_Order_By>;
  readonly Player?: InputMaybe<Player_Order_By>;
  readonly daoId?: InputMaybe<Order_By>;
  readonly playerId?: InputMaybe<Order_By>;
  readonly visible?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "dao_player" */
export type Dao_Player_Pk_Columns_Input = {
  readonly daoId: Scalars['uuid'];
  readonly playerId: Scalars['uuid'];
};

/** select columns of table "dao_player" */
export enum Dao_Player_Select_Column {
  /** column name */
  DaoId = 'daoId',
  /** column name */
  PlayerId = 'playerId',
  /** column name */
  Visible = 'visible'
}

/** input type for updating data in table "dao_player" */
export type Dao_Player_Set_Input = {
  readonly daoId?: InputMaybe<Scalars['uuid']>;
  readonly playerId?: InputMaybe<Scalars['uuid']>;
  readonly visible?: InputMaybe<Scalars['Boolean']>;
};

/** update columns of table "dao_player" */
export enum Dao_Player_Update_Column {
  /** column name */
  DaoId = 'daoId',
  /** column name */
  PlayerId = 'playerId',
  /** column name */
  Visible = 'visible'
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
  Url = 'url'
}

/** input type for updating data in table "dao" */
export type Dao_Set_Input = {
  readonly contractAddress?: InputMaybe<Scalars['String']>;
  readonly guildId?: InputMaybe<Scalars['uuid']>;
  readonly id?: InputMaybe<Scalars['uuid']>;
  readonly label?: InputMaybe<Scalars['String']>;
  readonly network?: InputMaybe<Scalars['String']>;
  readonly url?: InputMaybe<Scalars['String']>;
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
  Url = 'url'
}

/** expression to compare columns of type float8. All fields are combined with logical 'AND'. */
export type Float8_Comparison_Exp = {
  readonly _eq?: InputMaybe<Scalars['float8']>;
  readonly _gt?: InputMaybe<Scalars['float8']>;
  readonly _gte?: InputMaybe<Scalars['float8']>;
  readonly _in?: InputMaybe<ReadonlyArray<Scalars['float8']>>;
  readonly _is_null?: InputMaybe<Scalars['Boolean']>;
  readonly _lt?: InputMaybe<Scalars['float8']>;
  readonly _lte?: InputMaybe<Scalars['float8']>;
  readonly _neq?: InputMaybe<Scalars['float8']>;
  readonly _nin?: InputMaybe<ReadonlyArray<Scalars['float8']>>;
};

/** columns and relationships of "guild" */
export type Guild = {
  readonly __typename?: 'guild';
  /** An object relationship */
  readonly GuildType: GuildType;
  /** An array relationship */
  readonly daos: ReadonlyArray<Dao>;
  /** An aggregated array relationship */
  readonly daos_aggregate: Dao_Aggregate;
  readonly description?: Maybe<Scalars['String']>;
  /** Remote relationship field */
  readonly discordAnnouncements?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly discordId?: Maybe<Scalars['String']>;
  readonly discordInviteUrl?: Maybe<Scalars['String']>;
  readonly githubUrl?: Maybe<Scalars['String']>;
  /** An array relationship */
  readonly guild_players: ReadonlyArray<Guild_Player>;
  /** An aggregated array relationship */
  readonly guild_players_aggregate: Guild_Player_Aggregate;
  /** Unique friendly identifier for the Guild (used in URL) */
  readonly guildname: Scalars['String'];
  readonly id: Scalars['uuid'];
  readonly joinButtonUrl?: Maybe<Scalars['String']>;
  readonly logo?: Maybe<Scalars['String']>;
  readonly membershipThroughDiscord: Scalars['Boolean'];
  /** An object relationship */
  readonly metadata?: Maybe<Guild_Metadata>;
  readonly name: Scalars['String'];
  readonly profileLayout?: Maybe<Scalars['String']>;
  /** An array relationship */
  readonly quests: ReadonlyArray<Quest>;
  /** An aggregated array relationship */
  readonly quests_aggregate: Quest_Aggregate;
  readonly showDiscordAnnouncements: Scalars['Boolean'];
  readonly sortPosition?: Maybe<Scalars['Int']>;
  readonly status: GuildStatus_Enum;
  readonly twitterUrl?: Maybe<Scalars['String']>;
  /** The area of focus for the guild (e.g. funding, project, etc) */
  readonly type: GuildType_Enum;
  readonly websiteUrl?: Maybe<Scalars['String']>;
};


/** columns and relationships of "guild" */
export type GuildDaosArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Dao_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Dao_Order_By>>;
  where?: InputMaybe<Dao_Bool_Exp>;
};


/** columns and relationships of "guild" */
export type GuildDaos_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Dao_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Dao_Order_By>>;
  where?: InputMaybe<Dao_Bool_Exp>;
};


/** columns and relationships of "guild" */
export type GuildGuild_PlayersArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Guild_Player_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Guild_Player_Order_By>>;
  where?: InputMaybe<Guild_Player_Bool_Exp>;
};


/** columns and relationships of "guild" */
export type GuildGuild_Players_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Guild_Player_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Guild_Player_Order_By>>;
  where?: InputMaybe<Guild_Player_Bool_Exp>;
};


/** columns and relationships of "guild" */
export type GuildQuestsArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Quest_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Quest_Order_By>>;
  where?: InputMaybe<Quest_Bool_Exp>;
};


/** columns and relationships of "guild" */
export type GuildQuests_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Quest_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Quest_Order_By>>;
  where?: InputMaybe<Quest_Bool_Exp>;
};

/** aggregated selection of "guild" */
export type Guild_Aggregate = {
  readonly __typename?: 'guild_aggregate';
  readonly aggregate?: Maybe<Guild_Aggregate_Fields>;
  readonly nodes: ReadonlyArray<Guild>;
};

/** aggregate fields of "guild" */
export type Guild_Aggregate_Fields = {
  readonly __typename?: 'guild_aggregate_fields';
  readonly avg?: Maybe<Guild_Avg_Fields>;
  readonly count?: Maybe<Scalars['Int']>;
  readonly max?: Maybe<Guild_Max_Fields>;
  readonly min?: Maybe<Guild_Min_Fields>;
  readonly stddev?: Maybe<Guild_Stddev_Fields>;
  readonly stddev_pop?: Maybe<Guild_Stddev_Pop_Fields>;
  readonly stddev_samp?: Maybe<Guild_Stddev_Samp_Fields>;
  readonly sum?: Maybe<Guild_Sum_Fields>;
  readonly var_pop?: Maybe<Guild_Var_Pop_Fields>;
  readonly var_samp?: Maybe<Guild_Var_Samp_Fields>;
  readonly variance?: Maybe<Guild_Variance_Fields>;
};


/** aggregate fields of "guild" */
export type Guild_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<ReadonlyArray<Guild_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "guild" */
export type Guild_Aggregate_Order_By = {
  readonly avg?: InputMaybe<Guild_Avg_Order_By>;
  readonly count?: InputMaybe<Order_By>;
  readonly max?: InputMaybe<Guild_Max_Order_By>;
  readonly min?: InputMaybe<Guild_Min_Order_By>;
  readonly stddev?: InputMaybe<Guild_Stddev_Order_By>;
  readonly stddev_pop?: InputMaybe<Guild_Stddev_Pop_Order_By>;
  readonly stddev_samp?: InputMaybe<Guild_Stddev_Samp_Order_By>;
  readonly sum?: InputMaybe<Guild_Sum_Order_By>;
  readonly var_pop?: InputMaybe<Guild_Var_Pop_Order_By>;
  readonly var_samp?: InputMaybe<Guild_Var_Samp_Order_By>;
  readonly variance?: InputMaybe<Guild_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "guild" */
export type Guild_Arr_Rel_Insert_Input = {
  readonly data: ReadonlyArray<Guild_Insert_Input>;
  readonly on_conflict?: InputMaybe<Guild_On_Conflict>;
};

/** aggregate avg on columns */
export type Guild_Avg_Fields = {
  readonly __typename?: 'guild_avg_fields';
  readonly sortPosition?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "guild" */
export type Guild_Avg_Order_By = {
  readonly sortPosition?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "guild". All fields are combined with a logical 'AND'. */
export type Guild_Bool_Exp = {
  readonly GuildType?: InputMaybe<GuildType_Bool_Exp>;
  readonly _and?: InputMaybe<ReadonlyArray<InputMaybe<Guild_Bool_Exp>>>;
  readonly _not?: InputMaybe<Guild_Bool_Exp>;
  readonly _or?: InputMaybe<ReadonlyArray<InputMaybe<Guild_Bool_Exp>>>;
  readonly daos?: InputMaybe<Dao_Bool_Exp>;
  readonly description?: InputMaybe<String_Comparison_Exp>;
  readonly discordId?: InputMaybe<String_Comparison_Exp>;
  readonly discordInviteUrl?: InputMaybe<String_Comparison_Exp>;
  readonly githubUrl?: InputMaybe<String_Comparison_Exp>;
  readonly guild_players?: InputMaybe<Guild_Player_Bool_Exp>;
  readonly guildname?: InputMaybe<String_Comparison_Exp>;
  readonly id?: InputMaybe<Uuid_Comparison_Exp>;
  readonly joinButtonUrl?: InputMaybe<String_Comparison_Exp>;
  readonly logo?: InputMaybe<String_Comparison_Exp>;
  readonly membershipThroughDiscord?: InputMaybe<Boolean_Comparison_Exp>;
  readonly metadata?: InputMaybe<Guild_Metadata_Bool_Exp>;
  readonly name?: InputMaybe<String_Comparison_Exp>;
  readonly profileLayout?: InputMaybe<String_Comparison_Exp>;
  readonly quests?: InputMaybe<Quest_Bool_Exp>;
  readonly showDiscordAnnouncements?: InputMaybe<Boolean_Comparison_Exp>;
  readonly sortPosition?: InputMaybe<Int_Comparison_Exp>;
  readonly status?: InputMaybe<GuildStatus_Enum_Comparison_Exp>;
  readonly twitterUrl?: InputMaybe<String_Comparison_Exp>;
  readonly type?: InputMaybe<GuildType_Enum_Comparison_Exp>;
  readonly websiteUrl?: InputMaybe<String_Comparison_Exp>;
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
  GuildSortPositionKey = 'guild_sort_position_key'
}

/** input type for incrementing integer column in table "guild" */
export type Guild_Inc_Input = {
  readonly sortPosition?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "guild" */
export type Guild_Insert_Input = {
  readonly GuildType?: InputMaybe<GuildType_Obj_Rel_Insert_Input>;
  readonly daos?: InputMaybe<Dao_Arr_Rel_Insert_Input>;
  readonly description?: InputMaybe<Scalars['String']>;
  readonly discordId?: InputMaybe<Scalars['String']>;
  readonly discordInviteUrl?: InputMaybe<Scalars['String']>;
  readonly githubUrl?: InputMaybe<Scalars['String']>;
  readonly guild_players?: InputMaybe<Guild_Player_Arr_Rel_Insert_Input>;
  readonly guildname?: InputMaybe<Scalars['String']>;
  readonly id?: InputMaybe<Scalars['uuid']>;
  readonly joinButtonUrl?: InputMaybe<Scalars['String']>;
  readonly logo?: InputMaybe<Scalars['String']>;
  readonly membershipThroughDiscord?: InputMaybe<Scalars['Boolean']>;
  readonly metadata?: InputMaybe<Guild_Metadata_Obj_Rel_Insert_Input>;
  readonly name?: InputMaybe<Scalars['String']>;
  readonly profileLayout?: InputMaybe<Scalars['String']>;
  readonly quests?: InputMaybe<Quest_Arr_Rel_Insert_Input>;
  readonly showDiscordAnnouncements?: InputMaybe<Scalars['Boolean']>;
  readonly sortPosition?: InputMaybe<Scalars['Int']>;
  readonly status?: InputMaybe<GuildStatus_Enum>;
  readonly twitterUrl?: InputMaybe<Scalars['String']>;
  readonly type?: InputMaybe<GuildType_Enum>;
  readonly websiteUrl?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Guild_Max_Fields = {
  readonly __typename?: 'guild_max_fields';
  readonly description?: Maybe<Scalars['String']>;
  readonly discordId?: Maybe<Scalars['String']>;
  readonly discordInviteUrl?: Maybe<Scalars['String']>;
  readonly githubUrl?: Maybe<Scalars['String']>;
  readonly guildname?: Maybe<Scalars['String']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly joinButtonUrl?: Maybe<Scalars['String']>;
  readonly logo?: Maybe<Scalars['String']>;
  readonly name?: Maybe<Scalars['String']>;
  readonly profileLayout?: Maybe<Scalars['String']>;
  readonly sortPosition?: Maybe<Scalars['Int']>;
  readonly twitterUrl?: Maybe<Scalars['String']>;
  readonly websiteUrl?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "guild" */
export type Guild_Max_Order_By = {
  readonly description?: InputMaybe<Order_By>;
  readonly discordId?: InputMaybe<Order_By>;
  readonly discordInviteUrl?: InputMaybe<Order_By>;
  readonly githubUrl?: InputMaybe<Order_By>;
  readonly guildname?: InputMaybe<Order_By>;
  readonly id?: InputMaybe<Order_By>;
  readonly joinButtonUrl?: InputMaybe<Order_By>;
  readonly logo?: InputMaybe<Order_By>;
  readonly name?: InputMaybe<Order_By>;
  readonly profileLayout?: InputMaybe<Order_By>;
  readonly sortPosition?: InputMaybe<Order_By>;
  readonly twitterUrl?: InputMaybe<Order_By>;
  readonly websiteUrl?: InputMaybe<Order_By>;
};

/**
 * Used to hold private information for guilds
 *
 *
 * columns and relationships of "guild_metadata"
 */
export type Guild_Metadata = {
  readonly __typename?: 'guild_metadata';
  readonly creatorId?: Maybe<Scalars['uuid']>;
  readonly discordId: Scalars['String'];
  readonly discordMetadata?: Maybe<Scalars['jsonb']>;
  /** Remote relationship field */
  readonly discordRoles: ReadonlyArray<DiscordRole>;
  /** An object relationship */
  readonly guild: Guild;
  readonly guildId: Scalars['uuid'];
  /** An object relationship */
  readonly player?: Maybe<Player>;
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
  readonly __typename?: 'guild_metadata_aggregate';
  readonly aggregate?: Maybe<Guild_Metadata_Aggregate_Fields>;
  readonly nodes: ReadonlyArray<Guild_Metadata>;
};

/** aggregate fields of "guild_metadata" */
export type Guild_Metadata_Aggregate_Fields = {
  readonly __typename?: 'guild_metadata_aggregate_fields';
  readonly count?: Maybe<Scalars['Int']>;
  readonly max?: Maybe<Guild_Metadata_Max_Fields>;
  readonly min?: Maybe<Guild_Metadata_Min_Fields>;
};


/** aggregate fields of "guild_metadata" */
export type Guild_Metadata_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<ReadonlyArray<Guild_Metadata_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "guild_metadata" */
export type Guild_Metadata_Aggregate_Order_By = {
  readonly count?: InputMaybe<Order_By>;
  readonly max?: InputMaybe<Guild_Metadata_Max_Order_By>;
  readonly min?: InputMaybe<Guild_Metadata_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Guild_Metadata_Append_Input = {
  readonly discordMetadata?: InputMaybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "guild_metadata" */
export type Guild_Metadata_Arr_Rel_Insert_Input = {
  readonly data: ReadonlyArray<Guild_Metadata_Insert_Input>;
  readonly on_conflict?: InputMaybe<Guild_Metadata_On_Conflict>;
};

/** Boolean expression to filter rows from the table "guild_metadata". All fields are combined with a logical 'AND'. */
export type Guild_Metadata_Bool_Exp = {
  readonly _and?: InputMaybe<ReadonlyArray<InputMaybe<Guild_Metadata_Bool_Exp>>>;
  readonly _not?: InputMaybe<Guild_Metadata_Bool_Exp>;
  readonly _or?: InputMaybe<ReadonlyArray<InputMaybe<Guild_Metadata_Bool_Exp>>>;
  readonly creatorId?: InputMaybe<Uuid_Comparison_Exp>;
  readonly discordId?: InputMaybe<String_Comparison_Exp>;
  readonly discordMetadata?: InputMaybe<Jsonb_Comparison_Exp>;
  readonly guild?: InputMaybe<Guild_Bool_Exp>;
  readonly guildId?: InputMaybe<Uuid_Comparison_Exp>;
  readonly player?: InputMaybe<Player_Bool_Exp>;
};

/** unique or primary key constraints on table "guild_metadata" */
export enum Guild_Metadata_Constraint {
  /** unique or primary key constraint */
  GuildMetadataPkey = 'guild_metadata_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Guild_Metadata_Delete_At_Path_Input = {
  readonly discordMetadata?: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
};

/**
 * delete the array element with specified index (negative integers count from the
 * end). throws an error if top level container is not an array
 */
export type Guild_Metadata_Delete_Elem_Input = {
  readonly discordMetadata?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Guild_Metadata_Delete_Key_Input = {
  readonly discordMetadata?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "guild_metadata" */
export type Guild_Metadata_Insert_Input = {
  readonly creatorId?: InputMaybe<Scalars['uuid']>;
  readonly discordId?: InputMaybe<Scalars['String']>;
  readonly discordMetadata?: InputMaybe<Scalars['jsonb']>;
  readonly guild?: InputMaybe<Guild_Obj_Rel_Insert_Input>;
  readonly guildId?: InputMaybe<Scalars['uuid']>;
  readonly player?: InputMaybe<Player_Obj_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Guild_Metadata_Max_Fields = {
  readonly __typename?: 'guild_metadata_max_fields';
  readonly creatorId?: Maybe<Scalars['uuid']>;
  readonly discordId?: Maybe<Scalars['String']>;
  readonly guildId?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "guild_metadata" */
export type Guild_Metadata_Max_Order_By = {
  readonly creatorId?: InputMaybe<Order_By>;
  readonly discordId?: InputMaybe<Order_By>;
  readonly guildId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Guild_Metadata_Min_Fields = {
  readonly __typename?: 'guild_metadata_min_fields';
  readonly creatorId?: Maybe<Scalars['uuid']>;
  readonly discordId?: Maybe<Scalars['String']>;
  readonly guildId?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "guild_metadata" */
export type Guild_Metadata_Min_Order_By = {
  readonly creatorId?: InputMaybe<Order_By>;
  readonly discordId?: InputMaybe<Order_By>;
  readonly guildId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "guild_metadata" */
export type Guild_Metadata_Mutation_Response = {
  readonly __typename?: 'guild_metadata_mutation_response';
  /** number of affected rows by the mutation */
  readonly affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  readonly returning: ReadonlyArray<Guild_Metadata>;
};

/** input type for inserting object relation for remote table "guild_metadata" */
export type Guild_Metadata_Obj_Rel_Insert_Input = {
  readonly data: Guild_Metadata_Insert_Input;
  readonly on_conflict?: InputMaybe<Guild_Metadata_On_Conflict>;
};

/** on conflict condition type for table "guild_metadata" */
export type Guild_Metadata_On_Conflict = {
  readonly constraint: Guild_Metadata_Constraint;
  readonly update_columns: ReadonlyArray<Guild_Metadata_Update_Column>;
  readonly where?: InputMaybe<Guild_Metadata_Bool_Exp>;
};

/** ordering options when selecting data from "guild_metadata" */
export type Guild_Metadata_Order_By = {
  readonly creatorId?: InputMaybe<Order_By>;
  readonly discordId?: InputMaybe<Order_By>;
  readonly discordMetadata?: InputMaybe<Order_By>;
  readonly guild?: InputMaybe<Guild_Order_By>;
  readonly guildId?: InputMaybe<Order_By>;
  readonly player?: InputMaybe<Player_Order_By>;
};

/** primary key columns input for table: "guild_metadata" */
export type Guild_Metadata_Pk_Columns_Input = {
  readonly guildId: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Guild_Metadata_Prepend_Input = {
  readonly discordMetadata?: InputMaybe<Scalars['jsonb']>;
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
  GuildId = 'guildId'
}

/** input type for updating data in table "guild_metadata" */
export type Guild_Metadata_Set_Input = {
  readonly creatorId?: InputMaybe<Scalars['uuid']>;
  readonly discordId?: InputMaybe<Scalars['String']>;
  readonly discordMetadata?: InputMaybe<Scalars['jsonb']>;
  readonly guildId?: InputMaybe<Scalars['uuid']>;
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
  GuildId = 'guildId'
}

/** aggregate min on columns */
export type Guild_Min_Fields = {
  readonly __typename?: 'guild_min_fields';
  readonly description?: Maybe<Scalars['String']>;
  readonly discordId?: Maybe<Scalars['String']>;
  readonly discordInviteUrl?: Maybe<Scalars['String']>;
  readonly githubUrl?: Maybe<Scalars['String']>;
  readonly guildname?: Maybe<Scalars['String']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly joinButtonUrl?: Maybe<Scalars['String']>;
  readonly logo?: Maybe<Scalars['String']>;
  readonly name?: Maybe<Scalars['String']>;
  readonly profileLayout?: Maybe<Scalars['String']>;
  readonly sortPosition?: Maybe<Scalars['Int']>;
  readonly twitterUrl?: Maybe<Scalars['String']>;
  readonly websiteUrl?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "guild" */
export type Guild_Min_Order_By = {
  readonly description?: InputMaybe<Order_By>;
  readonly discordId?: InputMaybe<Order_By>;
  readonly discordInviteUrl?: InputMaybe<Order_By>;
  readonly githubUrl?: InputMaybe<Order_By>;
  readonly guildname?: InputMaybe<Order_By>;
  readonly id?: InputMaybe<Order_By>;
  readonly joinButtonUrl?: InputMaybe<Order_By>;
  readonly logo?: InputMaybe<Order_By>;
  readonly name?: InputMaybe<Order_By>;
  readonly profileLayout?: InputMaybe<Order_By>;
  readonly sortPosition?: InputMaybe<Order_By>;
  readonly twitterUrl?: InputMaybe<Order_By>;
  readonly websiteUrl?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "guild" */
export type Guild_Mutation_Response = {
  readonly __typename?: 'guild_mutation_response';
  /** number of affected rows by the mutation */
  readonly affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  readonly returning: ReadonlyArray<Guild>;
};

/** input type for inserting object relation for remote table "guild" */
export type Guild_Obj_Rel_Insert_Input = {
  readonly data: Guild_Insert_Input;
  readonly on_conflict?: InputMaybe<Guild_On_Conflict>;
};

/** on conflict condition type for table "guild" */
export type Guild_On_Conflict = {
  readonly constraint: Guild_Constraint;
  readonly update_columns: ReadonlyArray<Guild_Update_Column>;
  readonly where?: InputMaybe<Guild_Bool_Exp>;
};

/** ordering options when selecting data from "guild" */
export type Guild_Order_By = {
  readonly GuildType?: InputMaybe<GuildType_Order_By>;
  readonly daos_aggregate?: InputMaybe<Dao_Aggregate_Order_By>;
  readonly description?: InputMaybe<Order_By>;
  readonly discordId?: InputMaybe<Order_By>;
  readonly discordInviteUrl?: InputMaybe<Order_By>;
  readonly githubUrl?: InputMaybe<Order_By>;
  readonly guild_players_aggregate?: InputMaybe<Guild_Player_Aggregate_Order_By>;
  readonly guildname?: InputMaybe<Order_By>;
  readonly id?: InputMaybe<Order_By>;
  readonly joinButtonUrl?: InputMaybe<Order_By>;
  readonly logo?: InputMaybe<Order_By>;
  readonly membershipThroughDiscord?: InputMaybe<Order_By>;
  readonly metadata?: InputMaybe<Guild_Metadata_Order_By>;
  readonly name?: InputMaybe<Order_By>;
  readonly profileLayout?: InputMaybe<Order_By>;
  readonly quests_aggregate?: InputMaybe<Quest_Aggregate_Order_By>;
  readonly showDiscordAnnouncements?: InputMaybe<Order_By>;
  readonly sortPosition?: InputMaybe<Order_By>;
  readonly status?: InputMaybe<Order_By>;
  readonly twitterUrl?: InputMaybe<Order_By>;
  readonly type?: InputMaybe<Order_By>;
  readonly websiteUrl?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "guild" */
export type Guild_Pk_Columns_Input = {
  readonly id: Scalars['uuid'];
};

/** columns and relationships of "guild_player" */
export type Guild_Player = {
  readonly __typename?: 'guild_player';
  /** An object relationship */
  readonly Guild: Guild;
  /** An object relationship */
  readonly Player: Player;
  /** Remote relationship field */
  readonly discordRoles: ReadonlyArray<DiscordRole>;
  readonly guildId: Scalars['uuid'];
  readonly playerId: Scalars['uuid'];
};

/** aggregated selection of "guild_player" */
export type Guild_Player_Aggregate = {
  readonly __typename?: 'guild_player_aggregate';
  readonly aggregate?: Maybe<Guild_Player_Aggregate_Fields>;
  readonly nodes: ReadonlyArray<Guild_Player>;
};

/** aggregate fields of "guild_player" */
export type Guild_Player_Aggregate_Fields = {
  readonly __typename?: 'guild_player_aggregate_fields';
  readonly count?: Maybe<Scalars['Int']>;
  readonly max?: Maybe<Guild_Player_Max_Fields>;
  readonly min?: Maybe<Guild_Player_Min_Fields>;
};


/** aggregate fields of "guild_player" */
export type Guild_Player_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<ReadonlyArray<Guild_Player_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "guild_player" */
export type Guild_Player_Aggregate_Order_By = {
  readonly count?: InputMaybe<Order_By>;
  readonly max?: InputMaybe<Guild_Player_Max_Order_By>;
  readonly min?: InputMaybe<Guild_Player_Min_Order_By>;
};

/** input type for inserting array relation for remote table "guild_player" */
export type Guild_Player_Arr_Rel_Insert_Input = {
  readonly data: ReadonlyArray<Guild_Player_Insert_Input>;
  readonly on_conflict?: InputMaybe<Guild_Player_On_Conflict>;
};

/** Boolean expression to filter rows from the table "guild_player". All fields are combined with a logical 'AND'. */
export type Guild_Player_Bool_Exp = {
  readonly Guild?: InputMaybe<Guild_Bool_Exp>;
  readonly Player?: InputMaybe<Player_Bool_Exp>;
  readonly _and?: InputMaybe<ReadonlyArray<InputMaybe<Guild_Player_Bool_Exp>>>;
  readonly _not?: InputMaybe<Guild_Player_Bool_Exp>;
  readonly _or?: InputMaybe<ReadonlyArray<InputMaybe<Guild_Player_Bool_Exp>>>;
  readonly guildId?: InputMaybe<Uuid_Comparison_Exp>;
  readonly playerId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "guild_player" */
export enum Guild_Player_Constraint {
  /** unique or primary key constraint */
  GuildPlayerPkey = 'guild_player_pkey'
}

/** input type for inserting data into table "guild_player" */
export type Guild_Player_Insert_Input = {
  readonly Guild?: InputMaybe<Guild_Obj_Rel_Insert_Input>;
  readonly Player?: InputMaybe<Player_Obj_Rel_Insert_Input>;
  readonly guildId?: InputMaybe<Scalars['uuid']>;
  readonly playerId?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Guild_Player_Max_Fields = {
  readonly __typename?: 'guild_player_max_fields';
  readonly guildId?: Maybe<Scalars['uuid']>;
  readonly playerId?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "guild_player" */
export type Guild_Player_Max_Order_By = {
  readonly guildId?: InputMaybe<Order_By>;
  readonly playerId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Guild_Player_Min_Fields = {
  readonly __typename?: 'guild_player_min_fields';
  readonly guildId?: Maybe<Scalars['uuid']>;
  readonly playerId?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "guild_player" */
export type Guild_Player_Min_Order_By = {
  readonly guildId?: InputMaybe<Order_By>;
  readonly playerId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "guild_player" */
export type Guild_Player_Mutation_Response = {
  readonly __typename?: 'guild_player_mutation_response';
  /** number of affected rows by the mutation */
  readonly affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  readonly returning: ReadonlyArray<Guild_Player>;
};

/** input type for inserting object relation for remote table "guild_player" */
export type Guild_Player_Obj_Rel_Insert_Input = {
  readonly data: Guild_Player_Insert_Input;
  readonly on_conflict?: InputMaybe<Guild_Player_On_Conflict>;
};

/** on conflict condition type for table "guild_player" */
export type Guild_Player_On_Conflict = {
  readonly constraint: Guild_Player_Constraint;
  readonly update_columns: ReadonlyArray<Guild_Player_Update_Column>;
  readonly where?: InputMaybe<Guild_Player_Bool_Exp>;
};

/** ordering options when selecting data from "guild_player" */
export type Guild_Player_Order_By = {
  readonly Guild?: InputMaybe<Guild_Order_By>;
  readonly Player?: InputMaybe<Player_Order_By>;
  readonly guildId?: InputMaybe<Order_By>;
  readonly playerId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "guild_player" */
export type Guild_Player_Pk_Columns_Input = {
  readonly guildId: Scalars['uuid'];
  readonly playerId: Scalars['uuid'];
};

/** select columns of table "guild_player" */
export enum Guild_Player_Select_Column {
  /** column name */
  GuildId = 'guildId',
  /** column name */
  PlayerId = 'playerId'
}

/** input type for updating data in table "guild_player" */
export type Guild_Player_Set_Input = {
  readonly guildId?: InputMaybe<Scalars['uuid']>;
  readonly playerId?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "guild_player" */
export enum Guild_Player_Update_Column {
  /** column name */
  GuildId = 'guildId',
  /** column name */
  PlayerId = 'playerId'
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
  WebsiteUrl = 'websiteUrl'
}

/** input type for updating data in table "guild" */
export type Guild_Set_Input = {
  readonly description?: InputMaybe<Scalars['String']>;
  readonly discordId?: InputMaybe<Scalars['String']>;
  readonly discordInviteUrl?: InputMaybe<Scalars['String']>;
  readonly githubUrl?: InputMaybe<Scalars['String']>;
  readonly guildname?: InputMaybe<Scalars['String']>;
  readonly id?: InputMaybe<Scalars['uuid']>;
  readonly joinButtonUrl?: InputMaybe<Scalars['String']>;
  readonly logo?: InputMaybe<Scalars['String']>;
  readonly membershipThroughDiscord?: InputMaybe<Scalars['Boolean']>;
  readonly name?: InputMaybe<Scalars['String']>;
  readonly profileLayout?: InputMaybe<Scalars['String']>;
  readonly showDiscordAnnouncements?: InputMaybe<Scalars['Boolean']>;
  readonly sortPosition?: InputMaybe<Scalars['Int']>;
  readonly status?: InputMaybe<GuildStatus_Enum>;
  readonly twitterUrl?: InputMaybe<Scalars['String']>;
  readonly type?: InputMaybe<GuildType_Enum>;
  readonly websiteUrl?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Guild_Stddev_Fields = {
  readonly __typename?: 'guild_stddev_fields';
  readonly sortPosition?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "guild" */
export type Guild_Stddev_Order_By = {
  readonly sortPosition?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Guild_Stddev_Pop_Fields = {
  readonly __typename?: 'guild_stddev_pop_fields';
  readonly sortPosition?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "guild" */
export type Guild_Stddev_Pop_Order_By = {
  readonly sortPosition?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Guild_Stddev_Samp_Fields = {
  readonly __typename?: 'guild_stddev_samp_fields';
  readonly sortPosition?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "guild" */
export type Guild_Stddev_Samp_Order_By = {
  readonly sortPosition?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Guild_Sum_Fields = {
  readonly __typename?: 'guild_sum_fields';
  readonly sortPosition?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "guild" */
export type Guild_Sum_Order_By = {
  readonly sortPosition?: InputMaybe<Order_By>;
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
  WebsiteUrl = 'websiteUrl'
}

/** aggregate var_pop on columns */
export type Guild_Var_Pop_Fields = {
  readonly __typename?: 'guild_var_pop_fields';
  readonly sortPosition?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "guild" */
export type Guild_Var_Pop_Order_By = {
  readonly sortPosition?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Guild_Var_Samp_Fields = {
  readonly __typename?: 'guild_var_samp_fields';
  readonly sortPosition?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "guild" */
export type Guild_Var_Samp_Order_By = {
  readonly sortPosition?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Guild_Variance_Fields = {
  readonly __typename?: 'guild_variance_fields';
  readonly sortPosition?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "guild" */
export type Guild_Variance_Order_By = {
  readonly sortPosition?: InputMaybe<Order_By>;
};

/** expression to compare columns of type json. All fields are combined with logical 'AND'. */
export type Json_Comparison_Exp = {
  readonly _eq?: InputMaybe<Scalars['json']>;
  readonly _gt?: InputMaybe<Scalars['json']>;
  readonly _gte?: InputMaybe<Scalars['json']>;
  readonly _in?: InputMaybe<ReadonlyArray<Scalars['json']>>;
  readonly _is_null?: InputMaybe<Scalars['Boolean']>;
  readonly _lt?: InputMaybe<Scalars['json']>;
  readonly _lte?: InputMaybe<Scalars['json']>;
  readonly _neq?: InputMaybe<Scalars['json']>;
  readonly _nin?: InputMaybe<ReadonlyArray<Scalars['json']>>;
};

/** expression to compare columns of type jsonb. All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
  /** is the column contained in the given json value */
  readonly _contained_in?: InputMaybe<Scalars['jsonb']>;
  /** does the column contain the given json value at the top level */
  readonly _contains?: InputMaybe<Scalars['jsonb']>;
  readonly _eq?: InputMaybe<Scalars['jsonb']>;
  readonly _gt?: InputMaybe<Scalars['jsonb']>;
  readonly _gte?: InputMaybe<Scalars['jsonb']>;
  /** does the string exist as a top-level key in the column */
  readonly _has_key?: InputMaybe<Scalars['String']>;
  /** do all of these strings exist as top-level keys in the column */
  readonly _has_keys_all?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  /** do any of these strings exist as top-level keys in the column */
  readonly _has_keys_any?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly _in?: InputMaybe<ReadonlyArray<Scalars['jsonb']>>;
  readonly _is_null?: InputMaybe<Scalars['Boolean']>;
  readonly _lt?: InputMaybe<Scalars['jsonb']>;
  readonly _lte?: InputMaybe<Scalars['jsonb']>;
  readonly _neq?: InputMaybe<Scalars['jsonb']>;
  readonly _nin?: InputMaybe<ReadonlyArray<Scalars['jsonb']>>;
};

/** columns and relationships of "me" */
export type Me = {
  readonly __typename?: 'me';
  readonly ethereumAddress?: Maybe<Scalars['String']>;
  readonly id?: Maybe<Scalars['uuid']>;
  /** An object relationship */
  readonly player?: Maybe<Player>;
  readonly username?: Maybe<Scalars['String']>;
};

/** aggregated selection of "me" */
export type Me_Aggregate = {
  readonly __typename?: 'me_aggregate';
  readonly aggregate?: Maybe<Me_Aggregate_Fields>;
  readonly nodes: ReadonlyArray<Me>;
};

/** aggregate fields of "me" */
export type Me_Aggregate_Fields = {
  readonly __typename?: 'me_aggregate_fields';
  readonly count?: Maybe<Scalars['Int']>;
  readonly max?: Maybe<Me_Max_Fields>;
  readonly min?: Maybe<Me_Min_Fields>;
};


/** aggregate fields of "me" */
export type Me_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<ReadonlyArray<Me_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "me" */
export type Me_Aggregate_Order_By = {
  readonly count?: InputMaybe<Order_By>;
  readonly max?: InputMaybe<Me_Max_Order_By>;
  readonly min?: InputMaybe<Me_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "me". All fields are combined with a logical 'AND'. */
export type Me_Bool_Exp = {
  readonly _and?: InputMaybe<ReadonlyArray<InputMaybe<Me_Bool_Exp>>>;
  readonly _not?: InputMaybe<Me_Bool_Exp>;
  readonly _or?: InputMaybe<ReadonlyArray<InputMaybe<Me_Bool_Exp>>>;
  readonly ethereumAddress?: InputMaybe<String_Comparison_Exp>;
  readonly id?: InputMaybe<Uuid_Comparison_Exp>;
  readonly player?: InputMaybe<Player_Bool_Exp>;
  readonly username?: InputMaybe<String_Comparison_Exp>;
};

/** aggregate max on columns */
export type Me_Max_Fields = {
  readonly __typename?: 'me_max_fields';
  readonly ethereumAddress?: Maybe<Scalars['String']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly username?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "me" */
export type Me_Max_Order_By = {
  readonly ethereumAddress?: InputMaybe<Order_By>;
  readonly id?: InputMaybe<Order_By>;
  readonly username?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Me_Min_Fields = {
  readonly __typename?: 'me_min_fields';
  readonly ethereumAddress?: Maybe<Scalars['String']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly username?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "me" */
export type Me_Min_Order_By = {
  readonly ethereumAddress?: InputMaybe<Order_By>;
  readonly id?: InputMaybe<Order_By>;
  readonly username?: InputMaybe<Order_By>;
};

/** ordering options when selecting data from "me" */
export type Me_Order_By = {
  readonly ethereumAddress?: InputMaybe<Order_By>;
  readonly id?: InputMaybe<Order_By>;
  readonly player?: InputMaybe<Player_Order_By>;
  readonly username?: InputMaybe<Order_By>;
};

/** select columns of table "me" */
export enum Me_Select_Column {
  /** column name */
  EthereumAddress = 'ethereumAddress',
  /** column name */
  Id = 'id',
  /** column name */
  Username = 'username'
}

/** mutation root */
export type Mutation_Root = {
  readonly __typename?: 'mutation_root';
  /** perform the action: "authenticateDiscordGuild" */
  readonly authenticateDiscordGuild?: Maybe<DiscordGuildAuthResponse>;
  /** perform the action: "createQuest" */
  readonly createQuest?: Maybe<CreateQuestOutput>;
  /** perform the action: "createQuestCompletion" */
  readonly createQuestCompletion?: Maybe<CreateQuestCompletionOutput>;
  /** delete data from the table: "AccountType" */
  readonly delete_AccountType?: Maybe<AccountType_Mutation_Response>;
  /** delete single row from the table: "AccountType" */
  readonly delete_AccountType_by_pk?: Maybe<AccountType>;
  /** delete data from the table: "ColorAspect" */
  readonly delete_ColorAspect?: Maybe<ColorAspect_Mutation_Response>;
  /** delete single row from the table: "ColorAspect" */
  readonly delete_ColorAspect_by_pk?: Maybe<ColorAspect>;
  /** delete data from the table: "ExplorerType" */
  readonly delete_ExplorerType?: Maybe<ExplorerType_Mutation_Response>;
  /** delete single row from the table: "ExplorerType" */
  readonly delete_ExplorerType_by_pk?: Maybe<ExplorerType>;
  /** delete data from the table: "GuildStatus" */
  readonly delete_GuildStatus?: Maybe<GuildStatus_Mutation_Response>;
  /** delete single row from the table: "GuildStatus" */
  readonly delete_GuildStatus_by_pk?: Maybe<GuildStatus>;
  /** delete data from the table: "GuildType" */
  readonly delete_GuildType?: Maybe<GuildType_Mutation_Response>;
  /** delete single row from the table: "GuildType" */
  readonly delete_GuildType_by_pk?: Maybe<GuildType>;
  /** delete data from the table: "PlayerRank" */
  readonly delete_PlayerRank?: Maybe<PlayerRank_Mutation_Response>;
  /** delete single row from the table: "PlayerRank" */
  readonly delete_PlayerRank_by_pk?: Maybe<PlayerRank>;
  /** delete data from the table: "PlayerRole" */
  readonly delete_PlayerRole?: Maybe<PlayerRole_Mutation_Response>;
  /** delete single row from the table: "PlayerRole" */
  readonly delete_PlayerRole_by_pk?: Maybe<PlayerRole>;
  /** delete data from the table: "QuestCompletionStatus" */
  readonly delete_QuestCompletionStatus?: Maybe<QuestCompletionStatus_Mutation_Response>;
  /** delete single row from the table: "QuestCompletionStatus" */
  readonly delete_QuestCompletionStatus_by_pk?: Maybe<QuestCompletionStatus>;
  /** delete data from the table: "QuestRepetition" */
  readonly delete_QuestRepetition?: Maybe<QuestRepetition_Mutation_Response>;
  /** delete single row from the table: "QuestRepetition" */
  readonly delete_QuestRepetition_by_pk?: Maybe<QuestRepetition>;
  /** delete data from the table: "QuestStatus" */
  readonly delete_QuestStatus?: Maybe<QuestStatus_Mutation_Response>;
  /** delete single row from the table: "QuestStatus" */
  readonly delete_QuestStatus_by_pk?: Maybe<QuestStatus>;
  /** delete data from the table: "SkillCategory" */
  readonly delete_SkillCategory?: Maybe<SkillCategory_Mutation_Response>;
  /** delete single row from the table: "SkillCategory" */
  readonly delete_SkillCategory_by_pk?: Maybe<SkillCategory>;
  /** delete data from the table: "balance" */
  readonly delete_balance?: Maybe<Balance_Mutation_Response>;
  /** delete single row from the table: "balance" */
  readonly delete_balance_by_pk?: Maybe<Balance>;
  /** delete data from the table: "dao" */
  readonly delete_dao?: Maybe<Dao_Mutation_Response>;
  /** delete single row from the table: "dao" */
  readonly delete_dao_by_pk?: Maybe<Dao>;
  /** delete data from the table: "dao_player" */
  readonly delete_dao_player?: Maybe<Dao_Player_Mutation_Response>;
  /** delete single row from the table: "dao_player" */
  readonly delete_dao_player_by_pk?: Maybe<Dao_Player>;
  /** delete data from the table: "guild" */
  readonly delete_guild?: Maybe<Guild_Mutation_Response>;
  /** delete single row from the table: "guild" */
  readonly delete_guild_by_pk?: Maybe<Guild>;
  /** delete data from the table: "guild_metadata" */
  readonly delete_guild_metadata?: Maybe<Guild_Metadata_Mutation_Response>;
  /** delete single row from the table: "guild_metadata" */
  readonly delete_guild_metadata_by_pk?: Maybe<Guild_Metadata>;
  /** delete data from the table: "guild_player" */
  readonly delete_guild_player?: Maybe<Guild_Player_Mutation_Response>;
  /** delete single row from the table: "guild_player" */
  readonly delete_guild_player_by_pk?: Maybe<Guild_Player>;
  /** delete data from the table: "player" */
  readonly delete_player?: Maybe<Player_Mutation_Response>;
  /** delete data from the table: "player_account" */
  readonly delete_player_account?: Maybe<Player_Account_Mutation_Response>;
  /** delete single row from the table: "player" */
  readonly delete_player_by_pk?: Maybe<Player>;
  /** delete data from the table: "player_role" */
  readonly delete_player_role?: Maybe<Player_Role_Mutation_Response>;
  /** delete single row from the table: "player_role" */
  readonly delete_player_role_by_pk?: Maybe<Player_Role>;
  /** delete data from the table: "player_skill" */
  readonly delete_player_skill?: Maybe<Player_Skill_Mutation_Response>;
  /** delete single row from the table: "player_skill" */
  readonly delete_player_skill_by_pk?: Maybe<Player_Skill>;
  /** delete data from the table: "profile" */
  readonly delete_profile?: Maybe<Profile_Mutation_Response>;
  /** delete single row from the table: "profile" */
  readonly delete_profile_by_pk?: Maybe<Profile>;
  /** delete data from the table: "quest" */
  readonly delete_quest?: Maybe<Quest_Mutation_Response>;
  /** delete single row from the table: "quest" */
  readonly delete_quest_by_pk?: Maybe<Quest>;
  /** delete data from the table: "quest_completion" */
  readonly delete_quest_completion?: Maybe<Quest_Completion_Mutation_Response>;
  /** delete single row from the table: "quest_completion" */
  readonly delete_quest_completion_by_pk?: Maybe<Quest_Completion>;
  /** delete data from the table: "quest_role" */
  readonly delete_quest_role?: Maybe<Quest_Role_Mutation_Response>;
  /** delete single row from the table: "quest_role" */
  readonly delete_quest_role_by_pk?: Maybe<Quest_Role>;
  /** delete data from the table: "quest_skill" */
  readonly delete_quest_skill?: Maybe<Quest_Skill_Mutation_Response>;
  /** delete single row from the table: "quest_skill" */
  readonly delete_quest_skill_by_pk?: Maybe<Quest_Skill>;
  /** delete data from the table: "skill" */
  readonly delete_skill?: Maybe<Skill_Mutation_Response>;
  /** delete single row from the table: "skill" */
  readonly delete_skill_by_pk?: Maybe<Skill>;
  /** delete data from the table: "token" */
  readonly delete_token?: Maybe<Token_Mutation_Response>;
  /** delete single row from the table: "token" */
  readonly delete_token_by_pk?: Maybe<Token>;
  /** delete data from the table: "xp" */
  readonly delete_xp?: Maybe<Xp_Mutation_Response>;
  /** delete single row from the table: "xp" */
  readonly delete_xp_by_pk?: Maybe<Xp>;
  /** insert data into the table: "AccountType" */
  readonly insert_AccountType?: Maybe<AccountType_Mutation_Response>;
  /** insert a single row into the table: "AccountType" */
  readonly insert_AccountType_one?: Maybe<AccountType>;
  /** insert data into the table: "ColorAspect" */
  readonly insert_ColorAspect?: Maybe<ColorAspect_Mutation_Response>;
  /** insert a single row into the table: "ColorAspect" */
  readonly insert_ColorAspect_one?: Maybe<ColorAspect>;
  /** insert data into the table: "ExplorerType" */
  readonly insert_ExplorerType?: Maybe<ExplorerType_Mutation_Response>;
  /** insert a single row into the table: "ExplorerType" */
  readonly insert_ExplorerType_one?: Maybe<ExplorerType>;
  /** insert data into the table: "GuildStatus" */
  readonly insert_GuildStatus?: Maybe<GuildStatus_Mutation_Response>;
  /** insert a single row into the table: "GuildStatus" */
  readonly insert_GuildStatus_one?: Maybe<GuildStatus>;
  /** insert data into the table: "GuildType" */
  readonly insert_GuildType?: Maybe<GuildType_Mutation_Response>;
  /** insert a single row into the table: "GuildType" */
  readonly insert_GuildType_one?: Maybe<GuildType>;
  /** insert data into the table: "PlayerRank" */
  readonly insert_PlayerRank?: Maybe<PlayerRank_Mutation_Response>;
  /** insert a single row into the table: "PlayerRank" */
  readonly insert_PlayerRank_one?: Maybe<PlayerRank>;
  /** insert data into the table: "PlayerRole" */
  readonly insert_PlayerRole?: Maybe<PlayerRole_Mutation_Response>;
  /** insert a single row into the table: "PlayerRole" */
  readonly insert_PlayerRole_one?: Maybe<PlayerRole>;
  /** insert data into the table: "QuestCompletionStatus" */
  readonly insert_QuestCompletionStatus?: Maybe<QuestCompletionStatus_Mutation_Response>;
  /** insert a single row into the table: "QuestCompletionStatus" */
  readonly insert_QuestCompletionStatus_one?: Maybe<QuestCompletionStatus>;
  /** insert data into the table: "QuestRepetition" */
  readonly insert_QuestRepetition?: Maybe<QuestRepetition_Mutation_Response>;
  /** insert a single row into the table: "QuestRepetition" */
  readonly insert_QuestRepetition_one?: Maybe<QuestRepetition>;
  /** insert data into the table: "QuestStatus" */
  readonly insert_QuestStatus?: Maybe<QuestStatus_Mutation_Response>;
  /** insert a single row into the table: "QuestStatus" */
  readonly insert_QuestStatus_one?: Maybe<QuestStatus>;
  /** insert data into the table: "SkillCategory" */
  readonly insert_SkillCategory?: Maybe<SkillCategory_Mutation_Response>;
  /** insert a single row into the table: "SkillCategory" */
  readonly insert_SkillCategory_one?: Maybe<SkillCategory>;
  /** insert data into the table: "balance" */
  readonly insert_balance?: Maybe<Balance_Mutation_Response>;
  /** insert a single row into the table: "balance" */
  readonly insert_balance_one?: Maybe<Balance>;
  /** insert data into the table: "dao" */
  readonly insert_dao?: Maybe<Dao_Mutation_Response>;
  /** insert a single row into the table: "dao" */
  readonly insert_dao_one?: Maybe<Dao>;
  /** insert data into the table: "dao_player" */
  readonly insert_dao_player?: Maybe<Dao_Player_Mutation_Response>;
  /** insert a single row into the table: "dao_player" */
  readonly insert_dao_player_one?: Maybe<Dao_Player>;
  /** insert data into the table: "guild" */
  readonly insert_guild?: Maybe<Guild_Mutation_Response>;
  /** insert data into the table: "guild_metadata" */
  readonly insert_guild_metadata?: Maybe<Guild_Metadata_Mutation_Response>;
  /** insert a single row into the table: "guild_metadata" */
  readonly insert_guild_metadata_one?: Maybe<Guild_Metadata>;
  /** insert a single row into the table: "guild" */
  readonly insert_guild_one?: Maybe<Guild>;
  /** insert data into the table: "guild_player" */
  readonly insert_guild_player?: Maybe<Guild_Player_Mutation_Response>;
  /** insert a single row into the table: "guild_player" */
  readonly insert_guild_player_one?: Maybe<Guild_Player>;
  /** insert data into the table: "player" */
  readonly insert_player?: Maybe<Player_Mutation_Response>;
  /** insert data into the table: "player_account" */
  readonly insert_player_account?: Maybe<Player_Account_Mutation_Response>;
  /** insert a single row into the table: "player_account" */
  readonly insert_player_account_one?: Maybe<Player_Account>;
  /** insert a single row into the table: "player" */
  readonly insert_player_one?: Maybe<Player>;
  /** insert data into the table: "player_role" */
  readonly insert_player_role?: Maybe<Player_Role_Mutation_Response>;
  /** insert a single row into the table: "player_role" */
  readonly insert_player_role_one?: Maybe<Player_Role>;
  /** insert data into the table: "player_skill" */
  readonly insert_player_skill?: Maybe<Player_Skill_Mutation_Response>;
  /** insert a single row into the table: "player_skill" */
  readonly insert_player_skill_one?: Maybe<Player_Skill>;
  /** insert data into the table: "profile" */
  readonly insert_profile?: Maybe<Profile_Mutation_Response>;
  /** insert a single row into the table: "profile" */
  readonly insert_profile_one?: Maybe<Profile>;
  /** insert data into the table: "quest" */
  readonly insert_quest?: Maybe<Quest_Mutation_Response>;
  /** insert data into the table: "quest_completion" */
  readonly insert_quest_completion?: Maybe<Quest_Completion_Mutation_Response>;
  /** insert a single row into the table: "quest_completion" */
  readonly insert_quest_completion_one?: Maybe<Quest_Completion>;
  /** insert a single row into the table: "quest" */
  readonly insert_quest_one?: Maybe<Quest>;
  /** insert data into the table: "quest_role" */
  readonly insert_quest_role?: Maybe<Quest_Role_Mutation_Response>;
  /** insert a single row into the table: "quest_role" */
  readonly insert_quest_role_one?: Maybe<Quest_Role>;
  /** insert data into the table: "quest_skill" */
  readonly insert_quest_skill?: Maybe<Quest_Skill_Mutation_Response>;
  /** insert a single row into the table: "quest_skill" */
  readonly insert_quest_skill_one?: Maybe<Quest_Skill>;
  /** insert data into the table: "skill" */
  readonly insert_skill?: Maybe<Skill_Mutation_Response>;
  /** insert a single row into the table: "skill" */
  readonly insert_skill_one?: Maybe<Skill>;
  /** insert data into the table: "token" */
  readonly insert_token?: Maybe<Token_Mutation_Response>;
  /** insert a single row into the table: "token" */
  readonly insert_token_one?: Maybe<Token>;
  /** insert data into the table: "xp" */
  readonly insert_xp?: Maybe<Xp_Mutation_Response>;
  /** insert a single row into the table: "xp" */
  readonly insert_xp_one?: Maybe<Xp>;
  /** perform the action: "saveGuildInformation" */
  readonly saveGuildInformation?: Maybe<SaveGuildResponse>;
  /** perform the action: "saveGuildLayout" */
  readonly saveGuildLayout?: Maybe<SaveGuildLayoutResponse>;
  /** perform the action: "syncAllGuildDiscordMembers" */
  readonly syncAllGuildDiscordMembers?: Maybe<ReadonlyArray<Maybe<DiscordGuildsSyncOutput>>>;
  /** perform the action: "syncSourceCredAccounts" */
  readonly syncSourceCredAccounts?: Maybe<SourceCredSyncOutput>;
  /** perform the action: "updateExpiredIDXProfiles" */
  readonly updateExpiredIDXProfiles?: Maybe<ExpiredPlayerProfiles>;
  /** perform the action: "updateIDXProfile" */
  readonly updateIDXProfile: Scalars['uuid'];
  /** perform the action: "updateQuestCompletion" */
  readonly updateQuestCompletion?: Maybe<UpdateQuestCompletionOutput>;
  /** update data of the table: "AccountType" */
  readonly update_AccountType?: Maybe<AccountType_Mutation_Response>;
  /** update single row of the table: "AccountType" */
  readonly update_AccountType_by_pk?: Maybe<AccountType>;
  /** update data of the table: "ColorAspect" */
  readonly update_ColorAspect?: Maybe<ColorAspect_Mutation_Response>;
  /** update single row of the table: "ColorAspect" */
  readonly update_ColorAspect_by_pk?: Maybe<ColorAspect>;
  /** update data of the table: "ExplorerType" */
  readonly update_ExplorerType?: Maybe<ExplorerType_Mutation_Response>;
  /** update single row of the table: "ExplorerType" */
  readonly update_ExplorerType_by_pk?: Maybe<ExplorerType>;
  /** update data of the table: "GuildStatus" */
  readonly update_GuildStatus?: Maybe<GuildStatus_Mutation_Response>;
  /** update single row of the table: "GuildStatus" */
  readonly update_GuildStatus_by_pk?: Maybe<GuildStatus>;
  /** update data of the table: "GuildType" */
  readonly update_GuildType?: Maybe<GuildType_Mutation_Response>;
  /** update single row of the table: "GuildType" */
  readonly update_GuildType_by_pk?: Maybe<GuildType>;
  /** update data of the table: "PlayerRank" */
  readonly update_PlayerRank?: Maybe<PlayerRank_Mutation_Response>;
  /** update single row of the table: "PlayerRank" */
  readonly update_PlayerRank_by_pk?: Maybe<PlayerRank>;
  /** update data of the table: "PlayerRole" */
  readonly update_PlayerRole?: Maybe<PlayerRole_Mutation_Response>;
  /** update single row of the table: "PlayerRole" */
  readonly update_PlayerRole_by_pk?: Maybe<PlayerRole>;
  /** update data of the table: "QuestCompletionStatus" */
  readonly update_QuestCompletionStatus?: Maybe<QuestCompletionStatus_Mutation_Response>;
  /** update single row of the table: "QuestCompletionStatus" */
  readonly update_QuestCompletionStatus_by_pk?: Maybe<QuestCompletionStatus>;
  /** update data of the table: "QuestRepetition" */
  readonly update_QuestRepetition?: Maybe<QuestRepetition_Mutation_Response>;
  /** update single row of the table: "QuestRepetition" */
  readonly update_QuestRepetition_by_pk?: Maybe<QuestRepetition>;
  /** update data of the table: "QuestStatus" */
  readonly update_QuestStatus?: Maybe<QuestStatus_Mutation_Response>;
  /** update single row of the table: "QuestStatus" */
  readonly update_QuestStatus_by_pk?: Maybe<QuestStatus>;
  /** update data of the table: "SkillCategory" */
  readonly update_SkillCategory?: Maybe<SkillCategory_Mutation_Response>;
  /** update single row of the table: "SkillCategory" */
  readonly update_SkillCategory_by_pk?: Maybe<SkillCategory>;
  /** update data of the table: "balance" */
  readonly update_balance?: Maybe<Balance_Mutation_Response>;
  /** update single row of the table: "balance" */
  readonly update_balance_by_pk?: Maybe<Balance>;
  /** update data of the table: "dao" */
  readonly update_dao?: Maybe<Dao_Mutation_Response>;
  /** update single row of the table: "dao" */
  readonly update_dao_by_pk?: Maybe<Dao>;
  /** update data of the table: "dao_player" */
  readonly update_dao_player?: Maybe<Dao_Player_Mutation_Response>;
  /** update single row of the table: "dao_player" */
  readonly update_dao_player_by_pk?: Maybe<Dao_Player>;
  /** update data of the table: "guild" */
  readonly update_guild?: Maybe<Guild_Mutation_Response>;
  /** update single row of the table: "guild" */
  readonly update_guild_by_pk?: Maybe<Guild>;
  /** update data of the table: "guild_metadata" */
  readonly update_guild_metadata?: Maybe<Guild_Metadata_Mutation_Response>;
  /** update single row of the table: "guild_metadata" */
  readonly update_guild_metadata_by_pk?: Maybe<Guild_Metadata>;
  /** update data of the table: "guild_player" */
  readonly update_guild_player?: Maybe<Guild_Player_Mutation_Response>;
  /** update single row of the table: "guild_player" */
  readonly update_guild_player_by_pk?: Maybe<Guild_Player>;
  /** update data of the table: "player" */
  readonly update_player?: Maybe<Player_Mutation_Response>;
  /** update data of the table: "player_account" */
  readonly update_player_account?: Maybe<Player_Account_Mutation_Response>;
  /** update single row of the table: "player" */
  readonly update_player_by_pk?: Maybe<Player>;
  /** update data of the table: "player_role" */
  readonly update_player_role?: Maybe<Player_Role_Mutation_Response>;
  /** update single row of the table: "player_role" */
  readonly update_player_role_by_pk?: Maybe<Player_Role>;
  /** update data of the table: "player_skill" */
  readonly update_player_skill?: Maybe<Player_Skill_Mutation_Response>;
  /** update single row of the table: "player_skill" */
  readonly update_player_skill_by_pk?: Maybe<Player_Skill>;
  /** update data of the table: "profile" */
  readonly update_profile?: Maybe<Profile_Mutation_Response>;
  /** update single row of the table: "profile" */
  readonly update_profile_by_pk?: Maybe<Profile>;
  /** update data of the table: "quest" */
  readonly update_quest?: Maybe<Quest_Mutation_Response>;
  /** update single row of the table: "quest" */
  readonly update_quest_by_pk?: Maybe<Quest>;
  /** update data of the table: "quest_completion" */
  readonly update_quest_completion?: Maybe<Quest_Completion_Mutation_Response>;
  /** update single row of the table: "quest_completion" */
  readonly update_quest_completion_by_pk?: Maybe<Quest_Completion>;
  /** update data of the table: "quest_role" */
  readonly update_quest_role?: Maybe<Quest_Role_Mutation_Response>;
  /** update single row of the table: "quest_role" */
  readonly update_quest_role_by_pk?: Maybe<Quest_Role>;
  /** update data of the table: "quest_skill" */
  readonly update_quest_skill?: Maybe<Quest_Skill_Mutation_Response>;
  /** update single row of the table: "quest_skill" */
  readonly update_quest_skill_by_pk?: Maybe<Quest_Skill>;
  /** update data of the table: "skill" */
  readonly update_skill?: Maybe<Skill_Mutation_Response>;
  /** update single row of the table: "skill" */
  readonly update_skill_by_pk?: Maybe<Skill>;
  /** update data of the table: "token" */
  readonly update_token?: Maybe<Token_Mutation_Response>;
  /** update single row of the table: "token" */
  readonly update_token_by_pk?: Maybe<Token>;
  /** update data of the table: "xp" */
  readonly update_xp?: Maybe<Xp_Mutation_Response>;
  /** update single row of the table: "xp" */
  readonly update_xp_by_pk?: Maybe<Xp>;
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
  objects: ReadonlyArray<AccountType_Insert_Input>;
  on_conflict?: InputMaybe<AccountType_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_AccountType_OneArgs = {
  object: AccountType_Insert_Input;
  on_conflict?: InputMaybe<AccountType_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ColorAspectArgs = {
  objects: ReadonlyArray<ColorAspect_Insert_Input>;
  on_conflict?: InputMaybe<ColorAspect_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ColorAspect_OneArgs = {
  object: ColorAspect_Insert_Input;
  on_conflict?: InputMaybe<ColorAspect_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ExplorerTypeArgs = {
  objects: ReadonlyArray<ExplorerType_Insert_Input>;
  on_conflict?: InputMaybe<ExplorerType_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ExplorerType_OneArgs = {
  object: ExplorerType_Insert_Input;
  on_conflict?: InputMaybe<ExplorerType_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_GuildStatusArgs = {
  objects: ReadonlyArray<GuildStatus_Insert_Input>;
  on_conflict?: InputMaybe<GuildStatus_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_GuildStatus_OneArgs = {
  object: GuildStatus_Insert_Input;
  on_conflict?: InputMaybe<GuildStatus_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_GuildTypeArgs = {
  objects: ReadonlyArray<GuildType_Insert_Input>;
  on_conflict?: InputMaybe<GuildType_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_GuildType_OneArgs = {
  object: GuildType_Insert_Input;
  on_conflict?: InputMaybe<GuildType_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_PlayerRankArgs = {
  objects: ReadonlyArray<PlayerRank_Insert_Input>;
  on_conflict?: InputMaybe<PlayerRank_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_PlayerRank_OneArgs = {
  object: PlayerRank_Insert_Input;
  on_conflict?: InputMaybe<PlayerRank_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_PlayerRoleArgs = {
  objects: ReadonlyArray<PlayerRole_Insert_Input>;
  on_conflict?: InputMaybe<PlayerRole_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_PlayerRole_OneArgs = {
  object: PlayerRole_Insert_Input;
  on_conflict?: InputMaybe<PlayerRole_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_QuestCompletionStatusArgs = {
  objects: ReadonlyArray<QuestCompletionStatus_Insert_Input>;
  on_conflict?: InputMaybe<QuestCompletionStatus_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_QuestCompletionStatus_OneArgs = {
  object: QuestCompletionStatus_Insert_Input;
  on_conflict?: InputMaybe<QuestCompletionStatus_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_QuestRepetitionArgs = {
  objects: ReadonlyArray<QuestRepetition_Insert_Input>;
  on_conflict?: InputMaybe<QuestRepetition_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_QuestRepetition_OneArgs = {
  object: QuestRepetition_Insert_Input;
  on_conflict?: InputMaybe<QuestRepetition_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_QuestStatusArgs = {
  objects: ReadonlyArray<QuestStatus_Insert_Input>;
  on_conflict?: InputMaybe<QuestStatus_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_QuestStatus_OneArgs = {
  object: QuestStatus_Insert_Input;
  on_conflict?: InputMaybe<QuestStatus_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_SkillCategoryArgs = {
  objects: ReadonlyArray<SkillCategory_Insert_Input>;
  on_conflict?: InputMaybe<SkillCategory_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_SkillCategory_OneArgs = {
  object: SkillCategory_Insert_Input;
  on_conflict?: InputMaybe<SkillCategory_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_BalanceArgs = {
  objects: ReadonlyArray<Balance_Insert_Input>;
  on_conflict?: InputMaybe<Balance_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Balance_OneArgs = {
  object: Balance_Insert_Input;
  on_conflict?: InputMaybe<Balance_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_DaoArgs = {
  objects: ReadonlyArray<Dao_Insert_Input>;
  on_conflict?: InputMaybe<Dao_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Dao_OneArgs = {
  object: Dao_Insert_Input;
  on_conflict?: InputMaybe<Dao_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Dao_PlayerArgs = {
  objects: ReadonlyArray<Dao_Player_Insert_Input>;
  on_conflict?: InputMaybe<Dao_Player_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Dao_Player_OneArgs = {
  object: Dao_Player_Insert_Input;
  on_conflict?: InputMaybe<Dao_Player_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_GuildArgs = {
  objects: ReadonlyArray<Guild_Insert_Input>;
  on_conflict?: InputMaybe<Guild_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Guild_MetadataArgs = {
  objects: ReadonlyArray<Guild_Metadata_Insert_Input>;
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
  objects: ReadonlyArray<Guild_Player_Insert_Input>;
  on_conflict?: InputMaybe<Guild_Player_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Guild_Player_OneArgs = {
  object: Guild_Player_Insert_Input;
  on_conflict?: InputMaybe<Guild_Player_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_PlayerArgs = {
  objects: ReadonlyArray<Player_Insert_Input>;
  on_conflict?: InputMaybe<Player_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Player_AccountArgs = {
  objects: ReadonlyArray<Player_Account_Insert_Input>;
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
  objects: ReadonlyArray<Player_Role_Insert_Input>;
  on_conflict?: InputMaybe<Player_Role_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Player_Role_OneArgs = {
  object: Player_Role_Insert_Input;
  on_conflict?: InputMaybe<Player_Role_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Player_SkillArgs = {
  objects: ReadonlyArray<Player_Skill_Insert_Input>;
  on_conflict?: InputMaybe<Player_Skill_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Player_Skill_OneArgs = {
  object: Player_Skill_Insert_Input;
  on_conflict?: InputMaybe<Player_Skill_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ProfileArgs = {
  objects: ReadonlyArray<Profile_Insert_Input>;
  on_conflict?: InputMaybe<Profile_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Profile_OneArgs = {
  object: Profile_Insert_Input;
  on_conflict?: InputMaybe<Profile_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_QuestArgs = {
  objects: ReadonlyArray<Quest_Insert_Input>;
  on_conflict?: InputMaybe<Quest_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Quest_CompletionArgs = {
  objects: ReadonlyArray<Quest_Completion_Insert_Input>;
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
  objects: ReadonlyArray<Quest_Role_Insert_Input>;
  on_conflict?: InputMaybe<Quest_Role_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Quest_Role_OneArgs = {
  object: Quest_Role_Insert_Input;
  on_conflict?: InputMaybe<Quest_Role_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Quest_SkillArgs = {
  objects: ReadonlyArray<Quest_Skill_Insert_Input>;
  on_conflict?: InputMaybe<Quest_Skill_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Quest_Skill_OneArgs = {
  object: Quest_Skill_Insert_Input;
  on_conflict?: InputMaybe<Quest_Skill_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_SkillArgs = {
  objects: ReadonlyArray<Skill_Insert_Input>;
  on_conflict?: InputMaybe<Skill_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Skill_OneArgs = {
  object: Skill_Insert_Input;
  on_conflict?: InputMaybe<Skill_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_TokenArgs = {
  objects: ReadonlyArray<Token_Insert_Input>;
  on_conflict?: InputMaybe<Token_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Token_OneArgs = {
  object: Token_Insert_Input;
  on_conflict?: InputMaybe<Token_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_XpArgs = {
  objects: ReadonlyArray<Xp_Insert_Input>;
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
  readonly _eq?: InputMaybe<Scalars['numeric']>;
  readonly _gt?: InputMaybe<Scalars['numeric']>;
  readonly _gte?: InputMaybe<Scalars['numeric']>;
  readonly _in?: InputMaybe<ReadonlyArray<Scalars['numeric']>>;
  readonly _is_null?: InputMaybe<Scalars['Boolean']>;
  readonly _lt?: InputMaybe<Scalars['numeric']>;
  readonly _lte?: InputMaybe<Scalars['numeric']>;
  readonly _neq?: InputMaybe<Scalars['numeric']>;
  readonly _nin?: InputMaybe<ReadonlyArray<Scalars['numeric']>>;
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
  DescNullsLast = 'desc_nulls_last'
}

/** columns and relationships of "player" */
export type Player = {
  readonly __typename?: 'player';
  /** An array relationship */
  readonly accounts: ReadonlyArray<Player_Account>;
  /** An aggregated array relationship */
  readonly accounts_aggregate: Player_Account_Aggregate;
  /** Remote relationship field */
  readonly brightid_status?: Maybe<BrightIdStatus>;
  readonly createdAt?: Maybe<Scalars['timestamptz']>;
  /** Remote relationship field */
  readonly daohausMemberships: ReadonlyArray<Member>;
  /** An array relationship */
  readonly daos: ReadonlyArray<Dao_Player>;
  /** An aggregated array relationship */
  readonly daos_aggregate: Dao_Player_Aggregate;
  readonly dashboardLayout?: Maybe<Scalars['String']>;
  readonly discordId?: Maybe<Scalars['String']>;
  readonly ethereumAddress: Scalars['String'];
  /** An array relationship */
  readonly guilds: ReadonlyArray<Guild_Player>;
  /** An aggregated array relationship */
  readonly guilds_aggregate: Guild_Player_Aggregate;
  readonly id: Scalars['uuid'];
  /** An object relationship */
  readonly profile?: Maybe<Profile>;
  readonly profileLayout?: Maybe<Scalars['String']>;
  /** An array relationship */
  readonly quest_completions: ReadonlyArray<Quest_Completion>;
  /** An aggregated array relationship */
  readonly quest_completions_aggregate: Quest_Completion_Aggregate;
  /** An array relationship */
  readonly quests: ReadonlyArray<Quest>;
  /** An aggregated array relationship */
  readonly quests_aggregate: Quest_Aggregate;
  readonly rank?: Maybe<PlayerRank_Enum>;
  readonly role?: Maybe<Scalars['String']>;
  /** An array relationship */
  readonly roles: ReadonlyArray<Player_Role>;
  /** An aggregated array relationship */
  readonly roles_aggregate: Player_Role_Aggregate;
  readonly seasonXP: Scalars['numeric'];
  /** An array relationship */
  readonly skills: ReadonlyArray<Player_Skill>;
  /** An aggregated array relationship */
  readonly skills_aggregate: Player_Skill_Aggregate;
  /** Remote relationship field */
  readonly token_balances?: Maybe<TokenBalances>;
  readonly totalXP?: Maybe<Scalars['numeric']>;
  readonly updatedAt?: Maybe<Scalars['timestamptz']>;
};


/** columns and relationships of "player" */
export type PlayerAccountsArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Player_Account_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Player_Account_Order_By>>;
  where?: InputMaybe<Player_Account_Bool_Exp>;
};


/** columns and relationships of "player" */
export type PlayerAccounts_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Player_Account_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Player_Account_Order_By>>;
  where?: InputMaybe<Player_Account_Bool_Exp>;
};


/** columns and relationships of "player" */
export type PlayerDaosArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Dao_Player_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Dao_Player_Order_By>>;
  where?: InputMaybe<Dao_Player_Bool_Exp>;
};


/** columns and relationships of "player" */
export type PlayerDaos_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Dao_Player_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Dao_Player_Order_By>>;
  where?: InputMaybe<Dao_Player_Bool_Exp>;
};


/** columns and relationships of "player" */
export type PlayerGuildsArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Guild_Player_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Guild_Player_Order_By>>;
  where?: InputMaybe<Guild_Player_Bool_Exp>;
};


/** columns and relationships of "player" */
export type PlayerGuilds_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Guild_Player_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Guild_Player_Order_By>>;
  where?: InputMaybe<Guild_Player_Bool_Exp>;
};


/** columns and relationships of "player" */
export type PlayerQuest_CompletionsArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Quest_Completion_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Quest_Completion_Order_By>>;
  where?: InputMaybe<Quest_Completion_Bool_Exp>;
};


/** columns and relationships of "player" */
export type PlayerQuest_Completions_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Quest_Completion_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Quest_Completion_Order_By>>;
  where?: InputMaybe<Quest_Completion_Bool_Exp>;
};


/** columns and relationships of "player" */
export type PlayerQuestsArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Quest_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Quest_Order_By>>;
  where?: InputMaybe<Quest_Bool_Exp>;
};


/** columns and relationships of "player" */
export type PlayerQuests_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Quest_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Quest_Order_By>>;
  where?: InputMaybe<Quest_Bool_Exp>;
};


/** columns and relationships of "player" */
export type PlayerRolesArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Player_Role_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Player_Role_Order_By>>;
  where?: InputMaybe<Player_Role_Bool_Exp>;
};


/** columns and relationships of "player" */
export type PlayerRoles_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Player_Role_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Player_Role_Order_By>>;
  where?: InputMaybe<Player_Role_Bool_Exp>;
};


/** columns and relationships of "player" */
export type PlayerSkillsArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Player_Skill_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Player_Skill_Order_By>>;
  where?: InputMaybe<Player_Skill_Bool_Exp>;
};


/** columns and relationships of "player" */
export type PlayerSkills_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Player_Skill_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Player_Skill_Order_By>>;
  where?: InputMaybe<Player_Skill_Bool_Exp>;
};

/** columns and relationships of "player_account" */
export type Player_Account = {
  readonly __typename?: 'player_account';
  /** An object relationship */
  readonly Player: Player;
  readonly identifier: Scalars['String'];
  readonly playerId: Scalars['uuid'];
  readonly type: AccountType_Enum;
};

/** aggregated selection of "player_account" */
export type Player_Account_Aggregate = {
  readonly __typename?: 'player_account_aggregate';
  readonly aggregate?: Maybe<Player_Account_Aggregate_Fields>;
  readonly nodes: ReadonlyArray<Player_Account>;
};

/** aggregate fields of "player_account" */
export type Player_Account_Aggregate_Fields = {
  readonly __typename?: 'player_account_aggregate_fields';
  readonly count?: Maybe<Scalars['Int']>;
  readonly max?: Maybe<Player_Account_Max_Fields>;
  readonly min?: Maybe<Player_Account_Min_Fields>;
};


/** aggregate fields of "player_account" */
export type Player_Account_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<ReadonlyArray<Player_Account_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "player_account" */
export type Player_Account_Aggregate_Order_By = {
  readonly count?: InputMaybe<Order_By>;
  readonly max?: InputMaybe<Player_Account_Max_Order_By>;
  readonly min?: InputMaybe<Player_Account_Min_Order_By>;
};

/** input type for inserting array relation for remote table "player_account" */
export type Player_Account_Arr_Rel_Insert_Input = {
  readonly data: ReadonlyArray<Player_Account_Insert_Input>;
  readonly on_conflict?: InputMaybe<Player_Account_On_Conflict>;
};

/** Boolean expression to filter rows from the table "player_account". All fields are combined with a logical 'AND'. */
export type Player_Account_Bool_Exp = {
  readonly Player?: InputMaybe<Player_Bool_Exp>;
  readonly _and?: InputMaybe<ReadonlyArray<InputMaybe<Player_Account_Bool_Exp>>>;
  readonly _not?: InputMaybe<Player_Account_Bool_Exp>;
  readonly _or?: InputMaybe<ReadonlyArray<InputMaybe<Player_Account_Bool_Exp>>>;
  readonly identifier?: InputMaybe<String_Comparison_Exp>;
  readonly playerId?: InputMaybe<Uuid_Comparison_Exp>;
  readonly type?: InputMaybe<AccountType_Enum_Comparison_Exp>;
};

/** unique or primary key constraints on table "player_account" */
export enum Player_Account_Constraint {
  /** unique or primary key constraint */
  AccountIdentifierTypeKey = 'Account_identifier_type_key'
}

/** input type for inserting data into table "player_account" */
export type Player_Account_Insert_Input = {
  readonly Player?: InputMaybe<Player_Obj_Rel_Insert_Input>;
  readonly identifier?: InputMaybe<Scalars['String']>;
  readonly playerId?: InputMaybe<Scalars['uuid']>;
  readonly type?: InputMaybe<AccountType_Enum>;
};

/** aggregate max on columns */
export type Player_Account_Max_Fields = {
  readonly __typename?: 'player_account_max_fields';
  readonly identifier?: Maybe<Scalars['String']>;
  readonly playerId?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "player_account" */
export type Player_Account_Max_Order_By = {
  readonly identifier?: InputMaybe<Order_By>;
  readonly playerId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Player_Account_Min_Fields = {
  readonly __typename?: 'player_account_min_fields';
  readonly identifier?: Maybe<Scalars['String']>;
  readonly playerId?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "player_account" */
export type Player_Account_Min_Order_By = {
  readonly identifier?: InputMaybe<Order_By>;
  readonly playerId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "player_account" */
export type Player_Account_Mutation_Response = {
  readonly __typename?: 'player_account_mutation_response';
  /** number of affected rows by the mutation */
  readonly affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  readonly returning: ReadonlyArray<Player_Account>;
};

/** input type for inserting object relation for remote table "player_account" */
export type Player_Account_Obj_Rel_Insert_Input = {
  readonly data: Player_Account_Insert_Input;
  readonly on_conflict?: InputMaybe<Player_Account_On_Conflict>;
};

/** on conflict condition type for table "player_account" */
export type Player_Account_On_Conflict = {
  readonly constraint: Player_Account_Constraint;
  readonly update_columns: ReadonlyArray<Player_Account_Update_Column>;
  readonly where?: InputMaybe<Player_Account_Bool_Exp>;
};

/** ordering options when selecting data from "player_account" */
export type Player_Account_Order_By = {
  readonly Player?: InputMaybe<Player_Order_By>;
  readonly identifier?: InputMaybe<Order_By>;
  readonly playerId?: InputMaybe<Order_By>;
  readonly type?: InputMaybe<Order_By>;
};

/** select columns of table "player_account" */
export enum Player_Account_Select_Column {
  /** column name */
  Identifier = 'identifier',
  /** column name */
  PlayerId = 'playerId',
  /** column name */
  Type = 'type'
}

/** input type for updating data in table "player_account" */
export type Player_Account_Set_Input = {
  readonly identifier?: InputMaybe<Scalars['String']>;
  readonly playerId?: InputMaybe<Scalars['uuid']>;
  readonly type?: InputMaybe<AccountType_Enum>;
};

/** update columns of table "player_account" */
export enum Player_Account_Update_Column {
  /** column name */
  Identifier = 'identifier',
  /** column name */
  PlayerId = 'playerId',
  /** column name */
  Type = 'type'
}

/** aggregated selection of "player" */
export type Player_Aggregate = {
  readonly __typename?: 'player_aggregate';
  readonly aggregate?: Maybe<Player_Aggregate_Fields>;
  readonly nodes: ReadonlyArray<Player>;
};

/** aggregate fields of "player" */
export type Player_Aggregate_Fields = {
  readonly __typename?: 'player_aggregate_fields';
  readonly avg?: Maybe<Player_Avg_Fields>;
  readonly count?: Maybe<Scalars['Int']>;
  readonly max?: Maybe<Player_Max_Fields>;
  readonly min?: Maybe<Player_Min_Fields>;
  readonly stddev?: Maybe<Player_Stddev_Fields>;
  readonly stddev_pop?: Maybe<Player_Stddev_Pop_Fields>;
  readonly stddev_samp?: Maybe<Player_Stddev_Samp_Fields>;
  readonly sum?: Maybe<Player_Sum_Fields>;
  readonly var_pop?: Maybe<Player_Var_Pop_Fields>;
  readonly var_samp?: Maybe<Player_Var_Samp_Fields>;
  readonly variance?: Maybe<Player_Variance_Fields>;
};


/** aggregate fields of "player" */
export type Player_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<ReadonlyArray<Player_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "player" */
export type Player_Aggregate_Order_By = {
  readonly avg?: InputMaybe<Player_Avg_Order_By>;
  readonly count?: InputMaybe<Order_By>;
  readonly max?: InputMaybe<Player_Max_Order_By>;
  readonly min?: InputMaybe<Player_Min_Order_By>;
  readonly stddev?: InputMaybe<Player_Stddev_Order_By>;
  readonly stddev_pop?: InputMaybe<Player_Stddev_Pop_Order_By>;
  readonly stddev_samp?: InputMaybe<Player_Stddev_Samp_Order_By>;
  readonly sum?: InputMaybe<Player_Sum_Order_By>;
  readonly var_pop?: InputMaybe<Player_Var_Pop_Order_By>;
  readonly var_samp?: InputMaybe<Player_Var_Samp_Order_By>;
  readonly variance?: InputMaybe<Player_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "player" */
export type Player_Arr_Rel_Insert_Input = {
  readonly data: ReadonlyArray<Player_Insert_Input>;
  readonly on_conflict?: InputMaybe<Player_On_Conflict>;
};

/** aggregate avg on columns */
export type Player_Avg_Fields = {
  readonly __typename?: 'player_avg_fields';
  readonly seasonXP?: Maybe<Scalars['Float']>;
  readonly totalXP?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "player" */
export type Player_Avg_Order_By = {
  readonly seasonXP?: InputMaybe<Order_By>;
  readonly totalXP?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "player". All fields are combined with a logical 'AND'. */
export type Player_Bool_Exp = {
  readonly _and?: InputMaybe<ReadonlyArray<InputMaybe<Player_Bool_Exp>>>;
  readonly _not?: InputMaybe<Player_Bool_Exp>;
  readonly _or?: InputMaybe<ReadonlyArray<InputMaybe<Player_Bool_Exp>>>;
  readonly accounts?: InputMaybe<Player_Account_Bool_Exp>;
  readonly createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  readonly daos?: InputMaybe<Dao_Player_Bool_Exp>;
  readonly dashboardLayout?: InputMaybe<String_Comparison_Exp>;
  readonly discordId?: InputMaybe<String_Comparison_Exp>;
  readonly ethereumAddress?: InputMaybe<String_Comparison_Exp>;
  readonly guilds?: InputMaybe<Guild_Player_Bool_Exp>;
  readonly id?: InputMaybe<Uuid_Comparison_Exp>;
  readonly profile?: InputMaybe<Profile_Bool_Exp>;
  readonly profileLayout?: InputMaybe<String_Comparison_Exp>;
  readonly quest_completions?: InputMaybe<Quest_Completion_Bool_Exp>;
  readonly quests?: InputMaybe<Quest_Bool_Exp>;
  readonly rank?: InputMaybe<PlayerRank_Enum_Comparison_Exp>;
  readonly role?: InputMaybe<String_Comparison_Exp>;
  readonly roles?: InputMaybe<Player_Role_Bool_Exp>;
  readonly seasonXP?: InputMaybe<Numeric_Comparison_Exp>;
  readonly skills?: InputMaybe<Player_Skill_Bool_Exp>;
  readonly totalXP?: InputMaybe<Numeric_Comparison_Exp>;
  readonly updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "player" */
export enum Player_Constraint {
  /** unique or primary key constraint */
  PlayerEthereumAddressUniqueKey = 'Player_ethereum_address_unique_key',
  /** unique or primary key constraint */
  PlayerPkey = 'Player_pkey',
  /** unique or primary key constraint */
  PlayerDiscordIdKey = 'player_discord_id_key'
}

/** input type for incrementing integer column in table "player" */
export type Player_Inc_Input = {
  readonly seasonXP?: InputMaybe<Scalars['numeric']>;
  readonly totalXP?: InputMaybe<Scalars['numeric']>;
};

/** input type for inserting data into table "player" */
export type Player_Insert_Input = {
  readonly accounts?: InputMaybe<Player_Account_Arr_Rel_Insert_Input>;
  readonly createdAt?: InputMaybe<Scalars['timestamptz']>;
  readonly daos?: InputMaybe<Dao_Player_Arr_Rel_Insert_Input>;
  readonly dashboardLayout?: InputMaybe<Scalars['String']>;
  readonly discordId?: InputMaybe<Scalars['String']>;
  readonly ethereumAddress?: InputMaybe<Scalars['String']>;
  readonly guilds?: InputMaybe<Guild_Player_Arr_Rel_Insert_Input>;
  readonly id?: InputMaybe<Scalars['uuid']>;
  readonly profile?: InputMaybe<Profile_Obj_Rel_Insert_Input>;
  readonly profileLayout?: InputMaybe<Scalars['String']>;
  readonly quest_completions?: InputMaybe<Quest_Completion_Arr_Rel_Insert_Input>;
  readonly quests?: InputMaybe<Quest_Arr_Rel_Insert_Input>;
  readonly rank?: InputMaybe<PlayerRank_Enum>;
  readonly role?: InputMaybe<Scalars['String']>;
  readonly roles?: InputMaybe<Player_Role_Arr_Rel_Insert_Input>;
  readonly seasonXP?: InputMaybe<Scalars['numeric']>;
  readonly skills?: InputMaybe<Player_Skill_Arr_Rel_Insert_Input>;
  readonly totalXP?: InputMaybe<Scalars['numeric']>;
  readonly updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Player_Max_Fields = {
  readonly __typename?: 'player_max_fields';
  readonly createdAt?: Maybe<Scalars['timestamptz']>;
  readonly dashboardLayout?: Maybe<Scalars['String']>;
  readonly discordId?: Maybe<Scalars['String']>;
  readonly ethereumAddress?: Maybe<Scalars['String']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly profileLayout?: Maybe<Scalars['String']>;
  readonly role?: Maybe<Scalars['String']>;
  readonly seasonXP?: Maybe<Scalars['numeric']>;
  readonly totalXP?: Maybe<Scalars['numeric']>;
  readonly updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "player" */
export type Player_Max_Order_By = {
  readonly createdAt?: InputMaybe<Order_By>;
  readonly dashboardLayout?: InputMaybe<Order_By>;
  readonly discordId?: InputMaybe<Order_By>;
  readonly ethereumAddress?: InputMaybe<Order_By>;
  readonly id?: InputMaybe<Order_By>;
  readonly profileLayout?: InputMaybe<Order_By>;
  readonly role?: InputMaybe<Order_By>;
  readonly seasonXP?: InputMaybe<Order_By>;
  readonly totalXP?: InputMaybe<Order_By>;
  readonly updatedAt?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Player_Min_Fields = {
  readonly __typename?: 'player_min_fields';
  readonly createdAt?: Maybe<Scalars['timestamptz']>;
  readonly dashboardLayout?: Maybe<Scalars['String']>;
  readonly discordId?: Maybe<Scalars['String']>;
  readonly ethereumAddress?: Maybe<Scalars['String']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly profileLayout?: Maybe<Scalars['String']>;
  readonly role?: Maybe<Scalars['String']>;
  readonly seasonXP?: Maybe<Scalars['numeric']>;
  readonly totalXP?: Maybe<Scalars['numeric']>;
  readonly updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "player" */
export type Player_Min_Order_By = {
  readonly createdAt?: InputMaybe<Order_By>;
  readonly dashboardLayout?: InputMaybe<Order_By>;
  readonly discordId?: InputMaybe<Order_By>;
  readonly ethereumAddress?: InputMaybe<Order_By>;
  readonly id?: InputMaybe<Order_By>;
  readonly profileLayout?: InputMaybe<Order_By>;
  readonly role?: InputMaybe<Order_By>;
  readonly seasonXP?: InputMaybe<Order_By>;
  readonly totalXP?: InputMaybe<Order_By>;
  readonly updatedAt?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "player" */
export type Player_Mutation_Response = {
  readonly __typename?: 'player_mutation_response';
  /** number of affected rows by the mutation */
  readonly affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  readonly returning: ReadonlyArray<Player>;
};

/** input type for inserting object relation for remote table "player" */
export type Player_Obj_Rel_Insert_Input = {
  readonly data: Player_Insert_Input;
  readonly on_conflict?: InputMaybe<Player_On_Conflict>;
};

/** on conflict condition type for table "player" */
export type Player_On_Conflict = {
  readonly constraint: Player_Constraint;
  readonly update_columns: ReadonlyArray<Player_Update_Column>;
  readonly where?: InputMaybe<Player_Bool_Exp>;
};

/** ordering options when selecting data from "player" */
export type Player_Order_By = {
  readonly accounts_aggregate?: InputMaybe<Player_Account_Aggregate_Order_By>;
  readonly createdAt?: InputMaybe<Order_By>;
  readonly daos_aggregate?: InputMaybe<Dao_Player_Aggregate_Order_By>;
  readonly dashboardLayout?: InputMaybe<Order_By>;
  readonly discordId?: InputMaybe<Order_By>;
  readonly ethereumAddress?: InputMaybe<Order_By>;
  readonly guilds_aggregate?: InputMaybe<Guild_Player_Aggregate_Order_By>;
  readonly id?: InputMaybe<Order_By>;
  readonly profile?: InputMaybe<Profile_Order_By>;
  readonly profileLayout?: InputMaybe<Order_By>;
  readonly quest_completions_aggregate?: InputMaybe<Quest_Completion_Aggregate_Order_By>;
  readonly quests_aggregate?: InputMaybe<Quest_Aggregate_Order_By>;
  readonly rank?: InputMaybe<Order_By>;
  readonly role?: InputMaybe<Order_By>;
  readonly roles_aggregate?: InputMaybe<Player_Role_Aggregate_Order_By>;
  readonly seasonXP?: InputMaybe<Order_By>;
  readonly skills_aggregate?: InputMaybe<Player_Skill_Aggregate_Order_By>;
  readonly totalXP?: InputMaybe<Order_By>;
  readonly updatedAt?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "player" */
export type Player_Pk_Columns_Input = {
  readonly id: Scalars['uuid'];
};

/** columns and relationships of "player_role" */
export type Player_Role = {
  readonly __typename?: 'player_role';
  /** An object relationship */
  readonly PlayerRole: PlayerRole;
  readonly player_id: Scalars['uuid'];
  readonly rank: Scalars['Int'];
  readonly role: Scalars['String'];
};

/** aggregated selection of "player_role" */
export type Player_Role_Aggregate = {
  readonly __typename?: 'player_role_aggregate';
  readonly aggregate?: Maybe<Player_Role_Aggregate_Fields>;
  readonly nodes: ReadonlyArray<Player_Role>;
};

/** aggregate fields of "player_role" */
export type Player_Role_Aggregate_Fields = {
  readonly __typename?: 'player_role_aggregate_fields';
  readonly avg?: Maybe<Player_Role_Avg_Fields>;
  readonly count?: Maybe<Scalars['Int']>;
  readonly max?: Maybe<Player_Role_Max_Fields>;
  readonly min?: Maybe<Player_Role_Min_Fields>;
  readonly stddev?: Maybe<Player_Role_Stddev_Fields>;
  readonly stddev_pop?: Maybe<Player_Role_Stddev_Pop_Fields>;
  readonly stddev_samp?: Maybe<Player_Role_Stddev_Samp_Fields>;
  readonly sum?: Maybe<Player_Role_Sum_Fields>;
  readonly var_pop?: Maybe<Player_Role_Var_Pop_Fields>;
  readonly var_samp?: Maybe<Player_Role_Var_Samp_Fields>;
  readonly variance?: Maybe<Player_Role_Variance_Fields>;
};


/** aggregate fields of "player_role" */
export type Player_Role_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<ReadonlyArray<Player_Role_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "player_role" */
export type Player_Role_Aggregate_Order_By = {
  readonly avg?: InputMaybe<Player_Role_Avg_Order_By>;
  readonly count?: InputMaybe<Order_By>;
  readonly max?: InputMaybe<Player_Role_Max_Order_By>;
  readonly min?: InputMaybe<Player_Role_Min_Order_By>;
  readonly stddev?: InputMaybe<Player_Role_Stddev_Order_By>;
  readonly stddev_pop?: InputMaybe<Player_Role_Stddev_Pop_Order_By>;
  readonly stddev_samp?: InputMaybe<Player_Role_Stddev_Samp_Order_By>;
  readonly sum?: InputMaybe<Player_Role_Sum_Order_By>;
  readonly var_pop?: InputMaybe<Player_Role_Var_Pop_Order_By>;
  readonly var_samp?: InputMaybe<Player_Role_Var_Samp_Order_By>;
  readonly variance?: InputMaybe<Player_Role_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "player_role" */
export type Player_Role_Arr_Rel_Insert_Input = {
  readonly data: ReadonlyArray<Player_Role_Insert_Input>;
  readonly on_conflict?: InputMaybe<Player_Role_On_Conflict>;
};

/** aggregate avg on columns */
export type Player_Role_Avg_Fields = {
  readonly __typename?: 'player_role_avg_fields';
  readonly rank?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "player_role" */
export type Player_Role_Avg_Order_By = {
  readonly rank?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "player_role". All fields are combined with a logical 'AND'. */
export type Player_Role_Bool_Exp = {
  readonly PlayerRole?: InputMaybe<PlayerRole_Bool_Exp>;
  readonly _and?: InputMaybe<ReadonlyArray<InputMaybe<Player_Role_Bool_Exp>>>;
  readonly _not?: InputMaybe<Player_Role_Bool_Exp>;
  readonly _or?: InputMaybe<ReadonlyArray<InputMaybe<Player_Role_Bool_Exp>>>;
  readonly player_id?: InputMaybe<Uuid_Comparison_Exp>;
  readonly rank?: InputMaybe<Int_Comparison_Exp>;
  readonly role?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "player_role" */
export enum Player_Role_Constraint {
  /** unique or primary key constraint */
  PlayerRolePkey = 'player_role_pkey'
}

/** input type for incrementing integer column in table "player_role" */
export type Player_Role_Inc_Input = {
  readonly rank?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "player_role" */
export type Player_Role_Insert_Input = {
  readonly PlayerRole?: InputMaybe<PlayerRole_Obj_Rel_Insert_Input>;
  readonly player_id?: InputMaybe<Scalars['uuid']>;
  readonly rank?: InputMaybe<Scalars['Int']>;
  readonly role?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Player_Role_Max_Fields = {
  readonly __typename?: 'player_role_max_fields';
  readonly player_id?: Maybe<Scalars['uuid']>;
  readonly rank?: Maybe<Scalars['Int']>;
  readonly role?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "player_role" */
export type Player_Role_Max_Order_By = {
  readonly player_id?: InputMaybe<Order_By>;
  readonly rank?: InputMaybe<Order_By>;
  readonly role?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Player_Role_Min_Fields = {
  readonly __typename?: 'player_role_min_fields';
  readonly player_id?: Maybe<Scalars['uuid']>;
  readonly rank?: Maybe<Scalars['Int']>;
  readonly role?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "player_role" */
export type Player_Role_Min_Order_By = {
  readonly player_id?: InputMaybe<Order_By>;
  readonly rank?: InputMaybe<Order_By>;
  readonly role?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "player_role" */
export type Player_Role_Mutation_Response = {
  readonly __typename?: 'player_role_mutation_response';
  /** number of affected rows by the mutation */
  readonly affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  readonly returning: ReadonlyArray<Player_Role>;
};

/** input type for inserting object relation for remote table "player_role" */
export type Player_Role_Obj_Rel_Insert_Input = {
  readonly data: Player_Role_Insert_Input;
  readonly on_conflict?: InputMaybe<Player_Role_On_Conflict>;
};

/** on conflict condition type for table "player_role" */
export type Player_Role_On_Conflict = {
  readonly constraint: Player_Role_Constraint;
  readonly update_columns: ReadonlyArray<Player_Role_Update_Column>;
  readonly where?: InputMaybe<Player_Role_Bool_Exp>;
};

/** ordering options when selecting data from "player_role" */
export type Player_Role_Order_By = {
  readonly PlayerRole?: InputMaybe<PlayerRole_Order_By>;
  readonly player_id?: InputMaybe<Order_By>;
  readonly rank?: InputMaybe<Order_By>;
  readonly role?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "player_role" */
export type Player_Role_Pk_Columns_Input = {
  readonly player_id: Scalars['uuid'];
  readonly role: Scalars['String'];
};

/** select columns of table "player_role" */
export enum Player_Role_Select_Column {
  /** column name */
  PlayerId = 'player_id',
  /** column name */
  Rank = 'rank',
  /** column name */
  Role = 'role'
}

/** input type for updating data in table "player_role" */
export type Player_Role_Set_Input = {
  readonly player_id?: InputMaybe<Scalars['uuid']>;
  readonly rank?: InputMaybe<Scalars['Int']>;
  readonly role?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Player_Role_Stddev_Fields = {
  readonly __typename?: 'player_role_stddev_fields';
  readonly rank?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "player_role" */
export type Player_Role_Stddev_Order_By = {
  readonly rank?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Player_Role_Stddev_Pop_Fields = {
  readonly __typename?: 'player_role_stddev_pop_fields';
  readonly rank?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "player_role" */
export type Player_Role_Stddev_Pop_Order_By = {
  readonly rank?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Player_Role_Stddev_Samp_Fields = {
  readonly __typename?: 'player_role_stddev_samp_fields';
  readonly rank?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "player_role" */
export type Player_Role_Stddev_Samp_Order_By = {
  readonly rank?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Player_Role_Sum_Fields = {
  readonly __typename?: 'player_role_sum_fields';
  readonly rank?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "player_role" */
export type Player_Role_Sum_Order_By = {
  readonly rank?: InputMaybe<Order_By>;
};

/** update columns of table "player_role" */
export enum Player_Role_Update_Column {
  /** column name */
  PlayerId = 'player_id',
  /** column name */
  Rank = 'rank',
  /** column name */
  Role = 'role'
}

/** aggregate var_pop on columns */
export type Player_Role_Var_Pop_Fields = {
  readonly __typename?: 'player_role_var_pop_fields';
  readonly rank?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "player_role" */
export type Player_Role_Var_Pop_Order_By = {
  readonly rank?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Player_Role_Var_Samp_Fields = {
  readonly __typename?: 'player_role_var_samp_fields';
  readonly rank?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "player_role" */
export type Player_Role_Var_Samp_Order_By = {
  readonly rank?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Player_Role_Variance_Fields = {
  readonly __typename?: 'player_role_variance_fields';
  readonly rank?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "player_role" */
export type Player_Role_Variance_Order_By = {
  readonly rank?: InputMaybe<Order_By>;
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
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "player" */
export type Player_Set_Input = {
  readonly createdAt?: InputMaybe<Scalars['timestamptz']>;
  readonly dashboardLayout?: InputMaybe<Scalars['String']>;
  readonly discordId?: InputMaybe<Scalars['String']>;
  readonly ethereumAddress?: InputMaybe<Scalars['String']>;
  readonly id?: InputMaybe<Scalars['uuid']>;
  readonly profileLayout?: InputMaybe<Scalars['String']>;
  readonly rank?: InputMaybe<PlayerRank_Enum>;
  readonly role?: InputMaybe<Scalars['String']>;
  readonly seasonXP?: InputMaybe<Scalars['numeric']>;
  readonly totalXP?: InputMaybe<Scalars['numeric']>;
  readonly updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** columns and relationships of "player_skill" */
export type Player_Skill = {
  readonly __typename?: 'player_skill';
  /** An object relationship */
  readonly Skill: Skill;
  readonly id: Scalars['uuid'];
  readonly player_id: Scalars['uuid'];
  readonly rank?: Maybe<Scalars['Int']>;
  readonly skill_id: Scalars['uuid'];
};

/** aggregated selection of "player_skill" */
export type Player_Skill_Aggregate = {
  readonly __typename?: 'player_skill_aggregate';
  readonly aggregate?: Maybe<Player_Skill_Aggregate_Fields>;
  readonly nodes: ReadonlyArray<Player_Skill>;
};

/** aggregate fields of "player_skill" */
export type Player_Skill_Aggregate_Fields = {
  readonly __typename?: 'player_skill_aggregate_fields';
  readonly avg?: Maybe<Player_Skill_Avg_Fields>;
  readonly count?: Maybe<Scalars['Int']>;
  readonly max?: Maybe<Player_Skill_Max_Fields>;
  readonly min?: Maybe<Player_Skill_Min_Fields>;
  readonly stddev?: Maybe<Player_Skill_Stddev_Fields>;
  readonly stddev_pop?: Maybe<Player_Skill_Stddev_Pop_Fields>;
  readonly stddev_samp?: Maybe<Player_Skill_Stddev_Samp_Fields>;
  readonly sum?: Maybe<Player_Skill_Sum_Fields>;
  readonly var_pop?: Maybe<Player_Skill_Var_Pop_Fields>;
  readonly var_samp?: Maybe<Player_Skill_Var_Samp_Fields>;
  readonly variance?: Maybe<Player_Skill_Variance_Fields>;
};


/** aggregate fields of "player_skill" */
export type Player_Skill_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<ReadonlyArray<Player_Skill_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "player_skill" */
export type Player_Skill_Aggregate_Order_By = {
  readonly avg?: InputMaybe<Player_Skill_Avg_Order_By>;
  readonly count?: InputMaybe<Order_By>;
  readonly max?: InputMaybe<Player_Skill_Max_Order_By>;
  readonly min?: InputMaybe<Player_Skill_Min_Order_By>;
  readonly stddev?: InputMaybe<Player_Skill_Stddev_Order_By>;
  readonly stddev_pop?: InputMaybe<Player_Skill_Stddev_Pop_Order_By>;
  readonly stddev_samp?: InputMaybe<Player_Skill_Stddev_Samp_Order_By>;
  readonly sum?: InputMaybe<Player_Skill_Sum_Order_By>;
  readonly var_pop?: InputMaybe<Player_Skill_Var_Pop_Order_By>;
  readonly var_samp?: InputMaybe<Player_Skill_Var_Samp_Order_By>;
  readonly variance?: InputMaybe<Player_Skill_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "player_skill" */
export type Player_Skill_Arr_Rel_Insert_Input = {
  readonly data: ReadonlyArray<Player_Skill_Insert_Input>;
  readonly on_conflict?: InputMaybe<Player_Skill_On_Conflict>;
};

/** aggregate avg on columns */
export type Player_Skill_Avg_Fields = {
  readonly __typename?: 'player_skill_avg_fields';
  readonly rank?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "player_skill" */
export type Player_Skill_Avg_Order_By = {
  readonly rank?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "player_skill". All fields are combined with a logical 'AND'. */
export type Player_Skill_Bool_Exp = {
  readonly Skill?: InputMaybe<Skill_Bool_Exp>;
  readonly _and?: InputMaybe<ReadonlyArray<InputMaybe<Player_Skill_Bool_Exp>>>;
  readonly _not?: InputMaybe<Player_Skill_Bool_Exp>;
  readonly _or?: InputMaybe<ReadonlyArray<InputMaybe<Player_Skill_Bool_Exp>>>;
  readonly id?: InputMaybe<Uuid_Comparison_Exp>;
  readonly player_id?: InputMaybe<Uuid_Comparison_Exp>;
  readonly rank?: InputMaybe<Int_Comparison_Exp>;
  readonly skill_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "player_skill" */
export enum Player_Skill_Constraint {
  /** unique or primary key constraint */
  PlayerSkillPkey = 'player_skill_pkey',
  /** unique or primary key constraint */
  PlayerSkillPlayerIdSkillIdKey = 'player_skill_player_id_skill_id_key'
}

/** input type for incrementing integer column in table "player_skill" */
export type Player_Skill_Inc_Input = {
  readonly rank?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "player_skill" */
export type Player_Skill_Insert_Input = {
  readonly Skill?: InputMaybe<Skill_Obj_Rel_Insert_Input>;
  readonly id?: InputMaybe<Scalars['uuid']>;
  readonly player_id?: InputMaybe<Scalars['uuid']>;
  readonly rank?: InputMaybe<Scalars['Int']>;
  readonly skill_id?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Player_Skill_Max_Fields = {
  readonly __typename?: 'player_skill_max_fields';
  readonly id?: Maybe<Scalars['uuid']>;
  readonly player_id?: Maybe<Scalars['uuid']>;
  readonly rank?: Maybe<Scalars['Int']>;
  readonly skill_id?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "player_skill" */
export type Player_Skill_Max_Order_By = {
  readonly id?: InputMaybe<Order_By>;
  readonly player_id?: InputMaybe<Order_By>;
  readonly rank?: InputMaybe<Order_By>;
  readonly skill_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Player_Skill_Min_Fields = {
  readonly __typename?: 'player_skill_min_fields';
  readonly id?: Maybe<Scalars['uuid']>;
  readonly player_id?: Maybe<Scalars['uuid']>;
  readonly rank?: Maybe<Scalars['Int']>;
  readonly skill_id?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "player_skill" */
export type Player_Skill_Min_Order_By = {
  readonly id?: InputMaybe<Order_By>;
  readonly player_id?: InputMaybe<Order_By>;
  readonly rank?: InputMaybe<Order_By>;
  readonly skill_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "player_skill" */
export type Player_Skill_Mutation_Response = {
  readonly __typename?: 'player_skill_mutation_response';
  /** number of affected rows by the mutation */
  readonly affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  readonly returning: ReadonlyArray<Player_Skill>;
};

/** input type for inserting object relation for remote table "player_skill" */
export type Player_Skill_Obj_Rel_Insert_Input = {
  readonly data: Player_Skill_Insert_Input;
  readonly on_conflict?: InputMaybe<Player_Skill_On_Conflict>;
};

/** on conflict condition type for table "player_skill" */
export type Player_Skill_On_Conflict = {
  readonly constraint: Player_Skill_Constraint;
  readonly update_columns: ReadonlyArray<Player_Skill_Update_Column>;
  readonly where?: InputMaybe<Player_Skill_Bool_Exp>;
};

/** ordering options when selecting data from "player_skill" */
export type Player_Skill_Order_By = {
  readonly Skill?: InputMaybe<Skill_Order_By>;
  readonly id?: InputMaybe<Order_By>;
  readonly player_id?: InputMaybe<Order_By>;
  readonly rank?: InputMaybe<Order_By>;
  readonly skill_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "player_skill" */
export type Player_Skill_Pk_Columns_Input = {
  readonly id: Scalars['uuid'];
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
  SkillId = 'skill_id'
}

/** input type for updating data in table "player_skill" */
export type Player_Skill_Set_Input = {
  readonly id?: InputMaybe<Scalars['uuid']>;
  readonly player_id?: InputMaybe<Scalars['uuid']>;
  readonly rank?: InputMaybe<Scalars['Int']>;
  readonly skill_id?: InputMaybe<Scalars['uuid']>;
};

/** aggregate stddev on columns */
export type Player_Skill_Stddev_Fields = {
  readonly __typename?: 'player_skill_stddev_fields';
  readonly rank?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "player_skill" */
export type Player_Skill_Stddev_Order_By = {
  readonly rank?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Player_Skill_Stddev_Pop_Fields = {
  readonly __typename?: 'player_skill_stddev_pop_fields';
  readonly rank?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "player_skill" */
export type Player_Skill_Stddev_Pop_Order_By = {
  readonly rank?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Player_Skill_Stddev_Samp_Fields = {
  readonly __typename?: 'player_skill_stddev_samp_fields';
  readonly rank?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "player_skill" */
export type Player_Skill_Stddev_Samp_Order_By = {
  readonly rank?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Player_Skill_Sum_Fields = {
  readonly __typename?: 'player_skill_sum_fields';
  readonly rank?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "player_skill" */
export type Player_Skill_Sum_Order_By = {
  readonly rank?: InputMaybe<Order_By>;
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
  SkillId = 'skill_id'
}

/** aggregate var_pop on columns */
export type Player_Skill_Var_Pop_Fields = {
  readonly __typename?: 'player_skill_var_pop_fields';
  readonly rank?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "player_skill" */
export type Player_Skill_Var_Pop_Order_By = {
  readonly rank?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Player_Skill_Var_Samp_Fields = {
  readonly __typename?: 'player_skill_var_samp_fields';
  readonly rank?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "player_skill" */
export type Player_Skill_Var_Samp_Order_By = {
  readonly rank?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Player_Skill_Variance_Fields = {
  readonly __typename?: 'player_skill_variance_fields';
  readonly rank?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "player_skill" */
export type Player_Skill_Variance_Order_By = {
  readonly rank?: InputMaybe<Order_By>;
};

/** aggregate stddev on columns */
export type Player_Stddev_Fields = {
  readonly __typename?: 'player_stddev_fields';
  readonly seasonXP?: Maybe<Scalars['Float']>;
  readonly totalXP?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "player" */
export type Player_Stddev_Order_By = {
  readonly seasonXP?: InputMaybe<Order_By>;
  readonly totalXP?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Player_Stddev_Pop_Fields = {
  readonly __typename?: 'player_stddev_pop_fields';
  readonly seasonXP?: Maybe<Scalars['Float']>;
  readonly totalXP?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "player" */
export type Player_Stddev_Pop_Order_By = {
  readonly seasonXP?: InputMaybe<Order_By>;
  readonly totalXP?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Player_Stddev_Samp_Fields = {
  readonly __typename?: 'player_stddev_samp_fields';
  readonly seasonXP?: Maybe<Scalars['Float']>;
  readonly totalXP?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "player" */
export type Player_Stddev_Samp_Order_By = {
  readonly seasonXP?: InputMaybe<Order_By>;
  readonly totalXP?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Player_Sum_Fields = {
  readonly __typename?: 'player_sum_fields';
  readonly seasonXP?: Maybe<Scalars['numeric']>;
  readonly totalXP?: Maybe<Scalars['numeric']>;
};

/** order by sum() on columns of table "player" */
export type Player_Sum_Order_By = {
  readonly seasonXP?: InputMaybe<Order_By>;
  readonly totalXP?: InputMaybe<Order_By>;
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
  UpdatedAt = 'updatedAt'
}

/** aggregate var_pop on columns */
export type Player_Var_Pop_Fields = {
  readonly __typename?: 'player_var_pop_fields';
  readonly seasonXP?: Maybe<Scalars['Float']>;
  readonly totalXP?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "player" */
export type Player_Var_Pop_Order_By = {
  readonly seasonXP?: InputMaybe<Order_By>;
  readonly totalXP?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Player_Var_Samp_Fields = {
  readonly __typename?: 'player_var_samp_fields';
  readonly seasonXP?: Maybe<Scalars['Float']>;
  readonly totalXP?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "player" */
export type Player_Var_Samp_Order_By = {
  readonly seasonXP?: InputMaybe<Order_By>;
  readonly totalXP?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Player_Variance_Fields = {
  readonly __typename?: 'player_variance_fields';
  readonly seasonXP?: Maybe<Scalars['Float']>;
  readonly totalXP?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "player" */
export type Player_Variance_Order_By = {
  readonly seasonXP?: InputMaybe<Order_By>;
  readonly totalXP?: InputMaybe<Order_By>;
};

/** columns and relationships of "profile" */
export type Profile = {
  readonly __typename?: 'profile';
  readonly availableHours?: Maybe<Scalars['Int']>;
  readonly backgroundImageURL?: Maybe<Scalars['String']>;
  readonly bannerImageURL?: Maybe<Scalars['String']>;
  /** An object relationship */
  readonly colorAspect?: Maybe<ColorAspect>;
  readonly colorMask?: Maybe<Scalars['Int']>;
  readonly countryCode?: Maybe<Scalars['String']>;
  readonly description?: Maybe<Scalars['String']>;
  readonly emoji?: Maybe<Scalars['String']>;
  /** An object relationship */
  readonly explorerType?: Maybe<ExplorerType>;
  readonly explorerTypeTitle?: Maybe<Scalars['String']>;
  readonly gender?: Maybe<Scalars['String']>;
  readonly id: Scalars['uuid'];
  readonly lastCheckedAt?: Maybe<Scalars['timestamptz']>;
  readonly location?: Maybe<Scalars['String']>;
  readonly name?: Maybe<Scalars['String']>;
  /** An object relationship */
  readonly player: Player;
  readonly playerId: Scalars['uuid'];
  readonly profileImageURL?: Maybe<Scalars['String']>;
  readonly pronouns?: Maybe<Scalars['String']>;
  readonly timeZone?: Maybe<Scalars['String']>;
  readonly username?: Maybe<Scalars['String']>;
  readonly website?: Maybe<Scalars['String']>;
};

/** aggregated selection of "profile" */
export type Profile_Aggregate = {
  readonly __typename?: 'profile_aggregate';
  readonly aggregate?: Maybe<Profile_Aggregate_Fields>;
  readonly nodes: ReadonlyArray<Profile>;
};

/** aggregate fields of "profile" */
export type Profile_Aggregate_Fields = {
  readonly __typename?: 'profile_aggregate_fields';
  readonly avg?: Maybe<Profile_Avg_Fields>;
  readonly count?: Maybe<Scalars['Int']>;
  readonly max?: Maybe<Profile_Max_Fields>;
  readonly min?: Maybe<Profile_Min_Fields>;
  readonly stddev?: Maybe<Profile_Stddev_Fields>;
  readonly stddev_pop?: Maybe<Profile_Stddev_Pop_Fields>;
  readonly stddev_samp?: Maybe<Profile_Stddev_Samp_Fields>;
  readonly sum?: Maybe<Profile_Sum_Fields>;
  readonly var_pop?: Maybe<Profile_Var_Pop_Fields>;
  readonly var_samp?: Maybe<Profile_Var_Samp_Fields>;
  readonly variance?: Maybe<Profile_Variance_Fields>;
};


/** aggregate fields of "profile" */
export type Profile_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<ReadonlyArray<Profile_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "profile" */
export type Profile_Aggregate_Order_By = {
  readonly avg?: InputMaybe<Profile_Avg_Order_By>;
  readonly count?: InputMaybe<Order_By>;
  readonly max?: InputMaybe<Profile_Max_Order_By>;
  readonly min?: InputMaybe<Profile_Min_Order_By>;
  readonly stddev?: InputMaybe<Profile_Stddev_Order_By>;
  readonly stddev_pop?: InputMaybe<Profile_Stddev_Pop_Order_By>;
  readonly stddev_samp?: InputMaybe<Profile_Stddev_Samp_Order_By>;
  readonly sum?: InputMaybe<Profile_Sum_Order_By>;
  readonly var_pop?: InputMaybe<Profile_Var_Pop_Order_By>;
  readonly var_samp?: InputMaybe<Profile_Var_Samp_Order_By>;
  readonly variance?: InputMaybe<Profile_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "profile" */
export type Profile_Arr_Rel_Insert_Input = {
  readonly data: ReadonlyArray<Profile_Insert_Input>;
  readonly on_conflict?: InputMaybe<Profile_On_Conflict>;
};

/** aggregate avg on columns */
export type Profile_Avg_Fields = {
  readonly __typename?: 'profile_avg_fields';
  readonly availableHours?: Maybe<Scalars['Float']>;
  readonly colorMask?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "profile" */
export type Profile_Avg_Order_By = {
  readonly availableHours?: InputMaybe<Order_By>;
  readonly colorMask?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "profile". All fields are combined with a logical 'AND'. */
export type Profile_Bool_Exp = {
  readonly _and?: InputMaybe<ReadonlyArray<InputMaybe<Profile_Bool_Exp>>>;
  readonly _not?: InputMaybe<Profile_Bool_Exp>;
  readonly _or?: InputMaybe<ReadonlyArray<InputMaybe<Profile_Bool_Exp>>>;
  readonly availableHours?: InputMaybe<Int_Comparison_Exp>;
  readonly backgroundImageURL?: InputMaybe<String_Comparison_Exp>;
  readonly bannerImageURL?: InputMaybe<String_Comparison_Exp>;
  readonly colorAspect?: InputMaybe<ColorAspect_Bool_Exp>;
  readonly colorMask?: InputMaybe<Int_Comparison_Exp>;
  readonly countryCode?: InputMaybe<String_Comparison_Exp>;
  readonly description?: InputMaybe<String_Comparison_Exp>;
  readonly emoji?: InputMaybe<String_Comparison_Exp>;
  readonly explorerType?: InputMaybe<ExplorerType_Bool_Exp>;
  readonly explorerTypeTitle?: InputMaybe<String_Comparison_Exp>;
  readonly gender?: InputMaybe<String_Comparison_Exp>;
  readonly id?: InputMaybe<Uuid_Comparison_Exp>;
  readonly lastCheckedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  readonly location?: InputMaybe<String_Comparison_Exp>;
  readonly name?: InputMaybe<String_Comparison_Exp>;
  readonly player?: InputMaybe<Player_Bool_Exp>;
  readonly playerId?: InputMaybe<Uuid_Comparison_Exp>;
  readonly profileImageURL?: InputMaybe<String_Comparison_Exp>;
  readonly pronouns?: InputMaybe<String_Comparison_Exp>;
  readonly timeZone?: InputMaybe<String_Comparison_Exp>;
  readonly username?: InputMaybe<String_Comparison_Exp>;
  readonly website?: InputMaybe<String_Comparison_Exp>;
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
  UsernameInsensitiveUniqueIdx = 'username_insensitive_unique_idx'
}

/** input type for incrementing integer column in table "profile" */
export type Profile_Inc_Input = {
  readonly availableHours?: InputMaybe<Scalars['Int']>;
  readonly colorMask?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "profile" */
export type Profile_Insert_Input = {
  readonly availableHours?: InputMaybe<Scalars['Int']>;
  readonly backgroundImageURL?: InputMaybe<Scalars['String']>;
  readonly bannerImageURL?: InputMaybe<Scalars['String']>;
  readonly colorAspect?: InputMaybe<ColorAspect_Obj_Rel_Insert_Input>;
  readonly colorMask?: InputMaybe<Scalars['Int']>;
  readonly countryCode?: InputMaybe<Scalars['String']>;
  readonly description?: InputMaybe<Scalars['String']>;
  readonly emoji?: InputMaybe<Scalars['String']>;
  readonly explorerType?: InputMaybe<ExplorerType_Obj_Rel_Insert_Input>;
  readonly explorerTypeTitle?: InputMaybe<Scalars['String']>;
  readonly gender?: InputMaybe<Scalars['String']>;
  readonly id?: InputMaybe<Scalars['uuid']>;
  readonly lastCheckedAt?: InputMaybe<Scalars['timestamptz']>;
  readonly location?: InputMaybe<Scalars['String']>;
  readonly name?: InputMaybe<Scalars['String']>;
  readonly player?: InputMaybe<Player_Obj_Rel_Insert_Input>;
  readonly playerId?: InputMaybe<Scalars['uuid']>;
  readonly profileImageURL?: InputMaybe<Scalars['String']>;
  readonly pronouns?: InputMaybe<Scalars['String']>;
  readonly timeZone?: InputMaybe<Scalars['String']>;
  readonly username?: InputMaybe<Scalars['String']>;
  readonly website?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Profile_Max_Fields = {
  readonly __typename?: 'profile_max_fields';
  readonly availableHours?: Maybe<Scalars['Int']>;
  readonly backgroundImageURL?: Maybe<Scalars['String']>;
  readonly bannerImageURL?: Maybe<Scalars['String']>;
  readonly colorMask?: Maybe<Scalars['Int']>;
  readonly countryCode?: Maybe<Scalars['String']>;
  readonly description?: Maybe<Scalars['String']>;
  readonly emoji?: Maybe<Scalars['String']>;
  readonly explorerTypeTitle?: Maybe<Scalars['String']>;
  readonly gender?: Maybe<Scalars['String']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly lastCheckedAt?: Maybe<Scalars['timestamptz']>;
  readonly location?: Maybe<Scalars['String']>;
  readonly name?: Maybe<Scalars['String']>;
  readonly playerId?: Maybe<Scalars['uuid']>;
  readonly profileImageURL?: Maybe<Scalars['String']>;
  readonly pronouns?: Maybe<Scalars['String']>;
  readonly timeZone?: Maybe<Scalars['String']>;
  readonly username?: Maybe<Scalars['String']>;
  readonly website?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "profile" */
export type Profile_Max_Order_By = {
  readonly availableHours?: InputMaybe<Order_By>;
  readonly backgroundImageURL?: InputMaybe<Order_By>;
  readonly bannerImageURL?: InputMaybe<Order_By>;
  readonly colorMask?: InputMaybe<Order_By>;
  readonly countryCode?: InputMaybe<Order_By>;
  readonly description?: InputMaybe<Order_By>;
  readonly emoji?: InputMaybe<Order_By>;
  readonly explorerTypeTitle?: InputMaybe<Order_By>;
  readonly gender?: InputMaybe<Order_By>;
  readonly id?: InputMaybe<Order_By>;
  readonly lastCheckedAt?: InputMaybe<Order_By>;
  readonly location?: InputMaybe<Order_By>;
  readonly name?: InputMaybe<Order_By>;
  readonly playerId?: InputMaybe<Order_By>;
  readonly profileImageURL?: InputMaybe<Order_By>;
  readonly pronouns?: InputMaybe<Order_By>;
  readonly timeZone?: InputMaybe<Order_By>;
  readonly username?: InputMaybe<Order_By>;
  readonly website?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Profile_Min_Fields = {
  readonly __typename?: 'profile_min_fields';
  readonly availableHours?: Maybe<Scalars['Int']>;
  readonly backgroundImageURL?: Maybe<Scalars['String']>;
  readonly bannerImageURL?: Maybe<Scalars['String']>;
  readonly colorMask?: Maybe<Scalars['Int']>;
  readonly countryCode?: Maybe<Scalars['String']>;
  readonly description?: Maybe<Scalars['String']>;
  readonly emoji?: Maybe<Scalars['String']>;
  readonly explorerTypeTitle?: Maybe<Scalars['String']>;
  readonly gender?: Maybe<Scalars['String']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly lastCheckedAt?: Maybe<Scalars['timestamptz']>;
  readonly location?: Maybe<Scalars['String']>;
  readonly name?: Maybe<Scalars['String']>;
  readonly playerId?: Maybe<Scalars['uuid']>;
  readonly profileImageURL?: Maybe<Scalars['String']>;
  readonly pronouns?: Maybe<Scalars['String']>;
  readonly timeZone?: Maybe<Scalars['String']>;
  readonly username?: Maybe<Scalars['String']>;
  readonly website?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "profile" */
export type Profile_Min_Order_By = {
  readonly availableHours?: InputMaybe<Order_By>;
  readonly backgroundImageURL?: InputMaybe<Order_By>;
  readonly bannerImageURL?: InputMaybe<Order_By>;
  readonly colorMask?: InputMaybe<Order_By>;
  readonly countryCode?: InputMaybe<Order_By>;
  readonly description?: InputMaybe<Order_By>;
  readonly emoji?: InputMaybe<Order_By>;
  readonly explorerTypeTitle?: InputMaybe<Order_By>;
  readonly gender?: InputMaybe<Order_By>;
  readonly id?: InputMaybe<Order_By>;
  readonly lastCheckedAt?: InputMaybe<Order_By>;
  readonly location?: InputMaybe<Order_By>;
  readonly name?: InputMaybe<Order_By>;
  readonly playerId?: InputMaybe<Order_By>;
  readonly profileImageURL?: InputMaybe<Order_By>;
  readonly pronouns?: InputMaybe<Order_By>;
  readonly timeZone?: InputMaybe<Order_By>;
  readonly username?: InputMaybe<Order_By>;
  readonly website?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "profile" */
export type Profile_Mutation_Response = {
  readonly __typename?: 'profile_mutation_response';
  /** number of affected rows by the mutation */
  readonly affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  readonly returning: ReadonlyArray<Profile>;
};

/** input type for inserting object relation for remote table "profile" */
export type Profile_Obj_Rel_Insert_Input = {
  readonly data: Profile_Insert_Input;
  readonly on_conflict?: InputMaybe<Profile_On_Conflict>;
};

/** on conflict condition type for table "profile" */
export type Profile_On_Conflict = {
  readonly constraint: Profile_Constraint;
  readonly update_columns: ReadonlyArray<Profile_Update_Column>;
  readonly where?: InputMaybe<Profile_Bool_Exp>;
};

/** ordering options when selecting data from "profile" */
export type Profile_Order_By = {
  readonly availableHours?: InputMaybe<Order_By>;
  readonly backgroundImageURL?: InputMaybe<Order_By>;
  readonly bannerImageURL?: InputMaybe<Order_By>;
  readonly colorAspect?: InputMaybe<ColorAspect_Order_By>;
  readonly colorMask?: InputMaybe<Order_By>;
  readonly countryCode?: InputMaybe<Order_By>;
  readonly description?: InputMaybe<Order_By>;
  readonly emoji?: InputMaybe<Order_By>;
  readonly explorerType?: InputMaybe<ExplorerType_Order_By>;
  readonly explorerTypeTitle?: InputMaybe<Order_By>;
  readonly gender?: InputMaybe<Order_By>;
  readonly id?: InputMaybe<Order_By>;
  readonly lastCheckedAt?: InputMaybe<Order_By>;
  readonly location?: InputMaybe<Order_By>;
  readonly name?: InputMaybe<Order_By>;
  readonly player?: InputMaybe<Player_Order_By>;
  readonly playerId?: InputMaybe<Order_By>;
  readonly profileImageURL?: InputMaybe<Order_By>;
  readonly pronouns?: InputMaybe<Order_By>;
  readonly timeZone?: InputMaybe<Order_By>;
  readonly username?: InputMaybe<Order_By>;
  readonly website?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "profile" */
export type Profile_Pk_Columns_Input = {
  readonly id: Scalars['uuid'];
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
  Website = 'website'
}

/** input type for updating data in table "profile" */
export type Profile_Set_Input = {
  readonly availableHours?: InputMaybe<Scalars['Int']>;
  readonly backgroundImageURL?: InputMaybe<Scalars['String']>;
  readonly bannerImageURL?: InputMaybe<Scalars['String']>;
  readonly colorMask?: InputMaybe<Scalars['Int']>;
  readonly countryCode?: InputMaybe<Scalars['String']>;
  readonly description?: InputMaybe<Scalars['String']>;
  readonly emoji?: InputMaybe<Scalars['String']>;
  readonly explorerTypeTitle?: InputMaybe<Scalars['String']>;
  readonly gender?: InputMaybe<Scalars['String']>;
  readonly id?: InputMaybe<Scalars['uuid']>;
  readonly lastCheckedAt?: InputMaybe<Scalars['timestamptz']>;
  readonly location?: InputMaybe<Scalars['String']>;
  readonly name?: InputMaybe<Scalars['String']>;
  readonly playerId?: InputMaybe<Scalars['uuid']>;
  readonly profileImageURL?: InputMaybe<Scalars['String']>;
  readonly pronouns?: InputMaybe<Scalars['String']>;
  readonly timeZone?: InputMaybe<Scalars['String']>;
  readonly username?: InputMaybe<Scalars['String']>;
  readonly website?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Profile_Stddev_Fields = {
  readonly __typename?: 'profile_stddev_fields';
  readonly availableHours?: Maybe<Scalars['Float']>;
  readonly colorMask?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "profile" */
export type Profile_Stddev_Order_By = {
  readonly availableHours?: InputMaybe<Order_By>;
  readonly colorMask?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Profile_Stddev_Pop_Fields = {
  readonly __typename?: 'profile_stddev_pop_fields';
  readonly availableHours?: Maybe<Scalars['Float']>;
  readonly colorMask?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "profile" */
export type Profile_Stddev_Pop_Order_By = {
  readonly availableHours?: InputMaybe<Order_By>;
  readonly colorMask?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Profile_Stddev_Samp_Fields = {
  readonly __typename?: 'profile_stddev_samp_fields';
  readonly availableHours?: Maybe<Scalars['Float']>;
  readonly colorMask?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "profile" */
export type Profile_Stddev_Samp_Order_By = {
  readonly availableHours?: InputMaybe<Order_By>;
  readonly colorMask?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Profile_Sum_Fields = {
  readonly __typename?: 'profile_sum_fields';
  readonly availableHours?: Maybe<Scalars['Int']>;
  readonly colorMask?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "profile" */
export type Profile_Sum_Order_By = {
  readonly availableHours?: InputMaybe<Order_By>;
  readonly colorMask?: InputMaybe<Order_By>;
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
  Website = 'website'
}

/** aggregate var_pop on columns */
export type Profile_Var_Pop_Fields = {
  readonly __typename?: 'profile_var_pop_fields';
  readonly availableHours?: Maybe<Scalars['Float']>;
  readonly colorMask?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "profile" */
export type Profile_Var_Pop_Order_By = {
  readonly availableHours?: InputMaybe<Order_By>;
  readonly colorMask?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Profile_Var_Samp_Fields = {
  readonly __typename?: 'profile_var_samp_fields';
  readonly availableHours?: Maybe<Scalars['Float']>;
  readonly colorMask?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "profile" */
export type Profile_Var_Samp_Order_By = {
  readonly availableHours?: InputMaybe<Order_By>;
  readonly colorMask?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Profile_Variance_Fields = {
  readonly __typename?: 'profile_variance_fields';
  readonly availableHours?: Maybe<Scalars['Float']>;
  readonly colorMask?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "profile" */
export type Profile_Variance_Order_By = {
  readonly availableHours?: InputMaybe<Order_By>;
  readonly colorMask?: InputMaybe<Order_By>;
};

/** query root */
export type Query_Root = {
  readonly __typename?: 'query_root';
  /** fetch data from the table: "AccountType" */
  readonly AccountType: ReadonlyArray<AccountType>;
  /** fetch aggregated fields from the table: "AccountType" */
  readonly AccountType_aggregate: AccountType_Aggregate;
  /** fetch data from the table: "AccountType" using primary key columns */
  readonly AccountType_by_pk?: Maybe<AccountType>;
  /** fetch data from the table: "ColorAspect" */
  readonly ColorAspect: ReadonlyArray<ColorAspect>;
  /** fetch aggregated fields from the table: "ColorAspect" */
  readonly ColorAspect_aggregate: ColorAspect_Aggregate;
  /** fetch data from the table: "ColorAspect" using primary key columns */
  readonly ColorAspect_by_pk?: Maybe<ColorAspect>;
  /** fetch data from the table: "ExplorerType" */
  readonly ExplorerType: ReadonlyArray<ExplorerType>;
  /** fetch aggregated fields from the table: "ExplorerType" */
  readonly ExplorerType_aggregate: ExplorerType_Aggregate;
  /** fetch data from the table: "ExplorerType" using primary key columns */
  readonly ExplorerType_by_pk?: Maybe<ExplorerType>;
  /** fetch data from the table: "GuildStatus" */
  readonly GuildStatus: ReadonlyArray<GuildStatus>;
  /** fetch aggregated fields from the table: "GuildStatus" */
  readonly GuildStatus_aggregate: GuildStatus_Aggregate;
  /** fetch data from the table: "GuildStatus" using primary key columns */
  readonly GuildStatus_by_pk?: Maybe<GuildStatus>;
  /** fetch data from the table: "GuildType" */
  readonly GuildType: ReadonlyArray<GuildType>;
  /** fetch aggregated fields from the table: "GuildType" */
  readonly GuildType_aggregate: GuildType_Aggregate;
  /** fetch data from the table: "GuildType" using primary key columns */
  readonly GuildType_by_pk?: Maybe<GuildType>;
  /** fetch data from the table: "PlayerRank" */
  readonly PlayerRank: ReadonlyArray<PlayerRank>;
  /** fetch aggregated fields from the table: "PlayerRank" */
  readonly PlayerRank_aggregate: PlayerRank_Aggregate;
  /** fetch data from the table: "PlayerRank" using primary key columns */
  readonly PlayerRank_by_pk?: Maybe<PlayerRank>;
  /** fetch data from the table: "PlayerRole" */
  readonly PlayerRole: ReadonlyArray<PlayerRole>;
  /** fetch aggregated fields from the table: "PlayerRole" */
  readonly PlayerRole_aggregate: PlayerRole_Aggregate;
  /** fetch data from the table: "PlayerRole" using primary key columns */
  readonly PlayerRole_by_pk?: Maybe<PlayerRole>;
  /** fetch data from the table: "QuestCompletionStatus" */
  readonly QuestCompletionStatus: ReadonlyArray<QuestCompletionStatus>;
  /** fetch aggregated fields from the table: "QuestCompletionStatus" */
  readonly QuestCompletionStatus_aggregate: QuestCompletionStatus_Aggregate;
  /** fetch data from the table: "QuestCompletionStatus" using primary key columns */
  readonly QuestCompletionStatus_by_pk?: Maybe<QuestCompletionStatus>;
  /** fetch data from the table: "QuestRepetition" */
  readonly QuestRepetition: ReadonlyArray<QuestRepetition>;
  /** fetch aggregated fields from the table: "QuestRepetition" */
  readonly QuestRepetition_aggregate: QuestRepetition_Aggregate;
  /** fetch data from the table: "QuestRepetition" using primary key columns */
  readonly QuestRepetition_by_pk?: Maybe<QuestRepetition>;
  /** fetch data from the table: "QuestStatus" */
  readonly QuestStatus: ReadonlyArray<QuestStatus>;
  /** fetch aggregated fields from the table: "QuestStatus" */
  readonly QuestStatus_aggregate: QuestStatus_Aggregate;
  /** fetch data from the table: "QuestStatus" using primary key columns */
  readonly QuestStatus_by_pk?: Maybe<QuestStatus>;
  /** fetch data from the table: "SkillCategory" */
  readonly SkillCategory: ReadonlyArray<SkillCategory>;
  /** fetch aggregated fields from the table: "SkillCategory" */
  readonly SkillCategory_aggregate: SkillCategory_Aggregate;
  /** fetch data from the table: "SkillCategory" using primary key columns */
  readonly SkillCategory_by_pk?: Maybe<SkillCategory>;
  /** fetch data from the table: "balance" */
  readonly balance: ReadonlyArray<Balance>;
  /** fetch aggregated fields from the table: "balance" */
  readonly balance_aggregate: Balance_Aggregate;
  /** fetch data from the table: "balance" using primary key columns */
  readonly balance_by_pk?: Maybe<Balance>;
  /** fetch data from the table: "dao" */
  readonly dao: ReadonlyArray<Dao>;
  /** fetch aggregated fields from the table: "dao" */
  readonly dao_aggregate: Dao_Aggregate;
  /** fetch data from the table: "dao" using primary key columns */
  readonly dao_by_pk?: Maybe<Dao>;
  /** fetch data from the table: "dao_player" */
  readonly dao_player: ReadonlyArray<Dao_Player>;
  /** fetch aggregated fields from the table: "dao_player" */
  readonly dao_player_aggregate: Dao_Player_Aggregate;
  /** fetch data from the table: "dao_player" using primary key columns */
  readonly dao_player_by_pk?: Maybe<Dao_Player>;
  readonly getBrightIdStatus?: Maybe<BrightIdStatus>;
  readonly getDaoHausMemberships: ReadonlyArray<Member>;
  readonly getDiscordServerMemberRoles: ReadonlyArray<DiscordRole>;
  readonly getGuildDiscordAnnouncements?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly getGuildDiscordRoles: ReadonlyArray<DiscordRole>;
  readonly getPSeedInfo?: Maybe<PSeedInfo>;
  readonly getTokenBalances?: Maybe<TokenBalances>;
  readonly getTopPSeedHolders?: Maybe<ReadonlyArray<TokenBalances>>;
  /** fetch data from the table: "guild" */
  readonly guild: ReadonlyArray<Guild>;
  /** fetch aggregated fields from the table: "guild" */
  readonly guild_aggregate: Guild_Aggregate;
  /** fetch data from the table: "guild" using primary key columns */
  readonly guild_by_pk?: Maybe<Guild>;
  /** fetch data from the table: "guild_metadata" */
  readonly guild_metadata: ReadonlyArray<Guild_Metadata>;
  /** fetch aggregated fields from the table: "guild_metadata" */
  readonly guild_metadata_aggregate: Guild_Metadata_Aggregate;
  /** fetch data from the table: "guild_metadata" using primary key columns */
  readonly guild_metadata_by_pk?: Maybe<Guild_Metadata>;
  /** fetch data from the table: "guild_player" */
  readonly guild_player: ReadonlyArray<Guild_Player>;
  /** fetch aggregated fields from the table: "guild_player" */
  readonly guild_player_aggregate: Guild_Player_Aggregate;
  /** fetch data from the table: "guild_player" using primary key columns */
  readonly guild_player_by_pk?: Maybe<Guild_Player>;
  /** fetch data from the table: "me" */
  readonly me: ReadonlyArray<Me>;
  /** fetch aggregated fields from the table: "me" */
  readonly me_aggregate: Me_Aggregate;
  /** fetch data from the table: "player" */
  readonly player: ReadonlyArray<Player>;
  /** fetch data from the table: "player_account" */
  readonly player_account: ReadonlyArray<Player_Account>;
  /** fetch aggregated fields from the table: "player_account" */
  readonly player_account_aggregate: Player_Account_Aggregate;
  /** fetch aggregated fields from the table: "player" */
  readonly player_aggregate: Player_Aggregate;
  /** fetch data from the table: "player" using primary key columns */
  readonly player_by_pk?: Maybe<Player>;
  /** fetch data from the table: "player_role" */
  readonly player_role: ReadonlyArray<Player_Role>;
  /** fetch aggregated fields from the table: "player_role" */
  readonly player_role_aggregate: Player_Role_Aggregate;
  /** fetch data from the table: "player_role" using primary key columns */
  readonly player_role_by_pk?: Maybe<Player_Role>;
  /** fetch data from the table: "player_skill" */
  readonly player_skill: ReadonlyArray<Player_Skill>;
  /** fetch aggregated fields from the table: "player_skill" */
  readonly player_skill_aggregate: Player_Skill_Aggregate;
  /** fetch data from the table: "player_skill" using primary key columns */
  readonly player_skill_by_pk?: Maybe<Player_Skill>;
  /** fetch data from the table: "profile" */
  readonly profile: ReadonlyArray<Profile>;
  /** fetch aggregated fields from the table: "profile" */
  readonly profile_aggregate: Profile_Aggregate;
  /** fetch data from the table: "profile" using primary key columns */
  readonly profile_by_pk?: Maybe<Profile>;
  /** fetch data from the table: "quest" */
  readonly quest: ReadonlyArray<Quest>;
  /** fetch aggregated fields from the table: "quest" */
  readonly quest_aggregate: Quest_Aggregate;
  /** fetch data from the table: "quest" using primary key columns */
  readonly quest_by_pk?: Maybe<Quest>;
  /** fetch data from the table: "quest_completion" */
  readonly quest_completion: ReadonlyArray<Quest_Completion>;
  /** fetch aggregated fields from the table: "quest_completion" */
  readonly quest_completion_aggregate: Quest_Completion_Aggregate;
  /** fetch data from the table: "quest_completion" using primary key columns */
  readonly quest_completion_by_pk?: Maybe<Quest_Completion>;
  /** fetch data from the table: "quest_role" */
  readonly quest_role: ReadonlyArray<Quest_Role>;
  /** fetch aggregated fields from the table: "quest_role" */
  readonly quest_role_aggregate: Quest_Role_Aggregate;
  /** fetch data from the table: "quest_role" using primary key columns */
  readonly quest_role_by_pk?: Maybe<Quest_Role>;
  /** fetch data from the table: "quest_skill" */
  readonly quest_skill: ReadonlyArray<Quest_Skill>;
  /** fetch aggregated fields from the table: "quest_skill" */
  readonly quest_skill_aggregate: Quest_Skill_Aggregate;
  /** fetch data from the table: "quest_skill" using primary key columns */
  readonly quest_skill_by_pk?: Maybe<Quest_Skill>;
  /** fetch data from the table: "skill" */
  readonly skill: ReadonlyArray<Skill>;
  /** fetch aggregated fields from the table: "skill" */
  readonly skill_aggregate: Skill_Aggregate;
  /** fetch data from the table: "skill" using primary key columns */
  readonly skill_by_pk?: Maybe<Skill>;
  /** fetch data from the table: "token" */
  readonly token: ReadonlyArray<Token>;
  /** fetch aggregated fields from the table: "token" */
  readonly token_aggregate: Token_Aggregate;
  /** fetch data from the table: "token" using primary key columns */
  readonly token_by_pk?: Maybe<Token>;
  /** retrieve the result of action: "updateIDXProfile" */
  readonly updateIDXProfile?: Maybe<UpdateIdxProfile>;
  /** fetch data from the table: "xp" */
  readonly xp: ReadonlyArray<Xp>;
  /** fetch aggregated fields from the table: "xp" */
  readonly xp_aggregate: Xp_Aggregate;
  /** fetch data from the table: "xp" using primary key columns */
  readonly xp_by_pk?: Maybe<Xp>;
};


/** query root */
export type Query_RootAccountTypeArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<AccountType_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<AccountType_Order_By>>;
  where?: InputMaybe<AccountType_Bool_Exp>;
};


/** query root */
export type Query_RootAccountType_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<AccountType_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<AccountType_Order_By>>;
  where?: InputMaybe<AccountType_Bool_Exp>;
};


/** query root */
export type Query_RootAccountType_By_PkArgs = {
  type: Scalars['String'];
};


/** query root */
export type Query_RootColorAspectArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<ColorAspect_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<ColorAspect_Order_By>>;
  where?: InputMaybe<ColorAspect_Bool_Exp>;
};


/** query root */
export type Query_RootColorAspect_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<ColorAspect_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<ColorAspect_Order_By>>;
  where?: InputMaybe<ColorAspect_Bool_Exp>;
};


/** query root */
export type Query_RootColorAspect_By_PkArgs = {
  mask: Scalars['Int'];
};


/** query root */
export type Query_RootExplorerTypeArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<ExplorerType_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<ExplorerType_Order_By>>;
  where?: InputMaybe<ExplorerType_Bool_Exp>;
};


/** query root */
export type Query_RootExplorerType_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<ExplorerType_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<ExplorerType_Order_By>>;
  where?: InputMaybe<ExplorerType_Bool_Exp>;
};


/** query root */
export type Query_RootExplorerType_By_PkArgs = {
  id: Scalars['Int'];
};


/** query root */
export type Query_RootGuildStatusArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<GuildStatus_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<GuildStatus_Order_By>>;
  where?: InputMaybe<GuildStatus_Bool_Exp>;
};


/** query root */
export type Query_RootGuildStatus_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<GuildStatus_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<GuildStatus_Order_By>>;
  where?: InputMaybe<GuildStatus_Bool_Exp>;
};


/** query root */
export type Query_RootGuildStatus_By_PkArgs = {
  status: Scalars['String'];
};


/** query root */
export type Query_RootGuildTypeArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<GuildType_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<GuildType_Order_By>>;
  where?: InputMaybe<GuildType_Bool_Exp>;
};


/** query root */
export type Query_RootGuildType_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<GuildType_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<GuildType_Order_By>>;
  where?: InputMaybe<GuildType_Bool_Exp>;
};


/** query root */
export type Query_RootGuildType_By_PkArgs = {
  name: Scalars['String'];
};


/** query root */
export type Query_RootPlayerRankArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<PlayerRank_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<PlayerRank_Order_By>>;
  where?: InputMaybe<PlayerRank_Bool_Exp>;
};


/** query root */
export type Query_RootPlayerRank_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<PlayerRank_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<PlayerRank_Order_By>>;
  where?: InputMaybe<PlayerRank_Bool_Exp>;
};


/** query root */
export type Query_RootPlayerRank_By_PkArgs = {
  rank: Scalars['String'];
};


/** query root */
export type Query_RootPlayerRoleArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<PlayerRole_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<PlayerRole_Order_By>>;
  where?: InputMaybe<PlayerRole_Bool_Exp>;
};


/** query root */
export type Query_RootPlayerRole_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<PlayerRole_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<PlayerRole_Order_By>>;
  where?: InputMaybe<PlayerRole_Bool_Exp>;
};


/** query root */
export type Query_RootPlayerRole_By_PkArgs = {
  role: Scalars['String'];
};


/** query root */
export type Query_RootQuestCompletionStatusArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<QuestCompletionStatus_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<QuestCompletionStatus_Order_By>>;
  where?: InputMaybe<QuestCompletionStatus_Bool_Exp>;
};


/** query root */
export type Query_RootQuestCompletionStatus_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<QuestCompletionStatus_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<QuestCompletionStatus_Order_By>>;
  where?: InputMaybe<QuestCompletionStatus_Bool_Exp>;
};


/** query root */
export type Query_RootQuestCompletionStatus_By_PkArgs = {
  status: Scalars['String'];
};


/** query root */
export type Query_RootQuestRepetitionArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<QuestRepetition_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<QuestRepetition_Order_By>>;
  where?: InputMaybe<QuestRepetition_Bool_Exp>;
};


/** query root */
export type Query_RootQuestRepetition_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<QuestRepetition_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<QuestRepetition_Order_By>>;
  where?: InputMaybe<QuestRepetition_Bool_Exp>;
};


/** query root */
export type Query_RootQuestRepetition_By_PkArgs = {
  repetition: Scalars['String'];
};


/** query root */
export type Query_RootQuestStatusArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<QuestStatus_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<QuestStatus_Order_By>>;
  where?: InputMaybe<QuestStatus_Bool_Exp>;
};


/** query root */
export type Query_RootQuestStatus_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<QuestStatus_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<QuestStatus_Order_By>>;
  where?: InputMaybe<QuestStatus_Bool_Exp>;
};


/** query root */
export type Query_RootQuestStatus_By_PkArgs = {
  status: Scalars['String'];
};


/** query root */
export type Query_RootSkillCategoryArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<SkillCategory_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<SkillCategory_Order_By>>;
  where?: InputMaybe<SkillCategory_Bool_Exp>;
};


/** query root */
export type Query_RootSkillCategory_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<SkillCategory_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<SkillCategory_Order_By>>;
  where?: InputMaybe<SkillCategory_Bool_Exp>;
};


/** query root */
export type Query_RootSkillCategory_By_PkArgs = {
  name: Scalars['String'];
};


/** query root */
export type Query_RootBalanceArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Balance_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Balance_Order_By>>;
  where?: InputMaybe<Balance_Bool_Exp>;
};


/** query root */
export type Query_RootBalance_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Balance_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Balance_Order_By>>;
  where?: InputMaybe<Balance_Bool_Exp>;
};


/** query root */
export type Query_RootBalance_By_PkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootDaoArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Dao_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Dao_Order_By>>;
  where?: InputMaybe<Dao_Bool_Exp>;
};


/** query root */
export type Query_RootDao_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Dao_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Dao_Order_By>>;
  where?: InputMaybe<Dao_Bool_Exp>;
};


/** query root */
export type Query_RootDao_By_PkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootDao_PlayerArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Dao_Player_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Dao_Player_Order_By>>;
  where?: InputMaybe<Dao_Player_Bool_Exp>;
};


/** query root */
export type Query_RootDao_Player_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Dao_Player_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Dao_Player_Order_By>>;
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
  distinct_on?: InputMaybe<ReadonlyArray<Guild_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Guild_Order_By>>;
  where?: InputMaybe<Guild_Bool_Exp>;
};


/** query root */
export type Query_RootGuild_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Guild_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Guild_Order_By>>;
  where?: InputMaybe<Guild_Bool_Exp>;
};


/** query root */
export type Query_RootGuild_By_PkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootGuild_MetadataArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Guild_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Guild_Metadata_Order_By>>;
  where?: InputMaybe<Guild_Metadata_Bool_Exp>;
};


/** query root */
export type Query_RootGuild_Metadata_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Guild_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Guild_Metadata_Order_By>>;
  where?: InputMaybe<Guild_Metadata_Bool_Exp>;
};


/** query root */
export type Query_RootGuild_Metadata_By_PkArgs = {
  guildId: Scalars['uuid'];
};


/** query root */
export type Query_RootGuild_PlayerArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Guild_Player_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Guild_Player_Order_By>>;
  where?: InputMaybe<Guild_Player_Bool_Exp>;
};


/** query root */
export type Query_RootGuild_Player_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Guild_Player_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Guild_Player_Order_By>>;
  where?: InputMaybe<Guild_Player_Bool_Exp>;
};


/** query root */
export type Query_RootGuild_Player_By_PkArgs = {
  guildId: Scalars['uuid'];
  playerId: Scalars['uuid'];
};


/** query root */
export type Query_RootMeArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Me_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Me_Order_By>>;
  where?: InputMaybe<Me_Bool_Exp>;
};


/** query root */
export type Query_RootMe_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Me_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Me_Order_By>>;
  where?: InputMaybe<Me_Bool_Exp>;
};


/** query root */
export type Query_RootPlayerArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Player_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Player_Order_By>>;
  where?: InputMaybe<Player_Bool_Exp>;
};


/** query root */
export type Query_RootPlayer_AccountArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Player_Account_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Player_Account_Order_By>>;
  where?: InputMaybe<Player_Account_Bool_Exp>;
};


/** query root */
export type Query_RootPlayer_Account_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Player_Account_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Player_Account_Order_By>>;
  where?: InputMaybe<Player_Account_Bool_Exp>;
};


/** query root */
export type Query_RootPlayer_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Player_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Player_Order_By>>;
  where?: InputMaybe<Player_Bool_Exp>;
};


/** query root */
export type Query_RootPlayer_By_PkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootPlayer_RoleArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Player_Role_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Player_Role_Order_By>>;
  where?: InputMaybe<Player_Role_Bool_Exp>;
};


/** query root */
export type Query_RootPlayer_Role_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Player_Role_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Player_Role_Order_By>>;
  where?: InputMaybe<Player_Role_Bool_Exp>;
};


/** query root */
export type Query_RootPlayer_Role_By_PkArgs = {
  player_id: Scalars['uuid'];
  role: Scalars['String'];
};


/** query root */
export type Query_RootPlayer_SkillArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Player_Skill_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Player_Skill_Order_By>>;
  where?: InputMaybe<Player_Skill_Bool_Exp>;
};


/** query root */
export type Query_RootPlayer_Skill_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Player_Skill_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Player_Skill_Order_By>>;
  where?: InputMaybe<Player_Skill_Bool_Exp>;
};


/** query root */
export type Query_RootPlayer_Skill_By_PkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootProfileArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Profile_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Profile_Order_By>>;
  where?: InputMaybe<Profile_Bool_Exp>;
};


/** query root */
export type Query_RootProfile_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Profile_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Profile_Order_By>>;
  where?: InputMaybe<Profile_Bool_Exp>;
};


/** query root */
export type Query_RootProfile_By_PkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootQuestArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Quest_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Quest_Order_By>>;
  where?: InputMaybe<Quest_Bool_Exp>;
};


/** query root */
export type Query_RootQuest_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Quest_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Quest_Order_By>>;
  where?: InputMaybe<Quest_Bool_Exp>;
};


/** query root */
export type Query_RootQuest_By_PkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootQuest_CompletionArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Quest_Completion_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Quest_Completion_Order_By>>;
  where?: InputMaybe<Quest_Completion_Bool_Exp>;
};


/** query root */
export type Query_RootQuest_Completion_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Quest_Completion_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Quest_Completion_Order_By>>;
  where?: InputMaybe<Quest_Completion_Bool_Exp>;
};


/** query root */
export type Query_RootQuest_Completion_By_PkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootQuest_RoleArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Quest_Role_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Quest_Role_Order_By>>;
  where?: InputMaybe<Quest_Role_Bool_Exp>;
};


/** query root */
export type Query_RootQuest_Role_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Quest_Role_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Quest_Role_Order_By>>;
  where?: InputMaybe<Quest_Role_Bool_Exp>;
};


/** query root */
export type Query_RootQuest_Role_By_PkArgs = {
  questId: Scalars['uuid'];
  role: Scalars['String'];
};


/** query root */
export type Query_RootQuest_SkillArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Quest_Skill_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Quest_Skill_Order_By>>;
  where?: InputMaybe<Quest_Skill_Bool_Exp>;
};


/** query root */
export type Query_RootQuest_Skill_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Quest_Skill_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Quest_Skill_Order_By>>;
  where?: InputMaybe<Quest_Skill_Bool_Exp>;
};


/** query root */
export type Query_RootQuest_Skill_By_PkArgs = {
  questId: Scalars['uuid'];
  skillId: Scalars['uuid'];
};


/** query root */
export type Query_RootSkillArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Skill_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Skill_Order_By>>;
  where?: InputMaybe<Skill_Bool_Exp>;
};


/** query root */
export type Query_RootSkill_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Skill_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Skill_Order_By>>;
  where?: InputMaybe<Skill_Bool_Exp>;
};


/** query root */
export type Query_RootSkill_By_PkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootTokenArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Token_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Token_Order_By>>;
  where?: InputMaybe<Token_Bool_Exp>;
};


/** query root */
export type Query_RootToken_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Token_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Token_Order_By>>;
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
  distinct_on?: InputMaybe<ReadonlyArray<Xp_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Xp_Order_By>>;
  where?: InputMaybe<Xp_Bool_Exp>;
};


/** query root */
export type Query_RootXp_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Xp_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Xp_Order_By>>;
  where?: InputMaybe<Xp_Bool_Exp>;
};


/** query root */
export type Query_RootXp_By_PkArgs = {
  id: Scalars['uuid'];
};

/** columns and relationships of "quest" */
export type Quest = {
  readonly __typename?: 'quest';
  /** An object relationship */
  readonly QuestRepetition: QuestRepetition;
  /** An object relationship */
  readonly QuestStatus: QuestStatus;
  readonly cooldown?: Maybe<Scalars['Int']>;
  readonly createdAt: Scalars['timestamptz'];
  readonly createdByPlayerId: Scalars['uuid'];
  readonly description?: Maybe<Scalars['String']>;
  readonly externalLink?: Maybe<Scalars['String']>;
  /** An object relationship */
  readonly guild: Guild;
  readonly guildId: Scalars['uuid'];
  readonly id: Scalars['uuid'];
  readonly image?: Maybe<Scalars['String']>;
  /** An object relationship */
  readonly player: Player;
  /** An array relationship */
  readonly quest_completions: ReadonlyArray<Quest_Completion>;
  /** An aggregated array relationship */
  readonly quest_completions_aggregate: Quest_Completion_Aggregate;
  /** An array relationship */
  readonly quest_roles: ReadonlyArray<Quest_Role>;
  /** An aggregated array relationship */
  readonly quest_roles_aggregate: Quest_Role_Aggregate;
  /** An array relationship */
  readonly quest_skills: ReadonlyArray<Quest_Skill>;
  /** An aggregated array relationship */
  readonly quest_skills_aggregate: Quest_Skill_Aggregate;
  readonly repetition: QuestRepetition_Enum;
  readonly status: QuestStatus_Enum;
  readonly title: Scalars['String'];
};


/** columns and relationships of "quest" */
export type QuestQuest_CompletionsArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Quest_Completion_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Quest_Completion_Order_By>>;
  where?: InputMaybe<Quest_Completion_Bool_Exp>;
};


/** columns and relationships of "quest" */
export type QuestQuest_Completions_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Quest_Completion_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Quest_Completion_Order_By>>;
  where?: InputMaybe<Quest_Completion_Bool_Exp>;
};


/** columns and relationships of "quest" */
export type QuestQuest_RolesArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Quest_Role_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Quest_Role_Order_By>>;
  where?: InputMaybe<Quest_Role_Bool_Exp>;
};


/** columns and relationships of "quest" */
export type QuestQuest_Roles_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Quest_Role_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Quest_Role_Order_By>>;
  where?: InputMaybe<Quest_Role_Bool_Exp>;
};


/** columns and relationships of "quest" */
export type QuestQuest_SkillsArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Quest_Skill_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Quest_Skill_Order_By>>;
  where?: InputMaybe<Quest_Skill_Bool_Exp>;
};


/** columns and relationships of "quest" */
export type QuestQuest_Skills_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Quest_Skill_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Quest_Skill_Order_By>>;
  where?: InputMaybe<Quest_Skill_Bool_Exp>;
};

/** aggregated selection of "quest" */
export type Quest_Aggregate = {
  readonly __typename?: 'quest_aggregate';
  readonly aggregate?: Maybe<Quest_Aggregate_Fields>;
  readonly nodes: ReadonlyArray<Quest>;
};

/** aggregate fields of "quest" */
export type Quest_Aggregate_Fields = {
  readonly __typename?: 'quest_aggregate_fields';
  readonly avg?: Maybe<Quest_Avg_Fields>;
  readonly count?: Maybe<Scalars['Int']>;
  readonly max?: Maybe<Quest_Max_Fields>;
  readonly min?: Maybe<Quest_Min_Fields>;
  readonly stddev?: Maybe<Quest_Stddev_Fields>;
  readonly stddev_pop?: Maybe<Quest_Stddev_Pop_Fields>;
  readonly stddev_samp?: Maybe<Quest_Stddev_Samp_Fields>;
  readonly sum?: Maybe<Quest_Sum_Fields>;
  readonly var_pop?: Maybe<Quest_Var_Pop_Fields>;
  readonly var_samp?: Maybe<Quest_Var_Samp_Fields>;
  readonly variance?: Maybe<Quest_Variance_Fields>;
};


/** aggregate fields of "quest" */
export type Quest_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<ReadonlyArray<Quest_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "quest" */
export type Quest_Aggregate_Order_By = {
  readonly avg?: InputMaybe<Quest_Avg_Order_By>;
  readonly count?: InputMaybe<Order_By>;
  readonly max?: InputMaybe<Quest_Max_Order_By>;
  readonly min?: InputMaybe<Quest_Min_Order_By>;
  readonly stddev?: InputMaybe<Quest_Stddev_Order_By>;
  readonly stddev_pop?: InputMaybe<Quest_Stddev_Pop_Order_By>;
  readonly stddev_samp?: InputMaybe<Quest_Stddev_Samp_Order_By>;
  readonly sum?: InputMaybe<Quest_Sum_Order_By>;
  readonly var_pop?: InputMaybe<Quest_Var_Pop_Order_By>;
  readonly var_samp?: InputMaybe<Quest_Var_Samp_Order_By>;
  readonly variance?: InputMaybe<Quest_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "quest" */
export type Quest_Arr_Rel_Insert_Input = {
  readonly data: ReadonlyArray<Quest_Insert_Input>;
  readonly on_conflict?: InputMaybe<Quest_On_Conflict>;
};

/** aggregate avg on columns */
export type Quest_Avg_Fields = {
  readonly __typename?: 'quest_avg_fields';
  readonly cooldown?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "quest" */
export type Quest_Avg_Order_By = {
  readonly cooldown?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "quest". All fields are combined with a logical 'AND'. */
export type Quest_Bool_Exp = {
  readonly QuestRepetition?: InputMaybe<QuestRepetition_Bool_Exp>;
  readonly QuestStatus?: InputMaybe<QuestStatus_Bool_Exp>;
  readonly _and?: InputMaybe<ReadonlyArray<InputMaybe<Quest_Bool_Exp>>>;
  readonly _not?: InputMaybe<Quest_Bool_Exp>;
  readonly _or?: InputMaybe<ReadonlyArray<InputMaybe<Quest_Bool_Exp>>>;
  readonly cooldown?: InputMaybe<Int_Comparison_Exp>;
  readonly createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  readonly createdByPlayerId?: InputMaybe<Uuid_Comparison_Exp>;
  readonly description?: InputMaybe<String_Comparison_Exp>;
  readonly externalLink?: InputMaybe<String_Comparison_Exp>;
  readonly guild?: InputMaybe<Guild_Bool_Exp>;
  readonly guildId?: InputMaybe<Uuid_Comparison_Exp>;
  readonly id?: InputMaybe<Uuid_Comparison_Exp>;
  readonly image?: InputMaybe<String_Comparison_Exp>;
  readonly player?: InputMaybe<Player_Bool_Exp>;
  readonly quest_completions?: InputMaybe<Quest_Completion_Bool_Exp>;
  readonly quest_roles?: InputMaybe<Quest_Role_Bool_Exp>;
  readonly quest_skills?: InputMaybe<Quest_Skill_Bool_Exp>;
  readonly repetition?: InputMaybe<QuestRepetition_Enum_Comparison_Exp>;
  readonly status?: InputMaybe<QuestStatus_Enum_Comparison_Exp>;
  readonly title?: InputMaybe<String_Comparison_Exp>;
};

/** columns and relationships of "quest_completion" */
export type Quest_Completion = {
  readonly __typename?: 'quest_completion';
  /** An object relationship */
  readonly QuestCompletionStatus: QuestCompletionStatus;
  /** An object relationship */
  readonly completed?: Maybe<Quest>;
  readonly completedByPlayerId: Scalars['uuid'];
  readonly id: Scalars['uuid'];
  /** An object relationship */
  readonly player: Player;
  /** An object relationship */
  readonly quest: Quest;
  readonly questId: Scalars['uuid'];
  readonly status: QuestCompletionStatus_Enum;
  readonly submissionLink?: Maybe<Scalars['String']>;
  readonly submissionText?: Maybe<Scalars['String']>;
  readonly submittedAt: Scalars['timestamptz'];
};

/** aggregated selection of "quest_completion" */
export type Quest_Completion_Aggregate = {
  readonly __typename?: 'quest_completion_aggregate';
  readonly aggregate?: Maybe<Quest_Completion_Aggregate_Fields>;
  readonly nodes: ReadonlyArray<Quest_Completion>;
};

/** aggregate fields of "quest_completion" */
export type Quest_Completion_Aggregate_Fields = {
  readonly __typename?: 'quest_completion_aggregate_fields';
  readonly count?: Maybe<Scalars['Int']>;
  readonly max?: Maybe<Quest_Completion_Max_Fields>;
  readonly min?: Maybe<Quest_Completion_Min_Fields>;
};


/** aggregate fields of "quest_completion" */
export type Quest_Completion_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<ReadonlyArray<Quest_Completion_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "quest_completion" */
export type Quest_Completion_Aggregate_Order_By = {
  readonly count?: InputMaybe<Order_By>;
  readonly max?: InputMaybe<Quest_Completion_Max_Order_By>;
  readonly min?: InputMaybe<Quest_Completion_Min_Order_By>;
};

/** input type for inserting array relation for remote table "quest_completion" */
export type Quest_Completion_Arr_Rel_Insert_Input = {
  readonly data: ReadonlyArray<Quest_Completion_Insert_Input>;
  readonly on_conflict?: InputMaybe<Quest_Completion_On_Conflict>;
};

/** Boolean expression to filter rows from the table "quest_completion". All fields are combined with a logical 'AND'. */
export type Quest_Completion_Bool_Exp = {
  readonly QuestCompletionStatus?: InputMaybe<QuestCompletionStatus_Bool_Exp>;
  readonly _and?: InputMaybe<ReadonlyArray<InputMaybe<Quest_Completion_Bool_Exp>>>;
  readonly _not?: InputMaybe<Quest_Completion_Bool_Exp>;
  readonly _or?: InputMaybe<ReadonlyArray<InputMaybe<Quest_Completion_Bool_Exp>>>;
  readonly completed?: InputMaybe<Quest_Bool_Exp>;
  readonly completedByPlayerId?: InputMaybe<Uuid_Comparison_Exp>;
  readonly id?: InputMaybe<Uuid_Comparison_Exp>;
  readonly player?: InputMaybe<Player_Bool_Exp>;
  readonly quest?: InputMaybe<Quest_Bool_Exp>;
  readonly questId?: InputMaybe<Uuid_Comparison_Exp>;
  readonly status?: InputMaybe<QuestCompletionStatus_Enum_Comparison_Exp>;
  readonly submissionLink?: InputMaybe<String_Comparison_Exp>;
  readonly submissionText?: InputMaybe<String_Comparison_Exp>;
  readonly submittedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "quest_completion" */
export enum Quest_Completion_Constraint {
  /** unique or primary key constraint */
  QuestCompletionPkey = 'quest_completion_pkey'
}

/** input type for inserting data into table "quest_completion" */
export type Quest_Completion_Insert_Input = {
  readonly QuestCompletionStatus?: InputMaybe<QuestCompletionStatus_Obj_Rel_Insert_Input>;
  readonly completed?: InputMaybe<Quest_Obj_Rel_Insert_Input>;
  readonly completedByPlayerId?: InputMaybe<Scalars['uuid']>;
  readonly id?: InputMaybe<Scalars['uuid']>;
  readonly player?: InputMaybe<Player_Obj_Rel_Insert_Input>;
  readonly quest?: InputMaybe<Quest_Obj_Rel_Insert_Input>;
  readonly questId?: InputMaybe<Scalars['uuid']>;
  readonly status?: InputMaybe<QuestCompletionStatus_Enum>;
  readonly submissionLink?: InputMaybe<Scalars['String']>;
  readonly submissionText?: InputMaybe<Scalars['String']>;
  readonly submittedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Quest_Completion_Max_Fields = {
  readonly __typename?: 'quest_completion_max_fields';
  readonly completedByPlayerId?: Maybe<Scalars['uuid']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly questId?: Maybe<Scalars['uuid']>;
  readonly submissionLink?: Maybe<Scalars['String']>;
  readonly submissionText?: Maybe<Scalars['String']>;
  readonly submittedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "quest_completion" */
export type Quest_Completion_Max_Order_By = {
  readonly completedByPlayerId?: InputMaybe<Order_By>;
  readonly id?: InputMaybe<Order_By>;
  readonly questId?: InputMaybe<Order_By>;
  readonly submissionLink?: InputMaybe<Order_By>;
  readonly submissionText?: InputMaybe<Order_By>;
  readonly submittedAt?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Quest_Completion_Min_Fields = {
  readonly __typename?: 'quest_completion_min_fields';
  readonly completedByPlayerId?: Maybe<Scalars['uuid']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly questId?: Maybe<Scalars['uuid']>;
  readonly submissionLink?: Maybe<Scalars['String']>;
  readonly submissionText?: Maybe<Scalars['String']>;
  readonly submittedAt?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "quest_completion" */
export type Quest_Completion_Min_Order_By = {
  readonly completedByPlayerId?: InputMaybe<Order_By>;
  readonly id?: InputMaybe<Order_By>;
  readonly questId?: InputMaybe<Order_By>;
  readonly submissionLink?: InputMaybe<Order_By>;
  readonly submissionText?: InputMaybe<Order_By>;
  readonly submittedAt?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "quest_completion" */
export type Quest_Completion_Mutation_Response = {
  readonly __typename?: 'quest_completion_mutation_response';
  /** number of affected rows by the mutation */
  readonly affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  readonly returning: ReadonlyArray<Quest_Completion>;
};

/** input type for inserting object relation for remote table "quest_completion" */
export type Quest_Completion_Obj_Rel_Insert_Input = {
  readonly data: Quest_Completion_Insert_Input;
  readonly on_conflict?: InputMaybe<Quest_Completion_On_Conflict>;
};

/** on conflict condition type for table "quest_completion" */
export type Quest_Completion_On_Conflict = {
  readonly constraint: Quest_Completion_Constraint;
  readonly update_columns: ReadonlyArray<Quest_Completion_Update_Column>;
  readonly where?: InputMaybe<Quest_Completion_Bool_Exp>;
};

/** ordering options when selecting data from "quest_completion" */
export type Quest_Completion_Order_By = {
  readonly QuestCompletionStatus?: InputMaybe<QuestCompletionStatus_Order_By>;
  readonly completed?: InputMaybe<Quest_Order_By>;
  readonly completedByPlayerId?: InputMaybe<Order_By>;
  readonly id?: InputMaybe<Order_By>;
  readonly player?: InputMaybe<Player_Order_By>;
  readonly quest?: InputMaybe<Quest_Order_By>;
  readonly questId?: InputMaybe<Order_By>;
  readonly status?: InputMaybe<Order_By>;
  readonly submissionLink?: InputMaybe<Order_By>;
  readonly submissionText?: InputMaybe<Order_By>;
  readonly submittedAt?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "quest_completion" */
export type Quest_Completion_Pk_Columns_Input = {
  readonly id: Scalars['uuid'];
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
  SubmittedAt = 'submittedAt'
}

/** input type for updating data in table "quest_completion" */
export type Quest_Completion_Set_Input = {
  readonly completedByPlayerId?: InputMaybe<Scalars['uuid']>;
  readonly id?: InputMaybe<Scalars['uuid']>;
  readonly questId?: InputMaybe<Scalars['uuid']>;
  readonly status?: InputMaybe<QuestCompletionStatus_Enum>;
  readonly submissionLink?: InputMaybe<Scalars['String']>;
  readonly submissionText?: InputMaybe<Scalars['String']>;
  readonly submittedAt?: InputMaybe<Scalars['timestamptz']>;
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
  SubmittedAt = 'submittedAt'
}

/** unique or primary key constraints on table "quest" */
export enum Quest_Constraint {
  /** unique or primary key constraint */
  QuestPkey = 'quest_pkey'
}

/** input type for incrementing integer column in table "quest" */
export type Quest_Inc_Input = {
  readonly cooldown?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "quest" */
export type Quest_Insert_Input = {
  readonly QuestRepetition?: InputMaybe<QuestRepetition_Obj_Rel_Insert_Input>;
  readonly QuestStatus?: InputMaybe<QuestStatus_Obj_Rel_Insert_Input>;
  readonly cooldown?: InputMaybe<Scalars['Int']>;
  readonly createdAt?: InputMaybe<Scalars['timestamptz']>;
  readonly createdByPlayerId?: InputMaybe<Scalars['uuid']>;
  readonly description?: InputMaybe<Scalars['String']>;
  readonly externalLink?: InputMaybe<Scalars['String']>;
  readonly guild?: InputMaybe<Guild_Obj_Rel_Insert_Input>;
  readonly guildId?: InputMaybe<Scalars['uuid']>;
  readonly id?: InputMaybe<Scalars['uuid']>;
  readonly image?: InputMaybe<Scalars['String']>;
  readonly player?: InputMaybe<Player_Obj_Rel_Insert_Input>;
  readonly quest_completions?: InputMaybe<Quest_Completion_Arr_Rel_Insert_Input>;
  readonly quest_roles?: InputMaybe<Quest_Role_Arr_Rel_Insert_Input>;
  readonly quest_skills?: InputMaybe<Quest_Skill_Arr_Rel_Insert_Input>;
  readonly repetition?: InputMaybe<QuestRepetition_Enum>;
  readonly status?: InputMaybe<QuestStatus_Enum>;
  readonly title?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Quest_Max_Fields = {
  readonly __typename?: 'quest_max_fields';
  readonly cooldown?: Maybe<Scalars['Int']>;
  readonly createdAt?: Maybe<Scalars['timestamptz']>;
  readonly createdByPlayerId?: Maybe<Scalars['uuid']>;
  readonly description?: Maybe<Scalars['String']>;
  readonly externalLink?: Maybe<Scalars['String']>;
  readonly guildId?: Maybe<Scalars['uuid']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly image?: Maybe<Scalars['String']>;
  readonly title?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "quest" */
export type Quest_Max_Order_By = {
  readonly cooldown?: InputMaybe<Order_By>;
  readonly createdAt?: InputMaybe<Order_By>;
  readonly createdByPlayerId?: InputMaybe<Order_By>;
  readonly description?: InputMaybe<Order_By>;
  readonly externalLink?: InputMaybe<Order_By>;
  readonly guildId?: InputMaybe<Order_By>;
  readonly id?: InputMaybe<Order_By>;
  readonly image?: InputMaybe<Order_By>;
  readonly title?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Quest_Min_Fields = {
  readonly __typename?: 'quest_min_fields';
  readonly cooldown?: Maybe<Scalars['Int']>;
  readonly createdAt?: Maybe<Scalars['timestamptz']>;
  readonly createdByPlayerId?: Maybe<Scalars['uuid']>;
  readonly description?: Maybe<Scalars['String']>;
  readonly externalLink?: Maybe<Scalars['String']>;
  readonly guildId?: Maybe<Scalars['uuid']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly image?: Maybe<Scalars['String']>;
  readonly title?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "quest" */
export type Quest_Min_Order_By = {
  readonly cooldown?: InputMaybe<Order_By>;
  readonly createdAt?: InputMaybe<Order_By>;
  readonly createdByPlayerId?: InputMaybe<Order_By>;
  readonly description?: InputMaybe<Order_By>;
  readonly externalLink?: InputMaybe<Order_By>;
  readonly guildId?: InputMaybe<Order_By>;
  readonly id?: InputMaybe<Order_By>;
  readonly image?: InputMaybe<Order_By>;
  readonly title?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "quest" */
export type Quest_Mutation_Response = {
  readonly __typename?: 'quest_mutation_response';
  /** number of affected rows by the mutation */
  readonly affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  readonly returning: ReadonlyArray<Quest>;
};

/** input type for inserting object relation for remote table "quest" */
export type Quest_Obj_Rel_Insert_Input = {
  readonly data: Quest_Insert_Input;
  readonly on_conflict?: InputMaybe<Quest_On_Conflict>;
};

/** on conflict condition type for table "quest" */
export type Quest_On_Conflict = {
  readonly constraint: Quest_Constraint;
  readonly update_columns: ReadonlyArray<Quest_Update_Column>;
  readonly where?: InputMaybe<Quest_Bool_Exp>;
};

/** ordering options when selecting data from "quest" */
export type Quest_Order_By = {
  readonly QuestRepetition?: InputMaybe<QuestRepetition_Order_By>;
  readonly QuestStatus?: InputMaybe<QuestStatus_Order_By>;
  readonly cooldown?: InputMaybe<Order_By>;
  readonly createdAt?: InputMaybe<Order_By>;
  readonly createdByPlayerId?: InputMaybe<Order_By>;
  readonly description?: InputMaybe<Order_By>;
  readonly externalLink?: InputMaybe<Order_By>;
  readonly guild?: InputMaybe<Guild_Order_By>;
  readonly guildId?: InputMaybe<Order_By>;
  readonly id?: InputMaybe<Order_By>;
  readonly image?: InputMaybe<Order_By>;
  readonly player?: InputMaybe<Player_Order_By>;
  readonly quest_completions_aggregate?: InputMaybe<Quest_Completion_Aggregate_Order_By>;
  readonly quest_roles_aggregate?: InputMaybe<Quest_Role_Aggregate_Order_By>;
  readonly quest_skills_aggregate?: InputMaybe<Quest_Skill_Aggregate_Order_By>;
  readonly repetition?: InputMaybe<Order_By>;
  readonly status?: InputMaybe<Order_By>;
  readonly title?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "quest" */
export type Quest_Pk_Columns_Input = {
  readonly id: Scalars['uuid'];
};

/** columns and relationships of "quest_role" */
export type Quest_Role = {
  readonly __typename?: 'quest_role';
  /** An object relationship */
  readonly PlayerRole: PlayerRole;
  /** An object relationship */
  readonly quest: Quest;
  readonly questId: Scalars['uuid'];
  readonly rank?: Maybe<Scalars['Int']>;
  readonly role: Scalars['String'];
};

/** aggregated selection of "quest_role" */
export type Quest_Role_Aggregate = {
  readonly __typename?: 'quest_role_aggregate';
  readonly aggregate?: Maybe<Quest_Role_Aggregate_Fields>;
  readonly nodes: ReadonlyArray<Quest_Role>;
};

/** aggregate fields of "quest_role" */
export type Quest_Role_Aggregate_Fields = {
  readonly __typename?: 'quest_role_aggregate_fields';
  readonly avg?: Maybe<Quest_Role_Avg_Fields>;
  readonly count?: Maybe<Scalars['Int']>;
  readonly max?: Maybe<Quest_Role_Max_Fields>;
  readonly min?: Maybe<Quest_Role_Min_Fields>;
  readonly stddev?: Maybe<Quest_Role_Stddev_Fields>;
  readonly stddev_pop?: Maybe<Quest_Role_Stddev_Pop_Fields>;
  readonly stddev_samp?: Maybe<Quest_Role_Stddev_Samp_Fields>;
  readonly sum?: Maybe<Quest_Role_Sum_Fields>;
  readonly var_pop?: Maybe<Quest_Role_Var_Pop_Fields>;
  readonly var_samp?: Maybe<Quest_Role_Var_Samp_Fields>;
  readonly variance?: Maybe<Quest_Role_Variance_Fields>;
};


/** aggregate fields of "quest_role" */
export type Quest_Role_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<ReadonlyArray<Quest_Role_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "quest_role" */
export type Quest_Role_Aggregate_Order_By = {
  readonly avg?: InputMaybe<Quest_Role_Avg_Order_By>;
  readonly count?: InputMaybe<Order_By>;
  readonly max?: InputMaybe<Quest_Role_Max_Order_By>;
  readonly min?: InputMaybe<Quest_Role_Min_Order_By>;
  readonly stddev?: InputMaybe<Quest_Role_Stddev_Order_By>;
  readonly stddev_pop?: InputMaybe<Quest_Role_Stddev_Pop_Order_By>;
  readonly stddev_samp?: InputMaybe<Quest_Role_Stddev_Samp_Order_By>;
  readonly sum?: InputMaybe<Quest_Role_Sum_Order_By>;
  readonly var_pop?: InputMaybe<Quest_Role_Var_Pop_Order_By>;
  readonly var_samp?: InputMaybe<Quest_Role_Var_Samp_Order_By>;
  readonly variance?: InputMaybe<Quest_Role_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "quest_role" */
export type Quest_Role_Arr_Rel_Insert_Input = {
  readonly data: ReadonlyArray<Quest_Role_Insert_Input>;
  readonly on_conflict?: InputMaybe<Quest_Role_On_Conflict>;
};

/** aggregate avg on columns */
export type Quest_Role_Avg_Fields = {
  readonly __typename?: 'quest_role_avg_fields';
  readonly rank?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "quest_role" */
export type Quest_Role_Avg_Order_By = {
  readonly rank?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "quest_role". All fields are combined with a logical 'AND'. */
export type Quest_Role_Bool_Exp = {
  readonly PlayerRole?: InputMaybe<PlayerRole_Bool_Exp>;
  readonly _and?: InputMaybe<ReadonlyArray<InputMaybe<Quest_Role_Bool_Exp>>>;
  readonly _not?: InputMaybe<Quest_Role_Bool_Exp>;
  readonly _or?: InputMaybe<ReadonlyArray<InputMaybe<Quest_Role_Bool_Exp>>>;
  readonly quest?: InputMaybe<Quest_Bool_Exp>;
  readonly questId?: InputMaybe<Uuid_Comparison_Exp>;
  readonly rank?: InputMaybe<Int_Comparison_Exp>;
  readonly role?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "quest_role" */
export enum Quest_Role_Constraint {
  /** unique or primary key constraint */
  QuestRolePkey = 'quest_role_pkey'
}

/** input type for incrementing integer column in table "quest_role" */
export type Quest_Role_Inc_Input = {
  readonly rank?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "quest_role" */
export type Quest_Role_Insert_Input = {
  readonly PlayerRole?: InputMaybe<PlayerRole_Obj_Rel_Insert_Input>;
  readonly quest?: InputMaybe<Quest_Obj_Rel_Insert_Input>;
  readonly questId?: InputMaybe<Scalars['uuid']>;
  readonly rank?: InputMaybe<Scalars['Int']>;
  readonly role?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Quest_Role_Max_Fields = {
  readonly __typename?: 'quest_role_max_fields';
  readonly questId?: Maybe<Scalars['uuid']>;
  readonly rank?: Maybe<Scalars['Int']>;
  readonly role?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "quest_role" */
export type Quest_Role_Max_Order_By = {
  readonly questId?: InputMaybe<Order_By>;
  readonly rank?: InputMaybe<Order_By>;
  readonly role?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Quest_Role_Min_Fields = {
  readonly __typename?: 'quest_role_min_fields';
  readonly questId?: Maybe<Scalars['uuid']>;
  readonly rank?: Maybe<Scalars['Int']>;
  readonly role?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "quest_role" */
export type Quest_Role_Min_Order_By = {
  readonly questId?: InputMaybe<Order_By>;
  readonly rank?: InputMaybe<Order_By>;
  readonly role?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "quest_role" */
export type Quest_Role_Mutation_Response = {
  readonly __typename?: 'quest_role_mutation_response';
  /** number of affected rows by the mutation */
  readonly affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  readonly returning: ReadonlyArray<Quest_Role>;
};

/** input type for inserting object relation for remote table "quest_role" */
export type Quest_Role_Obj_Rel_Insert_Input = {
  readonly data: Quest_Role_Insert_Input;
  readonly on_conflict?: InputMaybe<Quest_Role_On_Conflict>;
};

/** on conflict condition type for table "quest_role" */
export type Quest_Role_On_Conflict = {
  readonly constraint: Quest_Role_Constraint;
  readonly update_columns: ReadonlyArray<Quest_Role_Update_Column>;
  readonly where?: InputMaybe<Quest_Role_Bool_Exp>;
};

/** ordering options when selecting data from "quest_role" */
export type Quest_Role_Order_By = {
  readonly PlayerRole?: InputMaybe<PlayerRole_Order_By>;
  readonly quest?: InputMaybe<Quest_Order_By>;
  readonly questId?: InputMaybe<Order_By>;
  readonly rank?: InputMaybe<Order_By>;
  readonly role?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "quest_role" */
export type Quest_Role_Pk_Columns_Input = {
  readonly questId: Scalars['uuid'];
  readonly role: Scalars['String'];
};

/** select columns of table "quest_role" */
export enum Quest_Role_Select_Column {
  /** column name */
  QuestId = 'questId',
  /** column name */
  Rank = 'rank',
  /** column name */
  Role = 'role'
}

/** input type for updating data in table "quest_role" */
export type Quest_Role_Set_Input = {
  readonly questId?: InputMaybe<Scalars['uuid']>;
  readonly rank?: InputMaybe<Scalars['Int']>;
  readonly role?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Quest_Role_Stddev_Fields = {
  readonly __typename?: 'quest_role_stddev_fields';
  readonly rank?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "quest_role" */
export type Quest_Role_Stddev_Order_By = {
  readonly rank?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Quest_Role_Stddev_Pop_Fields = {
  readonly __typename?: 'quest_role_stddev_pop_fields';
  readonly rank?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "quest_role" */
export type Quest_Role_Stddev_Pop_Order_By = {
  readonly rank?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Quest_Role_Stddev_Samp_Fields = {
  readonly __typename?: 'quest_role_stddev_samp_fields';
  readonly rank?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "quest_role" */
export type Quest_Role_Stddev_Samp_Order_By = {
  readonly rank?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Quest_Role_Sum_Fields = {
  readonly __typename?: 'quest_role_sum_fields';
  readonly rank?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "quest_role" */
export type Quest_Role_Sum_Order_By = {
  readonly rank?: InputMaybe<Order_By>;
};

/** update columns of table "quest_role" */
export enum Quest_Role_Update_Column {
  /** column name */
  QuestId = 'questId',
  /** column name */
  Rank = 'rank',
  /** column name */
  Role = 'role'
}

/** aggregate var_pop on columns */
export type Quest_Role_Var_Pop_Fields = {
  readonly __typename?: 'quest_role_var_pop_fields';
  readonly rank?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "quest_role" */
export type Quest_Role_Var_Pop_Order_By = {
  readonly rank?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Quest_Role_Var_Samp_Fields = {
  readonly __typename?: 'quest_role_var_samp_fields';
  readonly rank?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "quest_role" */
export type Quest_Role_Var_Samp_Order_By = {
  readonly rank?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Quest_Role_Variance_Fields = {
  readonly __typename?: 'quest_role_variance_fields';
  readonly rank?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "quest_role" */
export type Quest_Role_Variance_Order_By = {
  readonly rank?: InputMaybe<Order_By>;
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
  Title = 'title'
}

/** input type for updating data in table "quest" */
export type Quest_Set_Input = {
  readonly cooldown?: InputMaybe<Scalars['Int']>;
  readonly createdAt?: InputMaybe<Scalars['timestamptz']>;
  readonly createdByPlayerId?: InputMaybe<Scalars['uuid']>;
  readonly description?: InputMaybe<Scalars['String']>;
  readonly externalLink?: InputMaybe<Scalars['String']>;
  readonly guildId?: InputMaybe<Scalars['uuid']>;
  readonly id?: InputMaybe<Scalars['uuid']>;
  readonly image?: InputMaybe<Scalars['String']>;
  readonly repetition?: InputMaybe<QuestRepetition_Enum>;
  readonly status?: InputMaybe<QuestStatus_Enum>;
  readonly title?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "quest_skill" */
export type Quest_Skill = {
  readonly __typename?: 'quest_skill';
  /** An object relationship */
  readonly quest: Quest;
  readonly questId: Scalars['uuid'];
  /** An object relationship */
  readonly skill: Skill;
  readonly skillId: Scalars['uuid'];
};

/** aggregated selection of "quest_skill" */
export type Quest_Skill_Aggregate = {
  readonly __typename?: 'quest_skill_aggregate';
  readonly aggregate?: Maybe<Quest_Skill_Aggregate_Fields>;
  readonly nodes: ReadonlyArray<Quest_Skill>;
};

/** aggregate fields of "quest_skill" */
export type Quest_Skill_Aggregate_Fields = {
  readonly __typename?: 'quest_skill_aggregate_fields';
  readonly count?: Maybe<Scalars['Int']>;
  readonly max?: Maybe<Quest_Skill_Max_Fields>;
  readonly min?: Maybe<Quest_Skill_Min_Fields>;
};


/** aggregate fields of "quest_skill" */
export type Quest_Skill_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<ReadonlyArray<Quest_Skill_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "quest_skill" */
export type Quest_Skill_Aggregate_Order_By = {
  readonly count?: InputMaybe<Order_By>;
  readonly max?: InputMaybe<Quest_Skill_Max_Order_By>;
  readonly min?: InputMaybe<Quest_Skill_Min_Order_By>;
};

/** input type for inserting array relation for remote table "quest_skill" */
export type Quest_Skill_Arr_Rel_Insert_Input = {
  readonly data: ReadonlyArray<Quest_Skill_Insert_Input>;
  readonly on_conflict?: InputMaybe<Quest_Skill_On_Conflict>;
};

/** Boolean expression to filter rows from the table "quest_skill". All fields are combined with a logical 'AND'. */
export type Quest_Skill_Bool_Exp = {
  readonly _and?: InputMaybe<ReadonlyArray<InputMaybe<Quest_Skill_Bool_Exp>>>;
  readonly _not?: InputMaybe<Quest_Skill_Bool_Exp>;
  readonly _or?: InputMaybe<ReadonlyArray<InputMaybe<Quest_Skill_Bool_Exp>>>;
  readonly quest?: InputMaybe<Quest_Bool_Exp>;
  readonly questId?: InputMaybe<Uuid_Comparison_Exp>;
  readonly skill?: InputMaybe<Skill_Bool_Exp>;
  readonly skillId?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "quest_skill" */
export enum Quest_Skill_Constraint {
  /** unique or primary key constraint */
  QuestSkillPkey = 'quest_skill_pkey'
}

/** input type for inserting data into table "quest_skill" */
export type Quest_Skill_Insert_Input = {
  readonly quest?: InputMaybe<Quest_Obj_Rel_Insert_Input>;
  readonly questId?: InputMaybe<Scalars['uuid']>;
  readonly skill?: InputMaybe<Skill_Obj_Rel_Insert_Input>;
  readonly skillId?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Quest_Skill_Max_Fields = {
  readonly __typename?: 'quest_skill_max_fields';
  readonly questId?: Maybe<Scalars['uuid']>;
  readonly skillId?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "quest_skill" */
export type Quest_Skill_Max_Order_By = {
  readonly questId?: InputMaybe<Order_By>;
  readonly skillId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Quest_Skill_Min_Fields = {
  readonly __typename?: 'quest_skill_min_fields';
  readonly questId?: Maybe<Scalars['uuid']>;
  readonly skillId?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "quest_skill" */
export type Quest_Skill_Min_Order_By = {
  readonly questId?: InputMaybe<Order_By>;
  readonly skillId?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "quest_skill" */
export type Quest_Skill_Mutation_Response = {
  readonly __typename?: 'quest_skill_mutation_response';
  /** number of affected rows by the mutation */
  readonly affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  readonly returning: ReadonlyArray<Quest_Skill>;
};

/** input type for inserting object relation for remote table "quest_skill" */
export type Quest_Skill_Obj_Rel_Insert_Input = {
  readonly data: Quest_Skill_Insert_Input;
  readonly on_conflict?: InputMaybe<Quest_Skill_On_Conflict>;
};

/** on conflict condition type for table "quest_skill" */
export type Quest_Skill_On_Conflict = {
  readonly constraint: Quest_Skill_Constraint;
  readonly update_columns: ReadonlyArray<Quest_Skill_Update_Column>;
  readonly where?: InputMaybe<Quest_Skill_Bool_Exp>;
};

/** ordering options when selecting data from "quest_skill" */
export type Quest_Skill_Order_By = {
  readonly quest?: InputMaybe<Quest_Order_By>;
  readonly questId?: InputMaybe<Order_By>;
  readonly skill?: InputMaybe<Skill_Order_By>;
  readonly skillId?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "quest_skill" */
export type Quest_Skill_Pk_Columns_Input = {
  readonly questId: Scalars['uuid'];
  readonly skillId: Scalars['uuid'];
};

/** select columns of table "quest_skill" */
export enum Quest_Skill_Select_Column {
  /** column name */
  QuestId = 'questId',
  /** column name */
  SkillId = 'skillId'
}

/** input type for updating data in table "quest_skill" */
export type Quest_Skill_Set_Input = {
  readonly questId?: InputMaybe<Scalars['uuid']>;
  readonly skillId?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "quest_skill" */
export enum Quest_Skill_Update_Column {
  /** column name */
  QuestId = 'questId',
  /** column name */
  SkillId = 'skillId'
}

/** aggregate stddev on columns */
export type Quest_Stddev_Fields = {
  readonly __typename?: 'quest_stddev_fields';
  readonly cooldown?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "quest" */
export type Quest_Stddev_Order_By = {
  readonly cooldown?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Quest_Stddev_Pop_Fields = {
  readonly __typename?: 'quest_stddev_pop_fields';
  readonly cooldown?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "quest" */
export type Quest_Stddev_Pop_Order_By = {
  readonly cooldown?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Quest_Stddev_Samp_Fields = {
  readonly __typename?: 'quest_stddev_samp_fields';
  readonly cooldown?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "quest" */
export type Quest_Stddev_Samp_Order_By = {
  readonly cooldown?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Quest_Sum_Fields = {
  readonly __typename?: 'quest_sum_fields';
  readonly cooldown?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "quest" */
export type Quest_Sum_Order_By = {
  readonly cooldown?: InputMaybe<Order_By>;
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
  Title = 'title'
}

/** aggregate var_pop on columns */
export type Quest_Var_Pop_Fields = {
  readonly __typename?: 'quest_var_pop_fields';
  readonly cooldown?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "quest" */
export type Quest_Var_Pop_Order_By = {
  readonly cooldown?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Quest_Var_Samp_Fields = {
  readonly __typename?: 'quest_var_samp_fields';
  readonly cooldown?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "quest" */
export type Quest_Var_Samp_Order_By = {
  readonly cooldown?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Quest_Variance_Fields = {
  readonly __typename?: 'quest_variance_fields';
  readonly cooldown?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "quest" */
export type Quest_Variance_Order_By = {
  readonly cooldown?: InputMaybe<Order_By>;
};

/** columns and relationships of "skill" */
export type Skill = {
  readonly __typename?: 'skill';
  /** An array relationship */
  readonly Player_Skills: ReadonlyArray<Player_Skill>;
  /** An aggregated array relationship */
  readonly Player_Skills_aggregate: Player_Skill_Aggregate;
  readonly category: SkillCategory_Enum;
  readonly id: Scalars['uuid'];
  readonly name: Scalars['String'];
  /** An array relationship */
  readonly quest_skills: ReadonlyArray<Quest_Skill>;
  /** An aggregated array relationship */
  readonly quest_skills_aggregate: Quest_Skill_Aggregate;
};


/** columns and relationships of "skill" */
export type SkillPlayer_SkillsArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Player_Skill_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Player_Skill_Order_By>>;
  where?: InputMaybe<Player_Skill_Bool_Exp>;
};


/** columns and relationships of "skill" */
export type SkillPlayer_Skills_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Player_Skill_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Player_Skill_Order_By>>;
  where?: InputMaybe<Player_Skill_Bool_Exp>;
};


/** columns and relationships of "skill" */
export type SkillQuest_SkillsArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Quest_Skill_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Quest_Skill_Order_By>>;
  where?: InputMaybe<Quest_Skill_Bool_Exp>;
};


/** columns and relationships of "skill" */
export type SkillQuest_Skills_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Quest_Skill_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Quest_Skill_Order_By>>;
  where?: InputMaybe<Quest_Skill_Bool_Exp>;
};

/** aggregated selection of "skill" */
export type Skill_Aggregate = {
  readonly __typename?: 'skill_aggregate';
  readonly aggregate?: Maybe<Skill_Aggregate_Fields>;
  readonly nodes: ReadonlyArray<Skill>;
};

/** aggregate fields of "skill" */
export type Skill_Aggregate_Fields = {
  readonly __typename?: 'skill_aggregate_fields';
  readonly count?: Maybe<Scalars['Int']>;
  readonly max?: Maybe<Skill_Max_Fields>;
  readonly min?: Maybe<Skill_Min_Fields>;
};


/** aggregate fields of "skill" */
export type Skill_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<ReadonlyArray<Skill_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "skill" */
export type Skill_Aggregate_Order_By = {
  readonly count?: InputMaybe<Order_By>;
  readonly max?: InputMaybe<Skill_Max_Order_By>;
  readonly min?: InputMaybe<Skill_Min_Order_By>;
};

/** input type for inserting array relation for remote table "skill" */
export type Skill_Arr_Rel_Insert_Input = {
  readonly data: ReadonlyArray<Skill_Insert_Input>;
  readonly on_conflict?: InputMaybe<Skill_On_Conflict>;
};

/** Boolean expression to filter rows from the table "skill". All fields are combined with a logical 'AND'. */
export type Skill_Bool_Exp = {
  readonly Player_Skills?: InputMaybe<Player_Skill_Bool_Exp>;
  readonly _and?: InputMaybe<ReadonlyArray<InputMaybe<Skill_Bool_Exp>>>;
  readonly _not?: InputMaybe<Skill_Bool_Exp>;
  readonly _or?: InputMaybe<ReadonlyArray<InputMaybe<Skill_Bool_Exp>>>;
  readonly category?: InputMaybe<SkillCategory_Enum_Comparison_Exp>;
  readonly id?: InputMaybe<Uuid_Comparison_Exp>;
  readonly name?: InputMaybe<String_Comparison_Exp>;
  readonly quest_skills?: InputMaybe<Quest_Skill_Bool_Exp>;
};

/** unique or primary key constraints on table "skill" */
export enum Skill_Constraint {
  /** unique or primary key constraint */
  SkillPkey = 'Skill_pkey'
}

/** input type for inserting data into table "skill" */
export type Skill_Insert_Input = {
  readonly Player_Skills?: InputMaybe<Player_Skill_Arr_Rel_Insert_Input>;
  readonly category?: InputMaybe<SkillCategory_Enum>;
  readonly id?: InputMaybe<Scalars['uuid']>;
  readonly name?: InputMaybe<Scalars['String']>;
  readonly quest_skills?: InputMaybe<Quest_Skill_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Skill_Max_Fields = {
  readonly __typename?: 'skill_max_fields';
  readonly id?: Maybe<Scalars['uuid']>;
  readonly name?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "skill" */
export type Skill_Max_Order_By = {
  readonly id?: InputMaybe<Order_By>;
  readonly name?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Skill_Min_Fields = {
  readonly __typename?: 'skill_min_fields';
  readonly id?: Maybe<Scalars['uuid']>;
  readonly name?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "skill" */
export type Skill_Min_Order_By = {
  readonly id?: InputMaybe<Order_By>;
  readonly name?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "skill" */
export type Skill_Mutation_Response = {
  readonly __typename?: 'skill_mutation_response';
  /** number of affected rows by the mutation */
  readonly affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  readonly returning: ReadonlyArray<Skill>;
};

/** input type for inserting object relation for remote table "skill" */
export type Skill_Obj_Rel_Insert_Input = {
  readonly data: Skill_Insert_Input;
  readonly on_conflict?: InputMaybe<Skill_On_Conflict>;
};

/** on conflict condition type for table "skill" */
export type Skill_On_Conflict = {
  readonly constraint: Skill_Constraint;
  readonly update_columns: ReadonlyArray<Skill_Update_Column>;
  readonly where?: InputMaybe<Skill_Bool_Exp>;
};

/** ordering options when selecting data from "skill" */
export type Skill_Order_By = {
  readonly Player_Skills_aggregate?: InputMaybe<Player_Skill_Aggregate_Order_By>;
  readonly category?: InputMaybe<Order_By>;
  readonly id?: InputMaybe<Order_By>;
  readonly name?: InputMaybe<Order_By>;
  readonly quest_skills_aggregate?: InputMaybe<Quest_Skill_Aggregate_Order_By>;
};

/** primary key columns input for table: "skill" */
export type Skill_Pk_Columns_Input = {
  readonly id: Scalars['uuid'];
};

/** select columns of table "skill" */
export enum Skill_Select_Column {
  /** column name */
  Category = 'category',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

/** input type for updating data in table "skill" */
export type Skill_Set_Input = {
  readonly category?: InputMaybe<SkillCategory_Enum>;
  readonly id?: InputMaybe<Scalars['uuid']>;
  readonly name?: InputMaybe<Scalars['String']>;
};

/** update columns of table "skill" */
export enum Skill_Update_Column {
  /** column name */
  Category = 'category',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

/** subscription root */
export type Subscription_Root = {
  readonly __typename?: 'subscription_root';
  /** fetch data from the table: "AccountType" */
  readonly AccountType: ReadonlyArray<AccountType>;
  /** fetch aggregated fields from the table: "AccountType" */
  readonly AccountType_aggregate: AccountType_Aggregate;
  /** fetch data from the table: "AccountType" using primary key columns */
  readonly AccountType_by_pk?: Maybe<AccountType>;
  /** fetch data from the table: "ColorAspect" */
  readonly ColorAspect: ReadonlyArray<ColorAspect>;
  /** fetch aggregated fields from the table: "ColorAspect" */
  readonly ColorAspect_aggregate: ColorAspect_Aggregate;
  /** fetch data from the table: "ColorAspect" using primary key columns */
  readonly ColorAspect_by_pk?: Maybe<ColorAspect>;
  /** fetch data from the table: "ExplorerType" */
  readonly ExplorerType: ReadonlyArray<ExplorerType>;
  /** fetch aggregated fields from the table: "ExplorerType" */
  readonly ExplorerType_aggregate: ExplorerType_Aggregate;
  /** fetch data from the table: "ExplorerType" using primary key columns */
  readonly ExplorerType_by_pk?: Maybe<ExplorerType>;
  /** fetch data from the table: "GuildStatus" */
  readonly GuildStatus: ReadonlyArray<GuildStatus>;
  /** fetch aggregated fields from the table: "GuildStatus" */
  readonly GuildStatus_aggregate: GuildStatus_Aggregate;
  /** fetch data from the table: "GuildStatus" using primary key columns */
  readonly GuildStatus_by_pk?: Maybe<GuildStatus>;
  /** fetch data from the table: "GuildType" */
  readonly GuildType: ReadonlyArray<GuildType>;
  /** fetch aggregated fields from the table: "GuildType" */
  readonly GuildType_aggregate: GuildType_Aggregate;
  /** fetch data from the table: "GuildType" using primary key columns */
  readonly GuildType_by_pk?: Maybe<GuildType>;
  /** fetch data from the table: "PlayerRank" */
  readonly PlayerRank: ReadonlyArray<PlayerRank>;
  /** fetch aggregated fields from the table: "PlayerRank" */
  readonly PlayerRank_aggregate: PlayerRank_Aggregate;
  /** fetch data from the table: "PlayerRank" using primary key columns */
  readonly PlayerRank_by_pk?: Maybe<PlayerRank>;
  /** fetch data from the table: "PlayerRole" */
  readonly PlayerRole: ReadonlyArray<PlayerRole>;
  /** fetch aggregated fields from the table: "PlayerRole" */
  readonly PlayerRole_aggregate: PlayerRole_Aggregate;
  /** fetch data from the table: "PlayerRole" using primary key columns */
  readonly PlayerRole_by_pk?: Maybe<PlayerRole>;
  /** fetch data from the table: "QuestCompletionStatus" */
  readonly QuestCompletionStatus: ReadonlyArray<QuestCompletionStatus>;
  /** fetch aggregated fields from the table: "QuestCompletionStatus" */
  readonly QuestCompletionStatus_aggregate: QuestCompletionStatus_Aggregate;
  /** fetch data from the table: "QuestCompletionStatus" using primary key columns */
  readonly QuestCompletionStatus_by_pk?: Maybe<QuestCompletionStatus>;
  /** fetch data from the table: "QuestRepetition" */
  readonly QuestRepetition: ReadonlyArray<QuestRepetition>;
  /** fetch aggregated fields from the table: "QuestRepetition" */
  readonly QuestRepetition_aggregate: QuestRepetition_Aggregate;
  /** fetch data from the table: "QuestRepetition" using primary key columns */
  readonly QuestRepetition_by_pk?: Maybe<QuestRepetition>;
  /** fetch data from the table: "QuestStatus" */
  readonly QuestStatus: ReadonlyArray<QuestStatus>;
  /** fetch aggregated fields from the table: "QuestStatus" */
  readonly QuestStatus_aggregate: QuestStatus_Aggregate;
  /** fetch data from the table: "QuestStatus" using primary key columns */
  readonly QuestStatus_by_pk?: Maybe<QuestStatus>;
  /** fetch data from the table: "SkillCategory" */
  readonly SkillCategory: ReadonlyArray<SkillCategory>;
  /** fetch aggregated fields from the table: "SkillCategory" */
  readonly SkillCategory_aggregate: SkillCategory_Aggregate;
  /** fetch data from the table: "SkillCategory" using primary key columns */
  readonly SkillCategory_by_pk?: Maybe<SkillCategory>;
  /** fetch data from the table: "balance" */
  readonly balance: ReadonlyArray<Balance>;
  /** fetch aggregated fields from the table: "balance" */
  readonly balance_aggregate: Balance_Aggregate;
  /** fetch data from the table: "balance" using primary key columns */
  readonly balance_by_pk?: Maybe<Balance>;
  /** fetch data from the table: "dao" */
  readonly dao: ReadonlyArray<Dao>;
  /** fetch aggregated fields from the table: "dao" */
  readonly dao_aggregate: Dao_Aggregate;
  /** fetch data from the table: "dao" using primary key columns */
  readonly dao_by_pk?: Maybe<Dao>;
  /** fetch data from the table: "dao_player" */
  readonly dao_player: ReadonlyArray<Dao_Player>;
  /** fetch aggregated fields from the table: "dao_player" */
  readonly dao_player_aggregate: Dao_Player_Aggregate;
  /** fetch data from the table: "dao_player" using primary key columns */
  readonly dao_player_by_pk?: Maybe<Dao_Player>;
  /** fetch data from the table: "guild" */
  readonly guild: ReadonlyArray<Guild>;
  /** fetch aggregated fields from the table: "guild" */
  readonly guild_aggregate: Guild_Aggregate;
  /** fetch data from the table: "guild" using primary key columns */
  readonly guild_by_pk?: Maybe<Guild>;
  /** fetch data from the table: "guild_metadata" */
  readonly guild_metadata: ReadonlyArray<Guild_Metadata>;
  /** fetch aggregated fields from the table: "guild_metadata" */
  readonly guild_metadata_aggregate: Guild_Metadata_Aggregate;
  /** fetch data from the table: "guild_metadata" using primary key columns */
  readonly guild_metadata_by_pk?: Maybe<Guild_Metadata>;
  /** fetch data from the table: "guild_player" */
  readonly guild_player: ReadonlyArray<Guild_Player>;
  /** fetch aggregated fields from the table: "guild_player" */
  readonly guild_player_aggregate: Guild_Player_Aggregate;
  /** fetch data from the table: "guild_player" using primary key columns */
  readonly guild_player_by_pk?: Maybe<Guild_Player>;
  /** fetch data from the table: "me" */
  readonly me: ReadonlyArray<Me>;
  /** fetch aggregated fields from the table: "me" */
  readonly me_aggregate: Me_Aggregate;
  /** fetch data from the table: "player" */
  readonly player: ReadonlyArray<Player>;
  /** fetch data from the table: "player_account" */
  readonly player_account: ReadonlyArray<Player_Account>;
  /** fetch aggregated fields from the table: "player_account" */
  readonly player_account_aggregate: Player_Account_Aggregate;
  /** fetch aggregated fields from the table: "player" */
  readonly player_aggregate: Player_Aggregate;
  /** fetch data from the table: "player" using primary key columns */
  readonly player_by_pk?: Maybe<Player>;
  /** fetch data from the table: "player_role" */
  readonly player_role: ReadonlyArray<Player_Role>;
  /** fetch aggregated fields from the table: "player_role" */
  readonly player_role_aggregate: Player_Role_Aggregate;
  /** fetch data from the table: "player_role" using primary key columns */
  readonly player_role_by_pk?: Maybe<Player_Role>;
  /** fetch data from the table: "player_skill" */
  readonly player_skill: ReadonlyArray<Player_Skill>;
  /** fetch aggregated fields from the table: "player_skill" */
  readonly player_skill_aggregate: Player_Skill_Aggregate;
  /** fetch data from the table: "player_skill" using primary key columns */
  readonly player_skill_by_pk?: Maybe<Player_Skill>;
  /** fetch data from the table: "profile" */
  readonly profile: ReadonlyArray<Profile>;
  /** fetch aggregated fields from the table: "profile" */
  readonly profile_aggregate: Profile_Aggregate;
  /** fetch data from the table: "profile" using primary key columns */
  readonly profile_by_pk?: Maybe<Profile>;
  /** fetch data from the table: "quest" */
  readonly quest: ReadonlyArray<Quest>;
  /** fetch aggregated fields from the table: "quest" */
  readonly quest_aggregate: Quest_Aggregate;
  /** fetch data from the table: "quest" using primary key columns */
  readonly quest_by_pk?: Maybe<Quest>;
  /** fetch data from the table: "quest_completion" */
  readonly quest_completion: ReadonlyArray<Quest_Completion>;
  /** fetch aggregated fields from the table: "quest_completion" */
  readonly quest_completion_aggregate: Quest_Completion_Aggregate;
  /** fetch data from the table: "quest_completion" using primary key columns */
  readonly quest_completion_by_pk?: Maybe<Quest_Completion>;
  /** fetch data from the table: "quest_role" */
  readonly quest_role: ReadonlyArray<Quest_Role>;
  /** fetch aggregated fields from the table: "quest_role" */
  readonly quest_role_aggregate: Quest_Role_Aggregate;
  /** fetch data from the table: "quest_role" using primary key columns */
  readonly quest_role_by_pk?: Maybe<Quest_Role>;
  /** fetch data from the table: "quest_skill" */
  readonly quest_skill: ReadonlyArray<Quest_Skill>;
  /** fetch aggregated fields from the table: "quest_skill" */
  readonly quest_skill_aggregate: Quest_Skill_Aggregate;
  /** fetch data from the table: "quest_skill" using primary key columns */
  readonly quest_skill_by_pk?: Maybe<Quest_Skill>;
  /** fetch data from the table: "skill" */
  readonly skill: ReadonlyArray<Skill>;
  /** fetch aggregated fields from the table: "skill" */
  readonly skill_aggregate: Skill_Aggregate;
  /** fetch data from the table: "skill" using primary key columns */
  readonly skill_by_pk?: Maybe<Skill>;
  /** fetch data from the table: "token" */
  readonly token: ReadonlyArray<Token>;
  /** fetch aggregated fields from the table: "token" */
  readonly token_aggregate: Token_Aggregate;
  /** fetch data from the table: "token" using primary key columns */
  readonly token_by_pk?: Maybe<Token>;
  /** retrieve the result of action: "updateIDXProfile" */
  readonly updateIDXProfile?: Maybe<UpdateIdxProfile>;
  /** fetch data from the table: "xp" */
  readonly xp: ReadonlyArray<Xp>;
  /** fetch aggregated fields from the table: "xp" */
  readonly xp_aggregate: Xp_Aggregate;
  /** fetch data from the table: "xp" using primary key columns */
  readonly xp_by_pk?: Maybe<Xp>;
};


/** subscription root */
export type Subscription_RootAccountTypeArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<AccountType_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<AccountType_Order_By>>;
  where?: InputMaybe<AccountType_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootAccountType_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<AccountType_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<AccountType_Order_By>>;
  where?: InputMaybe<AccountType_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootAccountType_By_PkArgs = {
  type: Scalars['String'];
};


/** subscription root */
export type Subscription_RootColorAspectArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<ColorAspect_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<ColorAspect_Order_By>>;
  where?: InputMaybe<ColorAspect_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootColorAspect_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<ColorAspect_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<ColorAspect_Order_By>>;
  where?: InputMaybe<ColorAspect_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootColorAspect_By_PkArgs = {
  mask: Scalars['Int'];
};


/** subscription root */
export type Subscription_RootExplorerTypeArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<ExplorerType_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<ExplorerType_Order_By>>;
  where?: InputMaybe<ExplorerType_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootExplorerType_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<ExplorerType_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<ExplorerType_Order_By>>;
  where?: InputMaybe<ExplorerType_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootExplorerType_By_PkArgs = {
  id: Scalars['Int'];
};


/** subscription root */
export type Subscription_RootGuildStatusArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<GuildStatus_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<GuildStatus_Order_By>>;
  where?: InputMaybe<GuildStatus_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootGuildStatus_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<GuildStatus_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<GuildStatus_Order_By>>;
  where?: InputMaybe<GuildStatus_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootGuildStatus_By_PkArgs = {
  status: Scalars['String'];
};


/** subscription root */
export type Subscription_RootGuildTypeArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<GuildType_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<GuildType_Order_By>>;
  where?: InputMaybe<GuildType_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootGuildType_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<GuildType_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<GuildType_Order_By>>;
  where?: InputMaybe<GuildType_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootGuildType_By_PkArgs = {
  name: Scalars['String'];
};


/** subscription root */
export type Subscription_RootPlayerRankArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<PlayerRank_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<PlayerRank_Order_By>>;
  where?: InputMaybe<PlayerRank_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootPlayerRank_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<PlayerRank_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<PlayerRank_Order_By>>;
  where?: InputMaybe<PlayerRank_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootPlayerRank_By_PkArgs = {
  rank: Scalars['String'];
};


/** subscription root */
export type Subscription_RootPlayerRoleArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<PlayerRole_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<PlayerRole_Order_By>>;
  where?: InputMaybe<PlayerRole_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootPlayerRole_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<PlayerRole_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<PlayerRole_Order_By>>;
  where?: InputMaybe<PlayerRole_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootPlayerRole_By_PkArgs = {
  role: Scalars['String'];
};


/** subscription root */
export type Subscription_RootQuestCompletionStatusArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<QuestCompletionStatus_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<QuestCompletionStatus_Order_By>>;
  where?: InputMaybe<QuestCompletionStatus_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootQuestCompletionStatus_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<QuestCompletionStatus_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<QuestCompletionStatus_Order_By>>;
  where?: InputMaybe<QuestCompletionStatus_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootQuestCompletionStatus_By_PkArgs = {
  status: Scalars['String'];
};


/** subscription root */
export type Subscription_RootQuestRepetitionArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<QuestRepetition_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<QuestRepetition_Order_By>>;
  where?: InputMaybe<QuestRepetition_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootQuestRepetition_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<QuestRepetition_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<QuestRepetition_Order_By>>;
  where?: InputMaybe<QuestRepetition_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootQuestRepetition_By_PkArgs = {
  repetition: Scalars['String'];
};


/** subscription root */
export type Subscription_RootQuestStatusArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<QuestStatus_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<QuestStatus_Order_By>>;
  where?: InputMaybe<QuestStatus_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootQuestStatus_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<QuestStatus_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<QuestStatus_Order_By>>;
  where?: InputMaybe<QuestStatus_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootQuestStatus_By_PkArgs = {
  status: Scalars['String'];
};


/** subscription root */
export type Subscription_RootSkillCategoryArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<SkillCategory_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<SkillCategory_Order_By>>;
  where?: InputMaybe<SkillCategory_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootSkillCategory_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<SkillCategory_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<SkillCategory_Order_By>>;
  where?: InputMaybe<SkillCategory_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootSkillCategory_By_PkArgs = {
  name: Scalars['String'];
};


/** subscription root */
export type Subscription_RootBalanceArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Balance_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Balance_Order_By>>;
  where?: InputMaybe<Balance_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootBalance_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Balance_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Balance_Order_By>>;
  where?: InputMaybe<Balance_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootBalance_By_PkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootDaoArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Dao_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Dao_Order_By>>;
  where?: InputMaybe<Dao_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootDao_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Dao_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Dao_Order_By>>;
  where?: InputMaybe<Dao_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootDao_By_PkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootDao_PlayerArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Dao_Player_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Dao_Player_Order_By>>;
  where?: InputMaybe<Dao_Player_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootDao_Player_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Dao_Player_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Dao_Player_Order_By>>;
  where?: InputMaybe<Dao_Player_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootDao_Player_By_PkArgs = {
  daoId: Scalars['uuid'];
  playerId: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootGuildArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Guild_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Guild_Order_By>>;
  where?: InputMaybe<Guild_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootGuild_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Guild_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Guild_Order_By>>;
  where?: InputMaybe<Guild_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootGuild_By_PkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootGuild_MetadataArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Guild_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Guild_Metadata_Order_By>>;
  where?: InputMaybe<Guild_Metadata_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootGuild_Metadata_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Guild_Metadata_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Guild_Metadata_Order_By>>;
  where?: InputMaybe<Guild_Metadata_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootGuild_Metadata_By_PkArgs = {
  guildId: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootGuild_PlayerArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Guild_Player_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Guild_Player_Order_By>>;
  where?: InputMaybe<Guild_Player_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootGuild_Player_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Guild_Player_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Guild_Player_Order_By>>;
  where?: InputMaybe<Guild_Player_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootGuild_Player_By_PkArgs = {
  guildId: Scalars['uuid'];
  playerId: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootMeArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Me_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Me_Order_By>>;
  where?: InputMaybe<Me_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootMe_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Me_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Me_Order_By>>;
  where?: InputMaybe<Me_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootPlayerArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Player_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Player_Order_By>>;
  where?: InputMaybe<Player_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootPlayer_AccountArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Player_Account_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Player_Account_Order_By>>;
  where?: InputMaybe<Player_Account_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootPlayer_Account_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Player_Account_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Player_Account_Order_By>>;
  where?: InputMaybe<Player_Account_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootPlayer_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Player_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Player_Order_By>>;
  where?: InputMaybe<Player_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootPlayer_By_PkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootPlayer_RoleArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Player_Role_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Player_Role_Order_By>>;
  where?: InputMaybe<Player_Role_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootPlayer_Role_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Player_Role_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Player_Role_Order_By>>;
  where?: InputMaybe<Player_Role_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootPlayer_Role_By_PkArgs = {
  player_id: Scalars['uuid'];
  role: Scalars['String'];
};


/** subscription root */
export type Subscription_RootPlayer_SkillArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Player_Skill_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Player_Skill_Order_By>>;
  where?: InputMaybe<Player_Skill_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootPlayer_Skill_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Player_Skill_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Player_Skill_Order_By>>;
  where?: InputMaybe<Player_Skill_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootPlayer_Skill_By_PkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootProfileArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Profile_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Profile_Order_By>>;
  where?: InputMaybe<Profile_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootProfile_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Profile_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Profile_Order_By>>;
  where?: InputMaybe<Profile_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootProfile_By_PkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootQuestArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Quest_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Quest_Order_By>>;
  where?: InputMaybe<Quest_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootQuest_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Quest_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Quest_Order_By>>;
  where?: InputMaybe<Quest_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootQuest_By_PkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootQuest_CompletionArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Quest_Completion_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Quest_Completion_Order_By>>;
  where?: InputMaybe<Quest_Completion_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootQuest_Completion_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Quest_Completion_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Quest_Completion_Order_By>>;
  where?: InputMaybe<Quest_Completion_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootQuest_Completion_By_PkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootQuest_RoleArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Quest_Role_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Quest_Role_Order_By>>;
  where?: InputMaybe<Quest_Role_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootQuest_Role_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Quest_Role_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Quest_Role_Order_By>>;
  where?: InputMaybe<Quest_Role_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootQuest_Role_By_PkArgs = {
  questId: Scalars['uuid'];
  role: Scalars['String'];
};


/** subscription root */
export type Subscription_RootQuest_SkillArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Quest_Skill_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Quest_Skill_Order_By>>;
  where?: InputMaybe<Quest_Skill_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootQuest_Skill_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Quest_Skill_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Quest_Skill_Order_By>>;
  where?: InputMaybe<Quest_Skill_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootQuest_Skill_By_PkArgs = {
  questId: Scalars['uuid'];
  skillId: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootSkillArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Skill_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Skill_Order_By>>;
  where?: InputMaybe<Skill_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootSkill_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Skill_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Skill_Order_By>>;
  where?: InputMaybe<Skill_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootSkill_By_PkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootTokenArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Token_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Token_Order_By>>;
  where?: InputMaybe<Token_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootToken_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Token_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Token_Order_By>>;
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
  distinct_on?: InputMaybe<ReadonlyArray<Xp_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Xp_Order_By>>;
  where?: InputMaybe<Xp_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootXp_AggregateArgs = {
  distinct_on?: InputMaybe<ReadonlyArray<Xp_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<ReadonlyArray<Xp_Order_By>>;
  where?: InputMaybe<Xp_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootXp_By_PkArgs = {
  id: Scalars['uuid'];
};

/** expression to compare columns of type timestamptz. All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  readonly _eq?: InputMaybe<Scalars['timestamptz']>;
  readonly _gt?: InputMaybe<Scalars['timestamptz']>;
  readonly _gte?: InputMaybe<Scalars['timestamptz']>;
  readonly _in?: InputMaybe<ReadonlyArray<Scalars['timestamptz']>>;
  readonly _is_null?: InputMaybe<Scalars['Boolean']>;
  readonly _lt?: InputMaybe<Scalars['timestamptz']>;
  readonly _lte?: InputMaybe<Scalars['timestamptz']>;
  readonly _neq?: InputMaybe<Scalars['timestamptz']>;
  readonly _nin?: InputMaybe<ReadonlyArray<Scalars['timestamptz']>>;
};

/** columns and relationships of "token" */
export type Token = {
  readonly __typename?: 'token';
  readonly address: Scalars['String'];
  readonly chainId: Scalars['Int'];
  /** An object relationship */
  readonly guild: Guild;
  readonly guildId: Scalars['uuid'];
  readonly lastOffset: Scalars['Int'];
  readonly safeAddress: Scalars['String'];
};

/** aggregated selection of "token" */
export type Token_Aggregate = {
  readonly __typename?: 'token_aggregate';
  readonly aggregate?: Maybe<Token_Aggregate_Fields>;
  readonly nodes: ReadonlyArray<Token>;
};

/** aggregate fields of "token" */
export type Token_Aggregate_Fields = {
  readonly __typename?: 'token_aggregate_fields';
  readonly avg?: Maybe<Token_Avg_Fields>;
  readonly count?: Maybe<Scalars['Int']>;
  readonly max?: Maybe<Token_Max_Fields>;
  readonly min?: Maybe<Token_Min_Fields>;
  readonly stddev?: Maybe<Token_Stddev_Fields>;
  readonly stddev_pop?: Maybe<Token_Stddev_Pop_Fields>;
  readonly stddev_samp?: Maybe<Token_Stddev_Samp_Fields>;
  readonly sum?: Maybe<Token_Sum_Fields>;
  readonly var_pop?: Maybe<Token_Var_Pop_Fields>;
  readonly var_samp?: Maybe<Token_Var_Samp_Fields>;
  readonly variance?: Maybe<Token_Variance_Fields>;
};


/** aggregate fields of "token" */
export type Token_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<ReadonlyArray<Token_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "token" */
export type Token_Aggregate_Order_By = {
  readonly avg?: InputMaybe<Token_Avg_Order_By>;
  readonly count?: InputMaybe<Order_By>;
  readonly max?: InputMaybe<Token_Max_Order_By>;
  readonly min?: InputMaybe<Token_Min_Order_By>;
  readonly stddev?: InputMaybe<Token_Stddev_Order_By>;
  readonly stddev_pop?: InputMaybe<Token_Stddev_Pop_Order_By>;
  readonly stddev_samp?: InputMaybe<Token_Stddev_Samp_Order_By>;
  readonly sum?: InputMaybe<Token_Sum_Order_By>;
  readonly var_pop?: InputMaybe<Token_Var_Pop_Order_By>;
  readonly var_samp?: InputMaybe<Token_Var_Samp_Order_By>;
  readonly variance?: InputMaybe<Token_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "token" */
export type Token_Arr_Rel_Insert_Input = {
  readonly data: ReadonlyArray<Token_Insert_Input>;
  readonly on_conflict?: InputMaybe<Token_On_Conflict>;
};

/** aggregate avg on columns */
export type Token_Avg_Fields = {
  readonly __typename?: 'token_avg_fields';
  readonly chainId?: Maybe<Scalars['Float']>;
  readonly lastOffset?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "token" */
export type Token_Avg_Order_By = {
  readonly chainId?: InputMaybe<Order_By>;
  readonly lastOffset?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "token". All fields are combined with a logical 'AND'. */
export type Token_Bool_Exp = {
  readonly _and?: InputMaybe<ReadonlyArray<InputMaybe<Token_Bool_Exp>>>;
  readonly _not?: InputMaybe<Token_Bool_Exp>;
  readonly _or?: InputMaybe<ReadonlyArray<InputMaybe<Token_Bool_Exp>>>;
  readonly address?: InputMaybe<String_Comparison_Exp>;
  readonly chainId?: InputMaybe<Int_Comparison_Exp>;
  readonly guild?: InputMaybe<Guild_Bool_Exp>;
  readonly guildId?: InputMaybe<Uuid_Comparison_Exp>;
  readonly lastOffset?: InputMaybe<Int_Comparison_Exp>;
  readonly safeAddress?: InputMaybe<String_Comparison_Exp>;
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
  TokenSafeAddressKey = 'token_safe_address_key'
}

/** input type for incrementing integer column in table "token" */
export type Token_Inc_Input = {
  readonly chainId?: InputMaybe<Scalars['Int']>;
  readonly lastOffset?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "token" */
export type Token_Insert_Input = {
  readonly address?: InputMaybe<Scalars['String']>;
  readonly chainId?: InputMaybe<Scalars['Int']>;
  readonly guild?: InputMaybe<Guild_Obj_Rel_Insert_Input>;
  readonly guildId?: InputMaybe<Scalars['uuid']>;
  readonly lastOffset?: InputMaybe<Scalars['Int']>;
  readonly safeAddress?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Token_Max_Fields = {
  readonly __typename?: 'token_max_fields';
  readonly address?: Maybe<Scalars['String']>;
  readonly chainId?: Maybe<Scalars['Int']>;
  readonly guildId?: Maybe<Scalars['uuid']>;
  readonly lastOffset?: Maybe<Scalars['Int']>;
  readonly safeAddress?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "token" */
export type Token_Max_Order_By = {
  readonly address?: InputMaybe<Order_By>;
  readonly chainId?: InputMaybe<Order_By>;
  readonly guildId?: InputMaybe<Order_By>;
  readonly lastOffset?: InputMaybe<Order_By>;
  readonly safeAddress?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Token_Min_Fields = {
  readonly __typename?: 'token_min_fields';
  readonly address?: Maybe<Scalars['String']>;
  readonly chainId?: Maybe<Scalars['Int']>;
  readonly guildId?: Maybe<Scalars['uuid']>;
  readonly lastOffset?: Maybe<Scalars['Int']>;
  readonly safeAddress?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "token" */
export type Token_Min_Order_By = {
  readonly address?: InputMaybe<Order_By>;
  readonly chainId?: InputMaybe<Order_By>;
  readonly guildId?: InputMaybe<Order_By>;
  readonly lastOffset?: InputMaybe<Order_By>;
  readonly safeAddress?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "token" */
export type Token_Mutation_Response = {
  readonly __typename?: 'token_mutation_response';
  /** number of affected rows by the mutation */
  readonly affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  readonly returning: ReadonlyArray<Token>;
};

/** input type for inserting object relation for remote table "token" */
export type Token_Obj_Rel_Insert_Input = {
  readonly data: Token_Insert_Input;
  readonly on_conflict?: InputMaybe<Token_On_Conflict>;
};

/** on conflict condition type for table "token" */
export type Token_On_Conflict = {
  readonly constraint: Token_Constraint;
  readonly update_columns: ReadonlyArray<Token_Update_Column>;
  readonly where?: InputMaybe<Token_Bool_Exp>;
};

/** ordering options when selecting data from "token" */
export type Token_Order_By = {
  readonly address?: InputMaybe<Order_By>;
  readonly chainId?: InputMaybe<Order_By>;
  readonly guild?: InputMaybe<Guild_Order_By>;
  readonly guildId?: InputMaybe<Order_By>;
  readonly lastOffset?: InputMaybe<Order_By>;
  readonly safeAddress?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "token" */
export type Token_Pk_Columns_Input = {
  readonly address: Scalars['String'];
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
  SafeAddress = 'safeAddress'
}

/** input type for updating data in table "token" */
export type Token_Set_Input = {
  readonly address?: InputMaybe<Scalars['String']>;
  readonly chainId?: InputMaybe<Scalars['Int']>;
  readonly guildId?: InputMaybe<Scalars['uuid']>;
  readonly lastOffset?: InputMaybe<Scalars['Int']>;
  readonly safeAddress?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Token_Stddev_Fields = {
  readonly __typename?: 'token_stddev_fields';
  readonly chainId?: Maybe<Scalars['Float']>;
  readonly lastOffset?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "token" */
export type Token_Stddev_Order_By = {
  readonly chainId?: InputMaybe<Order_By>;
  readonly lastOffset?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Token_Stddev_Pop_Fields = {
  readonly __typename?: 'token_stddev_pop_fields';
  readonly chainId?: Maybe<Scalars['Float']>;
  readonly lastOffset?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "token" */
export type Token_Stddev_Pop_Order_By = {
  readonly chainId?: InputMaybe<Order_By>;
  readonly lastOffset?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Token_Stddev_Samp_Fields = {
  readonly __typename?: 'token_stddev_samp_fields';
  readonly chainId?: Maybe<Scalars['Float']>;
  readonly lastOffset?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "token" */
export type Token_Stddev_Samp_Order_By = {
  readonly chainId?: InputMaybe<Order_By>;
  readonly lastOffset?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Token_Sum_Fields = {
  readonly __typename?: 'token_sum_fields';
  readonly chainId?: Maybe<Scalars['Int']>;
  readonly lastOffset?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "token" */
export type Token_Sum_Order_By = {
  readonly chainId?: InputMaybe<Order_By>;
  readonly lastOffset?: InputMaybe<Order_By>;
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
  SafeAddress = 'safeAddress'
}

/** aggregate var_pop on columns */
export type Token_Var_Pop_Fields = {
  readonly __typename?: 'token_var_pop_fields';
  readonly chainId?: Maybe<Scalars['Float']>;
  readonly lastOffset?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "token" */
export type Token_Var_Pop_Order_By = {
  readonly chainId?: InputMaybe<Order_By>;
  readonly lastOffset?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Token_Var_Samp_Fields = {
  readonly __typename?: 'token_var_samp_fields';
  readonly chainId?: Maybe<Scalars['Float']>;
  readonly lastOffset?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "token" */
export type Token_Var_Samp_Order_By = {
  readonly chainId?: InputMaybe<Order_By>;
  readonly lastOffset?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Token_Variance_Fields = {
  readonly __typename?: 'token_variance_fields';
  readonly chainId?: Maybe<Scalars['Float']>;
  readonly lastOffset?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "token" */
export type Token_Variance_Order_By = {
  readonly chainId?: InputMaybe<Order_By>;
  readonly lastOffset?: InputMaybe<Order_By>;
};

/** fields of action: "updateIDXProfile" */
export type UpdateIdxProfile = {
  readonly __typename?: 'updateIDXProfile';
  /** the time at which this action was created */
  readonly created_at?: Maybe<Scalars['timestamptz']>;
  /** errors related to the invocation */
  readonly errors?: Maybe<Scalars['json']>;
  /** the unique id of an action */
  readonly id?: Maybe<Scalars['uuid']>;
  /** the output fields of this action */
  readonly output?: Maybe<CacheProcessOutput>;
};

/** expression to compare columns of type uuid. All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  readonly _eq?: InputMaybe<Scalars['uuid']>;
  readonly _gt?: InputMaybe<Scalars['uuid']>;
  readonly _gte?: InputMaybe<Scalars['uuid']>;
  readonly _in?: InputMaybe<ReadonlyArray<Scalars['uuid']>>;
  readonly _is_null?: InputMaybe<Scalars['Boolean']>;
  readonly _lt?: InputMaybe<Scalars['uuid']>;
  readonly _lte?: InputMaybe<Scalars['uuid']>;
  readonly _neq?: InputMaybe<Scalars['uuid']>;
  readonly _nin?: InputMaybe<ReadonlyArray<Scalars['uuid']>>;
};

/** columns and relationships of "xp" */
export type Xp = {
  readonly __typename?: 'xp';
  readonly balance: Scalars['float8'];
  readonly id: Scalars['uuid'];
  readonly initial?: Maybe<Scalars['float8']>;
  readonly playerId: Scalars['uuid'];
  readonly tokenAddress: Scalars['String'];
};

/** aggregated selection of "xp" */
export type Xp_Aggregate = {
  readonly __typename?: 'xp_aggregate';
  readonly aggregate?: Maybe<Xp_Aggregate_Fields>;
  readonly nodes: ReadonlyArray<Xp>;
};

/** aggregate fields of "xp" */
export type Xp_Aggregate_Fields = {
  readonly __typename?: 'xp_aggregate_fields';
  readonly avg?: Maybe<Xp_Avg_Fields>;
  readonly count?: Maybe<Scalars['Int']>;
  readonly max?: Maybe<Xp_Max_Fields>;
  readonly min?: Maybe<Xp_Min_Fields>;
  readonly stddev?: Maybe<Xp_Stddev_Fields>;
  readonly stddev_pop?: Maybe<Xp_Stddev_Pop_Fields>;
  readonly stddev_samp?: Maybe<Xp_Stddev_Samp_Fields>;
  readonly sum?: Maybe<Xp_Sum_Fields>;
  readonly var_pop?: Maybe<Xp_Var_Pop_Fields>;
  readonly var_samp?: Maybe<Xp_Var_Samp_Fields>;
  readonly variance?: Maybe<Xp_Variance_Fields>;
};


/** aggregate fields of "xp" */
export type Xp_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<ReadonlyArray<Xp_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "xp" */
export type Xp_Aggregate_Order_By = {
  readonly avg?: InputMaybe<Xp_Avg_Order_By>;
  readonly count?: InputMaybe<Order_By>;
  readonly max?: InputMaybe<Xp_Max_Order_By>;
  readonly min?: InputMaybe<Xp_Min_Order_By>;
  readonly stddev?: InputMaybe<Xp_Stddev_Order_By>;
  readonly stddev_pop?: InputMaybe<Xp_Stddev_Pop_Order_By>;
  readonly stddev_samp?: InputMaybe<Xp_Stddev_Samp_Order_By>;
  readonly sum?: InputMaybe<Xp_Sum_Order_By>;
  readonly var_pop?: InputMaybe<Xp_Var_Pop_Order_By>;
  readonly var_samp?: InputMaybe<Xp_Var_Samp_Order_By>;
  readonly variance?: InputMaybe<Xp_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "xp" */
export type Xp_Arr_Rel_Insert_Input = {
  readonly data: ReadonlyArray<Xp_Insert_Input>;
  readonly on_conflict?: InputMaybe<Xp_On_Conflict>;
};

/** aggregate avg on columns */
export type Xp_Avg_Fields = {
  readonly __typename?: 'xp_avg_fields';
  readonly balance?: Maybe<Scalars['Float']>;
  readonly initial?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "xp" */
export type Xp_Avg_Order_By = {
  readonly balance?: InputMaybe<Order_By>;
  readonly initial?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "xp". All fields are combined with a logical 'AND'. */
export type Xp_Bool_Exp = {
  readonly _and?: InputMaybe<ReadonlyArray<InputMaybe<Xp_Bool_Exp>>>;
  readonly _not?: InputMaybe<Xp_Bool_Exp>;
  readonly _or?: InputMaybe<ReadonlyArray<InputMaybe<Xp_Bool_Exp>>>;
  readonly balance?: InputMaybe<Float8_Comparison_Exp>;
  readonly id?: InputMaybe<Uuid_Comparison_Exp>;
  readonly initial?: InputMaybe<Float8_Comparison_Exp>;
  readonly playerId?: InputMaybe<Uuid_Comparison_Exp>;
  readonly tokenAddress?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "xp" */
export enum Xp_Constraint {
  /** unique or primary key constraint */
  XpPkey = 'xp_pkey'
}

/** input type for incrementing integer column in table "xp" */
export type Xp_Inc_Input = {
  readonly balance?: InputMaybe<Scalars['float8']>;
  readonly initial?: InputMaybe<Scalars['float8']>;
};

/** input type for inserting data into table "xp" */
export type Xp_Insert_Input = {
  readonly balance?: InputMaybe<Scalars['float8']>;
  readonly id?: InputMaybe<Scalars['uuid']>;
  readonly initial?: InputMaybe<Scalars['float8']>;
  readonly playerId?: InputMaybe<Scalars['uuid']>;
  readonly tokenAddress?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Xp_Max_Fields = {
  readonly __typename?: 'xp_max_fields';
  readonly balance?: Maybe<Scalars['float8']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly initial?: Maybe<Scalars['float8']>;
  readonly playerId?: Maybe<Scalars['uuid']>;
  readonly tokenAddress?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "xp" */
export type Xp_Max_Order_By = {
  readonly balance?: InputMaybe<Order_By>;
  readonly id?: InputMaybe<Order_By>;
  readonly initial?: InputMaybe<Order_By>;
  readonly playerId?: InputMaybe<Order_By>;
  readonly tokenAddress?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Xp_Min_Fields = {
  readonly __typename?: 'xp_min_fields';
  readonly balance?: Maybe<Scalars['float8']>;
  readonly id?: Maybe<Scalars['uuid']>;
  readonly initial?: Maybe<Scalars['float8']>;
  readonly playerId?: Maybe<Scalars['uuid']>;
  readonly tokenAddress?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "xp" */
export type Xp_Min_Order_By = {
  readonly balance?: InputMaybe<Order_By>;
  readonly id?: InputMaybe<Order_By>;
  readonly initial?: InputMaybe<Order_By>;
  readonly playerId?: InputMaybe<Order_By>;
  readonly tokenAddress?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "xp" */
export type Xp_Mutation_Response = {
  readonly __typename?: 'xp_mutation_response';
  /** number of affected rows by the mutation */
  readonly affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  readonly returning: ReadonlyArray<Xp>;
};

/** input type for inserting object relation for remote table "xp" */
export type Xp_Obj_Rel_Insert_Input = {
  readonly data: Xp_Insert_Input;
  readonly on_conflict?: InputMaybe<Xp_On_Conflict>;
};

/** on conflict condition type for table "xp" */
export type Xp_On_Conflict = {
  readonly constraint: Xp_Constraint;
  readonly update_columns: ReadonlyArray<Xp_Update_Column>;
  readonly where?: InputMaybe<Xp_Bool_Exp>;
};

/** ordering options when selecting data from "xp" */
export type Xp_Order_By = {
  readonly balance?: InputMaybe<Order_By>;
  readonly id?: InputMaybe<Order_By>;
  readonly initial?: InputMaybe<Order_By>;
  readonly playerId?: InputMaybe<Order_By>;
  readonly tokenAddress?: InputMaybe<Order_By>;
};

/** primary key columns input for table: "xp" */
export type Xp_Pk_Columns_Input = {
  readonly id: Scalars['uuid'];
};

/** select columns of table "xp" */
export enum Xp_Select_Column {
  /** column name */
  Balance = 'balance',
  /** column name */
  Id = 'id',
  /** column name */
  Initial = 'initial',
  /** column name */
  PlayerId = 'playerId',
  /** column name */
  TokenAddress = 'tokenAddress'
}

/** input type for updating data in table "xp" */
export type Xp_Set_Input = {
  readonly balance?: InputMaybe<Scalars['float8']>;
  readonly id?: InputMaybe<Scalars['uuid']>;
  readonly initial?: InputMaybe<Scalars['float8']>;
  readonly playerId?: InputMaybe<Scalars['uuid']>;
  readonly tokenAddress?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Xp_Stddev_Fields = {
  readonly __typename?: 'xp_stddev_fields';
  readonly balance?: Maybe<Scalars['Float']>;
  readonly initial?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "xp" */
export type Xp_Stddev_Order_By = {
  readonly balance?: InputMaybe<Order_By>;
  readonly initial?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Xp_Stddev_Pop_Fields = {
  readonly __typename?: 'xp_stddev_pop_fields';
  readonly balance?: Maybe<Scalars['Float']>;
  readonly initial?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "xp" */
export type Xp_Stddev_Pop_Order_By = {
  readonly balance?: InputMaybe<Order_By>;
  readonly initial?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Xp_Stddev_Samp_Fields = {
  readonly __typename?: 'xp_stddev_samp_fields';
  readonly balance?: Maybe<Scalars['Float']>;
  readonly initial?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "xp" */
export type Xp_Stddev_Samp_Order_By = {
  readonly balance?: InputMaybe<Order_By>;
  readonly initial?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Xp_Sum_Fields = {
  readonly __typename?: 'xp_sum_fields';
  readonly balance?: Maybe<Scalars['float8']>;
  readonly initial?: Maybe<Scalars['float8']>;
};

/** order by sum() on columns of table "xp" */
export type Xp_Sum_Order_By = {
  readonly balance?: InputMaybe<Order_By>;
  readonly initial?: InputMaybe<Order_By>;
};

/** update columns of table "xp" */
export enum Xp_Update_Column {
  /** column name */
  Balance = 'balance',
  /** column name */
  Id = 'id',
  /** column name */
  Initial = 'initial',
  /** column name */
  PlayerId = 'playerId',
  /** column name */
  TokenAddress = 'tokenAddress'
}

/** aggregate var_pop on columns */
export type Xp_Var_Pop_Fields = {
  readonly __typename?: 'xp_var_pop_fields';
  readonly balance?: Maybe<Scalars['Float']>;
  readonly initial?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "xp" */
export type Xp_Var_Pop_Order_By = {
  readonly balance?: InputMaybe<Order_By>;
  readonly initial?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Xp_Var_Samp_Fields = {
  readonly __typename?: 'xp_var_samp_fields';
  readonly balance?: Maybe<Scalars['Float']>;
  readonly initial?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "xp" */
export type Xp_Var_Samp_Order_By = {
  readonly balance?: InputMaybe<Order_By>;
  readonly initial?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Xp_Variance_Fields = {
  readonly __typename?: 'xp_variance_fields';
  readonly balance?: Maybe<Scalars['Float']>;
  readonly initial?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "xp" */
export type Xp_Variance_Order_By = {
  readonly balance?: InputMaybe<Order_By>;
  readonly initial?: InputMaybe<Order_By>;
};

export type UpdateDaoMutationVariables = Exact<{
  daoId: Scalars['uuid'];
  object: Dao_Set_Input;
}>;


export type UpdateDaoMutation = { readonly __typename?: 'mutation_root', readonly update_dao_by_pk?: { readonly __typename?: 'dao', readonly id: any } | null };

export type DetachDaosFromGuildMutationVariables = Exact<{
  ids: ReadonlyArray<Scalars['uuid']> | Scalars['uuid'];
}>;


export type DetachDaosFromGuildMutation = { readonly __typename?: 'mutation_root', readonly update_dao?: { readonly __typename?: 'dao_mutation_response', readonly affected_rows: number } | null };

export type DeleteDaosMutationVariables = Exact<{
  ids: ReadonlyArray<Scalars['uuid']> | Scalars['uuid'];
}>;


export type DeleteDaosMutation = { readonly __typename?: 'mutation_root', readonly delete_dao?: { readonly __typename?: 'dao_mutation_response', readonly affected_rows: number } | null };

export type InsertDaosMutationVariables = Exact<{
  objects: ReadonlyArray<Dao_Insert_Input> | Dao_Insert_Input;
}>;


export type InsertDaosMutation = { readonly __typename?: 'mutation_root', readonly insert_dao?: { readonly __typename?: 'dao_mutation_response', readonly returning: ReadonlyArray<{ readonly __typename?: 'dao', readonly id: any }> } | null };

export type SyncDaoMembersMutationVariables = Exact<{
  memberEthIdsToRemove: ReadonlyArray<Scalars['String']> | Scalars['String'];
  membersToAdd: ReadonlyArray<Dao_Player_Insert_Input> | Dao_Player_Insert_Input;
}>;


export type SyncDaoMembersMutation = { readonly __typename?: 'mutation_root', readonly delete_dao_player?: { readonly __typename?: 'dao_player_mutation_response', readonly affected_rows: number } | null, readonly insert_dao_player?: { readonly __typename?: 'dao_player_mutation_response', readonly affected_rows: number } | null };

export type RemovePlayerFromDaosMutationVariables = Exact<{
  playerEthAdress: Scalars['String'];
  daoIds: ReadonlyArray<Scalars['uuid']> | Scalars['uuid'];
}>;


export type RemovePlayerFromDaosMutation = { readonly __typename?: 'mutation_root', readonly delete_dao_player?: { readonly __typename?: 'dao_player_mutation_response', readonly affected_rows: number } | null };

export type UpsertDaoMembersMutationVariables = Exact<{
  objects: ReadonlyArray<Dao_Player_Insert_Input> | Dao_Player_Insert_Input;
}>;


export type UpsertDaoMembersMutation = { readonly __typename?: 'mutation_root', readonly insert_dao_player?: { readonly __typename?: 'dao_player_mutation_response', readonly affected_rows: number } | null };

export type CreateGuildMutationVariables = Exact<{
  object: Guild_Insert_Input;
}>;


export type CreateGuildMutation = { readonly __typename?: 'mutation_root', readonly insert_guild_one?: { readonly __typename?: 'guild', readonly guildname: string, readonly id: any } | null };

export type UpdateGuildMutationVariables = Exact<{
  guildId: Scalars['uuid'];
  object: Guild_Set_Input;
}>;


export type UpdateGuildMutation = { readonly __typename?: 'mutation_root', readonly update_guild_by_pk?: { readonly __typename?: 'guild', readonly id: any } | null };

export type CreateGuildMetadataMutationVariables = Exact<{
  object: Guild_Metadata_Insert_Input;
}>;


export type CreateGuildMetadataMutation = { readonly __typename?: 'mutation_root', readonly insert_guild_metadata_one?: { readonly __typename?: 'guild_metadata', readonly creatorId?: any | null, readonly discordId: string, readonly guildId: any, readonly discordMetadata?: any | null } | null };

export type UpdateGuildDiscordMetadataMutationVariables = Exact<{
  guildId: Scalars['uuid'];
  discordMetadata?: InputMaybe<Scalars['jsonb']>;
}>;


export type UpdateGuildDiscordMetadataMutation = { readonly __typename?: 'mutation_root', readonly update_guild_metadata_by_pk?: { readonly __typename?: 'guild_metadata', readonly guildId: any } | null };

export type SyncGuildMembersMutationVariables = Exact<{
  memberDiscordIdsToRemove: ReadonlyArray<Scalars['String']> | Scalars['String'];
  membersToAdd: ReadonlyArray<Guild_Player_Insert_Input> | Guild_Player_Insert_Input;
}>;


export type SyncGuildMembersMutation = { readonly __typename?: 'mutation_root', readonly delete_guild_player?: { readonly __typename?: 'guild_player_mutation_response', readonly affected_rows: number } | null, readonly insert_guild_player?: { readonly __typename?: 'guild_player_mutation_response', readonly affected_rows: number } | null };

export type RemoveAllGuildMembersMutationVariables = Exact<{
  guildId: Scalars['uuid'];
}>;


export type RemoveAllGuildMembersMutation = { readonly __typename?: 'mutation_root', readonly delete_guild_player?: { readonly __typename?: 'guild_player_mutation_response', readonly affected_rows: number } | null };

export type CreatePlayerFromEthMutationVariables = Exact<{
  ethereumAddress: Scalars['String'];
}>;


export type CreatePlayerFromEthMutation = { readonly __typename?: 'mutation_root', readonly insert_profile?: { readonly __typename?: 'profile_mutation_response', readonly affected_rows: number, readonly returning: ReadonlyArray<{ readonly __typename?: 'profile', readonly id: any, readonly player: { readonly __typename?: 'player', readonly id: any, readonly ethereumAddress: string } }> } | null };

export type UpsertAccountMutationVariables = Exact<{
  objects: ReadonlyArray<Player_Account_Insert_Input> | Player_Account_Insert_Input;
  on_conflict?: InputMaybe<Player_Account_On_Conflict>;
}>;


export type UpsertAccountMutation = { readonly __typename?: 'mutation_root', readonly insert_player_account?: { readonly __typename?: 'player_account_mutation_response', readonly affected_rows: number } | null };

export type ResetAllPlayersXpMutationVariables = Exact<{ [key: string]: never; }>;


export type ResetAllPlayersXpMutation = { readonly __typename?: 'mutation_root', readonly update_player?: { readonly __typename?: 'player_mutation_response', readonly affected_rows: number } | null };

export type UpsertProfileMutationVariables = Exact<{
  objects: ReadonlyArray<Profile_Insert_Input> | Profile_Insert_Input;
  updateColumns: ReadonlyArray<Profile_Update_Column> | Profile_Update_Column;
}>;


export type UpsertProfileMutation = { readonly __typename?: 'mutation_root', readonly insert_profile?: { readonly __typename?: 'profile_mutation_response', readonly affected_rows: number } | null };

export type UpdatePlayerMutationVariables = Exact<{
  ethereumAddress: Scalars['String'];
  rank?: InputMaybe<PlayerRank_Enum>;
  totalXP?: InputMaybe<Scalars['numeric']>;
  seasonXP?: InputMaybe<Scalars['numeric']>;
  discordId?: InputMaybe<Scalars['String']>;
}>;


export type UpdatePlayerMutation = { readonly __typename?: 'mutation_root', readonly update_player?: { readonly __typename?: 'player_mutation_response', readonly affected_rows: number, readonly returning: ReadonlyArray<{ readonly __typename?: 'player', readonly id: any, readonly ethereumAddress: string, readonly profile?: { readonly __typename?: 'profile', readonly username?: string | null } | null }> } | null };

export type InsertPlayersMutationVariables = Exact<{
  objects: ReadonlyArray<Player_Insert_Input> | Player_Insert_Input;
}>;


export type InsertPlayersMutation = { readonly __typename?: 'mutation_root', readonly insert_player?: { readonly __typename?: 'player_mutation_response', readonly affected_rows: number, readonly returning: ReadonlyArray<{ readonly __typename?: 'player', readonly id: any }> } | null };

export type RemovePlayerAccountMutationVariables = Exact<{
  playerId: Scalars['uuid'];
  accountType?: InputMaybe<AccountType_Enum>;
}>;


export type RemovePlayerAccountMutation = { readonly __typename?: 'mutation_root', readonly delete_player_account?: { readonly __typename?: 'player_account_mutation_response', readonly affected_rows: number } | null };

export type CreateQuestMutationVariables = Exact<{
  objects: ReadonlyArray<Quest_Insert_Input> | Quest_Insert_Input;
}>;


export type CreateQuestMutation = { readonly __typename?: 'mutation_root', readonly insert_quest?: { readonly __typename?: 'quest_mutation_response', readonly affected_rows: number, readonly returning: ReadonlyArray<{ readonly __typename?: 'quest', readonly id: any }> } | null };

export type CreateQuestCompletionMutationVariables = Exact<{
  objects: ReadonlyArray<Quest_Completion_Insert_Input> | Quest_Completion_Insert_Input;
}>;


export type CreateQuestCompletionMutation = { readonly __typename?: 'mutation_root', readonly insert_quest_completion?: { readonly __typename?: 'quest_completion_mutation_response', readonly affected_rows: number, readonly returning: ReadonlyArray<{ readonly __typename?: 'quest_completion', readonly id: any, readonly questId: any, readonly completedByPlayerId: any }> } | null };

export type UpdateQuestStatusMutationVariables = Exact<{
  quest_id: Scalars['uuid'];
  status: QuestStatus_Enum;
}>;


export type UpdateQuestStatusMutation = { readonly __typename?: 'mutation_root', readonly update_quest_by_pk?: { readonly __typename?: 'quest', readonly id: any } | null };

export type UpdateQuestCompletionStatusMutationVariables = Exact<{
  quest_completion_id: Scalars['uuid'];
  status: QuestCompletionStatus_Enum;
}>;


export type UpdateQuestCompletionStatusMutation = { readonly __typename?: 'mutation_root', readonly update_quest_completion_by_pk?: { readonly __typename?: 'quest_completion', readonly id: any } | null };

export type RejectOtherQuestCompletionsMutationVariables = Exact<{
  accepted_quest_completion_id: Scalars['uuid'];
  questId: Scalars['uuid'];
}>;


export type RejectOtherQuestCompletionsMutation = { readonly __typename?: 'mutation_root', readonly update_quest_completion?: { readonly __typename?: 'quest_completion_mutation_response', readonly affected_rows: number } | null };

export type AddBalanceMutationVariables = Exact<{
  amount: Scalars['float8'];
  blockHeight: Scalars['Int'];
  playerAddress: Scalars['String'];
  tokenAddress: Scalars['String'];
}>;


export type AddBalanceMutation = { readonly __typename?: 'mutation_root', readonly insert_balance_one?: { readonly __typename?: 'balance', readonly id: any } | null };

export type UpdateLastOffsetMutationVariables = Exact<{
  tokenAddress: Scalars['String'];
  offset: Scalars['Int'];
}>;


export type UpdateLastOffsetMutation = { readonly __typename?: 'mutation_root', readonly update_token?: { readonly __typename?: 'token_mutation_response', readonly returning: ReadonlyArray<{ readonly __typename?: 'token', readonly lastOffset: number }> } | null };

export type GetPlayerDaosQueryVariables = Exact<{
  ethereumAddress?: InputMaybe<Scalars['String']>;
}>;


export type GetPlayerDaosQuery = { readonly __typename?: 'query_root', readonly dao_player: ReadonlyArray<{ readonly __typename?: 'dao_player', readonly daoId: any, readonly playerId: any, readonly Dao: { readonly __typename?: 'dao', readonly contractAddress: string, readonly network: string } }> };

export type GetDaosByAddressQueryVariables = Exact<{
  contractAddress?: InputMaybe<ReadonlyArray<Scalars['String']> | Scalars['String']>;
}>;


export type GetDaosByAddressQuery = { readonly __typename?: 'query_root', readonly dao: ReadonlyArray<{ readonly __typename?: 'dao', readonly id: any, readonly contractAddress: string, readonly network: string }> };

export type GuildFragment = { readonly __typename?: 'guild', readonly id: any, readonly guildname: string, readonly description?: string | null, readonly joinButtonUrl?: string | null, readonly logo?: string | null, readonly name: string, readonly type: GuildType_Enum, readonly websiteUrl?: string | null, readonly discordId?: string | null, readonly status: GuildStatus_Enum, readonly membershipThroughDiscord: boolean };

export type GetGuildQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type GetGuildQuery = { readonly __typename?: 'query_root', readonly guild: ReadonlyArray<{ readonly __typename?: 'guild', readonly id: any, readonly guildname: string, readonly description?: string | null, readonly joinButtonUrl?: string | null, readonly logo?: string | null, readonly name: string, readonly type: GuildType_Enum, readonly websiteUrl?: string | null, readonly discordId?: string | null, readonly status: GuildStatus_Enum, readonly membershipThroughDiscord: boolean, readonly daos: ReadonlyArray<{ readonly __typename?: 'dao', readonly id: any, readonly guildId?: any | null, readonly contractAddress: string, readonly network: string, readonly label?: string | null, readonly url?: string | null, readonly players: ReadonlyArray<{ readonly __typename?: 'dao_player', readonly playerId: any, readonly visible?: boolean | null }> }> }> };

export type GetGuildMetadataByDiscordIdQueryVariables = Exact<{
  discordId: Scalars['String'];
}>;


export type GetGuildMetadataByDiscordIdQuery = { readonly __typename?: 'query_root', readonly guild: ReadonlyArray<{ readonly __typename?: 'guild', readonly id: any, readonly discordId?: string | null, readonly guildname: string, readonly metadata?: { readonly __typename?: 'guild_metadata', readonly guildId: any, readonly creatorId?: any | null, readonly discordMetadata?: any | null } | null }> };

export type GetGuildsQueryVariables = Exact<{
  status?: InputMaybe<GuildStatus_Enum>;
}>;


export type GetGuildsQuery = { readonly __typename?: 'query_root', readonly guild: ReadonlyArray<{ readonly __typename?: 'guild', readonly id: any, readonly guildname: string, readonly description?: string | null, readonly joinButtonUrl?: string | null, readonly logo?: string | null, readonly name: string, readonly type: GuildType_Enum, readonly websiteUrl?: string | null, readonly discordId?: string | null, readonly status: GuildStatus_Enum, readonly membershipThroughDiscord: boolean }> };

export type GetGuildMetadataByIdQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type GetGuildMetadataByIdQuery = { readonly __typename?: 'query_root', readonly guild_metadata: ReadonlyArray<{ readonly __typename?: 'guild_metadata', readonly guildId: any, readonly creatorId?: any | null, readonly discordId: string, readonly discordMetadata?: any | null }> };

export type GetGuildMembersQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type GetGuildMembersQuery = { readonly __typename?: 'query_root', readonly guild: ReadonlyArray<{ readonly __typename?: 'guild', readonly id: any, readonly guild_players: ReadonlyArray<{ readonly __typename?: 'guild_player', readonly Player: { readonly __typename?: 'player', readonly id: any, readonly discordId?: string | null, readonly ethereumAddress: string } }> }> };

export type GetGuildPlayerDiscordIdsQueryVariables = Exact<{
  guildId: Scalars['uuid'];
  playerId: Scalars['uuid'];
}>;


export type GetGuildPlayerDiscordIdsQuery = { readonly __typename?: 'query_root', readonly guild_player: ReadonlyArray<{ readonly __typename?: 'guild_player', readonly Player: { readonly __typename?: 'player', readonly id: any, readonly discordId?: string | null }, readonly Guild: { readonly __typename?: 'guild', readonly id: any, readonly discordId?: string | null } }> };

export type GetPlayerQueryVariables = Exact<{
  playerId: Scalars['uuid'];
}>;


export type GetPlayerQuery = { readonly __typename?: 'query_root', readonly player_by_pk?: { readonly __typename?: 'player', readonly id: any, readonly ethereumAddress: string, readonly discordId?: string | null, readonly profile?: { readonly __typename?: 'profile', readonly username?: string | null } | null, readonly accounts: ReadonlyArray<{ readonly __typename?: 'player_account', readonly identifier: string, readonly type: AccountType_Enum }> } | null };

export type GetPlayerFromEthQueryVariables = Exact<{
  ethereumAddress?: InputMaybe<Scalars['String']>;
}>;


export type GetPlayerFromEthQuery = { readonly __typename?: 'query_root', readonly player: ReadonlyArray<{ readonly __typename?: 'player', readonly id: any }> };

export type GetPlayersByDiscordIdQueryVariables = Exact<{
  discordIds: ReadonlyArray<Scalars['String']> | Scalars['String'];
}>;


export type GetPlayersByDiscordIdQuery = { readonly __typename?: 'query_root', readonly player: ReadonlyArray<{ readonly __typename?: 'player', readonly id: any }> };

export type GetCacheEntriesQueryVariables = Exact<{
  updatedBefore: Scalars['timestamptz'];
}>;


export type GetCacheEntriesQuery = { readonly __typename?: 'query_root', readonly profile: ReadonlyArray<{ readonly __typename?: 'profile', readonly playerId: any }> };

export type GetQuestByIdQueryVariables = Exact<{
  questId: Scalars['uuid'];
}>;


export type GetQuestByIdQuery = { readonly __typename?: 'query_root', readonly quest_by_pk?: { readonly __typename?: 'quest', readonly id: any, readonly cooldown?: number | null, readonly status: QuestStatus_Enum, readonly repetition: QuestRepetition_Enum, readonly createdByPlayerId: any, readonly title: string } | null };

export type GetQuestCompletionsQueryVariables = Exact<{
  questId: Scalars['uuid'];
  playerId: Scalars['uuid'];
}>;


export type GetQuestCompletionsQuery = { readonly __typename?: 'query_root', readonly quest_completion: ReadonlyArray<{ readonly __typename?: 'quest_completion', readonly id: any, readonly questId: any, readonly completedByPlayerId: any }> };

export type GetQuestCompletionByIdQueryVariables = Exact<{
  quest_completion_id: Scalars['uuid'];
}>;


export type GetQuestCompletionByIdQuery = { readonly __typename?: 'query_root', readonly quest_completion_by_pk?: { readonly __typename?: 'quest_completion', readonly id: any, readonly questId: any, readonly completedByPlayerId: any, readonly status: QuestCompletionStatus_Enum } | null };

export type GetLastQuestCompletionForPlayerQueryVariables = Exact<{
  questId: Scalars['uuid'];
  playerId: Scalars['uuid'];
}>;


export type GetLastQuestCompletionForPlayerQuery = { readonly __typename?: 'query_root', readonly quest_completion: ReadonlyArray<{ readonly __typename?: 'quest_completion', readonly id: any, readonly questId: any, readonly completedByPlayerId: any, readonly submittedAt: any }> };

export type GetGuildTokenQueryVariables = Exact<{
  guildId: Scalars['uuid'];
}>;


export type GetGuildTokenQuery = { readonly __typename?: 'query_root', readonly token: ReadonlyArray<{ readonly __typename?: 'token', readonly address: string, readonly chainId: number }> };

export type GetTokensQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTokensQuery = { readonly __typename?: 'query_root', readonly token: ReadonlyArray<{ readonly __typename?: 'token', readonly address: string, readonly chainId: number, readonly safeAddress: string, readonly lastOffset: number, readonly guildId: any }> };

export type GetTotalForPlayerQueryVariables = Exact<{
  playerAddress: Scalars['String'];
  tokenAddress: Scalars['String'];
}>;


export type GetTotalForPlayerQuery = { readonly __typename?: 'query_root', readonly balance_aggregate: { readonly __typename?: 'balance_aggregate', readonly aggregate?: { readonly __typename?: 'balance_aggregate_fields', readonly sum?: { readonly __typename?: 'balance_sum_fields', readonly amount?: any | null } | null } | null } };

export const GuildFragmentDoc = gql`
    fragment GuildFragment on guild {
  id
  guildname
  description
  joinButtonUrl
  logo
  name
  type
  websiteUrl
  discordId
  status
  membershipThroughDiscord
}
    `;
export const UpdateDaoDocument = gql`
    mutation UpdateDao($daoId: uuid!, $object: dao_set_input!) {
  update_dao_by_pk(pk_columns: {id: $daoId}, _set: $object) {
    id
  }
}
    `;
export const DetachDaosFromGuildDocument = gql`
    mutation DetachDaosFromGuild($ids: [uuid!]!) {
  update_dao(where: {id: {_in: $ids}}, _set: {guildId: null}) {
    affected_rows
  }
}
    `;
export const DeleteDaosDocument = gql`
    mutation DeleteDaos($ids: [uuid!]!) {
  delete_dao(where: {id: {_in: $ids}}) {
    affected_rows
  }
}
    `;
export const InsertDaosDocument = gql`
    mutation InsertDaos($objects: [dao_insert_input!]!) {
  insert_dao(objects: $objects) {
    returning {
      id
    }
  }
}
    `;
export const SyncDaoMembersDocument = gql`
    mutation SyncDaoMembers($memberEthIdsToRemove: [String!]!, $membersToAdd: [dao_player_insert_input!]!) {
  delete_dao_player(
    where: {Player: {ethereumAddress: {_in: $memberEthIdsToRemove}}}
  ) {
    affected_rows
  }
  insert_dao_player(objects: $membersToAdd) {
    affected_rows
  }
}
    `;
export const RemovePlayerFromDaosDocument = gql`
    mutation RemovePlayerFromDaos($playerEthAdress: String!, $daoIds: [uuid!]!) {
  delete_dao_player(
    where: {Player: {ethereumAddress: {_eq: $playerEthAdress}}, _and: {daoId: {_in: $daoIds}}}
  ) {
    affected_rows
  }
}
    `;
export const UpsertDaoMembersDocument = gql`
    mutation UpsertDaoMembers($objects: [dao_player_insert_input!]!) {
  insert_dao_player(
    objects: $objects
    on_conflict: {constraint: dao_player_pkey, update_columns: []}
  ) {
    affected_rows
  }
}
    `;
export const CreateGuildDocument = gql`
    mutation CreateGuild($object: guild_insert_input!) {
  insert_guild_one(object: $object) {
    guildname
    id
  }
}
    `;
export const UpdateGuildDocument = gql`
    mutation UpdateGuild($guildId: uuid!, $object: guild_set_input!) {
  update_guild_by_pk(pk_columns: {id: $guildId}, _set: $object) {
    id
  }
}
    `;
export const CreateGuildMetadataDocument = gql`
    mutation CreateGuildMetadata($object: guild_metadata_insert_input!) {
  insert_guild_metadata_one(object: $object) {
    creatorId
    discordId
    guildId
    discordMetadata
  }
}
    `;
export const UpdateGuildDiscordMetadataDocument = gql`
    mutation UpdateGuildDiscordMetadata($guildId: uuid!, $discordMetadata: jsonb) {
  update_guild_metadata_by_pk(
    pk_columns: {guildId: $guildId}
    _set: {discordMetadata: $discordMetadata}
  ) {
    guildId
  }
}
    `;
export const SyncGuildMembersDocument = gql`
    mutation SyncGuildMembers($memberDiscordIdsToRemove: [String!]!, $membersToAdd: [guild_player_insert_input!]!) {
  delete_guild_player(
    where: {Player: {discordId: {_in: $memberDiscordIdsToRemove}}}
  ) {
    affected_rows
  }
  insert_guild_player(objects: $membersToAdd) {
    affected_rows
  }
}
    `;
export const RemoveAllGuildMembersDocument = gql`
    mutation RemoveAllGuildMembers($guildId: uuid!) {
  delete_guild_player(where: {guildId: {_eq: $guildId}}) {
    affected_rows
  }
}
    `;
export const CreatePlayerFromEthDocument = gql`
    mutation CreatePlayerFromETH($ethereumAddress: String!) {
  insert_profile(objects: [{player: {data: {ethereumAddress: $ethereumAddress}}}]) {
    affected_rows
    returning {
      id
      player {
        id
        ethereumAddress
      }
    }
  }
}
    `;
export const UpsertAccountDocument = gql`
    mutation UpsertAccount($objects: [player_account_insert_input!]!, $on_conflict: player_account_on_conflict = {constraint: Account_identifier_type_key, update_columns: [playerId]}) {
  insert_player_account(objects: $objects, on_conflict: $on_conflict) {
    affected_rows
  }
}
    `;
export const ResetAllPlayersXpDocument = gql`
    mutation ResetAllPlayersXP {
  update_player(where: {}, _set: {seasonXP: 0, totalXP: 0, rank: null}) {
    affected_rows
  }
}
    `;
export const UpsertProfileDocument = gql`
    mutation UpsertProfile($objects: [profile_insert_input!]!, $updateColumns: [profile_update_column!]!) {
  insert_profile(
    objects: $objects
    on_conflict: {constraint: profile_player_id_key, update_columns: $updateColumns}
  ) {
    affected_rows
  }
}
    `;
export const UpdatePlayerDocument = gql`
    mutation UpdatePlayer($ethereumAddress: String!, $rank: PlayerRank_enum, $totalXP: numeric, $seasonXP: numeric, $discordId: String) {
  update_player(
    where: {ethereumAddress: {_ilike: $ethereumAddress}}
    _set: {rank: $rank, totalXP: $totalXP, seasonXP: $seasonXP, discordId: $discordId}
  ) {
    affected_rows
    returning {
      id
      ethereumAddress
      profile {
        username
      }
    }
  }
}
    `;
export const InsertPlayersDocument = gql`
    mutation InsertPlayers($objects: [player_insert_input!]!) {
  insert_player(objects: $objects) {
    affected_rows
    returning {
      id
    }
  }
}
    `;
export const RemovePlayerAccountDocument = gql`
    mutation RemovePlayerAccount($playerId: uuid!, $accountType: AccountType_enum) {
  delete_player_account(
    where: {playerId: {_eq: $playerId}, type: {_eq: $accountType}}
  ) {
    affected_rows
  }
}
    `;
export const CreateQuestDocument = gql`
    mutation CreateQuest($objects: [quest_insert_input!]!) {
  insert_quest(objects: $objects) {
    affected_rows
    returning {
      id
    }
  }
}
    `;
export const CreateQuestCompletionDocument = gql`
    mutation CreateQuestCompletion($objects: [quest_completion_insert_input!]!) {
  insert_quest_completion(objects: $objects) {
    affected_rows
    returning {
      id
      questId
      completedByPlayerId
    }
  }
}
    `;
export const UpdateQuestStatusDocument = gql`
    mutation UpdateQuestStatus($quest_id: uuid!, $status: QuestStatus_enum!) {
  update_quest_by_pk(pk_columns: {id: $quest_id}, _set: {status: $status}) {
    id
  }
}
    `;
export const UpdateQuestCompletionStatusDocument = gql`
    mutation UpdateQuestCompletionStatus($quest_completion_id: uuid!, $status: QuestCompletionStatus_enum!) {
  update_quest_completion_by_pk(
    pk_columns: {id: $quest_completion_id}
    _set: {status: $status}
  ) {
    id
  }
}
    `;
export const RejectOtherQuestCompletionsDocument = gql`
    mutation RejectOtherQuestCompletions($accepted_quest_completion_id: uuid!, $questId: uuid!) {
  update_quest_completion(
    where: {_and: [{id: {_neq: $accepted_quest_completion_id}}, {questId: {_eq: $questId}}]}
    _set: {status: REJECTED}
  ) {
    affected_rows
  }
}
    `;
export const AddBalanceDocument = gql`
    mutation AddBalance($amount: float8!, $blockHeight: Int!, $playerAddress: String!, $tokenAddress: String!) {
  insert_balance_one(
    object: {amount: $amount, blockHeight: $blockHeight, playerAddress: $playerAddress, tokenAddress: $tokenAddress}
  ) {
    id
  }
}
    `;
export const UpdateLastOffsetDocument = gql`
    mutation UpdateLastOffset($tokenAddress: String!, $offset: Int!) {
  update_token(
    where: {address: {_eq: $tokenAddress}}
    _set: {lastOffset: $offset}
  ) {
    returning {
      lastOffset
    }
  }
}
    `;
export const GetPlayerDaosDocument = gql`
    query GetPlayerDaos($ethereumAddress: String) {
  dao_player(where: {Player: {ethereumAddress: {_eq: $ethereumAddress}}}) {
    daoId
    playerId
    Dao {
      contractAddress
      network
    }
  }
}
    `;
export const GetDaosByAddressDocument = gql`
    query GetDaosByAddress($contractAddress: [String!]) {
  dao(where: {contractAddress: {_in: $contractAddress}}) {
    id
    contractAddress
    network
  }
}
    `;
export const GetGuildDocument = gql`
    query GetGuild($id: uuid!) {
  guild(where: {id: {_eq: $id}}) {
    ...GuildFragment
    daos {
      id
      guildId
      contractAddress
      network
      label
      url
      players {
        playerId
        visible
      }
    }
  }
}
    ${GuildFragmentDoc}`;
export const GetGuildMetadataByDiscordIdDocument = gql`
    query GetGuildMetadataByDiscordId($discordId: String!) {
  guild(where: {discordId: {_eq: $discordId}}) {
    id
    discordId
    guildname
    metadata {
      guildId
      creatorId
      discordMetadata
    }
  }
}
    `;
export const GetGuildsDocument = gql`
    query GetGuilds($status: GuildStatus_enum) {
  guild(where: {status: {_eq: $status}}) {
    ...GuildFragment
  }
}
    ${GuildFragmentDoc}`;
export const GetGuildMetadataByIdDocument = gql`
    query GetGuildMetadataById($id: uuid!) {
  guild_metadata(where: {guildId: {_eq: $id}}) {
    guildId
    creatorId
    discordId
    discordMetadata
  }
}
    `;
export const GetGuildMembersDocument = gql`
    query GetGuildMembers($id: uuid!) {
  guild(where: {id: {_eq: $id}}) {
    id
    guild_players {
      Player {
        id
        discordId
        ethereumAddress
      }
    }
  }
}
    `;
export const GetGuildPlayerDiscordIdsDocument = gql`
    query GetGuildPlayerDiscordIds($guildId: uuid!, $playerId: uuid!) {
  guild_player(
    where: {_and: {guildId: {_eq: $guildId}, playerId: {_eq: $playerId}}}
  ) {
    Player {
      id
      discordId
    }
    Guild {
      id
      discordId
    }
  }
}
    `;
export const GetPlayerDocument = gql`
    query GetPlayer($playerId: uuid!) {
  player_by_pk(id: $playerId) {
    id
    ethereumAddress
    discordId
    profile {
      username
    }
    accounts {
      identifier
      type
    }
  }
}
    `;
export const GetPlayerFromEthDocument = gql`
    query GetPlayerFromETH($ethereumAddress: String) {
  player(where: {ethereumAddress: {_eq: $ethereumAddress}}) {
    id
  }
}
    `;
export const GetPlayersByDiscordIdDocument = gql`
    query GetPlayersByDiscordId($discordIds: [String!]!) {
  player(where: {discordId: {_in: $discordIds}}) {
    id
  }
}
    `;
export const GetCacheEntriesDocument = gql`
    query GetCacheEntries($updatedBefore: timestamptz!) {
  profile(
    where: {_or: [{lastCheckedAt: {_lt: $updatedBefore}}, {lastCheckedAt: {_is_null: true}}]}
  ) {
    playerId
  }
}
    `;
export const GetQuestByIdDocument = gql`
    query GetQuestById($questId: uuid!) {
  quest_by_pk(id: $questId) {
    id
    cooldown
    status
    repetition
    createdByPlayerId
    title
  }
}
    `;
export const GetQuestCompletionsDocument = gql`
    query GetQuestCompletions($questId: uuid!, $playerId: uuid!) {
  quest_completion(
    where: {questId: {_eq: $questId}, completedByPlayerId: {_eq: $playerId}}
  ) {
    id
    questId
    completedByPlayerId
  }
}
    `;
export const GetQuestCompletionByIdDocument = gql`
    query GetQuestCompletionById($quest_completion_id: uuid!) {
  quest_completion_by_pk(id: $quest_completion_id) {
    id
    questId
    completedByPlayerId
    status
  }
}
    `;
export const GetLastQuestCompletionForPlayerDocument = gql`
    query GetLastQuestCompletionForPlayer($questId: uuid!, $playerId: uuid!) {
  quest_completion(
    limit: 1
    order_by: {submittedAt: desc}
    where: {questId: {_eq: $questId}, completedByPlayerId: {_eq: $playerId}}
  ) {
    id
    questId
    completedByPlayerId
    submittedAt
  }
}
    `;
export const GetGuildTokenDocument = gql`
    query GetGuildToken($guildId: uuid!) {
  token(where: {guildId: {_eq: $guildId}}) {
    address
    chainId
  }
}
    `;
export const GetTokensDocument = gql`
    query GetTokens {
  token {
    address
    chainId
    safeAddress
    lastOffset
    guildId
  }
}
    `;
export const GetTotalForPlayerDocument = gql`
    query GetTotalForPlayer($playerAddress: String!, $tokenAddress: String!) {
  balance_aggregate(
    where: {tokenAddress: {_ilike: $tokenAddress}, playerAddress: {_ilike: $playerAddress}}
  ) {
    aggregate {
      sum {
        amount
      }
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    UpdateDao(variables: UpdateDaoMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateDaoMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateDaoMutation>(UpdateDaoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateDao');
    },
    DetachDaosFromGuild(variables: DetachDaosFromGuildMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DetachDaosFromGuildMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DetachDaosFromGuildMutation>(DetachDaosFromGuildDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DetachDaosFromGuild');
    },
    DeleteDaos(variables: DeleteDaosMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteDaosMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteDaosMutation>(DeleteDaosDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'DeleteDaos');
    },
    InsertDaos(variables: InsertDaosMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<InsertDaosMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<InsertDaosMutation>(InsertDaosDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'InsertDaos');
    },
    SyncDaoMembers(variables: SyncDaoMembersMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SyncDaoMembersMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<SyncDaoMembersMutation>(SyncDaoMembersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'SyncDaoMembers');
    },
    RemovePlayerFromDaos(variables: RemovePlayerFromDaosMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<RemovePlayerFromDaosMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<RemovePlayerFromDaosMutation>(RemovePlayerFromDaosDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'RemovePlayerFromDaos');
    },
    UpsertDaoMembers(variables: UpsertDaoMembersMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpsertDaoMembersMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpsertDaoMembersMutation>(UpsertDaoMembersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpsertDaoMembers');
    },
    CreateGuild(variables: CreateGuildMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateGuildMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateGuildMutation>(CreateGuildDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateGuild');
    },
    UpdateGuild(variables: UpdateGuildMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateGuildMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateGuildMutation>(UpdateGuildDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateGuild');
    },
    CreateGuildMetadata(variables: CreateGuildMetadataMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateGuildMetadataMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateGuildMetadataMutation>(CreateGuildMetadataDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateGuildMetadata');
    },
    UpdateGuildDiscordMetadata(variables: UpdateGuildDiscordMetadataMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateGuildDiscordMetadataMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateGuildDiscordMetadataMutation>(UpdateGuildDiscordMetadataDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateGuildDiscordMetadata');
    },
    SyncGuildMembers(variables: SyncGuildMembersMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SyncGuildMembersMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<SyncGuildMembersMutation>(SyncGuildMembersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'SyncGuildMembers');
    },
    RemoveAllGuildMembers(variables: RemoveAllGuildMembersMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<RemoveAllGuildMembersMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<RemoveAllGuildMembersMutation>(RemoveAllGuildMembersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'RemoveAllGuildMembers');
    },
    CreatePlayerFromETH(variables: CreatePlayerFromEthMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreatePlayerFromEthMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreatePlayerFromEthMutation>(CreatePlayerFromEthDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreatePlayerFromETH');
    },
    UpsertAccount(variables: UpsertAccountMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpsertAccountMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpsertAccountMutation>(UpsertAccountDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpsertAccount');
    },
    ResetAllPlayersXP(variables?: ResetAllPlayersXpMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ResetAllPlayersXpMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<ResetAllPlayersXpMutation>(ResetAllPlayersXpDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ResetAllPlayersXP');
    },
    UpsertProfile(variables: UpsertProfileMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpsertProfileMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpsertProfileMutation>(UpsertProfileDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpsertProfile');
    },
    UpdatePlayer(variables: UpdatePlayerMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdatePlayerMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdatePlayerMutation>(UpdatePlayerDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdatePlayer');
    },
    InsertPlayers(variables: InsertPlayersMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<InsertPlayersMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<InsertPlayersMutation>(InsertPlayersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'InsertPlayers');
    },
    RemovePlayerAccount(variables: RemovePlayerAccountMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<RemovePlayerAccountMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<RemovePlayerAccountMutation>(RemovePlayerAccountDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'RemovePlayerAccount');
    },
    CreateQuest(variables: CreateQuestMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateQuestMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateQuestMutation>(CreateQuestDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateQuest');
    },
    CreateQuestCompletion(variables: CreateQuestCompletionMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateQuestCompletionMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateQuestCompletionMutation>(CreateQuestCompletionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateQuestCompletion');
    },
    UpdateQuestStatus(variables: UpdateQuestStatusMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateQuestStatusMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateQuestStatusMutation>(UpdateQuestStatusDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateQuestStatus');
    },
    UpdateQuestCompletionStatus(variables: UpdateQuestCompletionStatusMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateQuestCompletionStatusMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateQuestCompletionStatusMutation>(UpdateQuestCompletionStatusDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateQuestCompletionStatus');
    },
    RejectOtherQuestCompletions(variables: RejectOtherQuestCompletionsMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<RejectOtherQuestCompletionsMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<RejectOtherQuestCompletionsMutation>(RejectOtherQuestCompletionsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'RejectOtherQuestCompletions');
    },
    AddBalance(variables: AddBalanceMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AddBalanceMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AddBalanceMutation>(AddBalanceDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'AddBalance');
    },
    UpdateLastOffset(variables: UpdateLastOffsetMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateLastOffsetMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateLastOffsetMutation>(UpdateLastOffsetDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateLastOffset');
    },
    GetPlayerDaos(variables?: GetPlayerDaosQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetPlayerDaosQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetPlayerDaosQuery>(GetPlayerDaosDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetPlayerDaos');
    },
    GetDaosByAddress(variables?: GetDaosByAddressQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetDaosByAddressQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetDaosByAddressQuery>(GetDaosByAddressDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetDaosByAddress');
    },
    GetGuild(variables: GetGuildQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetGuildQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetGuildQuery>(GetGuildDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetGuild');
    },
    GetGuildMetadataByDiscordId(variables: GetGuildMetadataByDiscordIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetGuildMetadataByDiscordIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetGuildMetadataByDiscordIdQuery>(GetGuildMetadataByDiscordIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetGuildMetadataByDiscordId');
    },
    GetGuilds(variables?: GetGuildsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetGuildsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetGuildsQuery>(GetGuildsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetGuilds');
    },
    GetGuildMetadataById(variables: GetGuildMetadataByIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetGuildMetadataByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetGuildMetadataByIdQuery>(GetGuildMetadataByIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetGuildMetadataById');
    },
    GetGuildMembers(variables: GetGuildMembersQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetGuildMembersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetGuildMembersQuery>(GetGuildMembersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetGuildMembers');
    },
    GetGuildPlayerDiscordIds(variables: GetGuildPlayerDiscordIdsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetGuildPlayerDiscordIdsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetGuildPlayerDiscordIdsQuery>(GetGuildPlayerDiscordIdsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetGuildPlayerDiscordIds');
    },
    GetPlayer(variables: GetPlayerQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetPlayerQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetPlayerQuery>(GetPlayerDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetPlayer');
    },
    GetPlayerFromETH(variables?: GetPlayerFromEthQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetPlayerFromEthQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetPlayerFromEthQuery>(GetPlayerFromEthDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetPlayerFromETH');
    },
    GetPlayersByDiscordId(variables: GetPlayersByDiscordIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetPlayersByDiscordIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetPlayersByDiscordIdQuery>(GetPlayersByDiscordIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetPlayersByDiscordId');
    },
    GetCacheEntries(variables: GetCacheEntriesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetCacheEntriesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCacheEntriesQuery>(GetCacheEntriesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetCacheEntries');
    },
    GetQuestById(variables: GetQuestByIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetQuestByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetQuestByIdQuery>(GetQuestByIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetQuestById');
    },
    GetQuestCompletions(variables: GetQuestCompletionsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetQuestCompletionsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetQuestCompletionsQuery>(GetQuestCompletionsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetQuestCompletions');
    },
    GetQuestCompletionById(variables: GetQuestCompletionByIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetQuestCompletionByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetQuestCompletionByIdQuery>(GetQuestCompletionByIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetQuestCompletionById');
    },
    GetLastQuestCompletionForPlayer(variables: GetLastQuestCompletionForPlayerQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetLastQuestCompletionForPlayerQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetLastQuestCompletionForPlayerQuery>(GetLastQuestCompletionForPlayerDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetLastQuestCompletionForPlayer');
    },
    GetGuildToken(variables: GetGuildTokenQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetGuildTokenQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetGuildTokenQuery>(GetGuildTokenDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetGuildToken');
    },
    GetTokens(variables?: GetTokensQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetTokensQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetTokensQuery>(GetTokensDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetTokens');
    },
    GetTotalForPlayer(variables: GetTotalForPlayerQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetTotalForPlayerQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetTotalForPlayerQuery>(GetTotalForPlayerDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetTotalForPlayer');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;