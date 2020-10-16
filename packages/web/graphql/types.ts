import { EnneagramType_Enum, Member, Moloch } from 'graphql/autogen/types';

export type Skill = {
  id: string;
  name: string;
  category: string;
};

export type PersonalityType = {
  id: string;
  name: EnneagramType_Enum;
  label: string;
  description: string;
  image: string;
};

export type Membership = Pick<Member, 'id'> & {
  moloch: Pick<Moloch, 'id' | 'title' | 'version'>;
};
