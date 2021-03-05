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

const aspectsQuery = gql`
  query GetAspects {
    ColorAspect {
      mask
      name
      description
    }
  }
`;


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

export const MetaGameAlternates: {
  [x: string]: { label: string, image: string }
} = {
  White: { label: 'Justice', image: JusticeAltImg },
  Blue: { label: 'Wisdom', image: WisdomAltImg },
  Black: { label: 'Ambition', image: AmbitionAltImg },
  Red: { label: 'Chaos', image: ChaosAltImg },
  Green: { label: 'Balance', image: BalanceAltImg },
};

export const getPersonalityInfo = async (): Promise<{
  parts: Array<PersonalityOption>;
  types: { [any: string]: PersonalityOption };
}> => {
    const { data, error } = await (
    client
    .query(aspectsQuery)
    .toPromise()
  );

  if (error) throw error;
  if (!data) throw new Error("data isn't set")

  const parts: Array<PersonalityOption> = []
  const types: { [x: number]: PersonalityOption } = {}
  for(let aspect of data.ColorAspect) {
    const option = {
      name: aspect.name,
      label: aspect.name,
      description: aspect.description ?? null,
      image: PersonalityIcons[aspect.name],
      mask: aspect.mask,
    };
    const alt = MetaGameAlternates[aspect.name]; // Pure properties are renamed
    if (alt) {
      option.label = alt.label;
      option.image = alt.image;
    }
    types[aspect.mask] = option;

    // pure colors are powers of 2
    if (aspect.mask > 0 && (aspect.mask & (aspect.mask - 1)) === 0) {
      parts.push(option);
    }
  }

  return { parts, types };
};
