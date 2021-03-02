import AggressionImg from 'assets/colors/Aggression.svg';
import AltruismImg from 'assets/colors/Altruism.svg';
import ArtificeImg from 'assets/colors/Artifice.svg';
import BalanceImg from 'assets/colors/Balance.svg';
import BlackImg from 'assets/colors/Black.svg';
import BlueImg from 'assets/colors/Blue.svg';
import ChaosImg from 'assets/colors/Chaos.svg';
import ColorlessImg from 'assets/colors/Colorless.svg';
import GreenImg from 'assets/colors/Green.svg';
import GrowthImg from 'assets/colors/Growth.svg';
import RedImg from 'assets/colors/Red.svg';
import AbzanImg from 'assets/colors/The Abzan Houses.svg';
import AzoriusImg from 'assets/colors/The Azorius Senate.svg';
import BantImg from 'assets/colors/The Bant Shard.svg';
import BorosImg from 'assets/colors/The Boros Legion.svg';
import RakdosImg from 'assets/colors/The Cult of Rakdos.svg';
import EsperImg from 'assets/colors/The Esper Shard.svg';
import GolgariImg from 'assets/colors/The Golgari Swarm.svg';
import GrixisImg from 'assets/colors/The Grixis Shard.svg';
import GruulImg from 'assets/colors/The Gruul Clans.svg';
import DimirImg from 'assets/colors/The House Dimir.svg';
import IzzetImg from 'assets/colors/The Izzet League.svg';
import JeskaiImg from 'assets/colors/The Jeskai Way.svg';
import JundImg from 'assets/colors/The Jund Shard.svg';
import MarduImg from 'assets/colors/The Mardu Horde.svg';
import NayaImg from 'assets/colors/The Naya Shard.svg';
import OrzhovImg from 'assets/colors/The Orzhov Syndicate.svg';
import SelesnyaImg from 'assets/colors/The Selesnya Conclave.svg';
import SimicImg from 'assets/colors/The Simic Combine.svg';
import SultaiImg from 'assets/colors/The Sultai Brood.svg';
import TemurImg from 'assets/colors/The Temur Frontier.svg';
import WhiteImg from 'assets/colors/White.svg';
import gql from 'fake-tag';

import { GetColorInfoQuery } from './autogen/types';
import { client } from './client';
import { PersonalityPartInfo } from './types';

// Object.fromEntries is widely supported, but the
// typescript definition is in es2019
declare global {
  interface ObjectConstructor {
    fromEntries<T = any>(
      entries: Iterable<readonly [PropertyKey, T]>,
    ): { [k in PropertyKey]: T };
  }
}

// ¿Can something like this work or do imports have to be named?
// const PersonalityIcons = (
//   Object.fromEntries(
//     Object.values(ColorAspect_Enum).map(
//       (name) => [
//         name,
//         (await import(`assets/colors/${name}.svg`)).default
//       ]
//     )
//   )
// )

// ToDo: figure out why some are expanded to data urls & others remain paths
const PersonalityIcons: {
  [any: string]: string;
} = {
  Colorless: ColorlessImg,
  White: WhiteImg,
  Blue: BlueImg,
  Black: BlackImg,
  Red: RedImg,
  Green: GreenImg,
  'The Azorius Senate': AzoriusImg,
  'The House Dimir': DimirImg,
  'The Golgari Swarm': GolgariImg,
  'The Gruul Clans': GruulImg,
  'The Selesnya Conclave': SelesnyaImg,
  'The Simic Combine': SimicImg,
  'The Orzhov Syndicate': OrzhovImg,
  'The Izzet League': IzzetImg,
  'The Cult of Rakdos': RakdosImg,
  'The Boros Legion': BorosImg,
  'The Bant Shard': BantImg,
  'The Esper Shard': EsperImg,
  'The Grixis Shard': GrixisImg,
  'The Jund Shard': JundImg,
  'The Naya Shard': NayaImg,
  'The Jeskai Way': JeskaiImg,
  'The Sultai Brood': SultaiImg,
  'The Mardu Horde': MarduImg,
  'The Temur Frontier': TemurImg,
  'The Abzan Houses': AbzanImg,
  Artifice: ArtificeImg,
  Growth: GrowthImg,
  Altruism: AltruismImg,
  Aggression: AggressionImg,
  Chaos: ChaosImg,
  Balance: BalanceImg,
};

export const GetColorInfo = gql`
  query GetColorInfo {
    ColorAspect {
      aspect
      mask
    }
    BaseColor {
      description
      name
    }
  }
`;

// export const PersonalityTypes: {
//   [x: number]: PersonalityPartInfo;
// } = (
//   Object.fromEntries<{ [x: number]: PersonalityPartInfo }>(
//     Object
//     .entries<Array<[string, string]>>(ColorAspect_Enum)
//     .map<[string, string]>(
//       ([mask, name]) => (
//         [
//           name,
//           {
//             name,
//             label: 'T',
//             description: '¿Huh?', // ToDo: load from db
//             image: PersonalityIcons[name],
//             mask: parseInt(mask.substring(1), 2),
//           }
//         ]
//       )
//     )
//   )
// )

export const MetaGameAliases = {
  White: 'Justice',
  Blue: 'Wisdom',
  Black: 'Ambition',
  Red: 'Chaos',
  Green: 'Balance',
};

export const PersonalityTypes: {
  [any: string]: PersonalityPartInfo;
} = {
  0b10000: {
    name: 'White',
    label: MetaGameAliases.White ?? 'White',
    description: '¿Huh?', // ToDo: load from db
    image: PersonalityIcons.White,
    mask: 0b10000,
  },
};

enum BaseColorEnum {
  White,
  Blue,
  Black,
  Red,
  Green,
}

export const PersonalityParts: Array<PersonalityPartInfo> = [
  PersonalityTypes[BaseColorEnum.White],
  PersonalityTypes[BaseColorEnum.Blue],
  PersonalityTypes[BaseColorEnum.Black],
  PersonalityTypes[BaseColorEnum.Red],
  PersonalityTypes[BaseColorEnum.Green],
];

export const getPersonalityInfo = async (): Promise<{
  parts: Array<PersonalityPartInfo>;
  types: { [any: string]: PersonalityPartInfo };
}> => {
  const { data, error } = await client
    .query<GetColorInfoQuery>(GetColorInfo)
    .toPromise();
  if (error) throw error;

  console.info(data);

  return {
    parts: [],
    types: {},
  };
};
