import { Container } from '@metafam/ds';
import { TokenBalancesFragment } from 'graphql/autogen/types';

import PerksGrid from './PerksGrid';

type Props = {
  pSeedPrice: number;
  pSeedHolders: TokenBalancesFragment[];
};

export const RankedLeagues: React.FC<Props> = ({
  pSeedPrice,
  pSeedHolders,
}) => (
  <Container as="section" className="mg-patron-join-section" my={[8, 8, 8, 12]}>
    <PerksGrid pSeedPrice={pSeedPrice} pSeedHolders={pSeedHolders} />
  </Container>
);
