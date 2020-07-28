type Maybe<T> = T | null;

type BoxProfile = {
  ethereumAddress: string | null;
  name: string | null;
  description: string | null;
  location: string | null;
  job: string | null;
  emoji: string | null;
  imageUrl: string | null;
};

type UpdateBoxProfileResponse = {
  success: boolean;
  updatedProfiles: Array<string>;
};

type Mutation = {
  updateBoxProfile?: Maybe<UpdateBoxProfileResponse>;
};

// eslint-disable-next-line @typescript-eslint/ban-types
type updateBoxProfileArgs = {};
