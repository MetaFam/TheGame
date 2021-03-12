import AmbitionAltImg from 'assets/alternates/Ambition.svg';
import BalanceAltImg from 'assets/alternates/Balance.svg';
import ChaosAltImg from 'assets/alternates/Chaos.svg';
import JusticeAltImg from 'assets/alternates/Justice.svg';
import WisdomAltImg from 'assets/alternates/Wisdom.svg';
import gql from 'fake-tag';

import { ColorAspect } from './autogen/types';
import { client } from './client';
import { PersonalityOption } from './types';

const AspectsQuery = gql`
  query GetAspects {
    ColorAspect {
      mask
      name
      description
    }
  }
`;

/* MetaGame has it's own naming convention and images
 * for the pure colors.
 */
export const MetaGameAliases: {
  [x: number]: { label: string, image: string }
} = {
  0b10000: { label: 'Justice', image: JusticeAltImg },
  0b01000: { label: 'Wisdom', image: WisdomAltImg },
  0b00100: { label: 'Ambition', image: AmbitionAltImg },
  0b00010: { label: 'Chaos', image: ChaosAltImg },
  0b00001: { label: 'Balance', image: BalanceAltImg },
};

export const colors: {
  [x: number]: string
} = {
  0b10000: '#c4aab4',
  0b01000: '#0273b2',
  0b00100: '#141a36',
  0b00010: '#b72d5b',
  0b00001: '#36ae60',
};

export const getPersonalityInfo = async (): Promise<{
  parts: Array<PersonalityOption>;
  types: { [any: string]: PersonalityOption };
}> => {
  const { data, error } = await (
    client
    .query(AspectsQuery)
    .toPromise()
  );

  if (error) throw error;
  if (!data) throw new Error("data isn't set");

  const parts: Array<PersonalityOption> = [];
  const types: { [x: number]: PersonalityOption } = {};
  data.ColorAspect.forEach((aspect: ColorAspect) => {
    const option = {
      name: aspect.name,
      label: aspect.name,
      description: aspect.description ?? null,
      mask: aspect.mask,
    };
    types[aspect.mask] = option;

    // pure colors are powers of 2
    // eslint-disable-next-line no-bitwise
    if (aspect.mask > 0 && (aspect.mask & (aspect.mask - 1)) === 0) {
      parts.push(option);
    }
  });

  return { parts, types };
};
