import { MetaTheme } from '@metafam/ds';

import {
  //BaseColor_Enum,
  Member,
  Moloch,
  SkillCategory_Enum,
} from 'graphql/autogen/types';

enum BaseColor_Enum {
  White = 'White',
  Red = 'Red',
  Blue = 'Blue',
  Black = 'Black',
  Green = 'Green'
}

export const ColorByMask = {
  0b00000: 'Colorless',
  0b10000: 'White',
  0b01000: 'Blue',
  0b00100: 'Black',
  0b00010: 'Red',
  0b00001: 'Green',
  0b11000: 'The Azorius Senate',    // WU
  0b01100: 'The House Dimir',       // UB
  0b00101: 'The Golgari Swarm',     // BG
  0b00011: 'The Gruul Clans',       // RG
  0b10001: 'The Selesnya Conclave', // WG
  0b01001: 'The Simic Combine',     // UG
  0b10100: 'The Orzhov Syndicate',  // WB
  0b01010: 'The Izzet League',      // UR
  0b00110: 'The Cult of Rakdos',    // BR
  0b10010: 'The Boros Legion',      // WR
  0b11001: 'The Bant Shard',        // WUG
  0b11100: 'The Esper Shard',       // WUB
  0b01110: 'The Grixis Shard',      // UBR
  0b00111: 'The Jund Shard',        // BRG
  0b10011: 'The Naya Shard',        // WRG
  0b11010: 'The Jeskai Way',        // WUR
  0b01101: 'The Sultai Brood',      // UBG
  0b10110: 'The Mardu Horde',       // WBR
  0b01011: 'The Temur Frontier',    // URG
  0b10101: 'The Abzan Houses',      // WBG
  0b11110: 'Artifice',   // WUBR
  0b11101: 'Growth',     // WUBG
  0b11011: 'Altruism',   // WURG
  0b10111: 'Aggression', // WBRG
  0b01111: 'Chaos',      // UBRG
  0b11111: 'Balance',    // WUBRG
}

const PersonalityIcons = (
  Object.fromEntries(
    Object.values(ColorByMask).map(
      (name) => [name, import(`assets/colors/${name}.svg`)]
    )
  )
)
console.info(PersonalityIcons)

export type Skill = {
  id: string;
  name: string;
  category: string;
};

export type PersonalityInfo = {
  id: string;
  name: BaseColor_Enum;
  label: string;
  description: string;
  image: string;
};

export type Membership = Pick<Member, 'id'> & {
  moloch: Pick<Moloch, 'id' | 'title' | 'version'>;
};

export const PersonalityTypes: {
  [any: string]: PersonalityInfo;
} = {
  [BaseColor_Enum.White]: {
    id: '1',
    name: BaseColor_Enum.White,
    label: 'Justice',
    description: BaseColor_Enum[BaseColor_Enum.White],
    image: PersonalityIcons['White'],
  },
  // [EnneagramType_Enum.Helper]: {
  //   id: '2',
  //   name: EnneagramType_Enum.Helper,
  //   label: 'The Helper',
  //   description: 'Demonstrative, Generous, People-Pleasing, and Possessive',
  //   image: HelperImage,
  // },
  // [EnneagramType_Enum.Achiever]: {
  //   id: '3',
  //   name: EnneagramType_Enum.Achiever,
  //   label: 'The Achiever',
  //   description: 'Adaptive, Excelling, Driven, and Image-Conscious',
  //   image: AchieverImage,
  // },
  // [EnneagramType_Enum.Individualist]: {
  //   id: '4',
  //   name: EnneagramType_Enum.Individualist,
  //   label: 'The Individualist',
  //   description: 'Expressive, Dramatic, Self-Absorbed, and Temperamental',
  //   image: IndividualistImage,
  // },
  // [EnneagramType_Enum.Investigator]: {
  //   id: '5',
  //   name: EnneagramType_Enum.Investigator,
  //   label: 'The Investigator',
  //   description: 'Perceptive, Innovative, Secretive, and Isolated',
  //   image: InvestigatorImage,
  // },
  // [EnneagramType_Enum.Loyalist]: {
  //   id: '6',
  //   name: EnneagramType_Enum.Loyalist,
  //   label: 'The Loyalist',
  //   description: 'Engaging, Responsible, Anxious, and Suspicious',
  //   image: LoyalistImage,
  // },
  // [EnneagramType_Enum.Enthusiast]: {
  //   id: '7',
  //   name: EnneagramType_Enum.Enthusiast,
  //   label: 'The Enthusiast',
  //   description: 'Spontaneous, Versatile, Distractible, and Scattered',
  //   image: EnthusiastImage,
  // },
  // [EnneagramType_Enum.Challenger]: {
  //   id: '8',
  //   name: EnneagramType_Enum.Challenger,
  //   label: 'The Challenger',
  //   description: 'Self-Confident, Decisive, Willful, and Confrontational',
  //   image: ChallengerImage,
  // },
  // [EnneagramType_Enum.Peacemaker]: {
  //   id: '9',
  //   name: EnneagramType_Enum.Peacemaker,
  //   label: 'The Peacemaker',
  //   description: 'Receptive, Reassuring, Agreeable, and Complacent',
  //   image: PeacemakerImage,
  // },
};

export const SkillColors: Record<SkillCategory_Enum, string> = {
  [SkillCategory_Enum.Community]: MetaTheme.colors.green['700'],
  [SkillCategory_Enum.Design]: MetaTheme.colors.pink['700'],
  [SkillCategory_Enum.Dev]: MetaTheme.colors.cyan['700'],
  [SkillCategory_Enum.Engineering]: MetaTheme.colors.blue['700'],
  [SkillCategory_Enum.Technologies]: MetaTheme.colors.gray['600'],
  [SkillCategory_Enum.Strategy]: MetaTheme.colors.yellow['700'],
};
