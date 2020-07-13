type Maybe<T> = T | null;

type UpdateBoxProfileResponse = {
  success: boolean;
  updatedProfiles: Array<string>;
};

type Mutation = {
  updateBoxProfile?: Maybe<UpdateBoxProfileResponse>;
};

// eslint-disable-next-line @typescript-eslint/ban-types
type updateBoxProfileArgs = {};
