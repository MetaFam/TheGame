import { Container, Heading } from '@metafam/ds';

import PerksGrid from './PerksGrid';

export const RankedLeagues = () => (
  <Container as="section" className="mg-patron-join-section" my={[8, 8, 8, 12]}>
    <Heading
      as="h2"
      color="white"
      fontFamily="mono"
      fontWeight={700}
      mb={[4, 4, 4, 12]}
    >
      Ranked Leagues &amp; Perks
    </Heading>

    <PerksGrid />
  </Container>
);
