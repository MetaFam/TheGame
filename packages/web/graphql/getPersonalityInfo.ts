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
import JusticeAltImg from 'assets/alternates/Justice.svg';
import WisdomAltImg from 'assets/alternates/Wisdom.svg';
import AmbitionAltImg from 'assets/alternates/Ambition.svg';
import ChaosAltImg from 'assets/alternates/Chaos.svg';
import BalanceAltImg from 'assets/alternates/Balance.svg';

import gql from 'fake-tag';

import { GetColorInfoQuery } from './autogen/types';
import { client } from './client';
import { PersonalityOption } from './types';

// Object.fromEntries is widely supported, but the
// typescript definition is in es2019
declare global {
  interface ObjectConstructor {
    fromEntries<T = unknown>(
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

// export const PersonalityTypes: {
//   [x: number]: PersonalityOption;
// } = (
//   Object.fromEntries<{ [x: number]: PersonalityOption }>(
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

export const MetaGameAliases: {
  [x: string]: { label: string, image: string }
} = {
  White: { label: 'Justice', image: JusticeAltImg },
  Blue: { label: 'Wisdom', image: WisdomAltImg },
  Black: { label: 'Ambition', image: AmbitionAltImg },
  Red: { label: 'Chaos', image: ChaosAltImg },
  Green: { label: 'Balance', image: BalanceAltImg },
};

export const GetColorInfo = gql`
  query GetColorInfo {
    ColorAspect {
      mask
      name
      description
    }
  }
`;

export const getPersonalityInfo = async (): Promise<{
  parts: Array<PersonalityOption>;
  types: { [any: string]: PersonalityOption };
}> => {
  const { data, error } = await (
    client
    .query<GetColorInfoQuery>(GetColorInfo)
    .toPromise()
  );

  // ToDo: Load from Hasura
  // const { data, error = undefined } = {
  //   "data": {
  //     "ColorAspect": [
  //       {
  //         "description": null,
  //         "mask": 0,
  //         "name": "Colorless"
  //       },
  //       {
  //         "description": null,
  //         "mask": 3,
  //         "name": "The Gruul Clans"
  //       },
  //       {
  //         "description": null,
  //         "mask": 5,
  //         "name": "The Golgari Swarm"
  //       },
  //       {
  //         "description": null,
  //         "mask": 6,
  //         "name": "The Cult of Rakdos"
  //       },
  //       {
  //         "description": null,
  //         "mask": 7,
  //         "name": "The Jund Shard"
  //       },
  //       {
  //         "description": null,
  //         "mask": 9,
  //         "name": "The Simic Combine"
  //       },
  //       {
  //         "description": null,
  //         "mask": 10,
  //         "name": "The Izzet League"
  //       },
  //       {
  //         "description": null,
  //         "mask": 11,
  //         "name": "The Temur Frontier"
  //       },
  //       {
  //         "description": null,
  //         "mask": 12,
  //         "name": "The House Dimir"
  //       },
  //       {
  //         "description": null,
  //         "mask": 13,
  //         "name": "The Sultai Brood"
  //       },
  //       {
  //         "description": null,
  //         "mask": 14,
  //         "name": "The Grixis Shard"
  //       },
  //       {
  //         "description": null,
  //         "mask": 15,
  //         "name": "Chaos"
  //       },
  //       {
  //         "description": null,
  //         "mask": 17,
  //         "name": "The Selesnya Conclave"
  //       },
  //       {
  //         "description": null,
  //         "mask": 18,
  //         "name": "The Boros Legion"
  //       },
  //       {
  //         "description": null,
  //         "mask": 19,
  //         "name": "The Naya Shard"
  //       },
  //       {
  //         "description": null,
  //         "mask": 20,
  //         "name": "The Orzhov Syndicate"
  //       },
  //       {
  //         "description": null,
  //         "mask": 21,
  //         "name": "The Abzan Houses"
  //       },
  //       {
  //         "description": null,
  //         "mask": 22,
  //         "name": "The Mardu Horde"
  //       },
  //       {
  //         "description": null,
  //         "mask": 23,
  //         "name": "Aggression"
  //       },
  //       {
  //         "description": null,
  //         "mask": 24,
  //         "name": "The Azorius Senate"
  //       },
  //       {
  //         "description": null,
  //         "mask": 25,
  //         "name": "The Bant Shard"
  //       },
  //       {
  //         "description": null,
  //         "mask": 26,
  //         "name": "The Jeskai Way"
  //       },
  //       {
  //         "description": null,
  //         "mask": 27,
  //         "name": "Altruism"
  //       },
  //       {
  //         "description": null,
  //         "mask": 28,
  //         "name": "The Esper Shard"
  //       },
  //       {
  //         "description": null,
  //         "mask": 29,
  //         "name": "Growth"
  //       },
  //       {
  //         "description": null,
  //         "mask": 30,
  //         "name": "Artifice"
  //       },
  //       {
  //         "description": null,
  //         "mask": 31,
  //         "name": "Balance"
  //       },
  //       {
  //         "description": "Harmony through acceptance…",
  //         "mask": 1,
  //         "name": "Green"
  //       },
  //       {
  //         "description": "Peace through order…",
  //         "mask": 16,
  //         "name": "White"
  //       },
  //       {
  //         "description": "Perfection through knowledge…",
  //         "mask": 8,
  //         "name": "Blue"
  //       },
  //       {
  //         "description": "Satisfaction through ruthlessness…",
  //         "mask": 4,
  //         "name": "Black"
  //       },
  //       {
  //         "description": "Freedom through action…",
  //         "mask": 2,
  //         "name": "Red"
  //       }
  //     ]
  //   }
  // }

  if (error) throw error;
  if (!data) throw new Error("data isn't set")

  console.info('PERS', data);

  const parts: Array<PersonalityOption> = []
  const types: { [x: number]: PersonalityOption } = {}

  for(let aspect of data.ColorAspect) {
    const option = {
      name: aspect.name,
      label: aspect.name,
      description: aspect.description ?? null,
      image: PersonalityIcons[aspect.name],
      mask: aspect.mask,
    }
    const alt = MetaGameAliases[aspect.name] // Pure properties are renamed
    if (alt) {
      option.label = alt.label;
      option.image = alt.image;
    }
    types[aspect.mask] = option

    if (aspect.mask > 0 && (aspect.mask & (aspect.mask - 1)) === 0) { // power of 2
      parts.push(option)
    }
  }

  return { parts, types };
};
