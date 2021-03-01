import { MetaTheme } from '@metafam/ds';
import Aggression from 'assets/colors/Aggression.svg';
import Altruism from 'assets/colors/Altruism.svg';
import Artifice from 'assets/colors/Artifice.svg';
import Balance from 'assets/colors/Balance.svg';
import Black from 'assets/colors/Black.svg';
import Blue from 'assets/colors/Blue.svg';
import Chaos from 'assets/colors/Chaos.svg';
import Colorless from 'assets/colors/Colorless.svg';
import Green from 'assets/colors/Green.svg';
import Growth from 'assets/colors/Growth.svg';
import Red from 'assets/colors/Red.svg';
import Abzan from 'assets/colors/The Abzan Houses.svg';
import Azorius from 'assets/colors/The Azorius Senate.svg';
import Bant from 'assets/colors/The Bant Shard.svg';
import Boros from 'assets/colors/The Boros Legion.svg';
import Rakdos from 'assets/colors/The Cult of Rakdos.svg';
import Esper from 'assets/colors/The Esper Shard.svg';
import Golgari from 'assets/colors/The Golgari Swarm.svg';
import Grixis from 'assets/colors/The Grixis Shard.svg';
import Gruul from 'assets/colors/The Gruul Clans.svg';
import Dimir from 'assets/colors/The House Dimir.svg';
import Izzet from 'assets/colors/The Izzet League.svg';
import Jeskai from 'assets/colors/The Jeskai Way.svg';
import Jund from 'assets/colors/The Jund Shard.svg';
import Mardu from 'assets/colors/The Mardu Horde.svg';
import Naya from 'assets/colors/The Naya Shard.svg';
import Orzhov from 'assets/colors/The Orzhov Syndicate.svg';
import Selesnya from 'assets/colors/The Selesnya Conclave.svg';
import Simic from 'assets/colors/The Simic Combine.svg';
import Sultai from 'assets/colors/The Sultai Brood.svg';
import Temur from 'assets/colors/The Temur Frontier.svg';
import White from 'assets/colors/White.svg';
import {
  // BaseColor_Enum,
  Member,
  Moloch,
  SkillCategory_Enum,
} from 'graphql/autogen/types';

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
};

// const PersonalityIcons = (
//   Object.fromEntries(
//     Object.values(ColorByMask).map(
//       (name) => [name, import(`assets/colors/${name}.svg`)]
//     )
//   )
// )

// ToDo: figure out why some are expanded to data urls & others remain paths
const PersonalityIcons = {
  Colorless, White, Blue, Black, Red, Green,
  'The Azorius Senate': Azorius,
  'The House Dimir': Dimir,
  'The Golgari Swarm': Golgari,
  'The Gruul Clans': Gruul,
  'The Selesnya Conclave': Selesnya,
  'The Simic Combine': Simic,
  'The Orzhov Syndicate': Orzhov,
  'The Izzet League': Izzet,
  'The Cult of Rakdos': Rakdos,
  'The Boros Legion': Boros,
  'The Bant Shard': Bant,
  'The Esper Shard': Esper,
  'The Grixis Shard': Grixis,
  'The Jund Shard': Jund,
  'The Naya Shard': Naya,
  'The Jeskai Way': Jeskai,
  'The Sultai Brood': Sultai,
  'The Mardu Horde': Mardu,
  'The Temur Frontier': Temur,
  'The Abzan Houses': Abzan,
  Artifice, Growth, Altruism, Aggression, Chaos, Balance,
};

enum BaseColor_Enum {
  White = 'White',
  Red = 'Red',
  Blue = 'Blue',
  Black = 'Black',
  Green = 'Green'
};

export type Skill = {
  id: string;
  name: string;
  category: string;
};

export type PersonalityPartInfo = {
  id: string;
  name: BaseColor_Enum;
  label: string;
  description: string;
  image: string;
  mask: number;
};

export type Membership = Pick<Member, 'id'> & {
  moloch: Pick<Moloch, 'id' | 'title' | 'version'>;
};

export const PersonalityTypes = {
  [any: string]: PersonalityPartInfo;
} = (
  Object.fromEntries(
    Object.entries(ColorByMask).map(
      ([mask, name]) => (
        [
          name,
          {
            id: mask.toString(),
            name,
            description: '¿Huh?', // ToDo: load from db
            image: PersonalityIcons[name],
            mask,
          }
        ]
      )
    )
  )
)

// export const PersonalityTypes: {
//   [any: string]: PersonalityPartInfo;
// } = {
//   [BaseColor_Enum.White]: {
//     id: '1',
//     name: BaseColor_Enum.White,
//     label: 'Justice',
//     description: '¿Huh?', // ToDo: load from db
//     image: PersonalityIcons[BaseColor_Enum.White],
//     mask: 1,
//   },
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
// };

export const PersonalityParts: {
  [any: string]: PersonalityPartInfo;
} = {
  [BaseColor_Enum.White]: PersonalityTypes[BaseColor_Enum.White],
  [BaseColor_Enum.Blue]: PersonalityTypes[BaseColor_Enum.Blue],
  [BaseColor_Enum.Black]: PersonalityTypes[BaseColor_Enum.Black],
  [BaseColor_Enum.Red]: PersonalityTypes[BaseColor_Enum.Red],
  [BaseColor_Enum.Green]: PersonalityTypes[BaseColor_Enum.Green],
};

export const SkillColors: Record<SkillCategory_Enum, string> = {
  [SkillCategory_Enum.Community]: MetaTheme.colors.green['700'],
  [SkillCategory_Enum.Design]: MetaTheme.colors.pink['700'],
  [SkillCategory_Enum.Dev]: MetaTheme.colors.cyan['700'],
  [SkillCategory_Enum.Engineering]: MetaTheme.colors.blue['700'],
  [SkillCategory_Enum.Technologies]: MetaTheme.colors.gray['600'],
  [SkillCategory_Enum.Strategy]: MetaTheme.colors.yellow['700'],
};
