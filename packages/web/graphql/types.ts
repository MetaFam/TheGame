import { MetaTheme } from '@metafam/ds';
import AchieverImage from 'assets/achiever.png';
import ChallengerImage from 'assets/challenger.png';
import EnthusiastImage from 'assets/enthusiast.png';
import HelperImage from 'assets/helper.png';
import IndividualistImage from 'assets/individualist.png';
import InvestigatorImage from 'assets/investigator.png';
import LoyalistImage from 'assets/loyalist.png';
import PeacemakerImage from 'assets/peacemaker.png';
import ReformerImage from 'assets/reformer.png';
import {
  EnneagramType_Enum,
  Member,
  Moloch,
  SkillCategory_Enum,
} from 'graphql/autogen/types';

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

export const personalityTypes: {
  [any: string]: PersonalityType;
} = {
  [EnneagramType_Enum.Reformer]: {
    id: '1',
    name: EnneagramType_Enum.Reformer,
    label: 'The Reformer',
    description: 'Principled, Purposeful, Self-Controlled, and Perfectionistic',
    image: ReformerImage,
  },
  [EnneagramType_Enum.Helper]: {
    id: '2',
    name: EnneagramType_Enum.Helper,
    label: 'The Helper',
    description: 'Demonstrative, Generous, People-Pleasing, and Possessive',
    image: HelperImage,
  },
  [EnneagramType_Enum.Achiever]: {
    id: '3',
    name: EnneagramType_Enum.Achiever,
    label: 'The Achiever',
    description: 'Adaptive, Excelling, Driven, and Image-Conscious',
    image: AchieverImage,
  },
  [EnneagramType_Enum.Individualist]: {
    id: '4',
    name: EnneagramType_Enum.Individualist,
    label: 'The Individualist',
    description: 'Expressive, Dramatic, Self-Absorbed, and Temperamental',
    image: IndividualistImage,
  },
  [EnneagramType_Enum.Investigator]: {
    id: '5',
    name: EnneagramType_Enum.Investigator,
    label: 'The Investigator',
    description: 'Perceptive, Innovative, Secretive, and Isolated',
    image: InvestigatorImage,
  },
  [EnneagramType_Enum.Loyalist]: {
    id: '6',
    name: EnneagramType_Enum.Loyalist,
    label: 'The Loyalist',
    description: 'Engaging, Responsible, Anxious, and Suspicious',
    image: LoyalistImage,
  },
  [EnneagramType_Enum.Enthusiast]: {
    id: '7',
    name: EnneagramType_Enum.Enthusiast,
    label: 'The Enthusiast',
    description: 'Spontaneous, Versatile, Distractible, and Scattered',
    image: EnthusiastImage,
  },
  [EnneagramType_Enum.Challenger]: {
    id: '8',
    name: EnneagramType_Enum.Challenger,
    label: 'The Challenger',
    description: 'Self-Confident, Decisive, Willful, and Confrontational',
    image: ChallengerImage,
  },
  [EnneagramType_Enum.Peacemaker]: {
    id: '9',
    name: EnneagramType_Enum.Peacemaker,
    label: 'The Peacemaker',
    description: 'Receptive, Reassuring, Agreeable, and Complacent',
    image: PeacemakerImage,
  },
};

export const skillColors: Record<SkillCategory_Enum, string> = {
  [SkillCategory_Enum.Community]: MetaTheme.colors.green['700'],
  [SkillCategory_Enum.Design]: MetaTheme.colors.pink['700'],
  [SkillCategory_Enum.Dev]: MetaTheme.colors.cyan['700'],
  [SkillCategory_Enum.Engineering]: MetaTheme.colors.blue['700'],
  [SkillCategory_Enum.Technologies]: MetaTheme.colors.gray['600'],
  [SkillCategory_Enum.Strategy]: MetaTheme.colors.yellow['700'],
};
