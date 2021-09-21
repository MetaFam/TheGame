import AmbitionAltImg from 'assets/colors/Ambition.svg';
import BalanceAltImg from 'assets/colors/Balance.svg';
import ChaosAltImg from 'assets/colors/Chaos.svg';
import JusticeAltImg from 'assets/colors/Justice.svg';
import WisdomAltImg from 'assets/colors/Wisdom.svg';
import gql from 'fake-tag';
import { isPow2 } from 'utils/mathHelper';

import { ColorAspect } from '../../autogen/types';
import { client } from '../../client';
import { PersonalityOption } from '../../types';

const AspectsQuery = gql`
  query GetAspects {
    ColorAspect {
      mask
      name
      description
    }
  }
`;

export type ColorStops = {
  start: string;
  end: string;
};

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
  [x: number]: ColorStops;
} = {
  0b10000: { start: '#DCA8A9', end: '#ffffff' },
  0b01000: { start: '#04468B', end: '#09B9F2' },
  0b00100: { start: '#020121', end: '#2F3E57' },
  0b00010: { start: '#94136E', end: '#F15236' },
  0b00001: { start: '#0E9651', end: '#9FD638' },
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
