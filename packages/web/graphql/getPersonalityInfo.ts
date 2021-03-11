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
