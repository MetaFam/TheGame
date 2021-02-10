// TODO get this from codegen ? does it support action types ?

export type UpdateBoxProfileResponse = {
  success: boolean;
  updatedProfiles: Array<string>;
};

export type QuestCreateOutput = {
  quest_id: string;
};
