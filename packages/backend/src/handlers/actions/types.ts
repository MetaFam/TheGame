// TODO get this from codegen ? can we extract custom action types from /hasura/metadata/actions.yml ?

// This was auto-generated on hasura console

export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  uuid: any;
};

export type CreateQuestInput = {
  guild_id: Scalars['uuid'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  external_link?: Maybe<Scalars['String']>;
  repetition?: Maybe<Scalars['String']>;
  cooldown?: Maybe<Scalars['Int']>;
};

export type CreateQuestOutput = {
  __typename?: 'CreateQuestOutput';
  success: Scalars['Boolean'];
  quest_id?: Maybe<Scalars['uuid']>;
  error?: Maybe<Scalars['String']>;
};

export type CreateQuestCompletionInput = {
  quest_id: Scalars['String'];
  submission_link: Scalars['String'];
  submission_text: Scalars['String'];
};

export type CreateQuestCompletionOutput = {
  __typename?: 'CreateQuestCompletionOutput';
  success: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
  quest_id?: Maybe<Scalars['uuid']>;
  completed_by_player_id?: Maybe<Scalars['uuid']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createQuest?: Maybe<CreateQuestOutput>;
  updateBoxProfile?: Maybe<UpdateBoxProfileResponse>;
};

export type MutationCreateQuestArgs = {
  quest: CreateQuestInput;
};

export type QuestCreateInput = {
  guild_id: Scalars['uuid'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  external_link?: Maybe<Scalars['String']>;
  repetition?: Maybe<Scalars['String']>;
  cooldown?: Maybe<Scalars['Int']>;
};

export type QuestCreateOutput = {
  __typename?: 'QuestCreateOutput';
  quest_id: Scalars['uuid'];
};

export type UpdateBoxProfileResponse = {
  __typename?: 'UpdateBoxProfileResponse';
  success: Scalars['Boolean'];
  updatedProfiles: Array<Scalars['String']>;
};
