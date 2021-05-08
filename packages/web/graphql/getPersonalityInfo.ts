import AmbitionAltImg from 'assets/colors/Ambition.svg';
import BalanceAltImg from 'assets/colors/Balance.svg';
import ChaosAltImg from 'assets/colors/Chaos.svg';
import JusticeAltImg from 'assets/colors/Justice.svg';
import WisdomAltImg from 'assets/colors/Wisdom.svg';
import gql from 'fake-tag';
import { isPow2 } from 'utils/mathHelper';

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

export const images: {
  [x: number]: string;
} = {
  0b10000: JusticeAltImg,
  0b01000: WisdomAltImg,
  0b00100: AmbitionAltImg,
  0b00010: ChaosAltImg,
  0b00001: BalanceAltImg,
};

export const colors: {
  [x: number]: string;
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
  const { data, error } = await client.query(AspectsQuery).toPromise();

  if (error) throw error;
  if (!data) throw new Error("data isn't set");

  const parts: Array<PersonalityOption> = [];
  const types: { [x: number]: PersonalityOption } = {};
  data.ColorAspect.forEach((aspect: ColorAspect) => {
    const option = {
      name: aspect.name,
      description: aspect.description,
      mask: aspect.mask,
    };
    types[aspect.mask] = option;

    // pure colors are powers of 2 (only 1 bit set)
    if (isPow2(aspect.mask)) {
      parts.push(option);
    }
  });

  return { parts, types };
};
