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

export type CreateQuestCompletionInput = {
  quest_id: Scalars['String'];
  submission_link: Scalars['String'];
  submission_text: Scalars['String'];
};

export type CreateQuestCompletionOutput = {
  __typename?: 'CreateQuestCompletionOutput';
  success: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
  quest_completion_id?: Maybe<Scalars['uuid']>;
};

export type CreateQuestInput = {
  guild_id: Scalars['uuid'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  external_link?: Maybe<Scalars['String']>;
  repetition?: Maybe<QuestRepetition_Enum>;
  cooldown?: Maybe<Scalars['Int']>;
};

export type CreateQuestOutput = {
  __typename?: 'CreateQuestOutput';
  success: Scalars['Boolean'];
  quest_id?: Maybe<Scalars['uuid']>;
  error?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createQuest?: Maybe<CreateQuestOutput>;
  createQuestCompletion?: Maybe<CreateQuestCompletionOutput>;
  updateBoxProfile?: Maybe<UpdateBoxProfileResponse>;
  updateQuestCompletion?: Maybe<UpdateQuestCompletionOutput>;
};


export type MutationCreateQuestArgs = {
  quest: CreateQuestInput;
};


export type MutationCreateQuestCompletionArgs = {
  questCompletion: CreateQuestCompletionInput;
};


export type MutationUpdateQuestCompletionArgs = {
  updateData: UpdateQuestCompletionInput;
};

export enum QuestCompletionStatus_Enum {
  Pending = 'PENDING',
  Accepted = 'ACCEPTED',
  Rejected = 'REJECTED'
}

export enum QuestRepetition_Enum {
  Unique = 'UNIQUE',
  Personal = 'PERSONAL',
  Recurring = 'RECURRING'
}

export type UpdateBoxProfileResponse = {
  __typename?: 'UpdateBoxProfileResponse';
  success: Scalars['Boolean'];
  updatedProfiles: Array<Scalars['String']>;
};

export type UpdateQuestCompletionInput = {
  quest_id: Scalars['String'];
  quest_completion_id: Scalars['String'];
  status: QuestCompletionStatus_Enum;
};

export type UpdateQuestCompletionOutput = {
  __typename?: 'UpdateQuestCompletionOutput';
  success: Scalars['Boolean'];
  error?: Maybe<Scalars['String']>;
};
