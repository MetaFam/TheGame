import { MetaTheme } from '@metafam/ds';
import {
  Me,
  Member,
  Moloch,
  PlayerFragmentFragment,
  SkillCategory_Enum,
} from 'graphql/autogen/types';

export type Patron = PlayerFragmentFragment & {
  pSeedBalance: string;
};

export type Skill = {
  id: string;
  name: string;
  category: string;
};

export type PersonalityOption = {
  mask: number;
  name: string;
  description?: string | null | undefined;
};

export type Membership = Pick<Member, 'id'> & {
  moloch: Pick<Moloch, 'id' | 'title' | 'version'>;
};

export type MeType =
  | (Pick<Me, 'id' | 'ethereum_address' | 'username'> & {
      player?: PlayerFragmentFragment | null | undefined;
    })
  | null
  | undefined;

export const SkillColors: Record<SkillCategory_Enum, string> = {
  [SkillCategory_Enum.Community]: MetaTheme.colors.green['700'],
  [SkillCategory_Enum.Design]: MetaTheme.colors.pink['700'],
  [SkillCategory_Enum.Dev]: MetaTheme.colors.cyan['700'],
  [SkillCategory_Enum.Engineering]: MetaTheme.colors.blue['700'],
  [SkillCategory_Enum.Technologies]: MetaTheme.colors.gray['600'],
  [SkillCategory_Enum.Strategy]: MetaTheme.colors.yellow['700'],
};
