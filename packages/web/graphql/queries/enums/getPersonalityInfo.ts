import { Maybe } from '@metafam/utils';
import AmbitionAltImg from 'assets/colors/Ambition.svg';
import BalanceAltImg from 'assets/colors/Balance.svg';
import ChaosAltImg from 'assets/colors/Chaos.svg';
import JusticeAltImg from 'assets/colors/Justice.svg';
import WisdomAltImg from 'assets/colors/Wisdom.svg';
import { client } from 'graphql/client';
import { PersonalityOption } from 'graphql/types';

const AspectsQuery = /* GraphQL */ `
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
  0b10000: JusticeAltImg.src,
  0b01000: WisdomAltImg.src,
  0b00100: AmbitionAltImg.src,
  0b00010: ChaosAltImg.src,
  0b00001: BalanceAltImg.src,
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

export type PersonalityInfo = Maybe<Record<string, PersonalityOption>>;

export const getPersonalityInfo = async (): Promise<PersonalityInfo> => {
  const { data, error } = await client.query(AspectsQuery, {}).toPromise();

  if (error) throw error;
  if (!data) throw new Error('Data isn’t set.');

  return Object.fromEntries(
    data.ColorAspect.map((option: PersonalityOption) => [option.mask, option]),
  );
};
